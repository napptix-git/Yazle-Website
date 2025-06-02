import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import HyperText from '@/components/ui/hyper-text';

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

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

  const initParticles = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    particles.current = [];
    const particleCount = Math.min(400, Math.floor(canvas.width * canvas.height / 3000));
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

  useEffect(() => {
    if (!canvasRef.current || !mounted) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const force = 0.2;
          const angle = Math.atan2(dy, dx);
          particle.vx += Math.cos(angle) * force;
          particle.vy += Math.sin(angle) * force;
        }

        particle.vx *= 0.95;
        particle.vy *= 0.95;

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
  }, [mousePosition, mounted]);

  const getParallaxStyle = () => {
    if (!mounted) return {};
    return {
      transform: `translate(${(mousePosition.x - window.innerWidth / 2) / 50}px, ${(mousePosition.y - window.innerHeight / 2) / 50}px)`,
      transition: "transform 0.1s ease-out"
    };
  };

  return (
    <div className="relative flex min-h-[85vh] w-full items-center justify-center ">
      {/* Particle Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-none"
      />
      {/* Main Content */}
      <div className="relative z-10 flex w-full h-full items-center justify-center top-20">
        <div className="flex flex-col items-center justify-center w-full">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 text-center"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={getParallaxStyle()}
          >
            Reach Every <span className="text-[#29dd3b]">Gamer</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col items-center mb-6"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-disket">
              360 GAMING
            </h2>
            <div className="inline-block bg-[#4c36ff]/30 px-6 py-4 rounded">
              <div className="flex flex-col items-center text-center">
                <HyperText
                  text="EVERY PLATFORM."
                  className="text-white text-lg md:text-xl font-bold font-retropix mb-1"
                  duration={2000}
                  animateOnLoad={true}
                  framerProps={{
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 },
                  }}
                />
                <HyperText
                  text="EVERY PLAYER."
                  className="text-white text-lg md:text-xl font-bold font-retropix"
                  duration={2000}
                  animateOnLoad={true}
                  framerProps={{
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 },
                  }}
                />
              </div>
            </div>
          </motion.div>

          <motion.p 
            className="text-lg md:text-2xl text-napptix-light-grey max-w-2xl md:max-w-3xl mx-auto mb-10 font-productSans font-normal text-center"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.13 }}
          >
           {/* Gaming 360: Where brands meet gamers. */}
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
