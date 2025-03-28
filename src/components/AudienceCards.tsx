
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Gamepad2 } from 'lucide-react';

const AudienceCards: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <section id="audience" className="py-16 bg-gradient-to-b from-napptix-dark to-white">
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Who We Serve</h2>
        <p className="text-napptix-light-grey max-w-2xl mx-auto">
          Tailored solutions for both sides of the gaming advertising ecosystem
        </p>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
          {/* Advertisers Card */}
          <motion.div 
            className={`w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg cursor-pointer relative ${
              activeCard === 'advertisers' 
                ? 'bg-gradient-to-br from-napptix-purple/20 to-napptix-blue/20 border border-napptix-purple/30'
                : 'bg-white border border-gray-200'
            }`}
            whileHover={{ 
              scale: 1.03,
              transition: { duration: 0.3 }
            }}
            onMouseEnter={() => setActiveCard('advertisers')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="p-8 md:p-10">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-napptix-purple/10 flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-napptix-purple" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">For Advertisers</h3>
              <p className="text-gray-600 mb-6">
                Reach millions of engaged gamers through innovative in-game, on-game, and off-game advertising solutions.
              </p>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Highly targeted gaming audience segments</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Non-intrusive ad formats with high engagement</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Advanced analytics and campaign optimization</span>
                </li>
              </ul>
              <button className="bg-napptix-purple hover:bg-napptix-purple/90 text-white px-6 py-2 rounded-full transition-all">
                Learn More
              </button>
            </div>
            
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-napptix-purple transition-all duration-500 ${
              activeCard === 'advertisers' ? 'opacity-100' : 'opacity-0'
            }`}></div>
          </motion.div>
          
          {/* Publishers Card */}
          <motion.div 
            className={`w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg cursor-pointer relative ${
              activeCard === 'publishers' 
                ? 'bg-gradient-to-br from-napptix-orange/20 to-napptix-blue/20 border border-napptix-orange/30'
                : 'bg-white border border-gray-200'
            }`}
            whileHover={{ 
              scale: 1.03,
              transition: { duration: 0.3 }
            }}
            onMouseEnter={() => setActiveCard('publishers')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="p-8 md:p-10">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-napptix-orange/10 flex items-center justify-center">
                  <Gamepad2 className="h-8 w-8 text-napptix-orange" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">For Publishers</h3>
              <p className="text-gray-600 mb-6">
                Maximize your game's revenue potential with seamless advertising integration that respects the player experience.
              </p>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Multiple monetization models tailored to your game</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Easy SDK implementation with minimal development</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-green-100 p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Transparent reporting and industry-leading payouts</span>
                </li>
              </ul>
              <button className="bg-napptix-orange hover:bg-napptix-orange/90 text-white px-6 py-2 rounded-full transition-all">
                Learn More
              </button>
            </div>
            
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-napptix-orange transition-all duration-500 ${
              activeCard === 'publishers' ? 'opacity-100' : 'opacity-0'
            }`}></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AudienceCards;
