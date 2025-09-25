import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Search, Shield, Zap, Info, Globe, Hash, User, AlertTriangle } from "lucide-react";
import { checkResourceCompliance } from "@/utils/blacklistChecker";
import { useResourceStats } from "@/hooks/useResourceStats";
import { useStatistics } from "@/hooks/useStatistics";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet";

const ResourceChecker = () => {
  const [resourceName, setResourceName] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { incrementStats } = useResourceStats();
  const { trackToolUsage, updateComplianceStats } = useStatistics();
  const [hasTrackedThisSearch, setHasTrackedThisSearch] = useState(false); // Prevent duplicate tracking

  const resourceCheckerJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "FiveM Resource Checker",
    description: "Check FiveM resources, scripts, maps, MLOs, and creators for compliance violations, blacklist status, and CFX TOS issues with real-time verification.",
    url: "https://fivemdb.net/resource-checker",
    applicationCategory: "SecurityApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  const handleCheck = async () => {
    if (!resourceName.trim()) {
      toast.error("You have not Enterd a Resource Name, Resource Link Or Discord Server Invite / ID");
      return;
    }

    setIsChecking(true);
    setHasTrackedThisSearch(false); // Reset tracking flag
    
    try {
      console.log('Starting resource check for:', resourceName);
      const checkResults = await checkResourceCompliance(resourceName);
      setResults(checkResults);
      
      // Determine search type
      const getSearchType = (query: string) => {
        if (query.match(/^\d{17,19}$/)) return 'discord_id';
        if (query.match(/^https?:\/\//)) return 'url';
        if (query.includes('discord.gg/') || query.includes('discord.com/invite/')) return 'url';
        return 'name';
      };

      // Save individual search to database and track statistics ONLY ONCE
      if (!hasTrackedThisSearch) {
        console.log('Tracking search result:', { isBlacklisted: !checkResults.isCompliant });
        
        try {
          // Save individual search to database
          await supabase.from('resource_searches').insert({
            search_query: resourceName.trim(),
            search_type: getSearchType(resourceName.trim()),
            is_blacklisted: !checkResults.isCompliant,
            violation_keywords: checkResults.issues || [],
            violation_type: checkResults.severity === 'critical' ? 'coc' : checkResults.severity === 'high' ? 'ip' : null,
            user_agent: navigator.userAgent,
          });

          // Track blacklist search in statistics tracker
          await supabase.functions.invoke('statistics-tracker', {
            body: {
              action: 'track_blacklist_search',
              data: {
                search_type: 'resource',
                search_query: resourceName.trim(),
                result_found: !checkResults.isCompliant,
                ip_address: null, // Not collecting IP for privacy
                user_agent: navigator.userAgent,
                country: null
              }
            }
          });
        } catch (dbError) {
          console.error('Error saving search to database:', dbError);
          // Don't block the user experience if DB save fails
        }
        
        // Track tool usage
        await trackToolUsage('resource_checker');
        
        // Track resource stats
        await incrementStats(!checkResults.isCompliant);
        
        // Track compliance statistics
        const violationCount = checkResults.issues?.length || 0;
        const cleanCount = checkResults.isCompliant ? 1 : 0;
        await updateComplianceStats('resource_compliance', !checkResults.isCompliant, violationCount, cleanCount);
        
        setHasTrackedThisSearch(true);
      }
      
      if (checkResults.isCompliant) {
        toast.success("This Resource has been checked Successfully");
      } else {
        toast.warning("An ISSUE has been found with You're Query");
      }
    } catch (error) {
      toast.error("There has been an ERROR checking this RESOURCE");
      console.error("Resource check error:", error);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) setResourceName(q);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <Helmet>
        <title>FiveM Database - Resource & Script Compliance Checker</title>
        <meta name="description" content="Paste any FiveM script or resource link into our checker to verify compliance with FiveM's TOS and CoC. Detect leaks, unsafe scripts, or non-compliant resources instantly." />
        <meta name="keywords" content="FiveM resource checker, CFX compliance checker, FiveM script checker, FiveM map checker, MLO checker, FiveM creator checker, resource verification, script compliance, FiveM TOS checker, CFX violations, FiveM security, resource blacklist, FiveM store checker" />
        <link rel="canonical" href="https://fivemdb.net/resource-checker" />
        <meta property="og:title" content="FiveM Database - Resource & Script Compliance Checker" />
        <meta property="og:description" content="Paste any FiveM script or resource link into our checker to verify compliance with FiveM's TOS and CoC. Detect leaks, unsafe scripts, or non-compliant resources instantly." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fivemdb.net/resource-checker" />
        <meta property="og:image" content="https://cdn.velocitynet.work/5DB/Data/5DBEmbed.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FiveM Resource Checker | CFX Compliance & Script Verification" />
        <meta name="twitter:description" content="Check FiveM resources, scripts, maps, MLOs, and creators for compliance violations, blacklist status, and CFX TOS issues." />
        <meta name="twitter:image" content="https://cdn.velocitynet.work/5DB/Data/5DBEmbed.png" />
        <script type="application/ld+json">{JSON.stringify(resourceCheckerJsonLd)}</script>
      </Helmet>
      <main className="flex-grow pt-20 md:pt-32 px-4 md:px-6 pb-8">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-green-500/20 mb-6">
              <Shield className="h-8 w-8 text-green-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              FiveM Resource Checker
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Check if resources and creators are flagged in our comprehensive database
            </p>
          </div>

          <div className="space-y-8">
            {/* How to Use Guide */}
            <Card className="border-0 shadow-lg bg-card/30 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Info className="h-4 w-4 text-blue-400" />
                  </div>
                  How to Use the Resource Checker
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                  You can check resources using various input formats for comprehensive verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <Hash className="h-4 w-4 text-blue-400" />
                      </div>
                      <h4 className="font-semibold text-foreground">Discord ID</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Enter a Discord server ID (17-19 digits)</p>
                    <Badge variant="outline" className="text-xs border-blue-500/20 text-blue-400">1234567890123456789</Badge>
                  </div>
                  
                  <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <Globe className="h-4 w-4 text-green-400" />
                      </div>
                      <h4 className="font-semibold text-foreground">Website/URL</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Enter a website URL or Discord invite</p>
                    <Badge variant="outline" className="text-xs border-green-500/20 text-green-400">discord.gg/invite</Badge>
                  </div>
                  
                  <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-purple-400" />
                      </div>
                      <h4 className="font-semibold text-foreground">Creator Name</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Enter a creator or resource name</p>
                    <Badge variant="outline" className="text-xs border-purple-500/20 text-purple-400">CreatorName</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Input Section */}
            <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-semibold text-foreground flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <Search className="h-5 w-5 text-green-400" />
                  </div>
                  Resource Verification
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                  Enter a resource name, Discord ID, website, or creator to check if they're flagged
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-4">
                  <Input
                    placeholder="Enter resource name, Discord ID, website, or creator..."
                    value={resourceName}
                    onChange={(e) => setResourceName(e.target.value)}
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
                        Check
                      </div>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            {results && (
              <div className="space-y-6">
                {/* Warning Alert */}
                <Alert variant="destructive" className="border-yellow-500/30 bg-yellow-500/10 text-yellow-200">
                  <AlertTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Important
                  </AlertTitle>
                  <AlertDescription>
                    Please check if the creators match, this system can throw false positives sometimes THIS IS AN AUTOMATED SYSTEM
                  </AlertDescription>
                </Alert>

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
                              {results.isCompliant ? 'Clean' : 'Flagged'}
                            </h3>
                            <p className="text-muted-foreground">
                              {results.isCompliant 
                                ? 'This resource is not in our database - looks good!'
                                : 'This resource has been flagged in our database'
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

                {/* Issues */}
                {results.issues && results.issues.length > 0 && (
                  <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold flex items-center gap-3 text-yellow-400">
                        <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                          <AlertCircle className="h-4 w-4 text-yellow-400" />
                        </div>
                        Report Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {results.issues.map((issue: string, index: number) => (
                          <div key={index} className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                                <AlertCircle className="h-4 w-4 text-yellow-400" />
                              </div>
                              <div className="flex-1">
                                <p className="text-foreground leading-relaxed">{issue}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Recommendations */}
                {results.recommendations && results.recommendations.length > 0 && (
                  <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold flex items-center gap-3 text-blue-400">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                          <Zap className="h-4 w-4 text-blue-400" />
                        </div>
                        Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {results.recommendations.map((rec: string, index: number) => (
                          <div key={index} className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                                <Zap className="h-4 w-4 text-blue-400" />
                              </div>
                              <div className="flex-1">
                                <p className="text-foreground leading-relaxed">{rec}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
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
                  <h3 className="text-xl font-semibold text-foreground mb-3">TOS Violations</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Check against FiveM Terms of Service violations and infractions
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-card/30 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Creator Verification</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Verify creator reputation and history with detailed analysis
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-card/30 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="h-8 w-8 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Risk Assessment</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Assess potential risks and issues with comprehensive reports
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

export default ResourceChecker;
