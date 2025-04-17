
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Layers, Activity, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GameIntelligence: React.FC = () => {
  const features = [
    {
      icon: <TrendingUp className="h-8 w-8 text-[#29dd3b]" />,
      title: "Rich Media Ads",
      description: "Interactive, high-impact ad formats that drive higher engagement and CTRs."
    },
    {
      icon: <Layers className="h-8 w-8 text-[#29dd3b]" />,
      title: "Multi-platform",
      description: "Seamlessly deliver your ads across mobile, web, and in-game environments."
    },
    {
      icon: <Activity className="h-8 w-8 text-[#29dd3b]" />,
      title: "Real-time Analytics",
      description: "Monitor campaign performance with detailed metrics and insights."
    },
    {
      icon: <Globe className="h-8 w-8 text-[#29dd3b]" />,
      title: "Global Reach",
      description: "Connect with gaming audiences in over 190 countries worldwide."
    }
  ];

  return (
    <div className="bg-black py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Wizora Ad Platform</h2>
          <p className="text-napptix-light-grey font-roboto-mono text-xl max-w-2xl mx-auto">
            Our powerful rich media ad technology for delivering captivating, interactive experiences to gaming audiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-1 gap-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start gap-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="bg-napptix-dark rounded-full p-4 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-napptix-light-grey font-roboto-mono">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button className="mt-6 bg-[#29dd3b] text-black hover:bg-[#29dd3b]/90">
                Learn About Wizora
              </Button>
            </motion.div>
          </div>

          <motion.div 
            className="relative order-1 md:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-xl overflow-hidden border border-napptix-grey/20">
              <div className="aspect-4/3 relative">
                <img 
                  src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Wizora Ad Platform" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-napptix-dark p-4 rounded-xl border border-napptix-grey/20 shadow-lg hidden md:block">
              <div className="flex items-center gap-3">
                <div className="bg-[#29dd3b]/20 rounded-full p-2">
                  <TrendingUp className="h-5 w-5 text-[#29dd3b]" />
                </div>
                <div>
                  <p className="text-sm text-napptix-light-grey">Engagement Rate</p>
                  <p className="text-lg font-bold text-white">+63%</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GameIntelligence;
