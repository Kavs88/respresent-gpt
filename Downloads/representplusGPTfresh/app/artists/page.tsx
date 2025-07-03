import { getArtists, getAllTags } from "@/lib/airtable";
import { ArtistFilterableGrid } from "@/components/artists/ArtistFilterableGrid";

export default async function ArtistsPage() {
  // Fetch all data in parallel for optimal performance
  const [artists, allTags] = await Promise.all([
    getArtists(),
    getAllTags()
  ]);

  return (
    <div className="container mx-auto py-32 px-4">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-serif font-black tracking-tight text-foreground">
          All Artists
        </h1>
        <p className="text-xl text-muted mt-4 max-w-2xl mx-auto">
          Discover and explore our complete collection of talented artists and creators.
        </p>
      </div>

      <ArtistFilterableGrid artists={artists} allTags={allTags} />
    </div>
  );
} 