
import { ReactNode, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { TooltipProvider } from './ui/tooltip';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const Layout = ({ children, title = "FiveM DB", description = "FiveM DB - Community Driven Reports Database" }: LayoutProps) => {
  const location = useLocation();
  const canonicalUrl = useMemo(() => `https://fivemdb.net${location?.pathname || ''}${location?.search || ''}`,[location]);
  const defaultOgImage = 'https://cdn.velocitynet.work/5DB/Data/5DBEmbed.png';
  const defaultKeywords = 'FiveM, CFX, GTA5, Rockstar Games, Leaks, Blacklists, Leaking, Cheats, Scripts, MLOs, Maps, FiveM Database, FiveM DB, Velocity, Velocity Network, FiveM Compliance, CFX Compliance, compliance, server blacklists, resource checker, TOS, COC, modding, exploit, anticheat';
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FiveM DB",
    url: "https://fivemdb.net/",
    logo: defaultOgImage,
  };
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={defaultKeywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="en" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={defaultOgImage} />
        <meta property="og:site_name" content="FiveM DB" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={defaultOgImage} />
        <script type="application/ld+json">
          {JSON.stringify(orgJsonLd)}
        </script>
      </Helmet>
      <div className="flex flex-col min-h-screen w-full relative">
        {/* Header */}
        <Header />
        
        {/* Main content area with modern styling */}
        <main className="flex-1 w-full relative">
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
          
          <TooltipProvider>
            <div className="relative z-10 flex flex-col min-h-screen">
              <div className="flex-1">
                {children}
              </div>
              <Footer />
            </div>
          </TooltipProvider>
        </main>
      </div>
    </>
  );
};

export default Layout;
