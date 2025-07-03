"use client";
import { motion } from 'framer-motion';
import { ElementType } from 'react';

interface AnimatedTextProps {
  text: string;
  el?: ElementType;
  className?: string;
  delay?: number;
}

export const AnimatedText = ({ text, el: Wrapper = 'p', className = '', delay = 0 }: AnimatedTextProps) => {
  const characters = text.split("");
  return (
    <Wrapper className={className}>
      <span className="sr-only">{text}</span>
      {characters.map((char: string, index: number) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delay + index * 0.05, ease: 'easeOut' }}
          aria-hidden
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </Wrapper>
  );
}; 