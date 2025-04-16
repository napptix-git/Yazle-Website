
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { BarChart3, Target, Trophy, ShieldCheck } from 'lucide-react';

const WizoraPage: React.FC = () => {
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
                Wizora: Intelligent Ad Placement
              </h1>
              <p className="text-napptix-light-grey font-roboto-mono text-xl mb-8">
                Our proprietary AI-powered ad placement engine that delivers the right ad, at the right time, for maximum engagement.
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
                  src="https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Wizora Platform" 
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
            Wizora's cutting-edge technology drives engagement and conversion
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
                <Target className="h-7 w-7 text-[#29dd3b]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Contextual Targeting</h3>
              <p className="text-napptix-light-grey font-roboto-mono text-sm">
                Analyzes gameplay context in real-time to deliver highly relevant ad content.
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
                <BarChart3 className="h-7 w-7 text-[#29dd3b]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Dynamic Optimization</h3>
              <p className="text-napptix-light-grey font-roboto-mono text-sm">
                Continuously learns and adjusts placement strategy based on performance metrics.
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
                <Trophy className="h-7 w-7 text-[#29dd3b]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Premium Inventory</h3>
              <p className="text-napptix-light-grey font-roboto-mono text-sm">
                Access to high-value ad slots across top-performing games and platforms.
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
                <ShieldCheck className="h-7 w-7 text-[#29dd3b]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Brand Safety</h3>
              <p className="text-napptix-light-grey font-roboto-mono text-sm">
                Advanced content filtering ensures your ads appear in suitable contexts only.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Performance Metrics</h2>
          <p className="text-napptix-light-grey font-roboto-mono text-center mb-16 max-w-2xl mx-auto">
            Wizora consistently outperforms traditional ad placement systems
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-napptix-dark p-8 rounded-xl border border-napptix-grey/20 text-center">
              <p className="text-[#29dd3b] font-bold text-5xl md:text-6xl mb-4">+68%</p>
              <p className="text-white text-xl">Higher Click-Through Rate</p>
            </div>
            
            <div className="bg-napptix-dark p-8 rounded-xl border border-napptix-grey/20 text-center">
              <p className="text-[#29dd3b] font-bold text-5xl md:text-6xl mb-4">+42%</p>
              <p className="text-white text-xl">Increased Conversion</p>
            </div>
            
            <div className="bg-napptix-dark p-8 rounded-xl border border-napptix-grey/20 text-center">
              <p className="text-[#29dd3b] font-bold text-5xl md:text-6xl mb-4">-35%</p>
              <p className="text-white text-xl">Lower Ad Fatigue</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-napptix-dark">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Ad Strategy?</h2>
          <p className="text-napptix-light-grey font-roboto-mono mb-8 max-w-xl mx-auto">
            Join leading brands leveraging Wizora to revolutionize their in-game advertising approach
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#29dd3b] text-black hover:bg-[#29dd3b]/90">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="border-[#29dd3b]/50 text-[#29dd3b] hover:bg-[#29dd3b]/10">
              View Demo
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default WizoraPage;
