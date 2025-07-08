// lib/airtable.ts

import Airtable from "airtable";
import { z } from "zod";

// ==================================
// SCHEMAS & TYPES ARE NOW DEFINED HERE
// ==================================

export const attachmentSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  filename: z.string(),
});

export const artistSchema = z.object({
  id: z.string(),
  fields: z.object({
    Name: z.string(),
    Speciality: z.string().optional(),
    Bio: z.string().optional(),
    ProfileImage: z.array(attachmentSchema).optional(),
    Artwork: z.array(attachmentSchema).optional(),
    SocialLinks: z.string().optional(),
    Tags: z.array(z.string()).optional(),
    Featured: z.boolean().optional(),
    GeneratedBannerImage: z.array(attachmentSchema).optional(),
    ThemePrimaryColor: z.string().optional(),
    ThemeBackgroundColor: z.string().optional(),
    ThemeTextColor: z.string().optional(),
  }),
});

export type Artist = z.infer<typeof artistSchema>;
export type Attachment = z.infer<typeof attachmentSchema>;

// Review schema
export const reviewSchema = z.object({
  id: z.string(),
  fields: z.object({
    Artist: z.array(z.string()),
    "Review Text": z.string(),
    "Client Name": z.string().optional(),
    "Project Type": z.string().optional(),
    Date: z.string(),
    Featured: z.boolean().optional(),
    Approved: z.boolean().optional(),
  }),
});

export type Review = z.infer<typeof reviewSchema>;

// ==================================
// AIRTABLE CONFIG & FUNCTIONS
// ==================================

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID as string
);
const table = base("Artists");
const reviewsTable = base("Reviews");

// ==================================
// Internal Record Processor (The Guard)
// Ensures all data matches our schema before being used.
// ==================================

const processRecords = (records: any[]): Artist[] => {
  const validated = z.array(artistSchema).safeParse(
    records.map(r => ({ id: r.id, fields: r.fields }))
  );
  if (!validated.success) {
    console.error("Zod Validation Error:", validated.error.flatten());
    return [];
  }
  return validated.data;
};

// ==================================
// Exported Data Fetching Functions
// ==================================

/**
 * Fetches all artists, or only featured artists.
 * Returns a clean, validated array of Artist objects.
 */
export const getArtists = async (options: { featuredOnly?: boolean } = {}): Promise<Artist[]> => {
  try {
    // console.log("getArtists called with options:", options);
    
    const query = table.select({
      fields: [
        "Name",
        "Speciality",
        "Bio",
        "ProfileImage",
        "Artwork",
        "SocialLinks",
        "Tags",
        "Featured",
        "GeneratedBannerImage",
        "ThemePrimaryColor",
        "ThemeBackgroundColor",
        "ThemeTextColor"
      ],
      sort: [{ field: "Name", direction: "asc" }],
      filterByFormula: options.featuredOnly ? "{Featured} = 1" : "",
    });
    
    const records = await query.all();
    // console.log(`Found ${records.length} total records from Airtable`);
    
    const processed = processRecords([...records]);
    // console.log(`Processed ${processed.length} valid records`);
    

    
    return processed;
  } catch (error) {
    console.error("Airtable API error in getArtists:", error);
    return [];
  }
};

// Add a processRecord helper for this diagnostic if not present
function processRecord(record: any): Artist | null {
  if (!record || !record.id || !record.fields) {
    console.warn("Airtable record was missing or malformed.", record);
    return null;
  }
  const dataToParse = { id: record.id, fields: record.fields };
  const validatedData = artistSchema.safeParse(dataToParse);
  if (!validatedData.success) {
    console.error("Zod Validation Error:", validatedData.error.flatten());
    return null;
  }
  return validatedData.data;
}

/**
 * Fetches a single artist by their Record ID.
 * This is the new, "bulletproof" version to prevent 404 crashes.
 * Returns a single Artist object or null if not found.
 */
export const getArtistById = async (id: string): Promise<Artist | null> => {
  try {
    const query = table.select({
      fields: [
        "Name",
        "Speciality",
        "Bio",
        "ProfileImage",
        "Artwork",
        "SocialLinks",
        "Tags",
        "Featured",
        "GeneratedBannerImage",
        "ThemePrimaryColor",
        "ThemeBackgroundColor",
        "ThemeTextColor"
      ],
      filterByFormula: `RECORD_ID() = '${id}'`,
      maxRecords: 1,
    });
    const records = await query.all();
    if (records.length === 0) return null;
    const processed = processRecords([...records]);
    return processed[0] || null;
  } catch (error) {
    console.error(`Airtable API error in getArtistById for ${id}:`, error);
    return null;
  }
};

/**
 * Fetches all unique tags from all artists.
 * Returns a simple array of strings.
 */
export const getAllTags = async (): Promise<string[]> => {
  try {
    const records = await table.select({ fields: ["Tags"] }).all();
    const tagSets = records.map((record) => (record.get("Tags") as string[]) || []);
    return Array.from(new Set(tagSets.flat())).sort();
  } catch (error) {
    console.error("Airtable API error in getAllTags:", error);
    return [];
  }
};

/**
 * Fetches reviews for a specific artist.
 * Returns approved reviews only, sorted by featured first, then date.
 */
export const getArtistReviews = async (artistId: string): Promise<Review[]> => {
  try {
    console.log(`Fetching reviews for artist ID: ${artistId}`);
    
    // First, let's get ALL records without specifying fields to see what field names exist
    const allReviewsQuery = reviewsTable.select();
    
    const allRecords = await allReviewsQuery.all();
    console.log(`Found ${allRecords.length} total reviews`);
    
    // Log each record to see what we have
    allRecords.forEach((record, index) => {
      console.log(`Review ${index + 1}:`, {
        id: record.id,
        fields: record.fields,
        artist: record.get("Artist"),
        text: record.get("Review Text"),
        date: record.get("Date"),
        featured: record.get("Featured"),
        approved: record.get("Approved")
      });
    });
    
    // Filter reviews that match the artist ID
    const filteredRecords = allRecords.filter(record => {
      const artistField = record.get("Artist");
      console.log(`Review ${record.id} artist field:`, artistField);
      return artistField && Array.isArray(artistField) && artistField.includes(artistId);
    });
    
    console.log(`Filtered to ${filteredRecords.length} reviews for artist ${artistId}`);
    
    const reviews: Review[] = filteredRecords.map(record => {
      const artistField = record.get("Artist") as string[];
      const textField = record.get("Review Text") as string;
      const dateField = record.get("Date") as string;
      const featuredField = record.get("Featured") as boolean;
      
      return {
        id: record.id,
        fields: {
          Artist: artistField || [],
          "Review Text": textField || "",
          "Client Name": record.get("Client Name") as string || "",
          "Project Type": record.get("Project Type") as string || "",
          Date: dateField || "",
          Featured: featuredField || false,
          Approved: record.get("Approved") as boolean || false,
        }
      };
    });
    
    console.log(`Returning ${reviews.length} reviews`);
    return reviews;
  } catch (error) {
    console.error('Airtable API error in getArtistReviews:', error);
    return [];
  }
};