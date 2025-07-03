import Link from 'next/link';

export const Logo = () => (
  <Link href="/" aria-label="Represent+ Home">
    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="20" fill="#0E0E0E"/>
      <path d="M30 75V25H55C65 25 70 30 70 40C70 50 65 55 55 55H45" stroke="#00ff9d" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M50 55L70 75" stroke="#00ff9d" strokeWidth="10" strokeLinecap="round"/>
      <path d="M55 40H75" stroke="#00ff9d" strokeWidth="10" strokeLinecap="round"/>
      <path d="M65 30V50" stroke="#00ff9d" strokeWidth="10" strokeLinecap="round"/>
    </svg>
  </Link>
); 