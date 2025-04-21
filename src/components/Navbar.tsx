
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import DesktopMenu from './NavbarDesktopMenu';
import MobileMenu from './NavbarMobileMenu';

type DesktopMenuType = 'advertisers' | 'developers' | null;
type MobileMenuType = 'mobile-menu' | 'mobile-advertisers' | 'mobile-developers' | null;

type HoveredItemType = {
  mobile: MobileMenuType;
  desktop: DesktopMenuType;
};

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<HoveredItemType>({ mobile: null, desktop: null });
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

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

  const handleMouseEnter = (menu: DesktopMenuType) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setHoveredItem(prev => ({ ...prev, desktop: menu }));
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setHoveredItem(prev => ({ ...prev, desktop: null }));
    }, 200);
    setTimeoutId(id);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const toggleMobileMenu = (menuType: MobileMenuType) => {
    setHoveredItem(prev => {
      // Toggle between mobile-menu and submenu
      if (prev.mobile === menuType) {
        return { ...prev, mobile: 'mobile-menu' };
      }
      return { ...prev, mobile: menuType };
    });
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          <Link to="/" onClick={scrollToTop} className="text-white font-bold text-2xl">
            <div className="h-20 md:h-24 lg:h-24">
              <img 
                src="/lovable-uploads/8354ca7f-1dcf-4c35-bc7d-7fb04f9c9254.png" 
                alt="Napptix" 
                className="h-full w-auto object-contain" 
              />
            </div>
          </Link>

          <DesktopMenu
            hoveredItem={hoveredItem}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            scrollToTop={scrollToTop}
          />

          <Link 
            to="/contact"
            className="hidden md:inline-flex ml-auto relative overflow-hidden text-white font-medium py-2 px-6 border-2 border-[#29dd3b] rounded-full group hover:bg-[#29dd3b] hover:text-black transition-all duration-300"
          >
            <span className="relative z-10">LET'S TALK</span>
            <div className="absolute inset-0 bg-[#29dd3b] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </Link>
          
          <div className="md:hidden">
            <button 
              className="text-white"
              onClick={() => setHoveredItem(prev => ({
                ...prev,
                mobile: prev.mobile === 'mobile-menu' ? null : 'mobile-menu'
              }))}
            >
              {hoveredItem.mobile === 'mobile-menu' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        hoveredItem={hoveredItem}
        toggleMobileMenu={toggleMobileMenu}
        scrollToTop={scrollToTop}
      />
    </header>
  );
};

export default Navbar;
