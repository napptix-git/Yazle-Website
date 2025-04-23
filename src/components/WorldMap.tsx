
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface Office {
  city: string;
  country: string;
  x: number;
  y: number;
}

const WorldMap: React.FC = () => {
  const offices: Office[] = [
    { 
      city: "Mumbai",  
      country: "India",
      x: 70, 
      y: 58
    },
    { 
      city: "Dubai", 
      country: "United Arab Emirates",
      x: 62, 
      y: 52
    },
    { 
      city: "Delhi", 
      country: "India",
      x: 72, 
      y: 48
    },
    { 
      city: "Singapore", 
      country: "Singapore",
      x: 78, 
      y: 65
    }
  ];
  
  return (
    <div className="relative w-full max-w-6xl mx-auto mb-20">      
      <div className="relative w-full">
        <div className="w-full overflow-hidden relative mb-16">
          <div className="absolute inset-0 z-10 pointer-events-none" />
          <img 
            src="/lovable-uploads/Asia-Map-Contact.png" 
            alt="World Map" 
            className="w-full h-[650px] object-cover filter brightness-[2.5] contrast-150 saturate-0 opacity-95"
            style={{
              mixBlendMode: "lighten",
              background: "white"
            }}
          />
          <div className="absolute inset-0 bg-white opacity-20 pointer-events-none" />
        </div>
        {/* any markers to come here in the future */}
      </div>
    </div>
  );
};

export default WorldMap;
