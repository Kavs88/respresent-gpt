"use client";
import React from "react";
import { FaInstagram, FaEnvelope, FaTwitter, FaArtstation } from 'react-icons/fa';

interface PlatformContactButtonsProps {
  artistName?: string;
}

const getMessage = (artistName?: string) =>
  artistName
    ? `Hi, I am contacting you regarding ${artistName}...`
    : "Hi, I would like to inquire about Represent+....";

function PlatformContactButtons({ artistName }: PlatformContactButtonsProps) {
  const message = encodeURIComponent(getMessage(artistName));
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={`mailto:hello@represent.plus?subject=Inquiry&body=${message}`}
        className="px-4 py-2 rounded bg-primary text-black font-semibold hover:bg-primary/80 transition"
        target="_blank"
        rel="noopener noreferrer"
      >
        Email
      </a>
      <a
        href={`https://wa.me/1234567890?text=${message}`}
        className="px-4 py-2 rounded bg-green-500 text-black font-semibold hover:bg-green-400 transition"
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp
      </a>
      <a
        href={`https://instagram.com/representplus`}
        className="px-4 py-2 rounded bg-pink-500 text-black font-semibold hover:bg-pink-400 transition"
        target="_blank"
        rel="noopener noreferrer"
      >
        Instagram
      </a>
    </div>
  );
}

export default PlatformContactButtons; 