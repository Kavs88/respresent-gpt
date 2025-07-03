'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Attachment } from '@/types/artist';

interface ArtworkCarouselProps {
  artworks: Attachment[];
}

export function ArtworkCarousel({ artworks }: ArtworkCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!artworks || artworks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted text-lg">No artwork available at this time.</p>
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? artworks.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === artworks.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentArtwork = artworks[currentIndex];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-foreground mb-2">Artwork Gallery</h3>
        <p className="text-muted">
          {currentIndex + 1} of {artworks.length}
        </p>
      </div>

      <div className="relative">
        {/* Main Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted/20">
          <Image
            src={currentArtwork.url}
            alt={currentArtwork.filename || `Artwork ${currentIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
          />
        </div>

        {/* Navigation Buttons */}
        {artworks.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
              aria-label="Previous artwork"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
              aria-label="Next artwork"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {artworks.length > 1 && (
        <div className="flex gap-2 justify-center overflow-x-auto pb-2">
          {artworks.map((artwork, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative flex-shrink-0 w-16 h-16 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                index === currentIndex 
                  ? 'border-primary' 
                  : 'border-muted/30 hover:border-muted/60'
              }`}
            >
              <Image
                src={artwork.url}
                alt={artwork.filename || `Artwork ${index + 1}`}
                fill
                sizes="64px"
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </button>
          ))}
        </div>
      )}
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