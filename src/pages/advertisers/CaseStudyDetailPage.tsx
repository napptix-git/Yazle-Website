
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Award, BarChart3, TrendingUp } from 'lucide-react';

const CaseStudyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Case studies data
  const caseStudies = [
    {
      slug: "gamerush-energy",
      title: "GameRush Energy",
      industry: "Energy Drinks",
      image: "https://images.unsplash.com/photo-1536147116438-62679a5e01f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      challenge: "GameRush Energy needed to reach Gen Z gamers with authentic brand integration that wouldn't feel like traditional advertising.",
      solution: "We implemented branded power-ups in top mobile racing games that players could collect during gameplay. The power-ups featured the GameRush logo and provided in-game speed boosts, creating a natural connection between the product benefit and gameplay mechanics.",
      results: [
        "50% increase in brand recall among 18-24 demographic",
        "2.3M unique impressions in first month",
        "37% sales lift in target markets",
        "85% positive sentiment in player feedback"
      ],
      testimonial: {
        quote: "The integration was seamless and the results exceeded our expectations. We've never seen this level of engagement with our Gen Z audience before.",
        author: "Sarah Johnson",
        title: "Marketing Director, GameRush Energy"
      },
      approach: [
        "Identified racing games with high Gen Z audience overlap",
        "Created custom branded power-up items that enhanced gameplay",
        "Implemented natural collection mechanics that didn't interrupt flow",
        "Tracked real-time performance data to optimize placements"
      ]
    },
    {
      slug: "techgiant-mobile",
      title: "TechGiant Mobile",
      industry: "Smartphones",
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      challenge: "TechGiant needed to launch their new smartphone model to tech-savvy gaming audiences who were increasingly skeptical of traditional advertising.",
      solution: "We created interactive virtual product showcases within popular open-world games, allowing players to test the phone's unique features in a virtual environment before seeing calls-to-action for the real product.",
      results: [
        "200% higher click-through rate vs. traditional digital ads",
        "85% of engaged users visited product landing page",
        "42% increase in pre-orders attributed to campaign",
        "15% higher average order value from game-driven traffic"
      ],
      testimonial: {
        quote: "The ability to let gamers 'try' our phone virtually created a level of engagement we couldn't achieve through any other advertising channel.",
        author: "Michael Chen",
        title: "VP of Digital Marketing, TechGiant"
      },
      approach: [
        "Developed detailed 3D models of the smartphone for in-game exploration",
        "Created interactive mini-games showcasing key phone features",
        "Implemented tracking to measure engagement throughout the funnel",
        "Optimized placement in games with highest tech enthusiast audience"
      ]
    }
  ];
  
  // Find the case study that matches the slug
  const caseStudy = caseStudies.find(study => study.slug === slug);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!caseStudy) {
      // Redirect to case studies page if slug doesn't match any case study
      navigate('/advertisers/case-studies');
    }
  }, [slug, caseStudy, navigate]);
  
  if (!caseStudy) {
    return null; // Don't render anything while redirecting
  }
  
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              className="text-white hover:text-[#29dd3b]"
              onClick={() => navigate('/advertisers/case-studies')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Case Studies
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {caseStudy.title}
              </h1>
              <p className="text-[#29dd3b] text-xl mb-6">
                {caseStudy.industry}
              </p>
            </motion.div>
            
            <div className="rounded-xl overflow-hidden h-64 md:h-80">
              <img 
                src={caseStudy.image} 
                alt={caseStudy.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Case Study Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-napptix-dark rounded-xl p-6 border border-napptix-grey/20 flex flex-col items-center text-center">
              <div className="bg-black w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-[#29dd3b]" />
              </div>
              <h3 className="text-white font-bold mb-2">Challenge</h3>
              <p className="text-napptix-light-grey text-sm">What we needed to solve</p>
            </div>
            
            <div className="bg-napptix-dark rounded-xl p-6 border border-napptix-grey/20 flex flex-col items-center text-center">
              <div className="bg-black w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-[#29dd3b]" />
              </div>
              <h3 className="text-white font-bold mb-2">Solution</h3>
              <p className="text-napptix-light-grey text-sm">How we approached it</p>
            </div>
            
            <div className="bg-napptix-dark rounded-xl p-6 border border-napptix-grey/20 flex flex-col items-center text-center">
              <div className="bg-black w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-[#29dd3b]" />
              </div>
              <h3 className="text-white font-bold mb-2">Results</h3>
              <p className="text-napptix-light-grey text-sm">What we achieved</p>
            </div>
          </div>
          
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Challenge</h2>
              <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
                <p className="text-napptix-light-grey">
                  {caseStudy.challenge}
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Solution</h2>
              <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
                <p className="text-napptix-light-grey">
                  {caseStudy.solution}
                </p>
                
                <h3 className="text-xl font-bold text-white mt-6 mb-3">Our Approach:</h3>
                <ul className="list-disc pl-5 text-napptix-light-grey space-y-2">
                  {caseStudy.approach.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Results</h2>
              <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
                <ul className="text-napptix-light-grey list-disc pl-5 space-y-3">
                  {caseStudy.results.map((result, index) => (
                    <li key={index} className="text-lg">{result}</li>
                  ))}
                </ul>
                
                <div className="mt-8 p-5 bg-black rounded-lg border border-napptix-grey/20 italic">
                  <p className="text-white mb-4">"{caseStudy.testimonial.quote}"</p>
                  <p className="text-napptix-light-grey">- {caseStudy.testimonial.author}, {caseStudy.testimonial.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to create your success story?</h2>
          
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

export default CaseStudyDetailPage;
