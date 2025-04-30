
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

// News items data - same as in News.tsx
const newsItems = [
  {
    id: "news-1",
    date: "April 28, 2025",
    title: "Napptix Acquires Yezel Technologies 🚀",
    content: "In a groundbreaking move, Napptix has acquired Yezel Technologies, combining our innovative ad platform with Yezel's cutting-edge AI capabilities. This strategic merger promises to transform the gaming advertising landscape.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1470&fit=crop",
    fullContent: `
      <p>In a groundbreaking move that's set to reshape the gaming advertising landscape, Napptix has officially acquired Yezel Technologies in a deal worth $120 million.</p>
      
      <p>This strategic acquisition combines Napptix's innovative advertising platform with Yezel's cutting-edge AI capabilities, creating what industry analysts are already calling "a powerhouse in the gaming monetization space."</p>
      
      <p>Yezel Technologies, known for its proprietary machine learning algorithms that predict player engagement patterns, will integrate its technology directly into the Napptix ecosystem, enhancing ad targeting accuracy by an estimated 47% according to preliminary tests.</p>
      
      <p>"This merger represents the perfect synergy between advanced advertising technology and sophisticated AI," said Napptix CEO in the announcement. "Game developers and publishers using our platform will immediately benefit from more relevant ad placements and higher engagement rates."</p>
      
      <p>The acquisition includes Yezel's entire engineering team of 35 AI specialists who will join Napptix's growing technology division. The integration process is expected to be completed within 90 days, with initial enhanced features rolling out to premium clients next month.</p>
      
      <p>Industry experts have responded positively to the news, with several major game studios already expressing interest in the expanded capabilities this merger will bring to the Napptix platform.</p>
    `
  },
  {
    id: "news-2",
    date: "April 20, 2025",
    title: "Expanding Our Global Presence 🌎",
    content: "We're excited to announce the opening of our new offices in Singapore and Dubai, strengthening our presence in key gaming markets across Asia and the Middle East.",
    image: "https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?q=80&w=1471&fit=crop",
    fullContent: `
      <p>Napptix is proud to announce the official opening of our new regional headquarters in Singapore and Dubai, marking a significant milestone in our global expansion strategy.</p>
      
      <p>These new offices will serve as strategic hubs for our operations across Asia Pacific and the Middle East & North Africa regions, two of the fastest-growing markets in the global gaming industry.</p>
      
      <p>The Singapore office, located in the vibrant Fusionopolis tech hub, will house over 50 employees focusing on partnerships with mobile game developers across Southeast Asia, South Korea, Japan, and Australia.</p>
      
      <p>Meanwhile, our Dubai office in Internet City will serve as the base for our 35-person team working with publishers and advertisers across MENA regions, where mobile gaming revenue has grown by 152% over the past three years.</p>
      
      <p>"These expansions allow us to provide localized support and build deeper relationships with developers and advertisers in regions that are critical to the future of gaming," said our Chief Operating Officer. "We're particularly excited about the opportunities in markets like India, Indonesia, Saudi Arabia, and the UAE."</p>
      
      <p>Both offices are now fully operational and have already secured partnerships with several major regional game publishers that will be announced in the coming weeks.</p>
    `
  },
  {
    id: "news-3",
    date: "April 15, 2025",
    title: "Partnership with Major Game Studios 🎯",
    content: "Napptix has secured partnerships with five major game studios, expanding our reach to over 100 million active players worldwide.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1470&fit=crop",
    fullContent: `
      <p>Napptix is thrilled to announce strategic partnerships with five major game studios, dramatically expanding our ad network's reach to over 100 million active players worldwide.</p>
      
      <p>The partnerships include exclusive multi-year agreements with GalaxyPlay Games, Titan Interactive, Nova Entertainment, Quantum Studios, and Stellar Game Works – collectively responsible for some of the most popular mobile and PC games on the market.</p>
      
      <p>"Integrating our advertising technology across these studios' combined portfolio of 74 active titles represents a quantum leap for our platform," said our Head of Partnerships. "This isn't just about expanding reach – these partnerships allow us to pioneer new forms of non-intrusive, highly engaging ad experiences."</p>
      
      <p>The deals include implementing Napptix's full suite of ad products, from our flagship "WizoraDynamics" solution to our recently launched "ProGameX" esports tournament integration system.</p>
      
      <p>Game players will begin seeing the enhanced advertising experiences roll out gradually over the next three months, with full implementation expected by Q3 2025.</p>
      
      <p>Early beta testing with select titles has already shown a 78% increase in player engagement with ads and a 42% higher conversion rate compared to traditional in-game advertising methods.</p>
    `
  },
  {
    id: "news-4",
    date: "April 10, 2025",
    title: "Revolutionary AI Technology Integration 🤖",
    content: "Our new AI-powered targeting system has shown a 300% improvement in ad engagement rates across all gaming platforms.",
    image: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=1470&fit=crop",
    fullContent: `
      <p>Napptix has successfully completed the integration of our revolutionary AI-powered targeting system across all supported gaming platforms, delivering unprecedented improvements in advertising performance.</p>
      
      <p>Initial data from the rollout shows an astounding 300% improvement in ad engagement rates compared to conventional targeting methods, with conversion rates increasing by an average of 215% across all game categories.</p>
      
      <p>The new system, developed internally by our AI research division, uses proprietary machine learning algorithms to analyze player behavior patterns in real-time, creating highly personalized advertising experiences that naturally complement gameplay.</p>
      
      <p>"What makes our approach unique is that the AI doesn't just look at basic metrics like player demographics or in-game purchases," explained our Chief Technology Officer. "It understands the emotional journey of the player through the game and predicts optimal moments for brand engagement without disrupting immersion."</p>
      
      <p>The technology has been particularly effective in open-world and simulation games, where engagement rates have seen increases of up to 420% in some titles.</p>
      
      <p>Several major brands using our platform have already reported significant improvements in campaign performance, with one leading sportswear company noting that their cost-per-acquisition has decreased by 68% while maintaining the same ad spend.</p>
    `
  },
  {
    id: "news-5",
    date: "April 5, 2025",
    title: "Industry Award Recognition 🏆",
    content: "Napptix has been recognized as the 'Most Innovative Ad Tech Company' at the Global Gaming Awards 2025.",
    image: "https://images.unsplash.com/photo-1643101452019-bc00c9bba76b?q=80&w=1498&fit=crop",
    fullContent: `
      <p>Napptix is proud to announce that we have been named 'Most Innovative Ad Tech Company' at the prestigious Global Gaming Awards 2025, recognizing our groundbreaking contributions to the gaming industry.</p>
      
      <p>The award, presented at a gala ceremony in Las Vegas attended by over 800 industry leaders, celebrates companies pushing the boundaries of what's possible in gaming technology and experiences.</p>
      
      <p>The judging panel, consisting of 30 C-level executives from major game publishers, technology companies, and investment firms, cited Napptix's "revolutionary approach to non-intrusive monetization" and "commitment to enhancing rather than interrupting the player experience" as key factors in their decision.</p>
      
      <p>"This recognition validates our core philosophy that advertising can and should be a positive element of the gaming ecosystem," said our founder in the acceptance speech. "We've always believed that the future of gaming monetization lies in creating value for all stakeholders – developers, advertisers, and most importantly, players."</p>
      
      <p>The award comes after a year of significant innovation at Napptix, including the launch of our contextual targeting system, the expansion of our interactive ad formats, and the introduction of our analytics platform that offers unprecedented insights into player engagement.</p>
      
      <p>This is the second major industry accolade for Napptix this year, following our recognition as a "Technology Pioneer" by the World Economic Forum in January.</p>
    `
  }
];

