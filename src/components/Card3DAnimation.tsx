
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Card3DAnimation.css';
import { useIsMobile } from '@/hooks/use-mobile';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: 'In-Game',
    content: 'Native ad placements within the gaming environment that feel like a natural part of the experience.',
    icon: '🎮',
  },
  {
    title: 'On-Game',
    content: 'Strategic ad placements around the game interface, loading screens, and menus.',
    icon: '🖥️',
  },
  {
    title: 'Off-Game',
    content: 'Advertising strategies outside the gameplay such as on companion apps, forums, and esports platforms.',
    icon: '📱',
  },
  {
    title: 'Pro Game',
    content: 'Specialized solutions for esports events, tournaments, and professional gaming streams.',
    icon: '🏆',
  },
];

export const Card3DAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear any existing ScrollTrigger instances to avoid conflicts
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    const ctx = gsap.context(() => {
      // First, create the pin for the container
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top+=120 top",
        end: "+=300%", // Make it long enough for the scrolling effect
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: true,
      });
      
      // Calculate offsets based on screen size
      const verticalOffset = isMobile ? -5 : -10;
      const scaleDecrement = isMobile ? 0.03 : 0.05;
      const opacityDecrement = isMobile ? 0.1 : 0.15;
      
      // Set initial position of cards - stacked with slight offset
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        
        gsap.set(card, {
          y: i * verticalOffset, // Slight vertical offset for stacked appearance
          rotateX: isMobile ? 3 : 5, // Slight tilt for 3D effect
          scale: 1 - (i * scaleDecrement), // Slightly decreasing size for depth
          opacity: 1 - (i * opacityDecrement), // Decreasing opacity for cards in back
          transformOrigin: "center bottom",
          zIndex: cards.length - i,
        });
      });
      
      // Create animations for each card
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        
        // Card enters view and comes forward
        gsap.to(card, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${i * 100} top`,
            end: `+=${window.innerHeight * 0.4}`,
            scrub: 0.5,
          },
          y: 0, // Move to center position
          rotateX: 0, // Remove tilt
          scale: 1,
          opacity: 1,
          ease: "power2.out",
        });
        
        // Card exits (if not the last one)
        if (i < cards.length - 1) {
          gsap.to(card, {
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${(i + 1) * 100} top`,
              end: `+=${window.innerHeight * 0.4}`,
              scrub: 0.5,
            },
            y: isMobile ? -150 : -200, // Move up and out
            opacity: 0,
            ease: "power2.in",
          });
        }
      });
      
      // Loop back to beginning when reaching the end
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: `top+=${cards.length * 100} top`,
        onEnter: () => {
          ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.vars.trigger === containerRef.current) {
              gsap.to(window, {
                scrollTo: { y: trigger.start, autoKill: false },
                duration: 0.5,
              });
            }
          });
        },
      });
    }, containerRef);
    
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);
  
  return (
    <section 
      className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      <div className="text-center mb-12 z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Our Services</h2>
        <p className="text-lg text-slate-400 text-center max-w-xl">
          Comprehensive advertising solutions across the gaming ecosystem
        </p>
      </div>
      
      <div
        ref={containerRef}
        className="card-container relative h-[60vh] w-full flex items-center justify-center"
      >
        {cards.map((card, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className="card-item absolute max-w-lg w-full sm:w-[90%] md:w-[80%] aspect-auto md:aspect-[2/3] rounded-3xl overflow-hidden"
          >
            <div className="relative w-full h-full bg-white text-black flex flex-col items-center justify-center p-4 md:p-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-6 text-center">{card.title}</h3>
              <p className="text-base md:text-lg text-center text-gray-700 mb-4 md:mb-8">{card.content}</p>
              <button className="mt-3 md:mt-6 bg-black text-white px-4 md:px-6 py-2 md:py-3 rounded-full hover:bg-black/80 transition-colors text-sm md:text-base">
                Learn more
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Card3DAnimation;
