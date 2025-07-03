'use client';
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

export function MagneticButton({ children, className = '', href }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  function handleMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.2);
    y.set(relY * 0.2);
  }
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
    >
      {href ? (
        <Link href={href} className="relative z-10 px-8 py-4 rounded-full bg-primary text-black font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-200">
          {children}
        </Link>
      ) : (
        <button type="button" className="relative z-10 px-8 py-4 rounded-full bg-primary text-black font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-200">
          {children}
        </button>
      )}
    </motion.div>
  );
} 