const NewsArticle = () => {
  const { id } = useParams();
  const article = newsItems.find(item => item.id === id);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!article) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="container mx-auto pt-32 pb-20 px-4">
          <h1 className="text-4xl font-syne font-bold text-white mb-8 text-center">
            Article Not Found
          </h1>
          <div className="flex justify-center">
            <Link to="/news" className="text-[#29dd3b] hover:underline flex items-center">
              <ArrowLeft className="mr-2" size={20} />
              Back to News
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="container mx-auto pt-32 pb-20 px-4">
        <Link to="/news" className="text-[#29dd3b] hover:underline flex items-center mb-8">
          <ArrowLeft className="mr-2" size={20} />
          Back to News
        </Link>
        
        <article className="max-w-4xl mx-auto">
          <div className="mb-4">
            <span className="text-[#29dd3b] text-sm font-syne">{article.date}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-syne font-bold text-white mb-8">
            {article.title}
          </h1>
          
          {article.image && (
            <div className="mb-8 overflow-hidden rounded-lg">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-96 object-cover"
              />
            </div>
          )}
          
          <div 
            className="prose prose-invert prose-lg max-w-none font-grandview"
            dangerouslySetInnerHTML={{ __html: article.fullContent }}
          />
        </article>
      </div>
      <Footer />
    </div>
  );
};

export default NewsArticle;
