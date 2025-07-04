'use client';
import React from 'react';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { MagneticButton } from '@/components/ui/MagneticButton';
import Image from 'next/image';
import LinkWithCursor from '../ui/LinkWithCursor';
import { ArtistCard } from '@/components/artists/ArtistCard';
import ArtworkCarousel from './ArtworkCarousel';
import ContactSection from './ContactSection';
import { Artist } from '@/lib/airtable';
import { Attachment } from '@/lib/airtable';
import ArtistTicker from './ArtistTicker';

interface HomePageClientProps {
  featuredArtists: Artist[];
  artworks: Attachment[];
}

export default function HomePageClient({ featuredArtists, artworks }: HomePageClientProps) {

  // Testimonials (static for now)
  const testimonials = [
    {
      quote: 'Represent+ connected me with the perfect gallery. The process was seamless and inspiring.',
      name: 'Sophie T.',
      role: 'Visual Artist',
    },
    {
      quote: 'I found my dream collaborator through this platform. The exposure is next-level.',
      name: 'Liam R.',
      role: 'Designer',
    },
    {
      quote: 'The featured section is a game-changer for emerging talent.',
      name: 'Ava M.',
      role: 'Curator',
    },
  ];

  return (
    <div className="bg-[#0e0e0e] text-white font-sans overflow-x-hidden">
      {/* === Immersive Hero Section === */}
      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden py-32 px-4">
        {/* Animated background gradient shapes */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-primary to-green-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-primary to-green-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10">
          <RevealOnScroll delay={0}>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-4">
              <AnimatedText text="DISCOVER" className="block text-white" />
              <AnimatedText text="EXCEPTIONAL" className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400" delay={0.3} highlightIndex={9} />
              <AnimatedText text="TALENT" className="block text-white" delay={0.6} />
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.3}>
            <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mt-6">
              A curated platform showcasing the most innovative contemporary artists from around the world.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={1.4}>
            <LinkWithCursor href="/artists" className="mt-8 inline-block">
              <MagneticButton className="bg-primary text-black font-bold text-lg px-8 py-4 rounded-full shadow-lg transition-transform transition-all duration-300 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary/50">
                Explore the Roster
              </MagneticButton>
            </LinkWithCursor>
          </RevealOnScroll>
        </div>
      </section>

      {/* === Featured Work Carousel === */}
      {artworks.length > 0 && (
        <section className="py-16 bg-card border-y border-border">
          <div className="text-center mb-8">
            <RevealOnScroll delay={0.1}>
              <h2 className="text-4xl font-serif font-bold text-white">Featured Work</h2>
            </RevealOnScroll>
          </div>
          <ArtworkCarousel artworks={artworks} />
        </section>
      )}

      {/* === Featured Artists Section (High-Contrast Theme) === */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <RevealOnScroll delay={0.1}>
              <h2 className="text-5xl font-black text-black tracking-tight">Featured Artists</h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p className="text-xl text-black/80 max-w-2xl mx-auto mt-4">
                The visionaries shaping our creative landscape.
              </p>
            </RevealOnScroll>
          </div>
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-primary/40 scrollbar-track-transparent -mx-4 px-4">
            <div className="flex gap-6 md:gap-8">
              {featuredArtists.map((artist) => (
                <div key={artist.id} className="min-w-[260px] max-w-xs flex-shrink-0">
                  <ArtistCard artist={artist} themeColor={artist.fields.ThemePrimaryColor} />
                </div>
              ))}
            </div>
            <div className="mt-2 text-xs text-black/50 text-center select-none">Scroll to see more</div>
          </div>
        </div>
      </section>

      {/* === Call to Action Section === */}
      <section className="py-20 bg-background text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to connect with exceptional talent?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Browse our full roster or reach out to Represent+ for bespoke artist recommendations and collaborations.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <LinkWithCursor href="/artists">
              <MagneticButton className="bg-primary text-black font-bold text-lg px-8 py-4 rounded-full shadow-lg transition-transform transition-all duration-300 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary/50">
                View All Artists
              </MagneticButton>
            </LinkWithCursor>
            <LinkWithCursor href="/contact">
              <MagneticButton className="bg-black text-primary border border-primary font-bold text-lg px-8 py-4 rounded-full shadow-lg transition-transform transition-all duration-300 hover:bg-primary hover:text-black focus:outline-none focus:ring-2 focus:ring-primary/50">
                Contact the Agency
              </MagneticButton>
            </LinkWithCursor>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
} 