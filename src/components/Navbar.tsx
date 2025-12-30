
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import DesktopMenu from './NavbarDesktopMenu';
import MobileMenu from './NavbarMobileMenu';

type DesktopMenuType = 'advertisers' | 'developers' | 'company' | null;
type MobileMenuType = 'mobile-menu' | null;

type HoveredItemType = {
  mobile: MobileMenuType;
  desktop: DesktopMenuType;
};

type NavbarProps = {
  linkClassName?: string;
  dropdownBgColor?: string;
  dropdownTextColor?: string;
};

const Navbar: React.FC<NavbarProps> = ({linkClassName, dropdownBgColor, dropdownTextColor}) => {
  const location = useLocation();
  const isWizoraPage = location.pathname.includes("/pages/WizoraCS");
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<HoveredItemType>({ mobile: null, desktop: null });
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

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
        return { ...prev, mobile: 'mobile-menu' };
      }
      return { ...prev, mobile: menuType };
    });
  };

  return (
    <header 
      className={`absolute top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center w-full h-14 md:h-20 lg:h-24">
          <Link to="/" onClick={scrollToTop} className="flex items-center h-full">
            <img 
              src={isWizoraPage ? "/lovable-uploads/Yazle_black_logo.png" : "/lovable-uploads/Yazle_white_logo.png"} 
              alt="Napptix mediaś" 
              className="h-20 md:h-12 lg:h-40 w-auto object-contain transition-all duration-300"
            />
          </Link>

          <DesktopMenu
            hoveredItem={hoveredItem}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            scrollToTop={scrollToTop}
            linkClassName={linkClassName}
            dropdownBgColor={dropdownBgColor}
            dropdownTextColor={dropdownTextColor}
          />

          <Link 
            to="/contact"
            className={`hidden md:inline-flex ml-auto relative group font-bold py-1.5 px-3 rounded-full transition-all duration-300
              ${isWizoraPage ? "bg-[#4c36ff] text-white " : "bg-[#29dd3b] text-black border-[#29dd3b] shimmer-glow-btn"}
              overflow-hidden -mr-2`}
            style={{
               backgroundColor: isWizoraPage ? "#4c36ff" : "#29dd3b", fontWeight: 600,
               letterSpacing: 0.5, fontSize: '14px'
               }} 
          >
            <span className="relative font-disket z-10">LET'S TALK</span>
            <span className={`absolute shimmer-effect inset-0 rounded-full border pointer-events-none ${isWizoraPage ? "border-[#4c36ff]" : "border-[#29dd3b]"}`}></span>
          </Link>
          
          <div className="md:hidden flex items-center h-full">
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
        dropdownBgColor={dropdownBgColor}
        dropdownTextColor={dropdownTextColor}
      />
      <style>{`
        .shimmer-glow-btn {
          box-shadow: 0 0 8px 1px #29dd3b, 0 0 4px 1px #29dd3b55 inset;
          position: relative;
          background: #29dd3b;
        }
        .shimmer-effect {
          display: block;
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(120deg, transparent 30%, #fff 45%, #29dd3b 55%, transparent 70%);
          opacity: 0.30;
          background-size: 200% 200%;
          animation: shimmer-move 2s infinite linear;
          pointer-events: none;
          border-radius: 9999px;
        }
        @keyframes shimmer-move {
          0% { background-position: 200% 0 }
          100% { background-position: -200% 0 }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
