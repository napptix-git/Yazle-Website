
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
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
  
  const handleMouseEnter = (item: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setHoveredItem(null);
    }, 200);
    setTimeoutId(id);
  };
  
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          <Link to="/" onClick={scrollToTop} className="text-black font-bold text-2xl mr-4">
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
              onMouseEnter={() => handleMouseEnter('advertisers')}
              onMouseLeave={handleMouseLeave}
            >
              <button className={`flex items-center text-gray-800 font-medium py-2 px-1 focus:outline-none hover:text-[#29dd3b] transition-colors`}>
                ADVERTISERS <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {hoveredItem === 'advertisers' && (
                <div className="absolute top-full left-0 w-64 mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                  <div className="p-4">
                    <p className="text-gray-500 text-sm font-semibold mb-2">Our Advertisers</p>
                    <div className="space-y-3">
                      <Link to="/advertisers/wizora" onClick={scrollToTop} className="flex items-center space-x-4 px-3 py-2 rounded-lg transition duration-200 transform hover:scale-105 hover:shadow-md hover:bg-gray-100">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20h9M3 8l7 4 7-4m-7 4v12" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">Wizora</p>
                          <p className="text-xs text-gray-500">Interactive ad platform for gaming audiences</p>
                        </div>
                      </Link>
                      <Link to="/advertisers/case-studies" onClick={scrollToTop} className="flex items-center space-x-4 px-3 py-2 rounded-lg transition duration-200 transform hover:scale-105 hover:shadow-md hover:bg-gray-100">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16l-4-4 4-4m8 8l4-4-4-4M4 12h16" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">Case Studies</p>
                          <p className="text-xs text-gray-500">Success stories from our advertisers</p>
                        </div>
                      </Link>
                      <Link to="/advertisers/ad-gallery" onClick={scrollToTop} className="flex items-center space-x-4 px-3 py-2 rounded-lg transition duration-200 transform hover:scale-105 hover:shadow-md hover:bg-gray-100">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16l-4-4 4-4m8 8l4-4-4-4M4 12h16" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">Ad Gallery</p>
                          <p className="text-xs text-gray-500">Explore our interactive ad formats</p>
                        </div>
                      </Link>
                      <Link to="/advertisers/contact" onClick={scrollToTop} className="flex items-center space-x-4 px-3 py-2 rounded-lg transition duration-200 transform hover:scale-105 hover:shadow-md hover:bg-gray-100">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">Contact</p>
                          <p className="text-xs text-gray-500">Get in touch with our ad team</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Developers Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => handleMouseEnter('developers')}
              onMouseLeave={handleMouseLeave}
            >
              <button className={`flex items-center text-gray-800 font-medium py-2 px-1 focus:outline-none hover:text-[#29dd3b] transition-colors`}>
                DEVELOPERS <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {hoveredItem === 'developers' && (
                <div className="absolute top-full left-0 w-64 mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                  <div className="p-4">
                    <p className="text-gray-500 text-sm font-semibold mb-2">For Game Developers</p>
                    <div className="space-y-3">
                      <Link to="/developers" onClick={scrollToTop} className="flex items-center space-x-4 px-3 py-2 rounded-lg transition duration-200 transform hover:scale-105 hover:shadow-md hover:bg-gray-100">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20h9M3 8l7 4 7-4m-7 4v12" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">Overview</p>
                          <p className="text-xs text-gray-500">Discover developer solutions</p>
                        </div>
                      </Link>
                      <Link to="/developers/contact" onClick={scrollToTop} className="flex items-center space-x-4 px-3 py-2 rounded-lg transition duration-200 transform hover:scale-105 hover:shadow-md hover:bg-gray-100">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">Contact</p>
                          <p className="text-xs text-gray-500">Reach our developer support team</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* About Link */}
            <div
              className="relative group"
              onMouseEnter={() => handleMouseEnter('about')}
              onMouseLeave={handleMouseLeave}
            >
              <Link 
                to="/about"
                onClick={scrollToTop}
                className="text-gray-800 font-medium py-2 px-1 hover:text-[#29dd3b] transition-colors"
              >
                ABOUT US
              </Link>
            </div>

            {/* Contact Link */}
            <div
              className="relative group"
              onMouseEnter={() => handleMouseEnter('contact')}
              onMouseLeave={handleMouseLeave}
            >
              <Link 
                to="/contact"
                onClick={scrollToTop}
                className="text-gray-800 font-medium py-2 px-1 hover:text-[#29dd3b] transition-colors"
              >
                CONTACT
              </Link>
            </div>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              className="text-gray-800"
              onClick={() => setHoveredItem(hoveredItem ? null : 'mobile-menu')}
            >
              {hoveredItem === 'mobile-menu' ? (
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

      {/* Mobile Menu */}
      {hoveredItem === 'mobile-menu' && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div>
              <button 
                onClick={() => setHoveredItem(hoveredItem === 'mobile-advertisers' ? null : 'mobile-advertisers')}
                className="flex justify-between items-center w-full py-2 text-gray-800 font-medium"
              >
                ADVERTISERS
                <ChevronDown className={`transition-transform ${hoveredItem === 'mobile-advertisers' ? 'rotate-180' : ''}`} />
              </button>
              {hoveredItem === 'mobile-advertisers' && (
                <div className="mt-2 pl-4 space-y-2">
                  <Link to="/advertisers/wizora" className="block py-2 text-gray-700">Wizora</Link>
                  <Link to="/advertisers/case-studies" className="block py-2 text-gray-700">Case Studies</Link>
                  <Link to="/advertisers/ad-gallery" className="block py-2 text-gray-700">Ad Gallery</Link>
                  <Link to="/advertisers/contact" className="block py-2 text-gray-700">Contact</Link>
                </div>
              )}
            </div>
            
            <div>
              <button 
                onClick={() => setHoveredItem(hoveredItem === 'mobile-developers' ? null : 'mobile-developers')}
                className="flex justify-between items-center w-full py-2 text-gray-800 font-medium"
              >
                DEVELOPERS
                <ChevronDown className={`transition-transform ${hoveredItem === 'mobile-developers' ? 'rotate-180' : ''}`} />
              </button>
              {hoveredItem === 'mobile-developers' && (
                <div className="mt-2 pl-4 space-y-2">
                  <Link to="/developers" className="block py-2 text-gray-700">Overview</Link>
                  <Link to="/developers/contact" className="block py-2 text-gray-700">Contact</Link>
                </div>
              )}
            </div>
            
            <Link to="/about" className="block py-2 text-gray-800 font-medium">
              ABOUT US
            </Link>
            
            <Link to="/contact" className="block py-2 text-gray-800 font-medium">
              CONTACT
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
