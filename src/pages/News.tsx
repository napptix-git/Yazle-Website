
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const newsItems = [
  {
    date: "April 24, 2025",
    title: "Napptix Launches New Interactive Ad Platform",
    content: "Today marks a significant milestone in gaming advertising as we launch our revolutionary interactive ad platform, designed to transform how brands connect with gamers."
  },
  {
    date: "April 20, 2025",
    title: "Expanding Our Global Presence",
    content: "We're excited to announce the opening of our new offices in Singapore and Dubai, strengthening our presence in key gaming markets across Asia and the Middle East."
  },
  {
    date: "April 15, 2025",
    title: "Partnership with Major Game Studios",
    content: "Napptix has secured partnerships with five major game studios, expanding our reach to over 100 million active players worldwide."
  },
  {
    date: "April 10, 2025",
    title: "Revolutionary AI Technology Integration",
    content: "Our new AI-powered targeting system has shown a 300% improvement in ad engagement rates across all gaming platforms."
  },
  {
    date: "April 5, 2025",
    title: "Industry Award Recognition",
    content: "Napptix has been recognized as the 'Most Innovative Ad Tech Company' at the Global Gaming Awards 2025."
  }
];

const duplicatedNews = [...newsItems, ...newsItems];

const News: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="container mx-auto pt-32 pb-20 px-4">
        <h1 className="text-4xl md:text-6xl font-syne font-bold text-white mb-16 text-center">Latest News</h1>
        
        <div className="relative overflow-hidden py-8 mb-16">
          <div 
            className="relative overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className={`flex ${!isHovered ? 'animate-carousel-left' : ''} transition-all duration-500`}>
              {duplicatedNews.map((item, index) => (
                <div 
                  key={index}
                  className="min-w-[400px] mx-4 flex-shrink-0"
                >
                  <div className="bg-[#121212] p-8 rounded-xl border border-napptix-grey/20 min-h-[320px] hover:border-[#29dd3b] transition-colors duration-300">
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

        <div className="grid grid-cols-1 gap-8">
          {newsItems.map((item, index) => (
            <article key={index} className="bg-[#121212] p-8 rounded-xl border border-napptix-grey/20 hover:border-[#29dd3b] transition-colors duration-300">
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
      </div>
      <Footer />
    </div>
  );
};

export default News;
