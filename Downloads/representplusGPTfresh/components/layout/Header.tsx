"use client";
import React, { useState } from "react";
import { Logo } from "../ui/Logo";
import LinkWithCursor from '../ui/LinkWithCursor';

const navLinks = [
  { href: "/artists", label: "Artists" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="w-full fixed top-0 left-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Logo />
        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8 text-base font-medium items-center">
          {navLinks.map((link) => (
            <LinkWithCursor key={link.href} href={link.href} className="hover:text-primary transition-colors">
              {link.label}
            </LinkWithCursor>
          ))}
          <LinkWithCursor href="/contact" className="bg-primary text-black font-bold px-6 py-2 rounded-full hover:opacity-90 transition-opacity">
            Let's Talk
          </LinkWithCursor>
        </nav>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded hover:bg-white/10 transition"
          aria-label="Open menu"
          onClick={() => setIsMenuOpen((v) => !v)}
        >
          <span className="block w-6 h-0.5 bg-white mb-1" />
          <span className="block w-6 h-0.5 bg-white mb-1" />
          <span className="block w-6 h-0.5 bg-white" />
        </button>
      </div>
      {/* Mobile overlay menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center md:hidden">
          <button
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded hover:bg-white/10 transition"
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="block w-6 h-0.5 bg-white rotate-45 absolute" style={{ top: '50%' }} />
            <span className="block w-6 h-0.5 bg-white -rotate-45 absolute" style={{ top: '50%' }} />
          </button>
          <nav className="flex flex-col gap-8 text-2xl font-semibold">
            {navLinks.map((link) => (
              <LinkWithCursor key={link.href} href={link.href} className="hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </LinkWithCursor>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
} 