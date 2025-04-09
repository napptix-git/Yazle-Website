import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Office {
  city: string;
  address: string;
  x: number;
  y: number;
  color: string;
}

const WorldMap: React.FC = () => {
  const offices: Office[] = [
    { 
      city: "Mumbai", 
      address: "102, Firdos Apartments, Waroda Road Bandra West, Mumbai, Maharashtra 400050",
      x: 60, 
      y: 58,
      color: "#ff9f7f"
    },
    { 
      city: "Dubai", 
      address: "302, Building 08, Media City, Dubai",
      x: 54, 
      y: 54,
      color: "#8bffb0"
    },
    { 
      city: "Singapore", 
      address: "8 Marina Gardens Drive, Singapore 018953",
      x: 75, 
      y: 72,
      color: "#ff7aef"
    }
  ];
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };
    
    const drawConnections = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const points = offices.map(office => ({
        x: (office.x / 100) * canvas.width,
        y: (office.y / 100) * canvas.height,
        color: office.color
      }));
      
      let progress = 0;
      const animate = () => {
        if (progress >= 1) return;
        
        progress += 0.01;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < points.length; i++) {
          for (let j = i + 1; j < points.length; j++) {
            const startPoint = points[i];
            const endPoint = points[j];
            
            const gradient = ctx.createLinearGradient(
              startPoint.x, startPoint.y, 
              endPoint.x, endPoint.y
            );
            gradient.addColorStop(0, startPoint.color);
            gradient.addColorStop(1, endPoint.color);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            
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
      
      requestAnimationFrame(animate);
    };
    
    resizeCanvas();
    
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [offices]);

  return (
    <div className="relative w-full max-w-3xl mx-auto mb-20">
      <h2 className="text-4xl md:text-5xl font-syne font-extrabold mb-10 text-center">Global Presence</h2>
      
      <div className="relative w-full">
        <div className="w-full aspect-[2/1] overflow-hidden relative">
          <canvas 
            ref={canvasRef} 
            className="absolute top-0 left-0 w-full h-full z-10"
          ></canvas>
          <img 
            src="/lovable-uploads/51e8b6c1-9de8-457c-883f-ab3a9d4bb28e.png" 
            alt="World Map" 
            className="w-full h-full object-cover brightness-[0.9] opacity-95"
          />
          
          {offices.map((office, index) => (
            <motion.div
              key={office.city}
              className="absolute z-20 w-3 h-3 rounded-full"
              style={{
                left: `${office.x}%`,
                top: `${office.y}%`,
                backgroundColor: office.color
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            />
          ))}
        </div>
      </div>
      
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
