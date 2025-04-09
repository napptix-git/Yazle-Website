import React, { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CountUpMetric from '@/components/CountUpMetric';
import {
  Gamepad,
  MonitorPlay,
  Globe,
  Trophy,
  BarChart3,
  Target,
  GlobeIcon,
  ShieldCheck,
  Play
} from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

gsap.registerPlugin(ScrollTrigger);

const adFormats = [
  {
    title: "In-Game Ads",
    description: "Native ad placements within the gaming environment that feel like a natural part of the experience.",
    icon: <Gamepad className="h-10 w-10 text-[#29dd3b]" />,
    demo: "#"
  },
  {
    title: "On-Game Interface",
    description: "Strategic ad placements around the game interface, loading screens, and menus.",
    icon: <MonitorPlay className="h-10 w-10 text-[#29dd3b]" />,
    demo: "#"
  },
  {
    title: "Off-Game Notifications",
    description: "Extend your reach beyond gameplay through our network of gaming content platforms.",
    icon: <Globe className="h-10 w-10 text-[#29dd3b]" />,
    demo: "#"
  },
  {
    title: "Pro Game Experiences",
    description: "Specialized solutions for esports events, tournaments, and professional gaming streams.",
    icon: <Trophy className="h-10 w-10 text-[#29dd3b]" />,
    demo: "#"
  }
];

const benefits = [
  {
    title: "Real-Time Analytics",
    description: "Track campaigns in real-time with comprehensive dashboards and detailed metrics.",
    icon: <BarChart3 className="h-8 w-8 text-[#29dd3b]" />
  },
  {
    title: "Hyper-Targeted Reach",
    description: "Target specific demographics based on gameplay preferences and behaviors.",
    icon: <Target className="h-8 w-8 text-[#29dd3b]" />
  },
  {
    title: "Global Inventory Access",
    description: "Access gaming inventory across multiple regions, platforms and demographics.",
    icon: <GlobeIcon className="h-8 w-8 text-[#29dd3b]" />
  },
  {
    title: "Brand Safety by Design",
    description: "AI-powered content filtering ensures your ads appear in suitable contexts.",
    icon: <ShieldCheck className="h-8 w-8 text-[#29dd3b]" />
  }
];

const caseStudies = [
  {
    brand: "GameRush Energy",
    logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    summary: "50% increase in conversion rates through targeted in-game placements",
    stats: {
      ctr: "7.8%",
      roi: "340%",
      impressions: "12M+"
    }
  },
  {
    brand: "TechGiant Mobile",
    logo: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    summary: "Achieved 200% higher engagement versus traditional mobile advertising",
    stats: {
      ctr: "9.2%",
      roi: "280%",
      impressions: "8M+"
    }
  },
  {
    brand: "StreamFlix",
    logo: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    summary: "Integrated subscription offering within games led to 68% conversion lift",
    stats: {
      ctr: "5.4%",
      roi: "195%",
      impressions: "15M+"
    }
  },
  {
    brand: "SportMax Gear",
    logo: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    summary: "Esports tournament sponsorship delivered 4x brand recall versus display ads",
    stats: {
      ctr: "6.9%",
      roi: "310%",
      impressions: "5M+"
    }
  }
];

const testimonials = [
  {
    company: "GameVerse Studios",
    quote: "Napptix helped us achieve a 3x increase in ad revenue without compromising player experience.",
    author: "Alex Chen, Monetization Director",
    logo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
  },
  {
    company: "AdTech Innovations",
    quote: "The targeting capabilities allowed us to reach gamers with precision we couldn't find elsewhere.",
    author: "Sarah Johnson, CMO",
    logo: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
  },
  {
    company: "Immersive Media",
    quote: "Our clients consistently see 40% higher engagement through Napptix's in-game placements.",
    author: "David Park, Agency Lead",
    logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
  }
];

const Advertisers: React.FC = () => {
  const sectionRefs = {
    stats: useRef<HTMLDivElement>(null),
    chart: useRef<HTMLDivElement>(null)
  };
  const [barsAnimated, setBarsAnimated] = useState(false);

  useEffect(() => {
    // Animation for the performance chart
    if (sectionRefs.chart.current) {
      const ctx = gsap.context(() => {
        const trigger = ScrollTrigger.create({
          trigger: sectionRefs.chart.current,
          start: "top 80%",
          onEnter: () => {
            if (!barsAnimated) {
              animateBars();
              setBarsAnimated(true);
            }
          },
          onEnterBack: () => {
            if (!barsAnimated) {
              animateBars();
              setBarsAnimated(true);
            }
          }
        });

        return () => {
          trigger.kill();
        };
      }, sectionRefs.chart);

      const animateBars = () => {
        gsap.from(".chart-bar", {
          height: 0,
          duration: 1.5,
          ease: "power3.out",
          stagger: 0.2,
        });
      };

      return () => ctx.revert();
    }
  }, [barsAnimated]);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Section 1: Hero Section */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Reach Millions of Engaged Gamers Worldwide
              </motion.h1>
              <motion.p 
                className="text-napptix-light-grey text-xl font-roboto-mono"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Powering ad experiences that are immersive, measurable, and brand-safe.
              </motion.p>
            </div>
            
            <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden border border-napptix-grey/20">
              <div className="absolute inset-0 bg-gradient-to-br from-napptix-dark/80 via-transparent to-[#29dd3b]/20 z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Gaming Ad Experience" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Section 2: Our Reach & Impact */}
      <section className="py-16 bg-napptix-dark" ref={sectionRefs.stats}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Our Reach & Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8">
            <div className="flex flex-col justify-center">
              <div className="flex items-start gap-4">
                <div className="bg-black rounded-full p-3">
                  <Globe className="h-8 w-8 text-[#29dd3b]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Monthly Active Users</h3>
                  <p className="text-napptix-light-grey font-roboto-mono">
                    Unique gamers across our network each month
                  </p>
                </div>
              </div>
            </div>
            <div>
              <CountUpMetric 
                end={250} 
                duration={2000} 
                suffix="M+" 
                title="" 
                description=""
                className="text-5xl md:text-6xl font-bold text-[#29dd3b]"
              />
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="flex items-start gap-4">
                <div className="bg-black rounded-full p-3">
                  <BarChart3 className="h-8 w-8 text-[#29dd3b]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Ad Revenue Generated</h3>
                  <p className="text-napptix-light-grey font-roboto-mono">
                    Total revenue for our advertising partners in 2023
                  </p>
                </div>
              </div>
            </div>
            <div>
              <CountUpMetric 
                end={180} 
                duration={2000} 
                prefix="$" 
                suffix="M" 
                title="" 
                description=""
                className="text-5xl md:text-6xl font-bold text-[#29dd3b]"
              />
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="flex items-start gap-4">
                <div className="bg-black rounded-full p-3">
                  <Target className="h-8 w-8 text-[#29dd3b]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Brand Recall</h3>
                  <p className="text-napptix-light-grey font-roboto-mono">
                    Average brand recall rate for ads on our platform
                  </p>
                </div>
              </div>
            </div>
            <div>
              <CountUpMetric 
                end={94} 
                duration={2000} 
                suffix="%" 
                title="" 
                description=""
                className="text-5xl md:text-6xl font-bold text-[#29dd3b]"
              />
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="flex items-start gap-4">
                <div className="bg-black rounded-full p-3">
                  <Trophy className="h-8 w-8 text-[#29dd3b]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Active Campaigns</h3>
                  <p className="text-napptix-light-grey font-roboto-mono">
                    Concurrent advertising campaigns running globally
                  </p>
                </div>
              </div>
            </div>
            <div>
              <CountUpMetric 
                end={5200} 
                duration={2000} 
                suffix="+" 
                title="" 
                description=""
                className="text-5xl md:text-6xl font-bold text-[#29dd3b]"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Section 3: Ad Format Showcase */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Ad Format Showcase</h2>
          <p className="text-napptix-light-grey font-roboto-mono text-center mb-12 max-w-2xl mx-auto">
            Engage gamers with our diverse ad formats, each designed for maximum impact with minimal disruption
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adFormats.map((format, index) => (
              <motion.div
                key={index}
                className="bg-napptix-dark rounded-xl p-6 border border-napptix-grey/20 hover:border-[#29dd3b]/50 transition-all duration-300 h-[280px] flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, boxShadow: '0 8px 30px rgba(41, 221, 59, 0.15)' }}
              >
                <div>
                  <div className="mb-4 bg-black w-16 h-16 rounded-full flex items-center justify-center">
                    {format.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{format.title}</h3>
                  <p className="text-napptix-light-grey font-roboto-mono text-sm">
                    {format.description}
                  </p>
                </div>
                
                <Button variant="outline" size="sm" className="mt-4 w-full border-[#29dd3b]/50 text-[#29dd3b] hover:bg-[#29dd3b]/10">
                  View Demo
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Section 4: Why Choose Napptix */}
      <section className="py-16 bg-napptix-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Why Choose Napptix?</h2>
          <p className="text-napptix-light-grey font-roboto-mono text-center mb-12 max-w-2xl mx-auto">
            Our platform offers unique advantages that drive measurable results for advertisers
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                className="bg-black p-6 rounded-xl border border-napptix-grey/20 flex items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="bg-napptix-dark/50 rounded-full p-3 flex-shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-napptix-light-grey font-roboto-mono">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Section 5: Case Study Highlights */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Case Study Highlights</h2>
          <p className="text-napptix-light-grey font-roboto-mono text-center mb-12 max-w-2xl mx-auto">
            Success stories from brands who've leveraged our platform
          </p>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {caseStudies.map((study, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-napptix-dark border-napptix-grey/20 h-full">
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-black/20 flex-shrink-0">
                        <img src={study.logo} alt={study.brand} className="w-full h-full object-cover" />
                      </div>
                      <CardTitle className="text-white">{study.brand}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-napptix-light-grey font-roboto-mono mb-4">{study.summary}</p>
                      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-napptix-grey/20">
                        <div>
                          <p className="text-sm text-napptix-light-grey">CTR</p>
                          <p className="text-lg font-bold text-[#29dd3b]">{study.stats.ctr}</p>
                        </div>
                        <div>
                          <p className="text-sm text-napptix-light-grey">ROI</p>
                          <p className="text-lg font-bold text-[#29dd3b]">{study.stats.roi}</p>
                        </div>
                        <div>
                          <p className="text-sm text-napptix-light-grey">Impressions</p>
                          <p className="text-lg font-bold text-[#29dd3b]">{study.stats.impressions}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full border-[#29dd3b]/50 text-[#29dd3b] hover:bg-[#29dd3b]/10">
                        See Full Story
                      </Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-4">
              <CarouselPrevious className="relative static left-0 translate-y-0 bg-black/60 hover:bg-black/80 border-napptix-grey/30 text-white" />
              <CarouselNext className="relative static right-0 translate-y-0 bg-black/60 hover:bg-black/80 border-napptix-grey/30 text-white" />
            </div>
          </Carousel>
        </div>
      </section>
      
      {/* Section 6: Analytics Breakdown */}
      <section className="py-16 bg-napptix-dark" ref={sectionRefs.chart}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Analytics Breakdown</h2>
          <p className="text-napptix-light-grey font-roboto-mono text-center mb-12 max-w-2xl mx-auto">
            Performance comparison between Napptix and traditional ad platforms
          </p>
          
          <div className="relative h-[300px] md:h-[400px] p-6 border border-napptix-grey/20 rounded-xl bg-black">
            <div className="absolute bottom-0 w-full max-w-4xl mx-auto left-0 right-0 px-8 pb-8">
              <div className="relative h-[280px] flex items-end justify-around gap-4">
                <div className="absolute bottom-0 left-0 right-0 h-px bg-napptix-grey/20"></div>
                
                <div className="w-16 flex flex-col items-center">
                  <div 
                    className="chart-bar w-full bg-[#29dd3b]/80 rounded-t-md"
                    style={{ height: '60%' }}
                  ></div>
                  <p className="mt-2 text-napptix-light-grey text-sm">CTR</p>
                  <p className="text-white font-bold">Traditional</p>
                </div>
                
                <div className="w-16 flex flex-col items-center">
                  <div 
                    className="chart-bar w-full bg-[#29dd3b] rounded-t-md"
                    style={{ height: '85%' }}
                  ></div>
                  <p className="mt-2 text-napptix-light-grey text-sm">CTR</p>
                  <p className="text-white font-bold">Napptix</p>
                </div>
                
                <div className="w-16 flex flex-col items-center">
                  <div 
                    className="chart-bar w-full bg-[#29dd3b]/80 rounded-t-md"
                    style={{ height: '40%' }}
                  ></div>
                  <p className="mt-2 text-napptix-light-grey text-sm">Engagement</p>
                  <p className="text-white font-bold">Traditional</p>
                </div>
                
                <div className="w-16 flex flex-col items-center">
                  <div 
                    className="chart-bar w-full bg-[#29dd3b] rounded-t-md"
                    style={{ height: '90%' }}
                  ></div>
                  <p className="mt-2 text-napptix-light-grey text-sm">Engagement</p>
                  <p className="text-white font-bold">Napptix</p>
                </div>
                
                <div className="w-16 flex flex-col items-center">
                  <div 
                    className="chart-bar w-full bg-[#29dd3b]/80 rounded-t-md"
                    style={{ height: '45%' }}
                  ></div>
                  <p className="mt-2 text-napptix-light-grey text-sm">Recall</p>
                  <p className="text-white font-bold">Traditional</p>
                </div>
                
                <div className="w-16 flex flex-col items-center">
                  <div 
                    className="chart-bar w-full bg-[#29dd3b] rounded-t-md"
                    style={{ height: '80%' }}
                  ></div>
                  <p className="mt-2 text-napptix-light-grey text-sm">Recall</p>
                  <p className="text-white font-bold">Napptix</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section 7: Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">What Our Partners Say</h2>
          <p className="text-napptix-light-grey font-roboto-mono text-center mb-12 max-w-2xl mx-auto">
            Hear from brands and agencies who've partnered with us
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-black/20">
                    <img src={testimonial.logo} alt={testimonial.company} className="w-full h-full object-cover" />
                  </div>
                  <p className="font-bold text-white">{testimonial.company}</p>
                </div>
                <p className="text-napptix-light-grey font-roboto-mono italic mb-4">"{testimonial.quote}"</p>
                <p className="text-white text-sm">{testimonial.author}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center items-center mt-12 gap-8">
            <div className="p-4 bg-black/50 rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80" 
                alt="Partner 1" 
                className="h-10 w-auto filter grayscale hover:grayscale-0 transition-all duration-300" 
              />
            </div>
            <div className="p-4 bg-black/50 rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80" 
                alt="Partner 2" 
                className="h-10 w-auto filter grayscale hover:grayscale-0 transition-all duration-300" 
              />
            </div>
            <div className="p-4 bg-black/50 rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80" 
                alt="Partner 3" 
                className="h-10 w-auto filter grayscale hover:grayscale-0 transition-all duration-300" 
              />
            </div>
            <div className="p-4 bg-black/50 rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80" 
                alt="Partner 4" 
                className="h-10 w-auto filter grayscale hover:grayscale-0 transition-all duration-300" 
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Section 8: Explainer Video */}
      <section className="py-16 bg-napptix-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-napptix-grey/20">
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                <Button variant="outline" size="lg" className="rounded-full w-16 h-16 p-0 border-white/50 hover:border-[#29dd3b]/80 hover:bg-black/60 transition-all">
                  <Play className="h-8 w-8 text-white" />
                </Button>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Explainer Video" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">How Napptix Works</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-[#29dd3b] rounded-full p-1 mt-1">
                    <div className="w-2 h-2"></div>
                  </div>
                  <p className="text-napptix-light-grey font-roboto-mono">
                    Simple API integration with your existing ad stack
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-[#29dd3b] rounded-full p-1 mt-1">
                    <div className="w-2 h-2"></div>
                  </div>
                  <p className="text-napptix-light-grey font-roboto-mono">
                    Advanced audience targeting based on gameplay data
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-[#29dd3b] rounded-full p-1 mt-1">
                    <div className="w-2 h-2"></div>
                  </div>
                  <p className="text-napptix-light-grey font-roboto-mono">
                    Real-time analytics dashboard with actionable insights
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-[#29dd3b] rounded-full p-1 mt-1">
                    <div className="w-2 h-2"></div>
                  </div>
                  <p className="text-napptix-light-grey font-roboto-mono">
                    Average onboarding time of less than 7 days
                  </p>
                </li>
              </ul>
              
              <Button className="mt-8 bg-[#29dd3b] text-black hover:bg-[#29dd3b]/90">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section 9: Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Power Your Next Campaign?</h2>
          <p className="text-napptix-light-grey font-roboto-mono mb-8 max-w-xl mx-auto">
            Join hundreds of leading brands reaching millions of gamers worldwide
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#29dd3b] text-black hover:bg-[#29dd3b]/90 min-w-[180px]">
              Get in Touch
            </Button>
            <Button size="lg" variant="outline" className="border-[#29dd3b]/50 text-[#29dd3b] hover:bg-[#29dd3b]/10 min-w-[180px]">
              Request Demo
            </Button>
          </div>
          
          <p className="text-napptix-light-grey text-sm mt-8">
            Average onboarding time: 7 business days
          </p>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Advertisers;
