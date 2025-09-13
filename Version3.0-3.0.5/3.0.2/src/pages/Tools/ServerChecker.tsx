import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { 
  Server, 
  Users, 
  Globe, 
  Clock, 
  Search,
  AlertCircle,
  CheckCircle,
  Loader2,
  Copy,
  Shield,
  AlertTriangle,
  XCircle,
  MapPin,
  Network,
  Building,
  TrendingUp,
  TrendingDown,
  Activity
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import RecentConnectionCodes from "@/components/RecentConnectionCodes";

interface ResourceAnalysis {
  clean: string[];
  tos: string[];
  coc: string[];
}

interface NetworkInfo {
  asn: string;
  provider: string;
  hostname: string;
  city: string;
  region: string;
  country: string;
  location: string;
  timezone: string;
}

interface ServerChanges {
  players?: {
    current: string;
    previous: string;
    change: string;
  };
  status?: {
    current: string;
    previous: string;
  };
  map?: {
    current: string;
    previous: string;
  };
  gametype?: {
    current: string;
    previous: string;
  };
  violations?: {
    tos: {
      current: number;
      previous: number;
      change: number;
    };
    coc: {
      current: number;
      previous: number;
      change: number;
    };
  };
}

interface ServerInfo {
  hostname: string;
  players: string;
  status: string;
  map: string;
  gametype: string;
  endpoints: string;
  version: string;
  owner: string;
  description: string;
  resources: string;
  resourceAnalysis?: ResourceAnalysis;
  networkInfo?: NetworkInfo;
  changes?: ServerChanges;
  lastChecked: string;
  formatted: string;
  error?: string;
}

const ServerChecker = () => {
  const [connectionCode, setConnectionCode] = useState("");
  const [serverInfo, setServerInfo] = useState<ServerInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    if (!connectionCode.trim()) {
      setError("Please enter a connection code");
      return;
    }

    const cleanCode = connectionCode.trim().toLowerCase();
    
    if (cleanCode.length !== 6 || !/^[a-z0-9]+$/.test(cleanCode)) {
      setError("Invalid code! Must be 6 alphanumeric characters (e.g., A1B2C3)");
      return;
    }

    setIsLoading(true);
    setError("");
    setServerInfo(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('server-checker', {
        body: { connectionCode: cleanCode }
      });

      if (functionError) {
        console.error('Function error:', functionError);
        throw functionError;
      }

      if (data.error || data.data?.error) {
        const errorMessage = data.error || data.data.error;
        setError(errorMessage);
        toast.error(`Server check failed: ${errorMessage}`);
        return;
      }

      if (data.data) {
        setServerInfo(data.data);
        toast.success("Server information retrieved successfully!");
      } else {
        throw new Error('No data returned from server checker');
      }

    } catch (err: any) {
      console.error('Server check error:', err);
      const errorMessage = err.message || 'Failed to check server';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  const renderChangeIndicator = (change: string) => {
    const isPositive = change.startsWith('+');
    const isNegative = change.startsWith('-');
    const isZero = change === '0';
    
    if (isZero) return null;
    
    return (
      <div className={`flex items-center gap-1 text-sm ${
        isPositive ? 'text-green-400' : isNegative ? 'text-red-400' : 'text-gray-400'
      }`}>
        {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        {change}
      </div>
    );
  };

  return (
    <div className="responsive-container py-responsive">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Server className="h-8 w-8 text-orange-400" />
            <h1 className="text-responsive-3xl font-bold text-white">
              FiveM Server Checker
            </h1>
          </div>
          <p className="text-responsive-base text-gray-400 max-w-2xl mx-auto">
            Check the status and analyze resources of any FiveM server using its connection code. Track changes between searches.
          </p>
        </div>

        {/* Input Section */}
        <Card className="bg-black border-gray-600 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Search className="h-5 w-5 text-orange-400" />
              Server Connection Code
            </CardTitle>
            <CardDescription className="text-gray-400">
              Enter a 6-character FiveM server connection code (e.g., A1B2C3)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Input
                type="text"
                placeholder="A1B2C3"
                value={connectionCode}
                onChange={(e) => {
                  setConnectionCode(e.target.value.toUpperCase());
                  setError("");
                }}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-gray-800 border-gray-600 text-white placeholder:text-gray-500"
                maxLength={6}
              />
              <Button 
                onClick={handleCheck}
                disabled={isLoading}
                className="bg-orange-500 hover:bg-orange-600 text-white min-w-[120px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Check Server
                  </>
                )}
              </Button>
            </div>
            
            {error && (
              <div className="flex items-center gap-2 text-red-400 bg-red-900/20 p-3 rounded-lg border border-red-700">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Server Information Display */}
        {serverInfo && !serverInfo.error && (
          <div className="space-y-6">
            {/* Changes Section */}
            {serverInfo.changes && (
              <Card className="bg-black border-gray-600">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Activity className="h-5 w-5 text-blue-400" />
                    Changes Since Last Check
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Differences detected from the previous search
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {serverInfo.changes.players && (
                      <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400">Players</span>
                          {renderChangeIndicator(serverInfo.changes.players.change)}
                        </div>
                        <div className="text-white">
                          {serverInfo.changes.players.previous} → {serverInfo.changes.players.current}
                        </div>
                      </div>
                    )}
                    
                    {serverInfo.changes.status && (
                      <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400">Status</span>
                          <Activity className="h-4 w-4 text-blue-400" />
                        </div>
                        <div className="text-white">
                          {serverInfo.changes.status.previous} → {serverInfo.changes.status.current}
                        </div>
                      </div>
                    )}
                    
                    {serverInfo.changes.map && (
                      <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400">Map</span>
                          <MapPin className="h-4 w-4 text-blue-400" />
                        </div>
                        <div className="text-white">
                          {serverInfo.changes.map.previous} → {serverInfo.changes.map.current}
                        </div>
                      </div>
                    )}
                    
                    {serverInfo.changes.gametype && (
                      <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400">Gametype</span>
                          <Activity className="h-4 w-4 text-blue-400" />
                        </div>
                        <div className="text-white">
                          {serverInfo.changes.gametype.previous} → {serverInfo.changes.gametype.current}
                        </div>
                      </div>
                    )}
                    
                    {serverInfo.changes.violations && (
                      <div className="bg-gray-800 rounded-lg p-4 md:col-span-2">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-gray-400">Policy Violations</span>
                          <Shield className="h-4 w-4 text-blue-400" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-yellow-400 text-sm">TOS Violations</div>
                            <div className="flex items-center gap-2">
                              <span className="text-white">
                                {serverInfo.changes.violations.tos.previous} → {serverInfo.changes.violations.tos.current}
                              </span>
                              {renderChangeIndicator(serverInfo.changes.violations.tos.change > 0 ? `+${serverInfo.changes.violations.tos.change}` : serverInfo.changes.violations.tos.change.toString())}
                            </div>
                          </div>
                          <div>
                            <div className="text-red-400 text-sm">COC Violations</div>
                            <div className="flex items-center gap-2">
                              <span className="text-white">
                                {serverInfo.changes.violations.coc.previous} → {serverInfo.changes.violations.coc.current}
                              </span>
                              {renderChangeIndicator(serverInfo.changes.violations.coc.change > 0 ? `+${serverInfo.changes.violations.coc.change}` : serverInfo.changes.violations.coc.change.toString())}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Status Overview */}
            <Card className="bg-black border-gray-600">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    Server Status
                  </CardTitle>
                  <Badge 
                    variant={serverInfo.status === 'Online' ? 'default' : 'secondary'}
                    className={serverInfo.status === 'Online' ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'}
                  >
                    {serverInfo.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-800 rounded-lg">
                    <Users className="h-6 w-6 text-orange-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-white">{serverInfo.players}</div>
                    <div className="text-sm text-gray-400">Players</div>
                    {serverInfo.changes?.players && renderChangeIndicator(serverInfo.changes.players.change)}
                  </div>
                  <div className="text-center p-4 bg-gray-800 rounded-lg">
                    <Globe className="h-6 w-6 text-orange-400 mx-auto mb-2" />
                    <div className="text-lg font-bold text-white">{serverInfo.map}</div>
                    <div className="text-sm text-gray-400">Map</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800 rounded-lg">
                    <Server className="h-6 w-6 text-orange-400 mx-auto mb-2" />
                    <div className="text-lg font-bold text-white">{serverInfo.gametype}</div>
                    <div className="text-sm text-gray-400">Gametype</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800 rounded-lg">
                    <Clock className="h-6 w-6 text-orange-400 mx-auto mb-2" />
                    <div className="text-lg font-bold text-white">
                      {new Date(serverInfo.lastChecked).toLocaleTimeString()}
                    </div>
                    <div className="text-sm text-gray-400">Last Checked</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Network Information */}
            {serverInfo.networkInfo && (
              <Card className="bg-black border-gray-600">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Network className="h-5 w-5 text-orange-400" />
                    Network Information
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    ASN and location details for the server
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Building className="h-4 w-4 text-orange-400" />
                        <h4 className="font-semibold text-white">Provider</h4>
                      </div>
                      <p className="text-gray-300">{serverInfo.networkInfo.provider}</p>
                      <p className="text-sm text-gray-400">ASN: {serverInfo.networkInfo.asn}</p>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-orange-400" />
                        <h4 className="font-semibold text-white">Location</h4>
                      </div>
                      <p className="text-gray-300">{serverInfo.networkInfo.city}, {serverInfo.networkInfo.region}</p>
                      <p className="text-sm text-gray-400">{serverInfo.networkInfo.country}</p>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-orange-400" />
                        <h4 className="font-semibold text-white">Timezone</h4>
                      </div>
                      <p className="text-gray-300">{serverInfo.networkInfo.timezone}</p>
                      <p className="text-sm text-gray-400">Coords: {serverInfo.networkInfo.location}</p>
                    </div>
                  </div>
                  
                  <Separator className="bg-gray-700" />
                  
                  <div>
                    <label className="text-sm font-medium text-gray-400">Network Hostname</label>
                    <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg mt-1">
                      <span className="text-white font-medium">[REDACTED FOR PRIVACY]</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard("[REDACTED FOR PRIVACY]")}
                        className="text-gray-400 hover:text-white"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Resource Analysis */}
            {serverInfo.resourceAnalysis && (
              <Card className="bg-black border-gray-600">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Shield className="h-5 w-5 text-orange-400" />
                    Resource Analysis
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Automated analysis of server resources for policy violations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <h3 className="text-green-400 font-semibold">Clean Resources</h3>
                      </div>
                      <div className="text-2xl font-bold text-white mb-2">
                        {serverInfo.resourceAnalysis.clean.length}
                      </div>
                      <div className="text-sm text-gray-400">No violations detected</div>
                    </div>

                    <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-400" />
                        <h3 className="text-yellow-400 font-semibold">TOS Violations</h3>
                      </div>
                      <div className="text-2xl font-bold text-white mb-2">
                        {serverInfo.resourceAnalysis.tos.length}
                      </div>
                      <div className="text-sm text-gray-400">IP/Brand violations</div>
                      {serverInfo.changes?.violations && renderChangeIndicator(serverInfo.changes.violations.tos.change > 0 ? `+${serverInfo.changes.violations.tos.change}` : serverInfo.changes.violations.tos.change.toString())}
                    </div>

                    <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <XCircle className="h-5 w-5 text-red-400" />
                        <h3 className="text-red-400 font-semibold">COC Violations</h3>
                      </div>
                      <div className="text-2xl font-bold text-white mb-2">
                        {serverInfo.resourceAnalysis.coc.length}
                      </div>
                      <div className="text-sm text-gray-400">Content violations</div>
                      {serverInfo.changes?.violations && renderChangeIndicator(serverInfo.changes.violations.coc.change > 0 ? `+${serverInfo.changes.violations.coc.change}` : serverInfo.changes.violations.coc.change.toString())}
                    </div>
                  </div>

                  <Separator className="bg-gray-700" />

                  <div className="space-y-4">
                    {serverInfo.resourceAnalysis.tos.length > 0 && (
                      <div>
                        <h4 className="text-yellow-400 font-semibold mb-2">TOS Violations (IP/Brand):</h4>
                        <div className="bg-gray-800 rounded-lg p-3 max-h-32 overflow-y-auto">
                          <ul className="text-sm text-gray-300 space-y-1">
                            {serverInfo.resourceAnalysis.tos.map((resource, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <AlertTriangle className="h-3 w-3 text-yellow-400 flex-shrink-0" />
                                {resource}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {serverInfo.resourceAnalysis.coc.length > 0 && (
                      <div>
                        <h4 className="text-red-400 font-semibold mb-2">COC Violations (Content):</h4>
                        <div className="bg-gray-800 rounded-lg p-3 max-h-32 overflow-y-auto">
                          <ul className="text-sm text-gray-300 space-y-1">
                            {serverInfo.resourceAnalysis.coc.map((resource, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <XCircle className="h-3 w-3 text-red-400 flex-shrink-0" />
                                {resource}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Server Details */}
            <Card className="bg-black border-gray-600">
              <CardHeader>
                <CardTitle className="text-white">Server Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-400">Hostname</label>
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg mt-1">
                    <span className="text-white font-medium">{serverInfo.hostname}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(serverInfo.hostname)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                <div>
                  <label className="text-sm font-medium text-gray-400">Connection Endpoints</label>
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg mt-1">
                    <span className="text-white font-medium">{serverInfo.endpoints}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(serverInfo.endpoints)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-400">Version</label>
                    <div className="p-3 bg-gray-800 rounded-lg mt-1">
                      <span className="text-white">{serverInfo.version}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-400">Owner ID</label>
                    <div className="p-3 bg-gray-800 rounded-lg mt-1">
                      <span className="text-white">{serverInfo.owner}</span>
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                <div>
                  <label className="text-sm font-medium text-gray-400">Description</label>
                  <div className="p-4 bg-gray-800 rounded-lg mt-1 max-h-32 overflow-y-auto">
                    <p className="text-white whitespace-pre-wrap">{serverInfo.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Raw Output */}
            <Card className="bg-black border-gray-600">
              <CardHeader>
                <CardTitle className="text-white">Formatted Output</CardTitle>
                <CardDescription className="text-gray-400">
                  Copy-paste ready server information with resource analysis and network details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-gray-900 p-4 rounded-lg text-sm text-gray-300 overflow-x-auto font-mono">
                    {serverInfo.formatted}
                  </pre>
                  <Button
                    size="sm"
                    onClick={() => copyToClipboard(serverInfo.formatted)}
                    className="absolute top-2 right-2 bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy All
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Example Section */}
        {!serverInfo && !isLoading && (
          <Card className="bg-gray-900 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">How to Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-gray-300">
                <h4 className="font-semibold mb-2">Steps:</h4>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Find the 6-character connection code from a FiveM server</li>
                  <li>Enter the code in the input field above</li>
                  <li>Click "Check Server" to retrieve information and analyze resources</li>
                  <li>View detailed server information, player count, network details, and resource analysis</li>
                  <li>Check for changes since the last search (if available)</li>
                </ol>
              </div>
              
              <Separator className="bg-gray-700" />
              
              <div className="text-gray-300">
                <h4 className="font-semibold mb-2">Change Tracking:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li><span className="text-blue-400">Changes:</span> Automatically tracks differences between current and previous searches</li>
                  <li><span className="text-green-400">Player Changes:</span> Shows +/- player count changes</li>
                  <li><span className="text-orange-400">Status Updates:</span> Detects server status, map, and gametype changes</li>
                  <li><span className="text-purple-400">Violation Tracking:</span> Monitors policy violation changes over time</li>
                </ul>
              </div>
              
              <Separator className="bg-gray-700" />
              
              <div className="text-gray-300">
                <h4 className="font-semibold mb-2">Resource Analysis:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li><span className="text-green-400">Clean Resources:</span> No policy violations detected</li>
                  <li><span className="text-yellow-400">TOS Violations:</span> Intellectual property or brand violations</li>
                  <li><span className="text-red-400">COC Violations:</span> Content that violates code of conduct</li>
                </ul>
              </div>
              
              <Separator className="bg-gray-700" />
              
              <RecentConnectionCodes onCodeSelect={setConnectionCode} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ServerChecker;
