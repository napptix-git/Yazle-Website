
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import StaticParticleCanvas from '@/components/StaticParticle';

const jobOpenings = [
  {
    title: "Junior Graphic Designer",
    department: "Creative",
    location: "Mumbai",
    description: "Collaborate with our creative team to design visually stunning assets for gaming advertisements. Bring your creativity to life in a fast-paced, innovative environment.",
  },
  {
    title: "Data Operations Specialist",
    department: "Operations",
    location: "Mumbai",
    description: "Manage and optimize data pipelines to ensure seamless delivery of insights. Work closely with cross-functional teams to drive operational excellence.",
  },
  {
    title: "Sales Executive",
    department: "Sales",
    location: "Mumbai/Delhi",
    description: "Engage with clients to showcase our cutting-edge gaming advertising solutions. Build strong relationships and drive revenue growth in a dynamic industry.",
  },
  {
    title: "Sales Operations Specialist",
    department: "Sales & Operations",
    location: "Mumbai",
    description: "Streamline sales processes and support the team in delivering exceptional client experiences. Be the backbone of our sales operations with your organizational skills.",
  }
];

const Careers: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <StaticParticleCanvas />
      <Navbar />
      
      <div className="container mx-auto pt-32 pb-20 px-4">
        <h1 className="text-4xl md:text-6xl font-disket text-white mb-8 text-center">Careers at Napptix</h1>
        <p className="text-xl text-gray-300 mb-12 text-center font-productSans">Join us in revolutionizing gaming advertising</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-napptix-dark p-8 rounded-xl border border-napptix-grey/20">
            <h2 className="text-2xl font-disket text-white mb-4">Why Join Us?</h2>
            <ul className="space-y-4 text-gray-300 font-productSans">
              <li>• Innovative technology environment</li>
              <li>• Global impact in gaming industry</li>
              <li>• Competitive compensation</li>
              <li>• Continuous learning opportunities</li>
              <li>• Health and wellness benefits</li>
              <li>• Regular team retreats</li>
            </ul>
          </div>
          
          <div className="bg-napptix-dark p-8 rounded-xl border border-napptix-grey/20">
            <h2 className="text-2xl font-disket text-white mb-4">Our Values</h2>
            <ul className="space-y-4 text-gray-300 font-productSans">
              <li>• Innovation First</li>
              <li>• Player-Centric Approach</li>
              <li>• Global Mindset</li>
              <li>• Continuous Learning</li>
              <li>• Work-Life Harmony</li>
              <li>• Diversity & Inclusion</li>
            </ul>
          </div>
        </div>

        <h2 className="text-3xl font-disket text-white mb-8 text-center pt-[100px]">Open Positions</h2>
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
                  <h3 className="text-xl text-white font-disket">{job.title}</h3>
                  <p className="text-[#29dd3b]">{job.department}</p>
                </div>
                <span className="text-gray-400 text-sm">{job.location}</span>
              </div>
              <p className="text-gray-300 mb-4 font-productSans">{job.description}</p>
              <button
                 onClick={() => window.location.href = "mailto:hr@napptix.com"}
                 className="bg-[#29dd3b] text-black px-6 py-2 rounded-full font-bold hover:bg-[#29dd3b]/80 transition-colors">
                Apply Now
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-300 font-productSans">
            Don't see a position that matches your skills? Send your resume to{" "}
            <a href="mailto:hr@napptix.com" className="text-[#29dd3b] hover:underline">
              hr@napptix.com
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Careers;
