
import React, { useState } from 'react';
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
  
  const renderNewsCard = (item: typeof newsItems[0], index: number) => (
    <div 
      key={`news-item-${item.id}-${index}`}
      className="bg-white hover:bg-[#ff6b6b] transition-colors duration-300 p-8 rounded-xl h-full"
    >
      <div className="mb-4">
        <span className="text-[#29dd3b] text-sm">{item.date}</span>
      </div>
      <h3 className="text-2xl font-bold text-black mb-4">{item.title}</h3>
      <p className="text-gray-700 mb-4">{item.content}</p>
      <Link to={`/news/${item.id}`} className="text-[#29dd3b] hover:underline">
        Read More →
      </Link>
    </div>
  );

  // Mobile uses the scrolling layout
  if (isMobile) {
    return (
      <div className="bg-[#4c3bff] py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">LATEST NEWS</h2>
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
                  className="min-w-[300px] md:min-w-[400px] mx-4 flex-shrink-0"
                >
                  {renderNewsCard(item, index)}
                </div>
              ))}
              
              {/* Add copies of the same items for the continuous effect */}
              {newsItems.map((item, index) => (
                <div 
                  key={`duplicate-${item.id}-${index}`}
                  className="min-w-[300px] md:min-w-[400px] mx-4 flex-shrink-0"
                >
                  {renderNewsCard(item, index)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop uses the Carousel component
  return (
    <div className="bg-[#4c3bff] py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">LATEST NEWS</h2>
        </motion.div>

        <Carousel 
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {newsItems.map((item) => (
              <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3 pl-6">
                {renderNewsCard(item, 0)}
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8">
            <CarouselPrevious className="relative static translate-y-0 mx-2 bg-white text-black hover:bg-white/80" />
            <CarouselNext className="relative static translate-y-0 mx-2 bg-white text-black hover:bg-white/80" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default NewsCarousel;
