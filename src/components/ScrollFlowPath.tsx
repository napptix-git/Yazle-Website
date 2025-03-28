
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const ScrollFlowPath: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress to path height
  const pathHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  
  // Create sections for the flow path
  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'partners', label: 'Partners' },
    { id: 'audience', label: 'Audience' },
    { id: 'solutions', label: 'Solutions' }
  ];
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div 
      ref={containerRef}
      className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center h-[60vh] pointer-events-none"
    >
      {/* Flow Path Container */}
      <div className="relative h-full flex flex-col items-center">
        {/* Background line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-white/10"></div>
        
        {/* Animated progress line */}
        <motion.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] bg-[#29dd3b] origin-top"
          style={{ height: pathHeight }}
        />
        
        {/* Section indicators */}
        {sections.map((section, index) => {
          const sectionProgress = useTransform(
            scrollYProgress, 
            // Adjust these values to control when each dot lights up
            [index * 0.25, index * 0.25 + 0.2], 
            [0, 1]
          );
          
          const sectionScale = useTransform(sectionProgress, [0, 1], [1, 1.5]);
          const sectionOpacity = useTransform(sectionProgress, [0, 1], [0.5, 1]);
          
          return (
            <motion.div
              key={section.id}
              className="absolute w-12 h-12 flex items-center justify-center pointer-events-auto cursor-pointer"
              style={{
                top: `calc(${index * 33}% - 6px)`,
                left: '50%',
                x: '-50%',
              }}
              whileHover={{ scale: 1.2 }}
              onClick={() => {
                const element = document.getElementById(section.id);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <motion.div 
                className="relative w-3 h-3 rounded-full bg-white z-10"
                style={{
                  scale: sectionScale,
                  opacity: sectionOpacity,
                  backgroundColor: sectionProgress.get() > 0.5 ? '#29dd3b' : 'white',
                }}
              />
              
              {/* Label for the section */}
              <motion.span 
                className="absolute left-6 ml-2 text-sm text-white whitespace-nowrap"
                style={{
                  opacity: sectionOpacity,
                  color: sectionProgress.get() > 0.5 ? '#29dd3b' : 'white',
                }}
              >
                {section.label}
              </motion.span>
            </motion.div>
          );
        })}
      </div>
      
      {/* Scroll indicator at the bottom */}
      <motion.div 
        className="absolute -bottom-20 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-[#29dd3b] text-xs">SCROLL</span>
        <ArrowDown size={16} className="text-[#29dd3b]" />
      </motion.div>
    </div>
  );
};

export default ScrollFlowPath;
