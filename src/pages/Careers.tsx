
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const jobOpenings = [
  {
    title: "Gaming AI Architect",
    department: "Engineering",
    location: "Remote",
    description: "Join us in creating the next generation of AI-powered gaming experiences. You'll work on cutting-edge machine learning models to enhance player engagement.",
  },
  {
    title: "Creative Ad Designer",
    department: "Creative",
    location: "Singapore",
    description: "Transform gaming spaces with stunning interactive advertisements. Looking for someone who can blend artistry with technological innovation.",
  },
  {
    title: "Game Analytics Guru",
    department: "Data Science",
    location: "Remote / Dubai",
    description: "Help gaming companies make data-driven decisions. You'll analyze player behavior and advertising performance across multiple platforms.",
  },
  {
    title: "Mobile Gaming Specialist",
    department: "Product",
    location: "Remote",
    description: "Lead our mobile gaming initiatives and help create seamless advertising experiences for mobile players worldwide.",
  }
];

const Careers: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="container mx-auto pt-32 pb-20 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">Careers at Napptix</h1>
        <p className="text-xl text-gray-300 mb-12">Join us in revolutionizing gaming advertising</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-napptix-dark p-8 rounded-xl border border-napptix-grey/20">
            <h2 className="text-2xl font-bold text-white mb-4">Why Join Us?</h2>
            <ul className="space-y-4 text-gray-300">
              <li>• Innovative technology environment</li>
              <li>• Global impact in gaming industry</li>
              <li>• Competitive compensation</li>
              <li>• Remote-first culture</li>
              <li>• Continuous learning opportunities</li>
              <li>• Health and wellness benefits</li>
              <li>• Regular team retreats</li>
              <li>• Gaming hardware allowance</li>
            </ul>
          </div>
          
          <div className="bg-napptix-dark p-8 rounded-xl border border-napptix-grey/20">
            <h2 className="text-2xl font-bold text-white mb-4">Our Values</h2>
            <ul className="space-y-4 text-gray-300">
              <li>• Innovation First</li>
              <li>• Player-Centric Approach</li>
              <li>• Global Mindset</li>
              <li>• Continuous Learning</li>
              <li>• Work-Life Harmony</li>
              <li>• Diversity & Inclusion</li>
            </ul>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-8">Open Positions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobOpenings.map((job, index) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20 hover:border-[#29dd3b]/50 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{job.title}</h3>
                  <p className="text-[#29dd3b]">{job.department}</p>
                </div>
                <span className="text-gray-400 text-sm">{job.location}</span>
              </div>
              <p className="text-gray-300 mb-4">{job.description}</p>
              <button className="bg-[#29dd3b] text-black px-6 py-2 rounded-full font-bold hover:bg-[#29dd3b]/80 transition-colors">
                Apply Now
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-300">
            Don't see a position that matches your skills? Send your resume to{" "}
            <a href="mailto:careers@napptix.com" className="text-[#29dd3b] hover:underline">
              careers@napptix.com
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Careers;
