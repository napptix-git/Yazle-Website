
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Simple reusable floating console box
const FloatingConsole = () => {
  // Randomly animate floating
  const [pos, setPos] = useState({ x: 0, y: 0, rotation: 0 });

  useEffect(() => {
    const move = () => {
      setPos({
        x: Math.random() * (window.innerWidth - 220),
        y: Math.random() * (window.innerHeight - 180),
        rotation: Math.random() * 30 - 15,
      });
    };
    const interval = setInterval(move, 2600);
    move();
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        left: pos.x,
        top: pos.y,
        transform: `rotate(${pos.rotation}deg)`,
      }}
      className="fixed z-30 transition-all duration-1000 ease-in-out bg-black/90 border border-[#4c36ff] rounded-lg px-5 py-4 text-green-300 font-mono shadow-2xl pointer-events-none"
    >
      <span className="block text-xs opacity-70 mb-2 select-none"></span>
      <span className="whitespace-nowrap select-none text-white">Coming Soon</span>
    </div>
  );
};

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colors = ['#8B5CF6', '#F97316', '#0EA5E9'];
  const animationId = useRef<number>();

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);
    // Particle setup
    const particleCount = Math.min(150, Math.floor(canvas.width * canvas.height / 12000));
    let particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.7;
        ctx.fill();
      });
      animationId.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId.current!);
      window.removeEventListener('resize', setSize);
    };
  }, []);

  return (
    <canvas
    
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: " #edebff" }}
    />
  );
};

const WizoraCS = () => {
  const location = useLocation();

    
return (
  <div className="min-h-screen w-full flex flex-col relative overflow-hidden" style={{ background: "transparent" }}>
    <ParticleBackground />
    <FloatingConsole />
    <Navbar linkClassName="text-[#4c36ff] hover:text-[#fff]" />
    <div className="flex-1 flex flex-col items-center justify-center z-10 text-center min-h-screen">
      <img
        src="/lovable-uploads/wizora_w_logo.png"
        alt="wiz"
        className="w-[100px] h-auto md:w-[300px]"
      />
      <p className="text-2xl md:text-xl text-black mb-4 mt-4 font-productSans uppercase">
        Your Playable Ad Wizard
      </p>
      <a
        href="/"
        className="inline-block mt-6 font-bold text-lg py-3 px-8 rounded-full transition-all bg-[#4c36ff] relative"
        style={{ fontWeight: 800, letterSpacing: 1.2 }}
      >
        <span className="relative z-10 text-white font-productSans ">Return to Home</span>
        <span className="absolute shimmer-effect inset-0 pointer-events-none rounded-full"></span>
      </a>
    </div>
    <Footer headingColor='text-black' />
  </div>
);
};

export default WizoraCS;

