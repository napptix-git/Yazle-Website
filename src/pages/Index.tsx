
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
    
    // Create a context to scope GSAP animations
    const ctx = gsap.context(() => {
      // Simple scroll animation instead of smoother
      gsap.fromTo(
        ".gsap-animate",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".gsap-animate",
            start: "top bottom",
            toggleActions: "play none none none"
          }
        }
      );
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
      <section id="partners" className="bg-black py-12 mt-32 md:mt-56 gsap-animate">
        <PartnersCarousel />
      </section>

      {/* Animated Card Section */}
      <section id="services" className="bg-black gsap-animate">
        <AnimatedCardSection />
      </section>
      
      {/* Advertisers and Publishers Section */}
      <section id="audience" className="mt-36 md:mt-48 bg-black gsap-animate">
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
