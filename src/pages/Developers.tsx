

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Code, Users, Globe } from 'lucide-react';
import StaticParticleCanvas from '@/components/StaticParticle';

const Developers: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <StaticParticleCanvas />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-disket">
                For Game Developers
              </h1>
              <p className="text-napptix-light-grey font-grandview-display text-xl mb-8 font-productSans">
                Add branded fun without breaking your game loop.
                Wizora makes monetization feel like part of the experience.
              </p>
              <Button
                size="lg"
                className="bg-[#29dd3b] hover:bg-[#29dd3b]/90 text-black font-grandview-display"
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-disket">Why Game Developers Choose Us</h2>
            <p className="text-napptix-light-grey font-grandview-display max-w-2xl mx-auto font-productSans">
              Build smarter. Monetize faster. Join a global network of devs redefining ad play.
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
              <h3 className="text-2xl font-bold text-white mb-4 font-disket">Fast & Flexible Integration
              </h3>
              <p className="text-napptix-light-grey font-productSans">
                Drop-in SDKs for major engines with minimal coding required—so you can go live without slowing down.
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
              <h3 className="text-2xl font-bold text-white mb-4 font-disket">Player-First Ad Design </h3>
              <p className="text-napptix-light-grey font-productSans">
                Playable formats that blend with your gameplay—not interrupt it—so you keep players happy and immersed.
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
              <h3 className="text-2xl font-bold text-white mb-4 font-disket">Monetize at Global Scale</h3>
              <p className="text-napptix-light-grey font-productSans">
                Tap into worldwide campaigns and premium brands seeking next-gen ad experiences inside games like yours.
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-disket">Ready to Get Started?</h2>
            <p className="text-napptix-light-grey font-grandview-display mb-8 font-productSans">
              Join our developer community and start monetizing your games today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <Button
                size="lg"
                className="bg-[#29dd3b] hover:bg-[#29dd3b]/90 text-black"
              >
                Sign Up Now
              </Button> */}
              <Button
                size="lg"
                variant="outline"
                className="border-[#29dd3b] text-[#29dd3b] hover:bg-[#29dd3b]/50"
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
