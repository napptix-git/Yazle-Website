
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import FooterGame from './FooterGame';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-napptix-dark text-white py-12">
      <div className="container mx-auto px-4">
        {/* Game section */}
        <div className="mb-12">
          <FooterGame />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-gradient">Napptix</span>
            </h3>
            <p className="text-napptix-light-grey mb-4">
              Innovative advertising solutions for the gaming industry, connecting brands with gamers worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-napptix-light-grey hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-napptix-light-grey hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-napptix-light-grey hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-napptix-light-grey hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Solutions */}
          <div className="col-span-1">
            <h4 className="text-white font-bold mb-4">Solutions</h4>
            <ul className="space-y-2">
              <li><Link to="/solutions" className="text-napptix-light-grey hover:text-white transition-colors">In-Game Advertising</Link></li>
              <li><Link to="/solutions" className="text-napptix-light-grey hover:text-white transition-colors">On-Game Advertising</Link></li>
              <li><Link to="/solutions" className="text-napptix-light-grey hover:text-white transition-colors">Off-Game Advertising</Link></li>
              <li><Link to="/solutions" className="text-napptix-light-grey hover:text-white transition-colors">Pro Game Advertising</Link></li>
            </ul>
          </div>
          
          {/* Company */}
          <div className="col-span-1">
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-napptix-light-grey hover:text-white transition-colors">About</Link></li>
              <li><Link to="/advertisers" className="text-napptix-light-grey hover:text-white transition-colors">Advertisers</Link></li>
              <li><Link to="/publishers" className="text-napptix-light-grey hover:text-white transition-colors">Publishers</Link></li>
              <li><Link to="/contact" className="text-napptix-light-grey hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="col-span-1">
            <h4 className="text-white font-bold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-napptix-light-grey">
                <Mail size={16} className="mr-2" />
                <span>info@napptix.com</span>
              </li>
              <li className="flex items-center text-napptix-light-grey">
                <Phone size={16} className="mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
            <div className="mt-4">
              <Link to="/contact">
                <button className="bg-napptix-purple hover:bg-napptix-purple/80 text-white font-bold py-2 px-5 rounded-full transition-all">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-napptix-grey/20 mt-8 pt-6 text-center">
          <p className="text-napptix-light-grey">&copy; {new Date().getFullYear()} Napptix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
