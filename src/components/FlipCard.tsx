
import React, { forwardRef } from 'react';

interface FlipCardProps {
  id: string;
  frontImage: string;
  backText: string;
  isActive?: boolean;
}

// GIF mapping based on card type
const cardGifs = {
  "IN-GAME": "/Videos/in_game_vid.mp4", // Gaming controller gif
  "ON-GAME": "/Videos/on_game_vid.mp4", // Interface display gif
  "OFF-GAME": "/Videos/off_game_vid.mp4", // Network/connection gif
  "PRO-GAME": "/Videos/pro_game_vid.mp4"  // Tournament/trophy gif
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
              <div className="flex flex-col items-center justify-center h-full relative">
                {/* Video container with proper dimensions */}
                <div className="relative w-full h-64 overflow-hidden bg-black/30 mb-4 rounded-md">
                  {gifUrl.match(/\.(mp4|mov)$/i) ? (
                    <video
                      src={gifUrl}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      onError={(e) => {
                        console.error('Video failed to load:', gifUrl, e);
                      }}
                      onLoadStart={() => {
                        console.log('Video loading started:', gifUrl);
                      }}
                      onCanPlay={() => {
                        console.log('Video can play:', gifUrl);
                      }}
                    />
                  ) : (
                    <img
                      src={gifUrl}
                      alt={`${backText} animation`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Image failed to load:', gifUrl, e);
                      }}
                    />
                  )}
                </div>
                
                <p className="text-lg text-center px-6 z-20 text-white">
                  {/* Add descriptions if needed */}
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
