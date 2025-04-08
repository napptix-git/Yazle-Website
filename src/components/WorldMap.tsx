
import React, { useState, useEffect } from 'react';
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
      city: "Dubai",
      address: "Business Bay, Dubai, United Arab Emirates",
      x: 23,
      y: 25,
      color: "bg-green-400"
    },
    {
      city: "Delhi",
      address: "Connaught Place, New Delhi, India",
      x: 38,
      y: 25,
      color: "bg-purple-400"
    },
    {
      city: "Mumbai",
      address: "Bandra Kurla Complex, Mumbai, India",
      x: 30,
      y: 35,
      color: "bg-orange-400"
    },
    {
      city: "Singapore",
      address: "Marina Bay, Singapore",
      x: 58,
      y: 40,
      color: "bg-blue-400"
    }
  ];
  
  const [activeRegion] = useState("Worldwide");
  const [animateLines, setAnimateLines] = useState(false);
  
  useEffect(() => {
    // Start line animation after component mounts
    const timer = setTimeout(() => {
      setAnimateLines(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const filterOfficesByRegion = (region: string) => {
    if (region === "Worldwide") return offices;
    
    const regionMap: {[key: string]: string[]} = {
      "MEA": ["Dubai"],
      "APAC": ["Delhi", "Mumbai", "Singapore"]
    };
    
    return offices.filter(office => regionMap[region]?.includes(office.city));
  };
  
  const filteredOffices = filterOfficesByRegion(activeRegion);
  
  const getLineCoordinates = (index: number) => {
    if (index === offices.length - 1) {
      return {
        x1: `${offices[index].x}%`,
        y1: `${offices[index].y}%`,
        x2: `${offices[0].x}%`,
        y2: `${offices[0].y}%`
      };
    }
    
    return {
      x1: `${offices[index].x}%`,
      y1: `${offices[index].y}%`,
      x2: `${offices[index + 1].x}%`,
      y2: `${offices[index + 1].y}%`
    };
  };
  
  return (
    <div className="relative w-full max-w-5xl mx-auto mb-20">
      <div className="relative w-full">
        <div className="w-full aspect-[2/1] overflow-hidden relative">
          <img 
            src="/lovable-uploads/4cd66301-b585-4147-b394-e874eec88954.png" 
            alt="World Map" 
            className="w-full object-contain"
          />
          
          {/* Connecting lines between offices */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {filteredOffices.map((office, index) => {
              const lineCoords = getLineCoordinates(index);
              const lineTotalLength = Math.sqrt(
                Math.pow((parseFloat(lineCoords.x2) - parseFloat(lineCoords.x1)) / 100 * 1000, 2) + 
                Math.pow((parseFloat(lineCoords.y2) - parseFloat(lineCoords.y1)) / 100 * 500, 2)
              );
              
              return (
                <motion.line
                  key={`line-${office.city}`}
                  x1={lineCoords.x1}
                  y1={lineCoords.y1}
                  x2={lineCoords.x2}
                  y2={lineCoords.y2}
                  stroke="rgba(255, 255, 255, 0.4)"
                  strokeWidth="1.5"
                  strokeDasharray={lineTotalLength}
                  strokeDashoffset={animateLines ? 0 : lineTotalLength}
                  initial={{ strokeDashoffset: lineTotalLength }}
                  animate={{ strokeDashoffset: animateLines ? 0 : lineTotalLength }}
                  transition={{ duration: 1.5, delay: index * 0.5 }}
                />
              );
            })}
          </svg>
          
          {filteredOffices.map((office, index) => (
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
              <div className="relative">
                <div className={`absolute w-36 h-10 ${office.color} rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center`}>
                  <span className="text-black font-bold text-lg">
                    {office.city}
                  </span>
                </div>
                <div className={`absolute w-44 h-14 ${office.color}/40 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse`}></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="mt-16 space-y-8">
        {filteredOffices.map((office) => (
          <div key={office.city} className="border-b border-white/20 pb-8">
            <div className="flex flex-col md:flex-row justify-between">
              <h3 className="text-4xl md:text-5xl font-syne font-extrabold mb-4 md:mb-0">{office.city}</h3>
              <p className="text-xl max-w-md">{office.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldMap;
