
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, Github, Youtube } from 'lucide-react';
import FooterGame from './FooterGame';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-napptix-dark text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Left column - Company Info and Social Links */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-gradient">Napptix</span>
            </h3>
            <p className="text-napptix-light-grey mb-6">
              Innovative advertising solutions for the gaming industry, connecting brands with gamers worldwide.
            </p>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">
                <Youtube size={20} />
              </a>
            </div>
            
            <h4 className="text-white font-bold mb-3">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-napptix-light-grey">
                <Mail size={16} className="mr-2" />
                <span>info@napptix.com</span>
              </li>
              <li className="flex items-center text-napptix-light-grey">
                <Phone size={16} className="mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
          
          {/* Center column - Game */}
          <div className="col-span-1">
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-bold mb-4 text-gradient">Play Breakout</h3>
              <p className="text-napptix-light-grey mb-4 font-roboto-mono text-center max-w-md">
                Use your mouse to move the paddle and break all the blocks!
              </p>
              <FooterGame />
            </div>
          </div>
          
          {/* Right column - Quick Links */}
          <div className="col-span-1 grid grid-cols-2 gap-6">
            {/* Solutions */}
            <div>
              <h4 className="text-white font-bold mb-4">Solutions</h4>
              <ul className="space-y-2">
                <li><Link to="/solutions" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">In-Game Advertising</Link></li>
                <li><Link to="/solutions" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">On-Game Advertising</Link></li>
                <li><Link to="/solutions" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">Off-Game Advertising</Link></li>
                <li><Link to="/solutions" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">Pro Game Advertising</Link></li>
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">About</Link></li>
                <li><Link to="/advertisers" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">Advertisers</Link></li>
                <li><Link to="/publishers" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">Publishers</Link></li>
                <li><Link to="/contact" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-napptix-grey/20 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-napptix-light-grey mb-4 md:mb-0">&copy; {new Date().getFullYear()} Napptix. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link to="/privacy" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
