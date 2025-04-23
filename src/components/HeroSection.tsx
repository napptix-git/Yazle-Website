import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

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
    <div className="relative flex min-h-[85vh] w-full items-center justify-center">
      {/* Particle Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-none"
      />
      {/* Main Content */}
      <div className="relative z-10 flex w-full h-full items-center justify-center">
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
          <motion.p 
            className="text-lg md:text-2xl text-napptix-light-grey max-w-2xl md:max-w-3xl mx-auto mb-10 font-roboto-mono font-normal text-center"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.13 }}
          >
            Innovative advertising solutions connecting brands with the gaming world
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22 }}
            className="flex justify-center"
          >
            <Link to="/advertisers/wizora">
              <button
                className="px-8 py-3 rounded-full font-bold text-white text-lg"
                style={{
                  background: "#8B5CF6",
                  fontFamily: 'Roboto Mono, monospace',
                  letterSpacing: '0.01em',
                  boxShadow: "0 2px 16px 0 rgba(139,92,246,0.16)"
                }}
              >
                Discover Our Solutions
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
