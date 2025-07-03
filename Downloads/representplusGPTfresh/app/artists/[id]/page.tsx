import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArtistById } from '../../../lib/airtable';
import { ArtistContactButtons, ArtworkCarousel } from '@/components/artists';
import { Artist } from '@/types/artist';
import PlatformContactButtons from "../../../components/ui/PlatformContactButtons";

interface ArtistPageProps {
  params: {
    id: string;
  };
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const artist = await getArtistById(params.id);

  if (!artist) {
    notFound();
  }

  // Robust dynamic theming system with strong fallbacks
  const themeStyles = {
    '--bg-color': artist.fields.ThemeBackgroundColor || '#0E0E0E', // Fallback to default dark
    '--text-color': artist.fields.ThemeTextColor || '#E5E5E5',     // Fallback to default light text
    '--primary-color': artist.fields.ThemePrimaryColor || '#00ff9d', // Fallback to default neon green
  } as React.CSSProperties;

  return (
    <main style={themeStyles} className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
      <div className="container mx-auto py-20 px-4">
        <Link href="/artists" className="inline-flex items-center text-[var(--primary-color)] hover:underline transition-colors mb-8 transition-all duration-300 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary/50">
          ← Back to Artists
        </Link>
        
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Artist Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Artist Image */}
            <div className="lg:col-span-1">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted/20">
                {artist.fields.ProfileImage?.[0]?.url ? (
                  <Image
                    src={artist.fields.ProfileImage[0].url}
                    alt={artist.fields.Name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-muted text-lg">No Image Available</span>
                  </div>
                )}
              </div>
            </div>

            {/* Artist Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-5xl font-bold font-serif mb-4 text-[var(--primary-color)]">
                  {artist.fields.Name}
                </h1>
                <p className="text-2xl text-muted">{artist.fields.Specialty}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--primary-color)' }}>About</h2>
                <p className="leading-relaxed text-lg">
                  {artist.fields.Bio}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--primary-color)' }}>Contact</h2>
                <PlatformContactButtons artistName={artist.fields.Name} />
              </div>
            </div>
          </div>

          {/* Artwork Gallery */}
          {artist.fields.Artwork && artist.fields.Artwork.length > 0 && (
            <div className="space-y-8">
              <ArtworkCarousel artworks={artist.fields.Artwork} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 