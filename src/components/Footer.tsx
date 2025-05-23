import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Github, Youtube, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';


 type FooterProps = {
  className?: string;
  headingColor?: string;
  // ...other props
  };
const Footer: React.FC<FooterProps> = ({className, headingColor}) => {
  const location = useLocation();
  
  const getNextPageInfo = () => {
    const routes = [
      { path: "/", name: "Wizora", to: "/advertisers/wizora" },
       { path: "/advertisers/wizora", name: "Developers", to: "/developers" },
      { path: "/developers", name: "About", to: "/about" },
      { path: "/about", name: "Careers", to: "/careers" },
      { path: "/careers", name: "News", to: "/news" },
      // { path: "/news", name: "About Us", to: "/about" },
      { path: "/news", name: "Let's talk", to: "/contact" },
      { path: "/contact", name: "Home", to: "/" },
      // { path: "/contact", name: "Home", to: "/" }
    ];
    const currentIndex = routes.findIndex(route => route.path === location.pathname);
    return currentIndex >= 0 ? routes[currentIndex] : routes[0];
  };
  
  const nextPage = getNextPageInfo();

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

 
  
  return (
    <footer className={`relative ${className ? className : " "}  py-12 overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-t "></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className={`text-xl font-bold mb-4 font-disket ${headingColor ? headingColor : "text-white"}`}>Napptix</h3>
            <p className="text-napptix-light-grey text-sm mb-4 font-productSans">
              Innovative advertising solutions connecting brands with the gaming world.
              Our mission is to enhance the gaming ecosystem through effective advertising.
            </p>
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
              <a href="https://www.linkedin.com/company/napptix/"
                 className="text-napptix-light-grey hover:text-[#29dd3b] transition-colors"
                 target='_blank'>
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
          
          <div>
            <h3 className={`text-xl font-bold mb-4 font-disket ${headingColor ? headingColor : "text-white"}`}>Quick Links</h3>
            <ul className="space-y-2 text-napptix-light-grey">
              <li><Link to="/" onClick={scrollToTop} className="hover:text-[#29dd3b] transition-colors font-productSans">Home</Link></li>
              {/* <li><Link to="/advertisers/wizora" onClick={scrollToTop} className="hover:text-[#29dd3b] transition-colors">Wizora</Link></li> */}
              {/* <li><Link to="/advertisers/case-studies" onClick={scrollToTop} className="hover:text-[#29dd3b] transition-colors">Case Studies</Link></li> */}
              {/* <li><Link to="/advertisers/ad-gallery" onClick={scrollToTop} className="hover:text-[#29dd3b] transition-colors">Ad Gallery</Link></li> */}
              <li><Link to="/developers" onClick={scrollToTop} className="hover:text-[#29dd3b] transition-colors font-productSans">Developers</Link></li>
              <li><Link to="/about" onClick={scrollToTop} className="hover:text-[#29dd3b] transition-colors font-productSans">About Us</Link></li>
              <li><Link to="/contact" onClick={scrollToTop} className="hover:text-[#29dd3b] transition-colors font-productSans">Let's talk</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className={`text-xl font-bold mb-4 font-disket ${headingColor ? headingColor : "text-white"}`}>Privacy Policy</h3>
            <ul className="space-y-2 text-napptix-light-grey">
              <li><Link to="/advertisers/wizora" className="hover:text-[#29dd3b] transition-colors font-productSans">Terms & Conditions</Link></li>
              <li><Link to="/advertisers/case-studies" className="hover:text-[#29dd3b] transition-colors"></Link></li>
              <li><Link to="/advertisers/ad-gallery" className="hover:text-[#29dd3b] transition-colors"></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className={`text-xl font-bold mb-4 font-disket ${headingColor ? headingColor : "text-white"}`}>Contact Us</h3>
            <address className="not-italic text-napptix-light-grey text-sm">
              <p className="mb-2 font-productSans">123 Gaming Street</p>
              <p className="mb-2 font-productSans">Tech Valley, CA 94043</p>
              <p className="mb-2 font-productSans">United States</p>
              <p className="mb-2 font-productSans">Email: info@napptix.com</p>
              <p className='font-productSans'>Phone: +1 (555) 123-4567</p>
            </address>
          </div>
        </div>
        
        <div className="flex justify-between items-center border-t border-napptix-grey/20 pt-6 mt-6">
          <p className="text-napptix-light-grey text-xs">
            &copy; {new Date().getFullYear()} Napptix. All rights reserved.
          </p>
          <Link 
            to={nextPage.to} 
            onClick={scrollToTop}
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
