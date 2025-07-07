import Link from "next/link";
import Image from "next/image";
import { Artist } from '@/types/artist';

// Utility to determine if a color is light or dark
function isColorLight(hex: string) {
  if (!hex) return false;
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const r = parseInt(c.substr(0, 2), 16);
  const g = parseInt(c.substr(2, 2), 16);
  const b = parseInt(c.substr(4, 2), 16);
  // Perceived brightness
  return (r * 0.299 + g * 0.587 + b * 0.114) > 186;
}

export function ArtistCard({ artist, themeColor }: { artist: Artist; themeColor?: string }) {
  const bgColor = artist.fields.ThemePrimaryColor || themeColor || 'var(--card, #18181b)';
  // Default to dark text, but use white if background is dark
  const useLightText = !isColorLight(artist.fields.ThemePrimaryColor || themeColor || '#18181b');
  const textColor = useLightText ? '#fff' : '#18181b';
  const tagBg = useLightText ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.08)';
  return (
    <Link
      href={`/artists/${artist.id}`}
      className="group block rounded-2xl border border-border shadow-lg overflow-hidden w-[320px] h-[294px] flex items-center justify-center bg-card mx-auto transition-all duration-300 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 focus:ring-offset-background"
      style={{ background: bgColor }}
      aria-label={`View ${artist.fields.Name}'s profile and artwork${artist.fields.Speciality ? ` - ${artist.fields.Speciality}` : ''}`}
    >
      {/* Grouped Avatar + Text, centered in card, with uniform spacing */}
      <div className="flex flex-col items-center justify-center w-full gap-y-2">
        <div
          className="relative w-36 h-36 rounded-full border-4 bg-background overflow-hidden flex items-center justify-center"
          style={{ borderColor: artist.fields.ThemePrimaryColor || themeColor || 'var(--primary, #00ff9d)' }}
          role="img"
          aria-label={`${artist.fields.Name}'s profile picture`}
        >
          <Image
            src={artist.fields.ProfileImage?.[0]?.url || '/placeholder-avatar.png'}
            alt=""
            fill
            sizes="144px"
            className="object-cover rounded-full"
            priority={false}
          />
        </div>
        <h3 className="text-xl md:text-2xl font-extrabold font-serif group-hover:text-primary transition-colors duration-300 truncate w-full text-center" style={{ color: textColor, fontSize: '1.5rem', lineHeight: 1.15 }}>
          {artist.fields.Name}
        </h3>
        {artist.fields.Speciality && (
          <p className="text-base md:text-lg font-semibold truncate w-full text-center" style={{ color: textColor, opacity: 0.95 }}>
            {artist.fields.Speciality}
          </p>
        )}
        {artist.fields.Tags && artist.fields.Tags.length > 0 && (
          <div className="flex flex-wrap gap-1 justify-center w-full">
            {artist.fields.Tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-full text-xs md:text-sm font-semibold" style={{ background: tagBg, color: textColor }}>
                {tag}
              </span>
            ))}
            {artist.fields.Tags.length > 3 && (
              <span className="px-2 py-0.5 rounded-full bg-muted/20 text-muted text-xs font-medium">+{artist.fields.Tags.length - 3} more</span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
} 