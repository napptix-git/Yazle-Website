
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useIsMobile } from '@/hooks/use-mobile';

const newsItems = [
  {
    id: "news-1",
    date: "April 24, 2025",
    title: "Napptix Launches New Interactive Ad Platform",
    content: "Today marks a significant milestone in gaming advertising as we launch our revolutionary interactive ad platform."
  },
  {
    id: "news-2",
    date: "April 20, 2025",
    title: "Expanding Our Global Presence",
    content: "We're excited to announce the opening of our new offices in Singapore and Dubai, strengthening our presence."
  },
  {
    id: "news-3",
    date: "April 15, 2025",
    title: "Partnership with Major Game Studios",
    content: "Napptix has secured partnerships with five major game studios, expanding our reach to over 100 million players."
  },
  {
    id: "news-4",
    date: "April 10, 2025",
    title: "Revolutionary AI Technology Integration",
    content: "Our new AI-powered targeting system has shown a 300% improvement in ad engagement rates across platforms."
  },
  {
    id: "news-5",
    date: "April 5, 2025",
    title: "Industry Award Recognition",
    content: "Napptix has been recognized as the 'Most Innovative Ad Tech Company' at the Global Gaming Awards 2025."
  }
];

const NewsCarousel = () => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth > 768 && window.innerWidth < 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderNewsCard = (item: typeof newsItems[0], index: number) => (
    <div 
      key={`news-item-${item.id}-${index}`}
      className="bg-napptix-dark p-8 rounded-xl border border-napptix-grey/20 h-full"
    >
      <div className="mb-4">
        <span className="text-[#29dd3b] text-sm">{item.date}</span>
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
      <p className="text-gray-300 mb-4">{item.content}</p>
      <Link to={`/news/${item.id}`} className="text-[#29dd3b] hover:underline">
        Read More →
      </Link>
    </div>
  );

  // Mobile and medium screens use the old scrolling layout
  if (isMobile || isMediumScreen) {
    return (
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Latest News</h2>
          <p className="text-napptix-light-grey font-roboto-mono text-xl max-w-2xl mx-auto">
            Stay updated with our latest announcements and achievements
          </p>
        </motion.div>

        <div 
          className="relative overflow-hidden py-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={`flex ${!isHovered ? 'animate-carousel-left' : ''} transition-all duration-300`}>
            {/* Render each news item once */}
            {newsItems.map((item, index) => (
              <div 
                key={`original-${item.id}-${index}`}
                className="min-w-[600px] mx-4 flex-shrink-0"
              >
                {renderNewsCard(item, index)}
              </div>
            ))}
            
            {/* Add copies of the same items for the continuous effect */}
            {newsItems.map((item, index) => (
              <div 
                key={`duplicate-${item.id}-${index}`}
                className="min-w-[600px] mx-4 flex-shrink-0"
              >
                {renderNewsCard(item, index)}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Large screens use the Carousel component
  return (
    <div className="container mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Latest News</h2>
        <p className="text-napptix-light-grey font-roboto-mono text-xl max-w-2xl mx-auto">
          Stay updated with our latest announcements and achievements
        </p>
      </motion.div>

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
              <div className="h-full bg-napptix-dark p-8 rounded-xl border border-napptix-grey/20 hover:border-[#29dd3b] transition-colors duration-300">
                <div className="mb-4">
                  <span className="text-[#29dd3b] text-sm">{item.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-300 mb-4">{item.content}</p>
                <Link to={`/news/${item.id}`} className="text-[#29dd3b] hover:underline">
                  Read More →
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-8">
          <CarouselPrevious className="relative static translate-y-0 mx-2" />
          <CarouselNext className="relative static translate-y-0 mx-2" />
        </div>
      </Carousel>
    </div>
  );
};

export default NewsCarousel;
