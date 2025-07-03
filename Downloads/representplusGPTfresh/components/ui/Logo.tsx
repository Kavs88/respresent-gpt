import Link from 'next/link';

export const Logo = () => (
  <Link href="/" className="text-2xl font-black tracking-tighter text-foreground transition-colors hover:text-primary" aria-label="Represent+ Home">
    Represent<span className="text-primary">.</span>+
  </Link>
); 