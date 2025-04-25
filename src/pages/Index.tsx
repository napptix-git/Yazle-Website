
import React, { useEffect, useRef } from 'react';
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
  const pageRef = useRef<HTMLDivElement>(null);

  // Initialize GSAP on component mount
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Create a context to scope GSAP animations after the component is mounted and DOM is available
    const ctx = gsap.context(() => {
      // Simple animation for sections
      gsap.utils.toArray<HTMLElement>('.gsap-animate').forEach((section) => {
        gsap.fromTo(
          section,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: section,
              start: "top bottom-=100px",
              toggleActions: "play none none none",
              once: true
            }
          }
        );
      });
    }, pageRef);
    
    // Clean up all GSAP animations on unmount
    return () => {
      ctx.revert(); // This properly cleans up all animations
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
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
      <div className="gsap-animate">
        <section id="partners" className="bg-black py-12 mt-32 md:mt-56">
          <PartnersCarousel />
        </section>
      </div>

      {/* Animated Card Section */}
      <div className="gsap-animate">
        <section id="services" className="bg-black">
          <AnimatedCardSection />
        </section>
      </div>
      
      {/* Advertisers and Publishers Section */}
      <div className="gsap-animate">
        <section id="audience" className="mt-36 md:mt-48 bg-black">
          <AudienceCards />
        </section>
      </div>
      
      {/* Footer */}
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default Index;
