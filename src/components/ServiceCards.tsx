
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
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
    icon: <Gamepad className="h-10 w-10" />,
  },
  {
    title: "On-Game",
    description: "Strategic ad placements around the game interface, loading screens, and menus.",
    icon: <MonitorPlay className="h-10 w-10" />,
  },
  {
    title: "Off-Game",
    description: "Extend your reach beyond gameplay through our network of gaming content platforms.",
    icon: <Globe className="h-10 w-10" />,
  },
  {
    title: "Pro Game",
    description: "Specialized solutions for esports events, tournaments, and professional gaming streams.",
    icon: <Trophy className="h-10 w-10" />,
  },
];

const ServiceCard: React.FC<ServiceProps> = ({ 
  title, 
  description, 
  icon,
  index 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.2 });
  
  return (
    <motion.div
      ref={cardRef}
      className="absolute w-full h-full rounded-xl overflow-hidden"
      initial={{ 
        x: 0, 
        rotateY: 0, 
        opacity: 1, 
        zIndex: 4 - index,
        scale: 1 - (index * 0.05)
      }}
      animate={isInView ? { 
        x: `${index * 100}%`,
        rotateY: 0,
        opacity: 1,
        transition: { 
          delay: 0.2 + (index * 0.1),
          duration: 0.6,
          type: "spring",
          stiffness: 100
        }
      } : {}}
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 20px 25px -5px rgba(41, 221, 59, 0.1), 0 10px 10px -5px rgba(41, 221, 59, 0.04)",
        transition: { duration: 0.2 }
      }}
    >
      <div className="bg-white text-black shadow-lg rounded-xl h-full transform transition-all duration-500 border border-white/20">
        <div className="p-6 flex flex-col h-full">
          <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center text-white mb-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { 
                opacity: 1, 
                scale: 1,
                transition: { delay: 0.3 + (index * 0.2), duration: 0.5 }
              } : {}}
              className="text-[#29dd3b]"
            >
              {icon}
            </motion.div>
          </div>
          
          <motion.h3 
            className="text-xl font-bold text-black mb-3"
            initial={{ opacity: 0 }}
            animate={isInView ? { 
              opacity: 1,
              transition: { delay: 0.4 + (index * 0.2), duration: 0.5 }
            } : {}}
          >
            {title}
          </motion.h3>
          
          <motion.p 
            className="text-gray-600 flex-grow"
            initial={{ opacity: 0 }}
            animate={isInView ? { 
              opacity: 1,
              transition: { delay: 0.5 + (index * 0.2), duration: 0.5 }
            } : {}}
          >
            {description}
          </motion.p>
          
          <motion.button 
            className="mt-4 px-4 py-2 rounded-full bg-black hover:bg-black/90 text-white transition-colors border border-[#29dd3b]/20 shadow-[0_0_10px_rgba(41,221,59,0.2)]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.6 + (index * 0.2), duration: 0.5 }
            } : {}}
          >
            Learn more
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const ServiceCards: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.1, 0.3], [0.8, 1]);
  const flipProgress = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  
  // Effect to control the card flipping based on scroll position
  useEffect(() => {
    const updateCardsFlip = () => {
      if (!containerRef.current) return;
      const cards = containerRef.current.querySelectorAll('.card-container > div');
      const progress = flipProgress.get();
      
      // Flip cards sequentially based on scroll position
      cards.forEach((card, index) => {
        const delay = index * 0.1;
        const flipThreshold = 0.25 + (delay);
        
        if (progress > flipThreshold) {
          card.classList.add('flipped');
        } else {
          card.classList.remove('flipped');
        }
      });
    };
    
    const unsubscribe = flipProgress.onChange(updateCardsFlip);
    return () => unsubscribe();
  }, [flipProgress]);
  
  return (
    <section id="solutions" className="py-24 bg-black" ref={containerRef}>
      <div className="container mx-auto text-center mb-12">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-4 text-white"
          style={{ opacity, scale }}
        >
          Our Services
        </motion.h2>
        <motion.p 
          className="text-gray-400 max-w-2xl mx-auto"
          style={{ opacity, scale }}
        >
          Comprehensive advertising solutions across the gaming ecosystem
        </motion.p>
      </div>
      
      <div className="container mx-auto px-4 overflow-hidden">
        <motion.div 
          className="relative h-[400px] max-w-4xl mx-auto card-container"
          style={{ opacity, scale }}
        >
          {serviceData.map((service, index) => (
            <ServiceCard 
              key={index}
              {...service}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceCards;
