"use client";
import { ArtistCard } from "@/components/artists/ArtistCard";
import { Artist } from "@/types/artist";
import Link from "next/link";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { MagneticButton } from "@/components/ui/MagneticButton";
import ArtworkCarousel from "@/components/home/ArtworkCarousel";

export default function HomePageClient({ featuredArtists, artworks }: { featuredArtists: Artist[]; artworks?: any[] }) {
  return (
    <div className="bg-background text-foreground font-sans overflow-x-hidden">
      {/* === Immersive Hero Section === */}
      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden py-20 px-4">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-primary to-green-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-primary to-green-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-4">
            <AnimatedText text="DISCOVER" el="span" className="block text-white" />
            <AnimatedText text="EXCEPTIONAL" el="span" className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400" delay={0.3} />
            <AnimatedText text="TALENT" el="span" className="block text-white" delay={0.6} />
          </h1>
          <RevealOnScroll delay={1.2}>
            <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mt-6">
              A curated platform showcasing the most innovative contemporary artists from around the world.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={1.4}>
            <Link href="/artists" className="mt-8 inline-block">
              <MagneticButton className="bg-green-400 text-black font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:brightness-110 transition">
                Explore the Roster
              </MagneticButton>
            </Link>
          </RevealOnScroll>
        </div>
      </section>

      {/* === Featured Work Carousel === */}
      {artworks && artworks.length > 0 && (
        <section className="py-24 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
               <h2 className="text-4xl font-serif font-bold text-foreground">Featured Work</h2>
               <p className="text-muted mt-2">A glimpse into the extraordinary.</p>
            </div>
            <ArtworkCarousel artworks={artworks} />
          </div>
        </section>
      )}

      {/* === Featured Artists Section (High-Contrast Theme) === */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black mb-6 text-center text-black">Featured Artists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArtists.map((artist) => (
              <div key={artist.id} className="bg-green-400/10 rounded-xl shadow-lg overflow-hidden flex flex-col cursor-pointer hover:cursor-none">
                <div className="relative w-full aspect-square p-3">
                  <img 
                    src={artist.fields.ProfileImage?.[0]?.url || '/placeholder-avatar.png'} 
                    alt={artist.fields.Name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1 flex flex-col p-4">
                  <h3 className="text-lg font-bold mb-2" style={{color: 'black'}}>{artist.fields.Name}</h3>
                  <p className="text-sm flex-1" style={{color: 'black'}}>{artist.fields.Specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 