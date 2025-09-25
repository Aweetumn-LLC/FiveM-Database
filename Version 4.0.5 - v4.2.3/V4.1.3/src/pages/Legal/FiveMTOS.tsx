
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, FileText, Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";

const FiveMTOS = () => {
  const fivemTOSJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "FiveM Terms of Service Guide",
    description: "Understanding FiveM TOS and COC - complete guide to CFX compliance, FiveM terms of service, and community guidelines for server owners and developers.",
    url: "https://fivemdb.online/fivem-tos",
    about: {
      "@type": "Thing",
      name: "FiveM Terms of Service"
    }
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>FiveM Database - FiveM TOS & Code of Conduct Explained</title>
        <meta name="description" content="Stay compliant with FiveM's official Terms of Service (TOS) and Code of Conduct (CoC). Learn how FiveM Database helps creators, servers, and players understand compliance rules to avoid bans, blacklists, and violations." />
        <meta name="keywords" content="FiveM TOS, FiveM Terms of Service, CFX TOS, FiveM COC, FiveM Code of Conduct, CFX compliance, FiveM rules, FiveM guidelines, CFX rules, FiveM server rules, FiveM resource rules, GTA5 modding rules, Rockstar Games TOS" />
        <link rel="canonical" href="https://fivemdb.online/fivem-tos" />
        <meta property="og:title" content="FiveM Database - FiveM TOS & Code of Conduct Explained" />
        <meta property="og:description" content="Stay compliant with FiveM's official Terms of Service (TOS) and Code of Conduct (CoC). Learn how FiveM Database helps creators, servers, and players understand compliance rules to avoid bans, blacklists, and violations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fivemdb.online/fivem-tos" />
        <meta property="og:image" content="https://fivemdb.online/images/og-default-1200x630.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FiveM Database - FiveM TOS & Code of Conduct Explained" />
        <meta name="twitter:description" content="Stay compliant with FiveM's official Terms of Service (TOS) and Code of Conduct (CoC). Learn how FiveM Database helps creators, servers, and players understand compliance rules." />
        <meta name="twitter:image" content="https://fivemdb.online/images/og-default-1200x630.png" />
        <script type="application/ld+json">{JSON.stringify(fivemTOSJsonLd)}</script>
      </Helmet>
      <main className="flex-grow pt-20 md:pt-32 px-4 md:px-6 pb-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 md:mb-12">
            <div className="flex justify-center items-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-blue-400" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white">
                FiveM Terms of Service
              </h1>
            </div>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto px-4">
              Understanding and complying with FiveM's Terms of Service and Community Guidelines
            </p>
          </div>

          <Card className="glass-card border-0 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Official FiveM Terms of Service
              </CardTitle>
              <CardDescription className="text-white/70">
                The official terms and conditions that govern the use of FiveM
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <ExternalLink className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-white mb-1">FiveM Terms of Service</h3>
                    <p className="text-sm text-white/70 mb-3">
                      Official terms and conditions for using FiveM platform and services.
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://fivem.net/terms" target="_blank" rel="noopener noreferrer">
                        View The FiveM TOS
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <ExternalLink className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-white mb-1">FiveM Code Of Conduct</h3>
                    <p className="text-sm text-white/70 mb-3">
                      This is The FiveM Code Of Conduct that YOU Servers must follow.
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://www.rockstargames.com/legal" target="_blank" rel="noopener noreferrer">
                        View The FiveM Code Of Conduct
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-xl text-white">Key Prohibitions</CardTitle>
                <CardDescription className="text-white/70">
                  Important violations to avoid
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <span className="text-sm text-white/80">No monetization of modifications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <span className="text-sm text-white/80">No copyrighted content usage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <span className="text-sm text-white/80">No malicious code or exploits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <span className="text-sm text-white/80">No harassment or toxic behavior</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-xl text-white">Compliance Tips</CardTitle>
                <CardDescription className="text-white/70">
                  How to stay compliant
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-white/80">Use only original or permitted content</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-white/80">Respect intellectual property rights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-white/80">Follow community guidelines</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-white/80">Report violations when found</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div> */}

          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="text-xl text-white">Important Notice</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/80 text-sm leading-relaxed">
                      This has been recently refined to include only the FiveM Terms of Service and Code of Conduct links, due to prior conflicts.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default FiveMTOS;
