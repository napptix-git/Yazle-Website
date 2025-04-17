
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Code, Gamepad, Mail, Phone, Building } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    gameType: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Your message has been sent! A developer relations specialist will contact you shortly.');
      setFormData({
        name: '',
        email: '',
        company: '',
        gameType: '',
        message: ''
      });
      setSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black font-manrope">
      <Navbar />
      
      <div className="container mx-auto pt-32 pb-20 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Developer Support</h1>
            <p className="text-napptix-light-grey text-xl mb-8">
              Need help integrating our SDK? Have questions about monetization? Our team is ready to assist.
            </p>
            
            <div className="space-y-6 mt-12">
              <div className="flex items-start space-x-4">
                <div className="bg-napptix-dark rounded-full p-3">
                  <Mail className="h-6 w-6 text-[#29dd3b]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Email Us</h3>
                  <p className="text-napptix-light-grey">developers@napptix.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-napptix-dark rounded-full p-3">
                  <Phone className="h-6 w-6 text-[#29dd3b]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Developer Hotline</h3>
                  <p className="text-napptix-light-grey">+1 (555) 987-6543</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-napptix-dark rounded-full p-3">
                  <Code className="h-6 w-6 text-[#29dd3b]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Documentation</h3>
                  <p className="text-napptix-light-grey">
                    <a href="#" className="underline hover:text-[#29dd3b]">docs.napptix.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-napptix-dark p-8 rounded-xl border border-napptix-grey/20">
            <h2 className="text-2xl font-bold text-white mb-6">Get Technical Support</h2>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-white mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-black border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-white mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-black border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                    placeholder="Your email"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="company" className="text-white mb-2">Studio/Company</label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="bg-black border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                    placeholder="Your company"
                    required
                  />
                </div>
                
                <div className="flex flex-col">
                  <label htmlFor="gameType" className="text-white mb-2">Game Platform</label>
                  <select
                    id="gameType"
                    value={formData.gameType}
                    onChange={handleChange}
                    className="bg-black border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                    required
                  >
                    <option value="" disabled>Select platform</option>
                    <option value="mobile">Mobile</option>
                    <option value="web">Web/HTML5</option>
                    <option value="pc">PC/Mac</option>
                    <option value="console">Console</option>
                    <option value="vr">VR/AR</option>
                  </select>
                </div>
              </div>
              
              <div className="flex flex-col">
                <label htmlFor="message" className="text-white mb-2">How can we help?</label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-black border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                  placeholder="Describe your technical question or integration issue"
                  required
                ></textarea>
              </div>
              
              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#29dd3b] hover:bg-[#29dd3b]/80 text-black font-bold py-3 px-8 rounded-full transition-all disabled:opacity-70 disabled:cursor-not-allowed text-lg"
                >
                  {submitting ? 'Sending...' : 'Get Support'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
