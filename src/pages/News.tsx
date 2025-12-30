
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useIsMobile } from '@/hooks/use-mobile';
import StaticParticleCanvas from '@/components/StaticParticle';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const newsItems = [
  {
    id: "news-1",
    date: "April 28, 2025",
    title: "Break the Bottleneck in Interactive Ad Creation",
    content: "Traditional interactive ad production requires third-party vendors, coordination with developers, and strict templates that stifle creativity. Every tweak - whether it is changing an asset for a regional holiday or adjusting reward mechanics - can trigger a new round of tickets and approvals. Those delays cost time, budget, and often miss shifting market moments.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1470&fit=crop"
  },
  {
    id: "news-2",
    date: "June 19, 2025",
    title: "Yazle is acquired by Napptix to revolutionize gaming advertising!",
    content: "Napptix, the Dubai-based Gaming 360° ad-tech company, has acquired Yazle Marketing Management’s MENA business, including its client portfolio, commercial operations, and regional team across the Gulf and North Africa.",
    image: "/lovable-uploads/nappYez.png"
  },
  {
    id: "news-3",
    date: "April 15, 2025",
    title: "Interactive by Design: Why the Future of Advertising Is Built for Play ",
    content: "At Napptix, we believe the future of brand engagement isn’t just about showing up in games. It’s about showing up in ways that feel native to gameplay, interactive, rewarding and story driven. This is the era of playable marketing.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1470&fit=crop"
  },
  {
    id: "news-4",
    date: "April 10, 2025",
    title: "Beyond the Arena: How Brands Can Win Across the Competitive Gaming Ecosystem",
    content: "The rise of esports has changed global entertainment over the last decade. What began as small LAN gatherings now fills stadiums, features celebrity players and draws millions of live viewers. For brands, esports goes far beyond jerseys and logo placement. It’s a vibrant world where fans play, stream, shop and share - and where brands can join the fun at every turn.",
    image: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=1470&fit=crop"
  },
  // {
  //   id: "news-5",
  //   date: "April 5, 2025",
  //   title: "Ready to Play? ",
  //   content: "Playable ads are no longer an exclusive club for high-budget studios. With Wizora, every marketer gains the power to create immersive, measurable, game-like experiences that cut through the noise and drive real results.",
  //   image: "https://images.unsplash.com/photo-1643101452019-bc00c9bba76b?q=80&w=1498&fit=crop"
  // }
];

const News: React.FC = () => {
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Render card for both grid and carousel views
  const renderNewsCard = (item: typeof newsItems[0], index: number) => (
    <article 
      key={item.id} 
      className="bg-[#121212] p-8 rounded-xl border border-napptix-grey/20 hover:border-[#29dd3b] transition-colors duration-300 h-full"
      onMouseEnter={() => setHoveredCardIndex(index)}
      onMouseLeave={() => setHoveredCardIndex(null)}
    >
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
      <h2 className="text-2xl font-bold text-white mb-4 font-disket">{item.title}</h2>
      <p className="text-gray-300 mb-4 font-productSans text-base leading-relaxed">{item.content}</p>
      <Link 
        to={`/news/${item.id}`}
        className="text-[#29dd3b] hover:underline font-syne flex items-center"
      >
        Read More 
        <span className="ml-2">→</span>
      </Link>
    </article>
  );

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <StaticParticleCanvas />
      <div className="container mx-auto pt-32 pb-20 px-4">
        <h1 className="text-4xl md:text-6xl font-disket text-white mb-16 text-center">
          Latest News
        </h1>
        
        {/* Mobile view with regular grid */}
        {isMobile ? (
          <div className="grid grid-cols-1 gap-8">
            {newsItems.map((item, index) => renderNewsCard(item, index))}
          </div>
        ) : (
          /* Medium and large screens use carousel */
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {newsItems.map((item, index) => (
                  <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3 pl-6">
                    {renderNewsCard(item, index)}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-8">
                <CarouselPrevious className=" static translate-y-0 mx-2" />
                <CarouselNext className=" static translate-y-0 mx-2" />
              </div>
            </Carousel>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default News;
