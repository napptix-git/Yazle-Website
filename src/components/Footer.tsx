
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Github, Youtube, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();
  
  // Determine next page based on current route with the requested flow
  const getNextPageInfo = () => {
    const routes = [
      { path: "/", name: "Advertisers", to: "/advertisers" },
      { path: "/advertisers", name: "Publishers", to: "/publishers" },
      { path: "/publishers", name: "About", to: "/about" },
      { path: "/about", name: "Contact", to: "/contact" },
      { path: "/contact", name: "Home", to: "/" },
      // Default fallback
      { path: "/solutions", name: "Advertisers", to: "/advertisers" }
    ];
    
    const currentIndex = routes.findIndex(route => route.path === location.pathname);
    return currentIndex >= 0 ? routes[currentIndex] : routes[0];
  };
  
  const nextPage = getNextPageInfo();
  
  return (
    <footer className="relative bg-black py-12 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-black opacity-50"></div>
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Napptix</h3>
            <p className="text-napptix-light-grey text-sm mb-4">
              Innovative advertising solutions connecting brands with the gaming world.
              Our mission is to enhance the gaming ecosystem through effective advertising.
            </p>
            {/* Social Links */}
            <div className="flex space-x-3 items-center mt-4">
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
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-napptix-light-grey">
              <li><Link to="/" className="hover:text-[#29dd3b] transition-colors">Home</Link></li>
              <li><Link to="/advertisers" className="hover:text-[#29dd3b] transition-colors">Advertisers</Link></li>
              <li><Link to="/publishers" className="hover:text-[#29dd3b] transition-colors">Publishers</Link></li>
              <li><Link to="/about" className="hover:text-[#29dd3b] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#29dd3b] transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Resources */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-napptix-light-grey">
              <li><a href="#" className="hover:text-[#29dd3b] transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-[#29dd3b] transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-[#29dd3b] transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-[#29dd3b] transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-[#29dd3b] transition-colors">Support</a></li>
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Contact Us</h3>
            <address className="not-italic text-napptix-light-grey text-sm">
              <p className="mb-2">123 Gaming Street</p>
              <p className="mb-2">Tech Valley, CA 94043</p>
              <p className="mb-2">United States</p>
              <p className="mb-2">Email: info@napptix.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </address>
          </div>
        </div>
        
        {/* Next Page Link - Now in a better UI position */}
        <div className="flex justify-between items-center border-t border-napptix-grey/20 pt-6 mt-6">
          <p className="text-napptix-light-grey text-xs">
            &copy; {new Date().getFullYear()} Napptix. All rights reserved.
          </p>
          <Link 
            to={nextPage.to} 
            className="flex items-center text-white hover:text-[#29dd3b] transition-colors bg-black/30 rounded-full px-4 py-2 backdrop-blur-sm"
          >
            <span className="mr-2">Next: {nextPage.name}</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

