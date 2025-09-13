
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Settings, Save, Download, Upload, RefreshCw } from "lucide-react";

const KeywordManager = () => {
  const [ipViolationKeywords, setIpViolationKeywords] = useState<string[]>([]);
  const [cocViolationKeywords, setCocViolationKeywords] = useState<string[]>([]);
  const [cocContextualPatterns, setCocContextualPatterns] = useState<string[][]>([]);
  const [ipBypassKeywords, setIpBypassKeywords] = useState<string[]>([]);
  const [cocBypassKeywords, setCocBypassKeywords] = useState<string[]>([]);

  const loadKeywords = async () => {
    try {
      const [ipResponse, cocResponse, contextualResponse, ipBypassResponse, cocBypassResponse] = await Promise.all([
        fetch('/config/ip-violation-keywords.json'),
        fetch('/config/coc-violation-keywords.json'),
        fetch('/config/coc-contextual-patterns.json'),
        fetch('/config/ip-bypass-keywords.json'),
        fetch('/config/coc-bypass-keywords.json')
      ]);

      if (ipResponse.ok) setIpViolationKeywords(await ipResponse.json());
      if (cocResponse.ok) setCocViolationKeywords(await cocResponse.json());
      if (contextualResponse.ok) setCocContextualPatterns(await contextualResponse.json());
      if (ipBypassResponse.ok) setIpBypassKeywords(await ipBypassResponse.json());
      if (cocBypassResponse.ok) setCocBypassKeywords(await cocBypassResponse.json());

      toast.success("Keywords loaded successfully");
    } catch (error) {
      toast.error("Failed to load keywords");
      console.error('Error loading keywords:', error);
    }
  };

  useEffect(() => {
    loadKeywords();
  }, []);

  const downloadConfig = (data: any, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="responsive-container py-responsive">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Settings className="h-8 w-8 text-orange-400" />
            <h1 className="text-responsive-3xl font-bold text-white">
              Keyword Manager
            </h1>
          </div>
          <p className="text-responsive-base text-gray-400 max-w-2xl mx-auto">
            Manage violation keywords and patterns for the server checker
          </p>
          <div className="mt-4">
            <Button
              onClick={loadKeywords}
              variant="outline"
              className="text-white border-gray-600 hover:bg-gray-800"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reload Keywords
            </Button>
          </div>
        </div>

        <Tabs defaultValue="ip-violation" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="ip-violation">IP Violations</TabsTrigger>
            <TabsTrigger value="coc-violation">COC Violations</TabsTrigger>
            <TabsTrigger value="contextual">Contextual Patterns</TabsTrigger>
            <TabsTrigger value="ip-bypass">IP Bypass</TabsTrigger>
            <TabsTrigger value="coc-bypass">COC Bypass</TabsTrigger>
          </TabsList>

          <TabsContent value="ip-violation">
            <Card className="bg-black border-gray-600">
              <CardHeader>
                <CardTitle className="text-white">IP Violation Keywords</CardTitle>
                <CardDescription className="text-gray-400">
                  Keywords that trigger intellectual property violations (brands, characters, etc.)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={ipViolationKeywords.join('\n')}
                  onChange={(e) => setIpViolationKeywords(e.target.value.split('\n').filter(Boolean))}
                  placeholder="Enter keywords, one per line..."
                  className="bg-gray-800 border-gray-600 text-white min-h-[300px] font-mono"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={() => downloadConfig(ipViolationKeywords, 'ip-violation-keywords.json')}
                    variant="outline"
                    className="text-white border-gray-600"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coc-violation">
            <Card className="bg-black border-gray-600">
              <CardHeader>
                <CardTitle className="text-white">Code of Conduct Violation Keywords</CardTitle>
                <CardDescription className="text-gray-400">
                  Keywords that trigger code of conduct violations (inappropriate content, cheating, etc.)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={cocViolationKeywords.join('\n')}
                  onChange={(e) => setCocViolationKeywords(e.target.value.split('\n').filter(Boolean))}
                  placeholder="Enter keywords, one per line..."
                  className="bg-gray-800 border-gray-600 text-white min-h-[300px] font-mono"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={() => downloadConfig(cocViolationKeywords, 'coc-violation-keywords.json')}
                    variant="outline"
                    className="text-white border-gray-600"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contextual">
            <Card className="bg-black border-gray-600">
              <CardHeader>
                <CardTitle className="text-white">Contextual Patterns</CardTitle>
                <CardDescription className="text-gray-400">
                  Word combinations that trigger violations when found together
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={cocContextualPatterns.map(pattern => pattern.join(', ')).join('\n')}
                  onChange={(e) => setCocContextualPatterns(
                    e.target.value.split('\n').filter(Boolean).map(line => line.split(',').map(s => s.trim()))
                  )}
                  placeholder="Enter patterns as comma-separated words, one pattern per line..."
                  className="bg-gray-800 border-gray-600 text-white min-h-[200px] font-mono"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={() => downloadConfig(cocContextualPatterns, 'coc-contextual-patterns.json')}
                    variant="outline"
                    className="text-white border-gray-600"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ip-bypass">
            <Card className="bg-black border-gray-600">
              <CardHeader>
                <CardTitle className="text-white">IP Bypass Keywords</CardTitle>
                <CardDescription className="text-gray-400">
                  Keywords that bypass IP violation detection (legitimate prefixes, etc.)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={ipBypassKeywords.join('\n')}
                  onChange={(e) => setIpBypassKeywords(e.target.value.split('\n').filter(Boolean))}
                  placeholder="Enter keywords, one per line..."
                  className="bg-gray-800 border-gray-600 text-white min-h-[200px] font-mono"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={() => downloadConfig(ipBypassKeywords, 'ip-bypass-keywords.json')}
                    variant="outline"
                    className="text-white border-gray-600"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coc-bypass">
            <Card className="bg-black border-gray-600">
              <CardHeader>
                <CardTitle className="text-white">COC Bypass Keywords</CardTitle>
                <CardDescription className="text-gray-400">
                  Keywords that bypass COC violation detection
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={cocBypassKeywords.join('\n')}
                  onChange={(e) => setCocBypassKeywords(e.target.value.split('\n').filter(Boolean))}
                  placeholder="Enter keywords, one per line..."
                  className="bg-gray-800 border-gray-600 text-white min-h-[200px] font-mono"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={() => downloadConfig(cocBypassKeywords, 'coc-bypass-keywords.json')}
                    variant="outline"
                    className="text-white border-gray-600"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="bg-gray-900 border-gray-600 mt-8">
          <CardHeader>
            <CardTitle className="text-white">Instructions & Tips</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300">
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-semibold mb-2">How to Use:</h4>
                <div className="space-y-1 text-sm">
                  <p>• Edit keywords directly in the text areas above</p>
                  <p>• Use the Download buttons to save current configurations</p>
                  <p>• Click "Reload Keywords" to refresh from the server</p>
                  <p>• Changes take effect within 5 minutes automatically</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-2">Fixing False Positives:</h4>
                <div className="space-y-1 text-sm">
                  <p>• Add legitimate resource names to the appropriate bypass lists</p>
                  <p>• COC Bypass: For resources falsely flagged as inappropriate content</p>
                  <p>• IP Bypass: For resources falsely flagged as copyright violations</p>
                  <p>• Keywords are case-insensitive when matching</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-2">Patterns:</h4>
                <div className="space-y-1 text-sm">
                  <p>• For contextual patterns, separate words with commas on each line</p>
                  <p>• Example: "word1, word2, word3" will trigger when all three words are found</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KeywordManager;
