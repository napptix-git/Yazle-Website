import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import './Card3DAnimation.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface CardData {
  id: number;
  title: string;
  description: string;
  color: string;
  image?: string;
}

const cardData: CardData[] = [
  {
    id: 1,
    title: "Gaming Monetization",
    description: "Unlock new revenue streams with our specialized gaming ad products.",
    color: "bg-purple-500",
    image: "/lovable-uploads/8354ca7f-1dcf-4c35-bc7d-7fb04f9c9254.png",
  },
  {
    id: 2,
    title: "Audience Targeting",
    description: "Reach your ideal gaming demographics with precision targeting.",
    color: "bg-blue-500",
    image: "/lovable-uploads/6e100c42-279f-4ff0-8321-04d4fcd5505d.png",
  },
  {
    id: 3,
    title: "Performance Analytics",
    description: "Track campaign performance with our advanced analytics suite.",
    color: "bg-green-500",
    image: "/lovable-uploads/7e606c44-61cb-46c1-9563-29b2a6d7b82e.png",
  },
  {
    id: 4,
    title: "Creative Solutions",
    description: "Stand out with innovative ad formats designed specifically for gamers.",
    color: "bg-yellow-500",
    image: "/lovable-uploads/9d37880a-6199-4554-aaa7-8ec093ad6bb8.png",
  },
];

const AnimatedCard: React.FC<{ card: CardData; index: number }> = ({ card, index }) => {
  return (
    <div 
      className="card-item absolute w-full h-full gsap-3d-card"
      data-card-index={index}
    >
      <Card className={`w-full h-full overflow-hidden shadow-3d border-2 border-white/10 ${card.image ? '' : card.color}`}>
        <div className="card-content-wrapper w-full h-full">
          {card.image ? (
            <div className="w-full h-full relative">
              <img 
                src={card.image} 
                alt={card.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{card.title}</h3>
                <p className="text-white/80">{card.description}</p>
              </div>
            </div>
          ) : (
            <CardContent className="flex flex-col h-full justify-center items-center p-6">
              <h3 className="text-2xl font-bold mb-2 text-white">{card.title}</h3>
              <p className="text-white/80">{card.description}</p>
            </CardContent>
          )}
        </div>
      </Card>
    </div>
  );
};

export const Card3DAnimation = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [loaded, setLoaded] = useState(false);
  
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
    if (!sectionRef.current || !cardsContainerRef.current) return;
    
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    setLoaded(true);
    
    const cards = gsap.utils.toArray<HTMLElement>('.card-item');
    
    if (!cards.length) return;
    
    gsap.set(cards, {
      rotateY: 0,
      rotationX: 5,
      translateZ: (i) => i * -30,
      y: (i) => i * 5,
      opacity: (i) => 1 - (i * 0.15),
      scale: (i) => 1 - (i * 0.05),
      transformOrigin: 'center center',
      transformPerspective: 1200,
      force3D: true,
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 20%",
        end: "+=300%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        markers: false,
      }
    });

    cards.forEach((card, i) => {
      const progress = i / (cards.length - 1);
      const startPosition = 0.1 + (i * 0.2);
      const duration = 0.4;

      timeline.to(card, {
        rotateY: 360,
        translateZ: 200,
        scale: 1.1,
        opacity: 1,
        duration: duration,
        ease: "power2.inOut",
      }, startPosition);

      if (i < cards.length - 1) {
        timeline.to(card, {
          rotateY: 360 + 45,
          translateZ: -400,
          x: (i % 2 === 0 ? -600 : 600),
          scale: 0.8,
          opacity: 0,
          duration: duration,
          ease: "power1.in"
        }, startPosition + duration);
      } else {
        timeline.to(card, {
          scale: 1.15,
          duration: 0.3,
          ease: "power2.out"
        }, startPosition + duration);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      timeline.kill();
    };
  }, [isMobile]);
  
  return (
    <section 
      ref={sectionRef}
      className={`cards-section min-h-screen w-full bg-black overflow-hidden relative ${loaded ? 'loaded' : ''}`}
    >
      <div className="container mx-auto h-full flex items-center justify-center">
        <div className="text-center mb-8 absolute top-10 z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our Services</h2>
          <p className="text-gray-400 max-w-lg mx-auto">Explore our specialized gaming advertising solutions</p>
        </div>
        
        <div 
          ref={cardsContainerRef}
          className="card-container relative w-[300px] h-[400px] md:w-[400px] md:h-[550px] mt-24"
        >
          {cardData.map((card, index) => (
            <AnimatedCard 
              key={card.id} 
              card={card} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Card3DAnimation;
