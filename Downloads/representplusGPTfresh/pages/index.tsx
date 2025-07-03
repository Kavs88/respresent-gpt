
import { GetStaticProps } from 'next';
import { getArtists } from '../lib/airtable';

export default function Home({ artists }: { artists: any[] }) {
  return (
    <main className="bg-black text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Featured Artists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map((artist, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded shadow">
            <h2 className="text-2xl">{artist.fields.Name}</h2>
            <p>{artist.fields.Bio}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const artists = await getArtists();
  return {
    props: {
      artists
    },
    revalidate: 10
  };
};
