"use client";

import Image from "next/image";
import { ArtworkCarousel } from "@/components/artists/ArtworkCarousel";
import PlatformContactButtons from "@/components/ui/PlatformContactButtons";
import ContactModal from "@/components/ui/ContactModal";
import { Artist } from "@/types/artist";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ArtistPageClient({ artist }: { artist: Artist }) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  // Set up the dynamic theme styles with fallbacks
  const themeStyles = {
    '--bg-color': artist.fields.ThemeBackgroundColor || '#0E0E0E',
    '--text-color': artist.fields.ThemeTextColor || '#E5E5E5',
    '--primary-color': artist.fields.ThemePrimaryColor || '#00ff9d',
    '--card-bg': artist.fields.ThemeBackgroundColor ? `${artist.fields.ThemeBackgroundColor}20` : '#1a1a1a',
    '--border-color': artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}30` : '#404040',
  } as React.CSSProperties;

  return (
    <main className="min-h-screen transition-colors duration-500" style={{
      ...themeStyles,
      backgroundColor: artist.fields.ThemeBackgroundColor || '#0E0E0E',
      color: artist.fields.ThemeTextColor || '#E5E5E5'
    }}>
      
      {/* Hero Banner Section */}
      {artist.fields.GeneratedBannerImage?.[0]?.url && (
        <div className="relative w-full h-80 md:h-96 lg:h-[500px] overflow-hidden">
          <Image
            src={artist.fields.GeneratedBannerImage[0].url}
            alt={`${artist.fields.Name} banner`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0" style={{
            background: `linear-gradient(to top, ${artist.fields.ThemeBackgroundColor || '#0E0E0E'}, ${artist.fields.ThemeBackgroundColor || '#0E0E0E'}60, transparent)`
          }} />
          <div className="absolute inset-0" style={{
            background: `linear-gradient(to right, ${artist.fields.ThemeBackgroundColor || '#0E0E0E'}40, transparent, transparent)`
          }} />
        </div>
      )}

      {/* Main Content Area */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Profile Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col lg:flex-row items-center gap-8 mb-16 relative -mt-20 lg:-mt-32"
            >
              {/* Artist Avatar */}
              <div className="relative w-48 h-48 lg:w-64 lg:h-64 flex-shrink-0">
                <div 
                  className="absolute inset-0 rounded-full border-4 shadow-2xl"
                  style={{ borderColor: artist.fields.ThemePrimaryColor || '#00ff9d' }}
                />
                <Image
                  src={artist.fields.ProfileImage?.[0]?.url || '/placeholder-avatar.png'}
                  alt={artist.fields.Name}
                  fill
                  className="rounded-full object-cover p-3"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-theme-primary rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              {/* Artist Info */}
              <div className="text-center lg:text-left flex-1">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-5xl lg:text-7xl font-serif font-bold mb-4"
                  style={{ color: artist.fields.ThemePrimaryColor || '#00ff9d' }}
                >
                  {artist.fields.Name}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-2xl lg:text-3xl mb-6"
                  style={{ color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}80` : '#888888' }}
                >
                  {artist.fields.Speciality}
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-wrap gap-4 justify-center lg:justify-start mb-6"
                >
                  <span className="px-4 py-2 rounded-full text-sm font-medium" style={{
                    backgroundColor: artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}20` : 'rgba(0, 255, 157, 0.2)',
                    color: artist.fields.ThemePrimaryColor || '#00ff9d'
                  }}>
                    Available for Commissions
                  </span>
                  <span className="px-4 py-2 rounded-full text-sm font-medium" style={{
                    backgroundColor: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}10` : 'rgba(136, 136, 136, 0.2)',
                    color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}80` : '#888888'
                  }}>
                    Professional Artist
                  </span>
                </motion.div>
                
                {/* Let's Talk Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  onClick={() => setIsContactModalOpen(true)}
                  className="px-8 py-3 rounded-full font-bold text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  style={{
                    backgroundColor: artist.fields.ThemePrimaryColor || '#00ff9d',
                    color: '#000000'
                  }}
                >
                  Let's Talk
                </motion.button>
              </div>
            </motion.div>
            
            {/* Main Content */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="max-w-4xl mx-auto space-y-12 mb-32"
            >
              {/* About Section */}
              <section className="backdrop-blur-sm rounded-2xl p-8" style={{
                backgroundColor: artist.fields.ThemeBackgroundColor ? `${artist.fields.ThemeBackgroundColor}20` : 'rgba(26, 26, 26, 0.5)',
                border: `1px solid ${artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}30` : 'rgba(64, 64, 64, 0.5)'}`
              }}>
                                  <h2 className="text-3xl font-serif font-bold mb-6" style={{ color: artist.fields.ThemePrimaryColor || '#00ff9d' }}>About the Artist</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-lg leading-relaxed whitespace-pre-line" style={{ color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}90` : '#E5E5E5' }}>
                      {artist.fields.Bio}
                    </p>
                  </div>
              </section>

                              {/* Artwork Gallery */}
                {artist.fields.Artwork && artist.fields.Artwork.length > 0 && (
                  <section className="backdrop-blur-sm rounded-2xl p-8" style={{
                    backgroundColor: artist.fields.ThemeBackgroundColor ? `${artist.fields.ThemeBackgroundColor}20` : 'rgba(26, 26, 26, 0.5)',
                    border: `1px solid ${artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}30` : 'rgba(64, 64, 64, 0.5)'}`
                  }}>
                                      <div className="text-center mb-8">
                      <h2 className="text-3xl font-serif font-bold mb-2" style={{ color: artist.fields.ThemePrimaryColor || '#00ff9d' }}>Portfolio</h2>
                      <p style={{ color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}80` : '#888888' }}>Explore the artist's latest works</p>
                    </div>
                  <ArtworkCarousel artworks={artist.fields.Artwork} themeColor={artist.fields.ThemePrimaryColor} />
                </section>
              )}

              {/* Artist Stats */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="backdrop-blur-sm rounded-xl p-6 text-center" style={{
                  backgroundColor: artist.fields.ThemeBackgroundColor ? `${artist.fields.ThemeBackgroundColor}20` : 'rgba(26, 26, 26, 0.5)',
                  border: `1px solid ${artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}30` : 'rgba(64, 64, 64, 0.5)'}`
                }}>
                  <div className="text-3xl font-bold mb-2" style={{ color: artist.fields.ThemePrimaryColor || '#00ff9d' }}>5+</div>
                  <div style={{ color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}80` : '#888888' }}>Years Experience</div>
                </div>
                <div className="backdrop-blur-sm rounded-xl p-6 text-center" style={{
                  backgroundColor: artist.fields.ThemeBackgroundColor ? `${artist.fields.ThemeBackgroundColor}20` : 'rgba(26, 26, 26, 0.5)',
                  border: `1px solid ${artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}30` : 'rgba(64, 64, 64, 0.5)'}`
                }}>
                  <div className="text-3xl font-bold mb-2" style={{ color: artist.fields.ThemePrimaryColor || '#00ff9d' }}>50+</div>
                  <div style={{ color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}80` : '#888888' }}>Projects Completed</div>
                </div>
                <div className="backdrop-blur-sm rounded-xl p-6 text-center" style={{
                  backgroundColor: artist.fields.ThemeBackgroundColor ? `${artist.fields.ThemeBackgroundColor}20` : 'rgba(26, 26, 26, 0.5)',
                  border: `1px solid ${artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}30` : 'rgba(64, 64, 64, 0.5)'}`
                }}>
                  <div className="text-3xl font-bold mb-2" style={{ color: artist.fields.ThemePrimaryColor || '#00ff9d' }}>100%</div>
                  <div style={{ color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}80` : '#888888' }}>Client Satisfaction</div>
                </div>
              </section>

              {/* Contact Section */}
              <section className="backdrop-blur-sm rounded-2xl p-8 text-center" style={{
                backgroundColor: artist.fields.ThemeBackgroundColor ? `${artist.fields.ThemeBackgroundColor}20` : 'rgba(26, 26, 26, 0.5)',
                border: `1px solid ${artist.fields.ThemePrimaryColor ? `${artist.fields.ThemePrimaryColor}30` : 'rgba(64, 64, 64, 0.5)'}`
              }}>
                <h2 className="text-3xl font-serif font-bold mb-4" style={{ color: artist.fields.ThemePrimaryColor || '#00ff9d' }}>
                  Ready to Work Together?
                </h2>
                <p className="text-lg mb-8" style={{ color: artist.fields.ThemeTextColor ? `${artist.fields.ThemeTextColor}90` : '#E5E5E5' }}>
                  Let's discuss your project and bring your vision to life with {artist.fields.Name}'s unique artistic style.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsContactModalOpen(true)}
                  className="px-10 py-4 rounded-full font-bold text-xl transition-all duration-200 hover:shadow-lg"
                  style={{
                    backgroundColor: artist.fields.ThemePrimaryColor || '#00ff9d',
                    color: '#000000'
                  }}
                >
                  Start Your Project
                </motion.button>
              </section>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        artistName={artist.fields.Name}
        themePrimaryColor={artist.fields.ThemePrimaryColor}
        themeBackgroundColor={artist.fields.ThemeBackgroundColor}
        themeTextColor={artist.fields.ThemeTextColor}
      />
    </main>
  );
} 