
import React, { forwardRef } from 'react';

interface FlipCardProps {
  id: string;
  frontImage: string;
  backText: string;
  isActive?: boolean;
}

// GIF mapping based on card type
const cardGifs = {
  "IN-GAME": "/Videos/inGame.gif", // Gaming controller gif
  "ON-GAME": "/Videos/onGame.gif", // Interface display gif
  "OFF-GAME": "/Videos/offGame.gif", // Network/connection gif
  "PRO-GAME": "/Videos/proGame.gif"  // Tournament/trophy gif
};

const FlipCard = forwardRef<HTMLDivElement, FlipCardProps>(
  ({ id, frontImage, backText, isActive = false }, ref) => {
    const gifUrl = cardGifs[backText as keyof typeof cardGifs] || "";
    
    return (
      <div className="flip-card" id={id} ref={ref as React.RefObject<HTMLDivElement>}>
        <div className={`flip-card-wrapper ${isActive ? 'active' : ''}`}>
          <div className="flip-card-inner">
            <div className="flip-card-front border-[1px] border-[#FFFFFF] rounded-2xl overflow-hidden">
              <div className="w-full h-full flex flex-col relative">
                <img 
                  src={frontImage} 
                  alt={`${backText} card`}
                  className="w-full h-full object-cover absolute inset-0 z-0"
                />
                
                {/* Semi-transparent overlay for better visibility */}
                <div className="absolute inset-0 bg-black/50 z-10"></div>
                
                {/* Only showing the title */}
                <div className="relative z-20 flex flex-col h-full p-6 justify-center">
                  <h3 className="text-3xl font-bold text-white text-center font-disket">{backText}</h3>
                </div>
              </div>
            </div>
            <div className="flip-card-back">
              <div className="flex flex-col items-center justify-center h-full">
                {/* <h3 className="text-3xl font-bold mb-4 z-20">{backText}</h3> */}
                
                {/* Larger rectangular GIF in the back */}
                <div className=" overflow-hidden bg-black/30 p-1 mb-4 rounded-md">
                {gifUrl.match(/\.(mp4|mov)$/i) ? (
                    <video
                      src={gifUrl}
                      className="absolute inset-0 w-full h-full object-cover z-0"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={gifUrl}
                      alt={`${backText} animation`}
                      className="absolute inset-0 w-full h-full object-cover z-0"
                    />
                  )}
                </div>
                
                <p className="text-lg text-center px-6 z-20">
                  {/* {backText === "In-Game" && "Native ad placements within the gaming environment."} */}
                  {/* {backText === "On-Game" && "Strategic ad placements around the game interface."}
                  {backText === "Off-Game" && "Extend your reach beyond gameplay through our network."}
                  {backText === "Pro-Game" && "Specialized solutions for esports events and tournaments."} */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

FlipCard.displayName = 'FlipCard';

export default FlipCard;
