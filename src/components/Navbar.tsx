
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
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
    { title: 'Advertisers', href: '/advertisers' },
    { title: 'Publishers', href: '/publishers' },
    { title: 'About', href: '/about' },
    { title: 'Contact', href: '/contact' },
  ];
  
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-napptix-dark/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-1">
            <Link to="/" onClick={scrollToTop} className="text-white font-bold text-2xl mr-4">
              <div className="h-14 md:h-18 lg:h-18">
                <img 
                  src="/lovable-uploads/8354ca7f-1dcf-4c35-bc7d-7fb04f9c9254.png" 
                  alt="Napptix" 
                  className="h-full w-auto object-contain" 
                />
              </div>
            </Link>
            
            <nav className="hidden md:flex space-x-8 ml-auto">
              {navLinks.map((link, index) => (
                <Link 
                  key={index}
                  to={link.href}
                  onClick={scrollToTop}
                  className={`text-white relative pb-1 ${
                    isActive(link.href) ? 'after:scale-x-100' : 'after:scale-x-0'
                  } after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100 after:origin-left`}
                >
                  {link.title}
                </Link>
              ))}
            </nav>
            
            <button 
              className="md:hidden text-white ml-4 hover:text-[#29dd3b] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>
      
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
                <Link 
                  key={index}
                  to={link.href}
                  className={`text-white text-xl font-medium py-2 relative ${
                    isActive(link.href) ? 'after:scale-x-100' : 'after:scale-x-0'
                  } after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100 after:origin-left`}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToTop();
                  }}
                >
                  {link.title}
                </Link>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
