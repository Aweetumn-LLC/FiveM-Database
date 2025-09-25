import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Users, Store, Server, MessageSquare, ExternalLink } from "lucide-react";
import { Helmet } from "react-helmet";

export default function BlacklistSystem() {
  const blacklistSystemJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "FiveM Blacklist System Information",
    description: "Learn about FiveM DB's comprehensive blacklist system protecting the community from leakers, scammers, and malicious actors with evidence-backed verification.",
    url: "https://fivemdb.online/tool-info/blacklist-system",
    about: {
      "@type": "Thing",
      name: "FiveM Blacklist System"
    }
  };

  const blacklistTools = [
    {
      icon: Users,
      title: "User Blacklisting",
      description: "Restricts individual users from accessing services.",
    },
    {
      icon: Store,
      title: "Store Blacklisting", 
      description: "Blocks non-compliant or harmful online stores.",
    },
    {
      icon: Server,
      title: "Server Blacklisting",
      description: "Prevents access to servers that violate rules or pose risks.",
    },
    {
      icon: MessageSquare,
      title: "Discord Blacklisting",
      description: "Denies interaction with Discord communities involved in prohibited activity.",
    },
  ];

  const blacklistCategories = [
    {
      category: "Reselling",
      description: "Creators who attempt to sell another person's work without authorization.",
    },
    {
      category: "Stealing",
      description: "Individuals who steal or copy code without permission.",
    },
    {
      category: "Leaking",
      description: "Distributing assets, scripts, or other digital products without the creator's consent.",
    },
    {
      category: "Code of Conduct Violations (CoC)",
      description: "Any breach of the platform's Code of Conduct.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>FiveM Database - Blacklist System for Creators & Servers</title>
        <meta name="description" content="Explore FiveM Database's Blacklist System. Identify untrusted developers, leaked resources, and unsafe stores. Protect your FiveM server by knowing who is blacklisted and why." />
        <meta name="keywords" content="FiveM blacklist system, community protection, FiveM security, blacklist tools, user blacklist, server blacklist, store blacklist, discord blacklist, leaker protection, scammer prevention, CFX security, FiveM safety" />
        <link rel="canonical" href="https://fivemdb.net/tool-info/blacklist-system" />
        <meta property="og:title" content="FiveM Database - Blacklist System for Creators & Servers" />
        <meta property="og:description" content="Explore FiveM Database's Blacklist System. Identify untrusted developers, leaked resources, and unsafe stores. Protect your FiveM server by knowing who is blacklisted and why." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fivemdb.net/tool-info/blacklist-system" />
        <meta property="og:image" content="https://cdn.velocitynet.work/5DB/Data/5DBEmbed.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FiveM Database - Blacklist System for Creators & Servers" />
        <meta name="twitter:description" content="Explore FiveM Database's Blacklist System. Identify untrusted developers, leaked resources, and unsafe stores." />
        <meta name="twitter:image" content="https://cdn.velocitynet.work/5DB/Data/5DBEmbed.png" />
        <script type="application/ld+json">{JSON.stringify(blacklistSystemJsonLd)}</script>
      </Helmet>
      <main className="flex-1">
        <header className="bg-gradient-to-br from-red-500/20 via-orange-500/10 to-primary/10 border-b border-white/10">
          <div className="container py-12 text-center">
            <Badge className="mb-4">Protection System</Badge>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-primary">
              Blacklist System
            </h1>
            <p className="text-white/70 max-w-3xl mx-auto">
              Protecting the FiveM community from malicious actors and maintaining platform integrity.
            </p>
          </div>
        </header>

        <section className="container py-10 space-y-10">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                Blacklist System Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 leading-relaxed space-y-4">
              <p>
                The FiveM Database operates four dedicated blacklist tools to protect the community and maintain platform integrity:
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 mt-6">
                {blacklistTools.map((tool, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-secondary/10 border border-white/10">
                    <tool.icon className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg">{tool.title}</h3>
                      <p className="text-white/70 text-sm">{tool.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl">How the Blacklist System Works</CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 leading-relaxed space-y-4">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg border border-primary/20">
                <p className="mb-4">
                  The blacklist system is managed entirely by the{" "}
                  <Button variant="link" className="p-0 h-auto text-primary" asChild>
                    <a href="https://insider.fivemdb.online" target="_blank" rel="noopener noreferrer">
                      FiveM DB Insider Team <ExternalLink className="h-4 w-4 ml-1 inline" />
                    </a>
                  </Button>
                  .
                </p>
                <p>
                  Every blacklist entry is accompanied by documented proof, clearly showing the reason for the blacklist and the evidence supporting it.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Our blacklist system exists to protect the FiveM community from:</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="font-medium">Leakers</span>
                    </div>
                    <p className="text-sm text-white/70 ml-4">
                      Individuals or platforms that distribute content without permission.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="font-medium">Scammers</span>
                    </div>
                    <p className="text-sm text-white/70 ml-4">
                      Entities that defraud users or misrepresent products.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="font-medium">Resellers</span>
                    </div>
                    <p className="text-sm text-white/70 ml-4">
                      Unauthorized sellers of someone else's work.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="font-medium">Dangerous Platforms</span>
                    </div>
                    <p className="text-sm text-white/70 ml-4">
                      Websites, servers, or communities that pose a security or safety risk.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl">Blacklist Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 px-4 font-semibold">Category</th>
                      <th className="text-left py-3 px-4 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blacklistCategories.map((item, index) => (
                      <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 font-medium text-red-400">{item.category}</td>
                        <td className="py-3 px-4 text-white/80">{item.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}