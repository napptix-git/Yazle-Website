
import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Puzzle, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <Bot className="h-8 w-8 text-[#29dd3b]" />,
    title: "AI-Powered Game Creation",
    description: "From concept to playable in record time. Wizora uses AI to rapidly generate branded mini-games."
  },
  {
    icon: <Puzzle className="h-8 w-8 text-[#29dd3b]" />,
    title: "Effortless Integration",
    description: "Plug into play—no heavy lifting needed. Wizora embeds seamlessly into popular game engines."
  },
  {
    icon: <Globe className="h-8 w-8 text-[#29dd3b]" />,
    title: "Cross-Platform Reach",
    description: "Built for mobile, desktop, and console alike. Deliver lightweight branded game experiences anywhere."
  }
];

const WizoraSection = () => {
  return (
    <div className="container mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
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
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-napptix-dark rounded-full p-4 flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-napptix-light-grey font-roboto-mono">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/advertisers/wizora">
              <Button className="bg-[#29dd3b] text-black hover:bg-[#29dd3b]/90">
                Learn About Wizora
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div 
          className="relative order-1 md:order-2"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
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
        </motion.div>
      </div>
    </div>
  );
};

export default WizoraSection;
