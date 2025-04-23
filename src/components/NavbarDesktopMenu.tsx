
import React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Gamepad, BookOpen, Image, BookCheck } from "lucide-react";

type DesktopMenuType = 'advertisers' | 'developers' | null;
type HoveredItemType = {
  mobile: unknown;
  desktop: DesktopMenuType;
};
type Props = {
  hoveredItem: HoveredItemType;
  handleMouseEnter: (menu: DesktopMenuType) => void;
  handleMouseLeave: () => void;
  scrollToTop: () => void;
};

const NavbarDesktopMenu: React.FC<Props> = ({
  hoveredItem,
  handleMouseEnter,
  handleMouseLeave,
  scrollToTop,
}) => (
  <nav className="hidden md:flex items-center space-x-8 flex-grow justify-center">
    <div 
      className="relative group"
      onMouseEnter={() => handleMouseEnter('advertisers')}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex items-center text-white font-medium py-2 px-1 focus:outline-none hover:text-[#29dd3b] transition-colors uppercase font-granview">
        ADVERTISERS <ChevronDown className="ml-1 h-4 w-4" />
      </button>
      <AnimatePresence>
        {hoveredItem.desktop === 'advertisers' && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-96 mt-2 bg-black/95 border border-gray-800 rounded-lg shadow-lg overflow-hidden z-50"  // SHIFTED left
          >
            <div className="py-8 px-6">
              <p className="text-gray-400 text-sm font-bold mb-6 uppercase font-bold">Our Solutions</p>
              <div className="space-y-6">
                <Link to="/advertisers/wizora" onClick={scrollToTop} className="flex items-center space-x-4 px-4 py-4 rounded-lg transition duration-200 transform hover:scale-105 hover:shadow-md hover:bg-gray-800">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    <Gamepad className="h-5 w-5 text-[#29dd3b]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-200 uppercase font-bold">Wizora</p>
                    <p className="text-xs text-gray-400">Interactive ad platform</p>
                  </div>
                </Link>
                <Link to="/advertisers/case-studies" onClick={scrollToTop} className="flex items-center space-x-4 px-4 py-4 rounded-lg transition duration-200 transform hover:scale-105 hover:shadow-md hover:bg-gray-800">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    <BookOpen className="h-5 w-5 text-[#29dd3b]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-200 uppercase font-bold">Case Studies</p>
                    <p className="text-xs text-gray-400">Success stories</p>
                  </div>
                </Link>
                <Link to="/advertisers/ad-gallery" onClick={scrollToTop} className="flex items-center space-x-4 px-4 py-4 rounded-lg transition duration-200 transform hover:scale-105 hover:shadow-md hover:bg-gray-800">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    <Image className="h-5 w-5 text-[#29dd3b]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-200 uppercase font-bold">Ad Gallery</p>
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
      <button className="flex items-center text-white font-medium py-2 px-1 focus:outline-none hover:text-[#29dd3b] transition-colors uppercase font-granview">
        DEVELOPERS <ChevronDown className="ml-1 h-4 w-4" />
      </button>
      <AnimatePresence>
        {hoveredItem.desktop === 'developers' && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-72 mt-2 bg-black/95 border border-gray-800 rounded-lg shadow-lg overflow-hidden z-50"
          >
            <div className="py-8 px-6">
              <p className="text-gray-400 text-sm font-bold mb-6 uppercase font-bold">For Game Developers</p>
              <div className="space-y-6">
                <Link to="/developers" onClick={scrollToTop} className="flex items-center space-x-4 px-4 py-4 rounded-lg transition duration-200 transform hover:scale-105 hover:shadow-md hover:bg-gray-800">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    <BookCheck className="h-5 w-5 text-[#29dd3b]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-200 uppercase font-bold">Overview</p>
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
      className="text-white font-medium py-2 px-1 hover:text-[#29dd3b] transition-colors uppercase font-granview"
    >
      ABOUT US
    </Link>
  </nav>
);

export default NavbarDesktopMenu;

