
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import Layout from "./components/Layout";
import MaintenanceWrapper from "./components/MaintenanceWrapper";
import Home from "./pages/Home";

// Lazy load components to improve initial bundle size
const NotFound = lazy(() => import("./pages/Misc/NotFound"));
const Discord = lazy(() => import("./pages/Misc/Discord"));
const WhatIsFiveMDB = lazy(() => import("./pages/Misc/WhatIsFiveMDB"));
const WhoIsFiveMDB = lazy(() => import("./pages/Misc/WhoIsFiveMDB"));

// Legal pages (lazy loaded)
const PrivacyPolicy = lazy(() => import("./pages/Legal/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/Legal/TermsOfService"));
const UsagePolicy = lazy(() => import("./pages/Legal/UsagePolicy"));
const DataPolicy = lazy(() => import("./pages/Legal/DataPolicy"));
const HowWeUseYourData = lazy(() => import("./pages/Legal/HowWeUseYourData"));
const Legal = lazy(() => import("./pages/Legal/Legal"));
const OurAsk = lazy(() => import("./pages/Legal/OurAsk"));
const FiveMTOS = lazy(() => import("./pages/Legal/FiveMTOS"));

// Reports (lazy loaded)
const Reports = lazy(() => import("./pages/Reports"));

// Statistics (lazy loaded)
const ToolUsageStats = lazy(() => import("./pages/Statistics/ToolUsageStats"));
const BlacklistStatistics = lazy(() => import("./pages/Statistics/BlacklistStatistics"));
const ComplianceStatistics = lazy(() => import("./pages/Statistics/ComplianceStatistics"));
const FiveMDatabaseStats = lazy(() => import("./pages/Statistics/FiveMDatabaseStats"));

// Tools (priority load for main features)
const ResourceChecker = lazy(() => import("./pages/Tools/ResourceChecker"));
const FiveMServerChecker = lazy(() => import("./pages/Tools/FiveMServerChecker"));
const CreatorTools = lazy(() => import("./pages/Tools/CreatorTools"));
const ComplianceTools = lazy(() => import("./pages/Tools/ComplianceTools"));
const BlacklistSystem = lazy(() => import("./pages/Tools/BlacklistSystem"));

// Blacklist Checkers (priority load)
const UserBlacklistChecker = lazy(() => import("./pages/Blacklist/UserBlacklistChecker"));
const StoreBlacklistChecker = lazy(() => import("./pages/Blacklist/StoreBlacklistChecker"));
const ServerBlacklistChecker = lazy(() => import("./pages/Blacklist/ServerBlacklistChecker"));
const DiscordBlacklistChecker = lazy(() => import("./pages/Blacklist/DiscordBlacklistChecker"));

// Partners (lazy loaded)
const CreatorPartners = lazy(() => import("./pages/Partners/CreatorPartners"));

const PartneredHosting = lazy(() => import("./pages/Partners/PartneredHosting"));
const PartneredFrameworks = lazy(() => import("./pages/Partners/PartneredFrameworks"));
const PartneredServers = lazy(() => import("./pages/Partners/PartneredServers"));
const ContentCreatorPartners = lazy(() => import("./pages/Partners/ContentCreatorPartners"));

// Admin pages (lazy loaded)
const AdminPanel = lazy(() => import("./pages/Admin/AdminPanel"));
const AdminStatistics = lazy(() => import("./pages/Admin/AdminStatistics"));
const AdminHistory = lazy(() => import("./pages/Admin/AdminHistory"));
const AdminBlacklists = lazy(() => import("./pages/Admin/AdminBlacklists"));
const AdminDatabase = lazy(() => import("./pages/Admin/AdminDatabase"));
const AdminMaintainer = lazy(() => import("./pages/Admin/AdminMaintainer"));
const PartnersManager = lazy(() => import("./pages/Admin/PartnersManager"));
const FeaturedCreators = lazy(() => import("./pages/Admin/FeaturedCreators"));
const CreatorMarketManager = lazy(() => import("./pages/Admin/CreatorMarketManager"));
const DiscordLogin = lazy(() => import("./pages/Admin/DiscordLogin"));
const DiscordCallback = lazy(() => import("./pages/Admin/DiscordCallback"));

