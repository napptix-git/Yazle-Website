
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PartnersCarousel from '@/components/PartnersCarousel';
import AudienceCards from '@/components/AudienceCards';
import Footer from '@/components/Footer';
import AnimatedCardSection from '@/components/AnimatedCardSection';
import GameIntelligence from '@/components/GameIntelligence';

const Index = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black" ref={pageRef}>
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <section id="hero">
        <HeroSection />
      </section>
      
      {/* Partners Carousel */}
      <section id="partners" className="bg-black py-12 mt-32 md:mt-56">
        <PartnersCarousel />
      </section>

      {/* Animated Card Section */}
      <section id="services" className="bg-black">
        <AnimatedCardSection />
      </section>
      
      {/* Advertisers and Publishers Section */}
      <section id="audience" className="mt-36 md:mt-48 bg-black">
        <AudienceCards />
      </section>
      
      {/* Footer */}
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default Index;
