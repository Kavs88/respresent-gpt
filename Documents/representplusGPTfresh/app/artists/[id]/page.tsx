// app/artists/[id]/page.tsx

import { getArtistById } from "@/lib/airtable";
import { notFound } from "next/navigation";
import ArtistPageClient from "./ArtistPageClient";
import SEOHead from "@/components/ui/SEOHead";

// This is a Server Component, so it can be async
export default async function ArtistPage({ params }: { params: { id: string } }) {
  // 1. Fetch this specific artist's data on the server
  const artist = await getArtistById(params.id);

  // 2. If no artist is found, immediately show the 404 page
  if (!artist) {
    notFound();
  }

  // Generate SEO data for the artist
  const artistSEO = {
    name: artist.fields.Name,
    bio: artist.fields.Bio || `Explore ${artist.fields.Name}'s unique artistic style and portfolio.`,
    artworks: artist.fields.Artwork?.map(art => ({
      title: art.filename || 'Artwork',
      description: art.filename || 'Artwork by ' + artist.fields.Name,
      imageUrl: art.url
    })) || []
  };

  // The Server Shell's only job is to fetch data and pass it to the Client Core.
  return (
    <>
      <SEOHead 
        title={artist.fields.Name}
        description={`${artist.fields.Bio || `Discover ${artist.fields.Name}'s unique artistic style`}${artist.fields.Speciality ? ` - Specializing in ${artist.fields.Speciality}` : ''}. Browse portfolio and commission custom artwork.`}
        keywords={[
          artist.fields.Name,
          artist.fields.Speciality || 'artist',
          'artist portfolio',
          'commission artwork',
          'custom art',
          ...(artist.fields.Tags || [])
        ]}
        url={`/artists/${artist.id}`}
        type="profile"
        artist={artistSEO}
      />
      <ArtistPageClient artist={artist} />
    </>
  );
}