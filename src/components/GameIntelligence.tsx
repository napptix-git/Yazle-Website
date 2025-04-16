
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Layers, Activity, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GameIntelligence: React.FC = () => {
  const features = [
    {
      icon: <TrendingUp className="h-8 w-8 text-[#29dd3b]" />,
      title: "Performance Analytics",
      description: "Real-time insights into campaign performance across all gaming platforms."
    },
    {
      icon: <Layers className="h-8 w-8 text-[#29dd3b]" />,
      title: "Audience Segmentation",
      description: "Target specific gaming audiences based on detailed behavioral data."
    },
    {
      icon: <Activity className="h-8 w-8 text-[#29dd3b]" />,
      title: "Engagement Tracking",
      description: "Measure how players interact with your brand across the gaming ecosystem."
    },
    {
      icon: <Globe className="h-8 w-8 text-[#29dd3b]" />,
      title: "Global Reach",
      description: "Access gaming inventory across multiple regions, platforms, and demographics."
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
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Game Intelligence Platform</h2>
          <p className="text-napptix-light-grey font-roboto-mono text-xl max-w-2xl mx-auto">
            Our cutting-edge data platform delivers actionable insights for both advertisers and publishers.
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
                Explore Platform
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
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Game Intelligence Platform" 
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
                  <p className="text-sm text-napptix-light-grey">User Engagement</p>
                  <p className="text-lg font-bold text-white">+47%</p>
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
