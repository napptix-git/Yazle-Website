
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Card3DAnimation.css';

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
        id: "card3d-main-pin", // Add unique ID to avoid conflicts
      });
      
      // Set initial position of cards - stacked with slight offset
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        
        gsap.set(card, {
          y: i * -10, // Slight vertical offset for stacked appearance
          rotateX: 5, // Slight tilt for 3D effect
          scale: 1 - (i * 0.05), // Slightly decreasing size for depth
          opacity: 1 - (i * 0.15), // Decreasing opacity for cards in back
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
            id: `card3d-card-enter-${i}`, // Add unique ID to avoid conflicts
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
              id: `card3d-card-exit-${i}`, // Add unique ID to avoid conflicts
            },
            y: -200, // Move up and out
            opacity: 0,
            ease: "power2.in",
          });
        }
      });
    }, containerRef);
    
    // Cleanup function
    return () => {
      ctx.revert();
      ScrollTrigger.getAll()
        .filter(trigger => trigger.vars.id?.toString().startsWith('card3d-'))
        .forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section 
      className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      <div className="text-center mb-12 z-10">
        <h2 className="text-4xl font-bold mb-2">Our Services</h2>
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
            className="card-item absolute max-w-lg w-full aspect-[2/3] rounded-3xl overflow-hidden"
          >
            <div className="relative w-full h-full bg-white text-black flex flex-col items-center justify-center p-8">
              <h3 className="text-3xl font-bold mb-6 text-center">{card.title}</h3>
              <p className="text-lg text-center text-gray-700 mb-8">{card.content}</p>
              <button className="mt-6 bg-black text-white px-6 py-3 rounded-full hover:bg-black/80 transition-colors">
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
