
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Office {
  city: string;
  address: string;
  x: number;
  y: number;
}

const WorldMap: React.FC = () => {
  const offices: Office[] = [
    { 
      city: "Mumbai", 
      address: "102, Firdos Apartments, Waroda Road Bandra West, Mumbai, Maharashtra 400050",
      x: 70, 
      y: 52
    },
    { 
      city: "Dubai", 
      address: "302, Building 08, Media City, Dubai",
      x: 65, 
      y: 48
    },
    { 
      city: "Singapore", 
      address: "20 Collyer Quay, #09-01, Singapore 049319",
      x: 76, 
      y: 58
    },
    { 
      city: "Delhi", 
      address: "45, Connaught Place, New Delhi, India 110001",
      x: 72, 
      y: 50
    }
  ];
  
  // Draw lines between locations
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match the parent container
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        drawConnections();
      }
    };
    
    // Draw lines between points
    const drawConnections = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(41, 221, 59, 0.5)';
      ctx.lineWidth = 1;
      
      // Calculate actual pixel positions
      const points = offices.map(office => ({
        x: (office.x / 100) * canvas.width,
        y: (office.y / 100) * canvas.height
      }));
      
      // Animate connection drawing
      let progress = 0;
      const animate = () => {
        if (progress >= 1) return;
        
        progress += 0.01;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections with progress
        for (let i = 0; i < points.length; i++) {
          for (let j = i + 1; j < points.length; j++) {
            const startPoint = points[i];
            const endPoint = points[j];
            
            const currentX = startPoint.x + (endPoint.x - startPoint.x) * progress;
            const currentY = startPoint.y + (endPoint.y - startPoint.y) * progress;
            
            ctx.beginPath();
            ctx.moveTo(startPoint.x, startPoint.y);
            ctx.lineTo(currentX, currentY);
            ctx.stroke();
          }
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      // Start animation
      requestAnimationFrame(animate);
    };
    
    // Initial setup
    resizeCanvas();
    
    // Handle window resize
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [offices]);
  
  return (
    <div className="relative w-full max-w-5xl mx-auto mb-20">
      <h2 className="text-4xl md:text-5xl font-syne font-extrabold mb-10 text-center">Global Presence</h2>
      
      <div className="relative w-full">
        {/* World Map Background with Canvas Overlay */}
        <div className="w-full aspect-[2/1] overflow-hidden relative">
          <canvas 
            ref={canvasRef} 
            className="absolute top-0 left-0 w-full h-full z-10"
          ></canvas>
          <img 
            src="/lovable-uploads/ec64442e-79ca-4a7d-a240-05f0cd63084a.png" 
            alt="World Map" 
            className="w-full object-contain brightness-[1.5] contrast-[0.9] invert"
          />
          
          {/* Location Labels */}
          {offices.map((office, index) => (
            <motion.div
              key={office.city}
              className="absolute z-20"
              style={{
                left: `${office.x}%`,
                top: `${office.y}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <div className="absolute w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute w-4 h-4 bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
              <div className="absolute text-white text-sm font-bold -translate-x-1/2 mt-2 whitespace-nowrap">
                {office.city}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Office Locations List */}
      <div className="mt-16 space-y-8">
        {offices.map((office) => (
          <div key={office.city} className="border-b border-white/20 pb-8">
            <div className="flex flex-col md:flex-row justify-between">
              <h3 className="text-4xl md:text-5xl font-syne font-extrabold mb-4 md:mb-0">{office.city}</h3>
              <p className="text-xl max-w-md">{office.address}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Region Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mt-16">
        {["Worldwide", "APAC", "MEA", "Europe", "Americas"].map((region, index) => (
          <button
            key={region}
            className={`px-6 py-2 rounded-full text-lg transition-all ${
              index === 0 
                ? "bg-white text-black" 
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {region}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WorldMap;
