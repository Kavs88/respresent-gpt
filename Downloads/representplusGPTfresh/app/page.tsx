import { getArtists } from '@/lib/airtable';
import dynamic from 'next/dynamic';
import { PlatformContactButtons } from '@/components/ui/PlatformContactButtons';

const HomePageClient = dynamic(() => import('@/components/home/HomePageClient'), { ssr: false });

export default async function HomePage() {
  const featuredArtists = await getArtists({ featuredOnly: true });
  // Flatmap all artworks from featured artists
  const allArtworks = featuredArtists.flatMap((artist: any) => artist.fields.Artwork || []);

  return (
    <HomePageClient artworks={allArtworks} featuredArtists={featuredArtists} />
  );
} 