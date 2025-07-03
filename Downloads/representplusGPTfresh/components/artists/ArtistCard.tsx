import Link from "next/link";
import Image from "next/image";
import { Artist } from "@/types/artist";

export function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Link href={`/artists/${artist.id}`} className="group block text-foreground hover:text-primary transition-colors duration-300">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted/20">
        {artist.fields.ProfileImage?.[0]?.url ? (
          <Image
            src={artist.fields.ProfileImage[0].url}
            alt={artist.fields.Name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            className="group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-muted text-xs">No Image</span>
          </div>
        )}
      </div>
      <h3 className="mt-4 text-xl font-bold font-serif">{artist.fields.Name}</h3>
      <p className="text-muted text-sm">{artist.fields.Specialty}</p>
    </Link>
  );
} 