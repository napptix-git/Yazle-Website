
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
