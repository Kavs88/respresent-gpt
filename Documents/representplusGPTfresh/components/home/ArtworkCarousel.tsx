"use client";
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { Attachment } from '@/lib/airtable';

export default function ArtworkCarousel({ artworks }: { artworks: Attachment[] }) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })]);

  if (!artworks || artworks.length === 0) return null;

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {artworks.map((artwork) => (
          <div className="relative flex-grow-0 flex-shrink-0 basis-full md:basis-1/2 lg:basis-1/3 p-4" key={artwork.id}>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={artwork.url}
                alt={artwork.filename || 'Artwork'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 