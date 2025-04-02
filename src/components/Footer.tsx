
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Github, Youtube, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import RandomGameSelector from './games/RandomGameSelector';

const Footer: React.FC = () => {
  return (
    <footer className="relative h-screen w-full bg-black overflow-hidden">
      {/* Game Container (Full Screen) */}
      <div className="absolute inset-0 w-full h-full z-10">
        <RandomGameSelector />
      </div>
      
      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 w-full py-4 px-6 z-20 flex justify-between items-center">
        {/* Social Links */}
        <div className="flex space-x-4 items-center">
          <a href="#" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors p-2">
            <Facebook size={18} />
          </a>
          <a href="#" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors p-2">
            <Twitter size={18} />
          </a>
          <a href="#" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors p-2">
            <Instagram size={18} />
          </a>
          <a href="#" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors p-2">
            <Linkedin size={18} />
          </a>
          <a href="#" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors p-2">
            <Github size={18} />
          </a>
          <a href="#" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors p-2">
            <Youtube size={18} />
          </a>
        </div>
        
        {/* Next Page Link */}
        <Link 
          to="/advertisers" 
          className="flex items-center text-white hover:text-[#29dd3b] transition-colors bg-black/30 rounded-full px-4 py-2 backdrop-blur-sm"
        >
          <span className="mr-2">Next Page: Advertisers</span>
          <ArrowRight size={18} />
        </Link>
      </div>
      
      {/* Bottom Copyright Bar */}
      <div className="absolute bottom-0 left-0 w-full py-4 px-6 z-20">
        <p className="text-napptix-light-grey text-xs">
          &copy; {new Date().getFullYear()} Napptix. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
