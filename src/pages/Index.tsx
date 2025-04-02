
import React from 'react';
import { motion } from 'framer-motion';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PartnersCarousel from '@/components/PartnersCarousel';
import AudienceCards from '@/components/AudienceCards';
import ServiceCards from '@/components/ServiceCards';
import Footer from '@/components/Footer';

const Index = () => {
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
      
      {/* Footer - Now full screen height */}
      <section className="h-screen">
        <Footer />
      </section>
    </div>
  );
};

export default Index;