// Maintainer pages (lazy loaded)
const MaintainerDashboard = lazy(() => import("./pages/Maintainer/Dashboard"));
const MaintainerAddAdmins = lazy(() => import("./pages/Maintainer/AddAdmins"));
const MaintainerAddMaintainers = lazy(() => import("./pages/Maintainer/AddMaintainers"));
const MaintainerEditAdminPermissions = lazy(() => import("./pages/Maintainer/EditAdminPermissions"));
const MaintainerEditMaintainerPermissions = lazy(() => import("./pages/Maintainer/EditMaintainerPermissions"));
const MaintainerDatabaseExports = lazy(() => import("./pages/Maintainer/DatabaseExports"));
const MaintainerDatabaseImports = lazy(() => import("./pages/Maintainer/DatabaseImports"));
const MaintainerWebsiteSettings = lazy(() => import("./pages/Maintainer/WebsiteSettings"));

// Events and other pages (lazy loaded)
const ThankYou = lazy(() => import("./pages/Events/ThankYou"));
const CreatorReleaseMarket = lazy(() => import("./pages/CreatorReleaseMarket"));
const SealOfApproval = lazy(() => import("./pages/SealOfApproval"));

// Load contexts immediately instead of lazy loading to prevent loading issues
import { ThemeProvider } from "./contexts/ThemeContext";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import { AdminRouteGuard } from "./components/AdminRouteGuard";

// Optimized query client with better cache settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

// Component to handle scroll to top on route change
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return null;
};

