import React from 'react';
import { notFound } from 'next/navigation';
import { getArtistById } from '../../../lib/airtable';
import { Artist } from '@/types/artist';
import { NextSeo } from 'next-seo';
import ArtistPageClient from './ArtistPageClient';

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

  // SEO configuration
  const seoConfig = {
    title: `${artist.fields.Name} | Represent+`,
    description: artist.fields.Bio?.substring(0, 160) || `Discover ${artist.fields.Name}, a talented ${artist.fields.Specialty} represented by Represent+.`,
    openGraph: {
      title: `${artist.fields.Name} | Represent+`,
      description: artist.fields.Bio?.substring(0, 160) || `Discover ${artist.fields.Name}, a talented ${artist.fields.Specialty} represented by Represent+.`,
      images: artist.fields.ProfileImage?.[0]?.url ? [
        {
          url: artist.fields.ProfileImage[0].url,
          width: 1200,
          height: 630,
          alt: artist.fields.Name,
        }
      ] : [],
    },
  };

  return (
    <>
      <NextSeo {...seoConfig} />
      <ArtistPageClient artist={artist} />
    </>
  );
} 