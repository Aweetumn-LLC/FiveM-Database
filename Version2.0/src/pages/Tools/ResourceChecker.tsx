import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle, Search, Shield, Zap, Info, Globe, Hash, User } from "lucide-react";
import { checkResourceCompliance } from "@/utils/blacklistChecker";
import { useResourceStats } from "@/hooks/useResourceStats";
import { toast } from "sonner";
import BlacklistViewer from "@/components/BlacklistViewer";

const ResourceChecker = () => {
  const [resourceName, setResourceName] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { incrementStats } = useResourceStats();
  const [hasTrackedThisSearch, setHasTrackedThisSearch] = useState(false); // Prevent duplicate tracking

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
      
      // Track the search in stats ONLY ONCE
      if (!hasTrackedThisSearch) {
        console.log('Tracking search result:', { isBlacklisted: !checkResults.isCompliant });
        await incrementStats(!checkResults.isCompliant);
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

  return (
    <div className="min-h-screen">
      <main className="flex-grow pt-20 md:pt-32 px-4 md:px-6 pb-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3 md:mb-4 px-2">
              FiveM Resource Checker
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto px-4">
              Check if resources and creators are flagged in our database
            </p>
          </div>

          <Tabs defaultValue="checker" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="checker">Resource Checker</TabsTrigger>
              <TabsTrigger value="blacklists">Blacklists</TabsTrigger>
            </TabsList>

            <TabsContent value="checker" className="space-y-6">
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    How to Use the Resource Checker
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    You can check resources using various input formats
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Hash className="h-4 w-4 text-blue-400" />
                        <h4 className="font-medium text-white">Discord ID</h4>
                      </div>
                      <p className="text-sm text-white/70 mb-2">Enter a Discord server ID (17-19 digits)</p>
                      <Badge variant="outline" className="text-xs">1234567890123456789</Badge>
                    </div>
                    
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Globe className="h-4 w-4 text-green-400" />
                        <h4 className="font-medium text-white">Website/URL</h4>
                      </div>
                      <p className="text-sm text-white/70 mb-2">Enter a website URL or Discord invite</p>
                      <Badge variant="outline" className="text-xs">discord.gg/invite</Badge>
                    </div>
                    
                    <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-purple-400" />
                        <h4 className="font-medium text-white">Creator Name</h4>
                      </div>
                      <p className="text-sm text-white/70 mb-2">Enter a creator or resource name</p>
                      <Badge variant="outline" className="text-xs">CreatorName</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <Shield className="h-6 w-6" />
                    Resource Checker
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    Enter a resource name, Discord ID, website, or creator to check if they're flagged
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-6">
                    <Input
                      placeholder="Enter resource name, Discord ID, website, or creator..."
                      value={resourceName}
                      onChange={(e) => setResourceName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleCheck}
                      disabled={isChecking}
                      className="px-6"
                    >
                      {isChecking ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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

                  {results && (
                    <div className="space-y-4">
                      <div className={`p-4 rounded-lg border ${
                        results.isCompliant 
                          ? 'bg-green-500/10 border-green-500/20' 
                          : 'bg-red-500/10 border-red-500/20'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          {results.isCompliant ? (
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-red-400" />
                          )}
                          <span className={`font-medium ${
                            results.isCompliant ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {results.isCompliant ? 'Clean' : 'Flagged'}
                          </span>
                        </div>
                        <p className="text-sm text-white/70">
                          {results.isCompliant 
                            ? 'This resource is not in our database - looks good!'
                            : 'This resource has been flagged in our database'
                          }
                        </p>
                      </div>

                      {results.issues && results.issues.length > 0 && (
                        <div className="space-y-2">
                          <h3 className="text-lg font-medium text-white">Report Details:</h3>
                          {results.issues.map((issue: string, index: number) => (
                            <div key={index} className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                              <AlertCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-white/80">{issue}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {results.recommendations && results.recommendations.length > 0 && (
                        <div className="space-y-2">
                          <h3 className="text-lg font-medium text-white">Recommendations:</h3>
                          {results.recommendations.map((rec: string, index: number) => (
                            <div key={index} className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                              <Zap className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-white/80">{rec}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass-card border-0">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Shield className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-white mb-2">TOS Violations</h3>
                      <p className="text-sm text-white/70">
                        Check against FiveM Terms of Service violations
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-white mb-2">Creator Verification</h3>
                      <p className="text-sm text-white/70">
                        Verify creator reputation and history
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <AlertCircle className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-white mb-2">Risk Assessment</h3>
                      <p className="text-sm text-white/70">
                        Assess potential risks and issues
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="blacklists">
              <BlacklistViewer />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default ResourceChecker;
