import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Search, MessageSquare, Shield } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useStatistics } from "@/hooks/useStatistics";
import { EvidenceViewer } from "@/components/EvidenceViewer";
import { Helmet } from "react-helmet";

const DiscordBlacklistChecker = () => {
  const [discordInput, setDiscordInput] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { trackToolUsage } = useStatistics();

  const discordCheckerJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Discord Server Blacklist Checker",
    description: "Check Discord servers for blacklist status, community violations, and inappropriate content using invite links or server IDs with evidence-backed verification.",
    url: "https://fivemdb.online/discord-blacklist-checker",
    applicationCategory: "SecurityApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  const handleCheck = async () => {
    if (!discordInput.trim()) {
      toast.error("Please enter a Discord server invite or ID to check");
      return;
    }

    setIsChecking(true);
    
    try {
      // Track tool usage
      await trackToolUsage('discord_blacklist_checker');
      
      // Use the blacklist-checker function for consistent checking
      const { data: response, error } = await supabase.functions.invoke('blacklist-checker', {
        body: {
          action: 'check_discord',
          data: {
            query: discordInput.trim(),
            ip_address: null,
            user_agent: navigator.userAgent,
            country: null
          }
        }
      });
      
      if (error) {
        throw error;
      }
      
      const result = {
        isCompliant: response.isCompliant,
        results: response.results || [],
        severity: response.found ? "medium" : "none"
      };
      
      setResults(result);
      
      if (result.isCompliant) {
        toast.success("Discord server check completed - No violations found");
      } else {
        toast.warning("Discord server found in blacklist database");
      }
    } catch (error) {
      toast.error("Error checking Discord server");
      console.error("Discord check error:", error);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) setDiscordInput(q);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-purple-500/5">
      <Helmet>
        <title>FiveM Database - Discord Blacklist Checker</title>
        <meta name="description" content="Find out if a Discord server is blacklisted for leaking FiveM scripts, reselling creator assets, or supporting leak communities. Protect yourself and your team by avoiding unsafe discords." />
        <meta name="keywords" content="Discord blacklist checker, Discord server checker, Discord server verification, Discord community safety, Discord server blacklist, harmful Discord servers, Discord leak servers, Discord server violations, community protection, Discord safety checker" />
        <link rel="canonical" href="https://fivemdb.online/discord-blacklist-checker" />
        <meta property="og:title" content="FiveM Database - Discord Blacklist Checker" />
        <meta property="og:description" content="Find out if a Discord server is blacklisted for leaking FiveM scripts, reselling creator assets, or supporting leak communities. Protect yourself and your team by avoiding unsafe discords." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fivemdb.online/discord-blacklist-checker" />
        <meta property="og:image" content="https://fivemdb.online/images/og-default-1200x630.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Discord Server Blacklist Checker | Community Safety & Verification" />
        <meta name="twitter:description" content="Check Discord servers for blacklist status, community violations, and safety issues with evidence verification." />
        <meta name="twitter:image" content="https://fivemdb.online/images/og-default-1200x630.png" />
        <script type="application/ld+json">{JSON.stringify(discordCheckerJsonLd)}</script>
      </Helmet>
      
      <main className="flex-grow pt-20 md:pt-24 px-4 md:px-6 pb-12">
        <div className="container mx-auto max-w-7xl">
          {/* Enhanced Header */}
          <div className="text-center mb-16">
            <div className="relative inline-flex items-center justify-center mb-8">
              <div className="absolute inset-0 w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-xl"></div>
              <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 flex items-center justify-center backdrop-blur-sm">
                <MessageSquare className="h-10 w-10 text-purple-400" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6 tracking-tight">
              Discord Checker
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive Discord server safety verification with community protection
            </p>
            <div className="flex justify-center gap-4 mt-8">
              <Badge variant="outline" className="px-4 py-2 text-sm">
                <Shield className="h-4 w-4 mr-2" />
                Community Safety
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Server Verification
              </Badge>
            </div>
          </div>

          <div className="space-y-8">
            {/* Enhanced Input Section */}
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5"></div>
              <CardHeader className="relative pb-8">
                <CardTitle className="text-3xl font-bold text-foreground flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-purple-500/20">
                    <Search className="h-6 w-6 text-purple-400" />
                  </div>
                  Discord Security Center
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  Verify Discord server safety and community compliance status
                </CardDescription>
              </CardHeader>
              <CardContent className="relative space-y-8">
                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Supported Formats</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                        discord.gg/invite
                      </Badge>
                      <span className="text-muted-foreground">Invite Links</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                        1234567890123456789
                      </Badge>
                      <span className="text-muted-foreground">Server IDs</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Input
                      placeholder="Enter Discord invite link or server ID..."
                      value={discordInput}
                      onChange={(e) => setDiscordInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
                      className="h-14 text-lg bg-background/80 border-2 border-border/50 focus:border-purple-500/70 focus:ring-4 focus:ring-purple-500/20 rounded-xl backdrop-blur-sm transition-all duration-300"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/5 to-blue-500/5 pointer-events-none"></div>
                  </div>
                  <Button 
                    onClick={handleCheck}
                    disabled={isChecking}
                    className="h-14 px-8 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    {isChecking ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Verifying...
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Search className="h-5 w-5" />
                        Check Discord
                      </div>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            {results && (
              <div className="space-y-6">
                {/* Status Card */}
                <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className={`rounded-2xl p-6 border-2 ${
                      results.isCompliant 
                        ? 'bg-green-500/5 border-green-500/20' 
                        : 'bg-red-500/5 border-red-500/20'
                    }`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            results.isCompliant ? 'bg-green-500/10' : 'bg-red-500/10'
                          }`}>
                            {results.isCompliant ? (
                              <CheckCircle className="h-6 w-6 text-green-400" />
                            ) : (
                              <AlertCircle className="h-6 w-6 text-red-400" />
                            )}
                          </div>
                          <div>
                            <h3 className={`text-2xl font-bold ${
                              results.isCompliant ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {results.isCompliant ? 'Discord Clean' : 'Discord Flagged'}
                            </h3>
                            <p className="text-muted-foreground">
                              {results.isCompliant 
                                ? 'This Discord server has no violations on record'
                                : 'This Discord server has been flagged for violations'
                              }
                            </p>
                          </div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`px-4 py-2 text-sm font-medium ${
                            results.isCompliant 
                              ? 'border-green-500/40 text-green-400 bg-green-500/5' 
                              : 'border-red-500/40 text-red-400 bg-red-500/5'
                          }`}
                        >
                          {results.isCompliant ? 'SAFE' : 'FLAGGED'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Discord Server Details */}
                {results.results && results.results.length > 0 && (
                  <div className="space-y-6">
                    {results.results.map((entry: any, entryIndex: number) => (
                      <div key={entryIndex} className="space-y-6">
                        {/* Server Information Card */}
                        <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
                          <CardHeader>
                            <CardTitle className="text-xl font-semibold flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                <MessageSquare className="h-4 w-4 text-blue-400" />
                              </div>
                              Discord Server Information
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-xl space-y-4">
                              {entry.discord_server_name && (
                                <div className="space-y-2">
                                  <span className="text-sm font-medium text-blue-400">Server Name</span>
                                  <div className="p-3 bg-background/50 rounded-lg border border-blue-500/10">
                                    <span className="text-foreground font-medium">{entry.discord_server_name}</span>
                                  </div>
                                </div>
                              )}
                              {entry.owner_discord_id && (
                                <div className="space-y-2">
                                  <span className="text-sm font-medium text-blue-400">Owner Discord ID</span>
                                  <div className="p-3 bg-background/50 rounded-lg border border-blue-500/10">
                                    <span className="text-muted-foreground font-mono text-sm">{entry.owner_discord_id}</span>
                                  </div>
                                </div>
                              )}
                              {entry.discord_invite_links && entry.discord_invite_links.length > 0 && (
                                <div className="space-y-2">
                                  <span className="text-sm font-medium text-blue-400">Invite Links</span>
                                  <div className="space-y-2">
                                    {entry.discord_invite_links.map((link: string, linkIndex: number) => (
                                      <div key={linkIndex} className="p-3 bg-background/50 rounded-lg border border-blue-500/10">
                                        <span className="text-muted-foreground text-sm break-all">{link}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>

                        {/* Violation Details Card */}
                        <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
                          <CardHeader>
                            <CardTitle className="text-xl font-semibold flex items-center gap-3 text-yellow-400">
                              <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                                <AlertCircle className="h-4 w-4 text-yellow-400" />
                              </div>
                              Violation Details
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
                              <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                                  <AlertCircle className="h-5 w-5 text-yellow-400" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-foreground mb-2">Violation Reason</h4>
                                  <p className="text-muted-foreground leading-relaxed">{entry.reason}</p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Evidence Card */}
                        <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
                          <CardHeader>
                            <CardTitle className="text-xl font-semibold flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                <Shield className="h-4 w-4 text-purple-400" />
                              </div>
                              Evidence & Documentation
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <EvidenceViewer imageUrls={entry.proof_images || entry.images || []} linkUrls={entry.evidence_links || entry.evidence || []} />
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg bg-card/30 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-6">
                    <Shield className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Community Safety</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Protecting Discord communities from harmful content and violations
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-card/30 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                    <MessageSquare className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Server Verification</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Verify Discord server legitimacy and safety for community members
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-card/30 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="h-8 w-8 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Content Monitoring</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Monitor for inappropriate content and violations with detailed evidence
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DiscordBlacklistChecker;