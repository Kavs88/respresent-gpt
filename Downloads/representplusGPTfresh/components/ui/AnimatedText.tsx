'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedText({ children, className = '', delay = 0 }: AnimatedTextProps) {
  // Split text into lines, then words, then letters
  const lines = typeof children === 'string' ? children.split('\n') : [children];
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <AnimatePresence>
            <motion.span
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: delay + i * 0.2,
                duration: 0.7,
                ease: 'easeOut',
              }}
              className="inline-block"
            >
              {line}
            </motion.span>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
} 