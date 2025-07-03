import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArtistById } from '../../../lib/airtable';
import { ArtistContactButtons, ArtworkCarousel } from '@/components/artists';
import { Artist } from '@/types/artist';

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

  // Dynamic theming system
  const themeStyles = {
    '--bg-color': artist.fields.ThemeBgColor || '#0E0E0E',
    '--text-color': artist.fields.ThemeTextColor || '#E5E5E5',
    '--primary-color': artist.fields.ThemePrimaryColor || '#00ff9d',
  } as React.CSSProperties;

  return (
    <main className="min-h-screen" style={themeStyles}>
      <div className="container mx-auto py-20 px-4">
        <Link href="/artists" className="inline-flex items-center text-foreground hover:text-primary transition-colors mb-8">
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
                <h1 className="text-5xl font-bold font-serif text-primary mb-4">
                  {artist.fields.Name}
                </h1>
                <p className="text-2xl text-muted">{artist.fields.Specialty}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-foreground">About</h2>
                <p className="text-foreground/80 leading-relaxed text-lg">
                  {artist.fields.Bio}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-foreground">Contact</h2>
                <ArtistContactButtons artist={artist} />
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