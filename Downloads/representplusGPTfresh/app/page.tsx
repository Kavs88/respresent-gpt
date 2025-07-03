import React from 'react';
import { getArtists } from '../lib/airtable';
import { ArtistCard } from '@/components/artists';

export default async function Home() {
  const artists = await getArtists();
  
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6 text-primary">Featured Artists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map((artist: any, index: number) => (
          <ArtistCard key={artist.id || index} artist={artist} />
        ))}
      </div>
    </main>
  );
} 