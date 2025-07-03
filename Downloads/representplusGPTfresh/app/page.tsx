import { getArtists } from "@/lib/airtable";
import { ArtistCard } from "@/components/artists/ArtistCard";
import Link from "next/link";

export default async function Home() {
  // Fetch only featured artists directly on the server for a fast initial load
  const featuredArtists = await getArtists({ featuredOnly: true });

  return (
    <div className="container mx-auto py-20 px-4">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-serif font-black tracking-tight text-foreground">
          The Future of Talent
        </h1>
        <p className="text-xl text-muted mt-4 max-w-2xl mx-auto">
          A curated showcase of premier artists, designers, and innovators.
        </p>
      </div>

      <div className="relative mb-12">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-muted/20" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-4 text-2xl font-serif font-bold text-primary">
            Featured Artists
          </span>
        </div>
      </div>

      {featuredArtists.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {featuredArtists.map((artist: any) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">No featured artists at this time.</p>
      )}

      <div className="text-center mt-16">
        <Link 
          href="/artists" 
          className="inline-block bg-primary text-black font-bold py-3 px-8 rounded-full hover:opacity-90 transition-opacity text-lg"
        >
          View All Artists
        </Link>
      </div>
    </div>
  );
} 