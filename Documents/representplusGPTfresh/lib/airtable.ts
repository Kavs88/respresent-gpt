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

// ==================================
// AIRTABLE CONFIG & FUNCTIONS
// ==================================

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID as string
);
const table = base("Artists");

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