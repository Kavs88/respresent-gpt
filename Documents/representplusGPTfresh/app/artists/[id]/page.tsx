// app/artists/[id]/page.tsx

import { getArtistById } from "@/lib/airtable";
import { notFound } from "next/navigation";
import ArtistPageClient from "./ArtistPageClient";

// This is a Server Component, so it can be async
export default async function ArtistPage({ params }: { params: { id: string } }) {
  // 1. Fetch this specific artist's data on the server
  const artist = await getArtistById(params.id);

  // 2. If no artist is found, immediately show the 404 page
  if (!artist) {
    notFound();
  }

  // The Server Shell's only job is to fetch data and pass it to the Client Core.
  return <ArtistPageClient artist={artist} />;
}