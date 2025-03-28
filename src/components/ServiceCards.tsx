
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Gamepad, 
  MonitorPlay, 
  Globe, 
  Trophy,
} from 'lucide-react';

interface ServiceProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const serviceData = [
  {
    title: "In-Game",
    description: "Native ad placements within the gaming environment that feel like a natural part of the experience.",
    icon: <Gamepad className="h-10 w-10 text-[#29dd3b]" />,
  },
  {
    title: "On-Game",
    description: "Strategic ad placements around the game interface, loading screens, and menus.",
    icon: <MonitorPlay className="h-10 w-10 text-[#29dd3b]" />,
  },
  {
    title: "Off-Game",
    description: "Extend your reach beyond gameplay through our network of gaming content platforms.",
    icon: <Globe className="h-10 w-10 text-[#29dd3b]" />,
  },
  {
    title: "Pro Game",
    description: "Specialized solutions for esports events, tournaments, and professional gaming streams.",
    icon: <Trophy className="h-10 w-10 text-[#29dd3b]" />,
  },
];

const ServiceCard: React.FC<ServiceProps & { 
  isFlipped: boolean;
  isExpanded: boolean;
  onCardClick: () => void 
}> = ({ 
  title, 
  description, 
  icon,
  index,
  isFlipped,
  isExpanded,
  onCardClick
}) => {
  const offset = index * 40; // Offset for staggered layout
  const zIndex = 4 - index; // Ensure proper stacking order
  
  return (
    <div
      className="absolute top-0"
      style={{
        left: isExpanded ? `${index * 300}px` : `${offset}px`,
        zIndex: isFlipped ? 10 : zIndex,
        transition: "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        transform: `
          perspective(1500px) 
          rotateY(${isFlipped ? '0deg' : '0deg'}) 
          ${isExpanded ? 'translateX(0)' : ''}
        `,
        transformOrigin: 'center',
      }}
      onClick={onCardClick}
    >
      <div 
        className="relative w-[280px] h-[400px] card-container cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(0deg)',
          transition: 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
      >
        {/* Front of card */}
        <div 
          className={`absolute w-full h-full rounded-xl overflow-hidden shadow-xl border border-white/10 backface-visibility-hidden 
            ${isFlipped ? 'z-10 shadow-[0_0_15px_rgba(41,221,59,0.3)]' : 'z-20'}`}
          style={{
            backfaceVisibility: 'hidden',
            background: 'white',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }}
        >
          <div className="flex flex-col justify-center items-center h-full">
            <div className="text-black text-xl font-bold tracking-tight">
              {title}
            </div>
          </div>
        </div>
        
        {/* Back of card (content side) */}
        <div 
          className={`absolute w-full h-full bg-white text-black rounded-xl overflow-hidden shadow-xl border border-white/10 backface-visibility-hidden
            ${isFlipped ? 'z-20' : 'z-10'}`}
          style={{
            backfaceVisibility: 'hidden',
            transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
            transition: 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }}
        >
          <div className="p-6 flex flex-col h-full justify-between">
            <div className="flex flex-col items-center">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mb-4">
                {icon}
              </div>
              
              <h3 className="text-xl font-bold text-black mb-3">{title}</h3>
              
              <p className="text-gray-600 text-center font-roboto-mono">{description}</p>
            </div>
            
            <button 
              className="mt-4 px-4 py-2 rounded-full bg-black text-white hover:bg-black/90 transition-colors font-roboto-mono"
            >
              Learn more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceCards: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedCards, setExpandedCards] = useState(false);
  const [flippedCardIndexes, setFlippedCardIndexes] = useState<number[]>([]);
  const [lockScroll, setLockScroll] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.1, 0.3], [0.8, 1]);
  
  // Track scroll progress to trigger animations
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", value => {
      // Expand cards first
      if (value > 0.3 && !expandedCards) {
        setExpandedCards(true);
        setLockScroll(true); // Lock scroll when cards start expanding
      } else if (value < 0.2 && expandedCards && animationComplete) {
        setExpandedCards(false);
        setFlippedCardIndexes([]);
        setAnimationComplete(false);
      }
      
      // Then flip cards one by one
      if (expandedCards) {
        const flipTiming = [0.4, 0.5, 0.6, 0.7];
        
        flipTiming.forEach((threshold, idx) => {
          if (value > threshold && !flippedCardIndexes.includes(idx)) {
            setFlippedCardIndexes(prev => [...prev, idx]);
            
            // When last card is flipped, mark animation as complete and unlock scroll
            if (idx === 3) {
              setTimeout(() => {
                setLockScroll(false);
                setAnimationComplete(true);
              }, 600);
            }
          }
        });
      }
    });
    
    return () => unsubscribe();
  }, [scrollYProgress, expandedCards, flippedCardIndexes, animationComplete]);
  
  // Create wheel event handler
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (lockScroll) {
        e.preventDefault();
      }
    };

    // Create touch event handlers
    const handleTouchMove = (e: TouchEvent) => {
      if (lockScroll) {
        e.preventDefault();
      }
    };

    // Add event listeners with passive: false to allow preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [lockScroll]);
  
  const handleCardClick = (index: number) => {
    if (expandedCards) {
      if (flippedCardIndexes.includes(index)) {
        setFlippedCardIndexes(flippedCardIndexes.filter(i => i !== index));
      } else {
        setFlippedCardIndexes([...flippedCardIndexes, index]);
      }
    }
  };

  return (
    <section id="solutions" className="py-32 bg-black relative" ref={containerRef}>
      <div className="container mx-auto text-center mb-16">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-4 text-white"
          style={{ opacity, scale }}
        >
          Our Services
        </motion.h2>
        <motion.p 
          className="text-gray-400 max-w-2xl mx-auto font-roboto-mono"
          style={{ opacity, scale }}
        >
          Comprehensive advertising solutions across the gaming ecosystem
        </motion.p>
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="relative h-[500px] max-w-[1000px] mx-auto"
          style={{ opacity, scale }}
        >
          <div className="relative h-[400px]" style={{ perspective: '1500px' }}>
            {serviceData.map((service, index) => (
              <ServiceCard 
                key={index}
                {...service}
                index={index}
                isFlipped={flippedCardIndexes.includes(index)}
                isExpanded={expandedCards}
                onCardClick={() => handleCardClick(index)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceCards;
