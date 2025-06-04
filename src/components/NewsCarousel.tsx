
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
];

const NewsCarousel = () => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  
  const renderNewsCard = (item: typeof newsItems[0], index: number) => (
    <div 
      key={`news-item-${item.id}-${index}`}
      className="relative bg-white hover:bg-[#ff6b6b] transition-colors duration-300 p-4 sm:p-6 md:p-8 rounded-xl h-full flex flex-col justify-between min-h-[280px] sm:min-h-[320px]"
    >
      <div>
        <div className="mb-3 sm:mb-4">
          <span className="text-[#4c3bff] text-xs sm:text-sm">{item.date}</span>
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-3 sm:mb-4 font-productSans uppercase leading-tight">{item.title}</h3>
      </div>
      <div className="mt-auto">
        <Link
         to={`/news/${item.id}`}
         className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-[#4c36ff] text-white font-semibold hover:bg-[#372bb3] transition-all duration-200 text-xs sm:text-sm group">
          Read More
          <svg 
            className="ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );

  // Mobile uses the scroll snap layout
  if (isMobile) {
    return (
      <div className="bg-[#4c3bff] py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6 sm:mb-8"
          >
            <h2 className="font-disket text-2xl sm:text-3xl md:text-5xl text-white mb-2">LATEST NEWS</h2>
            <p className="text-white text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8 opacity-90 font-productSans px-2">Stay updated with the latest advancements and announcements from Napptix.</p>
          </motion.div>

          {/* Navigation dots */}
          {/* <div className="text-center mb-4 space-x-2">
            {newsItems.map((_, index) => (
              <a
                key={index}
                href={`#slide-${index + 1}`}
                className="inline-flex w-6 h-6 bg-white/70 text-[#4c3bff] text-xs font-bold rounded-full items-center justify-center hover:bg-white transition-colors duration-200"
              >
                {index + 1}
              </a>
            ))}
          </div> */}

          {/* Slides container */}
          <div className="slides overflow-x-auto flex scroll-snap-type-x-mandatory scroll-smooth">
            {newsItems.map((item, index) => (
              <div
                key={item.id}
                id={`slide-${index + 1}`}
                className="scroll-snap-align-start flex-shrink-0 w-[280px] sm:w-[320px] mr-4 last:mr-0"
              >
                {renderNewsCard(item, index)}
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          .slides {
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
          }
          .slides::-webkit-scrollbar {
            height: 8px;
          }
          .slides::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.5);
            border-radius: 4px;
          }
          .slides::-webkit-scrollbar-track {
            background: transparent;
          }
          .scroll-snap-align-start {
            scroll-snap-align: start;
          }
          .scroll-snap-type-x-mandatory {
            scroll-snap-type: x mandatory;
          }
          .scroll-smooth {
            scroll-behavior: smooth;
          }
        `}</style>
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
