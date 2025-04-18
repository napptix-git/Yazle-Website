import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Gamepad, BookOpen, Image, BookCheck, BookOpenCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

type MobileMenuType = 'mobile-menu' | 'mobile-advertisers' | 'mobile-developers' | null;
type DesktopMenuType = 'advertisers' | 'developers' | null;
type HoveredItemType = {
  mobile: MobileMenuType;
  desktop: DesktopMenuType;
};

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<HoveredItemType>({ mobile: null, desktop: null });
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const isMobile = useIsMobile();
  
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
      if (prev.mobile === menuType) {
        return { ...prev, mobile: null };
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
            <div className="h-16 md:h-20 lg:h-24">
              <img 
                src="/lovable-uploads/8354ca7f-1dcf-4c35-bc7d-7fb04f9c9254.png" 
                alt="Napptix" 
                className="h-full w-auto object-contain" 
              />
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8 flex-grow justify-center">
            <div 
              className="relative group"
              onMouseEnter={() => handleMouseEnter('advertisers')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center text-white font-medium py-2 px-1 focus:outline-none hover:text-[#29dd3b] transition-colors uppercase">
                ADVERTISERS <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              <AnimatePresence>
                {hoveredItem.desktop === 'advertisers' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-96 mt-2 bg-black/95 border border-gray-800 rounded-lg shadow-lg overflow-hidden z-50"
                  >
                    <div className="py-8 px-6">
                      <p className="text-gray-400 text-sm font-semibold mb-6 uppercase">Our Solutions</p>
                      <div className="space-y-6">
                        <Link to="/advertisers/wizora" onClick={scrollToTop} className="flex items-center space-x-4 px-4 py-4 rounded-lg transition duration-200 transform hover:scale-105 hover:shadow-md hover:bg-gray-800">
                          <div className="p-2 bg-gray-800 rounded-lg">
                            <Gamepad className="h-5 w-5 text-[#29dd3b]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-200 uppercase">Wizora</p>
                            <p className="text-xs text-gray-400">Interactive ad platform</p>
                          </div>
                        </Link>
                        
                        <Link to="/advertisers/case-studies" onClick={scrollToTop} className="flex items-center space-x-4 px-4 py-4 rounded-lg transition duration-200 transform hover:scale-105 hover:shadow-md hover:bg-gray-800">
                          <div className="p-2 bg-gray-800 rounded-lg">
                            <BookOpenCheck className="h-5 w-5 text-[#29dd3b]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-200 uppercase">Case Studies</p>
                            <p className="text-xs text-gray-400">Success stories</p>
                          </div>
                        </Link>
                        
                        <Link to="/advertisers/ad-gallery" onClick={scrollToTop} className="flex items-center space-x-4 px-4 py-4 rounded-lg transition duration-200 transform hover:scale-105 hover:shadow-md hover:bg-gray-800">
                          <div className="p-2 bg-gray-800 rounded-lg">
                            <Image className="h-5 w-5 text-[#29dd3b]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-200 uppercase">Ad Gallery</p>
                            <p className="text-xs text-gray-400">Explore ad formats</p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div 
              className="relative group"
              onMouseEnter={() => handleMouseEnter('developers')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center text-white font-medium py-2 px-1 focus:outline-none hover:text-[#29dd3b] transition-colors uppercase">
                DEVELOPERS <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              <AnimatePresence>
                {hoveredItem.desktop === 'developers' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-72 mt-2 bg-black/95 border border-gray-800 rounded-lg shadow-lg overflow-hidden z-50"
                  >
                    <div className="py-8 px-6">
                      <p className="text-gray-400 text-sm font-semibold mb-6 uppercase">For Game Developers</p>
                      <div className="space-y-6">
                        <Link to="/developers" onClick={scrollToTop} className="flex items-center space-x-4 px-4 py-4 rounded-lg transition duration-200 transform hover:scale-105 hover:shadow-md hover:bg-gray-800">
                          <div className="p-2 bg-gray-800 rounded-lg">
                            <BookCheck className="h-5 w-5 text-[#29dd3b]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-200 uppercase">Overview</p>
                            <p className="text-xs text-gray-400">Discover solutions</p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              to="/about"
              onClick={scrollToTop}
              className="text-white font-medium py-2 px-1 hover:text-[#29dd3b] transition-colors uppercase"
            >
              ABOUT US
            </Link>
          </nav>

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
              onClick={() => toggleMobileMenu('mobile-menu')}
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

      <AnimatePresence>
        {hoveredItem.mobile === 'mobile-menu' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-black/95 shadow-lg"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <div>
                <button 
                  onClick={() => toggleMobileMenu('mobile-advertisers')}
                  className="flex justify-between items-center w-full py-2 text-white font-medium uppercase"
                >
                  Advertisers
                  <ChevronDown className={`transition-transform ${hoveredItem.mobile === 'mobile-advertisers' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {hoveredItem.mobile === 'mobile-advertisers' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-2 pl-4 space-y-2"
                    >
                      <Link to="/advertisers/wizora" onClick={() => { scrollToTop(); toggleMobileMenu(null); }} className="block py-2 text-gray-300">Wizora</Link>
                      <Link to="/advertisers/case-studies" onClick={() => { scrollToTop(); toggleMobileMenu(null); }} className="block py-2 text-gray-300">Case Studies</Link>
                      <Link to="/advertisers/ad-gallery" onClick={() => { scrollToTop(); toggleMobileMenu(null); }} className="block py-2 text-gray-300">Ad Gallery</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div>
                <button 
                  onClick={() => toggleMobileMenu('mobile-developers')}
                  className="flex justify-between items-center w-full py-2 text-white font-medium uppercase"
                >
                  Developers
                  <ChevronDown className={`transition-transform ${hoveredItem.mobile === 'mobile-developers' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {hoveredItem.mobile === 'mobile-developers' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-2 pl-4 space-y-2"
                    >
                      <Link to="/developers" onClick={() => { scrollToTop(); toggleMobileMenu(null); }} className="block py-2 text-gray-300">Overview</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <Link 
                to="/about" 
                onClick={() => { scrollToTop(); toggleMobileMenu(null); }} 
                className="block py-2 text-white font-medium uppercase"
              >
                About Us
              </Link>
              
              <Link 
                to="/contact" 
                onClick={() => { scrollToTop(); toggleMobileMenu(null); }} 
                className="block py-2 text-white font-medium uppercase"
              >
                Let's Talk
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
