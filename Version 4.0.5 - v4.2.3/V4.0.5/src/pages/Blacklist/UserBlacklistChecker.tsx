import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Search, User, Shield } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useStatistics } from "@/hooks/useStatistics";
import { EvidenceViewer } from "@/components/EvidenceViewer";
import { Helmet } from "react-helmet";

const UserBlacklistChecker = () => {
  const [userName, setUserName] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { trackToolUsage } = useStatistics();
  const [discordProfile, setDiscordProfile] = useState<any>(null);

  const userCheckerJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "FiveM User Blacklist Checker",
    description: "Check FiveM users and Discord IDs for blacklist violations, TOS breaches, and community safety issues with proof-backed evidence.",
    url: "https://fivemdb.online/user-blacklist-checker",
    applicationCategory: "SecurityApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  const handleCheck = async () => {
    if (!userName.trim()) {
      toast.error("Please enter a Discord ID or FiveM ID to check");
      return;
    }

    const cleanInput = userName.trim();
    if (!cleanInput.toLowerCase().startsWith('discord:') && !cleanInput.toLowerCase().startsWith('fivem:')) {
      toast.error("Please use the format: discord:ID or fivem:ID");
      return;
    }

    setIsChecking(true);
    setDiscordProfile(null);
    
    try {
      // Track tool usage
      await trackToolUsage('user_blacklist_checker');
      
      // Use the blacklist-checker function for consistent checking
      const { data: response, error } = await supabase.functions.invoke('blacklist-checker', {
        body: {
          action: 'check_user',
          data: {
            query: userName.trim(),
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
        issues: response.found && response.result ? [response.result.reason] : [],
        severity: response.found ? "high" : "none",
        foundEntry: response.result
      };

      // If this is a Discord ID, fetch the Discord profile from backend
      const isDiscord = cleanInput.toLowerCase().startsWith('discord:');
      if (isDiscord) {
        const discordId = cleanInput.split(':')[1]?.trim();
        if (discordId) {
          try {
            const { data: profileRes, error: profileErr } = await supabase.functions.invoke('discord-user-profile', {
              body: { user_id: discordId }
            });
            if (profileErr) {
              console.error('Discord profile fetch error:', profileErr);
            } else {
              setDiscordProfile(profileRes?.profile || profileRes);
            }
          } catch (e) {
            console.error('Discord profile fetch exception:', e);
          }
        }
      }
      
      setResults(result);
      
      if (result.isCompliant) {
        toast.success("User check completed - No violations found");
      } else {
        toast.warning("User found in blacklist database");
      }
    } catch (error) {
      toast.error("Error checking user");
      console.error("User check error:", error);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) setUserName(q);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <Helmet>
        <title>FiveM Database - User Blacklist Checker</title>
        <meta name="description" content="Check if a FiveM user is blacklisted for leaking, reselling, or violating compliance. See reports on users caught using leak sites like vag.gg, LauncherLeaks, and more. Protect your server and creators." />
        <meta name="keywords" content="FiveM user checker, Discord blacklist, FiveM ID checker, user verification, CFX user blacklist, FiveM player checker, Discord ID lookup, FiveM user violations, player reputation, community safety, user background check, FiveM security" />
        <link rel="canonical" href="https://fivemdb.net/user-blacklist-checker" />
        <meta property="og:title" content="FiveM Database - User Blacklist Checker" />
        <meta property="og:description" content="Check if a FiveM user is blacklisted for leaking, reselling, or violating compliance. See reports on users caught using leak sites like vag.gg, LauncherLeaks, and more. Protect your server and creators." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fivemdb.net/user-blacklist-checker" />
        <meta property="og:image" content="https://cdn.velocitynet.work/5DB/Data/5DBEmbed.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FiveM User Blacklist Checker | Discord & FiveM ID Verification" />
        <meta name="twitter:description" content="Check FiveM users and Discord IDs for blacklist violations, TOS breaches, and community safety issues with proof-backed evidence." />
        <meta name="twitter:image" content="https://cdn.velocitynet.work/5DB/Data/5DBEmbed.png" />
        <script type="application/ld+json">{JSON.stringify(userCheckerJsonLd)}</script>
      </Helmet>
      <main className="flex-grow pt-20 md:pt-32 px-4 md:px-6 pb-8">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20 mb-6">
              <User className="h-8 w-8 text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              User Blacklist Checker
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Verify user reputation and check for violations in our comprehensive database
            </p>
          </div>

          <div className="space-y-8">
            {/* Input Section */}
            <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-semibold text-foreground flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Search className="h-5 w-5 text-blue-400" />
                  </div>
                  User Verification
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                  Enter a Discord ID (discord:123456789012345678) or FiveM ID (fivem:12345) to check for violations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-4">
                  <Input
                    placeholder="Enter discord:123456789012345678 or fivem:12345..."
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
                    className="flex-1 h-12 text-base bg-background/50 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  />
                  <Button 
                    onClick={handleCheck}
                    disabled={isChecking}
                    className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                  >
                    {isChecking ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Checking...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Search className="h-4 w-4" />
                        Check User
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
                              {results.isCompliant ? 'Clean Record' : 'User Flagged'}
                            </h3>
                            <p className="text-muted-foreground">
                              {results.isCompliant 
                                ? 'This user has no violations on record'
                                : 'This user has been flagged for violations'
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
                          {results.isCompliant ? 'VERIFIED' : 'FLAGGED'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Discord Profile Card */}
                {discordProfile && (
                  <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                          <User className="h-4 w-4 text-indigo-400" />
                        </div>
                        Discord Profile
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="p-6 bg-indigo-500/5 border border-indigo-500/20 rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={discordProfile?.avatar
                                ? `https://cdn.discordapp.com/avatars/${discordProfile.id}/${discordProfile.avatar}.png?size=256`
                                : `https://cdn.discordapp.com/embed/avatars/${(Number(discordProfile?.discriminator ?? 0) % 5)}.png`}
                              alt={`Discord avatar for ${discordProfile?.global_name || discordProfile?.username || discordProfile?.id}`}
                              className="w-16 h-16 rounded-full border-2 border-indigo-500/20"
                              referrerPolicy="no-referrer"
                              loading="lazy"
                            />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                              <User className="h-3 w-3 text-white" />
                            </div>
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium text-indigo-400">Username:</span>
                              <span className="text-foreground font-medium">
                                {discordProfile?.username}
                                {discordProfile?.discriminator && discordProfile?.discriminator !== '0' ? `#${discordProfile.discriminator}` : ''}
                              </span>
                            </div>
                            {discordProfile?.global_name && (
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-indigo-400">Display:</span>
                                <span className="text-foreground">{discordProfile.global_name}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium text-indigo-400">ID:</span>
                              <span className="text-muted-foreground text-sm font-mono">{discordProfile?.id}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Violation Details */}
                {results.foundEntry && (
                  <div className="space-y-6">
                    {/* User Details Card */}
                    <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <User className="h-4 w-4 text-blue-400" />
                          </div>
                          User Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {results.foundEntry.discord_id && (
                              <div className="space-y-2">
                                <span className="text-sm font-medium text-blue-400">Discord ID</span>
                                <div className="p-3 bg-background/50 rounded-lg border border-blue-500/10">
                                  <span className="text-foreground font-mono text-sm">{results.foundEntry.discord_id}</span>
                                </div>
                              </div>
                            )}
                            {results.foundEntry.fivem_id && (
                              <div className="space-y-2">
                                <span className="text-sm font-medium text-blue-400">FiveM ID</span>
                                <div className="p-3 bg-background/50 rounded-lg border border-blue-500/10">
                                  <span className="text-foreground font-mono text-sm">{results.foundEntry.fivem_id}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Violation Reason Card */}
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
                              <p className="text-muted-foreground leading-relaxed">{results.foundEntry.reason}</p>
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
                        <EvidenceViewer imageUrls={results.foundEntry?.proof_images || results.foundEntry?.images || []} linkUrls={results.foundEntry?.evidence_links || results.foundEntry?.evidence || []} />
                      </CardContent>
                    </Card>
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
                    Protecting the FiveM community from problematic users through comprehensive monitoring
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-card/30 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                    <User className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">User Verification</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Verify user reputation and complete violation history with detailed reports
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-card/30 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="h-8 w-8 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Violation Tracking</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Track and document user violations with comprehensive evidence collection
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

export default UserBlacklistChecker;