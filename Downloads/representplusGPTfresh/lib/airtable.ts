// lib/airtable.ts

import Airtable from "airtable";
import { z } from "zod";
import { artistSchema, Artist } from "@/types/artist";

// ==================================
// Airtable Configuration
// ==================================

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID as string
);

// ==================================
// Internal Record Processor (The Guard)
// Ensures all data matches our schema before being used.
// ==================================

const processRecord = (record: any): Artist | null => {
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
};

// ==================================
// Exported Data Fetching Functions
// ==================================

/**
 * Fetches all artists, or only featured artists.
 * Returns a clean, validated array of Artist objects.
 */
export const getArtists = async (
  options: { featuredOnly?: boolean } = {}
): Promise<Artist[]> => {
  const { featuredOnly } = options;
  const selectOptions: any = {
    sort: [{ field: "Name", direction: "asc" }],
  };

  if (featuredOnly) {
    selectOptions.filterByFormula = "{Featured} = 1";
  }

  try {
    const records = await base("Artists").select(selectOptions).all();
    return records.map(processRecord).filter(Boolean) as Artist[];
  } catch (error) {
    console.error("Airtable API error in getArtists:", error);
    return []; // Always return an empty array on error to prevent crashes.
  }
};

/**
 * Fetches a single artist by their Record ID.
 * This is the new, "bulletproof" version to prevent 404 crashes.
 * Returns a single Artist object or null if not found.
 */
export const getArtistById = async (id: string): Promise<Artist | null> => {
  try {
    const records = await base("Artists")
      .select({
        filterByFormula: `RECORD_ID() = '${id}'`,
        maxRecords: 1,
      })
      .firstPage();

    if (!records || records.length === 0) {
      console.warn(`No artist found in Airtable with ID: ${id}`);
      return null; // Correctly handle the "not found" case.
    }

    return processRecord(records[0]);
  } catch (error) {
    console.error(`Airtable API error fetching artist by ID ${id}:`, error);
    return null; // Return null on any other API error.
  }
};

/**
 * Fetches all unique tags from all artists.
 * Returns a simple array of strings.
 */
export const getAllTags = async (): Promise<string[]> => {
  try {
    const records = await base("Artists").select({ fields: ["Tags"] }).all();
    const tagSets = records.map((record) => record.get("Tags") || []);
    const allTags = new Set<string>(tagSets.flat());
    return Array.from(allTags).sort(); // Sort alphabetically for consistency
  } catch (error) {
    console.error("Airtable API error in getAllTags:", error);
    return [];
  }
};