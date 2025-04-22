
import React from 'react';

const WorldMap: React.FC = () => {
  return (
    <div className="relative w-full max-w-6xl mx-auto mb-20">      
      <div className="relative w-full">
        <div className="w-full overflow-hidden relative mb-16">
          <img 
            src="/lovable-uploads/ec64442e-79ca-4a7d-a240-05f0cd63084a.png" 
            alt="World Map" 
            className="w-full h-[650px] object-cover filter brightness-[2.5] contrast-125 saturate-50"
          />
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
