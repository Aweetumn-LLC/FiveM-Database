import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Search, Store, Shield } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useStatistics } from "@/hooks/useStatistics";
import { EvidenceViewer } from "@/components/EvidenceViewer";
import { Helmet } from "react-helmet";

const StoreBlacklistChecker = () => {
  const [storeName, setStoreName] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { trackToolUsage } = useStatistics();

  const storeCheckerJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "FiveM Store Blacklist Checker",
    description: "Check FiveM stores, hosting providers, and websites for blacklist status, content violations, and unauthorized sales with evidence-backed verification.",
    url: "https://fivemdb.net/store-blacklist-checker",
    applicationCategory: "SecurityApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  const handleCheck = async () => {
    if (!storeName.trim()) {
      toast.error("Please enter a store name or URL to check");
      return;
    }

    setIsChecking(true);
    
    try {
      // Track tool usage
      await trackToolUsage('store_blacklist_checker');
      
      // Use the blacklist-checker function for consistent checking
      const { data: response, error } = await supabase.functions.invoke('blacklist-checker', {
        body: {
          action: 'check_store',
          data: {
            query: storeName.trim(),
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
        severity: response.found ? "high" : "none"
      };
      
      setResults(result);
      
      if (result.isCompliant) {
        toast.success("Store check completed - No violations found");
      } else {
        toast.warning("Store found in blacklist database");
      }
    } catch (error) {
      toast.error("Error checking store");
      console.error("Store check error:", error);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) setStoreName(q);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <Helmet>
        <title>FiveM Database - Store Blacklist Checker</title>
        <meta name="description" content="Verify if a FiveM store is blacklisted for reselling scripts, leaking assets, or scamming creators. Use FiveM Database's store blacklist to shop safely and protect your community." />
        <meta name="keywords" content="FiveM store checker, store blacklist, hosting blacklist, website verification, FiveM store verification, Tebex store checker, leak store checker, unauthorized sales, content protection, creator protection, CFX store verification, FiveM marketplace checker" />
        <link rel="canonical" href="https://fivemdb.net/store-blacklist-checker" />
        <meta property="og:title" content="FiveM Database - Store Blacklist Checker" />
        <meta property="og:description" content="Verify if a FiveM store is blacklisted for reselling scripts, leaking assets, or scamming creators. Use FiveM Database's store blacklist to shop safely and protect your community." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fivemdb.net/store-blacklist-checker" />
        <meta property="og:image" content="https://cdn.velocitynet.work/5DB/Data/5DBEmbed.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FiveM Database - Store Blacklist Checker" />
        <meta name="twitter:description" content="Verify if a FiveM store is blacklisted for reselling scripts, leaking assets, or scamming creators. Use FiveM Database's store blacklist to shop safely." />
        <meta name="twitter:image" content="https://cdn.velocitynet.work/5DB/Data/5DBEmbed.png" />
        <meta property="og:image" content="https://cdn.velocitynet.work/5DB/Data/5DBEmbed.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FiveM Store Blacklist Checker | Hosting & Website Verification" />
        <meta name="twitter:description" content="Check FiveM stores, hosting providers, and websites for blacklist status and content violations." />
        <meta name="twitter:image" content="https://cdn.velocitynet.work/5DB/Data/5DBEmbed.png" />
        <script type="application/ld+json">{JSON.stringify(storeCheckerJsonLd)}</script>
      </Helmet>
      <main className="flex-grow pt-20 md:pt-32 px-4 md:px-6 pb-8">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="relative inline-flex items-center justify-center mb-8">
              <div className="absolute inset-0 w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-500/20 to-red-500/20 blur-xl"></div>
              <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 flex items-center justify-center backdrop-blur-sm">
                <Store className="h-10 w-10 text-orange-400" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent mb-6 tracking-tight">
              Store Checker
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive store and hosting provider verification system
            </p>
          </div>

          <div className="space-y-8">
            {/* Input Section */}
            <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-semibold text-foreground flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <Search className="h-5 w-5 text-orange-400" />
                  </div>
                  Store Verification
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                  Enter a store name, website URL, or Discord to check for violations and unauthorized content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-4">
                  <Input
                    placeholder="Enter store name, website, or Discord..."
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
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
                        Check Store
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
                              {results.isCompliant ? 'Store Verified' : 'Store Flagged'}
                            </h3>
                            <p className="text-muted-foreground">
                              {results.isCompliant 
                                ? 'This store appears to be legitimate'
                                : 'This store has been flagged for violations'
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
                          {results.isCompliant ? 'LEGITIMATE' : 'FLAGGED'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Store Details */}
                {results.results && results.results.length > 0 && (
                  <div className="space-y-6">
                    {results.results.map((entry: any, entryIndex: number) => (
                      <div key={entryIndex} className="space-y-6">
                        {/* Store Information Card */}
                        <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
                          <CardHeader>
                            <CardTitle className="text-xl font-semibold flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                <Store className="h-4 w-4 text-blue-400" />
                              </div>
                              Store Information
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-xl space-y-4">
                              {entry.store_name && (
                                <div className="space-y-2">
                                  <span className="text-sm font-medium text-blue-400">Store Name</span>
                                  <div className="p-3 bg-background/50 rounded-lg border border-blue-500/10">
                                    <span className="text-foreground font-medium">{entry.store_name}</span>
                                  </div>
                                </div>
                              )}
                              {entry.store_links && entry.store_links.length > 0 && (
                                <div className="space-y-2">
                                  <span className="text-sm font-medium text-blue-400">Store Links</span>
                                  <div className="space-y-2">
                                    {entry.store_links.map((link: string, linkIndex: number) => (
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
                  <h3 className="text-xl font-semibold text-foreground mb-3">Content Protection</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Protecting creators from unauthorized sales and content theft
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-card/30 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                    <Store className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Store Verification</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Verify legitimacy of FiveM stores and hosting providers
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-card/30 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="h-8 w-8 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Leak Prevention</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Identify stores selling leaked content and unauthorized resources
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

export default StoreBlacklistChecker;