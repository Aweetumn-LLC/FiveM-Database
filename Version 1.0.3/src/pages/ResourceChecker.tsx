import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  checkCreator, 
  extractDomain, 
  getSeverityClass, 
  extractDiscordServerId, 
  type CheckResult 
} from "@/utils/blacklistChecker";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, X, AlertTriangle, CheckCircle, Fingerprint } from "lucide-react";
import { BLACKLISTED_CREATORS, GLOBAL_WHITELIST } from "@/config/blacklistConfig";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Layout from "@/components/Layout";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ToolSection from "@/components/ToolSection";

const ResourceChecker = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("checker");
  
  // Add search for blacklist tabs
  const [discordSearch, setDiscordSearch] = useState("");
  const [tebexSearch, setTebexSearch] = useState("");
  const [isWhitelistExpanded, setIsWhitelistExpanded] = useState(false);

  const handleCheck = () => {
    if (!input.trim()) {
      setError("Please enter a name or URL to check");
      return;
    }
  
    setError(null);
    setIsChecking(true);
  
    // Simulate a small delay to show the checking process
    setTimeout(() => {
      try {
        let processedInput = input.trim();
  
        // Check if the input is a full URL (contains 'http' or '.')
        if (processedInput.includes("http") || processedInput.includes(".")) {
          // If the input is a full URL (including 'http' or 'www')
          try {
            // Ensure the URL is valid, prepend 'https://' if missing
            const url = new URL(processedInput.startsWith("http") ? processedInput : `https://${processedInput}`);
            processedInput = url.toString(); // Use the entire URL (including path, query, etc.)
          } catch (err) {
            setError("Invalid URL format. Please enter a valid URL.");
            setIsChecking(false);
            return;
          }
        } else {
          // If it's just a name or domain, assume it's a domain name and prepend 'https://'
          processedInput = `https://${processedInput}`;
        }
  
        // Now processedInput contains the entire URL, including protocol, domain, and path
        const checkResult = checkCreator(processedInput);
        setResult(checkResult);
      } catch (err) {
        setError("An error occurred while checking. Please try again.");
        console.error(err);
      } finally {
        setIsChecking(false);
      }
    }, 600);
  };
  
  const handleClear = () => {
    setInput("");
    setResult(null);
    setError(null);
  };

  return (
    <Layout title="Resource Checker" description="Check if a resource or creator is blacklisted">
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Resource/Creator Checker</h1>
        
        <Tabs defaultValue="checker" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="checker">Check Resource or Creator</TabsTrigger>
            <TabsTrigger value="discord">Discord Blacklist</TabsTrigger>
            <TabsTrigger value="tebex">Tebex Store Blacklist</TabsTrigger>
          </TabsList>
          
          <TabsContent value="checker" className="space-y-8">
            <Card className="backdrop-blur-md bg-white/5 border border-white/10">
              <CardHeader>
                <CardTitle>Check for Blacklisted Resources</CardTitle>
                <CardDescription>
                  Enter a creator name, store URL, Discord server link, or resource link to check if it's blacklisted
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Input
                      placeholder="Enter name, URL, or Discord link (e.g., discord.gg/invite)"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleCheck} disabled={isChecking || !input.trim()}>
                      {isChecking ? "Checking..." : "Check"}
                      {!isChecking && <Search className="ml-2 h-4 w-4" />}
                    </Button>
                    {(input || result || error) && (
                      <Button variant="outline" onClick={handleClear}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                
                {error && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                {isChecking && (
                  <div className="mt-6 space-y-3">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                )}
                
                {result && !isChecking && (
                  <div className="mt-6">
                    <Alert className={`${
                      result.isBlacklisted 
                        ? result.possibleFalsePositive 
                          ? 'bg-amber-500/20 border-amber-500/30 text-amber-500' 
                          : getSeverityClass(result.severity) 
                        : 'bg-green-500/20 border-green-500/30 text-green-500'
                    }`}>
                      <AlertTitle className="text-lg font-bold flex items-center gap-2">
                        {result.isBlacklisted 
                          ? result.possibleFalsePositive 
                            ? <><AlertTriangle size={20} /> Possible False Positive</>
                            : <><AlertTriangle size={20} /> Blacklisted</> 
                          : <><CheckCircle size={20} /> Not Blacklisted</>
                        }
                      </AlertTitle>
                      <AlertDescription className="mt-2">
                        {result.isBlacklisted ? (
                          <div className="space-y-2">
                            <p><strong>Reason:</strong> {result.reason}</p>
                            {result.matchedCreator && <p><strong>Matched Creator:</strong> {result.matchedCreator}</p>}
                            {result.category && <p><strong>Category:</strong> {result.category}</p>}
                            {result.flaggedBy && <p><strong>Flagged By:</strong> {result.flaggedBy}</p>}
                            
                            {/* Display Discord server ID info if available */}
                            {result.discordServerId && (
                              <div className="flex items-center gap-2">
                                <Fingerprint size={16} />
                                <strong>Discord ID:</strong>
                                <Badge variant="outline">{
                                  result.discordServerId.startsWith('invite:')
                                    ? `Invite: ${result.discordServerId.replace('invite:', '')}`
                                    : result.discordServerId
                                }</Badge>
                              </div>
                            )}
                            
                            {result.possibleFalsePositive && (
                              <p className="text-amber-500 italic">
                                This result may be a false positive. The system detected partial keyword matches that require human review.
                              </p>
                            )}
                            {result.matchType === 'keyword' && result.matchedKeywords && (
                              <div>
                                <strong>Matched Keywords:</strong> 
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {result.matchedKeywords.map(keyword => (
                                    <Badge key={keyword} variant="outline">{keyword}</Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            <p className="italic mt-2">
                              Severity: 
                              <span className={`ml-2 font-semibold ${
                                result.severity === 'critical' ? 'text-red-500' : 
                                result.severity === 'high' ? 'text-orange-500' : 
                                result.severity === 'medium' ? 'text-amber-500' : 'text-blue-500'
                              }`}>
                                {result.severity?.toUpperCase()}
                              </span>
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p>This resource/creator was not found in our blacklist and no violations were detected.</p>
                            
                            {/* Still show Discord ID if not blacklisted but ID was found */}
                            {result.discordServerId && (
                              <div className="flex items-center gap-2 mt-2">
                                <Fingerprint size={16} />
                                <span>Discord ID: </span>
                                <Badge variant="outline">{
                                  result.discordServerId.startsWith('invite:')
                                    ? `Invite: ${result.discordServerId.replace('invite:', '')}`
                                    : result.discordServerId
                                }</Badge>
                              </div>
                            )}
                          </div>
                        )}
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
                
                <Collapsible 
                  open={isWhitelistExpanded} 
                  onOpenChange={setIsWhitelistExpanded}
                  className="mt-4 border border-white/10 rounded-lg p-4"
                >
                  <CollapsibleTrigger className="flex w-full items-center justify-between">
                    <span className="text-sm font-medium">Global Whitelist Information</span>
                    <Badge variant="outline">{GLOBAL_WHITELIST.length}</Badge>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <p className="text-sm text-white/70 mb-2">
                      These terms are globally whitelisted and will not trigger detection:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {GLOBAL_WHITELIST.map((term, index) => (
                        <Badge key={index} variant="secondary">{term}</Badge>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
              <CardFooter className="flex justify-start text-sm text-white/60">
                <p>
                  This tool checks against a database of known violations including IP infringement, code of conduct violations, 
                  and other community guidelines. Discord server IDs are also checked when available.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="discord">
            <BlacklistTable 
              category="discord" 
              searchValue={discordSearch} 
              setSearchValue={setDiscordSearch} 
            />
          </TabsContent>

          <TabsContent value="tebex">
            <BlacklistTable 
              category="tebex" 
              searchValue={tebexSearch}
              setSearchValue={setTebexSearch}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

// Updated BlacklistTable component with search functionality and Discord IDs
interface BlacklistTableProps {
  category: 'discord' | 'tebex' | 'other';
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const BlacklistTable = ({ category, searchValue, setSearchValue }: BlacklistTableProps) => {
  // Filter blacklisted creators by category
  const creators = BLACKLISTED_CREATORS.filter(
    creator => creator.category === category
  );
  
  // Filter by search term if one exists
  const filteredCreators = searchValue 
    ? creators.filter(creator => 
        creator.name.toLowerCase().includes(searchValue.toLowerCase()) || 
        creator.keyword.toLowerCase().includes(searchValue.toLowerCase()) ||
        creator.reason.toLowerCase().includes(searchValue.toLowerCase()) ||
        (creator.discordServerId && creator.discordServerId.toLowerCase().includes(searchValue.toLowerCase())) ||
        (creator.links && creator.links.some(link => 
          link.toLowerCase().includes(searchValue.toLowerCase())
        ))
      )
    : creators;

  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <Card className="backdrop-blur-md bg-white/5 border border-white/10">
      <CardHeader>
        <CardTitle>{categoryTitle} Blacklist</CardTitle>
        <CardDescription>
          List of {category === 'discord' ? 'Discord servers' : 'Tebex stores'} currently blacklisted
        </CardDescription>
        
        {/* Search input for blacklist */}
        <div className="mt-4 flex gap-2">
          <Input 
            placeholder={`Search ${categoryTitle} blacklist...`}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="max-w-md"
          />
          {searchValue && (
            <Button variant="outline" size="sm" onClick={() => setSearchValue("")}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {filteredCreators.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Keyword</TableHead>
                {category === 'discord' && <TableHead>Server ID</TableHead>}
                <TableHead>Reason</TableHead>
                <TableHead>Flagged By</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Since</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCreators.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{entry.name}</TableCell>
                  <TableCell>{entry.keyword}</TableCell>
                  {category === 'discord' && (
                    <TableCell>
                      {entry.discordServerId ? (
                        <div className="flex items-center gap-1">
                          <Fingerprint size={14} /> 
                          <Badge variant="outline" className="text-xs">{entry.discordServerId}</Badge>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs italic">Not available</span>
                      )}
                    </TableCell>
                  )}
                  <TableCell>{entry.reason}</TableCell>
                  <TableCell>{entry.flaggedBy}</TableCell>
                  <TableCell>
                    <Badge className={getSeverityClass(entry.severity)}>
                      {entry.severity.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>{entry.blacklistedSince}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : searchValue ? (
          <div className="text-center py-8 text-white/60">
            No results found for "{searchValue}" in {categoryTitle.toLowerCase()} blacklist.
          </div>
        ) : (
          <div className="text-center py-8 text-white/60">
            No {categoryTitle} entries in the blacklist yet.
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 text-sm text-white/60">
        <p>
          To add or update entries, edit the blacklistConfig.ts file.
        </p>
        {filteredCreators.length > 0 && (
          <div className="w-full overflow-auto mt-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Associated Links</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCreators.map((entry, index) => (
                  entry.links && entry.links.length > 0 && (
                    <TableRow key={`links-${index}`}>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {entry.links.map((link, i) => (
                            <Badge key={i} variant="outline">{link}</Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ResourceChecker;
