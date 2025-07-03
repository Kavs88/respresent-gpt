import { SocialLinks } from '@/components/ui/SocialLinks';

export const Footer = () => (
  <footer className="border-t border-border">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 py-8 px-4">
      <p className="text-sm text-muted">© {new Date().getFullYear()} Represent+. All Rights Reserved.</p>
      <SocialLinks />
    </div>
  </footer>
); 