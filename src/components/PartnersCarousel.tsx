
import React from 'react';
import { Card } from '@/components/ui/card';

// Sample client and partner logos - normally these would be imported images
const clientLogos = [
  { id: 1, name: "Gaming Studio 1", logo: "GS1" },
  { id: 2, name: "Publisher X", logo: "PX" },
  { id: 3, name: "Game Dev Co", logo: "GDC" },
  { id: 4, name: "Interactive Inc", logo: "II" },
  { id: 5, name: "Digital Games", logo: "DG" },
  { id: 6, name: "Pixel Studios", logo: "PS" },
  { id: 7, name: "Gameverse", logo: "GV" },
  { id: 8, name: "Virtual Play", logo: "VP" },
];

const partnerLogos = [
  { id: 1, name: "Tech Partner 1", logo: "TP1" },
  { id: 2, name: "Ad Network X", logo: "ANX" },
  { id: 3, name: "Marketing Co", logo: "MC" },
  { id: 4, name: "Media Group", logo: "MG" },
  { id: 5, name: "Adtech Solutions", logo: "AS" },
  { id: 6, name: "Data Analytics", logo: "DA" },
  { id: 7, name: "Platform Services", logo: "PS" },
  { id: 8, name: "Global Reach", logo: "GR" },
];

// Function to duplicate arrays for continuous carousel
const duplicateForCarousel = (items: any[]) => [...items, ...items];

const PartnersCarousel: React.FC = () => {
  const clients = duplicateForCarousel(clientLogos);
  const partners = duplicateForCarousel(partnerLogos);

  return (
    <section className="py-16 bg-napptix-dark relative overflow-hidden">
      <div className="container mx-auto mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Our Clients & Partners</h2>
        <p className="text-napptix-light-grey max-w-2xl mx-auto">
          Trusted by industry leaders in gaming and advertising
        </p>
      </div>
      
      {/* First carousel (clients) - moving left */}
      <div className="relative overflow-hidden py-4 mb-8">
        <div className="flex animate-carousel-left">
          {clients.map((client, index) => (
            <Card 
              key={`${client.id}-${index}`} 
              className="highlight-border mx-4 w-40 h-24 flex-shrink-0 flex items-center justify-center bg-napptix-grey/30 border-napptix-grey/20 cursor-pointer transition-all duration-300 hover:bg-napptix-grey/50"
            >
              <div className="font-montserrat font-bold text-2xl text-gradient">
                {client.logo}
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Second carousel (partners) - moving right */}
      <div className="relative overflow-hidden py-4">
        <div className="flex animate-carousel-right">
          {partners.map((partner, index) => (
            <Card 
              key={`${partner.id}-${index}`}
              className="highlight-border mx-4 w-40 h-24 flex-shrink-0 flex items-center justify-center bg-napptix-grey/30 border-napptix-grey/20 cursor-pointer transition-all duration-300 hover:bg-napptix-grey/50"
            >
              <div className="font-montserrat font-bold text-2xl text-gradient">
                {partner.logo}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersCarousel;
