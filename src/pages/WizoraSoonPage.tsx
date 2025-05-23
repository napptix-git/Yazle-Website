
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const WizoraSoonPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#edebff]">
      <Navbar linkClassName="text-[#4c36ff] hover:text-[#29dd3b]" />
      
      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <h1 className="text-6xl md:text-8xl font-bold text-[#4c36ff]">
              Wizora
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="inline-block bg-[#4c36ff] px-6 py-2 rounded-full">
              <p className="text-white text-xl md:text-2xl font-bold">
                Coming Soon
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer className='bg-white' headingColor='text-black' />
    </div>
  );
};

export default WizoraSoonPage;
