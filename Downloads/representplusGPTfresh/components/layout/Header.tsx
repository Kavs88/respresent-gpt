"use client";
import React, { useState } from "react";
import { Logo } from "../ui/Logo";
import Link from "next/link";

const navLinks = [
  { href: "/artists", label: "Artists" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="w-full fixed top-0 left-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Logo />
        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8 text-base font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded hover:bg-white/10 transition"
          aria-label="Open menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="block w-6 h-0.5 bg-white mb-1" />
          <span className="block w-6 h-0.5 bg-white mb-1" />
          <span className="block w-6 h-0.5 bg-white" />
        </button>
      </div>
      {/* Mobile nav */}
      {menuOpen && (
        <nav className="md:hidden bg-background/95 backdrop-blur-sm border-t border-border px-4 pb-4">
          <ul className="flex flex-col gap-4 mt-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="block py-2 px-2 rounded hover:text-primary transition-colors" onClick={() => setMenuOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
} 