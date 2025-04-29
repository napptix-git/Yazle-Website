import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useIsMobile } from '@/hooks/use-mobile'; // 👈 IMPORTANT

const newsItems = [
  {
    date: "April 28, 2025",
    title: "Napptix Acquires Yezel Technologies 🚀",
    content: "In a groundbreaking move, Napptix has acquired Yezel Technologies, combining our innovative ad platform with Yezel's cutting-edge AI capabilities. This strategic merger promises to transform the gaming advertising landscape.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1470&fit=crop"
  },
  {
    date: "April 20, 2025",
    title: "Expanding Our Global Presence 🌎",
    content: "We're excited to announce the opening of our new offices in Singapore and Dubai, strengthening our presence in key gaming markets across Asia and the Middle East.",
    image: "https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?q=80&w=1471&fit=crop"
  },
  {
    date: "April 15, 2025",
    title: "Partnership with Major Game Studios 🎯",
    content: "Napptix has secured partnerships with five major game studios, expanding our reach to over 100 million active players worldwide.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1470&fit=crop"
  },
  {
    date: "April 10, 2025",
    title: "Revolutionary AI Technology Integration 🤖",
    content: "Our new AI-powered targeting system has shown a 300% improvement in ad engagement rates across all gaming platforms.",
    image: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=1470&fit=crop"
  },
  {
    date: "April 5, 2025",
    title: "Industry Award Recognition 🏆",
    content: "Napptix has been recognized as the 'Most Innovative Ad Tech Company' at the Global Gaming Awards 2025.",
    image: "https://images.unsplash.com/photo-1643101452019-bc00c9bba76b?q=80&w=1498&fit=crop"
  }
];

const duplicatedNews = [...newsItems, ...newsItems];

const News: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile(); // 👈 call the hook here

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="container mx-auto pt-32 pb-20 px-4">
        <h1 className="text-4xl md:text-6xl font-syne font-bold text-white mb-16 text-center">
          Latest News
        </h1>

        {/* 👉 CONDITIONAL RENDERING BASED ON SCREEN SIZE */}
        {isMobile ? (
          <div className="grid grid-cols-1 gap-8">
            {newsItems.map((item, index) => (
              <article key={index} className="bg-[#121212] p-8 rounded-xl border border-napptix-grey/20 hover:border-[#29dd3b] transition-colors duration-300">
                {item.image && (
                  <div className="mb-6 overflow-hidden rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="mb-4">
                  <span className="text-[#29dd3b] text-sm font-syne">{item.date}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4 font-syne">{item.title}</h2>
                <p className="text-gray-300 mb-4 font-grandview text-base leading-relaxed">{item.content}</p>
                <button className="text-[#29dd3b] hover:underline font-syne flex items-center">
                  Read More 
                  <span className="ml-2">→</span>
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="relative overflow-hidden py-8 mb-16">
            <div 
              className="relative overflow-hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className={`flex ${!isHovered ? 'animate-carousel-left' : ''} transition-all duration-900`}>
                {duplicatedNews.map((item, index) => (
                  <div 
                    key={index}
                    className="min-w-[400px] mx-4 flex-shrink-0"
                  >
                    <div className="bg-[#121212] p-8 rounded-xl border border-napptix-grey/20 min-h-[420px] hover:border-[#29dd3b] transition-colors duration-300 h-[600px] w-[400px]">
                      {item.image && (
                        <div className="mb-6 overflow-hidden rounded-lg">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="mb-4">
                        <span className="text-[#29dd3b] text-sm font-syne">{item.date}</span>
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-4 font-syne">{item.title}</h2>
                      <p className="text-gray-300 mb-6 font-grandview text-base leading-relaxed">{item.content}</p>
                      <button className="text-[#29dd3b] hover:underline font-syne flex items-center">
                        Read More 
                        <span className="ml-2">→</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default News;
