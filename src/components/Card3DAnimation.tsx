
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Card3DAnimation.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: 'Gaming Monetization',
    content: 'Unlock new revenue streams with our specialized gaming ad products.',
    icon: '🎮',
    image: '/lovable-uploads/8354ca7f-1dcf-4c35-bc7d-7fb04f9c9254.png',
  },
  {
    title: 'Audience Targeting',
    content: 'Reach your ideal gaming demographics with precision targeting.',
    icon: '🖥️',
    image: '/lovable-uploads/6e100c42-279f-4ff0-8321-04d4fcd5505d.png',
  },
  {
    title: 'Performance Analytics',
    content: 'Track campaign performance with our advanced analytics suite.',
    icon: '📊',
    image: '/lovable-uploads/7e606c44-61cb-46c1-9563-29b2a6d7b82e.png',
  },
  {
    title: 'Creative Solutions',
    content: 'Stand out with innovative ad formats designed specifically for gamers.',
    icon: '🏆',
    image: '/lovable-uploads/9d37880a-6199-4554-aaa7-8ec093ad6bb8.png',
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
      // Set initial position of cards
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        
        gsap.set(card, {
          z: -100 * (cards.length - i),
          opacity: i === 0 ? 0.7 : 0.5 - (i * 0.1),
          rotateY: -30,
          scale: 0.9 - (i * 0.05),
          transformPerspective: 1000,
          transformOrigin: "center center"
        });
      });
      
      // Create ScrollTrigger for the container to pin it during animation
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%", 
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });
      
      // Create animations for each card
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        
        gsap.to(card, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top top+=${i * 150}`,
            end: `+=${window.innerHeight * 0.5}`,
            scrub: true,
          },
          z: 0,
          opacity: 1,
          rotateY: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          onComplete: () => {
            // Optional: Add a class to indicate the card is active
            card?.classList.add('active');
          }
        });
        
        // If not the last card, animate it out when the next card comes in
        if (i < cards.length - 1) {
          gsap.to(card, {
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top top+=${(i + 1) * 150}`,
              end: `+=${window.innerHeight * 0.5}`,
              scrub: true,
            },
            z: 100,
            opacity: 0,
            rotateY: 30,
            x: i % 2 === 0 ? -300 : 300, // Alternate left and right exit
            scale: 0.8,
            duration: 1.2,
            ease: "power3.in",
          });
        }
      });
    }, containerRef);

    return () => {
      ctx.revert(); // Clean up GSAP animations
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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
        className="card-container relative h-[110vh] w-full flex items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className="card-item absolute w-80 h-96 shadow-3d rounded-2xl overflow-hidden"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative w-full h-full bg-white text-black flex flex-col">
              {card.image ? (
                <div className="w-full h-full relative">
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6">
                    <div className="text-4xl mb-4">{card.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-center text-white">{card.title}</h3>
                    <p className="text-sm text-center text-gray-300">{card.content}</p>
                    <button className="mt-6 bg-[#29dd3b] text-black px-4 py-2 rounded-full hover:bg-[#29dd3b]/80 transition-colors">
                      Learn more
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 h-full">
                  <div className="text-4xl mb-4">{card.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-center">{card.title}</h3>
                  <p className="text-sm text-center text-gray-600">{card.content}</p>
                  <button className="mt-6 bg-black text-white px-4 py-2 rounded-full hover:bg-black/80 transition-colors">
                    Learn more
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Card3DAnimation;
