
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StaticParticleCanvas from '@/components/StaticParticle';

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <StaticParticleCanvas />
      <Navbar />
      
      <div className="container mx-auto pt-32 pb-20 px-6">
        <h1 className="text-4xl md:text-6xl font-disket text-white mb-8 text-center">Privacy Policy</h1>
        
        <div className="max-w-4xl mx-auto bg-napptix-dark p-8 rounded-xl border border-napptix-grey/20">
          <div className="text-gray-300 space-y-6 font-productSans">
            <div className="mb-6">
              <p className="text-sm text-gray-400 mb-2">Effective Date: [Insert Date]</p>
              <p className="text-sm text-gray-400">Last Updated: [Insert Date]</p>
            </div>

            <p>
              Napptix Media FZ LLC ("Napptix," "we," "us," or "our") respects your privacy and is committed to protecting your personal data in compliance with applicable laws, including:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>India's Digital Personal Data Protection Act (DPDPA), 2023</li>
              <li>UAE's Federal Decree-Law No. 45 of 2021 (UAE Data Protection Law)</li>
              <li>General Data Protection Regulation (GDPR) (for EU users)</li>
              <li>California Consumer Privacy Act (CCPA) (for California residents)</li>
            </ul>

            <p>
              This Privacy Policy explains how we collect, use, disclose, store, and protect your personal data when you visit www.napptix.com (the "Site") or use our services.
            </p>

            <p>
              By using our Site, you consent to the practices described in this policy. If you do not agree, please refrain from using our services.
            </p>

            <h2 className="text-2xl font-disket text-white mt-8 mb-4">1. DEFINITIONS</h2>
            <ul className="space-y-2">
              <li><strong>"Personal Data":</strong> Any information relating to an identified or identifiable individual (e.g., name, email, IP address).</li>
              <li><strong>"Data Principal":</strong> The individual to whom the personal data belongs (referred to as "you").</li>
              <li><strong>"Data Fiduciary":</strong> Napptix Media FZ LLC, responsible for processing your data.</li>
              <li><strong>"Processing":</strong> Any operation performed on personal data (collection, storage, use, etc.).</li>
            </ul>

            <h2 className="text-2xl font-disket text-white mt-8 mb-4">2. INFORMATION WE COLLECT</h2>
            <h3 className="text-xl text-[#29dd3b] mt-6 mb-3">A. Personal Data</h3>
            <p>We may collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Identifiers:</strong> Name, email, phone number, address, government ID (if required).</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device ID, cookies.</li>
              <li><strong>Usage Data:</strong> Pages visited, session duration, clickstream data.</li>
              <li><strong>Marketing Preferences:</strong> Subscription choices, opt-in/opt-out status.</li>
            </ul>

            <h3 className="text-xl text-[#29dd3b] mt-6 mb-3">B. Sources of Data</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Directly from you (e.g., forms, registrations, customer support).</li>
              <li>Automatically (via cookies, analytics tools like Google Analytics).</li>
              <li>Third parties (e.g., business partners, advertisers, social media).</li>
            </ul>

            <h2 className="text-2xl font-disket text-white mt-8 mb-4">3. LEGAL BASIS FOR PROCESSING (GDPR & UAE DPL COMPLIANCE)</h2>
            <p>We process your data based on:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Consent</strong> (you explicitly agree, e.g., for marketing emails).</li>
              <li><strong>Contractual necessity</strong> (to fulfill services you requested).</li>
              <li><strong>Legal obligation</strong> (to comply with UAE/Indian laws).</li>
              <li><strong>Legitimate interests</strong> (e.g., fraud prevention, improving services).</li>
            </ul>
            <p className="text-sm text-gray-400">(For India's DPDPA, consent must be free, informed, and revocable.)</p>

            <h2 className="text-2xl font-disket text-white mt-8 mb-4">4. HOW WE USE YOUR DATA</h2>
            <p>We use your information for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Service Delivery:</strong> Account creation, transactions, customer support.</li>
              <li><strong>Personalization:</strong> Tailoring content and recommendations.</li>
              <li><strong>Marketing:</strong> Sending promotions (opt-out available).</li>
              <li><strong>Analytics:</strong> Improving Site performance and user experience.</li>
              <li><strong>Security:</strong> Fraud detection, cybersecurity measures.</li>
              <li><strong>Legal Compliance:</strong> Responding to court orders, regulatory requirements.</li>
            </ul>

            <h2 className="text-2xl font-disket text-white mt-8 mb-4">5. DATA SHARING & DISCLOSURE</h2>
            <p>We may share data with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Service Providers:</strong> Payment processors, cloud hosting, analytics firms.</li>
              <li><strong>Business Partners:</strong> Affiliates, advertisers (with consent).</li>
              <li><strong>Legal Authorities:</strong> If required by UAE/Indian law enforcement.</li>
              <li><strong>M&A Transactions:</strong> In case of mergers, acquisitions, or asset sales.</li>
            </ul>
            <p className="text-sm text-gray-400">(Under UAE DPL, cross-border transfers require safeguards.)</p>

            <h2 className="text-2xl font-disket text-white mt-8 mb-4">6. DATA RETENTION & DELETION</h2>
            <p>We retain data only as long as necessary (e.g., for legal, tax, or operational needs).</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>India's DPDPA:</strong> You may request erasure once the purpose is fulfilled.</li>
              <li><strong>UAE DPL:</strong> Data must be deleted when no longer needed.</li>
            </ul>

            <h2 className="text-2xl font-disket text-white mt-8 mb-4">7. YOUR RIGHTS (DPDPA, UAE DPL, GDPR, CCPA)</h2>
            <h3 className="text-xl text-[#29dd3b] mt-6 mb-3">A. Under India's DPDPA</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Right to access, correct, or delete your data.</li>
              <li>Right to withdraw consent.</li>
              <li>Right to grievance redressal via a Data Protection Officer (DPO).</li>
            </ul>

            <h3 className="text-xl text-[#29dd3b] mt-6 mb-3">B. Under UAE DPL</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Right to request data processing restrictions.</li>
              <li>Right to object to automated decision-making.</li>
              <li>Right to complain to the UAE Data Office.</li>
            </ul>

            <h3 className="text-xl text-[#29dd3b] mt-6 mb-3">C. For EU & California Users</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>GDPR:</strong> Right to data portability, erasure ("right to be forgotten").</li>
              <li><strong>CCPA:</strong> Right to opt out of data sales (if applicable).</li>
            </ul>
            <p>To exercise rights, contact: <a href="mailto:privacy@napptix.com" className="text-[#29dd3b] hover:underline">privacy@napptix.com</a></p>

            <h2 className="text-2xl font-disket text-white mt-8 mb-4">8. COOKIES & TRACKING TECHNOLOGIES</h2>
            <p>We use cookies, pixels, and SDKs for analytics and ads.</p>
            <p>You can manage preferences via browser settings or our Cookie Consent Banner.</p>
            <p className="text-sm text-gray-400">(India's DPDPA requires explicit consent for tracking.)</p>

            <h2 className="text-2xl font-disket text-white mt-8 mb-4">9. INTERNATIONAL DATA TRANSFERS</h2>
            <p>Data may be stored in UAE, India, or other jurisdictions.</p>
            <p>We ensure safeguards (e.g., UAE DPL adequacy decisions, DPDPA-approved contracts).</p>

            <h2 className="text-2xl font-disket text-white mt-8 mb-4">10. CHILDREN'S PRIVACY</h2>
            <p>We do not knowingly collect data from children under 18 (UAE) or minors under 18 (India) without parental consent.</p>

            <h2 className="text-2xl font-disket text-white mt-8 mb-4">11. DATA SECURITY MEASURES</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encryption (SSL/TLS), access controls, regular audits.</li>
              <li>Compliance with UAE's National Cybersecurity Strategy and India's IT Act, 2000.</li>
            </ul>

            <h2 className="text-2xl font-disket text-white mt-8 mb-4">12. CHANGES TO THIS POLICY</h2>
            <p>Updates will be posted on this page with a revised "Last Updated" date.</p>

            <h2 className="text-2xl font-disket text-white mt-8 mb-4">13. CONTACT & GRIEVANCE OFFICER</h2>
            <p>For questions, requests, or complaints:</p>
            <ul className="space-y-2">
              <li>Email: <a href="mailto:contact@napptix.com" className="text-[#29dd3b] hover:underline">contact@napptix.com</a></li>
              <li>Address: [Insert Registered Office Address in UAE]</li>
            </ul>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
