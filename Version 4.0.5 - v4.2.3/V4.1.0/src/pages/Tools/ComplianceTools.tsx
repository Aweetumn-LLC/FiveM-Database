import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Server, Shield } from "lucide-react";
import { Helmet } from "react-helmet";

export default function ComplianceTools() {
  const complianceToolsJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "FiveM Compliance Tools Information",
    description: "Learn about FiveM DB's automated compliance monitoring tools, violation categories, and severity levels for TOS and COC enforcement.",
    url: "https://fivemdb.net/tool-info/compliance-tools",
    about: {
      "@type": "Thing",
      name: "FiveM Compliance Tools"
    }
  };

  const flagData = [
    { flag: "Child Pedestrians", severity: 3, description: "Selling or producing child pedestrian models in FiveM. (Violation of the Code of Conduct)" },
    { flag: "School RP & Assets", severity: 3, description: "Servers, creators, or marketplaces selling assets related to schools, school buildings, or similar content. (Violation of the Terms of Service & Code of Conduct)" },
    { flag: "Malicious Behavior", severity: 3, description: "Malicious activity or attempts to harm players or clients through harmful tools or scripts. (Violation of the Terms of Service, Code of Conduct, and applicable laws)" },
    { flag: "Explicit Adult Content (EAC)", severity: 2, description: "Inclusion of explicit adult content, such as graphic depictions of childbirth." },
    { flag: "Debadging", severity: 2, description: "Removing manufacturer branding from a vehicle and claiming it as 'lore friendly.' (Violation of the Terms of Service)" },
    { flag: "IP Infringement", severity: 2, description: "Selling branded or real-world assets without authorization. (Violation of the Terms of Service)" },
    { flag: "Leaking", severity: 2, description: "Distributing assets without permission. (Violation of the Terms of Service & Code of Conduct)" },
    { flag: "Leak Promotion", severity: 2, description: "Partnering with or promoting leak services (e.g., Discord servers or websites)." },
    { flag: "Reselling", severity: 2, description: "Selling someone else's work without authorization, claiming it as your own." },
    { flag: "Illegal Activities", severity: 3, description: "Any illegal act, including extreme violations such as breaches of international law." },
    { flag: "Impersonation", severity: 2, description: "Pretending to be another creator, server, or business." },
    { flag: "Services", severity: 1, description: "Selling account boosting, game boosting, or similar services." },
    { flag: "Unauthorized Marketplace", severity: 2, description: "Selling assets on platforms other than the authorized Tebex system." },
    { flag: "Cheats", severity: 2, description: "Selling cheats, cheat menus, cracked clients, spoofers, or similar tools." },
    { flag: "Unauthorized GSP", severity: 2, description: "Hosting companies selling game panels for FiveM servers without authorization." },
    { flag: "Scamming", severity: 3, description: "Proven scams against users." },
    { flag: "Discriminatory or Offensive Content", severity: 3, description: "Content promoting racism, sexism, homophobia, or other forms of hate speech." },
    { flag: "Fake Player Services", severity: 2, description: "Selling services that artificially increase player counts." },
    { flag: "Upvote Services", severity: 2, description: "Selling unauthorized upvotes outside of the official CFX portal." },
  ];

  const getSeverityColor = (severity: number) => {
    switch (severity) {
      case 1:
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/40";
      case 2:
        return "bg-orange-500/20 text-orange-400 border-orange-500/40";
      case 3:
        return "bg-red-500/20 text-red-400 border-red-500/40";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/40";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>FiveM Database - FiveM Compliance Tools Suite</title>
        <meta name="description" content="Keep your server and resources safe with FiveM Database's Compliance Tools. Ensure your scripts, stores, and servers follow FiveM's Terms of Service and Code of Conduct to avoid blacklisting." />
        <meta name="keywords" content="FiveM compliance tools, CFX compliance, TOS monitoring, COC enforcement, FiveM violation system, automated compliance, resource checker compliance, server compliance, FiveM security tools, compliance monitoring, violation categories" />
        <link rel="canonical" href="https://fivemdb.net/tool-info/compliance-tools" />
        <meta property="og:title" content="FiveM Database - FiveM Compliance Tools Suite" />
        <meta property="og:description" content="Keep your server and resources safe with FiveM Database's Compliance Tools. Ensure your scripts, stores, and servers follow FiveM's Terms of Service and Code of Conduct to avoid blacklisting." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fivemdb.net/tool-info/compliance-tools" />
        <meta property="og:image" content="https://cdn.velocitynet.work/5DB/Data/5DBEmbed.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FiveM Database - FiveM Compliance Tools Suite" />
        <meta name="twitter:description" content="Keep your server and resources safe with FiveM Database's Compliance Tools." />
        <meta name="twitter:image" content="https://cdn.velocitynet.work/5DB/Data/5DBEmbed.png" />
        <script type="application/ld+json">{JSON.stringify(complianceToolsJsonLd)}</script>
      </Helmet>
      <main className="flex-1">
        <header className="bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10 border-b border-white/10">
          <div className="container py-12 text-center">
            <Badge className="mb-4">Tool Information</Badge>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
              Compliance Tools
            </h1>
            <p className="text-white/70 max-w-3xl mx-auto">
              Understanding our automated compliance monitoring tools and violation categories.
            </p>
          </div>
        </header>

        <section className="container py-10 space-y-10">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                Compliance Tools Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 leading-relaxed space-y-4">
              <p>
                The FiveM platform utilizes two dedicated compliance monitoring tools to help ensure adherence to the Terms of Service and Code of Conduct:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/10">
                  <Search className="h-8 w-8 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">FiveM Resource Checker</h3>
                    <p className="text-white/70">Automatically scans uploaded resources to identify potential violations.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/10">
                  <Server className="h-8 w-8 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">FiveM Server Checker</h3>
                    <p className="text-white/70">Reviews active servers for any non-compliant content or activity.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl">Compliance Flag Categories</CardTitle>
              <p className="text-white/70">
                Each potential violation is assigned a severity level from <strong>1</strong> (minor) to <strong>3</strong> (severe).
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 px-4 font-semibold">Flag</th>
                      <th className="text-center py-3 px-4 font-semibold">Severity</th>
                      <th className="text-left py-3 px-4 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flagData.map((item, index) => (
                      <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 font-medium">{item.flag}</td>
                        <td className="py-3 px-4 text-center">
                          <Badge className={getSeverityColor(item.severity)}>
                            {item.severity}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-white/80 text-sm">{item.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl">How Compliance Flags Are Determined</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-white/80">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Search className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Resource Checker</h3>
                  </div>
                  <p className="text-sm">
                    Operates via a fully automated system that scans submitted links for keywords, blacklist matches, and known bypass patterns to detect potential violations.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Server className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Server Checker</h3>
                  </div>
                  <p className="text-sm">
                    Monitors active servers for any content or activity that breaches the Terms of Service or Code of Conduct.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}