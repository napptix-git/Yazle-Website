
import React, { forwardRef } from 'react';

interface FlipCardProps {
  id: string;
  frontImage: string;
  backText: string;
  isActive?: boolean;
}

// GIF mapping based on card type
const cardGifs = {
  "In-Game": "https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif", // Gaming controller gif
  "On-Game": "https://media.giphy.com/media/JQDRLdRiG73hPHezLS/giphy.gif", // Interface display gif
  "Off-Game": "https://media.giphy.com/media/l41lJ8ywG1ncm9FXW/giphy.gif", // Network/connection gif
  "Pro-Game": "https://media.giphy.com/media/YTDZakyAorkLCzF8r8/giphy.gif"  // Tournament/trophy gif
};

const FlipCard = forwardRef<HTMLDivElement, FlipCardProps>(
  ({ id, frontImage, backText, isActive = false }, ref) => {
    const gifUrl = cardGifs[backText as keyof typeof cardGifs] || "";
    
    return (
      <div className="flip-card" id={id} ref={ref as React.RefObject<HTMLDivElement>}>
        <div className={`flip-card-wrapper ${isActive ? 'active' : ''}`}>
          <div className="flip-card-inner">
            <div className="flip-card-front border-4 border-[#29dd3b] rounded-2xl overflow-hidden">
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
                  <h3 className="text-3xl font-bold text-white text-center">{backText}</h3>
                </div>
              </div>
            </div>
            <div className="flip-card-back">
              <div className="flex flex-col items-center justify-center h-full">
                <h3 className="text-3xl font-bold mb-4">{backText}</h3>
                
                {/* Larger rectangular GIF in the back */}
                <div className="w-48 h-36 overflow-hidden bg-black/30 p-1 mb-4 rounded-md">
                  <img 
                    src={gifUrl} 
                    alt={`${backText} animation`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <p className="text-lg text-center px-6">
                  {backText === "In-Game" && "Native ad placements within the gaming environment."}
                  {backText === "On-Game" && "Strategic ad placements around the game interface."}
                  {backText === "Off-Game" && "Extend your reach beyond gameplay through our network."}
                  {backText === "Pro-Game" && "Specialized solutions for esports events and tournaments."}
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
