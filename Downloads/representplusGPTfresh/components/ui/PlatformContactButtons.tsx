"use client";
import React from "react";
import Link from 'next/link';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';
import LinkWithCursor from './LinkWithCursor';

const contactMethods = [
  {
    name: 'WhatsApp',
    href: 'https://wa.me/1234567890',
    icon: <FaWhatsapp size={40} className="text-white mb-4" />,
    bg: 'bg-[#25D366] hover:bg-[#1DA851]',
    label: 'Chat on WhatsApp',
    brand: 'WhatsApp',
  },
  {
    name: 'Zalo',
    href: 'https://zalo.me/1234567890',
    icon: <SiZalo size={40} className="text-white mb-4" />,
    bg: 'bg-[#0068FF] hover:bg-[#0052CC]',
    label: 'Message on Zalo',
    brand: 'Zalo',
  },
  {
    name: 'Email',
    href: 'mailto:hello@representplus.com',
    icon: <FaEnvelope size={40} className="text-muted-foreground mb-4" />,
    bg: 'bg-muted hover:bg-opacity-80',
    label: 'Send us an Email',
    brand: 'Email',
  },
];

export default function PlatformContactButtons() {
  return (
    <div className="flex flex-col md:flex-row gap-6 w-full justify-center items-center mt-8">
      {contactMethods.map((method) => (
        <LinkWithCursor
          key={method.name}
          href={method.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`group flex flex-col items-center justify-center p-8 rounded-lg shadow-lg transition-all duration-200 text-center w-64 ${method.bg}`}
        >
          {method.icon}
          <span className="text-lg font-semibold text-white mb-2">{method.label}</span>
          <span className="text-xs opacity-80 text-white group-hover:opacity-100 transition">{method.brand}</span>
        </LinkWithCursor>
      ))}
    </div>
  );
} 