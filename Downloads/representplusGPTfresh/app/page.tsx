import { getArtists } from "@/lib/airtable";
import HomePageClient from "@/components/home/HomePageClient";
import { Artist, Attachment } from '@/lib/airtable';
import ArticlesSection from '@/components/home/ArticlesSection';

export default async function Home() {
  const featuredArtists: Artist[] = await getArtists({ featuredOnly: true });
  const allArtworks: Attachment[] = featuredArtists.flatMap(
    (artist) => artist.fields.Artwork || []
  );

  return (
    <>
      <HomePageClient 
        featuredArtists={featuredArtists} 
        artworks={allArtworks} 
      />
      <ArticlesSection />
    </>
  );
} 