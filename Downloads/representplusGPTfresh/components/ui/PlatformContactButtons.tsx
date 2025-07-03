"use client";
import { FaInstagram, FaEnvelope, FaTwitter, FaArtstation } from 'react-icons/fa';

const contactLinks = [
  {
    name: 'Instagram',
    icon: FaInstagram,
    url: 'https://instagram.com/representplus',
  },
  {
    name: 'Twitter',
    icon: FaTwitter,
    url: 'https://twitter.com/representplus',
  },
  {
    name: 'Artstation',
    icon: FaArtstation,
    url: 'https://artstation.com/representplus',
  },
  {
    name: 'Email',
    icon: FaEnvelope,
    url: 'mailto:info@representplus.com?subject=Inquiry&body=Hi, I\'d like to inquire about Represent+.',
  },
];

export const PlatformContactButtons = () => (
  <div className="flex gap-4 mt-6">
    {contactLinks.map((link) => (
      <a
        key={link.name}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={link.name}
        className="text-muted hover:text-primary transition-colors"
      >
        <link.icon size={24} />
      </a>
    ))}
  </div>
); 