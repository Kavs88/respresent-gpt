import { getArtists, getAllTags } from "@/lib/airtable";
import ArtistsPageClient from "./ArtistsPageClient";

export default async function ArtistsPage() {
  // Fetch all data in parallel for optimal performance
  const [artists, allTags] = await Promise.all([
    getArtists(),
    getAllTags()
  ]);

  return <ArtistsPageClient artists={artists} allTags={allTags} />;
} 