import React from 'react';
import { Metadata } from 'next';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export const metadata: Metadata = {
  title: 'About Us | Represent+',
  description: 'Discover Represent+, the premier platform connecting exceptional creative talent with opportunities worldwide. Learn about our mission, values, and commitment to artistic excellence.',
  openGraph: {
    title: 'About Us | Represent+',
    description: 'Discover Represent+, the premier platform connecting exceptional creative talent with opportunities worldwide.',
    type: 'website',
  },
};

// Animation variants
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-[#0E0E0E] via-[#0E0E0E] to-[#111111] overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00FFA3]/10 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <RevealOnScroll delay={0}>
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-primary mb-6">
              About Us
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto leading-relaxed">
              Represent+ is the premier platform connecting exceptional creative talent with opportunities worldwide. 
              We bridge the gap between visionary artists and the global stage they deserve.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div 
          className="space-y-20"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          
          {/* Mission Statement */}
          <motion.section variants={fadeUp}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                Our Mission
              </h2>
            </div>
            <div className="prose prose-lg prose-invert max-w-none text-center">
              <p className="text-lg leading-relaxed text-gray-300">
                We believe that exceptional talent deserves exceptional representation. Our mission is to discover, 
                showcase, and connect the world's most innovative creative professionals with the opportunities, 
                collaborations, and audiences that will amplify their impact and accelerate their success.
              </p>
              <p className="text-lg leading-relaxed text-gray-300 mt-6">
                Through our curated platform, we're building a global ecosystem where artists, designers, 
                creators, and visionaries can thrive, collaborate, and reach their full potential.
              </p>
            </div>
          </motion.section>

          {/* Team Values */}
          <motion.section variants={fadeUp}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                Our Values
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-lg bg-white/5 border border-white/10 hover:border-primary/30 transition-colors">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Artistic Excellence</h3>
                <p className="text-gray-300">
                  We champion only the highest caliber of creative work, ensuring every artist we represent 
                  meets our rigorous standards of innovation and quality.
                </p>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-white/5 border border-white/10 hover:border-primary/30 transition-colors">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Authentic Partnerships</h3>
                <p className="text-gray-300">
                  We build genuine, long-term relationships with our artists, providing personalized support 
                  and strategic guidance throughout their creative journey.
                </p>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-white/5 border border-white/10 hover:border-primary/30 transition-colors">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Global Impact</h3>
                <p className="text-gray-300">
                  We connect talent with opportunities across borders, cultures, and industries, 
                  creating a truly global creative community.
                </p>
              </div>
            </div>
          </motion.section>

          {/* How to Connect */}
          <motion.section variants={fadeUp}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                How to Connect
              </h2>
            </div>
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">For Artists</h3>
                  <p className="text-gray-300 mb-4">
                    Ready to take your creative career to the next level? We're always looking for 
                    exceptional talent to join our roster.
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Submit your portfolio for review</li>
                    <li>• Connect with our team for consultation</li>
                    <li>• Explore collaboration opportunities</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">For Partners</h3>
                  <p className="text-gray-300 mb-4">
                    Looking for exceptional creative talent for your next project? 
                    We can connect you with the perfect artist.
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Browse our curated artist roster</li>
                    <li>• Request custom artist recommendations</li>
                    <li>• Discuss partnership opportunities</li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <a 
                  href="/contact" 
                  className="inline-block bg-primary text-black font-semibold px-8 py-3 rounded-lg hover:brightness-110 transition-all"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
} 