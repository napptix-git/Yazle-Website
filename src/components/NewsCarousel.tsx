
import React from 'react';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from 'react-router-dom';

const newsItems = [
  {
    date: "April 24, 2025",
    title: "Napptix Launches New Interactive Ad Platform",
    content: "Today marks a significant milestone in gaming advertising as we launch our revolutionary interactive ad platform."
  },
  {
    date: "April 20, 2025",
    title: "Expanding Our Global Presence",
    content: "We're excited to announce the opening of our new offices in Singapore and Dubai, strengthening our presence."
  },
  {
    date: "April 15, 2025",
    title: "Partnership with Major Game Studios",
    content: "Napptix has secured partnerships with five major game studios, expanding our reach to over 100 million players."
  },
  {
    date: "April 10, 2025",
    title: "Revolutionary AI Technology Integration",
    content: "Our new AI-powered targeting system has shown a 300% improvement in ad engagement rates across platforms."
  },
  {
    date: "April 5, 2025",
    title: "Industry Award Recognition",
    content: "Napptix has been recognized as the 'Most Innovative Ad Tech Company' at the Global Gaming Awards 2025."
  }
];

const NewsCarousel = () => {
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

      <Carousel className="w-full max-w-5xl mx-auto">
        <CarouselContent>
          {newsItems.map((item, index) => (
            <CarouselItem key={index} className="basis-full">
              <div className="bg-napptix-dark p-8 rounded-xl border border-napptix-grey/20">
                <div className="mb-4">
                  <span className="text-[#29dd3b] text-sm">{item.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-300 mb-4">{item.content}</p>
                <Link to="/news" className="text-[#29dd3b] hover:underline">Read More →</Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-16" />
        <CarouselNext className="-right-16" />
      </Carousel>
    </div>
  );
};

export default NewsCarousel;
