import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { 
  Gamepad, 
  MonitorPlay, 
  Globe, 
  Trophy,
} from 'lucide-react';
import './ServiceCardsAnimation.css';
import { useIsMobile } from '@/hooks/use-mobile';

const serviceData = [
  {
    id: 'in-game',
    title: "In-Game",
    description: "Native ad placements within the gaming environment that feel like a natural part of the experience.",
    icon: <Gamepad className="h-8 w-8 text-[#29dd3b]" />,
  },
  {
    id: 'on-game',
    title: "On-Game",
    description: "Strategic ad placements around the game interface, loading screens, and menus.",
    icon: <MonitorPlay className="h-8 w-8 text-[#29dd3b]" />,
  },
  {
    id: 'off-game',
    title: "Off-Game",
    description: "Extend your reach beyond gameplay through our network of gaming content platforms.",
    icon: <Globe className="h-8 w-8 text-[#29dd3b]" />,
  },
  {
    id: 'pro-game',
    title: "Pro Game",
    description: "Specialized solutions for esports events, tournaments, and professional gaming streams.",
    icon: <Trophy className="h-8 w-8 text-[#29dd3b]" />,
  },
];

const ResponsiveFlipCard = ({ card, index }: { card: typeof serviceData[0], index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => setFlipped(true), 150 + index * 100); // Stagger flip
    }
  }, [isInView, index]);

  return (
    <motion.div 
      ref={ref}
      className={`w-full rounded-xl overflow-hidden shadow-lg cursor-pointer relative ${
        flipped ? 'border border-[#29dd3b]/30 shadow-[0_0_30px_rgba(41,221,59,0.15)]' : 'border border-white/10'
      }`}
      whileHover={{ 
        scale: 1.03,
        transition: { duration: 0.3 }
      }}
    >
      <div className="p-8 md:p-10">
        <div className="mb-4 flex justify-center">
          <div className={`w-16 h-16 rounded-full ${flipped ? 'bg-[#29dd3b]/10' : 'bg-black/10'} flex items-center justify-center`}>
            {card.icon}
          </div>
        </div>
        <h3 className={`text-2xl font-bold mb-4 ${flipped ? 'text-white' : 'text-black'}`}>{card.title}</h3>
        {flipped && (
          <p className={`mb-6 ${flipped ? 'text-white/80' : 'text-gray-600'}`}>
            {card.description}
          </p>
        )}
        {flipped && (
          <button 
            className={`${flipped ? 'bg-[#29dd3b] text-black hover:bg-[#29dd3b]/90' : 'bg-black hover:bg-black/90 text-white'} px-6 py-2 rounded-full transition-all`}
          >
            Learn More
          </button>
        )}
      </div>
    </motion.div>
  );
};

const MobileFlipCards = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-6">
      {serviceData.map((card, idx) => (
        <ResponsiveFlipCard card={card} key={card.id} index={idx} />
      ))}
    </div>
  );
};

const CardStack = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const controls = useAnimation();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) {
      const observer = new window.IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          controls.start("visible");
        } else {
          setInView(false);
        }
      }, { threshold: 0.3 });
      
      if (containerRef.current) {
        observer.observe(containerRef.current);
      }
  
      return () => {
        if (containerRef.current) {
          observer.unobserve(containerRef.current);
        }
      };
    }
  }, [controls, isMobile]);

  if (isMobile) return null;

  const currentCard = serviceData[activeCard];

  return (
    <motion.div 
      ref={containerRef}
      className="card-stack-container relative"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.3,
            delayChildren: 0.2
          }
        }
      }}
      initial="hidden"
      animate={controls}
    >
      <div className="card-viewport relative w-full h-[500px] flex items-center justify-center">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={currentCard.id}
            className="card-item bg-white text-black rounded-2xl p-8 flex flex-col absolute w-[300px] md:w-[400px] shadow-2xl"
            custom={direction}
            variants={{
              initial: (custom) => ({
                x: custom > 0 ? 1000 : -1000,
                opacity: 0,
                scale: 0.5,
                rotateY: custom > 0 ? 45 : -45
              }),
              animate: {
                x: 0,
                opacity: 1,
                scale: 1,
                rotateY: 0,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }
              },
              exit: (custom) => ({
                x: custom > 0 ? -1000 : 1000,
                opacity: 0,
                scale: 0.5,
                rotateY: custom > 0 ? -45 : 45,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }
              }),
              hover: {
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.2 }
              }
            }}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover="hover"
          >
            <div className="flex flex-col items-center justify-between h-full">
              <div className="flex flex-col items-center">
                <div className="bg-black w-20 h-20 rounded-full flex items-center justify-center mb-6">
                  {currentCard.icon}
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">{currentCard.title}</h3>
                <p className="text-gray-600 text-center font-roboto-mono mb-8">
                  {currentCard.description}
                </p>
              </div>
              <button 
                className="mt-auto px-6 py-2 rounded-full bg-black text-white hover:bg-black/90 transition-colors font-roboto-mono"
              >
                Learn more
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
        
        <button 
          className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 z-10 transition-all"
          onClick={() => {
            setDirection(-1);
            setActiveCard((prev) => (prev - 1 + serviceData.length) % serviceData.length);
          }}
          aria-label="Previous card"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        
        <button 
          className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 z-10 transition-all"
          onClick={() => {
            setDirection(1);
            setActiveCard((prev) => (prev + 1) % serviceData.length);
          }}
          aria-label="Next card"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
      
      <div className="flex justify-center mt-8 space-x-2">
        {serviceData.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full ${activeCard === index ? 'bg-[#29dd3b]' : 'bg-white/30'}`}
            onClick={() => {
              setDirection(index > activeCard ? 1 : -1);
              setActiveCard(index);
            }}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </motion.div>
  );
};

const ServiceCards: React.FC = () => {
  return (
    <section 
      id="solutions" 
      className="py-32 bg-black relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="container mx-auto text-center mb-16 z-10">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-4 text-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
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
      
      <div className="container mx-auto px-4 flex-1 flex items-center justify-center z-10">
        <MobileFlipCards />
        <CardStack />
      </div>
    </section>
  );
};

export default ServiceCards;
