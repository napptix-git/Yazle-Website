
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Coins, BarChart, AreaChart, LineChart, DollarSign } from 'lucide-react';

const MonetizationPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const monetizationFeatures = [
    {
      title: "Flexible Ad Formats",
      description: "Choose from a wide range of non-intrusive ad formats that seamlessly integrate with your game's UI and UX.",
      icon: <AreaChart className="h-8 w-8 text-[#29dd3b]" />
    },
    {
      title: "Dynamic Floor Pricing",
      description: "AI-powered pricing algorithm that adjusts your floor prices in real-time to maximize revenue.",
      icon: <LineChart className="h-8 w-8 text-[#29dd3b]" />
    },
    {
      title: "Premium Demand",
      description: "Access to premium advertisers and brands looking to reach engaged gaming audiences.",
      icon: <DollarSign className="h-8 w-8 text-[#29dd3b]" />
    },
    {
      title: "Custom Revenue Streams",
      description: "Create unique monetization opportunities tailored to your specific game and audience.",
      icon: <Coins className="h-8 w-8 text-[#29dd3b]" />
    }
  ];

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
                Maximize Your Revenue Potential
              </h1>
              <p className="text-napptix-light-grey font-roboto-mono text-xl mb-8">
                Industry-leading monetization solutions designed specifically for gaming publishers.
              </p>
              <Button className="bg-[#29dd3b] text-black hover:bg-[#29dd3b]/90">
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
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Publisher Monetization" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-napptix-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">Why Publishers Choose Napptix</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-[#29dd3b] font-bold text-5xl md:text-6xl mb-4">+86%</p>
              <p className="text-white text-xl">Average Revenue Increase</p>
              <p className="text-napptix-light-grey font-roboto-mono mt-2">Compared to traditional ad networks</p>
            </div>
            
            <div className="text-center">
              <p className="text-[#29dd3b] font-bold text-5xl md:text-6xl mb-4">2.4x</p>
              <p className="text-white text-xl">Higher eCPM Rates</p>
              <p className="text-napptix-light-grey font-roboto-mono mt-2">Access to premium demand partners</p>
            </div>
            
            <div className="text-center">
              <p className="text-[#29dd3b] font-bold text-5xl md:text-6xl mb-4">97%</p>
              <p className="text-white text-xl">Player Retention</p>
              <p className="text-napptix-light-grey font-roboto-mono mt-2">With our non-intrusive ad formats</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Monetization Features</h2>
          <p className="text-napptix-light-grey font-roboto-mono text-center mb-16 max-w-2xl mx-auto">
            Comprehensive tools and features to optimize your revenue streams
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {monetizationFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-napptix-dark p-8 rounded-xl border border-napptix-grey/20 flex items-start gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-black rounded-full p-4">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-napptix-light-grey font-roboto-mono">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Ad Formats */}
      <section className="py-20 bg-napptix-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Ad Format Showcase</h2>
          <p className="text-napptix-light-grey font-roboto-mono text-center mb-16 max-w-2xl mx-auto">
            Diverse monetization options that respect player experience
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black rounded-xl overflow-hidden border border-napptix-grey/20">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1619346689386-a3488bba914b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Native In-Game Ads" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">Native In-Game Ads</h3>
                <p className="text-napptix-light-grey font-roboto-mono mb-4">
                  Seamlessly integrated advertising that feels like a natural part of the gameplay environment.
                </p>
                <ul className="space-y-2 text-napptix-light-grey font-roboto-mono text-sm">
                  <li className="flex items-center">
                    <span className="mr-2 text-[#29dd3b]">✓</span>
                    Highest player retention rate
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#29dd3b]">✓</span>
                    Premium eCPM rates
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#29dd3b]">✓</span>
                    Custom creative options
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-black rounded-xl overflow-hidden border border-napptix-grey/20">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1607337061686-5eed9941ba3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Rewarded Video" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">Rewarded Video</h3>
                <p className="text-napptix-light-grey font-roboto-mono mb-4">
                  Opt-in video ads that offer players in-game rewards for watching advertisements.
                </p>
                <ul className="space-y-2 text-napptix-light-grey font-roboto-mono text-sm">
                  <li className="flex items-center">
                    <span className="mr-2 text-[#29dd3b]">✓</span>
                    High engagement rates
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#29dd3b]">✓</span>
                    Player-initiated experience
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#29dd3b]">✓</span>
                    Balanced monetization solution
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-black rounded-xl overflow-hidden border border-napptix-grey/20">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1618336753974-aae8e04506aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Interactive Ads" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">Interactive Ads</h3>
                <p className="text-napptix-light-grey font-roboto-mono mb-4">
                  Engaging playable ad experiences that showcase advertised products in a hands-on format.
                </p>
                <ul className="space-y-2 text-napptix-light-grey font-roboto-mono text-sm">
                  <li className="flex items-center">
                    <span className="mr-2 text-[#29dd3b]">✓</span>
                    Highest conversion rates
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#29dd3b]">✓</span>
                    Extended engagement time
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-[#29dd3b]">✓</span>
                    Premium advertiser demand
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Publisher Success Stories</h2>
          <p className="text-napptix-light-grey font-roboto-mono text-center mb-16 max-w-2xl mx-auto">
            Hear from game developers who've transformed their revenue strategy
          </p>
          
          <div className="bg-napptix-dark p-8 rounded-xl border border-napptix-grey/20">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3">
                <div className="aspect-video rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1570303345338-e1f0eddf4946?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Studio XYZ" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <p className="text-xl text-napptix-light-grey font-roboto-mono italic mb-6">
                  "Implementing Napptix's monetization solution increased our revenue by 157% within the first three months, all while maintaining our player retention rates. Their team worked closely with us to find the perfect balance between ads and gameplay."
                </p>
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                      alt="Alex Chen" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-white font-bold">Alex Chen</p>
                    <p className="text-napptix-light-grey">Chief Revenue Officer, GameVerse Studios</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-napptix-dark">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Boost Your Revenue?</h2>
          <p className="text-napptix-light-grey font-roboto-mono mb-8 max-w-xl mx-auto">
            Join thousands of publishers who've optimized their monetization strategy with Napptix
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#29dd3b] text-black hover:bg-[#29dd3b]/90">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="border-[#29dd3b]/50 text-[#29dd3b] hover:bg-[#29dd3b]/10">
              Talk to an Expert
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default MonetizationPage;
