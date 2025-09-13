
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import MaintenanceWrapper from "./components/MaintenanceWrapper";
import Home from "./pages/Home";

// Misc
import NotFound from "./pages/Misc/NotFound";
import Discord from "./pages/Misc/Discord";
import Donate from "./pages/Misc/Donate";

// Legal
import PrivacyPolicy from "./pages/Legal/PrivacyPolicy";
import TermsOfService from "./pages/Legal/TermsOfService";
import UsagePolicy from "./pages/Legal/UsagePolicy";
import DataPolicy from "./pages/Legal/DataPolicy";
import HowWeUseYourData from "./pages/Legal/HowWeUseYourData";
import Legal from "./pages/Legal/Legal";
import OurAsk from "./pages/Legal/OurAsk";
import FiveMTOS from "./pages/Legal/FiveMTOS";

// Reports
import Reports from "./pages/Reports";
import ReportStats from "./pages/ReportStats";

// Tools
import ResourceChecker from "./pages/Tools/ResourceChecker";
import CreatorTools from "./pages/Tools/CreatorTools";
import Documentation from "./pages/Tools/Documentation";
import ServerChecker from "./pages/Tools/ServerChecker";

// Partners
import CreatorPartners from "./pages/Partners/CreatorPartners";
import RecommendedCreators from "./pages/Partners/RecommendedCreators";
import PartneredHosting from "./pages/Partners/PartneredHosting";
import PartneredFrameworks from "./pages/Partners/PartneredFrameworks";
import PartneredServers from "./pages/Partners/PartneredServers";
import AdminPanel from "./pages/Admin/AdminPanel";

const queryClient = new QueryClient();

// Component to handle scroll to top on route change
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return null;
};

import { ThemeProvider } from "./contexts/ThemeContext";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";

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
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <MaintenanceWrapper>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Layout><Home /></Layout>} />
                
                <Route path="/documentation" element={<Layout><Documentation /></Layout>} />
                <Route path="/resource-checker" element={<Layout><ResourceChecker /></Layout>} />
                <Route path="/server-checker" element={<Layout><ServerChecker /></Layout>} />
                <Route path="/creator-tools" element={<Layout><CreatorTools /></Layout>} />
                <Route path="/reports" element={<Layout><Reports /></Layout>} />
                <Route path="/report-stats" element={<Layout><ReportStats /></Layout>} />
                <Route path="/creator-partners" element={<Layout><CreatorPartners /></Layout>} />
                <Route path="/recommended-creators" element={<Layout><RecommendedCreators /></Layout>} />
                <Route path="/partnered-hosting" element={<Layout><PartneredHosting /></Layout>} />
                <Route path="/partnered-frameworks" element={<Layout><PartneredFrameworks /></Layout>} />
                <Route path="/partnered-servers" element={<Layout><PartneredServers /></Layout>} />
                <Route path="/fivem-tos" element={<Layout><FiveMTOS /></Layout>} />
                <Route path="/discord" element={<Layout><Discord /></Layout>} />
                <Route path="/donate" element={<Layout><Donate /></Layout>} />
                <Route path="/our-ask" element={<Layout><OurAsk /></Layout>} />
                
                {/* Legal pages */}
                <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
                <Route path="/terms-of-service" element={<Layout><TermsOfService /></Layout>} />
                <Route path="/usage-policy" element={<Layout><UsagePolicy /></Layout>} />
                <Route path="/data-policy" element={<Layout><DataPolicy /></Layout>} />
                <Route path="/how-we-use-your-data" element={<Layout><HowWeUseYourData /></Layout>} />
                <Route path="/legal" element={<Layout><Legal /></Layout>} />
                
                {/* Hidden Admin Route */}
                <Route path="/admin" element={<AdminAuthProvider><AdminPanel /></AdminAuthProvider>} />
                
                <Route path="*" element={<Layout><NotFound /></Layout>} />
              </Routes>
            </MaintenanceWrapper>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
