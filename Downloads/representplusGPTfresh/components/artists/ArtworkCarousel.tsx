"use client";

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Attachment } from '@/types/artist';

export function ArtworkCarousel({ artworks, themeColor }: { artworks: Attachment[]; themeColor?: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Update selected index on slide change
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  if (!artworks || artworks.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative">
        <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
          <div className="flex">
            {artworks.map((artwork, idx) => (
              <div
                className="min-w-0 flex-[0_0_100%] relative aspect-[4/3] flex items-center justify-center p-2"
                key={artwork.id || artwork.url || idx}
                style={{ backgroundColor: themeColor || 'var(--border)' }}
              >
                <Image
                  src={artwork.url}
                  alt={artwork.filename || ''}
                  fill
                  className="object-cover rounded-md"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Prev/Next Buttons */}
        <button
          onClick={scrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full z-10"
          aria-label="Previous artwork"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full z-10"
          aria-label="Next artwork"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {artworks.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi && emblaApi.scrollTo(i)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${i === selectedIndex ? 'bg-primary' : 'bg-muted/40'}`}
            aria-label={`Go to artwork ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export function ArtworkCarouselPlaceholder() {
  // A simple grid display as a placeholder for a real carousel
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
      {Array.from({ length: 3 }, (_, index) => (
        <div key={index} className="relative aspect-square">
          <Image src={''} alt={''} fill className="object-cover rounded-md" />
        </div>
      ))}
    </div>
  );
} 