// Dynamically import supabase client to reduce initial bundle
const supabasePromise = import("@/integrations/supabase/client");

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

    // Defer visitor tracking to not block initial render
    const trackVisitor = async () => {
      try {
        const hasTrackedVisit = sessionStorage.getItem('visitor_tracked');
        if (!hasTrackedVisit) {
          const { supabase } = await supabasePromise;
          await supabase.functions.invoke('statistics-tracker', {
            body: {
              action: 'track_visitor',
              data: { type: 'page_view' }
            }
          });
          sessionStorage.setItem('visitor_tracked', 'true');
        }
      } catch (err) {
        console.error('Visitor tracking error:', err);
      }
    };

    // Use requestIdleCallback to defer non-critical operations
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(trackVisitor);
    } else {
      setTimeout(trackVisitor, 100);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AdminAuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <MaintenanceWrapper>
                  <ScrollToTop />
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      <Route path="/" element={<Layout title="FiveM DB | FiveM Resource Compliance & Blacklist Database" description="Check FiveM scripts, maps, MLOs, and servers for CFX compliance, leaks, blacklists, and TOS/COC violations. Community-driven FiveM DB."><Home /></Layout>} />
                      
                      <Route path="/resource-checker" element={<Layout title="FiveM Resource Checker | CFX Compliance & Blacklist Scanner" description="Check FiveM scripts, maps, MLOs and resources for CFX compliance violations, leaks, blacklists and TOS issues. Real-time verification with evidence."><Suspense fallback={<PageLoader />}><ResourceChecker /></Suspense></Layout>} />
                      <Route path="/fivem-server-checker" element={<Layout title="FiveM Server Checker | Server Blacklist & Compliance Tool" description="Verify FiveM servers for blacklist status, compliance violations, and community safety issues. Check server reputation and TOS compliance."><Suspense fallback={<PageLoader />}><FiveMServerChecker /></Suspense></Layout>} />
                      
                      <Route path="/creator-tools" element={<Layout title="FiveM Creator Tools | Resource Development & Compliance" description="Essential tools for FiveM content creators. Check resources, verify compliance, and ensure your creations meet CFX guidelines."><Suspense fallback={<PageLoader />}><CreatorTools /></Suspense></Layout>} />
                      
                      {/* Blacklist Checkers */}
                      <Route path="/user-blacklist-checker" element={<Layout title="FiveM User Blacklist Checker | Discord & Player ID Scanner" description="Check FiveM users and Discord IDs for blacklist violations, TOS breaches, and community safety issues with evidence-backed results."><Suspense fallback={<PageLoader />}><UserBlacklistChecker /></Suspense></Layout>} />
                      <Route path="/store-blacklist-checker" element={<Layout title="FiveM Store Blacklist Checker | Tebex & Shop Scanner" description="Verify FiveM stores and Tebex shops for blacklist status, leaked content, and compliance violations. Protect your purchases."><Suspense fallback={<PageLoader />}><StoreBlacklistChecker /></Suspense></Layout>} />
                      <Route path="/server-blacklist-checker" element={<Layout title="FiveM Server Blacklist Checker | Community Safety Scanner" description="Check FiveM servers for blacklist violations, compliance issues, and community safety concerns. Verify server reputation."><Suspense fallback={<PageLoader />}><ServerBlacklistChecker /></Suspense></Layout>} />
                      <Route path="/discord-blacklist-checker" element={<Layout title="Discord Server Blacklist Checker | FiveM Community Scanner" description="Check Discord servers for FiveM-related blacklist violations, policy breaches, and community safety issues."><Suspense fallback={<PageLoader />}><DiscordBlacklistChecker /></Suspense></Layout>} />
                      <Route path="/reports" element={<Layout title="Community Reports | FiveM DB Violation Reports" description="Browse community-submitted reports of FiveM violations, blacklist entries, and compliance issues with evidence and verification."><Suspense fallback={<PageLoader />}><Reports /></Suspense></Layout>} />
                      
                      {/* Statistics */}
                      <Route path="/tool-usage-stats" element={<Layout title="Tool Usage Statistics | FiveM DB Analytics Dashboard" description="Real-time analytics of FiveM DB tool usage, popular checks, and community engagement statistics."><Suspense fallback={<PageLoader />}><ToolUsageStats /></Suspense></Layout>} />
                      <Route path="/blacklist-statistics" element={<Layout title="FiveM Blacklist Statistics | Violation Trends & Data" description="Comprehensive statistics on FiveM blacklist violations, trends, and community safety metrics with detailed analytics."><Suspense fallback={<PageLoader />}><BlacklistStatistics /></Suspense></Layout>} />
                      <Route path="/compliance-statistics" element={<Layout title="FiveM Compliance Statistics | CFX Policy Analytics" description="Track FiveM compliance violations, CFX policy breaches, and community safety trends with detailed statistical analysis."><Suspense fallback={<PageLoader />}><ComplianceStatistics /></Suspense></Layout>} />
                      <Route path="/fivem-database-stats" element={<Layout title="FiveM Database Statistics | Community Data & Insights" description="Comprehensive FiveM community database statistics, growth metrics, and platform insights for the ecosystem."><Suspense fallback={<PageLoader />}><FiveMDatabaseStats /></Suspense></Layout>} />
                      <Route path="/creator-partners" element={<Layout title="FiveM Creator Partners | Verified Content Creators" description="Discover verified FiveM content creators, script developers, and resource makers in our trusted partner network."><Suspense fallback={<PageLoader />}><CreatorPartners /></Suspense></Layout>} />
                      
                      
                      <Route path="/content-creators" element={<Layout title="FiveM Content Creator Partners | Video & Stream Creators" description="Featured FiveM content creators, streamers, and YouTubers creating quality FiveM content for the community."><Suspense fallback={<PageLoader />}><ContentCreatorPartners /></Suspense></Layout>} />

                      <Route path="/partnered-hosting" element={<Layout title="FiveM Partnered Hosting | Trusted Server Providers" description="Discover trusted FiveM server hosting providers offering reliable, high-performance hosting solutions for your FiveM server."><Suspense fallback={<PageLoader />}><PartneredHosting /></Suspense></Layout>} />
                      <Route path="/partnered-frameworks" element={<Layout title="FiveM Partnered Frameworks | Trusted Development Frameworks" description="Explore verified FiveM development frameworks and bases trusted by the community for server development."><Suspense fallback={<PageLoader />}><PartneredFrameworks /></Suspense></Layout>} />
                      <Route path="/partnered-servers" element={<Layout title="FiveM Partnered Servers | Featured Community Servers" description="Discover featured FiveM roleplay and gaming servers that are trusted partners in our community network."><Suspense fallback={<PageLoader />}><PartneredServers /></Suspense></Layout>} />
                      <Route path="/fivem-tos" element={<Layout title="FiveM Terms of Service | CFX Platform Guidelines" description="Complete guide to FiveM and CFX Terms of Service, community guidelines, and platform rules for developers and server owners."><Suspense fallback={<PageLoader />}><FiveMTOS /></Suspense></Layout>} />
                      <Route path="/discord" element={<Layout title="FiveM DB Discord | Join Our Community Server" description="Join the official FiveM DB Discord community for support, updates, and discussions about FiveM compliance and safety."><Suspense fallback={<PageLoader />}><Discord /></Suspense></Layout>} />
                      <Route path="/events/thank-you" element={<Layout title="Thank You | FiveM DB" description="Celebrating 1 year of FiveM DB with our community."><Suspense fallback={<PageLoader />}><ThankYou /></Suspense></Layout>} />
                      <Route path="/tool-info/compliance-tools" element={<Layout title="Compliance Tools | FiveM DB" description="Learn about our automated compliance monitoring tools and violation categories."><Suspense fallback={<PageLoader />}><ComplianceTools /></Suspense></Layout>} />
                      <Route path="/tool-info/blacklist-system" element={<Layout title="Blacklist System | FiveM DB" description="Understanding our blacklist system that protects the FiveM community."><Suspense fallback={<PageLoader />}><BlacklistSystem /></Suspense></Layout>} />
                      <Route path="/what-is-fivem-db" element={<Layout title="What is FiveM DB? | FiveM DB" description="Understand what FiveM DB is: a community-driven compliance and blacklist database."><Suspense fallback={<PageLoader />}><WhatIsFiveMDB /></Suspense></Layout>} />
                      <Route path="/who-is-fivem-db" element={<Layout title="Who is FiveM DB? | FiveM DB" description="Learn who runs FiveM DB and our mission for the FiveM community."><Suspense fallback={<PageLoader />}><WhoIsFiveMDB /></Suspense></Layout>} />
                      <Route path="/our-ask" element={<Layout title="Our Ask | Supporting FiveM DB Community Mission" description="Learn how you can support FiveM DB's mission to maintain a safe and compliant FiveM community ecosystem."><Suspense fallback={<PageLoader />}><OurAsk /></Suspense></Layout>} />
                      
                      {/* Legal pages */}
                      <Route path="/privacy-policy" element={<Layout title="Privacy Policy | FiveM DB Data Protection & Privacy" description="FiveM DB privacy policy detailing how we collect, use, and protect your personal data in compliance with privacy regulations."><Suspense fallback={<PageLoader />}><PrivacyPolicy /></Suspense></Layout>} />
                      <Route path="/terms-of-service" element={<Layout title="Terms of Service | FiveM DB Platform Terms & Conditions" description="FiveM DB terms of service outlining user agreements, platform rules, and legal obligations for using our services."><Suspense fallback={<PageLoader />}><TermsOfService /></Suspense></Layout>} />
                      <Route path="/usage-policy" element={<Layout title="Usage Policy | FiveM DB Acceptable Use Guidelines" description="FiveM DB usage policy defining acceptable use guidelines, prohibited activities, and community standards."><Suspense fallback={<PageLoader />}><UsagePolicy /></Suspense></Layout>} />
                      <Route path="/data-policy" element={<Layout title="Data Policy | FiveM DB Information Handling & Storage" description="FiveM DB data policy explaining how we handle, store, and process community data and reports securely."><Suspense fallback={<PageLoader />}><DataPolicy /></Suspense></Layout>} />
                      <Route path="/how-we-use-your-data" element={<Layout title="How We Use Your Data | FiveM DB Data Processing Practices" description="Detailed explanation of how FiveM DB processes and uses your data to provide community safety services."><Suspense fallback={<PageLoader />}><HowWeUseYourData /></Suspense></Layout>} />
                      <Route path="/legal" element={<Layout title="Legal Information | FiveM DB Legal Documents & Policies" description="Access all FiveM DB legal documents, policies, and important legal information in one centralized location."><Suspense fallback={<PageLoader />}><Legal /></Suspense></Layout>} />
                      
                      {/* Admin Routes - Protected */}
                      <Route path="/admin" element={<Suspense fallback={<PageLoader />}><AdminPanel /></Suspense>} />
                      <Route path="/admin/discord-login" element={<Suspense fallback={<PageLoader />}><DiscordLogin /></Suspense>} />
                      <Route path="/admin/discord-callback" element={<Suspense fallback={<PageLoader />}><DiscordCallback /></Suspense>} />
                      <Route path="/admin/statistics" element={<Suspense fallback={<PageLoader />}><AdminRouteGuard><AdminStatistics /></AdminRouteGuard></Suspense>} />
                      <Route path="/admin/history" element={<Suspense fallback={<PageLoader />}><AdminRouteGuard><AdminHistory /></AdminRouteGuard></Suspense>} />
                      <Route path="/admin/blacklists" element={<Suspense fallback={<PageLoader />}><AdminRouteGuard><AdminBlacklists /></AdminRouteGuard></Suspense>} />
                      <Route path="/admin/database" element={<Suspense fallback={<PageLoader />}><AdminRouteGuard><AdminDatabase /></AdminRouteGuard></Suspense>} />
                      <Route path="/admin/maintainer" element={<Suspense fallback={<PageLoader />}><AdminRouteGuard><AdminMaintainer /></AdminRouteGuard></Suspense>} />
                      <Route path="/admin/partners" element={<Suspense fallback={<PageLoader />}><AdminRouteGuard><PartnersManager /></AdminRouteGuard></Suspense>} />
                      <Route path="/admin/featured-creators" element={<Suspense fallback={<PageLoader />}><AdminRouteGuard><FeaturedCreators /></AdminRouteGuard></Suspense>} />
                      <Route path="/admin/creator-market" element={<Suspense fallback={<PageLoader />}><AdminRouteGuard><CreatorMarketManager /></AdminRouteGuard></Suspense>} />
                      
                      <Route path="/creator-release-market" element={<Layout title="Creator Release Market | FiveM Resource Marketplace" description="Browse and discover new FiveM resources, scripts, and content from verified creators in our community marketplace."><Suspense fallback={<PageLoader />}><CreatorReleaseMarket /></Suspense></Layout>} />
                      
                      {/* Seal of Approval - Dynamic route */}
                      <Route path="/SOA/:creator_name" element={<Layout title="Seal of Approval | FiveM DB" description="Verify creator authenticity with our Seal of Approval system."><Suspense fallback={<PageLoader />}><SealOfApproval /></Suspense></Layout>} />

                      {/* Maintainer Panel with nested routes - Protected */}
                      <Route path="/Maintainer" element={<Suspense fallback={<PageLoader />}><AdminRouteGuard><AdminMaintainer /></AdminRouteGuard></Suspense>}>
                        <Route index element={<Suspense fallback={<PageLoader />}><AdminRouteGuard><MaintainerDashboard /></AdminRouteGuard></Suspense>} />
                        <Route path="admins/add" element={<Suspense fallback={<PageLoader />}><AdminRouteGuard><MaintainerAddAdmins /></AdminRouteGuard></Suspense>} />
                        <Route path="maintainers/add" element={<Suspense fallback={<PageLoader />}><AdminRouteGuard><MaintainerAddMaintainers /></AdminRouteGuard></Suspense>} />
                        <Route path="admins/permissions" element={<Suspense fallback={<PageLoader />}><AdminRouteGuard><MaintainerEditAdminPermissions /></AdminRouteGuard></Suspense>} />
                        <Route path="maintainers/permissions" element={<Suspense fallback={<PageLoader />}><AdminRouteGuard><MaintainerEditMaintainerPermissions /></AdminRouteGuard></Suspense>} />
                        <Route path="exports" element={<Suspense fallback={<PageLoader />}><AdminRouteGuard><MaintainerDatabaseExports /></AdminRouteGuard></Suspense>} />
                        <Route path="imports" element={<Suspense fallback={<PageLoader />}><AdminRouteGuard><MaintainerDatabaseImports /></AdminRouteGuard></Suspense>} />
                        <Route path="settings" element={<Suspense fallback={<PageLoader />}><AdminRouteGuard><MaintainerWebsiteSettings /></AdminRouteGuard></Suspense>} />
                      </Route>
                      
                      <Route path="*" element={<Layout title="Page Not Found | FiveM DB" description="The page you're looking for doesn't exist. Return to FiveM DB to access our compliance tools, blacklist checkers, and community resources."><Suspense fallback={<PageLoader />}><NotFound /></Suspense></Layout>} />
                    </Routes>
                  </Suspense>
                </MaintenanceWrapper>
              </BrowserRouter>
            </TooltipProvider>
          </AdminAuthProvider>
        </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
