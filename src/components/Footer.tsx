
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, Github, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import RandomGameSelector from './games/RandomGameSelector';

const Footer: React.FC = () => {
  return (
    <footer className="relative min-h-[70vh] bg-black">
      {/* Game Container (Full Width) */}
      <div className="absolute inset-0 w-full h-full z-10">
        <RandomGameSelector />
      </div>
      
      {/* Overlay for Footer Content */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent h-64 z-20">
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-8">
          {/* Footer Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Left column - Company Info and Social Links */}
            <div className="col-span-1">
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-gradient">Napptix</span>
              </h3>
              <p className="text-napptix-light-grey mb-6 text-sm">
                Innovative advertising solutions for the gaming industry, connecting brands with gamers worldwide.
              </p>
              <div className="flex space-x-4 mb-6">
                <a href="#" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="#" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">
                  <Twitter size={18} />
                </a>
                <a href="#" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">
                  <Github size={18} />
                </a>
                <a href="#" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">
                  <Youtube size={18} />
                </a>
              </div>
              
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center text-napptix-light-grey">
                  <Mail size={14} className="mr-1" />
                  <span>info@napptix.com</span>
                </div>
                <div className="flex items-center text-napptix-light-grey">
                  <Phone size={14} className="mr-1" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
            
            {/* Center and Right columns - Quick Links */}
            <div className="col-span-2 grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Solutions */}
              <div>
                <h4 className="text-white font-bold mb-3 text-sm">Solutions</h4>
                <ul className="space-y-2 text-xs">
                  <li><Link to="/solutions" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">In-Game Advertising</Link></li>
                  <li><Link to="/solutions" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">On-Game Advertising</Link></li>
                  <li><Link to="/solutions" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">Off-Game Advertising</Link></li>
                  <li><Link to="/solutions" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">Pro Game Advertising</Link></li>
                </ul>
              </div>
              
              {/* Company */}
              <div>
                <h4 className="text-white font-bold mb-3 text-sm">Company</h4>
                <ul className="space-y-2 text-xs">
                  <li><Link to="/about" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">About</Link></li>
                  <li><Link to="/advertisers" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">Advertisers</Link></li>
                  <li><Link to="/publishers" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">Publishers</Link></li>
                  <li><Link to="/contact" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">Contact</Link></li>
                </ul>
              </div>
              
              {/* Resources */}
              <div>
                <h4 className="text-white font-bold mb-3 text-sm">Resources</h4>
                <ul className="space-y-2 text-xs">
                  <li><Link to="/blog" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">Blog</Link></li>
                  <li><Link to="/resources" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">Case Studies</Link></li>
                  <li><Link to="/resources" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">White Papers</Link></li>
                  <li><Link to="/resources" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">Partner Network</Link></li>
                </ul>
              </div>
              
              {/* Legal */}
              <div>
                <h4 className="text-white font-bold mb-3 text-sm">Legal</h4>
                <ul className="space-y-2 text-xs">
                  <li><Link to="/privacy" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">Terms of Service</Link></li>
                  <li><Link to="/cookies" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">Cookie Policy</Link></li>
                  <li><Link to="/gdpr" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">GDPR Compliance</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-napptix-grey/20 pt-4 flex flex-col md:flex-row justify-between items-center">
            <p className="text-napptix-light-grey mb-2 md:mb-0 text-xs">&copy; {new Date().getFullYear()} Napptix. All rights reserved.</p>
            <div className="flex space-x-4 text-xs">
              <Link to="/sitemap" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">Sitemap</Link>
              <Link to="/accessibility" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">Accessibility</Link>
              <a href="mailto:support@napptix.com" className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
