'use client';
import React, { useState, useEffect } from 'react';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { MagneticButton } from '@/components/ui/MagneticButton';
import Image from 'next/image';
import Link from 'next/link';
import { ArtistCard } from '@/components/artists/ArtistCard';
import { ArtworkCarousel } from './ArtworkCarousel';
import { Artist } from '@/types/artist';
import { Attachment } from '@/types/artist';

interface HomePageClientProps {
  featuredArtists: Artist[];
  artworks: Attachment[];
}

export default function HomePageClient({ featuredArtists, artworks }: HomePageClientProps) {
  // Carousel state
  const [carouselIndex, setCarouselIndex] = useState(0);
  useEffect(() => {
    if (artworks.length < 2) return;
    const interval = setInterval(() => {
      setCarouselIndex((i) => (i + 1) % artworks.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [artworks]);

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
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-4">
            <AnimatedText text="DISCOVER" className="block text-white" />
            <AnimatedText text="EXCEPTIONAL" className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400" delay={0.3} />
            <AnimatedText text="TALENT" className="block text-white" delay={0.6} />
          </h1>
          <RevealOnScroll delay={1.2}>
            <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mt-6">
              A curated platform showcasing the most innovative contemporary artists from around the world.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={1.4}>
            <Link href="/artists" className="mt-8 inline-block">
              <MagneticButton className="bg-primary text-black font-bold text-lg px-8 py-4 rounded-full shadow-lg transition-transform transition-all duration-300 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary/50">
                Explore the Roster
              </MagneticButton>
            </Link>
          </RevealOnScroll>
        </div>
      </section>

      {/* === Featured Work Carousel === */}
      {artworks.length > 0 && (
        <section className="py-32 bg-[#121212]">
          <div className="text-center mb-12">
             <h2 className="text-4xl font-serif font-bold text-white">Featured Work</h2>
          </div>
          {/* This assumes you have a carousel component that can take the artworks array */}
          <ArtworkCarousel artworks={artworks} />
        </section>
      )}

      {/* === Featured Artists Section (High-Contrast Theme) === */}
      <section className="py-32 bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black text-black tracking-tight">Featured Artists</h2>
            <p className="text-xl text-black/80 max-w-2xl mx-auto mt-4">
              The visionaries shaping our creative landscape.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArtists.map((artist) => (
              <div className="bg-black/10 p-4 rounded-lg" key={artist.id}>
                <ArtistCard artist={artist} />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* You can add back the Testimonials and Footer sections here later */}
    </div>
  );
} 