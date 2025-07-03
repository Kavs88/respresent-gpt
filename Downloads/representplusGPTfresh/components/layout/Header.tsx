import { Logo } from '@/components/ui/Logo';
import Link from 'next/link';

export const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
    <div className="container mx-auto flex h-16 items-center justify-between px-4">
      <Logo />
      <nav className="hidden md:flex gap-6">
        <Link href="/artists" className="text-muted hover:text-primary transition-colors">Artists</Link>
        <Link href="/about" className="text-muted hover:text-primary transition-colors">About</Link>
        <Link href="/contact" className="text-muted hover:text-primary transition-colors">Contact</Link>
      </nav>
    </div>
  </header>
); 