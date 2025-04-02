
import React, { useRef, useState, useEffect } from 'react';
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
  isReversing: boolean;
  onFlipComplete: () => void;
}> = ({ 
  title, 
  description, 
  icon,
  index,
  isFlipped,
  isReversing,
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
          animation: isFlipped 
            ? 'wave-effect 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
            : isReversing 
              ? 'reverse-wave-effect 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
              : 'none',
        }}
        onAnimationEnd={onFlipComplete}
      >
        {/* Front of card */}
        <div 
          className={`absolute w-full h-full rounded-xl overflow-hidden shadow-xl border border-white/10 backface-visibility-hidden 
            ${isFlipped ? 'z-10 shadow-[0_0_15px_rgba(41,221,59,0.3)]' : 'z-20'}`}
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
            ${isFlipped ? 'z-20' : 'z-10'}`}
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
  // Track which card is currently flipped
  const [currentFlippedIndex, setCurrentFlippedIndex] = useState(-1);
  const [previousScrollY, setPreviousScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');
  
  // State to track if each card is flipped
  const [flippedCards, setFlippedCards] = useState<boolean[]>(
    Array(serviceData.length).fill(false)
  );
  
  // State to track if each card is reversing
  const [reversingCards, setReversingCards] = useState<boolean[]>(
    Array(serviceData.length).fill(false)
  );

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

  // Use the useScroll hook to track scroll progress within this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > previousScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < previousScrollY) {
        setScrollDirection('up');
      }
      setPreviousScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [previousScrollY]);

  // Start the card flip sequence when scrolled to this section
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      if (scrollDirection === 'down') {
        if (value > 0.2 && currentFlippedIndex === -1) {
          // Start the sequence when scrolled into view
          setCurrentFlippedIndex(0);
        }
      } else {
        // Reverse direction - start flipping from the last card
        if (value < 0.8 && currentFlippedIndex === -1 && flippedCards.some(flipped => flipped)) {
          // Find the last flipped card
          const lastFlippedIndex = flippedCards.lastIndexOf(true);
          if (lastFlippedIndex >= 0) {
            // Set it to start reversing
            setReversingCards(prev => {
              const newState = [...prev];
              newState[lastFlippedIndex] = true;
              return newState;
            });
          }
        }
      }
    });
    
    return () => unsubscribe();
  }, [scrollYProgress, currentFlippedIndex, flippedCards, scrollDirection]);
  
  // Handle the completion of a card flip
  const handleFlipComplete = (index: number) => {
    if (scrollDirection === 'down' && flippedCards[index] && index < serviceData.length - 1) {
      // Move to the next card
      setTimeout(() => {
        setCurrentFlippedIndex(index + 1);
      }, 200); // Small delay before flipping the next card
    } else if (scrollDirection === 'up' && reversingCards[index]) {
      // Card has completed reversal, update states
      setFlippedCards(prev => {
        const newState = [...prev];
        newState[index] = false;
        return newState;
      });
      
      setReversingCards(prev => {
        const newState = [...prev];
        newState[index] = false;
        return newState;
      });
      
      // If there's a card before this one, start reversing it
      if (index > 0 && flippedCards[index - 1]) {
        setTimeout(() => {
          setReversingCards(prev => {
            const newState = [...prev];
            newState[index - 1] = true;
            return newState;
          });
        }, 200);
      }
    }
  };
  
  // Update flippedCards state when currentFlippedIndex changes
  useEffect(() => {
    if (currentFlippedIndex >= 0 && currentFlippedIndex < serviceData.length) {
      setFlippedCards(prev => {
        const newState = [...prev];
        newState[currentFlippedIndex] = true;
        return newState;
      });
    }
  }, [currentFlippedIndex]);

  return (
    <motion.section 
      id="solutions" 
      className="py-32 bg-black relative min-h-screen flex flex-col items-center justify-center"
      ref={sectionRef}
      style={{ position: 'relative' }} // Add position relative for scroll tracking
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
                isReversing={reversingCards[index]}
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
