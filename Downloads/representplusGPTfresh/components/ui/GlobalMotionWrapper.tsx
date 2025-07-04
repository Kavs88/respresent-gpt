"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <motion.div
      className="hidden md:block fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary pointer-events-none z-[9999]"
      style={{ translateX: mousePosition.x - 16, translateY: mousePosition.y - 16 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    />
  );
};

export const GlobalMotionWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <CustomCursor />
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}; 