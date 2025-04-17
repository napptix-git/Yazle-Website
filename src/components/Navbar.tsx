
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);
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
  
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleDropdownMouseEnter = (dropdownName: string) => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
    setActiveDropdown(dropdownName);
  };

  const handleDropdownMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300); // 300ms delay before closing
  };
  
  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-napptix-dark/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2">
            <Link to="/" onClick={scrollToTop} className="text-white font-bold text-2xl mr-4">
              <div className="h-20 md:h-24 lg:h-24">
                <img 
                  src="/lovable-uploads/8354ca7f-1dcf-4c35-bc7d-7fb04f9c9254.png" 
                  alt="Napptix" 
                  className="h-full w-auto object-contain" 
                />
              </div>
            </Link>
            
            <nav className="hidden md:flex space-x-8 ml-auto">
              {/* Advertisers Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => handleDropdownMouseEnter('advertisers')}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <button className={`flex items-center text-white py-2 px-1 focus:outline-none hover:text-[#29dd3b] transition-colors ${
                  activeDropdown === 'advertisers' || location.pathname.includes('/advertisers') 
                    ? 'border-b-2 border-[#29dd3b]' 
                    : ''
                }`}>
                  Advertisers <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {activeDropdown === 'advertisers' && (
                  <div className="absolute top-full left-0 w-80 mt-2 bg-napptix-dark border border-napptix-grey/20 rounded-md shadow-lg overflow-hidden z-50">
                    <div className="p-6">
                      <Link to="/advertisers/wizora" onClick={scrollToTop} className="block text-xl font-semibold text-[#9b87f5] mb-4 hover:text-[#29dd3b] transition-colors">
                        Wizora
                      </Link>
                      <Link to="/advertisers/case-studies" onClick={scrollToTop} className="block text-xl font-semibold text-[#9b87f5] mb-4 hover:text-[#29dd3b] transition-colors">
                        Case Studies
                      </Link>
                      <Link to="/advertisers/ad-gallery" onClick={scrollToTop} className="block text-xl font-semibold text-[#9b87f5] mb-4 hover:text-[#29dd3b] transition-colors">
                        Ad Gallery
                      </Link>
                      <Link to="/advertisers/contact" onClick={scrollToTop} className="block text-xl font-semibold text-[#9b87f5] hover:text-[#29dd3b] transition-colors">
                        Contact
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Publishers (now Developers) Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => handleDropdownMouseEnter('developers')}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <button className={`flex items-center text-white py-2 px-1 focus:outline-none hover:text-[#29dd3b] transition-colors ${
                  activeDropdown === 'developers' || location.pathname.includes('/developers') 
                    ? 'border-b-2 border-[#29dd3b]' 
                    : ''
                }`}>
                  Developers <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {activeDropdown === 'developers' && (
                  <div className="absolute top-full left-0 w-80 mt-2 bg-napptix-dark border border-napptix-grey/20 rounded-md shadow-lg overflow-hidden z-50">
                    <div className="p-6">
                      <Link to="/developers" onClick={scrollToTop} className="block text-xl font-semibold text-[#9b87f5] mb-4 hover:text-[#29dd3b] transition-colors">
                        Overview
                      </Link>
                      <Link to="/developers/monetization" onClick={scrollToTop} className="block text-xl font-semibold text-[#9b87f5] mb-4 hover:text-[#29dd3b] transition-colors">
                        Monetization
                      </Link>
                      <Link to="/developers/analytics" onClick={scrollToTop} className="block text-xl font-semibold text-[#9b87f5] mb-4 hover:text-[#29dd3b] transition-colors">
                        Analytics
                      </Link>
                      <Link to="/developers/contact" onClick={scrollToTop} className="block text-xl font-semibold text-[#9b87f5] hover:text-[#29dd3b] transition-colors">
                        Contact
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* About Link with line hover effect */}
              <Link 
                to="/about"
                onClick={scrollToTop}
                className={`text-white py-2 px-1 hover:text-[#29dd3b] transition-colors hover:border-b-2 hover:border-[#29dd3b] ${
                  isActive('/about') ? 'border-b-2 border-[#29dd3b]' : 'border-b-2 border-transparent'
                }`}
              >
                About
              </Link>

              {/* Contact Link with line hover effect */}
              <Link 
                to="/contact"
                onClick={scrollToTop}
                className={`text-white py-2 px-1 hover:text-[#29dd3b] transition-colors hover:border-b-2 hover:border-[#29dd3b] ${
                  isActive('/contact') ? 'border-b-2 border-[#29dd3b]' : 'border-b-2 border-transparent'
                }`}
              >
                Contact
              </Link>
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
              <div className="flex flex-col space-y-2">
                <div className="text-white text-xl font-medium py-2">Advertisers</div>
                <Link 
                  to="/advertisers/wizora"
                  className="text-white text-lg pl-4 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Wizora
                </Link>
                <Link 
                  to="/advertisers/case-studies"
                  className="text-white text-lg pl-4 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Case Studies
                </Link>
                <Link 
                  to="/advertisers/ad-gallery"
                  className="text-white text-lg pl-4 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Ad Gallery
                </Link>
                <Link 
                  to="/advertisers/contact"
                  className="text-white text-lg pl-4 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>

              <div className="flex flex-col space-y-2">
                <div className="text-white text-xl font-medium py-2">Developers</div>
                <Link 
                  to="/developers"
                  className="text-white text-lg pl-4 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Overview
                </Link>
                <Link 
                  to="/developers/monetization"
                  className="text-white text-lg pl-4 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Monetization
                </Link>
                <Link 
                  to="/developers/analytics"
                  className="text-white text-lg pl-4 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Analytics
                </Link>
                <Link 
                  to="/developers/contact"
                  className="text-white text-lg pl-4 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>

              <Link 
                to="/about"
                className="text-white text-xl font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact"
                className="text-white text-xl font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
