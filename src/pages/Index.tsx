
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PartnersCarousel from '@/components/PartnersCarousel';
import AudienceCards from '@/components/AudienceCards';
import ServiceCards from '@/components/ServiceCards';
import Footer from '@/components/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

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
      <section id="partners" className="bg-black py-12">
        <PartnersCarousel />
      </section>
      
      {/* Advertisers and Publishers Section - Added larger gap */}
      <section id="audience" className="mt-36 bg-black">
        <AudienceCards />
      </section>
      
      {/* Services Cards */}
      <section id="solutions" className="mt-24 bg-black">
        <ServiceCards />
      </section>
      
      {/* Footer - removed the h-screen class to fix spacing */}
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default Index;
