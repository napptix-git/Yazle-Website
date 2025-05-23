
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
    title: "Break the Bottleneck in Interactive Ad Creation 🚀",
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
    date: "April 20, 2025",
    title: "From Small Towns to Big Impact: How Tier 2 and Tier 3 India Are Powering the Next Gaming Boom",
    content: "Playable ads deliver results because they turn passive impressions into active participation. With Wizora’s built-in analytics, you capture first-party engagement metrics the moment your campaign goes live.",
    image: "https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?q=80&w=1471&fit=crop",
    fullContent: `
      <p>India’s gaming scene is taking off beyond the big cities. Across tier 2 and tier 3 towns, a surge of new players is redefining how entertainment, culture and commerce come together. Here, gaming is no longer just a pastime, it’s a daily ritual, a way to connect and a vibrant piece of the digital economy.
      </p>
            
      <p>Affordable Access, Unlimited Potential
      Thanks to low-cost smartphones and rock-bottom data plans, millions in smaller towns now have gaming at their fingertips. As signals and devices reached ever more corners of the country, titles like Free Fire, BGMI and Ludo King quickly followed. They’re not just games; they’re part of everyday conversation in places that used to face digital barriers.
      </p>
      
      <p>With more than 450 million Indians playing online, the sector is on track to be worth $4.5 billion by 2025, and much of that growth is coming from outside metro areas.
      </p>
      
      <p>A New Breed of Gamer
      Players from tier 2 and tier 3 markets aren’t just catching up, they’re leading the way. They come from diverse backgrounds, play across genres and share a few key traits: they’re mobile first, they crave content that speaks their language and culture, and they’re open to meaningful brand experiences in the games they love.
      </p>
      
      <p>They don’t want off-the-shelf campaigns. They want stories, characters and challenges that feel local. They’re social, competitive and always eager to try formats that bring value and spark connection</p>

      <p>Rethinking Brand Engagement
      For marketers, this shift is both a challenge and a huge opportunity. One-size-fits-all strategies won’t cut it here. Success means understanding where these gamers hang out, what excites them and how they like to engage.
      </p>

      <p>That’s exactly where Napptix comes in. As your full-service gaming marketing partner, we connect brands and players at every touchpoint:
        •	In-game ads that fit naturally into play
        •	Branded characters, mods and custom skins
        •	Community events, creator collaborations and regional storytelling
        •	Esports integrations, event sponsorships and cross-platform fan engagement
        </p>

      <p>More Than a Trend: A Movement
      This isn’t a passing phase. Gaming in India’s smaller cities is the lifeblood of a generation that skipped desktops and went straight to mobile. These players are building communities, earning livelihoods and shaping tomorrow’s online culture.
      </p>
      
      <p>To reach the next wave of users, you need to look beyond the usual hotspots. It’s in the everyday moments of towns that were once overlooked. Napptix is here to guide you through that journey with strategy, insight and end-to-end execution, so you can make a real impact from the ground up.</p>
      
      <p></p>
      
      
      
      
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
          
          <h1 className="text-4xl md:text-5xl  font-disket text-white mb-8">
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
            className="prose prose-invert prose-lg max-w-none font-productSans"
            dangerouslySetInnerHTML={{ __html: article.fullContent }}
          />
        </article>
      </div>
      <Footer />
    </div>
  );
};

export default NewsArticle;
