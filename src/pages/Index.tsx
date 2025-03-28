
import React from 'react';
import { motion } from 'framer-motion';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PartnersCarousel from '@/components/PartnersCarousel';
import AudienceCards from '@/components/AudienceCards';
import ServicesWheel from '@/components/ServicesWheel';
import Footer from '@/components/Footer';
import ScrollFlowPath from '@/components/ScrollFlowPath';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar />
      
      {/* Scroll Flow Path */}
      <ScrollFlowPath />
      
      {/* Hero Section */}
      <section id="hero">
        <HeroSection />
      </section>
      
      {/* Partners Carousel */}
      <section id="partners">
        <PartnersCarousel />
      </section>
      
      {/* Advertisers and Publishers Section */}
      <section id="audience">
        <AudienceCards />
      </section>
      
      {/* Services Wheel */}
      <section id="solutions">
        <ServicesWheel />
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
