
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
                
                {/* Semi-transparent overlay for better text readability */}
                <div className="absolute inset-0 bg-black/50 z-10"></div>
                
                {/* Content container */}
                <div className="relative z-20 flex flex-col h-full p-6 justify-between">
                  <h3 className="text-3xl font-bold mb-4 text-white">{backText}</h3>
                  
                  {/* GIF in the middle */}
                  <div className="flex-1 flex items-center justify-center my-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-black/30 p-1">
                      <img 
                        src={gifUrl} 
                        alt={`${backText} animation`} 
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  
                  <p className="text-white/90 text-sm">
                    Click to learn more about {backText}
                  </p>
                </div>
              </div>
            </div>
            <div className="flip-card-back">
              <div className="flex flex-col items-center justify-center h-full">
                <h3 className="text-3xl font-bold mb-4">{backText}</h3>
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
