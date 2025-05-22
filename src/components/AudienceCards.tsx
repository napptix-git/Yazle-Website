import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Gamepad2 } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const AudienceCards: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <section id="audience" className="py-24 bg-black">
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white font-disket">Who We Serve</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Tailored solutions for both sides of the gaming advertising ecosystem
        </p>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
          {/* Advertisers Card */}
          <motion.div 
            className={`w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg cursor-pointer relative ${
              activeCard === 'advertisers' 
                ? 'bg-[#4c36ff] border border-[#29dd3b]/30 shadow-[0_0_30px_rgba(41,221,59,0.15)]'
                : 'bg-white border border-white/10'
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
                <div className={` ${activeCard === 'advertisers' ? 'bg-[#29dd3b]/10' : 'bg-black/10'} flex items-center justify-center`}>
                
                </div>
              </div>
              <h3 className={`text-3xl font-disket mb-4 text-center ${activeCard === 'advertisers' ? 'text-white' : 'text-black'}`}>ADVERTISERS</h3>
              <p className={`mb-6 font-productSans ${activeCard === 'advertisers' ? 'text-white/80' : 'text-gray-600'}`}>
                Reach millions of gamers with targeted, high-impact ads across in-game, on-game, and off-game channels.Leverage non-intrusive formats, deep analytics, and smart optimization to boost engagement.
              </p>
              {/* <ul className="text-left space-y-3 mb-8">
                <li className="flex items-start">
                  <div className={`rounded-full ${activeCard === 'advertisers' ? 'bg-[#29dd3b]/20' : 'bg-black/10'} p-1 mr-3 mt-1`}>
                    <svg className={`h-3 w-3 ${activeCard === 'advertisers' ? 'text-[#29dd3b]' : 'text-black'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className={`${activeCard === 'advertisers' ? 'text-white/80' : 'text-gray-600'}`}>Highly targeted gaming audience segments</span>
                </li>
                <li className="flex items-start">
                  <div className={`rounded-full ${activeCard === 'advertisers' ? 'bg-[#29dd3b]/20' : 'bg-black/10'} p-1 mr-3 mt-1`}>
                    <svg className={`h-3 w-3 ${activeCard === 'advertisers' ? 'text-[#29dd3b]' : 'text-black'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className={`${activeCard === 'advertisers' ? 'text-white/80' : 'text-gray-600'}`}>Non-intrusive ad formats with high engagement</span>
                </li>
                <li className="flex items-start">
                  <div className={`rounded-full ${activeCard === 'advertisers' ? 'bg-[#29dd3b]/20' : 'bg-black/10'} p-1 mr-3 mt-1`}>
                    <svg className={`h-3 w-3 ${activeCard === 'advertisers' ? 'text-[#29dd3b]' : 'text-black'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className={`${activeCard === 'advertisers' ? 'text-white/80' : 'text-gray-600'}`}>Advanced analytics and campaign optimization</span>
                </li>
              </ul> */}
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/advertisers">
                  <Button 
                    className={`${activeCard === 'advertisers' ? 'bg-[#edebff]  text-black hover:bg-[#d6d3fa]' : 'bg-black hover:bg-black/90 text-white'} px-3 py-2 rounded-full transition-all`}
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
          
          {/* Developers Card */}
          <motion.div 
            className={`w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg cursor-pointer relative ${
              activeCard === 'developers' 
                ? 'bg-[#4c36ff] border border-[#29dd3b]/30 shadow-[0_0_30px_rgba(41,221,59,0.15)]'
                : 'bg-white border border-white/10'
            }`}
            whileHover={{ 
              scale: 1.03,
              transition: { duration: 0.3 }
            }}
            onMouseEnter={() => setActiveCard('developers')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="p-8 md:p-10">
              <div className="mb-4 flex justify-center">
                <div className={` ${activeCard === 'developers' ? 'bg-[#29dd3b]/10' : 'bg-black/10'} flex items-center justify-center`}>
                 
                </div>
              </div>
              <h3 className={`text-3xl mb-4 text-center font-disket ${activeCard === 'developers' ? 'text-white' : 'text-black'}`}>DEVELOPERS</h3>
              <p className={`mb-6 font-productSans ${activeCard === 'developers' ? 'text-white/80' : 'text-gray-600'}`}>
               Boost game revenue with seamless, player-friendly ad integration and top-tier payouts. Choose from flexible monetization models, easy SDK setup, and clear performance insights.
              </p>
              {/* <ul className="text-left space-y-3 mb-8">
                <li className="flex items-start">
                  <div className={`rounded-full ${activeCard === 'developers' ? 'bg-[#29dd3b]/20' : 'bg-black/10'} p-1 mr-3 mt-1`}>
                    <svg className={`h-3 w-3 ${activeCard === 'developers' ? 'text-[#29dd3b]' : 'text-black'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className={`${activeCard === 'developers' ? 'text-white/80' : 'text-gray-600'}`}>Multiple monetization models tailored to your game</span>
                </li>
                <li className="flex items-start">
                  <div className={`rounded-full ${activeCard === 'developers' ? 'bg-[#29dd3b]/20' : 'bg-black/10'} p-1 mr-3 mt-1`}>
                    <svg className={`h-3 w-3 ${activeCard === 'developers' ? 'text-[#29dd3b]' : 'text-black'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className={`${activeCard === 'developers' ? 'text-white/80' : 'text-gray-600'}`}>Easy SDK implementation with minimal development</span>
                </li>
                <li className="flex items-start">
                  <div className={`rounded-full ${activeCard === 'developers' ? 'bg-[#29dd3b]/20' : 'bg-black/10'} p-1 mr-3 mt-1`}>
                    <svg className={`h-3 w-3 ${activeCard === 'developers' ? 'text-[#29dd3b]' : 'text-black'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className={`${activeCard === 'developers' ? 'text-white/80' : 'text-gray-600'}`}>Transparent reporting and industry-leading payouts</span>
                </li>
              </ul> */}
              <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/developers">
                <Button 
                  className={`${activeCard === 'developers' ? 'bg-[#edebff] text-black hover:bg-[#d6d3fa]' : 'bg-black hover:bg-black/90 text-white'} px-4 py-2 rounded-full transition-all `}
                >
                  Learn More
                </Button>
              </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AudienceCards;
