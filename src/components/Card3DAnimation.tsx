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
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6">
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
      translateZ: 0,
      opacity: 1,
      scale: 1,
      transformOrigin: 'center center',
      force3D: true,
      transformPerspective: 1000
    });
    
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=400%",
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        markers: false,
      }
    });
    
    cards.forEach((card, i) => {
      const delay = i * 0.5;
      
      if (i > 0) {
        gsap.set(card, {
          z: -i * 50,
          y: i * 10,
          x: i * 5,
          scale: 1 - (i * 0.05),
          opacity: 1 - (i * 0.2)
        });
      }
      
      timeline.to(card, {
        rotateY: 360,
        z: 250,
        duration: 1,
        ease: "power2.inOut",
        opacity: 1
      }, delay);
      
      if (i < cards.length - 1) {
        timeline.to(card, {
          rotateY: 360 + 45,
          z: -500,
          x: (i % 2 === 0 ? 200 : -200),
          scale: 0.8,
          opacity: 0,
          duration: 0.8,
          ease: "power1.in"
        }, delay + 0.8);
      } else {
        timeline.to(card, {
          scale: 1.1,
          duration: 0.5,
          ease: "power1.out"
        }, delay + 1.0);
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
      className={`cards-section h-screen w-full bg-black overflow-hidden relative ${loaded ? 'loaded' : ''}`}
    >
      <div className="container mx-auto h-full flex items-center justify-center">
        <div className="text-center mb-8 absolute top-10 z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">3D Card Animation</h2>
          <p className="text-gray-400">Scroll to explore our services</p>
        </div>
        
        <div 
          ref={cardsContainerRef}
          className="card-container relative w-[320px] h-[450px] md:w-[400px] md:h-[500px]"
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
