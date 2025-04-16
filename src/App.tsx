
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Solutions from "./pages/Solutions";
import Advertisers from "./pages/Advertisers";
import Publishers from "./pages/Publishers";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import React from 'react';

// Advertiser product pages
import WizoraPage from "./pages/advertisers/WizoraPage";
import QuestMapPage from "./pages/advertisers/QuestMapPage";
import PerfNXTPage from "./pages/advertisers/PerfNXTPage";
import CaseStudiesPage from "./pages/advertisers/CaseStudiesPage";

// Publisher pages
import MonetizationPage from "./pages/publishers/MonetizationPage";
import AnalyticsPage from "./pages/publishers/AnalyticsPage";

// Create a client
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
              
              {/* Advertiser routes */}
              <Route path="/advertisers" element={<Advertisers />} />
              <Route path="/advertisers/case-studies" element={<CaseStudiesPage />} />
              <Route path="/advertisers/products/wizora" element={<WizoraPage />} />
              <Route path="/advertisers/products/questmap" element={<QuestMapPage />} />
              <Route path="/advertisers/products/perfnxt" element={<PerfNXTPage />} />
              
              {/* Publisher routes */}
              <Route path="/publishers" element={<Publishers />} />
              <Route path="/publishers/monetization" element={<MonetizationPage />} />
              <Route path="/publishers/analytics" element={<AnalyticsPage />} />
              
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
