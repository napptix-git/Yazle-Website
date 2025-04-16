
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { BarChart, PieChart, LineChart, AreaChart, Users, Target } from 'lucide-react';
import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AnalyticsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sample data for the chart
  const performanceData = [
    { name: 'Jan', revenue: 4000, users: 2400 },
    { name: 'Feb', revenue: 5000, users: 2800 },
    { name: 'Mar', revenue: 6000, users: 3200 },
    { name: 'Apr', revenue: 8000, users: 3600 },
    { name: 'May', revenue: 9500, users: 4000 },
    { name: 'Jun', revenue: 11000, users: 4400 },
  ];

  const analyticFeatures = [
    {
      title: "Real-Time Dashboards",
      description: "Monitor performance metrics in real-time with customizable dashboards and reports.",
      icon: <BarChart className="h-8 w-8 text-[#29dd3b]" />
    },
    {
      title: "User Segmentation",
      description: "Analyze player behavior based on demographics, gameplay patterns, and spending habits.",
      icon: <Users className="h-8 w-8 text-[#29dd3b]" />
    },
    {
      title: "Revenue Attribution",
      description: "Track the source of your revenue across ad formats and placements for optimization.",
      icon: <PieChart className="h-8 w-8 text-[#29dd3b]" />
    },
    {
      title: "Trend Analysis",
      description: "Identify patterns and predict future performance with AI-powered forecasting.",
      icon: <LineChart className="h-8 w-8 text-[#29dd3b]" />
    },
    {
      title: "Conversion Funnels",
      description: "Map the player journey from impression to conversion to optimize key touchpoints.",
      icon: <Target className="h-8 w-8 text-[#29dd3b]" />
    },
    {
      title: "Competitor Benchmarking",
      description: "Compare your performance against industry standards and similar games.",
      icon: <AreaChart className="h-8 w-8 text-[#29dd3b]" />
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
                Powerful Analytics for Publishers
              </h1>
              <p className="text-napptix-light-grey font-roboto-mono text-xl mb-8">
                Turn data into actionable insights to optimize your game's performance and revenue.
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
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Analytics Dashboard" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Grid */}
      <section className="py-20 bg-napptix-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Analytics Features</h2>
          <p className="text-napptix-light-grey font-roboto-mono text-center mb-16 max-w-2xl mx-auto">
            A comprehensive suite of tools to understand your audience and optimize your revenue
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analyticFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-black p-6 rounded-xl border border-napptix-grey/20 h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-napptix-dark/50 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-napptix-light-grey font-roboto-mono">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Dashboard Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Dashboard Preview</h2>
          <p className="text-napptix-light-grey font-roboto-mono text-center mb-16 max-w-2xl mx-auto">
            Get a glimpse of our intuitive analytics interface
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-2 bg-napptix-dark rounded-xl p-6 border border-napptix-grey/20">
              <h3 className="text-xl font-bold text-white mb-4">Revenue & Engagement Trends</h3>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={performanceData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 0,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                    <XAxis dataKey="name" stroke="#999" />
                    <YAxis stroke="#999" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#222", border: "1px solid #444" }} 
                      itemStyle={{ color: "#fff" }} 
                      labelStyle={{ fontWeight: "bold", color: "#fff" }} 
                    />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#29dd3b" strokeWidth={3} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={3} dot={{ r: 4 }} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-napptix-dark rounded-xl border border-napptix-grey/20">
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">Key Metrics</h3>
                <ul className="space-y-6">
                  <li className="border-b border-napptix-grey/20 pb-4">
                    <p className="text-napptix-light-grey mb-1 text-sm">Daily Active Users</p>
                    <div className="flex justify-between items-end">
                      <p className="text-white font-bold text-2xl">248,392</p>
                      <span className="text-[#29dd3b] text-sm flex items-center">
                        +12.4% <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12 7a1 1 0 01-1-1V5H9a1 1 0 010-2h2a1 1 0 011 1v1h1a1 1 0 110 2h-1zm-6 6a1 1 0 001 1h6a1 1 0 100-2H7a1 1 0 00-1 1z" clipRule="evenodd" /><path fillRule="evenodd" d="M5 5a3 3 0 013-3h4a3 3 0 013 3v9a3 3 0 01-3 3H8a3 3 0 01-3-3V5zm3-1a1 1 0 00-1 1v9a1 1 0 001 1h4a1 1 0 001-1V5a1 1 0 00-1-1H8z" clipRule="evenodd" /></svg>
                      </span>
                    </div>
                  </li>
                  
                  <li className="border-b border-napptix-grey/20 pb-4">
                    <p className="text-napptix-light-grey mb-1 text-sm">Average eCPM</p>
                    <div className="flex justify-between items-end">
                      <p className="text-white font-bold text-2xl">$4.87</p>
                      <span className="text-[#29dd3b] text-sm flex items-center">
                        +8.2% <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12 7a1 1 0 01-1-1V5H9a1 1 0 010-2h2a1 1 0 011 1v1h1a1 1 0 110 2h-1zm-6 6a1 1 0 001 1h6a1 1 0 100-2H7a1 1 0 00-1 1z" clipRule="evenodd" /><path fillRule="evenodd" d="M5 5a3 3 0 013-3h4a3 3 0 013 3v9a3 3 0 01-3 3H8a3 3 0 01-3-3V5zm3-1a1 1 0 00-1 1v9a1 1 0 001 1h4a1 1 0 001-1V5a1 1 0 00-1-1H8z" clipRule="evenodd" /></svg>
                      </span>
                    </div>
                  </li>
                  
                  <li className="border-b border-napptix-grey/20 pb-4">
                    <p className="text-napptix-light-grey mb-1 text-sm">Monthly Revenue</p>
                    <div className="flex justify-between items-end">
                      <p className="text-white font-bold text-2xl">$127,845</p>
                      <span className="text-[#29dd3b] text-sm flex items-center">
                        +18.7% <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12 7a1 1 0 01-1-1V5H9a1 1 0 010-2h2a1 1 0 011 1v1h1a1 1 0 110 2h-1zm-6 6a1 1 0 001 1h6a1 1 0 100-2H7a1 1 0 00-1 1z" clipRule="evenodd" /><path fillRule="evenodd" d="M5 5a3 3 0 013-3h4a3 3 0 013 3v9a3 3 0 01-3 3H8a3 3 0 01-3-3V5zm3-1a1 1 0 00-1 1v9a1 1 0 001 1h4a1 1 0 001-1V5a1 1 0 00-1-1H8z" clipRule="evenodd" /></svg>
                      </span>
                    </div>
                  </li>
                  
                  <li>
                    <p className="text-napptix-light-grey mb-1 text-sm">Ad Engagement Rate</p>
                    <div className="flex justify-between items-end">
                      <p className="text-white font-bold text-2xl">8.6%</p>
                      <span className="text-[#29dd3b] text-sm flex items-center">
                        +4.3% <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12 7a1 1 0 01-1-1V5H9a1 1 0 010-2h2a1 1 0 011 1v1h1a1 1 0 110 2h-1zm-6 6a1 1 0 001 1h6a1 1 0 100-2H7a1 1 0 00-1 1z" clipRule="evenodd" /><path fillRule="evenodd" d="M5 5a3 3 0 013-3h4a3 3 0 013 3v9a3 3 0 01-3 3H8a3 3 0 01-3-3V5zm3-1a1 1 0 00-1 1v9a1 1 0 001 1h4a1 1 0 001-1V5a1 1 0 00-1-1H8z" clipRule="evenodd" /></svg>
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 bg-napptix-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Analytics Benefits</h2>
          <p className="text-napptix-light-grey font-roboto-mono text-center mb-16 max-w-2xl mx-auto">
            Make informed decisions to grow your audience and revenue
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-[#29dd3b] rounded-full p-1 mt-1.5">
                    <div className="w-2 h-2"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Audience Understanding</h3>
                    <p className="text-napptix-light-grey font-roboto-mono">
                      Gain deep insights into player demographics, behaviors, and preferences to tailor your game experience.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="bg-[#29dd3b] rounded-full p-1 mt-1.5">
                    <div className="w-2 h-2"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Revenue Optimization</h3>
                    <p className="text-napptix-light-grey font-roboto-mono">
                      Identify your most valuable ad placements and formats to maximize monetization without disrupting gameplay.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-[#29dd3b] rounded-full p-1 mt-1.5">
                    <div className="w-2 h-2"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Strategic Decision Making</h3>
                    <p className="text-napptix-light-grey font-roboto-mono">
                      Use data-driven insights to guide game development, marketing, and monetization strategies.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="bg-[#29dd3b] rounded-full p-1 mt-1.5">
                    <div className="w-2 h-2"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Retention Improvement</h3>
                    <p className="text-napptix-light-grey font-roboto-mono">
                      Analyze player drop-off points and optimize user experience to keep players engaged longer.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Unlock Your Data's Potential?</h2>
          <p className="text-napptix-light-grey font-roboto-mono mb-8 max-w-xl mx-auto">
            Turn insights into action with Napptix's comprehensive analytics platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#29dd3b] text-black hover:bg-[#29dd3b]/90">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="border-[#29dd3b]/50 text-[#29dd3b] hover:bg-[#29dd3b]/10">
              Request a Demo
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AnalyticsPage;
