
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Building, Briefcase, Newspaper } from "lucide-react";

type MobileMenuType = 'mobile-menu' | null;

type HoveredItemType = {
  mobile: MobileMenuType;
  desktop: unknown;
};

type Props = {
  hoveredItem: HoveredItemType;
  toggleMobileMenu: (menuType: MobileMenuType) => void;
  scrollToTop: () => void;
  dropdownBgColor?: string;
  dropdownTextColor?: string;
};

const NavbarMobileMenu: React.FC<Props> = ({
  hoveredItem,
  toggleMobileMenu,
  scrollToTop,
  dropdownBgColor,
  dropdownTextColor,
}) => {
  const [openDropdown, setOpenDropdown] = useState<'advertisers' | 'developers' | 'company' | null>(null);

  const toggleDropdown = (type: 'advertisers' | 'developers' | 'company') => {
    setOpenDropdown(prev => (prev === type ? null : type));
  };

  const menuBgClass = dropdownBgColor 
    ? `bg-[${dropdownBgColor}]/95` 
    : "bg-black/95";
  
  const textClass = dropdownTextColor || "text-white";
  const subTextClass = dropdownTextColor ? "text-gray-300" : "text-gray-300";

  return (
    <AnimatePresence>
      {hoveredItem.mobile === 'mobile-menu' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className={`md:hidden ${menuBgClass} shadow-lg`}
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Advertisers */}
            <div>
              <button
                onClick={() => toggleDropdown('advertisers')}
                className={`flex justify-between items-center w-full py-2 ${textClass} font-medium uppercase`}
              >
                Advertisers
                <ChevronDown className={`transition-transform ${openDropdown === 'advertisers' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openDropdown === 'advertisers' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 pl-4 space-y-2"
                  >
                    <Link to="/advertisers/wizora" onClick={scrollToTop} className={`block py-2 ${subTextClass}`}>Wizora</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Developers */}
            <div>
              <button
                onClick={() => toggleDropdown('developers')}
                className={`flex justify-between items-center w-full py-2 ${textClass} font-medium uppercase`}
              >
                Developers
                <ChevronDown className={`transition-transform ${openDropdown === 'developers' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openDropdown === 'developers' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 pl-4 space-y-2"
                  >
                    <Link to="/developers" onClick={scrollToTop} className={`block py-2 ${subTextClass}`}>Overview</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Company Dropdown */}
            <div>
              <button
                onClick={() => toggleDropdown('company')}
                className={`flex justify-between items-center w-full py-2 ${textClass} font-medium uppercase`}
              >
                Company
                <ChevronDown className={`transition-transform ${openDropdown === 'company' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openDropdown === 'company' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 pl-4 space-y-2"
                  >
                    <Link to="/about" onClick={scrollToTop} className={`py-2 ${subTextClass} flex items-center gap-2`}>
                      <Building className="h-4 w-4" />
                      About Us
                    </Link>
                    <Link to="/careers" onClick={scrollToTop} className={`py-2 ${subTextClass} flex items-center gap-2`}>
                      <Briefcase className="h-4 w-4" />
                      Careers
                    </Link>
                    <Link to="/news" onClick={scrollToTop} className={`py-2 ${subTextClass} flex items-center gap-2`}>
                      <Newspaper className="h-4 w-4" />
                      News
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/contact" onClick={scrollToTop} className={`block py-2 ${textClass} font-medium uppercase`}>
              Let's Talk
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavbarMobileMenu;
