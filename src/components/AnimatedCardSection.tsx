
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FlipCard from './FlipCard';
import './FlipCardAnimation.css';

gsap.registerPlugin(ScrollTrigger);

const AnimatedCardSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const serviceData = [
    { id: "in-game", title: "In-Game" },
    { id: "on-game", title: "On-Game" },
    { id: "off-game", title: "Off-Game" },
    { id: "pro-game", title: "Pro-Game" }
  ];

  useEffect(() => {
    // Wait for the DOM to be ready
    if (!containerRef.current || !sectionRef.current || cardsRef.current.length < 4) return;
    
    // Clear any existing ScrollTrigger instances
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    const totalScrollHeight = window.innerHeight * 2.5;
    const positions = [15, 38, 62, 85]; // Horizontal positions in percentage
    const rotations = [-15, -7.5, 7.5, 15]; // Rotation angles
    
    // Pin the cards section during scroll
    const pinTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top+=120px top", // Adjust start position to account for navbar
      end: `+=${totalScrollHeight}px`,
      pin: true,
      pinSpacing: true,
    });

    // Animate cards to spread out
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(card, 
        { left: "50%", rotation: 0 }, 
        {
          left: `${positions[index]}%`,
          rotation: rotations[index],
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top+=120px top", // Adjust start position to account for navbar
            end: `+=${window.innerHeight * 0.8}px`,
            scrub: 0.5,
            id: `spread-${index}`,
          },
        }
      );
    });

    // Flip cards with staggered timing
    cardsRef.current.forEach((card, index) => {
      const frontEl = card.querySelector(".flip-card-front");
      const backEl = card.querySelector(".flip-card-back");
      const cardInner = card.querySelector(".flip-card-inner");
      
      if (!frontEl || !backEl || !cardInner) return;

      const staggerOffset = index * 0.05;
      const startOffset = 0.4 + staggerOffset;
      const endOffset = 0.7 + staggerOffset;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top+=80px top", // Adjust start position to account for navbar
        end: `+=${totalScrollHeight}px`,
        scrub: 1,
        id: `flip-${index}`,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress >= startOffset && progress <= endOffset) {
            const flipProgress = (progress - startOffset) / (endOffset - startOffset);
            const frontRotation = -180 * flipProgress;
            const backRotation = 180 - 180 * flipProgress;
            const cardRotation = rotations[index] * (1 - flipProgress);

            gsap.to(frontEl, { rotateY: frontRotation, ease: "power1.out" });
            gsap.to(backEl, { rotateY: backRotation, ease: "power1.out" });
            gsap.to(card, {
              rotate: cardRotation,
              ease: "power1.out",
            });
          }
        }
      });
    });

    setIsInitialized(true);

    return () => {
      // Cleanup
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [cardsRef.current.length]);

  return (
    <div className="relative h-[300vh]" ref={containerRef}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black" ref={sectionRef}>
        <h2 className="absolute top-24 left-0 w-full text-center text-3xl md:text-4xl font-bold text-white">Our Services</h2>
        
        <div className="cards-container relative w-full h-[80%] flex items-center justify-center">
          {serviceData.map((service, index) => (
            <FlipCard
              key={service.id}
              id={`card-${index + 1}`}
              frontImage="/lovable-uploads/7463cd87-d84d-4f7a-b845-8389ab62e8fb.png"
              backText={service.title}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
            />
          ))}
        </div>

        <div className="absolute bottom-12 left-0 w-full z-10">
          <div className="progress-indicator">
            {serviceData.map((_, index) => (
              <div 
                key={index} 
                className={`progress-dot ${index === 0 ? 'active' : ''}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedCardSection;
