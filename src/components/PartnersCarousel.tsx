
import React from 'react';
import { useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';

// Sample client and partner logos - normally these would be imported images
const clientLogos = [
  { id: 1, name: "Levis", logo: "/client_partners_logo/1.png" },
  { id: 2, name: "Publisher X", logo: "/client_partners_logo/2.png" },
  { id: 3, name: "Game Dev Co", logo: "/client_partners_logo/3.png" },
  { id: 4, name: "Interactive Inc", logo: "/client_partners_logo/4.png" },
  { id: 5, name: "Digital Games", logo: "/client_partners_logo/5.png" },
  { id: 6, name: "Pixel Studios", logo: "/client_partners_logo/6.png" },
  { id: 7, name: "Gameverse", logo: "/client_partners_logo/7.png" },
  { id: 8, name: "Virtual Play", logo: "/client_partners_logo/8.png" },
  { id: 9, name: "Pixel Studios", logo: "/client_partners_logo/9.png" },
  { id: 10, name: "Gameverse", logo: "/client_partners_logo/10.png" },
  { id: 11, name: "Virtual Play", logo: "/client_partners_logo/11.png" },
  { id: 12, name: "Virtual Play", logo: "/client_partners_logo/12.png" },
  { id: 13, name: "Virtual Play", logo: "/client_partners_logo/13.png" },
  { id: 14, name: "Virtual Play", logo: "/client_partners_logo/14.png" },
  // { id: 15, name: "Virtual Play", logo: "/client_partners_logo/15.png" },
  // { id: 16, name: "Virtual Play", logo: "/cli_pat_logos/16.png" },
  // { id: 17, name: "Virtual Play", logo: "/cli_pat_logos/17.png" },
  // { id: 18, name: "Virtual Play", logo: "/cli_pat_logos/18.png" },
];

// const partnerLogos = [
//   { id: 1, name: "Tech Partner 1", logo: "TP1" },
//   { id: 2, name: "Ad Network X", logo: "ANX" },
//   { id: 3, name: "Marketing Co", logo: "MC" },
//   { id: 4, name: "Media Group", logo: "MG" },
//   { id: 5, name: "Adtech Solutions", logo: "AS" },
//   { id: 6, name: "Data Analytics", logo: "DA" },
//   { id: 7, name: "Platform Services", logo: "PS" },
//   { id: 8, name: "Global Reach", logo: "GR" },
// ];

// Function to duplicate arrays for continuous carousel
const duplicateForCarousel = (items: any[]) => [...items, ...items];

const PartnersCarousel: React.FC = () => {
  const clients = duplicateForCarousel(clientLogos);
  // const partners = duplicateForCarousel(partnerLogos);

// --- Static Particle Canvas Logic ---
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    // Generate static particles
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      color: ['#8B5CF6', '#F97316', '#0EA5E9'][Math.floor(Math.random() * 3)],
    }));

    // Draw particles (static, not animated)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.7;
      ctx.fill();
    });

    return () => {
      window.removeEventListener('resize', setSize);
    };
  }, []);

  return (
    <section className="py-16 bg-black relative overflow-hidden">

       <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: "transparent" }}
      />

      <div className="container mx-auto mb-10 text-center">
        <h2 className="text-3xl md:text-4xl text-white mb-2 font-disket">OUR CLIENTS & PARTNERS</h2>
        <p className="text-napptix-light-grey max-w-2xl mx-auto font-productSans">
          Trusted by industry leaders in gaming and advertising
        </p>
      </div>
      
      {/* First carousel (clients) - moving left */}
      <div className="relative overflow-hidden py-4 mb-8">
        <div className="flex animate-carousel-left">
          {clients.map((client, index) => (
            <div
              key={`${client.id}-${index}`}
              className="w-40 h-24 flex-shrink-0 flex items-center justify-center mx-4 first:ml-0 last:mr-0"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-16 max-w-[120px] object-contain"
                title={client.name}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Second carousel (partners) - moving right */}
      <div className="relative overflow-hidden py-4">
        <div className="flex animate-carousel-right">
          {clients.map((client, index) => (
            <div 
              key={`${client.id}-${index}`}
              className=" w-40 h-24 flex-shrink-0 flex items-center justify-center last:mr-0 "
            >
              <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-16 max-w-[120px] object-contain"
                  title={client.name}
                />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersCarousel;
