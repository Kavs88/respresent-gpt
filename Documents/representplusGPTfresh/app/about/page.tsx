"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import SEOHead from '@/components/ui/SEOHead';

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
    <>
      <SEOHead 
        title="About Represent+"
        description="Discover the story behind Represent+, the premier platform connecting exceptional creative talent with opportunities worldwide. Learn about our mission, values, and commitment to artistic excellence."
        keywords={['about us', 'artist representation', 'creative platform', 'artists', 'representation agency', 'creative talent']}
        url="/about"
      />
      
      <div className="min-h-screen bg-background text-foreground">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20">
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `
                repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(0,255,157,0.1) 60px, rgba(0,255,157,0.1) 62px),
                repeating-linear-gradient(-45deg, transparent, transparent 60px, rgba(0,255,157,0.1) 60px, rgba(0,255,157,0.1) 62px)
              `,
              backgroundSize: '120px 120px, 120px 120px'
            }} />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <RevealOnScroll delay={0}>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
                About <span className="text-primary">Represent+</span>
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We're the premier platform connecting exceptional creative talent with opportunities worldwide. 
                Bridging the gap between visionary artists and the global stage they deserve.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our Mission
              </h2>
              <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-border/50 shadow-xl">
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-6">
                  We believe that exceptional talent deserves exceptional representation. Our mission is to discover, 
                  showcase, and connect the world's most innovative creative professionals with the opportunities, 
                  collaborations, and audiences that will amplify their impact and accelerate their success.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                  Through our curated platform, we're building a global ecosystem where artists, designers, 
                  creators, and visionaries can thrive, collaborate, and reach their full potential.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4 bg-muted/10">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our Values
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>
            
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <motion.div 
                variants={fadeUp}
                className="group bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Artistic Excellence</h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  We champion only the highest caliber of creative work, ensuring every artist we represent 
                  meets our rigorous standards of innovation and quality.
                </p>
              </motion.div>
              
              <motion.div 
                variants={fadeUp}
                className="group bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Authentic Partnerships</h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  We build genuine, long-term relationships with our artists, providing personalized support 
                  and strategic guidance throughout their creative journey.
                </p>
              </motion.div>
              
              <motion.div 
                variants={fadeUp}
                className="group bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Global Impact</h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  We connect talent with opportunities across borders, cultures, and industries, 
                  creating a truly global creative community.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* How to Connect Section */}
        <section className="py-20 px-4 bg-muted/10">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                How to Connect
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Whether you're an artist or a partner, we're here to help you succeed
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-border/50 shadow-xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">For Artists</h3>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Ready to take your creative career to the next level? We're always looking for 
                    exceptional talent to join our roster.
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Submit your portfolio for review
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Connect with our team for consultation
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Explore collaboration opportunities
                    </li>
                  </ul>
                </div>
                
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">For Partners</h3>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Looking for exceptional creative talent for your next project? 
                    We can connect you with the perfect artist.
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Browse our curated artist roster
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Request custom artist recommendations
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Discuss partnership opportunities
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center mt-12">
                <a 
                  href="/contact" 
                  className="inline-flex items-center gap-3 bg-primary text-black font-bold px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
                >
                  Get in Touch
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
} 