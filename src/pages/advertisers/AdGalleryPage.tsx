
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const AdGalleryPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const adExamples = [
    {
      title: "Rewarded Video",
      image: "https://images.unsplash.com/photo-1603575448360-153f093fd0b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Offer virtual rewards for watching full video ads",
      format: "Video"
    },
    {
      title: "Playable Demo",
      image: "https://images.unsplash.com/photo-1585620385456-4759f9b5c7d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Interactive mini-games showcasing key features",
      format: "Interactive"
    },
    {
      title: "Native Integration",
      image: "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Seamless ads that match the game's look and feel",
      format: "Mixed"
    },
    {
      title: "Banner Ads",
      image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Strategic placements in non-intrusive game areas",
      format: "Display"
    },
    {
      title: "In-Game Product Placement",
      image: "https://images.unsplash.com/photo-1603117681202-ddee2b35d07c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Brand integration within the game environment",
      format: "Native"
    },
    {
      title: "Sponsored Content",
      image: "https://images.unsplash.com/photo-1559067515-bf1795e1f659?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Custom game levels or items featuring your brand",
      format: "Custom"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ad Gallery
            </h1>
            <p className="text-napptix-light-grey font-roboto-mono text-xl mb-8">
              Explore our innovative ad formats designed for maximum impact in gaming.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Ad Gallery Grid */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adExamples.map((ad, index) => (
              <motion.div
                key={index}
                className="bg-napptix-dark rounded-xl overflow-hidden border border-napptix-grey/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, boxShadow: '0 8px 30px rgba(41, 221, 59, 0.15)' }}
              >
                <div className="h-48 relative">
                  <img 
                    src={ad.image}
                    alt={ad.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white">{ad.title}</h3>
                    <p className="text-[#29dd3b]">{ad.format}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-napptix-light-grey font-roboto-mono mb-6">{ad.description}</p>
                  
                  <Button 
                    className="w-full bg-[#29dd3b] text-black hover:bg-[#29dd3b]/90"
                  >
                    View Demo
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to launch your campaign?</h2>
          <p className="text-napptix-light-grey font-roboto-mono mb-8">
            Contact our team to discuss which ad formats work best for your goals
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#29dd3b] text-black hover:bg-[#29dd3b]/90">
              Schedule a Demo
            </Button>
            <Button size="lg" variant="outline" className="border-[#29dd3b]/50 text-[#29dd3b] hover:bg-[#29dd3b]/10">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AdGalleryPage;
