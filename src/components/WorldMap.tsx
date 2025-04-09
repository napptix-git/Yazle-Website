
import React from 'react';

interface Office {
  city: string;
  address: string;
}

const WorldMap: React.FC = () => {
  const offices: Office[] = [
    { 
      city: "Mumbai", 
      address: "102, Firdos Apartments, Waroda Road Bandra West, Mumbai, Maharashtra 400050"
    },
    { 
      city: "Dubai", 
      address: "302, Building 08, Media City, Dubai"
    },
    { 
      city: "Delhi", 
      address: "42-B, Connaught Place, New Delhi, 110001"
    },
    { 
      city: "Singapore", 
      address: "8 Marina Gardens Drive, Singapore 018953"
    }
  ];

  return (
    <div className="relative w-full max-w-xl mx-auto mb-20">
      <h2 className="text-4xl md:text-5xl font-syne font-extrabold mb-10 text-center">Global Presence</h2>
      
      <div className="relative w-full mb-12">
        <div className="w-full aspect-[2/1] overflow-hidden relative">
          <img 
            src="/lovable-uploads/05862179-4388-4de5-ac40-81484c8be7f3.png" 
            alt="World Map" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="space-y-6 text-center">
        {offices.map((office) => (
          <div key={office.city} className="pb-4">
            <p className="text-xl">
              <span className="font-semibold">{office.city}</span>: {office.address}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldMap;
