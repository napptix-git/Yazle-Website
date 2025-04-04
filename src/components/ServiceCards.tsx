
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Gamepad, 
  MonitorPlay, 
  Globe, 
  Trophy,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollLock } from 'gsap/ScrollLock';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollLock);

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
          transition: isFlipped || flipProgress === 0 ? 'none' : 'transform 0.3s ease-out',
        }}
        onAnimationEnd={onFlipComplete}
      >
        {/* Front of card */}
        <div 
          className={`absolute w-full h-full rounded-xl overflow-hidden shadow-xl border border-white/10 backface-visibility-hidden 
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
        
        {/* Back of card (content side) */}
        <div 
          className={`absolute w-full h-full bg-white text-black rounded-xl overflow-hidden shadow-xl border border-white/10 backface-visibility-hidden
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
  const [isScrollLocked, setIsScrollLocked] = useState(false);

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

  // Initialize scroll-triggered animations
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Clear any existing triggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Create a scroll trigger for each card
    const triggers = serviceData.map((_, index) => {
      const cardTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: `top+=${300 + (index * 100)}px center`,
        end: `top+=${300 + (index * 100) + 200}px center`,
        scrub: 0.5, // Smooth scrubbing effect
        onEnter: () => {
          // When entering forward (scrolling down)
          setIsScrollLocked(true);
          setTimeout(() => setIsScrollLocked(false), 300); // Unlock after animation completes
        },
        onLeaveBack: () => {
          // When leaving backward (scrolling up)
          setIsScrollLocked(true);
          setTimeout(() => setIsScrollLocked(false), 300);
        },
        onUpdate: (self) => {
          // Update flip progress based on scroll position
          const newProgress = [...flipProgress];
          newProgress[index] = self.progress;
          setFlipProgress(newProgress);
          
          // Update flipped state when progress passes threshold
          if (self.progress > 0.5 && !flippedCards[index]) {
            const newFlipped = [...flippedCards];
            newFlipped[index] = true;
            setFlippedCards(newFlipped);
          } else if (self.progress < 0.5 && flippedCards[index]) {
            const newFlipped = [...flippedCards];
            newFlipped[index] = false;
            setFlippedCards(newFlipped);
          }
        }
      });
      
      return cardTrigger;
    });

    // Apply scroll lock when animations are in progress
    const scrollLockEffect = () => {
      if (isScrollLocked) {
        gsap.to(window, { 
          scrollTo: window.scrollY, 
          duration: 0.3, 
          overwrite: true,
          onComplete: () => setIsScrollLocked(false)
        });
      }
    };

    // Enable the scroll lock effect
    gsap.ticker.add(scrollLockEffect);

    return () => {
      // Clean up
      triggers.forEach(trigger => trigger.kill());
      gsap.ticker.remove(scrollLockEffect);
    };
  }, [flippedCards, isScrollLocked]);

  const handleFlipComplete = (index: number) => {
    // Add any specific logic after flip completes if needed
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
        <div className={`flex ${isMobile ? 'flex-col items-center' : 'flex-row justify-center items-center'} gap-6`}>
          {serviceData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
