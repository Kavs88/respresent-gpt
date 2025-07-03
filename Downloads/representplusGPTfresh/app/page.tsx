import React from 'react';
import { getArtists } from '../lib/airtable';

export default async function Home() {
  const artists = await getArtists();
  
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6 text-primary">Featured Artists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map((artist: any, index: number) => (
          <div key={index} className="bg-muted/10 p-4 rounded shadow border border-muted/20">
            <h2 className="text-2xl font-serif text-primary">{artist.fields.Name}</h2>
            <p className="text-foreground/80">{artist.fields.Bio}</p>
          </div>
        ))}
      </div>
    </main>
  );
} 