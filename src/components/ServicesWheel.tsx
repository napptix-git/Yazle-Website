
import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { 
  Gamepad, 
  MonitorPlay, 
  Globe, 
  Trophy,
} from 'lucide-react';

interface ServiceProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const serviceData: ServiceProps[] = [
  {
    title: "In-Game",
    description: "Native ad placements within the gaming environment that feel like a natural part of the experience.",
    icon: <Gamepad className="h-10 w-10" />,
    color: "bg-napptix-purple",
  },
  {
    title: "On-Game",
    description: "Strategic ad placements around the game interface, loading screens, and menus.",
    icon: <MonitorPlay className="h-10 w-10" />,
    color: "bg-napptix-orange",
  },
  {
    title: "Off-Game",
    description: "Extend your reach beyond gameplay through our network of gaming content platforms.",
    icon: <Globe className="h-10 w-10" />,
    color: "bg-napptix-blue",
  },
  {
    title: "Pro Game",
    description: "Specialized solutions for esports events, tournaments, and professional gaming streams.",
    icon: <Trophy className="h-10 w-10" />,
    color: "bg-green-500",
  },
];

const ServiceCard: React.FC<ServiceProps & { isActive: boolean; index: number; onClick: () => void }> = ({ 
  title, 
  description, 
  icon, 
  color,
  isActive,
  index,
  onClick
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  
  return (
    <div 
      ref={ref}
      className={`service-card ${isActive ? 'active' : ''} cursor-pointer`}
      onClick={onClick}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? `translateY(0) scale(${isActive ? 1.05 : 1})` : `translateY(50px) scale(1)`,
        transition: `all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${index * 0.1}s`
      }}
    >
      <div className={`${color} w-16 h-16 rounded-full flex items-center justify-center text-white mb-4 mx-auto`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-napptix-light-grey">{description}</p>
    </div>
  );
};

const ServicesWheel: React.FC = () => {
  const [activeService, setActiveService] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !wheelRef.current) return;
      
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      const sectionHeight = sectionRect.height;
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll position relative to the section
      const scrollPosition = (viewportHeight - sectionTop) / (sectionHeight + viewportHeight);
      
      // Calculate which service should be active based on scroll position
      if (scrollPosition > 0 && scrollPosition < 1) {
        const serviceIndex = Math.min(
          Math.floor(scrollPosition * serviceData.length),
          serviceData.length - 1
        );
        setActiveService(serviceIndex);
        
        // Apply rotation to the wheel based on the active service
        const rotationDegree = (serviceIndex * (360 / serviceData.length));
        wheelRef.current.style.transform = `rotate(${rotationDegree}deg)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleServiceClick = (index: number) => {
    setActiveService(index);
  };
  
  return (
    <section id="solutions" ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-napptix-dark">Our Services</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Comprehensive advertising solutions across the gaming ecosystem
        </p>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Services wheel visualization */}
          <div className="relative flex justify-center items-center">
            <div className="w-64 h-64 rounded-full border-4 border-dashed border-napptix-grey/30 animate-spin-slow"></div>
            
            <div 
              ref={wheelRef}
              className="absolute inset-0 transition-transform duration-1000 ease-in-out"
            >
              {serviceData.map((_, index) => {
                const angle = (index * (360 / serviceData.length));
                const radian = (angle * Math.PI) / 180;
                const radius = 120;
                
                const x = radius * Math.cos(radian);
                const y = radius * Math.sin(radian);
                
                return (
                  <div 
                    key={index}
                    className={`absolute w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activeService === index ? serviceData[index].color + ' scale-125' : 'bg-napptix-grey'
                    }`}
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                      top: 'calc(50% - 20px)',
                      left: 'calc(50% - 20px)',
                    }}
                    onClick={() => handleServiceClick(index)}
                  >
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                );
              })}
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-napptix-dark flex items-center justify-center">
                <span className="text-white font-bold">Napptix</span>
              </div>
            </div>
          </div>
          
          {/* Services details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {serviceData.map((service, index) => (
              <ServiceCard 
                key={index}
                {...service}
                index={index}
                isActive={activeService === index}
                onClick={() => handleServiceClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesWheel;
