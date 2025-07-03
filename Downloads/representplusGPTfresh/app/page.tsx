import { getArtists } from '@/lib/airtable';
import dynamic from 'next/dynamic';

const HomePageClient = dynamic(() => import('@/components/home/HomePageClient'), { ssr: false });

export default async function HomePage() {
  // Fetch featured artists and their best artworks
  const artists = await getArtists({ featured: true });
  // Flatten all artworks from featured artists, mark the best (e.g., first artwork per artist)
  const featuredArtworks = artists.flatMap(artist => {
    if (artist.fields.Artworks && artist.fields.Artworks.length > 0) {
      // Assume the first artwork is the best for now
      return [{
        ...artist.fields.Artworks[0],
        artistName: artist.fields.Name,
        artistId: artist.id,
        profileImage: artist.fields.ProfileImage?.[0]?.url || null,
      }];
    }
    return [];
  });
  return <HomePageClient artists={artists} featuredArtworks={featuredArtworks} />;
} 