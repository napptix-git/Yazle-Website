import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TeamMember from '@/components/TeamMember';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  // Team member data with consistent image formats
  const teamMembers = [
    {
      name: "Alex Mercer",
      position: "Co-Founder & CEO",
      imageSrc: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374&auto=format&fit=crop",
      linkedinUrl: "https://linkedin.com/in/example",
      bgColor: "bg-[#2f2b3a]"
    },
    {
      name: "Sarah Kim",
      position: "Co-Founder & COO",
      imageSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop",
      linkedinUrl: "https://linkedin.com/in/example2",
      bgColor: "bg-[#3c2b3a]"
    },
    {
      name: "Michael Chen",
      position: "Chief Financial Officer",
      imageSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374&auto=format&fit=crop",
      linkedinUrl: "https://linkedin.com/in/example3",
      bgColor: "bg-gradient-to-br from-teal-100/20 via-rose-100/20 to-purple-100/20"
    },
    {
      name: "David Rodriguez",
      position: "Company Secretary",
      imageSrc: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1470&auto=format&fit=crop",
      linkedinUrl: "https://linkedin.com/in/example4",
      bgColor: "bg-gradient-to-br from-blue-100/20 via-green-100/20 to-yellow-100/20"
    },
    {
      name: "Jennifer Liu",
      position: "VP, Head of Strategy",
      imageSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop",
      linkedinUrl: "https://linkedin.com/in/example5",
      bgColor: "bg-gradient-to-br from-green-100/20 via-yellow-100/20 to-blue-100/20"
    },
    {
      name: "Emily Watson",
      position: "Executive Creative Director",
      imageSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1376&auto=format&fit=crop",
      linkedinUrl: "https://linkedin.com/in/example6",
      bgColor: "bg-gradient-to-br from-yellow-100/20 via-blue-100/20 to-green-100/20"
    },
    {
      name: "Natasha Patel",
      position: "Vice President, Client Services",
      imageSrc: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1374&auto=format&fit=crop",
      linkedinUrl: "https://linkedin.com/in/example7",
      bgColor: "bg-gradient-to-br from-purple-100/20 via-pink-100/20 to-indigo-100/20"
    },
    {
      name: "Robert Kim",
      position: "Director, Technology",
      imageSrc: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1399&auto=format&fit=crop",
      linkedinUrl: "https://linkedin.com/in/example8",
      bgColor: "bg-gradient-to-br from-pink-100/20 via-indigo-100/20 to-purple-100/20"
    }
  ];

  // Add more team members to reach 15 total
  const additionalMembers = [
    {
      name: "James Wilson",
      position: "VP, Product Development",
      imageSrc: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374&auto=format&fit=crop",
      linkedinUrl: "https://linkedin.com/in/example9",
      bgColor: "bg-gradient-to-br from-indigo-100/20 via-purple-100/20 to-pink-100/20"
    },
    {
      name: "Michelle Garcia",
      position: "Director, User Experience",
      imageSrc: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=1470&auto=format&fit=crop",
      linkedinUrl: "https://linkedin.com/in/example10",
      bgColor: "bg-gradient-to-br from-cyan-100/20 via-blue-100/20 to-indigo-100/20"
    },
    {
      name: "Christopher Lee",
      position: "Head of Marketing",
      imageSrc: "https://images.unsplash.com/photo-1543132220-3ec99c6094dc?q=80&w=1374&auto=format&fit=crop",
      linkedinUrl: "https://linkedin.com/in/example11",
      bgColor: "bg-gradient-to-br from-amber-100/20 via-orange-100/20 to-red-100/20"
    },
    {
      name: "Olivia Martin",
      position: "Lead Game Developer",
      imageSrc: "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?q=80&w=1453&auto=format&fit=crop",
      linkedinUrl: "https://linkedin.com/in/example12",
      bgColor: "bg-gradient-to-br from-orange-100/20 via-red-100/20 to-amber-100/20"
    },
    {
      name: "Daniel Thompson",
      position: "Director, Business Development",
      imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop",
      linkedinUrl: "https://linkedin.com/in/example13",
      bgColor: "bg-gradient-to-br from-stone-100/20 via-slate-100/20 to-zinc-100/20"
    },
    {
      name: "Sophia Zhang",
      position: "Senior Data Scientist",
      imageSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop",
      linkedinUrl: "https://linkedin.com/in/example14",
      bgColor: "bg-gradient-to-br from-emerald-100/20 via-teal-100/20 to-cyan-100/20"
    },
    {
      name: "William Clark",
      position: "Head of Customer Success",
      imageSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374&auto=format&fit=crop",
      linkedinUrl: "https://linkedin.com/in/example15",
      bgColor: "bg-gradient-to-br from-violet-100/20 via-fuchsia-100/20 to-pink-100/20"
    }
  ];

  // Combine the two arrays
  const allTeamMembers = [...teamMembers, ...additionalMembers];

  // Add animation for the team member cards with reduced delay
  useEffect(() => {
    // Initialize smooth scroll with GSAP
    const smoother = gsap.from(document.documentElement, {
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.2,
      },
      ease: "power2.out",
    });

    // Add revealing animation to each team member card with reduced delay
    const teamCards = document.querySelectorAll('.team-member-card');
    teamCards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { 
          opacity: 0, 
          y: 20 
        },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.5, // Faster duration
          delay: index * 0.05, // Much smaller delay between cards
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=50", // Trigger earlier
            toggleActions: "play none none reverse"
          },
          ease: "power1.out" // Smoother easing
        }
      );

      // Add glow animation similar to the "Gamer" text
      const nameElement = card.querySelector('.member-name');
      if (nameElement) {
        gsap.to(nameElement, {
          textShadow: "0 0 15px rgba(41, 221, 59, 0.5), 0 0 20px rgba(41, 221, 59, 0.2)",
          color: "#fff",
          repeat: -1,
          yoyo: true,
          duration: 2,
          ease: "sine.inOut"
        });
      }
    });

    return () => {
      // Clean up
      if (smoother) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);

  // Ensure navigation links scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="container mx-auto pt-32 pb-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">About Us</h1>
        <div className="text-napptix-light-grey font-roboto-mono space-y-6 max-w-3xl mx-auto">
          <p>
            Napptix is a pioneering force in the gaming advertising industry, dedicated to creating
            meaningful connections between brands and gamers through innovative advertising solutions.
          </p>
          
          <div className="mt-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-10">Our People</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {allTeamMembers.slice(0, 6).map((member, index) => (
                <div key={index} className="team-member-card h-full">
                  <TeamMember 
                    name={member.name}
                    position={member.position}
                    imageSrc={member.imageSrc}
                    linkedinUrl={member.linkedinUrl}
                    bgColor={member.bgColor}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-white mt-12 mb-6">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
              <h3 className="text-xl font-bold text-white mb-4">Innovation</h3>
              <p>We constantly push the boundaries of what's possible in gaming advertising.</p>
            </div>
            
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
              <h3 className="text-xl font-bold text-white mb-4">Integrity</h3>
              <p>We prioritize transparency and ethical practices in all our operations.</p>
            </div>
            
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
              <h3 className="text-xl font-bold text-white mb-4">Player-First</h3>
              <p>We believe that advertising should enhance, not detract from, the gaming experience.</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
