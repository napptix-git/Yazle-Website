
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Github, Youtube, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();
  
  // Determine next page based on current route
  const getNextPageInfo = () => {
    const routes = [
      { path: "/", name: "Solutions", to: "/solutions" },
      { path: "/solutions", name: "Advertisers", to: "/advertisers" },
      { path: "/advertisers", name: "Publishers", to: "/publishers" },
      { path: "/publishers", name: "About", to: "/about" },
      { path: "/about", name: "Contact", to: "/contact" },
      { path: "/contact", name: "Home", to: "/" }
    ];
    
    const currentIndex = routes.findIndex(route => route.path === location.pathname);
    return currentIndex >= 0 ? routes[(currentIndex + 1) % routes.length] : routes[0];
  };
  
  const nextPage = getNextPageInfo();
  
  return (
    <footer className="relative h-screen w-full bg-black overflow-hidden">
      {/* Plain Background */}
      <div className="absolute inset-0 w-full h-full z-10 bg-black">
        {/* Background gradient for visual interest */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-black opacity-50"></div>
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
        
        {/* Next Page Link - Now using Link component properly */}
        <Link 
          to={nextPage.to} 
          className="flex items-center text-white hover:text-[#29dd3b] transition-colors bg-black/30 rounded-full px-4 py-2 backdrop-blur-sm"
        >
          <span className="mr-2">Next Page: {nextPage.name}</span>
          <ArrowRight size={18} />
        </Link>
      </div>
      
      {/* Added Footer Content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center w-full max-w-4xl px-6">
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-6">Join the Napptix Network</h2>
        <p className="text-napptix-light-grey text-lg mb-8">
          Connect with our global network of gamers, advertisers, and publishers. 
          Napptix provides cutting-edge solutions to help you reach your target audience 
          and maximize your engagement across the gaming ecosystem.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-napptix-grey/20">
            <h3 className="text-white text-xl font-bold mb-4">24/7 Support</h3>
            <p className="text-napptix-light-grey">Our dedicated team is always available to help you with any questions or concerns.</p>
          </div>
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-napptix-grey/20">
            <h3 className="text-white text-xl font-bold mb-4">Global Reach</h3>
            <p className="text-napptix-light-grey">Connect with gamers and publishers across the world with our extensive network.</p>
          </div>
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-napptix-grey/20">
            <h3 className="text-white text-xl font-bold mb-4">Real-time Analytics</h3>
            <p className="text-napptix-light-grey">Track your performance with our advanced analytics dashboard and reporting tools.</p>
          </div>
        </div>
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
