
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check, Code, Monitor, Bot, BarChart3, Zap } from 'lucide-react';

const WizoraPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: "AI-Powered Targeting",
      icon: <Bot className="h-8 w-8 text-[#29dd3b]" />,
      description: "Intelligent audience segmentation based on play style and preferences"
    },
    {
      title: "Real-Time Metrics",
      icon: <BarChart3 className="h-8 w-8 text-[#29dd3b]" />,
      description: "Live performance tracking with actionable insights"
    },
    {
      title: "Seamless Integration",
      icon: <Code className="h-8 w-8 text-[#29dd3b]" />,
      description: "Quick implementation across major game engines and platforms"
    },
    {
      title: "Cross-Platform Support",
      icon: <Monitor className="h-8 w-8 text-[#29dd3b]" />,
      description: "Reach gamers across mobile, desktop, and console environments"
    }
  ];

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
                Wizora
              </h1>
              <p className="text-xl text-napptix-light-grey mb-8">
                The intelligent ad placement engine for immersive gaming experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-[#29dd3b] text-black hover:bg-[#29dd3b]/90">
                  Schedule Demo
                </Button>
                <Button size="lg" variant="outline" className="border-[#29dd3b]/50 text-[#29dd3b] hover:bg-[#29dd3b]/10">
                  Learn More
                </Button>
              </div>
            </motion.div>
            
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#29dd3b] to-purple-600 rounded-lg blur opacity-30"></div>
              <div className="relative bg-napptix-dark rounded-lg overflow-hidden border border-napptix-grey/20">
                <img
                  src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Wizora Platform"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Grid */}
      <section className="py-20 bg-napptix-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-black p-6 rounded-xl border border-napptix-grey/20 hover:border-[#29dd3b]/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="bg-napptix-dark/50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-napptix-light-grey font-roboto-mono">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">How Wizora Works</h2>
          <p className="text-center text-napptix-light-grey font-roboto-mono mb-16 max-w-2xl mx-auto">
            Our intelligent platform places your ads for maximum impact
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-transparent via-[#29dd3b] to-transparent"></div>
            
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20 relative z-10">
              <div className="bg-[#29dd3b] w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-xl mb-4">1</div>
              <h3 className="text-xl font-bold text-white mb-3">Analysis</h3>
              <p className="text-napptix-light-grey font-roboto-mono">Our AI analyzes gameplay patterns to identify optimal placement opportunities.</p>
            </div>
            
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20 relative z-10">
              <div className="bg-[#29dd3b] w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-xl mb-4">2</div>
              <h3 className="text-xl font-bold text-white mb-3">Placement</h3>
              <p className="text-napptix-light-grey font-roboto-mono">Intelligent ad placement that integrates naturally with the gaming experience.</p>
            </div>
            
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20 relative z-10">
              <div className="bg-[#29dd3b] w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-xl mb-4">3</div>
              <h3 className="text-xl font-bold text-white mb-3">Optimization</h3>
              <p className="text-napptix-light-grey font-roboto-mono">Continuous performance optimization based on engagement metrics.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-20 bg-napptix-dark">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-black p-10 rounded-xl border border-napptix-grey/20 text-center">
            <div className="mb-8">
              <svg className="w-12 h-12 mx-auto text-[#29dd3b]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <p className="text-xl md:text-2xl text-white mb-6">
              "Wizora helped us achieve a 42% increase in engagement rates while maintaining a seamless player experience. The platform's intelligent targeting has transformed our approach to in-game advertising."
            </p>
            <div>
              <p className="font-bold text-white">Amanda Chen</p>
              <p className="text-napptix-light-grey">Chief Marketing Officer, GameVerse Studios</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Why Choose Wizora</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
              <h3 className="text-xl font-bold text-white mb-4">For Advertisers</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#29dd3b] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-napptix-light-grey">Precision targeting based on player behavior and preferences</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#29dd3b] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-napptix-light-grey">Higher engagement rates compared to traditional digital ads</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#29dd3b] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-napptix-light-grey">Brand-safe environments with content controls</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#29dd3b] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-napptix-light-grey">Detailed analytics on campaign performance</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
              <h3 className="text-xl font-bold text-white mb-4">For Game Developers</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#29dd3b] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-napptix-light-grey">Non-intrusive ad experiences that maintain player satisfaction</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#29dd3b] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-napptix-light-grey">Higher revenue per user compared to standard ad networks</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#29dd3b] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-napptix-light-grey">Simple integration with major game engines</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-[#29dd3b] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-napptix-light-grey">Customizable ad formats that match your game's style</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-napptix-dark">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to transform your gaming ad strategy?</h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#29dd3b] text-black hover:bg-[#29dd3b]/90">
              <Zap className="mr-2 h-5 w-5" /> Get Started
            </Button>
            <Button size="lg" variant="outline" className="border-[#29dd3b]/50 text-[#29dd3b] hover:bg-[#29dd3b]/10">
              Request Demo
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default WizoraPage;
