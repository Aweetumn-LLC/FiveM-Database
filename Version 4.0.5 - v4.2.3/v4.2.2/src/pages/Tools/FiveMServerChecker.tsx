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
    url: "https://fivemdb.online/fivem-server-checker",
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-blue-500/5">
      <Helmet>
        <title>FiveM Database - FiveM Server Compliance Checker</title>
        <meta name="description" content="Ensure your FiveM server is fully compliant with FiveM's Terms of Service and Code of Conduct. Protect your community and avoid blacklisting with FiveM Database's compliance checker." />
        <link rel="canonical" href="https://fivemdb.online/fivem-server-checker" />
        <meta property="og:title" content="FiveM Database - FiveM Server Compliance Checker" />
        <meta property="og:description" content="Ensure your FiveM server is fully compliant with FiveM's Terms of Service and Code of Conduct. Protect your community and avoid blacklisting with FiveM Database's compliance checker." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fivemdb.online/fivem-server-checker" />
        <meta property="og:image" content="https://fivemdb.online/images/og-default-1200x630.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FiveM Server Checker | Server TOS & COC Analysis" />
        <meta name="twitter:description" content="Analyze FiveM servers for Terms of Service and Code of Conduct violations." />
        <meta name="twitter:image" content="https://fivemdb.online/images/og-default-1200x630.png" />
        <script type="application/ld+json">{JSON.stringify(serverCheckerJsonLd)}</script>
      </Helmet>
      
      <main className="flex-grow pt-20 md:pt-24 px-4 md:px-6 pb-12">
        <div className="container mx-auto max-w-7xl">
          {/* Enhanced Header */}
          <div className="text-center mb-16">
            <div className="relative inline-flex items-center justify-center mb-8">
              <div className="absolute inset-0 w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl"></div>
              <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 flex items-center justify-center backdrop-blur-sm">
                <Server className="h-10 w-10 text-blue-400" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-6 tracking-tight">
              Server Analyzer
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Advanced FiveM server compliance analysis with real-time resource scanning
            </p>
            <div className="flex justify-center gap-4 mt-8">
              <Badge variant="outline" className="px-4 py-2 text-sm">
                <Shield className="h-4 w-4 mr-2" />
                TOS Compliance
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm">
                <AlertTriangle className="h-4 w-4 mr-2" />
                COC Violations
              </Badge>
            </div>
          </div>

          <div className="space-y-8">
            {/* Enhanced Input Section */}
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5"></div>
              <CardHeader className="relative pb-8">
                <CardTitle className="text-3xl font-bold text-foreground flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-blue-500/20">
                    <Search className="h-6 w-6 text-blue-400" />
                  </div>
                  Server Analysis Hub
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  Deep-scan FiveM servers for compliance violations and resource analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="relative space-y-8">
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Connection Code Format</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Enter your 6-character server connection code found in F8 console or server info.
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                      Example: A1B2C3
                    </Badge>
                    <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                      6 Characters
                    </Badge>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Input
                      placeholder="Enter connection code (e.g., A1B2C3)"
                      value={connectionCode}
                      onChange={(e) => setConnectionCode(e.target.value.toUpperCase())}
                      onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
                      className="h-14 text-lg bg-background/80 border-2 border-border/50 focus:border-blue-500/70 focus:ring-4 focus:ring-blue-500/20 rounded-xl backdrop-blur-sm transition-all duration-300 text-center font-mono tracking-widest"
                      maxLength={6}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none"></div>
                  </div>
                  <Button 
                    onClick={handleCheck}
                    disabled={isChecking}
                    className="h-14 px-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    {isChecking ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Analyzing Server...
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Search className="h-5 w-5" />
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
                {/* Enhanced Server Info Card */}
                <Card className="border-0 shadow-2xl bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full"></div>
                  <CardHeader className="relative">
                    <CardTitle className="text-2xl font-bold flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-blue-500/20">
                        <Server className="h-5 w-5 text-blue-400" />
                      </div>
                      Server Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-8 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20 rounded-2xl space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                            <span className="text-sm font-semibold text-blue-400 uppercase tracking-wide">Server Name</span>
                          </div>
                          <div className="p-4 bg-background/60 rounded-xl border border-blue-500/10 backdrop-blur-sm">
                            <span className="text-foreground font-semibold text-lg">{results.serverName}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                            <span className="text-sm font-semibold text-purple-400 uppercase tracking-wide">Connection Code</span>
                          </div>
                          <div className="p-4 bg-background/60 rounded-xl border border-purple-500/10 backdrop-blur-sm">
                            <span className="text-muted-foreground font-mono text-lg tracking-widest">{results.connectionCode.toUpperCase()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-400"></div>
                          <span className="text-sm font-semibold text-green-400 uppercase tracking-wide">Total Resources Analyzed</span>
                        </div>
                        <div className="p-4 bg-background/60 rounded-xl border border-green-500/10 backdrop-blur-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-foreground font-semibold text-2xl">{results.totalResources}</span>
                            <Badge variant="outline" className="border-green-500/30 text-green-400 bg-green-500/5">
                              Resources Scanned
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced Analysis Results */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  {/* Clean Resources */}
                  <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-500/5 to-green-600/10 backdrop-blur-xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-green-500/10 to-transparent rounded-bl-full"></div>
                    <CardHeader className="relative">
                      <CardTitle className="text-xl font-bold flex items-center gap-3 text-green-400">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/30 flex items-center justify-center border border-green-500/20">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        </div>
                        Clean Resources
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="border-green-500/40 text-green-400 bg-green-500/10 px-3 py-1">
                          {results.cleanResources.length} Resources
                        </Badge>
                        <div className="text-2xl font-bold text-green-400">{results.cleanResources.length}</div>
                      </div>
                      <div className="max-h-64 overflow-y-auto space-y-2 pr-2">
                        {results.cleanResources.map((resource, index) => (
                          <div key={index} className="group p-3 bg-green-500/5 hover:bg-green-500/10 rounded-xl text-sm text-foreground transition-all duration-200 border border-green-500/10 hover:border-green-500/20">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-400 group-hover:scale-125 transition-transform"></div>
                              <span className="font-medium">{resource}</span>
                            </div>
                          </div>
                        ))}
                        {results.cleanResources.length === 0 && (
                          <div className="text-center py-8 text-muted-foreground">
                            <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-400/50" />
                            <p>No clean resources found</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* TOS Violations */}
                  <Card className="border-0 shadow-2xl bg-gradient-to-br from-red-500/5 to-red-600/10 backdrop-blur-xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-red-500/10 to-transparent rounded-bl-full"></div>
                    <CardHeader className="relative">
                      <CardTitle className="text-xl font-bold flex items-center gap-3 text-red-400">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/30 flex items-center justify-center border border-red-500/20">
                          <AlertCircle className="h-5 w-5 text-red-400" />
                        </div>
                        TOS Violations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="border-red-500/40 text-red-400 bg-red-500/10 px-3 py-1">
                          {results.tosViolations.length} Violations
                        </Badge>
                        <div className="text-2xl font-bold text-red-400">{results.tosViolations.length}</div>
                      </div>
                      <div className="max-h-64 overflow-y-auto space-y-2 pr-2">
                        {results.tosViolations.map((resource, index) => (
                          <div key={index} className="group p-3 bg-red-500/5 hover:bg-red-500/10 rounded-xl text-sm border border-red-500/10 hover:border-red-500/20 transition-all duration-200">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 flex-1">
                                <div className="w-2 h-2 rounded-full bg-red-400 group-hover:scale-125 transition-transform"></div>
                                <span className="font-medium text-foreground">{resource}</span>
                              </div>
                              <Button
                                onClick={async () => {
                                  try {
                                    console.log('Reporting false positive for resource:', resource);
                                    
                                    const { error } = await supabase.rpc('upsert_false_positive_report', {
                                      p_resource_name: resource,
                                      p_report_type: 'server_checker',
                                      p_server_name: results?.serverName,
                                      p_connection_code: results?.connectionCode
                                    });

                                    if (error) {
                                      console.error('Supabase RPC error:', error);
                                      throw error;
                                    }
                                    
                                    toast.success('False positive report submitted for ' + resource);
                                  } catch (error) {
                                    console.error('Error reporting false positive:', error);
                                    toast.error('Failed to submit false positive report. Please try again.');
                                  }
                                }}
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 text-xs text-yellow-400 hover:bg-yellow-500/10 rounded-lg ml-2"
                              >
                                Report False
                              </Button>
                            </div>
                          </div>
                        ))}
                        {results.tosViolations.length === 0 && (
                          <div className="text-center py-8 text-muted-foreground">
                            <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-400/50" />
                            <p>No TOS violations found</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* COC Violations */}
                  <Card className="border-0 shadow-2xl bg-gradient-to-br from-yellow-500/5 to-orange-500/10 backdrop-blur-xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-yellow-500/10 to-transparent rounded-bl-full"></div>
                    <CardHeader className="relative">
                      <CardTitle className="text-xl font-bold flex items-center gap-3 text-yellow-400">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/30 flex items-center justify-center border border-yellow-500/20">
                          <AlertTriangle className="h-5 w-5 text-yellow-400" />
                        </div>
                        COC Violations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="border-yellow-500/40 text-yellow-400 bg-yellow-500/10 px-3 py-1">
                          {results.cocViolations.length} Violations
                        </Badge>
                        <div className="text-2xl font-bold text-yellow-400">{results.cocViolations.length}</div>
                      </div>
                      <div className="max-h-64 overflow-y-auto space-y-2 pr-2">
                        {results.cocViolations.map((resource, index) => (
                          <div key={index} className="group p-3 bg-yellow-500/5 hover:bg-yellow-500/10 rounded-xl text-sm border border-yellow-500/10 hover:border-yellow-500/20 transition-all duration-200">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 flex-1">
                                <div className="w-2 h-2 rounded-full bg-yellow-400 group-hover:scale-125 transition-transform"></div>
                                <span className="font-medium text-foreground">{resource}</span>
                              </div>
                              <Button
                                onClick={async () => {
                                  try {
                                    console.log('Reporting false positive for resource:', resource);
                                    
                                    const { error } = await supabase.rpc('upsert_false_positive_report', {
                                      p_resource_name: resource,
                                      p_report_type: 'server_checker',
                                      p_server_name: results?.serverName,
                                      p_connection_code: results?.connectionCode
                                    });

                                    if (error) {
                                      console.error('Supabase RPC error:', error);
                                      throw error;
                                    }
                                    
                                    toast.success('False positive report submitted for ' + resource);
                                  } catch (error) {
                                    console.error('Error reporting false positive:', error);
                                    toast.error('Failed to submit false positive report. Please try again.');
                                  }
                                }}
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 text-xs text-blue-400 hover:bg-blue-500/10 rounded-lg ml-2"
                              >
                                Report False
                              </Button>
                            </div>
                          </div>
                        ))}
                        {results.cocViolations.length === 0 && (
                          <div className="text-center py-8 text-muted-foreground">
                            <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-400/50" />
                            <p>No COC violations found</p>
                          </div>
                        )}
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