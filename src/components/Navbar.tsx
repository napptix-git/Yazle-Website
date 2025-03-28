
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const navLinks = [
    { title: 'Home', href: '#' },
    { title: 'Solutions', href: '#solutions' },
    { title: 'For Advertisers', href: '#audience' },
    { title: 'For Publishers', href: '#audience' },
    { title: 'Contact', href: '#' },
  ];
  
  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-napptix-dark/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <a href="#" className="text-white font-montserrat font-bold text-2xl">
              <span className="text-gradient">Napptix</span>
            </a>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  className="text-white opacity-80 hover:opacity-100 transition-opacity"
                >
                  {link.title}
                </a>
              ))}
            </nav>
            
            {/* Contact Button */}
            <div className="hidden md:block">
              <button className="bg-napptix-purple hover:bg-napptix-purple/80 text-white font-bold py-2 px-5 rounded-full transition-all">
                Get Started
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          className="fixed inset-0 bg-napptix-dark z-40 md:hidden pt-20"
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-8">
            <nav className="flex flex-col space-y-6">
              {navLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  className="text-white text-xl font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.title}
                </a>
              ))}
              <button 
                className="bg-napptix-purple hover:bg-napptix-purple/80 text-white font-bold py-3 px-6 rounded-full transition-all w-full mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </button>
            </nav>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
