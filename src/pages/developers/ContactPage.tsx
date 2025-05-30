import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { submitContactForm } from '@/services/contactService';

const DeveloperContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    appName: '',
    platform: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const submissionData = {
        contact_type: 'developer' as const,
        name: formData.name,
        email: formData.email,
        app_name: formData.appName || null,
        platform: formData.platform || null,
        message: formData.message
      };

      await submitContactForm(submissionData);
      toast.success('Message sent successfully! Our developer relations team will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        appName: '',
        platform: '',
        message: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black font-manrope">
      <Navbar />
      
      <div className="container mx-auto pt-24 pb-20 px-4">
        <div className="mb-16">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Developer Support</h1>
            <p className="text-napptix-light-grey text-lg max-w-3xl mx-auto">
              Let our team help you implement the right Napptix solutions for your game
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">How We Help Game Developers</h2>
              <ul className="space-y-4 text-napptix-light-grey">
                <li className="flex items-start gap-3">
                  <div className="bg-[#29dd3b] rounded-full p-1 mt-1.5 flex-shrink-0">
                    <div className="w-2 h-2"></div>
                  </div>
                  <p>Technical integration support for all game engines</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-[#29dd3b] rounded-full p-1 mt-1.5 flex-shrink-0">
                    <div className="w-2 h-2"></div>
                  </div>
                  <p>Optimization strategies to balance revenue and player experience</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-[#29dd3b] rounded-full p-1 mt-1.5 flex-shrink-0">
                    <div className="w-2 h-2"></div>
                  </div>
                  <p>Custom monetization solutions for your unique game requirements</p>
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Developer Resources</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
                  <h3 className="text-white font-bold mb-2">Documentation</h3>
                  <p className="text-napptix-light-grey text-sm mb-4">Implementation guides for easy integration</p>
                  <Button variant="outline" className="w-full border-[#29dd3b] text-[#29dd3b] hover:bg-[#29dd3b]/10">
                    View Docs
                  </Button>
                </div>
                
                <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
                  <h3 className="text-white font-bold mb-2">SDK Download</h3>
                  <p className="text-napptix-light-grey text-sm mb-4">Latest SDKs for all platforms</p>
                  <Button variant="outline" className="w-full border-[#29dd3b] text-[#29dd3b] hover:bg-[#29dd3b]/10">
                    Get SDK
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-napptix-dark rounded-xl p-6 sm:p-8 border border-napptix-grey/30">
            <h2 className="text-2xl font-bold text-white mb-6">Contact Our Developer Team</h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-white mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-black border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-white mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-black border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="appName" className="block text-white mb-2">Game/App Name</label>
                  <input
                    type="text"
                    id="appName"
                    value={formData.appName}
                    onChange={handleChange}
                    className="w-full bg-black border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                  />
                </div>
                
                <div>
                  <label htmlFor="platform" className="block text-white mb-2">Platform</label>
                  <select
                    id="platform"
                    value={formData.platform}
                    onChange={handleChange}
                    className="w-full bg-black border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                  >
                    <option value="">Select a platform</option>
                    <option value="ios">iOS</option>
                    <option value="android">Android</option>
                    <option value="both">iOS & Android</option>
                    <option value="web">Web</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white mb-2">How can we help?</label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-black border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                  required
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="submit"
                  disabled={submitting}
                  className="bg-[#29dd3b] text-black hover:bg-[#29dd3b]/90 px-6"
                >
                  {submitting ? 'Sending...' : 'Send Message'}
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

export default DeveloperContactPage;
