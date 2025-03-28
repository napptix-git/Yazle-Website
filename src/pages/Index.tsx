
import React from 'react';
import { motion } from 'framer-motion';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PartnersCarousel from '@/components/PartnersCarousel';
import AudienceCards from '@/components/AudienceCards';
import ServicesWheel from '@/components/ServicesWheel';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Partners Carousel */}
      <PartnersCarousel />
      
      {/* Advertisers and Publishers Section */}
      <AudienceCards />
      
      {/* Services Wheel */}
      <ServicesWheel />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
