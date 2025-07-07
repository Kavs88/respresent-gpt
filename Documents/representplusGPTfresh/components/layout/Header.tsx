"use client";
import React, { useState, useEffect } from "react";
import { Logo } from "../ui/Logo";
import LinkWithCursor from '../ui/LinkWithCursor';

const navLinks = [
  { href: "/artists", label: "Artists" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header 
      className={`w-full sticky top-0 left-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border transition-shadow duration-300 ${scrolled ? 'shadow-lg' : ''}`}
      role="banner"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Logo />
        {/* Desktop nav */}
        <nav 
          className="hidden md:flex gap-8 text-base font-medium items-center"
          id="main-navigation"
          role="navigation"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <LinkWithCursor 
              key={link.href} 
              href={link.href} 
              className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded"
            >
              {link.label}
            </LinkWithCursor>
          ))}
          <LinkWithCursor 
            href="/contact" 
            className="bg-primary text-black font-bold px-5 py-2 rounded-full hover:opacity-90 transition-opacity ml-4 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            Let's Talk
          </LinkWithCursor>
        </nav>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((v) => !v)}
        >
          <span className="block w-6 h-0.5 bg-white mb-1 transition-transform" style={{ transform: isMenuOpen ? 'rotate(45deg) translate(2px, 2px)' : 'none' }} />
          <span className="block w-6 h-0.5 bg-white mb-1 transition-opacity" style={{ opacity: isMenuOpen ? 0 : 1 }} />
          <span className="block w-6 h-0.5 bg-white transition-transform" style={{ transform: isMenuOpen ? 'rotate(-45deg) translate(2px, -2px)' : 'none' }} />
        </button>
      </div>
      {/* Mobile overlay menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center md:hidden"
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="block w-6 h-0.5 bg-white rotate-45 absolute" style={{ top: '50%' }} />
            <span className="block w-6 h-0.5 bg-white -rotate-45 absolute" style={{ top: '50%' }} />
          </button>
          <nav className="flex flex-col gap-8 text-2xl font-semibold" role="navigation" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <LinkWithCursor 
                key={link.href} 
                href={link.href} 
                className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded px-4 py-2" 
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </LinkWithCursor>
            ))}
            <LinkWithCursor 
              href="/contact" 
              className="bg-primary text-black font-bold px-6 py-3 rounded-full hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              onClick={() => setIsMenuOpen(false)}
            >
              Let's Talk
            </LinkWithCursor>
          </nav>
        </div>
      )}
    </header>
  );
} 