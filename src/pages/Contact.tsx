
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { MapPin } from 'lucide-react';
import gsap from 'gsap';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const cities = [
    { 
      name: "Mumbai", 
      address: "Level 42, World Trade Center, Cuffe Parade, Mumbai 400005",
      position: { x: '30%', y: '45%' },
      tag: "Asia"
    },
    { 
      name: "Dubai", 
      address: "Emirates Towers, Sheikh Zayed Road, Dubai, UAE",
      position: { x: '23%', y: '43%' },
      tag: "Middle East"
    },
    { 
      name: "Singapore", 
      address: "One Raffles Place, Tower 2, Singapore 048616",
      position: { x: '50%', y: '55%' },
      tag: "South East"
    },
    { 
      name: "Delhi", 
      address: "Cyber Hub, DLF Cyber City, Gurugram, Delhi NCR 122002",
      position: { x: '36%', y: '38%' },
      tag: "Asia"
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
      setSubmitting(false);
    }, 1500);
  };

  // Initialize map animations
  useEffect(() => {
    if (!mapRef.current) return;

    // Create dots animation
    const dots = document.querySelectorAll('.map-dot');
    dots.forEach((dot) => {
      gsap.to(dot, {
        opacity: 0.6,
        scale: 1.3,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    // Create lines animation
    const lines = document.querySelectorAll('.connection-line');
    lines.forEach((line) => {
      gsap.fromTo(
        line, 
        { strokeDashoffset: 1000 },
        { 
          strokeDashoffset: 0, 
          duration: 3,
          repeat: -1,
          ease: "none"
        }
      );
    });

    // Create marker pulsing effect
    const markers = document.querySelectorAll('.location-marker');
    markers.forEach((marker) => {
      gsap.to(marker, {
        scale: 1.2,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => {
      // Clean up animations
      gsap.killTweensOf(dots);
      gsap.killTweensOf(lines);
      gsap.killTweensOf(markers);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black font-manrope">
      <Navbar />
      
      <div className="container mx-auto pt-24 pb-20 px-4">
        <h1 className="text-4xl md:text-5xl font-syne font-extrabold text-white mb-8 text-center">Get In Touch</h1>
        
        <div className="mb-16 w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">Global Presence</h2>
          
          <div 
            ref={mapRef} 
            className="relative w-full h-[500px] bg-black rounded-xl overflow-hidden"
          >
            <img 
              src="/lovable-uploads/c5496b5e-971e-4d17-930f-937cb0026419.png" 
              alt="Napptix Global Map" 
              className="w-full h-full object-contain opacity-90"
            />
            
            {/* Map dots for visual effect */}
            <div className="absolute inset-0">
              {Array.from({ length: 100 }).map((_, i) => (
                <div 
                  key={i}
                  className="map-dot absolute w-1 h-1 bg-white rounded-full opacity-30"
                  style={{ 
                    left: `${Math.random() * 100}%`, 
                    top: `${Math.random() * 100}%` 
                  }}
                ></div>
              ))}
            </div>
            
            {/* City markers */}
            {cities.map((city, index) => (
              <div 
                key={index} 
                className="absolute"
                style={{ 
                  left: city.position.x, 
                  top: city.position.y
                }}
              >
                <div className="relative">
                  <MapPin 
                    className="location-marker text-[#29dd3b] w-6 h-6 -translate-x-1/2 -translate-y-1/2" 
                  />
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="text-white font-bold text-sm bg-black/70 px-2 py-1 rounded">
                      {city.name}
                    </span>
                  </div>
                  
                  {/* Tag label */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                    <span className="text-xs px-2 py-0.5 bg-[#29dd3b]/20 text-[#29dd3b] rounded-full">
                      {city.tag}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Connection lines between cities */}
            <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
              <line 
                x1="30%" y1="45%" x2="23%" y2="43%"
                className="connection-line" 
                stroke="#29dd3b" 
                strokeWidth="1" 
                strokeDasharray="5,5" 
                opacity="0.6"
              />
              <line 
                x1="23%" y1="43%" x2="36%" y2="38%"
                className="connection-line" 
                stroke="#29dd3b" 
                strokeWidth="1" 
                strokeDasharray="5,5" 
                opacity="0.6"
              />
              <line 
                x1="36%" y1="38%" x2="50%" y2="55%"
                className="connection-line" 
                stroke="#29dd3b" 
                strokeWidth="1" 
                strokeDasharray="5,5" 
                opacity="0.6"
              />
              <line 
                x1="50%" y1="55%" x2="30%" y2="45%"
                className="connection-line" 
                stroke="#29dd3b" 
                strokeWidth="1" 
                strokeDasharray="5,5" 
                opacity="0.6"
              />
            </svg>
          </div>
          
          {/* City addresses */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {cities.map((city, index) => (
              <div key={index} className="bg-napptix-dark p-5 rounded-lg border border-napptix-grey/20">
                <div className="flex items-center mb-2">
                  <MapPin className="text-[#29dd3b] mr-2 w-5 h-5" />
                  <h3 className="text-white font-bold text-lg">{city.name}</h3>
                </div>
                <span className="block text-napptix-light-grey text-sm">{city.address}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-napptix-light-grey space-y-6 max-w-2xl mx-auto text-lg">
          <p className="text-center">
            Have questions about our advertising solutions? Interested in partnering with us?
            Fill out the form below and our team will get back to you shortly.
          </p>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-white mb-2 text-lg">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-napptix-dark border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div className="flex flex-col">
                <label htmlFor="email" className="text-white mb-2 text-lg">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-napptix-dark border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                  placeholder="Your email"
                  required
                />
              </div>
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="company" className="text-white mb-2 text-lg">Company</label>
              <input
                type="text"
                id="company"
                value={formData.company}
                onChange={handleChange}
                className="bg-napptix-dark border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                placeholder="Your company"
              />
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="message" className="text-white mb-2 text-lg">Message</label>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="bg-napptix-dark border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                placeholder="Your message"
                required
              ></textarea>
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={submitting}
                className="bg-napptix-purple hover:bg-napptix-purple/80 text-white font-bold py-3 px-8 rounded-full transition-all disabled:opacity-70 disabled:cursor-not-allowed text-lg"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
          
          <div className="mt-12 bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Other Ways to Reach Us</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center">
                <p className="font-bold text-white text-lg">Email</p>
                <p className="text-lg">info@napptix.com</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-white text-lg">Phone</p>
                <p className="text-lg">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
