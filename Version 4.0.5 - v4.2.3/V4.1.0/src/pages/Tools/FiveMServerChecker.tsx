import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Search, Server, Shield, AlertTriangle, ExternalLink, Eye } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet";

interface EvidenceData {
  type: 'blacklist' | 'store' | 'discord' | 'server';
  name: string;
  reason: string;
  proofImages: string[];
  evidenceLinks: string[];
  matchedKeywords: string[];
}

interface ServerAnalysisResult {
  serverName: string;
  connectionCode: string;
  totalResources: number;
  cleanResources: string[];
  tosViolations: string[];
  cocViolations: string[];
  evidence?: EvidenceData[];
  error?: string;
}

const FiveMServerChecker = () => {
  const [connectionCode, setConnectionCode] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<ServerAnalysisResult | null>(null);

  const serverCheckerJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "FiveM Server Checker",
    description: "Analyze FiveM servers for Terms of Service and Code of Conduct violations by checking server resources and content.",
    url: "https://fivemdb.net/fivem-server-checker",
    applicationCategory: "SecurityApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  const handleCheck = async () => {
    if (!connectionCode.trim()) {
      toast.error("Please enter a server connection code");
      return;
    }

    if (connectionCode.length !== 6 || !/^[a-zA-Z0-9]+$/.test(connectionCode)) {
      toast.error("Connection code must be 6 alphanumeric characters");
      return;
    }

    setIsChecking(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('fivem-server-checker', {
        body: { connectionCode: connectionCode.toLowerCase() }
      });
      
      if (error) {
        throw error;
      }
      
      if (data.error) {
        toast.error(data.error);
        setResults(null);
        return;
      }
      
      setResults(data);
      toast.success("Server analysis completed");
    } catch (error) {
      toast.error("Error analyzing server");
      console.error("Server check error:", error);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <Helmet>
        <title>FiveM Database - FiveM Server Compliance Checker</title>
        <meta name="description" content="Ensure your FiveM server is fully compliant with FiveM's Terms of Service and Code of Conduct. Protect your community and avoid blacklisting with FiveM Database's compliance checker." />
        <link rel="canonical" href="https://fivemdb.net/fivem-server-checker" />
        <meta property="og:title" content="FiveM Database - FiveM Server Compliance Checker" />
        <meta property="og:description" content="Ensure your FiveM server is fully compliant with FiveM's Terms of Service and Code of Conduct. Protect your community and avoid blacklisting with FiveM Database's compliance checker." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fivemdb.net/fivem-server-checker" />
        <meta property="og:image" content="https://cdn.velocitynet.work/5DB/Data/5DBEmbed.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FiveM Server Checker | Server TOS & COC Analysis" />
        <meta name="twitter:description" content="Analyze FiveM servers for Terms of Service and Code of Conduct violations." />
        <meta name="twitter:image" content="https://cdn.velocitynet.work/5DB/Data/5DBEmbed.png" />
        <script type="application/ld+json">{JSON.stringify(serverCheckerJsonLd)}</script>
      </Helmet>
      
      <main className="flex-grow pt-20 md:pt-32 px-4 md:px-6 pb-8">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20 mb-6">
              <Server className="h-8 w-8 text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              FiveM Server Checker
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Analyze FiveM servers for Terms of Service and Code of Conduct violations
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
                  Server Analysis
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                  Enter a FiveM server connection code (6 characters) to analyze for violations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-4">
                  <Input
                    placeholder="Enter connection code (e.g., A1B2C3)"
                    value={connectionCode}
                    onChange={(e) => setConnectionCode(e.target.value.toUpperCase())}
                    onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
                    className="flex-1 h-12 text-base bg-background/50 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                    maxLength={6}
                  />
                  <Button 
                    onClick={handleCheck}
                    disabled={isChecking}
                    className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                  >
                    {isChecking ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Analyzing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Search className="h-4 w-4" />
                        Analyze Server
                      </div>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            {results && (
              <div className="space-y-6">
                {/* Server Info Card */}
                <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <Server className="h-4 w-4 text-blue-400" />
                      </div>
                      Server Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-xl space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <span className="text-sm font-medium text-blue-400">Server Name</span>
                          <div className="p-3 bg-background/50 rounded-lg border border-blue-500/10">
                            <span className="text-foreground font-medium">{results.serverName}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <span className="text-sm font-medium text-blue-400">Connection Code</span>
                          <div className="p-3 bg-background/50 rounded-lg border border-blue-500/10">
                            <span className="text-muted-foreground font-mono text-sm">{results.connectionCode.toUpperCase()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-blue-400">Total Resources</span>
                        <div className="p-3 bg-background/50 rounded-lg border border-blue-500/10">
                          <span className="text-foreground font-medium">{results.totalResources}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Analysis Results */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Clean Resources */}
                  <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold flex items-center gap-3 text-green-400">
                        <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        </div>
                        Clean Resources
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Badge variant="outline" className="border-green-500/40 text-green-400 bg-green-500/5">
                          {results.cleanResources.length} found
                        </Badge>
                         <div className="max-h-48 overflow-y-auto space-y-1">
                           {results.cleanResources.map((resource, index) => (
                             <div key={index} className="p-2 bg-green-500/5 rounded text-sm text-muted-foreground">
                               {resource}
                             </div>
                           ))}
                         </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* TOS Violations */}
                  <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold flex items-center gap-3 text-red-400">
                        <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                          <AlertCircle className="h-4 w-4 text-red-400" />
                        </div>
                        TOS Violations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Badge variant="outline" className="border-red-500/40 text-red-400 bg-red-500/5">
                          {results.tosViolations.length} found
                        </Badge>
                        <div className="max-h-48 overflow-y-auto space-y-1">
                          {results.tosViolations.map((resource, index) => (
                            <div key={index} className="p-2 bg-red-500/5 rounded text-sm text-muted-foreground">
                              {resource}
                            </div>
                          ))}
                          {results.tosViolations.length === 0 && (
                            <div className="text-sm text-muted-foreground text-center py-4">
                              No violations found
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* COC Violations */}
                  <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold flex items-center gap-3 text-yellow-400">
                        <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                          <AlertTriangle className="h-4 w-4 text-yellow-400" />
                        </div>
                        COC Violations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Badge variant="outline" className="border-yellow-500/40 text-yellow-400 bg-yellow-500/5">
                          {results.cocViolations.length} found
                        </Badge>
                        <div className="max-h-48 overflow-y-auto space-y-1">
                          {results.cocViolations.map((resource, index) => (
                            <div key={index} className="p-2 bg-yellow-500/5 rounded text-sm text-muted-foreground">
                              {resource}
                            </div>
                          ))}
                          {results.cocViolations.length === 0 && (
                            <div className="text-sm text-muted-foreground text-center py-4">
                              No violations found
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Evidence Section */}
                {results.evidence && results.evidence.length > 0 && (
                  <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                          <Eye className="h-4 w-4 text-red-400" />
                        </div>
                        Evidence & Documentation
                      </CardTitle>
                      <CardDescription>
                        Evidence supporting the flagged violations found on this server
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {results.evidence.map((evidence, index) => (
                        <div key={index} className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline" className="border-red-500/40 text-red-400 bg-red-500/5 capitalize">
                              {evidence.type}
                            </Badge>
                            <h4 className="font-semibold text-foreground">{evidence.name}</h4>
                          </div>
                          
                          <p className="text-muted-foreground mb-3">{evidence.reason}</p>
                          
                          {evidence.matchedKeywords.length > 0 && (
                            <div className="mb-3">
                              <span className="text-sm font-medium text-muted-foreground"></span>
                              {/* <div className="flex flex-wrap gap-1 mt-1">
                                {evidence.matchedKeywords.map((keyword, kIndex) => (
                                  <Badge key={kIndex} variant="secondary" className="text-xs">
                                    {keyword}
                                  </Badge>
                                ))}
                              </div> */}
                            </div>
                          )}
                          
                          {evidence.proofImages.length > 0 && (
                            <div className="mb-3">
                              <span className="text-sm font-medium text-muted-foreground mb-2 block">Proof Images:</span>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {evidence.proofImages.slice(0, 6).map((image, imgIndex) => (
                                  <a key={imgIndex} href={image} target="_blank" rel="noopener noreferrer" 
                                     className="block aspect-video bg-gray-800 rounded-lg overflow-hidden hover:opacity-80 transition-opacity">
                                    <img src={image} alt={`Evidence ${imgIndex + 1}`} 
                                         className="w-full h-full object-cover" />
                                  </a>
                                ))}
                              </div>
                              {evidence.proofImages.length > 6 && (
                                <p className="text-xs text-muted-foreground mt-2">
                                  +{evidence.proofImages.length - 6} more images
                                </p>
                              )}
                            </div>
                          )}
                          
                          {evidence.evidenceLinks.length > 0 && (
                            <div>
                              <span className="text-sm font-medium text-muted-foreground mb-2 block">Evidence Links:</span>
                              <div className="space-y-1">
                                {evidence.evidenceLinks.map((link, linkIndex) => (
                                  <a key={linkIndex} href={link} target="_blank" rel="noopener noreferrer"
                                     className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                                    <ExternalLink className="h-3 w-3" />
                                    {link}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
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
                  <h3 className="text-xl font-semibold text-foreground mb-3">TOS Analysis</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Detect Terms of Service violations in server resources
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-card/30 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Resource Scanning</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Comprehensive analysis of all server resources
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-card/30 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="h-8 w-8 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">COC Compliance</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Monitor Code of Conduct compliance and violations
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

export default FiveMServerChecker;