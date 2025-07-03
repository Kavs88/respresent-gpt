'use client';
import React, { useState, useEffect } from 'react';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { MagneticButton } from '@/components/ui/MagneticButton';
import Image from 'next/image';
import Link from 'next/link';
import { ArtistCard } from '@/components/artists/ArtistCard';

interface Artwork {
  url: string;
  filename?: string;
}

interface Artist {
  id: string;
  fields: any;
}

interface HomePageClientProps {
  artworks: Artwork[];
  featuredArtists: Artist[];
}

export default function HomePageClient({ artworks, featuredArtists }: HomePageClientProps) {
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
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[60vh] py-24">
        <AnimatedText className="text-center text-5xl md:text-7xl font-black font-serif tracking-tight mb-8" delay={0.2}>
          {`DISCOVER\nEXCEPTIONAL\nTALENT`}
        </AnimatedText>
        <RevealOnScroll>
          <MagneticButton href="/artists" className="mt-6">
            View All Artists
          </MagneticButton>
        </RevealOnScroll>
        {/* Subtle animated background shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute left-1/2 top-1/3 w-[60vw] h-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        </div>
      </section>

      {/* Featured Work Carousel */}
      <section className="relative py-20">
        <RevealOnScroll>
          <h2 className="text-center text-3xl md:text-5xl font-bold font-serif mb-10 text-primary">Featured Work</h2>
        </RevealOnScroll>
        {artworks.length > 0 && (
          <div className="relative max-w-3xl mx-auto">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg bg-muted/20">
              <Image
                src={artworks[carouselIndex].url}
                alt={artworks[carouselIndex].filename || `Artwork ${carouselIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                style={{ objectFit: 'cover' }}
                className="rounded-2xl transition-all duration-700"
                priority
              />
            </div>
            {artworks.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {artworks.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCarouselIndex(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${i === carouselIndex ? 'bg-primary' : 'bg-muted/40'}`}
                    aria-label={`Go to artwork ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Featured Artists Section */}
      <section className="py-20 bg-primary text-black">
        <div className="container mx-auto">
          <RevealOnScroll>
            <h2 className="text-center text-3xl md:text-5xl font-bold font-serif mb-10">Featured Artists</h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {featuredArtists.map((artist) => (
              <RevealOnScroll key={artist.id}>
                <ArtistCard artist={artist} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background text-foreground border-t border-muted/20">
        <div className="container mx-auto max-w-4xl">
          <RevealOnScroll>
            <h2 className="text-center text-3xl md:text-5xl font-bold font-serif mb-10">Testimonials</h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <RevealOnScroll key={i}>
                <div className="bg-muted/10 rounded-2xl p-8 shadow-lg flex flex-col items-center text-center">
                  <p className="text-lg font-serif mb-4">“{t.quote}”</p>
                  <div className="font-bold text-primary">{t.name}</div>
                  <div className="text-muted text-sm">{t.role}</div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 