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

  // Get the two images to display side by side
  const firstImage = artworks[currentIndex];
  const secondImage = artworks[(currentIndex + 1) % artworks.length];

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 aspect-[16/9] bg-muted rounded-lg overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={firstImage.url}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full"
          >
            <Image
              src={firstImage.url}
              alt={firstImage.filename || 'Artwork'}
              fill
              className="object-contain rounded-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>
        
        <AnimatePresence initial={false}>
          <motion.div
            key={secondImage.url}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative w-full h-full"
          >
            <Image
              src={secondImage.url}
              alt={secondImage.filename || 'Artwork'}
              fill
              className="object-contain rounded-lg"
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