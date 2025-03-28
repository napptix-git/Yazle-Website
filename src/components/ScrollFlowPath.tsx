
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const ScrollFlowPath: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress to path progress
  const pathProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  // Create sections for the flow path
  const sections = [
    { id: 'hero', label: 'Home', position: 0 },
    { id: 'partners', label: 'Partners', position: 0.33 },
    { id: 'audience', label: 'Audience', position: 0.66 },
    { id: 'solutions', label: 'Solutions', position: 1 }
  ];
  
  // Pre-calculate all transforms for each section - these must be called at the top level
  const sectionProgress0 = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const sectionProgress1 = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);
  const sectionProgress2 = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);
  const sectionProgress3 = useTransform(scrollYProgress, [0.75, 1], [0, 1]);
  
  const sectionProgresses = [sectionProgress0, sectionProgress1, sectionProgress2, sectionProgress3];
  
  const sectionScale0 = useTransform(sectionProgress0, [0, 1], [1, 1.5]);
  const sectionScale1 = useTransform(sectionProgress1, [0, 1], [1, 1.5]);
  const sectionScale2 = useTransform(sectionProgress2, [0, 1], [1, 1.5]);
  const sectionScale3 = useTransform(sectionProgress3, [0, 1], [1, 1.5]);
  
  const sectionScales = [sectionScale0, sectionScale1, sectionScale2, sectionScale3];
  
  const sectionOpacity0 = useTransform(sectionProgress0, [0, 1], [0.5, 1]);
  const sectionOpacity1 = useTransform(sectionProgress1, [0, 1], [0.5, 1]);
  const sectionOpacity2 = useTransform(sectionProgress2, [0, 1], [0.5, 1]);
  const sectionOpacity3 = useTransform(sectionProgress3, [0, 1], [0.5, 1]);
  
  const sectionOpacities = [sectionOpacity0, sectionOpacity1, sectionOpacity2, sectionOpacity3];
  
  // Fixed reference values for section colors to avoid conditional hook calls
  const section0Color = useTransform(sectionProgress0, v => v > 0.5 ? '#29dd3b' : 'white');
  const section1Color = useTransform(sectionProgress1, v => v > 0.5 ? '#29dd3b' : 'white');
  const section2Color = useTransform(sectionProgress2, v => v > 0.5 ? '#29dd3b' : 'white');
  const section3Color = useTransform(sectionProgress3, v => v > 0.5 ? '#29dd3b' : 'white');
  
  const sectionColors = [section0Color, section1Color, section2Color, section3Color];
  
  // Calculate path positions for each dot
  const getPathPoint = (t: number) => {
    // SVG path coordinates calculation
    // This creates a path similar to the one in the image
    const width = 100;
    const height = 400;
    
    if (t <= 0.25) {
      // First curve - start to first loop
      const adjustedT = t * 4;
      const x = width * 0.5 * Math.sin(adjustedT * Math.PI);
      const y = height * 0.25 * adjustedT;
      return { x, y };
    } else if (t <= 0.5) {
      // First loop
      const adjustedT = (t - 0.25) * 4;
      const angle = adjustedT * Math.PI * 2;
      const x = width * 0.5 * Math.sin(angle);
      const y = height * 0.25 + width * 0.25 * (1 - Math.cos(angle));
      return { x, y };
    } else if (t <= 0.75) {
      // Middle path to second loop
      const adjustedT = (t - 0.5) * 4;
      const x = width * 0.5 * Math.sin((1 - adjustedT) * Math.PI);
      const y = height * 0.5 + height * 0.25 * adjustedT;
      return { x, y };
    } else {
      // Second loop
      const adjustedT = (t - 0.75) * 4;
      const angle = adjustedT * Math.PI * 2;
      const x = width * 0.5 * Math.sin(angle);
      const y = height * 0.75 + width * 0.25 * (1 - Math.cos(angle));
      return { x, y };
    }
  };
  
  // Generate the SVG path string for the curved path
  const generatePathD = () => {
    const numPoints = 100;
    let d = `M 0 0`;
    
    for (let i = 0; i <= numPoints; i++) {
      const t = i / numPoints;
      const point = getPathPoint(t);
      d += ` L ${point.x} ${point.y}`;
    }
    
    return d;
  };
  
  // Calculate the path length for the stroke-dasharray animation
  const pathLength = useRef(1000); // approximation
  
  // Animation for the scroll indicator
  const pathOffset = useTransform(pathProgress, [0, 1], [pathLength.current, 0]);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div 
      ref={containerRef}
      className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden md:block h-[80vh] pointer-events-none"
      style={{ width: '150px' }}
    >
      {/* SVG Container for the curved path */}
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 100 400" 
        preserveAspectRatio="none" 
        className="overflow-visible"
      >
        {/* Background curved path */}
        <path
          d={generatePathD()}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* Animated progress path */}
        <motion.path
          d={generatePathD()}
          fill="none"
          stroke="#29dd3b"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={pathLength.current}
          strokeDashoffset={pathOffset}
        />
        
        {/* Section indicators positioned along the path */}
        {sections.map((section, index) => {
          const point = getPathPoint(section.position);
          
          return (
            <motion.g key={section.id} className="pointer-events-auto cursor-pointer">
              {/* Dot */}
              <motion.circle
                cx={point.x}
                cy={point.y}
                r={6}
                style={{
                  scale: sectionScales[index],
                  opacity: sectionOpacities[index],
                  fill: sectionColors[index]
                }}
                onClick={() => {
                  const element = document.getElementById(section.id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              />
              
              {/* Label */}
              <motion.text
                x={point.x + 15}
                y={point.y + 5}
                className="text-sm pointer-events-none select-none"
                style={{
                  fill: sectionColors[index],
                  opacity: sectionOpacities[index],
                }}
              >
                {section.label}
              </motion.text>
            </motion.g>
          );
        })}
      </svg>
      
      {/* Scroll indicator at the bottom */}
      <motion.div 
        className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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
