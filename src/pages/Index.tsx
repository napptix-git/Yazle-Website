
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

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
  const navigate = useNavigate();
  const location = useLocation();
  
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

    // Add scroll to next page functionality
    const handleScrollToNextPage = () => {
      const isAtBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 50;
      
      if (isAtBottom) {
        // Define the navigation order
        const pageOrder = ['/', '/advertisers', '/publishers', '/about', '/contact'];
        const currentIndex = pageOrder.indexOf(location.pathname);
        
        if (currentIndex >= 0 && currentIndex < pageOrder.length - 1) {
          // Navigate to the next page
          navigate(pageOrder[currentIndex + 1]);
        }
      }
    };
    
    window.addEventListener('scroll', handleScrollToNextPage);

    return () => {
      // Clean up
      if (smoother) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
      window.removeEventListener('scroll', handleScrollToNextPage);
    };
  }, [navigate, location.pathname]);

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
