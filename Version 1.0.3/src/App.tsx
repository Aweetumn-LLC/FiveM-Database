
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Reports from "./pages/Reports";
import ReportDetails from "./pages/ReportDetails";
import ReportStats from "./pages/ReportStats";
import Partners from "./pages/Partners";
import Discord from "./pages/Discord";
import OurAsk from "./pages/OurAsk";
import FiveMTOS from "./pages/FiveMTOS";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import UsagePolicy from "./pages/UsagePolicy";
import DataPolicy from "./pages/DataPolicy";
import ResourceChecker from "./pages/ResourceChecker";
import Documentation from "./pages/Documentation";

const queryClient = new QueryClient();

const App = () => {
  // Add effect to update title and meta description
  useEffect(() => {
    document.title = "FiveM DB | Community Driven Reports Database";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'FiveM DB is a community-driven reports database for the FiveM ecosystem.');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/reports" />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/resource-checker" element={<ResourceChecker />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/report/:id" element={<ReportDetails />} />
            <Route path="/report-stats" element={<ReportStats />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/fivem-tos" element={<FiveMTOS />} />
            <Route path="/discord" element={<Discord />} />
            <Route path="/our-ask" element={<OurAsk />} />
            
            {/* Legal pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/usage-policy" element={<UsagePolicy />} />
            <Route path="/data-policy" element={<DataPolicy />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
