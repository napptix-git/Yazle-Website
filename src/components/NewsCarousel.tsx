
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
    title: "Break the Bottleneck in Interactive Ad Creation"
  },
  {
    id: "news-2",
    date: "April 20, 2025",
    title: "From Small Towns to Big Impact: How Tier 2 and Tier 3 India Are Powering the Next Gaming Boom"
  },
  {
    id: "news-3",
    date: "April 15, 2025",
    title: "Interactive by Design: Why the Future of Advertising Is Built for Play"
  },
  {
    id: "news-4",
    date: "April 10, 2025",
    title: "Beyond the Arena: How Brands Can Win Across the Competitive Gaming Ecosystem"
  },
  // {
  //   id: "news-5",
  //   date: "April 5, 2025",
  //   title: "Industry Award Recognition"
  // }
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
        <span className="text-[#4c3bff] text-sm">{item.date}</span>
      </div>
      <h3 className="text-2xl font-bold text-black mb-4 font-productSans uppercase">{item.title}</h3>
      <Link
       to={`/news/${item.id}`}
       className="inline-block px-[12px] py-[6px] rounded-full bg-[#4c3bff] text-white font-semibold hover:bg-[#372bb3] transition-colors duration-200 text-sm ">
        Read More
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
            className="text-center mb-4"
          >
            <h2 className=" font-disket text-3xl md:text-5xl text-white mb-2">LATEST NEWS</h2>
            <p className="text-white text-lg mb-8 opacity-90 font-productSans">Stay updated with the latest advancements and announcements from Napptix.</p>
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
          className="text-center mb-4"
        >
          <h2 className="text-3xl md:text-5xl font-disket text-white mb-2">LATEST NEWS</h2>
          <p className="text-white font-productSans text-lg mb-8 opacity-90">Stay updated with the latest advancements and announcements from Napptix.</p>
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
            <CarouselPrevious className=" static translate-y-0 mx-2 bg-white text-black hover:bg-white/80" />
            <CarouselNext className=" static translate-y-0 mx-2 bg-white text-black hover:bg-white/80" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default NewsCarousel;
