import React from "react";
import { Logo } from "../ui/Logo";
import Link from "next/link";
import SocialIcons from "../ui/SocialIcons";

const navLinks = [
  { href: "/artists", label: "Artists" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-card border-t border-border py-12 px-4 mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Logo and brand */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Logo />
          <span className="text-lg font-bold tracking-tight">Represent+</span>
          <span className="text-xs text-muted-foreground">Premium Artist Portfolio Platform</span>
        </div>
        {/* Navigation */}
        <nav className="flex flex-col items-center gap-2 md:items-center">
          <span className="uppercase text-xs font-semibold text-muted-foreground mb-2">Navigation</span>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        {/* Socials */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <span className="uppercase text-xs font-semibold text-muted-foreground mb-2">Connect</span>
          <SocialIcons />
        </div>
      </div>
      <div className="text-center text-xs text-muted-foreground mt-8">&copy; {new Date().getFullYear()} Represent+. All rights reserved.</div>
    </footer>
  );
} 