
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Publishers: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="container mx-auto pt-32 pb-20 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Publishers</h1>
        <div className="text-napptix-light-grey font-roboto-mono space-y-6">
          <p>
            Napptix empowers game developers and publishers to monetize their games while maintaining
            player satisfaction. Our advertising solutions are designed to integrate seamlessly with
            your games, providing a new revenue stream without compromising user experience.
          </p>
          
          <h2 className="text-3xl font-bold text-white mt-12 mb-6">Benefits for Publishers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
              <h3 className="text-xl font-bold text-white mb-4">Additional Revenue</h3>
              <p>Generate income while maintaining focus on creating great games and experiences.</p>
            </div>
            
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
              <h3 className="text-xl font-bold text-white mb-4">Simple Integration</h3>
              <p>Easy-to-implement SDK that works across multiple platforms and game engines.</p>
            </div>
            
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
              <h3 className="text-xl font-bold text-white mb-4">Player Satisfaction</h3>
              <p>Non-intrusive ad formats that players actually enjoy, maintaining engagement.</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Publishers;
