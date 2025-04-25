
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PartnersCarousel from '@/components/PartnersCarousel';
import AudienceCards from '@/components/AudienceCards';
import Footer from '@/components/Footer';
import AnimatedCardSection from '@/components/AnimatedCardSection';
import WizoraSection from '@/components/WizoraSection';

const Index = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black" ref={pageRef}>
      <Navbar />
      
      <section id="hero">
        <HeroSection />
      </section>
      
      <section id="partners" className="bg-black py-12 mt-32 md:mt-56">
        <PartnersCarousel />
      </section>

      <section id="services" className="bg-black">
        <AnimatedCardSection />
      </section>
      
      <section id="audience" className="mt-36 md:mt-48 bg-black">
        <AudienceCards />
      </section>
      
      <section id="wizora" className="mt-36 md:mt-48 bg-black">
        <WizoraSection />
      </section>
      
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default Index;
