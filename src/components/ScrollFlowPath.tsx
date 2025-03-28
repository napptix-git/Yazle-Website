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
  
  const sectionScale0 = useTransform(sectionProgress0, [0, 1], [1, 1.2]);
  const sectionScale1 = useTransform(sectionProgress1, [0, 1], [1, 1.2]);
  const sectionScale2 = useTransform(sectionProgress2, [0, 1], [1, 1.2]);
  const sectionScale3 = useTransform(sectionProgress3, [0, 1], [1, 1.2]);
  
  const sectionScales = [sectionScale0, sectionScale1, sectionScale2, sectionScale3];
  
  const sectionOpacity0 = useTransform(sectionProgress0, [0, 1], [0.6, 1]);
  const sectionOpacity1 = useTransform(sectionProgress1, [0, 1], [0.6, 1]);
  const sectionOpacity2 = useTransform(sectionProgress2, [0, 1], [0.6, 1]);
  const sectionOpacity3 = useTransform(sectionProgress3, [0, 1], [0.6, 1]);
  
  const sectionOpacities = [sectionOpacity0, sectionOpacity1, sectionOpacity2, sectionOpacity3];
  
  // Fixed reference values for section colors to avoid conditional hook calls
  const section0Color = useTransform(sectionProgress0, v => v > 0.5 ? '#4169E1' : 'white');
  const section1Color = useTransform(sectionProgress1, v => v > 0.5 ? '#4169E1' : 'white');
  const section2Color = useTransform(sectionProgress2, v => v > 0.5 ? '#4169E1' : 'white');
  const section3Color = useTransform(sectionProgress3, v => v > 0.5 ? '#4169E1' : 'white');
  
  const sectionColors = [section0Color, section1Color, section2Color, section3Color];

  // SVG path for the flowing line - manually created to match the reference image
  const svgPath = "M100,0 C200,150 50,250 180,350 C280,420 120,500 180,650 C230,800 180,950 100,1000";
  
  // Calculate positions for each dot along the path
  const getPositionAlongPath = (pathString: string, progress: number) => {
    // Simple implementation: we would ideally use SVGGeometryElement.getPointAtLength
    // But for simplicity, we'll use a predefined set of positions
    const pathPoints = [
      { x: 100, y: 0 },    // start
      { x: 180, y: 350 },  // first curve
      { x: 180, y: 650 },  // second curve
      { x: 100, y: 1000 }  // end
    ];
    
    // Interpolate between points based on progress
    const index = Math.min(Math.floor(progress * (pathPoints.length - 1)), pathPoints.length - 2);
    const t = (progress * (pathPoints.length - 1)) - index;
    
    return {
      x: pathPoints[index].x + t * (pathPoints[index + 1].x - pathPoints[index].x),
      y: pathPoints[index].y + t * (pathPoints[index + 1].y - pathPoints[index].y)
    };
  };
  
  // Calculate the path length for the stroke-dasharray animation
  const pathLength = useRef(2000); // approximation of the path length
  
  // Animation for the scroll indicator
  const pathOffset = useTransform(pathProgress, [0, 1], [pathLength.current, 0]);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div 
      ref={containerRef}
      className="fixed right-0 top-0 bottom-0 z-40 pointer-events-none"
      style={{ width: '100%', height: '100vh' }}
    >
      {/* SVG Container for the curved path */}
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 300 1000" 
        preserveAspectRatio="none" 
        className="overflow-visible"
      >
        {/* Background curved path */}
        <path
          d={svgPath}
          fill="none"
          stroke="rgba(65, 105, 225, 0.2)"
          strokeWidth="15"
          strokeLinecap="round"
        />
        
        {/* Animated progress path */}
        <motion.path
          d={svgPath}
          fill="none"
          stroke="#4169E1"
          strokeWidth="15"
          strokeLinecap="round"
          strokeDasharray={pathLength.current}
          strokeDashoffset={pathOffset}
        />
        
        {/* Section indicators positioned along the path */}
        {sections.map((section, index) => {
          const point = getPositionAlongPath(svgPath, section.position);
          
          return (
            <motion.g key={section.id} className="pointer-events-auto cursor-pointer">
              {/* Dot */}
              <motion.circle
                cx={point.x}
                cy={point.y}
                r={8}
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
                x={point.x + 20}
                y={point.y + 5}
                className="text-sm font-medium pointer-events-none select-none"
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-[#4169E1] text-xs">SCROLL</span>
        <ArrowDown size={16} className="text-[#4169E1]" />
      </motion.div>
    </div>
  );
};

export default ScrollFlowPath;
