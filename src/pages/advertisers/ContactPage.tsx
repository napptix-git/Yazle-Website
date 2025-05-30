import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Building, Users, BarChart3, Mail, Phone } from 'lucide-react';
import { submitContactForm } from '@/services/contactService';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
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
        contact_type: 'advertiser' as const,
        name: formData.name,
        email: formData.email,
        company: formData.company,
        budget: formData.budget,
        message: formData.message
      };

      await submitContactForm(submissionData);
      toast.success('Your message has been sent! An advertising specialist will contact you shortly.');
      setFormData({
        name: '',
        email: '',
        company: '',
        budget: '',
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
      
      <div className="container mx-auto pt-32 pb-20 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Advertiser Contact</h1>
            <p className="text-napptix-light-grey text-xl mb-8">
              Ready to reach millions of engaged gamers? Our advertising team is here to help.
            </p>
            
            <div className="space-y-6 mt-12">
              <div className="flex items-start space-x-4">
                <div className="bg-napptix-dark rounded-full p-3">
                  <Mail className="h-6 w-6 text-[#29dd3b]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Email Us</h3>
                  <p className="text-napptix-light-grey">advertisers@napptix.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-napptix-dark rounded-full p-3">
                  <Phone className="h-6 w-6 text-[#29dd3b]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Call Us</h3>
                  <p className="text-napptix-light-grey">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-napptix-dark rounded-full p-3">
                  <Building className="h-6 w-6 text-[#29dd3b]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Headquarters</h3>
                  <p className="text-napptix-light-grey">123 Gaming Avenue<br/>San Francisco, CA 94107</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-napptix-dark p-8 rounded-xl border border-napptix-grey/20">
            <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
            
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
                  <label htmlFor="company" className="text-white mb-2">Company</label>
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
                  <label htmlFor="budget" className="text-white mb-2">Monthly Ad Budget</label>
                  <select
                    id="budget"
                    value={formData.budget}
                    onChange={handleChange}
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
                  value={formData.message}
                  onChange={handleChange}
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
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
