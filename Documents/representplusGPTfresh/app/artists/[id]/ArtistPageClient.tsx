"use client";

import Image from "next/image";
import { ArtworkCarousel } from "@/components/artists/ArtworkCarousel";
import PlatformContactButtons from "@/components/ui/PlatformContactButtons";
import { Artist } from "@/types/artist";

export default function ArtistPageClient({ artist }: { artist: Artist }) {
  // Set up the dynamic theme styles with fallbacks
  const themeStyles = {
    '--bg-color': artist.fields.ThemeBackgroundColor || '#0E0E0E',
    '--text-color': artist.fields.ThemeTextColor || '#E5E5E5',
    '--primary-color': artist.fields.ThemePrimaryColor || '#00ff9d',
  } as React.CSSProperties;

  return (
    <main style={themeStyles} className="bg-theme-bg text-theme-text min-h-screen transition-colors duration-500">
      
      {/* Banner Image Section */}
      {artist.fields.ProfileImage?.[0]?.url && (
        <div className="relative w-full h-64 md:h-80">
          <Image
            src={artist.fields.ProfileImage[0].url}
            alt={`${artist.fields.Name} banner`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-theme-bg/80 to-transparent" />
        </div>
      )}

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-12">
        <div className="relative max-w-5xl mx-auto">
          
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12 relative -mt-24 md:-mt-32">
            <div className="relative w-40 h-40 md:w-56 md:h-56 flex-shrink-0">
              <div 
                className="absolute inset-0 rounded-full border-4"
                style={{ borderColor: artist.fields.ThemePrimaryColor || '#00ff9d' }}
              />
              <Image
                src={artist.fields.ProfileImage?.[0]?.url || '/placeholder-avatar.png'}
                alt={artist.fields.Name}
                fill
                className="rounded-full object-cover p-2"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-theme-primary">{artist.fields.Name}</h1>
              <p className="text-xl md:text-2xl text-muted mt-2">{artist.fields.Specialty}</p>
            </div>
          </div>
          
          {/* Bio and Contact */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-serif font-bold mb-4">About the Artist</h2>
              <p className="text-lg leading-relaxed whitespace-pre-line">{artist.fields.Bio}</p>
            </div>
            <div className="lg:col-span-1">
               <h2 className="text-2xl font-serif font-bold mb-4">Inquire</h2>
               <PlatformContactButtons />
            </div>
          </div>

          {/* Artwork Gallery */}
          {artist.fields.Artwork && artist.fields.Artwork.length > 0 && (
            <div className="mt-20">
              <h2 className="text-3xl font-serif font-bold text-center mb-8">Gallery</h2>
              <ArtworkCarousel artworks={artist.fields.Artwork} />
            </div>
          )}

        </div>
      </div>
    </main>
  );
} 