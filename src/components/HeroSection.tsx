
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
}

const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>(0);
  const colors = ['#8B5CF6', '#F97316', '#0EA5E9'];

  // Initialize particles
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Recreate particles for the new canvas size
      initParticles();
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);
  
  // Create particles
  const initParticles = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    particles.current = [];
    
    const particleCount = Math.min(100, Math.floor(canvas.width * canvas.height / 10000));
    
    for (let i = 0; i < particleCount; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }
  };
  
  // Animation loop
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update particles
      particles.current.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Boundary checking
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Mouse interaction - gentle attraction
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Only affect particles within a radius of 150px from mouse
        if (dist < 150) {
          const force = 0.2;
          const angle = Math.atan2(dy, dx);
          particle.vx += Math.cos(angle) * force;
          particle.vy += Math.sin(angle) * force;
        }
        
        // Apply some drag to limit speed
        particle.vx *= 0.95;
        particle.vy *= 0.95;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = 0.7;
        ctx.fill();
      });
      
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [mousePosition]);
  
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
      />
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 hero-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            transform: `translate(${(mousePosition.x - window.innerWidth / 2) / 50}px, ${(mousePosition.y - window.innerHeight / 2) / 50}px)`,
          }}
        >
          Reach Every <span className="text-gradient">Gamer</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-napptix-light-grey max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Innovative advertising solutions connecting brands with the gaming world
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a 
            href="#solutions" 
            className="bg-napptix-purple hover:bg-napptix-purple/80 text-white font-bold py-3 px-8 rounded-full inline-block transition-all"
          >
            Discover Our Solutions
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
