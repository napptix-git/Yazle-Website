import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PartnersCarousel from '@/components/PartnersCarousel';
import AudienceCards from '@/components/AudienceCards';
import Footer from '@/components/Footer';
import AnimatedCardSection from '@/components/AnimatedCardSection';
import NewsCarousel from '@/components/NewsCarousel';
import AnnouncementBar from '@/components/AnnouncementBar';
import InteractiveFooter from '@/components/InteractiveFooter';

const Index = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [navbarTop, setNavbarTop] = useState('25px');
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') {
      setNavbarTop('0px');
    }
  }, [location.pathname]);

  const handleAnnouncementCancel = () => {
    if (location.pathname === '/') {
      setNavbarTop('-10px');
    }
  };

  return (
    <div className="min-h-screen bg-black" ref={pageRef}>
      {location.pathname === '/' && (
        <div className="">
          <AnnouncementBar onCancel={handleAnnouncementCancel} />
        </div>
      )}

      <div style={{ position: 'relative', top: navbarTop }}>
        <Navbar />
      </div>
      
      <section id="hero">
        <HeroSection />
      </section>
      
      <section id="partners" className="bg-black py-12 mt-32 md:mt-56">
        <PartnersCarousel />
      </section>

      <div id="services" className="bg-black">
        <AnimatedCardSection />
      </div>
      
      <section id="audience" className="mt-32 md:mt-1 bg-black pb-[200px]">
        <AudienceCards />
      </section>
      
      <section id="news" className="bg-black pb-[50px]">
        <NewsCarousel />
      </section>

      <section id="footer" className="bg-black">
        <Footer />
      </section>
      
      {/* <section>
        <InteractiveFooter />
      </section> */}
    </div>
  );
};

export default Index;
