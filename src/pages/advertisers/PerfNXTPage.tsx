
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { BarChart3, LineChart, PieChart, TrendingUp, Zap } from 'lucide-react';

const PerfNXTPage: React.FC = () => {
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
                PerfNXT: Advanced Analytics Platform
              </h1>
              <p className="text-napptix-light-grey font-roboto-mono text-xl mb-8">
                Comprehensive performance tracking and optimization for in-game advertising campaigns.
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
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="PerfNXT Dashboard" 
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
            PerfNXT delivers actionable insights for campaign optimization
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
                <BarChart3 className="h-7 w-7 text-[#29dd3b]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Real-Time Analytics</h3>
              <p className="text-napptix-light-grey font-roboto-mono text-sm">
                Monitor campaign performance as it happens with second-by-second data.
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
                <LineChart className="h-7 w-7 text-[#29dd3b]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Predictive Modeling</h3>
              <p className="text-napptix-light-grey font-roboto-mono text-sm">
                AI-powered forecasting to anticipate campaign performance and optimize in advance.
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
                <PieChart className="h-7 w-7 text-[#29dd3b]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Audience Insights</h3>
              <p className="text-napptix-light-grey font-roboto-mono text-sm">
                Deep demographic and behavioral analysis of your engaged audience.
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
                <TrendingUp className="h-7 w-7 text-[#29dd3b]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">ROI Optimization</h3>
              <p className="text-napptix-light-grey font-roboto-mono text-sm">
                Algorithms that automatically adjust campaign parameters for maximum return.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Dashboard Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Dashboard Preview</h2>
          <p className="text-napptix-light-grey font-roboto-mono text-center mb-16 max-w-2xl mx-auto">
            A glimpse into the intuitive and powerful PerfNXT interface
          </p>
          
          <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
            <div className="aspect-[16/9] relative overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="PerfNXT Dashboard" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-[#29dd3b] text-black rounded-full px-3 py-1 text-sm font-bold flex items-center">
                <Zap className="h-4 w-4 mr-1" />
                Live Demo
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-black p-4 rounded-lg">
                <p className="text-napptix-light-grey mb-1 text-sm">Campaign Performance</p>
                <p className="text-white font-bold text-lg">87% Above Target</p>
              </div>
              <div className="bg-black p-4 rounded-lg">
                <p className="text-napptix-light-grey mb-1 text-sm">Audience Engagement</p>
                <p className="text-white font-bold text-lg">12.3M Interactions</p>
              </div>
              <div className="bg-black p-4 rounded-lg">
                <p className="text-napptix-light-grey mb-1 text-sm">Cost Efficiency</p>
                <p className="text-white font-bold text-lg">$0.14 Cost per Action</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-napptix-dark">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Supercharge Your Campaign Analytics</h2>
          <p className="text-napptix-light-grey font-roboto-mono mb-8 max-w-xl mx-auto">
            Get unparalleled insights with PerfNXT advanced analytics platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#29dd3b] text-black hover:bg-[#29dd3b]/90">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="border-[#29dd3b]/50 text-[#29dd3b] hover:bg-[#29dd3b]/10">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default PerfNXTPage;
