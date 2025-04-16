
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const CaseStudiesPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const caseStudies = [
    {
      title: "GameRush Energy",
      industry: "Energy Drinks",
      image: "https://images.unsplash.com/photo-1536147116438-62679a5e01f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      challenge: "Needed to reach Gen Z gamers with authentic brand integration",
      solution: "Implemented in-game branded power-ups in top mobile racing games",
      results: [
        "50% increase in brand recall among 18-24 demographic",
        "2.3M unique impressions in first month",
        "37% sales lift in target markets"
      ]
    },
    {
      title: "TechGiant Mobile",
      industry: "Smartphones",
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      challenge: "Launch new smartphone model to tech-savvy gaming audience",
      solution: "Created virtual product showcases within popular open-world games",
      results: [
        "200% higher click-through rate vs. traditional digital ads",
        "85% of engaged users visited product landing page",
        "42% increase in pre-orders attributed to campaign"
      ]
    },
    {
      title: "StreamFlix",
      industry: "Entertainment",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      challenge: "Promote new sci-fi series to relevant gaming audiences",
      solution: "Integrated themed content and exclusive previews in sci-fi games",
      results: [
        "68% conversion rate from ad to trailer views",
        "3.2M in-game viewership minutes across platforms",
        "Series became #1 streaming debut that quarter"
      ]
    },
    {
      title: "SportMax Gear",
      industry: "Athletic Apparel",
      image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      challenge: "Connect with esports fans and legitimize brand in gaming space",
      solution: "Sponsored major tournament with branded virtual items and real-world prizes",
      results: [
        "4x brand recall compared to standard display advertising",
        "310% ROI on tournament sponsorship investment",
        "97,000 branded virtual items claimed in-game"
      ]
    },
    {
      title: "FastFood Chain",
      industry: "Quick Service Restaurants",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      challenge: "Drive app downloads and digital orders from gaming audience",
      solution: "In-game rewards program linking gameplay achievements to food rewards",
      results: [
        "1.2M app downloads attributed to campaign",
        "76% of participants redeemed at least one reward",
        "Average order value 28% higher than standard app users"
      ]
    },
    {
      title: "AutoLuxe",
      industry: "Automotive",
      image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      challenge: "Introduce new sports car model to younger demographic",
      solution: "Exclusive in-game driving experience in premium racing games",
      results: [
        "6.7M virtual test drives completed",
        "25,000 qualified leads generated for dealerships",
        "187% increase in website configuration tool usage"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Case Studies
            </h1>
            <p className="text-napptix-light-grey font-roboto-mono text-xl mb-8">
              Real results from brands who have transformed their advertising strategy with Napptix.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Case Studies Grid */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                className="bg-napptix-dark rounded-xl overflow-hidden border border-napptix-grey/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="h-64 relative">
                  <img 
                    src={study.image}
                    alt={study.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white">{study.title}</h3>
                    <p className="text-[#29dd3b]">{study.industry}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="text-white font-bold mb-2">Challenge:</h4>
                    <p className="text-napptix-light-grey font-roboto-mono">{study.challenge}</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-white font-bold mb-2">Solution:</h4>
                    <p className="text-napptix-light-grey font-roboto-mono">{study.solution}</p>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2">Results:</h4>
                    <ul className="text-napptix-light-grey font-roboto-mono list-disc pl-5 space-y-1">
                      {study.results.map((result, i) => (
                        <li key={i}>{result}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="mt-6 bg-[#29dd3b] text-black hover:bg-[#29dd3b]/90">
                    Read Full Case Study
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Write Your Own Success Story?</h2>
          <p className="text-napptix-light-grey font-roboto-mono mb-8 max-w-xl mx-auto">
            Join these innovative brands who transformed their advertising strategy with Napptix
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#29dd3b] text-black hover:bg-[#29dd3b]/90">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="border-[#29dd3b]/50 text-[#29dd3b] hover:bg-[#29dd3b]/10">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CaseStudiesPage;
