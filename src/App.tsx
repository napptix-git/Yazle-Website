
import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Solutions from "./pages/Solutions";
import Advertisers from "./pages/Advertisers";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Careers from "./pages/Careers";
import News from "./pages/News";
import NewsArticle from "./pages/NewsArticle";
import WizoraSoonPage from "./pages/WizoraSoonPage";

import WizoraPage from "./pages/advertisers/WizoraPage";
import CaseStudiesPage from "./pages/advertisers/CaseStudiesPage";
import CaseStudyDetailPage from "./pages/advertisers/CaseStudyDetailPage";
import AdGalleryPage from "./pages/advertisers/AdGalleryPage";
import AdvertiserContactPage from "./pages/advertisers/ContactPage";

import Developers from "./pages/Developers";
import DeveloperContactPage from "./pages/developers/ContactPage";
import WizoraCS from './pages/WizoraCS';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/solutions" element={<Solutions />} />
              
              <Route path="/advertisers" element={<Advertisers />} />
              <Route path="/advertisers/wizora" element={<WizoraPage />} />
              <Route path="/wizora-soon" element={<WizoraSoonPage />} />
              <Route path="/advertisers/case-studies" element={<CaseStudiesPage />} />
              <Route path="/advertisers/case-studies/:slug" element={<CaseStudyDetailPage />} />
              <Route path="/advertisers/ad-gallery" element={<AdGalleryPage />} />
              <Route path="/advertisers/contact" element={<AdvertiserContactPage />} />
              
              <Route path="/pages/WizoraCS" element={<WizoraCS />} />

              <Route path="/developers" element={<Developers />} />
              <Route path="/developers/contact" element={<DeveloperContactPage />} />
              
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<NewsArticle />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
