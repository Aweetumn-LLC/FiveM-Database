import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Search, BarChart3, Users, Star, Zap, Globe, Award, TrendingUp, Database, ArrowRight, CheckCircle, Sparkles, Heart, Lock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { WebsiteStatsGrid } from "@/components/WebsiteStatsGrid";
import RecentActivity from "@/components/RecentActivity";
import CreatorCarousel from "@/components/CreatorCarousel";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Helmet } from "react-helmet";

const Home = () => {
  const { user } = useAdminAuth();
  useVisitorTracking();

  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FiveM Database",
    alternateName: "FiveM DB",
    url: "https://fivemdb.net",
    description: "Community-driven FiveM resource compliance checking, CFX blacklist verification, and FiveM server security database.",
    keywords: "FiveM, CFX, GTA5, Rockstar Games, Leaks, Blacklists, FiveM Scripts, MLOs, Maps, FiveM Database, CFX Compliance, FiveM TOS, FiveM COC, server blacklists, resource checker, modding, exploit, anticheat",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://fivemdb.net/resource-checker?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>FiveM Database | FiveM Resource Compliance & CFX Blacklist Database</title>
        <meta name="description" content="Check FiveM scripts, maps, MLOs, and servers for CFX compliance, leaks, blacklists, and TOS/COC violations. Community-driven FiveM database with real-time verification tools." />
        <meta name="keywords" content="FiveM, CFX, GTA5, Rockstar Games, FiveM Leaks, Blacklists, FiveM Scripts, MLOs, Maps, FiveM Database, FiveM DB, CFX Compliance, FiveM TOS, FiveM COC, server blacklists, resource checker, modding, exploit, anticheat, fivem store, fivem resources, fivem security" />
        <link rel="canonical" href="https://fivemdb.net/" />
        <meta property="og:title" content="FiveM Database | FiveM Resource Compliance & CFX Blacklist Database" />
        <meta property="og:description" content="Check FiveM scripts, maps, MLOs, and servers for CFX compliance, leaks, blacklists, and TOS/COC violations. Community-driven FiveM database with real-time verification tools." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fivemdb.net/" />
        <meta property="og:image" content="https://cdn.velocitynet.work/5DB/Data/5DBEmbed.png" />
        <meta property="og:site_name" content="FiveM Database" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FiveM Database | FiveM Resource Compliance & CFX Blacklist Database" />
        <meta name="twitter:description" content="Check FiveM scripts, maps, MLOs, and servers for CFX compliance, leaks, blacklists, and TOS/COC violations. Community-driven FiveM database." />
        <meta name="twitter:image" content="https://cdn.velocitynet.work/5DB/Data/5DBEmbed.png" />
        <script type="application/ld+json">{JSON.stringify(homeJsonLd)}</script>
      </Helmet>

      {/* Featured Creators - Moved to top */}
      <section className="py-16 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <Badge variant="outline" className="mb-4 px-4 py-2 text-primary border-primary/30 bg-primary/10">
              Community Spotlight
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Featured <span className="text-primary">Creators</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover amazing content from our verified creator partners
            </p>
          </motion.div>
          <CreatorCarousel />
        </div>
      </section>
      
      
      {/* Hero Section - Dramatically Enhanced */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-3xl animate-pulse opacity-60" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-accent/30 to-primary/30 rounded-full blur-3xl animate-pulse opacity-60" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-screen bg-gradient-radial from-primary/5 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Anniversary Banner */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <div className="glass-effect rounded-2xl border border-primary/30 p-6 max-w-md mx-auto mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Heart className="w-6 h-6 text-pink-400" />
                  <span className="text-2xl font-bold text-gradient">Happy 1 Year</span>
                  <Heart className="w-6 h-6 text-pink-400" />
                </div>
                <Button asChild className="w-full">
                  <Link to="/events/thank-you">
                    <Sparkles className="mr-2 h-4 w-4" />
                    THANK YOU
                  </Link>
                </Button>
              </div>

              <Badge variant="outline" className="mb-6 px-6 py-3 text-lg font-medium border-primary/50 bg-primary/10 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Community Driven • Trusted Worldwide
              </Badge>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tight"
            >
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-300% animate-rainbow-gradient bg-clip-text text-transparent">
                FiveM DB
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-2xl md:text-3xl text-muted-foreground max-w-5xl mx-auto mb-16 leading-relaxed font-light"
            >
              The ultimate community-driven platform for FiveM compliance, blacklist verification, 
              and resource validation. <span className="text-primary font-medium">Protect your community today.</span>
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
            >
              <Button asChild size="lg" className="elegant-hover px-12 py-6 text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-primary/20 transition-all duration-300">
                <Link to="/resource-checker">
                  <Shield className="mr-3 h-6 w-6" />
                  Start Checking <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="elegant-hover px-12 py-6 text-xl font-semibold rounded-2xl border-2 hover:bg-primary/10 transition-all duration-300">
                <Link to="/what-is-fivem-db">
                  Learn More
                </Link>
              </Button>
            </motion.div>

            {/* Admin Panel Links */}
            {user && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              >
                <Button asChild variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-xl">
                  <Link to="/admin">
                    <Shield className="mr-2 h-4 w-4" />
                    Admin Panel
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-orange-500/50 text-orange-400 hover:bg-orange-500/20 hover:text-orange-300 rounded-xl">
                  <Link to="/Maintainer">
                    <Lock className="mr-2 h-4 w-4" />
                    Maintainer Panel
                  </Link>
                </Button>
              </motion.div>
            )}
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
              <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section - Redesigned */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
        
         <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge variant="outline" className="mb-6 px-4 py-2 text-primary border-primary/30 bg-primary/10">
              Professional Tools
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Powered By Nexora Data Limited
              </span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Everything you need to maintain a safe, compliant, and thriving FiveM community
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-3xl p-12 text-center">
              <h3 className="text-3xl font-bold mb-6">
                <a 
                  href="https://nexoradata.ltd" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:text-primary/80 transition-colors duration-200"
                >
                  FiveM DB By Nexora Data Limited
                </a>
              </h3>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Nexora Data Limited provides all of the data, running & Operations to FiveM Database.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-white">Contact</h4>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>Email:</strong> sophia@nexoradata.ltd</p>
                    <p><strong>Legal:</strong> legal@nexoradata.ltd</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-white">Address</h4>
                  <p className="text-muted-foreground">
                    Scotland, Glasgow, G1 1AB
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <Button asChild size="lg" className="px-8 py-4">
                  <a href="https://nexoradata.ltd" target="_blank" rel="noopener noreferrer">
                    Visit Nexora Data Limited
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity - All Website Activity */}
      <section className="py-32 bg-card/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Recent <span className="text-primary">Activity</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Live activity feed from FiveM Database
            </p>
          </motion.div>
          <RecentActivity />
        </div>
      </section>

      {/* Call to Action - Redesigned */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20" />
        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-5xl mx-auto"
          >
            <Badge variant="outline" className="mb-8 px-6 py-3 text-lg border-primary/50 bg-primary/10">
              Join the Community
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Ready to <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Transform</span> Your Community?
            </h2>
            <p className="text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of server owners and creators who trust FiveM DB for their compliance and security needs
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="elegant-hover px-12 py-6 text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-primary/20 transition-all duration-300">
                <Link to="/resource-checker">
                  Start Checking Resources
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="elegant-hover px-12 py-6 text-xl font-semibold rounded-2xl border-2 hover:bg-primary/10 transition-all duration-300">
                <Link to="/creator-partners">
                  Become a Partner
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;