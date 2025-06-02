import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FlipCard from './FlipCard';
import './FlipCardAnimation.css';
import StaticParticleCanvas from './StaticParticle';

gsap.registerPlugin(ScrollTrigger);

const AnimatedCardSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false); // New state for large screens

  const serviceData = [
    { id: "in-game", title: "IN-GAME" },
    { id: "on-game", title: "ON-GAME" },
    { id: "off-game", title: "OFF-GAME" },
    { id: "pro-game", title: "PRO-GAME" }
  ];

  const serviceCards = [
    { 
      id: "in-game", 
      title: "IN-GAME",
      frontImage: "/lovable-uploads/Card1.png" // 👈 specific image
    },
    { 
      id: "on-game", 
      title: "ON-GAME",
      frontImage: "/lovable-uploads/Card2.png"
    },
    { 
      id: "off-game", 
      title: "OFF-GAME",
      frontImage: "/lovable-uploads/Card3.png"
    },
    { 
      id: "pro-game", 
      title: "PRO-GAME",
      frontImage: "/lovable-uploads/Card4.png"
    }
  ];
  

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsLargeScreen(width >= 1024); // Large screens (e.g., desktops)
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || cardsRef.current.length === 0) return;

    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    const totalScrollHeight = window.innerHeight * 2.5;

    if (isMobile) {
      cardsRef.current.forEach((card, index) => {
        const frontEl = card.querySelector(".flip-card-front");
        const backEl = card.querySelector(".flip-card-back");

        if (!frontEl || !backEl) return;

        ScrollTrigger.create({
          trigger: card,
          start: "top +=200px",
          end: () => `top center`,
          scrub: 1,
          pin: true,
          pinSpacing: false,
          onUpdate: (self) => {
            const progress = self.progress;
            const frontRotation = -180 * progress;
            const backRotation = 180 - 180 * progress;

            gsap.to(frontEl, { rotateY: frontRotation, ease: "none", overwrite: "auto" });
            gsap.to(backEl, { rotateY: backRotation, ease: "none", overwrite: "auto" });
          }
        });
      });
    } else {
      const positions = [14, 38, 62, 86];
      const rotations = [-15, -7.5, 7.5, 15];

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${totalScrollHeight}px`,
        pin: true,
        pinSpacing: true,
      });

      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(card,
          { left: "50%", rotation: 0 },
          {
            left: `${positions[index]}%`,
            rotation: rotations[index],
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: `+=${window.innerHeight * 0.8}px`,
              scrub: 0.5,
              id: `spread-${index}`,
            },
          }
        );
      });

      cardsRef.current.forEach((card, index) => {
        const frontEl = card.querySelector(".flip-card-front");
        const backEl = card.querySelector(".flip-card-back");

        if (!frontEl || !backEl) return;

        const staggerOffset = index * 0.05;
        const startOffset = 0.4 + staggerOffset;
        const endOffset = 0.7 + staggerOffset;

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "center bottom",
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
              gsap.to(card, { rotate: cardRotation, ease: "power1.out" });
            }
          }
        });
      });
    }
  }, [isMobile, cardsRef.current.length]);

  return (
    <div
      className={`relative ${isMobile ? 'h-[340vh]' : 'h-[350vh]'}`}
      ref={containerRef}
    >
    
      {/* Render heading and description only if not on large screens */}
      {!isLargeScreen && (
        <div className="bg-black px-4 text-center ">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-disket">
            Our Services
          </h2>
          <p className="text-gray-400 pt-3 max-w-2xl mx-auto font-productSans">
            Seamless brand integration across every layer of the gaming journey.
          </p>
        </div>
      )}

      <div
        className={`relative ${isMobile ? '' : 'sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black lg:pb-[500px]'}`}
        ref={sectionRef}
      >
        {/* Render heading and description for large screens */}
        <StaticParticleCanvas />
        {isLargeScreen && (
          <div className="absolute w-full text-center z-20 pointer-events-none">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-disket">
              Our Services
            </h2>
            <p className="text-gray-400 pt-3 max-w-2xl mx-auto font-productSans">
              Seamless brand integration across every layer of the gaming journey.
            </p>
          </div>
        )}

        {isMobile ? (
          <div className="w-full">
            {serviceData.map((service, index) => (
              <section
                key={service.id}
                className="h-[80vh] flex items-center justify-center px-4 py-5 mt-32 "
              >
                <FlipCard
                  id={`card-${index + 1}`}
                  frontImage={serviceCards[index].frontImage}
                  backText={service.title}
                  ref={(el) => {
                    if (el instanceof HTMLDivElement) cardsRef.current[index] = el;
                  }}
                />
              </section>
            ))}
          </div>
        ) : (
          <div className="cards-container relative w-full h-[80%] flex items-center justify-center top-[200px]">
            {serviceData.map((service, index) => (
              <FlipCard
                key={service.id}
                id={`card-${index + 1}`}
                frontImage={serviceCards[index].frontImage}
                backText={service.title}
                ref={(el) => {
                  if (el instanceof HTMLDivElement) cardsRef.current[index] = el;
                }}  
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimatedCardSection;