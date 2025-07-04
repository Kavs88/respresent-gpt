import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getArtistById } from '../../../lib/airtable';
import { Artist } from '@/types/artist';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  Music, 
  Newspaper, 
  Play, 
  Globe,
  Instagram,
  Twitter,
  Mail
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ArtistPageProps {
  params: {
    id: string;
  };
}

// Animation variants
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default async function ArtistPage({ params }: ArtistPageProps) {
  const artist = await getArtistById(params.id);

  if (!artist) {
    notFound();
  }

  // Dynamic theming system
  const themeStyles = {
    '--primary-color': artist.fields.ThemePrimaryColor || '#00FFA3',
    '--background-color': artist.fields.ThemeBackgroundColor || '#0E0E0E',
    '--text-color': artist.fields.ThemeTextColor || '#E5E5E5',
  } as React.CSSProperties;

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
      <main 
        style={themeStyles} 
        className="min-h-screen bg-[var(--background-color)] text-[var(--text-color)]"
      >
        {/* Hero Section with Full-Width Feature Image */}
        <section className="relative w-full h-[70vh] min-h-[600px] overflow-hidden">
          {artist.fields.ProfileImage?.[0]?.url ? (
            <Image
              src={artist.fields.ProfileImage[0].url}
              alt={artist.fields.Name}
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Hero Content */}
          <div className="absolute inset-0 flex items-end">
            <div className="w-full max-w-7xl mx-auto px-6 pb-16">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center"
              >
                <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-4">
                  {artist.fields.Name}
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto">
                  {artist.fields.Specialty}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Sticky Sidebar */}
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="sticky top-8 space-y-8">
                
                {/* Profile Image */}
                <div className="relative">
                  <div className="w-full aspect-square rounded-2xl overflow-hidden border-2 shadow-2xl"
                       style={{ borderColor: 'var(--primary-color)' }}>
                    {artist.fields.ProfileImage?.[0]?.url ? (
                      <Image
                        src={artist.fields.ProfileImage[0].url}
                        alt={artist.fields.Name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">No Image</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact & Social Links */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold" style={{ color: 'var(--primary-color)' }}>
                    Connect
                  </h3>
                  <div className="space-y-3">
                    {artist.fields.Email && (
                      <a 
                        href={`mailto:${artist.fields.Email}`}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <Mail className="w-5 h-5 text-gray-400 group-hover:text-[var(--primary-color)] transition-colors" />
                        <span className="text-sm">Email</span>
                      </a>
                    )}
                    {artist.fields.Instagram && (
                      <a 
                        href={artist.fields.Instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <Instagram className="w-5 h-5 text-gray-400 group-hover:text-[var(--primary-color)] transition-colors" />
                        <span className="text-sm">Instagram</span>
                      </a>
                    )}
                    {artist.fields.Twitter && (
                      <a 
                        href={artist.fields.Twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <Twitter className="w-5 h-5 text-gray-400 group-hover:text-[var(--primary-color)] transition-colors" />
                        <span className="text-sm">Twitter</span>
                      </a>
                    )}
                    {artist.fields.Website && (
                      <a 
                        href={artist.fields.Website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <Globe className="w-5 h-5 text-gray-400 group-hover:text-[var(--primary-color)] transition-colors" />
                        <span className="text-sm">Website</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div 
              className="lg:col-span-2 space-y-16"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              
              {/* Biography Section */}
              <motion.section variants={fadeUp}>
                <h2 className="text-3xl font-serif font-bold mb-8" style={{ color: 'var(--primary-color)' }}>
                  Biography
                </h2>
                <div className="prose prose-lg prose-invert max-w-none">
                  <p className="text-lg leading-relaxed text-gray-300">
                    {artist.fields.Bio || `Discover the unique artistic vision of ${artist.fields.Name}, a talented ${artist.fields.Specialty} whose work pushes boundaries and challenges conventions.`}
                  </p>
                </div>
              </motion.section>

              {/* Featured Article */}
              {artist.fields.FeaturedArticle && (
                <motion.section variants={fadeUp}>
                  <h2 className="text-3xl font-serif font-bold mb-8" style={{ color: 'var(--primary-color)' }}>
                    Featured Article
                  </h2>
                  <article className="prose prose-lg prose-invert max-w-none bg-white/5 rounded-2xl p-8 border border-white/10">
                    <ReactMarkdown>{artist.fields.FeaturedArticle}</ReactMarkdown>
                  </article>
                </motion.section>
              )}

              {/* Artwork Gallery */}
              {artist.fields.Artwork && artist.fields.Artwork.length > 0 && (
                <motion.section variants={fadeUp}>
                  <h2 className="text-3xl font-serif font-bold mb-8" style={{ color: 'var(--primary-color)' }}>
                    Artwork Gallery
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {artist.fields.Artwork.map((artwork, index) => (
                      <motion.div
                        key={artwork.id || index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group relative aspect-square rounded-2xl overflow-hidden border border-white/10 hover:border-[var(--primary-color)]/50 transition-colors"
                      >
                        <Image
                          src={artwork.url}
                          alt={artwork.filename || `Artwork ${index + 1}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
} 