import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Newspaper } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from "@/hooks/use-mobile";

const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  const isMobile = useIsMobile(); // Hook to detect mobile screens

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const handleReadMore = () => {
    navigate('/news');
    window.scrollTo(0, 0);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ height: isMobile ? 10 : 45, opacity: 1 }} // Reduced height for mobile
            animate={{height:isMobile ? 30 : 45, opacity: 2 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`bg-gradient-to-r from-[#29dd3b]/20 via-[#29dd3b]/40 to-[#29dd3b]/20 border-b border-[#29dd3b]/40 shadow-md fixed top-0 left-0 right-0 z-50 ${
              isMobile ? 'text-xs py-0.5' : 'text-sm py-2' // Smaller padding and text size for mobile
            }`}
          >
            <div
              className={`container mx-auto px-4 flex ${
                isMobile ? 'flex-col items-center justify-center text-center' : 'items-center justify-between'
              }`}
            >
              {/* Announcement Text */}
              <div className={`flex items-center gap-2 ${isMobile ? 'pr-[100px]' : 'pl-[400px]'}`}>
                <span className="text-base animate-pulse">🎮</span> {/* Adjusted icon size */}
                <p className="text-white font-syne font-semibold truncate">
                  {isMobile
                    ? "Napptix Acquires Yezel!"
                    : "Breaking News: Napptix Acquires Yezel to Revolutionize Gaming Advertising!"}
                </p>
              </div>

              {/* Buttons */}
              <div className={`flex items-center gap-2 ${isMobile ? 'mt-[-22px] ml-[200px]' : ''}`}>
                <button
                  onClick={handleReadMore}
                  className="flex items-center gap-1 bg-black hover:bg-[#29dd3b]/80 text-white px-2 py-1 rounded-full font-syne transition-colors font-bold"
                >
                  <Newspaper className="h-3 w-3" /> {isMobile ? "Read" : "Read More"}
                </button>
                <button
                  onClick={handleDismiss}
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label="Dismiss announcement"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AnnouncementBar;