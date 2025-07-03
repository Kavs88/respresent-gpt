"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Attachment {
  url: string;
  filename?: string;
}

interface ArtworkCarouselProps {
  artworks: Attachment[];
}

export const ArtworkCarousel = ({ artworks }: ArtworkCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prev = () => setCurrentIndex((i) => (i - 1 + artworks.length) % artworks.length);
  const next = () => setCurrentIndex((i) => (i + 1) % artworks.length);

  if (!artworks || artworks.length === 0) return null;

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="overflow-hidden rounded-lg aspect-[4/3] bg-muted">
        <AnimatePresence initial={false}>
          <motion.div
            key={artworks[currentIndex].url}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full absolute inset-0 flex items-center justify-center"
          >
            <Image
              src={artworks[currentIndex].url}
              alt={artworks[currentIndex].filename || 'Artwork'}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 hover:bg-primary transition-colors z-10">
        &#8592;
      </button>
      <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 hover:bg-primary transition-colors z-10">
        &#8594;
      </button>
    </div>
  );
}; 