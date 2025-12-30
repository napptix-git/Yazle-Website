import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

// News items data - same as in News.tsx
const newsItems = [
  {
    id: "news-1",
    date: "April 28, 2025",
    title: "Break the Bottleneck in Interactive Ad Creation",
    content: "Traditional interactive ad production requires third-party vendors, coordination with developers, and strict templates that stifle creativity. Every tweak - whether it is changing an asset for a regional holiday or adjusting reward mechanics - can trigger a new round of tickets and approvals. Those delays cost time, budget, and often miss shifting market moments.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1470&fit=crop",
    fullContent: `
      <p>Wizora’s Self-Serve Studio
        • Game-Inspired Templates
        Choose from a growing library of classics like Pac-Man, Flappy Bird, 3D Cube or modern mini-game frameworks. Each template is fully customizable so you can match your brand look without starting from scratch.
        • Drag-and-Drop Asset Management
        Upload images, logos and audio files, then place and scale them with on-screen controls. No code required.
        • Instant Asset Replacement
        Launch a campaign in one market and swap in new visuals or messaging for another region without touching a developer ticket.
        With Wizora, you go from concept to live campaign in minutes, not weeks.

      .</p>
      
      <p>• Drag-and-Drop Asset Management
      Upload images, logos and audio files, then place and scale them with on-screen controls. No code required.
      </p>
      
      <p>• Instant Asset Replacement
      Launch a campaign in one market and swap in new visuals or messaging for another region without touching a developer ticket.
      </p>
 
    `
  },
  {
    id: "news-2",
    date: "June 19, 2025",
    title: "Yazle is acquired by Napptix to revolutionize gaming advertising!",
    content: "Playable ads deliver results because they turn passive impressions into active participation. With Wizora’s built-in analytics, you capture first-party engagement metrics the moment your campaign goes live.",
    image: "/lovable-uploads/nappYez.png",
    fullContent: `
      <p>Dubai, UAE – Napptix, the Dubai-based ad-tech innovator behind the Gaming 360° platform, has announced the successful acquisition of Yazle Marketing Management’s Middle East & North Africa (MENA) business. The deal includes Yazle’s commercial operations, client portfolio, and regional team across the Gulf and North Africa. Yazle’s businesses in Asia-Pacific, Europe, and the Americas remain under existing ownership.
      </p>
            
      <p>This strategic acquisition marks a significant milestone in Napptix’s mission to deliver context-aware, culturally relevant, and brand-safe gaming media solutions across the region. By integrating Yazle MENA’s experienced team and robust client base, Napptix further solidifies its position as the go-to GamingTech platform for brands seeking measurable, immersive, and gamer-centric advertising experiences in the MENA market.
      </p>
      
      <p>Saurabh Mehta, Co-Founder and General Manager of Napptix, described the move as more than an acquisition – “an alignment of vision” – aimed at embedding advertising within the region’s thriving gaming culture. With mobile gaming leading digital media consumption across the GCC, this partnership is poised to unlock new, emotionally intelligent ways for brands to engage Gen Z and gaming-native audiences.
      </p>
      
      <p>Yazle Co-Founder Gaurav Aidasani emphasized the opportunity for focus and expansion in other global markets, expressing confidence in Napptix’s ability to scale Yazle’s MENA operations to new heights. Jamie Atherton will continue as Managing Director of Yazle MENA, ensuring seamless transition and continued excellence in client service.
      </p>
      
      <p>As the gaming ecosystem in MENA rapidly evolves, this consolidation of strengths between two pioneering companies signals a bold new era in playable, immersive, and high-impact gaming advertising across the region.
      </p>
    
      
    `
  },
  {
    id: "news-3",
    date: "April 15, 2025",
    title: "Interactive by Design: Why the Future of Advertising Is Built for Play",
    content: "Napptix has secured partnerships with five major game studios, expanding our reach to over 100 million active players worldwide.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1470&fit=crop",
    fullContent: `
      <p>As digital media continues to fragment, one environment remains consistently immersive, engaging and scalable, gaming. But while users are spending more time than ever in game worlds, the way most brands advertise within them still relies on old habits. Static banners and unskippable pre-rolls simply don’t match the interactivity of the platform or the expectations of the audience.
      </p>
      
      <p>At Napptix, we believe the future of brand engagement isn’t just about showing up in games. It’s about showing up in ways that feel native to gameplay, interactive, rewarding and story driven. This is the era of playable marketing.
       </p>
      
      <p>From Attention to Interaction
      In traditional media, grabbing attention was enough. In gaming, attention is only the starting point. Players are not passive consumers. They are active participants, controlling characters, making choices and navigating digital environments with purpose.

        </p>
      
      <p>This shift calls for a new creative playbook. Brands must stop interrupting the experience and start enhancing it. That’s where interactive ad formats, like mini-games, branded quests and dynamic in-game features, come into focus. These aren’t just ads; they’re engagements players choose to participate in.
        </p>
      
      <p>Why Interactive Advertising Works
      Playable ads, when executed well, offer two key advantages: higher engagement and measurable performance. Players spend more time interacting with content that rewards them, whether through in-game bonuses, exclusive items or narrative relevance. That interaction creates a more memorable brand association and often leads to improved conversion rates.
      </p>

      <p>In fact, recent global studies show that playable formats can lift engagement by up to four times compared to traditional static units. Completion rates are higher. Click-throughs are more intentional. And brand recall often surpasses benchmarks in both awareness and favorability. </p>

      <p>The Napptix Approach to Participation Based Marketing
      We don’t just plug ads into games. We help brands build experiences that integrate seamlessly into the player journey. Our 360-degree gaming marketing model covers the entire spectrum, from campaign strategy and creative development to real-time deployment and optimization.
      </p>

      <p>What sets Napptix apart is our deep alignment with how gamers think and interact. Our team designs:
        •	Reward based activations that deliver value for attention
        •	Playable ad units inspired by actual game mechanics, not tacked-on novelties
        •	Immersive brand integrations that enhance, rather than interrupt, gameplay
        •	Localized storytelling that adapts globally successful campaigns for specific markets and cultural settings
        </p>

      <p> This focus on designing for interactivity, not just visibility, lets Napptix build brand presence that feels like a natural part of the gaming experience.</p>

      <p> A Global Vision with Local Precision
      Interactive advertising isn’t a trend. It’s a necessity in a medium where the user is always in control. But it’s not one size fits all. What works for a console gamer in the U.S. might not resonate with a mobile first player in Southeast Asia or a casual gamer in tier 2 India.
      </p>

      <p>That’s why Napptix tailors every campaign to the player mindset, platform norms and cultural context. Whether it’s launching a playable story for a new beverage brand in Jakarta or powering a geo targeted reward ad in Mumbai, we design with the end user in mind. </p>

      <p>Don’t Just Advertise. Participate.
      In a time when audiences can skip, scroll or shut off your message in seconds, participation is the new currency of attention. The brands that succeed in gaming are not the ones with the biggest budgets. They’re the ones that add value to the experience.
      </p>

      <p>Napptix exists to help brands create those moments, not just as a service provider, but as a creative partner that understands the rhythm of the game and the expectations of the player.
        Because in this new era of media, being seen is no longer enough. You have to be played, felt and remembered.
        </p>
      
   
    `
  },
  {
    id: "news-4",
    date: "April 10, 2025",
    title: "Beyond the Arena: How Brands Can Win Across the Competitive Gaming Ecosystem",
    content: "Building an engaging ad is only half the battle. Tracking its performance and iterating fast is where most platforms fall short.",
    image: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=1470&fit=crop",
    fullContent: `
      <p>The rise of esports has changed global entertainment over the last decade. What began as small LAN gatherings now fills stadiums, features celebrity players and draws millions of live viewers. For brands, esports goes far beyond jerseys and logo placement. It’s a vibrant world where fans play, stream, shop and share - and where brands can join the fun at every turn.</p>
      
      <p>The Expanded Field of Play
      Esports no longer lives only in headline tournaments. It now includes competitive amateur leagues, community-run showdowns, creator-led live streams and events that blend the real world with virtual arenas. Fans engage with their favorite games almost every day, across multiple platforms and formats.
      </p>
      
      <p>This audience is booming. Global esports viewership is set to top 640 million by the end of 2025. Here in India, more than 17 million fans tune in, and that number is growing by roughly 25 percent each year. In many youth segments, esports already rivals or even outpaces traditional sports.</p>
      
      <p>Rethinking Esports Marketing
      Many brands hesitate, worried they might get it wrong with this passionate community. But success comes when you treat esports not as a channel for ads but as a culture to join. It’s about becoming part of the community, not just being seen.
      </p>
      
      <p>How Napptix Connects Brands to Players
      We work with brands at every step of the esports journey:
      </p>
            
      <p>In-stream engagement
      Custom overlays, clickable links and interactive moments that add to the live-viewing experience.
      </p>

      <p>Event partnerships
Co-branded lounges, AR experiences, scavenger hunts and themed contests that bring fans and brands together in person.
</p>

      <p>Team and player collaborations
Branded content, limited-edition drops and campaigns that fit seamlessly into players’ routines and storylines.
</p>

      <p>Community tournaments
Pro-am and creator-driven events that mix professional excitement with grassroots energy.
</p>

      <p>Post-match storytelling
Highlight reels, recap videos and behind-the-scenes features that keep fans talking long after the final play.
</p>

      <p>Measuring What Matters
In esports, real success is about deep engagement, not just raw impressions. We track watch time, chat activity, social shares and fan sentiment to see how well a brand connects with its audience. Combining live data with real-world insights lets us fine-tune every campaign and keep it fresh.
</p>
      <p>Playing the Long Game
Esports fans don’t show up for just one match. They live in a world of rivalries, shared memes and earned in-game rewards. Brands that speak the language and respect the culture earn loyalty that lasts well beyond a single event.
</p>
      <p>Esports isn’t a passing trend. It’s a cultural force defining how young people connect and play online for years to come. Napptix is here to guide you into that world - beyond the arena and into the daily lives of gamers everywhere.</p>
      <p></p>
    `
  },
  // {
  //   id: "news-5",
  //   date: "April 5, 2025",
  //   title: "",
  //   content: "Napptix has been recognized as the 'Most Innovative Ad Tech Company' at the Global Gaming Awards 2025.",
  //   image: "https://images.unsplash.com/photo-1643101452019-bc00c9bba76b?q=80&w=1498&fit=crop",
  //   fullContent: `
  //     <p>Napptix is proud to announce that we have been named 'Most Innovative Ad Tech Company' at the prestigious Global Gaming Awards 2025, recognizing our groundbreaking contributions to the gaming industry.</p>
      
  //     <p>The award, presented at a gala ceremony in Las Vegas attended by over 800 industry leaders, celebrates companies pushing the boundaries of what's possible in gaming technology and experiences.</p>
      
  //     <p>The judging panel, consisting of 30 C-level executives from major game publishers, technology companies, and investment firms, cited Napptix's "revolutionary approach to non-intrusive monetization" and "commitment to enhancing rather than interrupting the player experience" as key factors in their decision.</p>
      
  //     <p>"This recognition validates our core philosophy that advertising can and should be a positive element of the gaming ecosystem," said our founder in the acceptance speech. "We've always believed that the future of gaming monetization lies in creating value for all stakeholders – developers, advertisers, and most importantly, players."</p>
      
  //     <p>The award comes after a year of significant innovation at Napptix, including the launch of our contextual targeting system, the expansion of our interactive ad formats, and the introduction of our analytics platform that offers unprecedented insights into player engagement.</p>
      
  //     <p>This is the second major industry accolade for Napptix this year, following our recognition as a "Technology Pioneer" by the World Economic Forum in January.</p>
  //   `
  // }
];

const NewsArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = newsItems.find(item => item.id === id);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackToNews = () => {
    navigate('/news');
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="container mx-auto pt-32 pb-20 px-4">
          <h1 className="text-4xl font-syne font-bold text-white mb-8 text-center">
            Article Not Found
          </h1>
          <div className="flex justify-center">
            <button 
              onClick={handleBackToNews}
              className="text-[#29dd3b] hover:underline flex items-center cursor-pointer"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to News
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="container mx-auto pt-32 pb-20 px-6">
        <button 
          onClick={handleBackToNews}
          className="text-[#29dd3b] hover:underline flex items-center mb-8 font-productSans cursor-pointer bg-transparent border-none"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to News
        </button>
        
        <h1 className="text-4xl md:text-6xl font-disket text-white mb-8 text-center">{article.title}</h1>
        
        <div className="max-w-4xl mx-auto bg-napptix-dark p-8 rounded-xl border border-napptix-grey/20">
          <div className="mb-6">
            <span className="text-[#29dd3b] text-sm font-syne uppercase tracking-wider">{article.date}</span>
          </div>
          
          {article.image && (
            <div className="mb-12 overflow-hidden rounded-lg">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-96 object-cover"
              />
            </div>
          )}
          
          <div className="text-gray-300 space-y-6 font-productSans">
            <div 
              className="prose prose-invert prose-lg max-w-none [&>p]:text-gray-300 [&>p]:mb-6 [&>p]:leading-relaxed [&>h1]:text-4xl [&>h1]:font-disket [&>h1]:text-white [&>h1]:mb-6 [&>h1]:mt-8 [&>h2]:text-2xl [&>h2]:font-disket [&>h2]:text-white [&>h2]:mb-4 [&>h2]:mt-8 [&>h3]:text-xl [&>h3]:text-[#29dd3b] [&>h3]:font-productSans [&>h3]:mb-3 [&>h3]:mt-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul]:mb-6 [&>li]:text-gray-300 [&>li]:leading-relaxed [&>strong]:text-white [&>strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: article.fullContent }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsArticle;
