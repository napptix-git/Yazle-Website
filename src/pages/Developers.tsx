
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Code, Users, Globe } from 'lucide-react';

const Developers: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                For Game Developers
              </h1>
              <p className="text-napptix-light-grey font-roboto-mono text-xl mb-8">
                Specialized solutions to help you grow your games and maximize revenue.
              </p>
              <Button
                size="lg"
                className="bg-[#29dd3b] hover:bg-[#29dd3b]/90 text-black"
              >
                Get Started
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
                  src="https://images.unsplash.com/photo-1614680376739-414d95ff43df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FtZSUyMGRldmVsb3BlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1200&q=80" 
                  alt="Game Developer" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-20 bg-napptix-dark">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Game Developers Choose Us</h2>
            <p className="text-napptix-light-grey font-roboto-mono max-w-2xl mx-auto">
              Join thousands of successful game developers in our global network
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-black p-6 rounded-xl border border-napptix-grey/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <div className="bg-[#29dd3b]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Code className="text-[#29dd3b] h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Easy Integration</h3>
              <p className="text-napptix-light-grey font-roboto-mono">
                Simple SDKs for all major game engines with minimal code requirements.
              </p>
            </motion.div>
            
            <motion.div
              className="bg-black p-6 rounded-xl border border-napptix-grey/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="bg-[#29dd3b]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Users className="text-[#29dd3b] h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">User Experience</h3>
              <p className="text-napptix-light-grey font-roboto-mono">
                Non-intrusive ad formats designed to maintain player engagement.
              </p>
            </motion.div>
            
            <motion.div
              className="bg-black p-6 rounded-xl border border-napptix-grey/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="bg-[#29dd3b]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Globe className="text-[#29dd3b] h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Global Reach</h3>
              <p className="text-napptix-light-grey font-roboto-mono">
                Access to premium advertisers and campaigns from around the world.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            className="bg-napptix-dark rounded-xl p-8 md:p-12 border border-napptix-grey/20 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-napptix-light-grey font-roboto-mono mb-8">
              Join our developer community and start monetizing your games today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#29dd3b] hover:bg-[#29dd3b]/90 text-black"
              >
                Sign Up Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#29dd3b] text-[#29dd3b] hover:bg-[#29dd3b]/10"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Developers;
