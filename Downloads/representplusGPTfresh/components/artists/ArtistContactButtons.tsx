import { FaEnvelope, FaPhone, FaGlobe, FaInstagram, FaTwitter } from 'react-icons/fa';

interface ArtistContactButtonsProps {
  artist: {
    fields: {
      Email?: string;
      Phone?: string;
      Website?: string;
      Instagram?: string;
      Twitter?: string;
    };
  };
}

export function ArtistContactButtons({ artist }: ArtistContactButtonsProps) {
  const { Email, Phone, Website, Instagram, Twitter } = artist.fields;

  const contactMethods = [
    { icon: FaEnvelope, href: Email ? `mailto:${Email}` : null, label: 'Email', color: 'hover:bg-red-500' },
    { icon: FaPhone, href: Phone ? `tel:${Phone}` : null, label: 'Phone', color: 'hover:bg-green-500' },
    { icon: FaGlobe, href: Website || null, label: 'Website', color: 'hover:bg-blue-500' },
    { icon: FaInstagram, href: Instagram ? `https://instagram.com/${Instagram}` : null, label: 'Instagram', color: 'hover:bg-pink-500' },
    { icon: FaTwitter, href: Twitter ? `https://twitter.com/${Twitter}` : null, label: 'Twitter', color: 'hover:bg-sky-500' },
  ].filter(method => method.href);

  if (contactMethods.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted text-sm">No contact information available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {contactMethods.map((method, index) => (
        <a
          key={index}
          href={method.href!}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/20 text-foreground hover:text-white transition-all duration-300 ${method.color}`}
          title={method.label}
        >
          <method.icon className="w-4 h-4" />
          <span className="text-sm font-medium">{method.label}</span>
        </a>
      ))}
    </div>
  );
} 