
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PartnersCarousel from '@/components/PartnersCarousel';
import AudienceCards from '@/components/AudienceCards';
import Footer from '@/components/Footer';
import AnimatedCardSection from '@/components/AnimatedCardSection';
import GameIntelligence from '@/components/GameIntelligence';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Index = () => {
  // Initialize GSAP smooth scrolling
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Initialize smooth scroll with GSAP
    const smoother = gsap.from(document.documentElement, {
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.2,
      },
      ease: "power2.out",
    });

    return () => {
      // Clean up
      if (smoother) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black">
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

      {/* Game Intelligence Platform Section */}
      <section id="game-intelligence" className="bg-black">
        <GameIntelligence />
      </section>
      
      {/* Footer */}
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default Index;
