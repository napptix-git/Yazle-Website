
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
          <img 
            src="/lovable-uploads/Asia-Map-Contact.png" 
            alt="World Map" 
            className="w-full h-[650px] object-cover filter brightness-200 contrast-125 saturate-50 opacity-90"
          />
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
