import Link from "next/link";
import Image from "next/image";
import { Artist } from "@/types/artist";

export function ArtistCard({ artist, themeColor }: { artist: Artist; themeColor?: string }) {
  return (
    <Link
      href={`/artists/${artist.id}`}
      className="group block bg-card border border-border rounded-lg p-3 text-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
    >
      <div
        className={`relative aspect-video w-full overflow-hidden rounded-lg p-2 border-4`}
        style={{ borderColor: themeColor || 'var(--border)' }}
      >
        {artist.fields.ProfileImage?.[0]?.url ? (
          <Image
            src={artist.fields.ProfileImage[0].url}
            alt={artist.fields.Name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            className="rounded-md group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-muted text-xs">No Image</span>
          </div>
        )}
      </div>
      <h3 className="mt-4 text-xl md:text-2xl font-bold font-serif group-hover:text-primary transition-colors duration-300">{artist.fields.Name}</h3>
      <p className="text-muted text-sm">{artist.fields.Specialty}</p>
    </Link>
  );
} 