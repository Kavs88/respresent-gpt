import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArtistById } from '../../../lib/airtable';
import { ArtistContactButtons, ArtworkCarousel } from '@/components/artists';
import { Artist } from '@/types/artist';
import PlatformContactButtons from "../../../components/ui/PlatformContactButtons";
import ReactMarkdown from 'react-markdown';

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
      {/* Banner */}
      <section className="relative w-full h-64 md:h-96">
        {artist.fields.GeneratedBannerImage ? (
          <Image
            src={artist.fields.GeneratedBannerImage}
            alt={artist.fields.Name + ' banner'}
            fill
            className="object-cover object-center"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-muted/30" />
        )}
      </section>

      {/* Hero Layout */}
      <section className="container mx-auto px-4 pt-12 pb-8 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Profile Image */}
        <div className="flex justify-center md:justify-end">
          <div
            className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 shadow-xl bg-background"
            style={{ borderColor: artist.fields.ThemePrimaryColor || 'var(--primary)' }}
          >
            {artist.fields.ProfileImage?.[0]?.url ? (
              <Image
                src={artist.fields.ProfileImage[0].url}
                alt={artist.fields.Name}
                fill
                className="object-cover object-top rounded-full"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-muted text-xs">No Image</span>
              </div>
            )}
          </div>
        </div>
        {/* Name, Specialty, Contact */}
        <div className="md:col-span-2 flex flex-col gap-4 md:gap-6">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-[var(--primary-color)]">
            {artist.fields.Name}
          </h1>
          <h2 className="text-xl md:text-2xl text-muted mb-2">{artist.fields.Specialty}</h2>
          <PlatformContactButtons artistName={artist.fields.Name} />
        </div>
      </section>

      {/* Featured Article */}
      {artist.fields.FeaturedArticle && (
        <section className="container mx-auto px-4 max-w-3xl py-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--primary-color)' }}>Featured Article</h2>
          <article className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown>{artist.fields.FeaturedArticle}</ReactMarkdown>
          </article>
        </section>
      )}

      {/* Artwork Gallery */}
      <section className="container mx-auto px-4 max-w-6xl py-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--primary-color)' }}>Artwork Gallery</h2>
        {artist.fields.Artwork && artist.fields.Artwork.length > 0 ? (
          <ArtworkCarousel artworks={artist.fields.Artwork} themeColor={artist.fields.ThemePrimaryColor} />
        ) : (
          <p className="text-muted">No artwork available.</p>
        )}
      </section>
    </main>
  );
} 