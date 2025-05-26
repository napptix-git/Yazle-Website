
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import StaticParticleCanvas from '@/components/StaticParticle';

type ContactType = 'general' | 'advertiser' | 'developer';

const Contact: React.FC = () => {
  const [contactType, setContactType] = useState<ContactType>('general');
  const [submitting, setSubmitting] = useState(false);

  // General fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  // Advertiser fields
  const [advertiserFormData, setAdvertiserFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: ''
  });
  // Developer fields
  const [developerFormData, setDeveloperFormData] = useState({
    name: '',
    email: '',
    appName: '',
    platform: '',
    message: ''
  });

  const resetAll = () => {
    setFormData({ name: '', email: '', company: '', message: '' });
    setAdvertiserFormData({ name: '', email: '', company: '', budget: '', message: '' });
    setDeveloperFormData({ name: '', email: '', appName: '', platform: '', message: '' });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setContactType(e.target.value as ContactType);
  };

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    setTimeout(() => {
      toast.success('Message sent successfully! We will get back to you soon.');
      resetAll();
      setSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black font-manrope">
      <Navbar />
      <StaticParticleCanvas />
      <div className="container mx-auto pt-28 pb-20 px-4">

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">Get In Touch</h1>
        <div className="bg-napptix-dark p-8 rounded-xl max-w-2xl mx-auto">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col mb-2">
              <label htmlFor="who" className="text-white mb-2 text-lg font-disket ">Who are you?</label>
              <select
                id="who"
                value={contactType}
                onChange={handleTypeChange}
                className="bg-black border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b] font-productSans"
              >
                <option value="general">General</option>
                <option value="advertiser">Advertiser</option>
                <option value="developer">Developer</option>
              </select>
            </div>

            {/* Render fields based on type */}
            {contactType === "general" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="text-white mb-2 font-disket">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleGeneralChange}
                      className="bg-black border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-white mb-2 font-disket">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleGeneralChange}
                      className="bg-black border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                      placeholder="Your email"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="company" className="text-white mb-2 font-disket">Company</label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={handleGeneralChange}
                    className="bg-black border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                    placeholder="Your company"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="message" className="text-white mb-2 font-disket">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleGeneralChange}
                    className="bg-black border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                    placeholder="Your message"
                    required
                  ></textarea>
                </div>
              </>
            )}

            {contactType === "advertiser" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="text-white mb-2 font-disket">Name</label>
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
                    <label htmlFor="email" className="text-white mb-2 font-disket">Email</label>
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
                    <label htmlFor="company" className="text-white mb-2 font-disket">Company</label>
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
                    <label htmlFor="budget" className="text-white mb-2 font-disket">Monthly Ad Budget</label>
                    <select
                      id="budget"
                      value={advertiserFormData.budget}
                      onChange={handleAdvertiserChange}
                      className="bg-black border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b] font-productSans"
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
                  <label htmlFor="message" className="text-white mb-2 font-disket">Message</label>
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
              </>
            )}

            {contactType === "developer" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="text-white mb-2 font-disket">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      value={developerFormData.name}
                      onChange={handleDeveloperChange}
                      className="bg-black border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-white mb-2 font-disket">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={developerFormData.email}
                      onChange={handleDeveloperChange}
                      className="bg-black border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label htmlFor="appName" className="text-white mb-2 font-disket">Game/App Name</label>
                    <input
                      type="text"
                      id="appName"
                      value={developerFormData.appName}
                      onChange={handleDeveloperChange}
                      className="bg-black border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="platform" className="text-white mb-2 font-disket">Platform</label>
                    <select
                      id="platform"
                      value={developerFormData.platform}
                      onChange={handleDeveloperChange}
                      className="bg-black border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
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
                <div className="flex flex-col">
                  <label htmlFor="message" className="text-white mb-2 font-disket">How can we help?</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={developerFormData.message}
                    onChange={handleDeveloperChange}
                    className="bg-black border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                    required
                  ></textarea>
                </div>
              </>
            )}

            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={submitting}
                className="bg-[#29dd3b] hover:bg-[#29dd3b]/80 text-black font-bold py-3 px-8 rounded-full transition-all disabled:opacity-70 disabled:cursor-not-allowed text-lg shadow-[0_0_16px_2px_#29dd3b]"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
