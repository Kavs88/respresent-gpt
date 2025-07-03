import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getArtists } from '../../../lib/airtable';
import { ArtistContactButtons } from '@/components/artists';
import { Artist } from '@/types/artist';

interface ArtistPageProps {
  params: {
    id: string;
  };
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const artists = await getArtists();
  const artist = artists.find((a: any) => a.id === params.id) as Artist;

  if (!artist) {
    return (
      <div className="min-h-screen p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Artist Not Found</h1>
          <Link href="/" className="text-foreground hover:text-primary transition-colors">
            ← Back to Artists
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <Link href="/" className="inline-flex items-center text-foreground hover:text-primary transition-colors mb-8">
        ← Back to Artists
      </Link>
      
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Artist Image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted/20">
            {artist.fields.ProfileImage?.[0]?.url ? (
              <Image
                src={artist.fields.ProfileImage[0].url}
                alt={artist.fields.Name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-muted text-lg">No Image Available</span>
              </div>
            )}
          </div>

          {/* Artist Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold font-serif text-primary mb-2">
                {artist.fields.Name}
              </h1>
              <p className="text-xl text-muted">{artist.fields.Specialty}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">About</h2>
              <p className="text-foreground/80 leading-relaxed">
                {artist.fields.Bio}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Contact</h2>
              <ArtistContactButtons artist={artist} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 