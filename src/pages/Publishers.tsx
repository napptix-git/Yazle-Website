import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CountUpMetric from '@/components/CountUpMetric';
import { Button } from '@/components/ui/button';
import { Code, Server, Globe, Code2 } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const Publishers: React.FC = () => {
  const integrationCode = `// Install Napptix SDK
npm install napptix-sdk

// Initialize in your game
import { NapptixAds } from 'napptix-sdk';

// Simple configuration
NapptixAds.init({
  publisherId: 'YOUR_ID',
  adUnits: ['banner', 'rewarded'],
  testMode: true
});

// Show an ad when ready
NapptixAds.showAd('rewarded', {
  onComplete: () => rewardPlayer(),
  onError: (err) => console.log(err)
});`;

  const [sdkTab, setSdkTab] = useState<'api' | 'javascript' | 'server'>('api');

  const apiCode = `// API-Based Integration
fetch('https://api.napptix.com/v1/ads', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    placementId: 'game-level-up',
    adType: 'rewarded',
    deviceInfo: { /* device info */ }
  })
})
.then(response => response.json())
.then(adData => {
  // Render ad using the returned data
  console.log('Ad ready to display', adData);
});`;

  const javascriptCode = `<!-- JavaScript/HTML5 Integration -->
<script>
  // Initialize Napptix ads
  window.napptix = window.napptix || {};
  window.napptix.queue = window.napptix.queue || [];
  
  // Configuration
  window.napptix.queue.push({
    command: 'init',
    publisherId: 'YOUR_PUBLISHER_ID'
  });
  
  // Display a rewarded ad when player completes level
  function showRewardedAd() {
    window.napptix.queue.push({
      command: 'showAd',
      adType: 'rewarded',
      placementId: 'level-complete',
      onComplete: function() {
        givePlayerReward();
      }
    });
  }
</script>
<script async src="https://cdn.napptix.com/loader.js"></script>`;

  const serverCode = `// Server-to-Server (S2S) Integration
const axios = require('axios');

// Request ad from server
async function requestAd(userId, placement) {
  const response = await axios.post('https://api.napptix.com/s2s/v1/auction', {
    publisherId: 'YOUR_PUBLISHER_ID',
    userId: userId,
    placementId: placement,
    bidFloor: 0.01,
    sessionId: 'unique-session-id',
  }, {
    headers: {
      'Authorization': 'Bearer YOUR_S2S_API_KEY',
      'Content-Type': 'application/json'
    }
  });
  
  return response.data;
}

// Report impression when ad is shown
async function reportImpression(adId, userId) {
  await axios.post('https://api.napptix.com/s2s/v1/impression', {
    adId: adId,
    userId: userId,
    timestamp: Date.now()
  }, {
    headers: {
      'Authorization': 'Bearer YOUR_S2S_API_KEY',
      'Content-Type': 'application/json'
    }
  });
}`;

  const getCodeForTab = () => {
    switch (sdkTab) {
      case 'api':
        return apiCode;
      case 'javascript':
        return javascriptCode;
      case 'server':
        return serverCode;
      default:
        return apiCode;
    }
  };

  const beforeAfterData = [
    {
      name: 'Month 1',
      before: 3200,
      after: 4800,
    },
    {
      name: 'Month 2',
      before: 3300,
      after: 5700,
    },
    {
      name: 'Month 3',
      before: 3400,
      after: 6200,
    },
    {
      name: 'Month 4',
      before: 3100,
      after: 7400,
    },
  ];

  const chartConfig = {
    before: {
      label: "Before Napptix",
      color: "#6b7280",
    },
    after: {
      label: "With Napptix",
      color: "#29dd3b",
    },
  };

  return (
    <div className="min-h-screen bg-black font-manrope">
      <Navbar />
      
      {/* Section 1: Hero - Built for Game Developers */}
      <div className="container mx-auto pt-32 pb-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Monetize Without Compromising Player Experience
            </h1>
            <p className="text-xl text-napptix-light-grey">
              Plug into a revenue stream designed for gamers and built for developers.
            </p>
            <Button size="lg" className="bg-[#29dd3b] hover:bg-[#29dd3b]/80 text-black font-medium mt-4">
              Explore Integration <Code className="ml-2" />
            </Button>
          </div>
          <div className="bg-napptix-dark rounded-xl p-4 border border-napptix-grey/20">
            <div className="font-mono text-sm text-white/80 p-4 bg-black/50 rounded-lg overflow-auto max-h-72">
              <pre>{integrationCode}</pre>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-xs text-napptix-light-grey">napptix-integration-example.js</span>
            </div>
          </div>
        </div>
        
        {/* Section 2: Publisher Success Metrics */}
        <h2 className="text-3xl font-bold text-white mt-20 mb-12">Publisher Success Metrics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="space-y-8">
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
              <CountUpMetric 
                end={10000} 
                duration={2000} 
                suffix="+" 
                title="Active Publishers" 
                description="Game developers using our platform globally"
                className="text-4xl md:text-5xl"
              />
            </div>
            
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
              <CountUpMetric 
                end={42} 
                duration={2000} 
                suffix="%" 
                title="Revenue Increase" 
                description="Average growth in publisher revenue after integration"
                className="text-4xl md:text-5xl"
              />
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
              <CountUpMetric 
                end={75000} 
                duration={2000} 
                suffix="+" 
                title="Games Integrated" 
                description="Titles successfully monetized with our solution"
                className="text-4xl md:text-5xl"
              />
            </div>
            
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
              <CountUpMetric 
                end={98} 
                duration={2000} 
                suffix="%" 
                title="Player Retention" 
                description="Average player retention rate with our non-intrusive ads"
                className="text-4xl md:text-5xl"
              />
            </div>
          </div>
        </div>
        
        {/* Section 3: Integration Options */}
        <h2 className="text-3xl font-bold text-white mt-24 mb-10">Integration Options</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-20">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20 flex items-center space-x-4">
              <div className="bg-[#29dd3b]/20 p-3 rounded-full">
                <Server className="w-6 h-6 text-[#29dd3b]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">API-Based Integration</h3>
                <p className="text-napptix-light-grey">Full control, full flexibility.</p>
              </div>
            </div>
            
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20 flex items-center space-x-4">
              <div className="bg-[#29dd3b]/20 p-3 rounded-full">
                <Globe className="w-6 h-6 text-[#29dd3b]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">JavaScript/HTML5 Integration</h3>
                <p className="text-napptix-light-grey">Fast and familiar.</p>
              </div>
            </div>
            
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20 flex items-center space-x-4">
              <div className="bg-[#29dd3b]/20 p-3 rounded-full">
                <Code2 className="w-6 h-6 text-[#29dd3b]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Server-to-Server (S2S) Integration</h3>
                <p className="text-napptix-light-grey">Scalable, secure, server-first.</p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3 bg-napptix-dark rounded-xl border border-napptix-grey/20 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-napptix-grey/20">
              <div className="flex space-x-2">
                <button 
                  onClick={() => setSdkTab('api')} 
                  className={`px-3 py-1 rounded ${sdkTab === 'api' ? 'bg-[#29dd3b] text-black' : 'bg-transparent text-white'}`}
                >
                  RESTful API
                </button>
                <button 
                  onClick={() => setSdkTab('javascript')} 
                  className={`px-3 py-1 rounded ${sdkTab === 'javascript' ? 'bg-[#29dd3b] text-black' : 'bg-transparent text-white'}`}
                >
                  JavaScript
                </button>
                <button 
                  onClick={() => setSdkTab('server')} 
                  className={`px-3 py-1 rounded ${sdkTab === 'server' ? 'bg-[#29dd3b] text-black' : 'bg-transparent text-white'}`}
                >
                  Server-to-Server
                </button>
              </div>
              <button className="text-sm text-white px-2 py-1 bg-napptix-grey/30 rounded hover:bg-napptix-grey/40 transition-colors">
                Copy Code
              </button>
            </div>
            <div className="p-4">
              <pre className="font-mono text-sm text-white/80 overflow-auto max-h-72">
                {getCodeForTab()}
              </pre>
            </div>
          </div>
        </div>
        
        {/* Section 4: Integration Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <Card className="bg-napptix-dark border-napptix-grey/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-[#29dd3b]/20 p-3 rounded-full">
                  <Server className="w-6 h-6 text-[#29dd3b]" />
                </div>
                <h3 className="text-xl font-bold text-white">API-Based Integration</h3>
              </div>
              <p className="text-napptix-light-grey mb-4">
                Use simple RESTful APIs to serve and track ads directly from your backend or custom client implementation. Ideal for advanced teams building custom workflows.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-napptix-dark border-napptix-grey/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-[#29dd3b]/20 p-3 rounded-full">
                  <Globe className="w-6 h-6 text-[#29dd3b]" />
                </div>
                <h3 className="text-xl font-bold text-white">JavaScript/HTML5</h3>
              </div>
              <p className="text-napptix-light-grey mb-4">
                Add monetization to browser or WebView-based games using plug-and-play embed scripts. Perfect for WebGL, Phaser, or cross-platform HTML5 titles.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-napptix-dark border-napptix-grey/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-[#29dd3b]/20 p-3 rounded-full">
                  <Code2 className="w-6 h-6 text-[#29dd3b]" />
                </div>
                <h3 className="text-xl font-bold text-white">Server-to-Server</h3>
              </div>
              <p className="text-napptix-light-grey mb-4">
                Connect directly from your backend to our ad server to control bidding, delivery, and event tracking—no client SDKs required.
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Section 5: Performance in Action (Live Charts) */}
        <h2 className="text-3xl font-bold text-white mt-24 mb-10">Performance in Action</h2>
        
        <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20 mb-32">
          <h3 className="text-xl font-bold text-white mb-6">Revenue Growth After Integration</h3>
          
          <div className="h-[400px]">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={beforeAfterData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="before" name="Before Napptix" fill="#6b7280" />
                  <Bar dataKey="after" name="With Napptix" fill="#29dd3b" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="bg-napptix-grey/20 p-2 px-4 rounded-full text-sm text-white flex items-center">
              <div className="w-4 h-4 mr-2">
                <img src="/lovable-uploads/6e100c42-279f-4ff0-8321-04d4fcd5505d.png" alt="Unity" className="w-full h-full object-contain" />
              </div>
              Unity
            </div>
            <div className="bg-napptix-grey/20 p-2 px-4 rounded-full text-sm text-white flex items-center">
              <div className="w-4 h-4 mr-2">
                <img src="/lovable-uploads/38b35255-cc55-471a-a732-148058a4274d.png" alt="Unreal" className="w-full h-full object-contain" />
              </div>
              Unreal Engine
            </div>
            <div className="bg-napptix-grey/20 p-2 px-4 rounded-full text-sm text-white flex items-center">
              <div className="w-4 h-4 mr-2">
                <img src="/lovable-uploads/347b5bfb-a8d6-4595-8630-8f30916db04b.png" alt="HTML5" className="w-full h-full object-contain" />
              </div>
              HTML5
            </div>
            <div className="bg-napptix-grey/20 p-2 px-4 rounded-full text-sm text-white flex items-center">
              <div className="w-4 h-4 mr-2">
                <img src="/lovable-uploads/1e88692d-f880-4cde-a21b-1c81781f41ea.png" alt="Android" className="w-full h-full object-contain" />
              </div>
              Android
            </div>
          </div>
        </div>
        
        {/* Section 6: Why Publishers Choose Napptix */}
        <h2 className="text-3xl font-bold text-white mt-24 mb-10 text-center">Why Publishers Choose Napptix</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          <Card className="bg-napptix-dark border-napptix-grey/20 hover:border-[#29dd3b]/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-[#29dd3b]/20 p-3 rounded-full">
                  <svg className="w-6 h-6 text-[#29dd3b]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Global Game Inventory Access</h3>
              </div>
              <p className="text-napptix-light-grey">Tap into our network of premium advertisers from around the world, ensuring high fill rates and competitive CPMs for your game.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-napptix-dark border-napptix-grey/20 hover:border-[#29dd3b]/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-[#29dd3b]/20 p-3 rounded-full">
                  <svg className="w-6 h-6 text-[#29dd3b]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 012-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Real-Time Revenue Reporting</h3>
              </div>
              <p className="text-napptix-light-grey">Monitor your earnings with our transparent dashboard providing real-time insights into impressions, clicks, and revenue.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-napptix-dark border-napptix-grey/20 hover:border-[#29dd3b]/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-[#29dd3b]/20 p-3 rounded-full">
                  <svg className="w-6 h-6 text-[#29dd3b]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Player-Friendly Ad Formats</h3>
              </div>
              <p className="text-napptix-light-grey">Designed specifically for games, our ad formats enhance rather than disrupt the player experience, maintaining high retention rates.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-napptix-dark border-napptix-grey/20 hover:border-[#29dd3b]/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-[#29dd3b]/20 p-3 rounded-full">
                  <svg className="w-6 h-6 text-[#29dd3b]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Flexible Integration Options</h3>
              </div>
              <p className="text-napptix-light-grey">Our platform supports multiple integration methods, making it easy to monetize your game regardless of your development environment.</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Section 7: Explainer / Dev Video */}
        <h2 className="text-3xl font-bold text-white mt-24 mb-10">Developer Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
            <div className="aspect-video bg-black/50 rounded-lg flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-[#29dd3b]/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[#29dd3b]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">SDK Integration Tutorial</h3>
            <p className="text-napptix-light-grey mb-4">Watch our step-by-step guide to integrating the Napptix SDK into your game project.</p>
            <Button className="bg-[#29dd3b] hover:bg-[#29dd3b]/80 text-black font-medium">Watch Tutorial</Button>
          </div>
          
          <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
            <blockquote className="text-white text-lg italic mb-6">
              "The documentation is comprehensive and the support team responds quickly. We had our integration questions answered within hours."
            </blockquote>
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-black font-bold">JD</span>
              </div>
              <div>
                <div className="text-white font-bold">Jane Doe</div>
                <div className="text-napptix-light-grey text-sm">Lead Developer, Quantum Studios</div>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-wrap gap-3">
              <div className="bg-napptix-grey/20 py-1 px-3 rounded-full text-sm text-white">Technical Documentation</div>
              <div className="bg-napptix-grey/20 py-1 px-3 rounded-full text-sm text-white">API Reference</div>
              <div className="bg-napptix-grey/20 py-1 px-3 rounded-full text-sm text-white">Sample Projects</div>
            </div>
          </div>
        </div>
        
        {/* Section 8: FAQ for Developers */}
        <h2 className="text-3xl font-bold text-white mt-24 mb-10">FAQ for Developers</h2>
        
        <div className="bg-napptix-dark rounded-xl border border-napptix-grey/20 mb-20">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b border-napptix-grey/20">
              <AccordionTrigger className="px-6 py-4 text-white hover:text-[#29dd3b]">
                How easy is SDK integration?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-napptix-light-grey">
                Our SDK is designed for minimal effort integration. Most developers can implement it in under 15 minutes with just a few lines of code. We provide detailed documentation, sample projects, and direct support from our developer team to ensure a smooth integration process.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border-b border-napptix-grey/20">
              <AccordionTrigger className="px-6 py-4 text-white hover:text-[#29dd3b]">
                Which game engines do you support?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-napptix-light-grey">
                We currently support Unity, Unreal Engine, HTML5/JavaScript, Android (native), iOS (native), and WebGL. Our SDK is regularly updated to maintain compatibility with the latest versions of these platforms.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border-b border-napptix-grey/20">
              <AccordionTrigger className="px-6 py-4 text-white hover:text-[#29dd3b]">
                How do payouts work?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-napptix-light-grey">
                We offer Net-30 payment terms with a minimum payout threshold of $50. Payments are made via bank transfer, PayPal, or cryptocurrency. Our dashboard provides transparent reporting of your earnings, impressions, and estimated future payments.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="border-b border-napptix-grey/20">
              <AccordionTrigger className="px-6 py-4 text-white hover:text-[#29dd3b]">
                What ad formats do you offer?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-napptix-light-grey">
                We offer multiple ad formats including rewarded videos, interstitials, playable ads, and native ads. All formats are designed to be non-intrusive and can be customized to fit the look and feel of your game.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger className="px-6 py-4 text-white hover:text-[#29dd3b]">
                Can I set restrictions on ad content?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-napptix-light-grey">
                Absolutely. You can define content categories you want to exclude, set age-appropriate restrictions, and block specific advertisers if needed. We respect your game's brand and audience demographics.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        {/* Section 9: Call to Action */}
        <div className="bg-napptix-dark p-12 rounded-xl border border-napptix-grey/20 text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Launch Ads in Your Game in Under 15 Minutes
          </h2>
          <p className="text-xl text-napptix-light-grey mb-8 max-w-2xl mx-auto">
            Join thousands of game developers who have increased their revenue while maintaining player satisfaction.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-[#29dd3b] hover:bg-[#29dd3b]/80 text-black font-medium">
              Start Integration
            </Button>
            <Button size="lg" variant="outline" className="border-[#29dd3b] text-[#29dd3b] hover:bg-[#29dd3b]/10">
              View Documentation
            </Button>
          </div>
          <p className="text-sm text-napptix-light-grey mt-6">
            Average onboarding time: 15 minutes | Technical support available 24/7
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Publishers;
