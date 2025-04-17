
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
      <h2 className="text-4xl md:text-5xl font-syne font-extrabold mb-16 text-center">Global Presence</h2>
      
      <div className="relative w-full">
        <div className="w-full overflow-hidden relative mb-16 -mt-[400px] -ml-20">
          <img 
            src="/lovable-uploads/Asia-Map-Contact.png" 
            alt="World Map" 
            className="w-full h-[1050px] object-cover filter brightness-200 contrast-125 saturate-50 opacity-90"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      </div>
      
      <div className="mt-16 space-y-8 w-full">
        {offices.map((office) => (
          <div key={office.city} className="border-b border-white/20 pb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full">
              <h3 className="text-4xl md:text-6xl font-syne font-extrabold mb-4 md:mb-0 md:mr-8 first:md:mr-16">{office.city}</h3>
              <p className="text-xl">{office.country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldMap;
