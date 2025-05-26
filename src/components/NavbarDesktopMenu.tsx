
import React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Building, Briefcase, Newspaper, Gamepad, BookCheck } from "lucide-react";

type DesktopMenuType = 'advertisers' | 'developers' | 'company' | null;
type HoveredItemType = {
  mobile: unknown;
  desktop: DesktopMenuType;
};
type Props = {
  hoveredItem: HoveredItemType;
  handleMouseEnter: (menu: DesktopMenuType) => void;
  handleMouseLeave: () => void;
  scrollToTop: () => void;
  linkClassName?: string;
  dropdownBgColor?: string;
  dropdownTextColor?: string;
};

const NavbarDesktopMenu: React.FC<Props> = ({
  hoveredItem,
  handleMouseEnter,
  handleMouseLeave,
  scrollToTop,
  linkClassName,
  dropdownBgColor,
  dropdownTextColor,
}) => {
  const dropdownClass = dropdownBgColor 
    ? `bg-[${dropdownBgColor}]/95 border border-[${dropdownBgColor}]` 
    : "bg-black/95 border border-gray-800";
  
  const textClass = dropdownTextColor || "text-gray-200";
  const subTextClass = dropdownTextColor ? "text-gray-300" : "text-gray-400";
  const hoverClass = dropdownBgColor 
    ? "hover:bg-white/10" 
    : "hover:bg-gray-800";

  return (
    <nav className="hidden md:flex items-center space-x-8 flex-grow justify-center">
      <div 
        className="relative group"
        onMouseEnter={() => handleMouseEnter('advertisers')}
        onMouseLeave={handleMouseLeave}
      >
        <button className={`flex items-center font-medium py-2 px-1 focus:outline-none  transition-colors uppercase font-disket ${linkClassName ? linkClassName : " text-white hover:text-[#29dd3b]"}`}
        >
          ADVERTISERS <ChevronDown className="ml-1 h-4 w-4" />
        </button>
        <AnimatePresence>
          {hoveredItem.desktop === 'advertisers' && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.2 }}
              className={`absolute top-full left-0 w-96 mt-2 ${dropdownClass} rounded-lg shadow-lg overflow-hidden z-50`}
            >
              <div className="py-8 px-6">
                <p className={`${subTextClass} text-sm font-bold mb-6 uppercase`}>Our Solutions</p>
                <div className="space-y-6">
                  <Link to="/pages/WizoraCS" 
                  onClick={scrollToTop}
                  className={`flex items-center space-x-4 px-4 py-4 rounded-lg transition duration-200 transform hover:scale-105 hover:shadow-md ${hoverClass}`}
                  >
                    <div className="p-2 bg-gray-800 rounded-lg">
                      <Gamepad className="h-5 w-5 text-[#29dd3b]" />
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${textClass} uppercase`}>Wizora</p>
                      <p className={`text-xs ${subTextClass}`}>Interactive ad platform</p>
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
        <button className={`flex items-center  font-medium py-2 px-1 focus:outline-none  transition-colors uppercase font-disket ${linkClassName ? linkClassName : "text-white hover:text-[#29dd3b]"}`}>
          DEVELOPERS <ChevronDown className="ml-1 h-4 w-4" />
        </button>
        <AnimatePresence>
          {hoveredItem.desktop === 'developers' && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.2 }}
              className={`absolute top-full left-0 w-72 mt-2 ${dropdownClass} rounded-lg shadow-lg overflow-hidden z-50`}
            >
              <div className="py-8 px-6">
                <p className={`${subTextClass} text-sm font-bold mb-6 uppercase`}>For Game Developers</p>
                <div className="space-y-6">
                  <Link to="/developers" onClick={scrollToTop} className={`flex items-center space-x-4 px-4 py-4 rounded-lg transition duration-200 transform hover:scale-105 hover:shadow-md ${hoverClass}`}>
                    <div className="p-2 bg-gray-800 rounded-lg">
                      <BookCheck className="h-5 w-5 text-[#29dd3b]" />
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${textClass} uppercase`}>Overview</p>
                      <p className={`text-xs ${subTextClass}`}>Discover solutions</p>
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
        onMouseEnter={() => handleMouseEnter('company')}
        onMouseLeave={handleMouseLeave}
      >
        <button className={`flex items-center  font-medium py-2 px-1 focus:outline-none  transition-colors uppercase font-disket ${linkClassName ? linkClassName : " text-white hover:text-[#29dd3b]"}`}>
          COMPANY <ChevronDown className="ml-1 h-4 w-4" />
        </button>
        <AnimatePresence>
          {hoveredItem.desktop === 'company' && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.2 }}
              className={`absolute top-full left-0 w-72 mt-2 ${dropdownClass} rounded-lg shadow-lg overflow-hidden z-50`}
            >
              <div className="py-8 px-6">
                <p className={`${subTextClass} text-sm font-bold mb-6 uppercase`}>Company</p>
                <div className="space-y-6">
                  <Link to="/about" onClick={scrollToTop} className={`flex items-center space-x-4 px-4 py-4 rounded-lg transition duration-200 transform hover:scale-105 hover:shadow-md ${hoverClass}`}>
                    <div className="p-2 bg-gray-800 rounded-lg">
                      <Building className="h-5 w-5 text-[#29dd3b]" />
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${textClass} uppercase`}>About Us</p>
                      <p className={`text-xs ${subTextClass}`}>Our story and mission</p>
                    </div>
                  </Link>
                  <Link to="/careers" onClick={scrollToTop} className={`flex items-center space-x-4 px-4 py-4 rounded-lg transition duration-200 transform hover:scale-105 hover:shadow-md ${hoverClass}`}>
                    <div className="p-2 bg-gray-800 rounded-lg">
                      <Briefcase className="h-5 w-5 text-[#29dd3b]" />
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${textClass} uppercase`}>Careers</p>
                      <p className={`text-xs ${subTextClass}`}>Join our team</p>
                    </div>
                  </Link>
                  <Link to="/news" onClick={scrollToTop} className={`flex items-center space-x-4 px-4 py-4 rounded-lg transition duration-200 transform hover:scale-105 hover:shadow-md ${hoverClass}`}>
                    <div className="p-2 bg-gray-800 rounded-lg">
                      <Newspaper className="h-5 w-5 text-[#29dd3b]" />
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${textClass} uppercase`}>News & Articles</p>
                      <p className={`text-xs ${subTextClass}`}>Latest updates</p>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default NavbarDesktopMenu;
