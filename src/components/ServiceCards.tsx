
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Gamepad, 
  MonitorPlay, 
  Globe, 
  Trophy,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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

interface ServiceProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const ServiceCard: React.FC<ServiceProps & { 
  isFlipped: boolean;
  flipProgress: number;
  onFlipComplete: () => void;
}> = ({ 
  title, 
  description, 
  icon,
  index,
  isFlipped,
  flipProgress,
  onFlipComplete
}) => {
  
  return (
    <div
      className="service-card relative"
      style={{
        zIndex: 4 - index,
      }}
    >
      <div 
        className="relative w-[280px] h-[400px] card-container"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${flipProgress * 180}deg)`,
          transition: 'transform 1.2s ease', // Slower transition
        }}
        onAnimationEnd={onFlipComplete}
      >
        <div 
          className={`absolute w-full h-full rounded-xl overflow-hidden shadow-xl border border-white/10 
            ${flipProgress > 0.5 ? 'z-10 shadow-[0_0_15px_rgba(41,221,59,0.3)]' : 'z-20'}`}
          style={{
            backfaceVisibility: 'hidden',
            background: 'white',
          }}
        >
          <div className="flex flex-col justify-center items-center h-full">
            <div className="text-black text-xl font-bold tracking-tight">
              {title}
            </div>
          </div>
        </div>
        
        <div 
          className={`absolute w-full h-full bg-white text-black rounded-xl overflow-hidden shadow-xl border border-white/10
            ${flipProgress > 0.5 ? 'z-20' : 'z-10'}`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [flippedCards, setFlippedCards] = useState<boolean[]>([false, false, false, false]);
  const [flipProgress, setFlipProgress] = useState<number[]>([0, 0, 0, 0]);
  const [activeCardIndex, setActiveCardIndex] = useState(-1);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Clean up existing triggers to prevent memory leaks
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Create a section trigger for pinning
    const sectionTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    });

    // Create sequential card flip animations
    const totalScrollDistance = 1;
    const cardDelay = 0.25; // Percent of scroll progress to delay between cards
    
    // Increased segment size for slower animations
    const segmentSize = totalScrollDistance / (serviceData.length + 1);

    const triggers = serviceData.map((_, index) => {
      // Calculate start and end points for each card with delay
      const progressStart = index * segmentSize;
      const progressEnd = progressStart + segmentSize;
      
      return ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 2, // Much slower scrub for smoother animations (increased from 1 to 2)
        onUpdate: (self) => {
          if (!sectionRef.current) return;
          
          const overallProgress = self.progress;
          
          // Only proceed with this card if previous card has completed or it's the first card
          const shouldAnimate = index === 0 || (index > 0 && flipProgress[index-1] >= 0.99);
          
          if (shouldAnimate) {
            // Map the overall scroll progress to individual card flip progress
            const normalizedCardProgress = gsap.utils.mapRange(
              progressStart, 
              progressEnd, 
              0, 
              1, 
              overallProgress
            );
            
            const clampedProgress = gsap.utils.clamp(0, 1, normalizedCardProgress);
            
            // Update flip progress for this card
            setFlipProgress(prev => {
              const newProgress = [...prev];
              newProgress[index] = clampedProgress;
              return newProgress;
            });
            
            // Set active card index for sequential animation
            if (clampedProgress > 0 && clampedProgress < 1) {
              setActiveCardIndex(index);
            }
            
            // Update flipped state
            setFlippedCards(prev => {
              const newFlipped = [...prev];
              newFlipped[index] = clampedProgress > 0.5;
              return newFlipped;
            });
          }
        }
      });
    });

    // Cleanup function
    return () => {
      if (sectionTrigger) sectionTrigger.kill();
      triggers.forEach(trigger => {
        if (trigger) trigger.kill();
      });
    };
  }, [flipProgress]); // Added flipProgress dependency to react to changes

  const handleFlipComplete = (index: number) => {
    console.log(`Card ${index} flip completed`);
  };

  return (
    <motion.section 
      id="solutions" 
      className="py-32 bg-black relative min-h-screen flex flex-col items-center justify-center"
      ref={sectionRef}
      style={{ position: 'relative' }} 
    >
      <div className="container mx-auto text-center mb-16">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-4 text-white"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Services
        </motion.h2>
        <motion.p 
          className="text-gray-400 max-w-2xl mx-auto font-roboto-mono"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Comprehensive advertising solutions across the gaming ecosystem
        </motion.p>
      </div>
      
      <div className="container mx-auto px-4">
        <div 
          ref={cardsContainerRef}
          className={`flex ${isMobile ? 'flex-col items-center' : 'flex-row justify-center items-center'} gap-6`}
        >
          {serviceData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: index * 0.2 }} // Increased duration for smoother animations
            >
              <ServiceCard 
                {...service}
                index={index}
                isFlipped={flippedCards[index]}
                flipProgress={flipProgress[index]}
                onFlipComplete={() => handleFlipComplete(index)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ServiceCards;
