
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Map, Compass, Route, Radar, BarChart3 } from 'lucide-react';

const QuestMapPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                QuestMap: User Journey Optimization
              </h1>
              <p className="text-napptix-light-grey font-roboto-mono text-xl mb-8">
                Strategic player journey mapping for optimal ad placement throughout the gaming experience.
              </p>
              <Button className="bg-[#29dd3b] text-black hover:bg-[#29dd3b]/90">
                Schedule a Demo
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-napptix-dark rounded-xl p-6 border border-napptix-grey/30"
            >
              <div className="aspect-video relative overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-[#29dd3b]/20 to-transparent z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="QuestMap Platform" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-napptix-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Key Features</h2>
          <p className="text-napptix-light-grey font-roboto-mono text-center mb-16 max-w-2xl mx-auto">
            QuestMap helps you understand and optimize the player journey
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              className="bg-black p-6 rounded-xl border border-napptix-grey/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="bg-napptix-dark/50 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
                <Map className="h-7 w-7 text-[#29dd3b]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Journey Mapping</h3>
              <p className="text-napptix-light-grey font-roboto-mono text-sm">
                Visual representation of player progression through gameplay.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-black p-6 rounded-xl border border-napptix-grey/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-napptix-dark/50 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
                <Route className="h-7 w-7 text-[#29dd3b]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Touchpoint Analysis</h3>
              <p className="text-napptix-light-grey font-roboto-mono text-sm">
                Identify optimal moments for brand integration without disrupting gameplay.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-black p-6 rounded-xl border border-napptix-grey/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-napptix-dark/50 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
                <Compass className="h-7 w-7 text-[#29dd3b]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Behavioral Insights</h3>
              <p className="text-napptix-light-grey font-roboto-mono text-sm">
                Understand player behaviors and preferences to refine targeting.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-black p-6 rounded-xl border border-napptix-grey/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-napptix-dark/50 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
                <Radar className="h-7 w-7 text-[#29dd3b]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Predictive Analytics</h3>
              <p className="text-napptix-light-grey font-roboto-mono text-sm">
                Anticipate player actions to deliver timely and relevant ads.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Use Cases */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Use Cases</h2>
          <p className="text-napptix-light-grey font-roboto-mono text-center mb-16 max-w-2xl mx-auto">
            How leading brands leverage QuestMap for superior results
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-napptix-dark rounded-xl overflow-hidden border border-napptix-grey/20">
              <div className="h-48 relative">
                <img 
                  src="https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Mobile Gaming" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">Mobile Gaming</h3>
              </div>
              <div className="p-6">
                <p className="text-napptix-light-grey font-roboto-mono mb-4">
                  Optimized ad placement during natural game breaks to increase engagement by 47%.
                </p>
                <Button variant="link" className="text-[#29dd3b] p-0 h-auto">Learn More →</Button>
              </div>
            </div>
            
            <div className="bg-napptix-dark rounded-xl overflow-hidden border border-napptix-grey/20">
              <div className="h-48 relative">
                <img 
                  src="https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Esports" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">Esports</h3>
              </div>
              <div className="p-6">
                <p className="text-napptix-light-grey font-roboto-mono mb-4">
                  Strategic brand placement during tournament streams resulting in 3.2x higher recall.
                </p>
                <Button variant="link" className="text-[#29dd3b] p-0 h-auto">Learn More →</Button>
              </div>
            </div>
            
            <div className="bg-napptix-dark rounded-xl overflow-hidden border border-napptix-grey/20">
              <div className="h-48 relative">
                <img 
                  src="https://images.unsplash.com/photo-1603481546579-65d935ba9cdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Console Gaming" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">Console Gaming</h3>
              </div>
              <div className="p-6">
                <p className="text-napptix-light-grey font-roboto-mono mb-4">
                  Seamless product placements within AAA titles delivering 58% higher brand affinity.
                </p>
                <Button variant="link" className="text-[#29dd3b] p-0 h-auto">Learn More →</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-napptix-dark">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Map Your Path to Success</h2>
          <p className="text-napptix-light-grey font-roboto-mono mb-8 max-w-xl mx-auto">
            Discover how QuestMap can optimize your in-game advertising strategy
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#29dd3b] text-black hover:bg-[#29dd3b]/90">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="border-[#29dd3b]/50 text-[#29dd3b] hover:bg-[#29dd3b]/10">
              Request a Demo
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default QuestMapPage;
