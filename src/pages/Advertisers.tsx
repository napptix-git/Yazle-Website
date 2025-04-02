
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CountUpMetric from '@/components/CountUpMetric';

const Advertisers: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="container mx-auto pt-32 pb-20 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Advertisers</h1>
        <div className="text-napptix-light-grey font-roboto-mono space-y-6">
          <p>
            Napptix helps brands connect with the global gaming audience through effective and engaging
            advertising solutions. Our platform provides unique opportunities to reach gamers in a way
            that feels authentic and enhances their experience.
          </p>
          
          {/* Metrics Section with Animated CountUp */}
          <h2 className="text-3xl font-bold text-white mt-16 mb-10">Our Reach & Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <CountUpMetric 
              end={250} 
              duration={2000} 
              suffix="M+" 
              title="Monthly Active Users" 
              description="Unique gamers across our network each month"
            />
            <CountUpMetric 
              end={180} 
              duration={2000} 
              prefix="$" 
              suffix="M" 
              title="Ad Revenue Generated" 
              description="Total revenue for our advertising partners in 2023"
            />
            <CountUpMetric 
              end={94} 
              duration={2000} 
              suffix="%" 
              title="Brand Recall" 
              description="Average brand recall rate for ads on our platform"
            />
            <CountUpMetric 
              end={5200} 
              duration={2000} 
              suffix="+" 
              title="Active Campaigns" 
              description="Concurrent advertising campaigns running globally"
            />
          </div>
          
          <h2 className="text-3xl font-bold text-white mt-12 mb-6">Why Choose Napptix?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
              <h3 className="text-xl font-bold text-white mb-4">Targeted Reach</h3>
              <p>Connect with specific gaming demographics based on genres, platforms, and player behavior.</p>
            </div>
            
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
              <h3 className="text-xl font-bold text-white mb-4">Non-intrusive Formats</h3>
              <p>Advertisements that complement rather than interrupt the gaming experience.</p>
            </div>
            
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
              <h3 className="text-xl font-bold text-white mb-4">Analytics & Insights</h3>
              <p>Comprehensive data on campaign performance and audience engagement.</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Advertisers;
