
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
  isActive: boolean, 
  onCardClick: () => void 
}> = ({ 
  title, 
  description, 
  icon,
  index,
  isActive,
  onCardClick
}) => {
  return (
    <motion.div
      className={`absolute w-[320px] h-[420px] rounded-xl overflow-hidden transition-all duration-300 ease-in-out ${
        isActive ? 'z-10 scale-105' : 'z-0'
      }`}
      style={{
        left: `${index * 80}px`,
        transform: `perspective(1000px) rotateY(${isActive ? 0 : index * 15}deg)`,
        transformOrigin: 'bottom left',
        filter: isActive ? 'none' : 'brightness(0.7)',
      }}
      whileHover={{ 
        scale: 1.05,
        zIndex: 10,
      }}
      onClick={onCardClick}
    >
      <div className="bg-white text-black h-full p-6 flex flex-col justify-between border border-white/10 rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mb-4">
            {icon}
          </div>
          
          <h3 className="text-xl font-bold text-black mb-3">{title}</h3>
          
          <p className="text-gray-600 text-center">{description}</p>
        </div>
        
        <button 
          className="mt-4 px-4 py-2 rounded-full bg-black text-white hover:bg-black/90 transition-colors"
        >
          Learn more
        </button>
      </div>
    </motion.div>
  );
};

const ServiceCards: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.1, 0.3], [0.8, 1]);

  const handleCardClick = (index: number) => {
    setActiveCardIndex(activeCardIndex === index ? null : index);
  };

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
          className="relative h-[500px] max-w-4xl mx-auto"
          style={{ opacity, scale }}
        >
          {serviceData.map((service, index) => (
            <ServiceCard 
              key={index}
              {...service}
              index={index}
              isActive={activeCardIndex === index}
              onCardClick={() => handleCardClick(index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceCards;
