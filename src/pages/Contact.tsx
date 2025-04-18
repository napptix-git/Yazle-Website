import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WorldMap from '@/components/WorldMap';

type ContactType = 'general' | 'advertiser' | 'developer';

const Contact: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ContactType>('general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [advertiserFormData, setAdvertiserFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: ''
  });
  const [developerFormData, setDeveloperFormData] = useState({
    name: '',
    email: '',
    appName: '',
    platform: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleAdvertiserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setAdvertiserFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleDeveloperChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setDeveloperFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
      setSubmitting(false);
    }, 1500);
  };

  const handleAdvertiserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Your message has been sent! An advertising specialist will contact you shortly.');
      setAdvertiserFormData({
        name: '',
        email: '',
        company: '',
        budget: '',
        message: ''
      });
      setSubmitting(false);
    }, 1500);
  };

  const handleDeveloperSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! Our developer relations team will get back to you soon.');
      setDeveloperFormData({
        name: '',
        email: '',
        appName: '',
        platform: '',
        message: ''
      });
      setSubmitting(false);
    }, 1500);
  };

  const offices = [
    { city: "Mumbai", country: "India" },
    { city: "Dubai", country: "United Arab Emirates" },
    { city: "Delhi", country: "India" },
    { city: "Singapore", country: "Singapore" }
  ];

  return (
    <div className="min-h-screen bg-black font-manrope">
      <Navbar />
      
      <div className="container mx-auto pt-20 pb-20 px-4">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">Global Presence</h2>
          <div className="space-y-8">
            {offices.map((office) => (
              <div key={office.city} className="border-b border-white/20 pb-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full">
                  <h3 className="text-4xl md:text-6xl font-syne font-extrabold mb-4 md:mb-0 md:mr-8 first:md:mr-16">{office.city}</h3>
                  <p className="text-xl text-napptix-light-grey">{office.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <WorldMap />
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">Get In Touch</h1>
        
        <Tabs defaultValue="general" className="w-full max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="advertiser">Advertiser</TabsTrigger>
            <TabsTrigger value="developer">Developer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <div className="text-napptix-light-grey space-y-6 max-w-2xl mx-auto text-lg">
              <p className="text-center">
                Have questions about our solutions? Fill out the form below and our team will get back to you shortly.
              </p>
              
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="text-white mb-2 text-lg">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-napptix-dark border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-white mb-2 text-lg">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-napptix-dark border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                      placeholder="Your email"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <label htmlFor="company" className="text-white mb-2 text-lg">Company</label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="bg-napptix-dark border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                    placeholder="Your company"
                  />
                </div>
                
                <div className="flex flex-col">
                  <label htmlFor="message" className="text-white mb-2 text-lg">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-napptix-dark border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                    placeholder="Your message"
                    required
                  ></textarea>
                </div>
                
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-napptix-purple hover:bg-napptix-purple/80 text-white font-bold py-3 px-8 rounded-full transition-all disabled:opacity-70 disabled:cursor-not-allowed text-lg"
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </TabsContent>
          
          <TabsContent value="advertiser">
            <div className="bg-napptix-dark p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
              
              <form className="space-y-6" onSubmit={handleAdvertiserSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="text-white mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={advertiserFormData.name}
                      onChange={handleAdvertiserChange}
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
                      value={advertiserFormData.email}
                      onChange={handleAdvertiserChange}
                      className="bg-black border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                      placeholder="Your email"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label htmlFor="company" className="text-white mb-2">Company</label>
                    <input
                      type="text"
                      id="company"
                      value={advertiserFormData.company}
                      onChange={handleAdvertiserChange}
                      className="bg-black border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                      placeholder="Your company"
                      required
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <label htmlFor="budget" className="text-white mb-2">Monthly Ad Budget</label>
                    <select
                      id="budget"
                      value={advertiserFormData.budget}
                      onChange={handleAdvertiserChange}
                      className="bg-black border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                      required
                    >
                      <option value="" disabled>Select budget range</option>
                      <option value="5-10k">$5,000 - $10,000</option>
                      <option value="10-25k">$10,000 - $25,000</option>
                      <option value="25-50k">$25,000 - $50,000</option>
                      <option value="50k+">$50,000+</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <label htmlFor="message" className="text-white mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={advertiserFormData.message}
                    onChange={handleAdvertiserChange}
                    className="bg-black border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                    placeholder="Tell us about your campaign goals"
                    required
                  ></textarea>
                </div>
                
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="bg-[#29dd3b] hover:bg-[#29dd3b]/80 text-black font-bold py-3 px-8 rounded-full transition-all disabled:opacity-70 disabled:cursor-not-allowed text-lg"
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>
          
          <TabsContent value="developer">
            <div className="bg-napptix-dark p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-white mb-6">Contact Our Developer Team</h2>
              <form className="space-y-5" onSubmit={handleDeveloperSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-white mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      value={developerFormData.name}
                      onChange={handleDeveloperChange}
                      className="w-full bg-black border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-white mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={developerFormData.email}
                      onChange={handleDeveloperChange}
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
                      value={developerFormData.appName}
                      onChange={handleDeveloperChange}
                      className="w-full bg-black border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="platform" className="block text-white mb-2">Platform</label>
                    <select
                      id="platform"
                      value={developerFormData.platform}
                      onChange={handleDeveloperChange}
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
                    value={developerFormData.message}
                    onChange={handleDeveloperChange}
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
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
