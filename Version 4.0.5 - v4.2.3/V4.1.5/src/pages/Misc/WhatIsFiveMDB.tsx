import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, ShieldCheck, Ban, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const WhatIsFiveMDB = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who owns FiveM Database?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "FiveM DB is operated by a small, security-focused team. Learn more on the Who is FiveM DB page.",
        },
      },
      {
        "@type": "Question",
        name: "What is FiveM DB?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "FiveM DB has two pillars: Compliance tools to help understand FiveM policies, and a Blacklist system that aggregates public, evidenced violations across platforms.",
        },
      },
      {
        "@type": "Question",
        name: "Why does FiveM DB exist?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "FiveM DB exists to provide transparent, verifiable information and tooling about the platform, independent from any company except Velocity.",
        },
      },
      {
        "@type": "Question",
        name: "What can you do on FiveM DB?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Check server and resource compliance, and search blacklist entries for users, servers, stores/hosting/websites, and Discords with attached proof.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-radial from-background to-black/50">
      <Helmet>
        <title>FiveM Database - What is FiveM DB (5DB)?</title>
        <meta name="description" content="FiveM Database (aka 5DB) is a compliance and community hub for creators, servers, and players. Learn how we support FiveM creators, protect against leaks, and ensure resources align with FiveM's Terms of Service." />
        <link rel="canonical" href="https://fivemdb.online/what-is-fivem-db" />
        <meta property="og:title" content="FiveM Database - What is FiveM DB (5DB)?" />
        <meta property="og:description" content="FiveM Database (aka 5DB) is a compliance and community hub for creators, servers, and players. Learn how we support FiveM creators, protect against leaks, and ensure resources align with FiveM's Terms of Service." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fivemdb.online/what-is-fivem-db" />
        <meta property="og:image" content="https://fivemdb.online/images/og-default-1200x630.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FiveM Database - What is FiveM DB (5DB)?" />
        <meta name="twitter:description" content="FiveM Database (aka 5DB) is a compliance and community hub for creators, servers, and players." />
        <meta name="twitter:image" content="https://fivemdb.online/images/og-default-1200x630.png" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <div className="responsive-container py-responsive">
        <header className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Info className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-primary" />
            <h1 className="text-responsive-3xl font-display font-bold text-gradient">
              What is FiveM DB?
            </h1>
          </div>
          <p className="text-responsive-base text-white/70 max-w-3xl mx-auto leading-relaxed">
            FiveM DB is a community-driven platform focused on compliance and blacklist tracking for the FiveM ecosystem. It helps creators, server owners, and players verify resources, servers, and communities align with CFX/FiveM policies.
          </p>
        </header>

        <main className="space-responsive max-w-5xl mx-auto">
          {/* General Info */}
          <section aria-labelledby="general-info" className="space-y-6">
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle id="general-info" className="text-gradient text-responsive-lg">
                  General info
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/80 leading-relaxed text-responsive-base space-y-4">
                <div>
                  <p className="font-medium">Who owns FiveM Database?</p>
                  <p>
                    Operated by a small, security-focused team. Learn more on
                    {" "}
                    <Link to="/who-is-fivem-db" className="underline decoration-primary/50 underline-offset-4 hover:text-primary transition-colors" aria-label="Learn who is FiveM DB">
                      Who is FiveM DB
                    </Link>
                    .
                  </p>
                </div>

                <div>
                  <p className="font-medium">What is FiveM DB?</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    <Card className="glass-card border-white/10">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="h-5 w-5 text-primary" />
                          <CardTitle className="text-responsive-base">Compliance</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="text-white/80 text-sm leading-relaxed">
                        Tools built for server owners, creators, and players to understand FiveM compliance and quickly see what is compliant and what is not.
                      </CardContent>
                    </Card>

                    <Card className="glass-card border-white/10">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <Ban className="h-5 w-5 text-primary" />
                          <CardTitle className="text-responsive-base">Blacklist system</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="text-white/80 text-sm leading-relaxed">
                        A public, evidence-backed blacklist across platforms (Discord, Tebex, websites, FiveM, and more) showing why entries were blacklisted with proof.
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Why We Exist */}
          <section aria-labelledby="why-exist" className="space-y-6">
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle id="why-exist" className="text-gradient text-responsive-lg">Why does FiveM DB exist?</CardTitle>
              </CardHeader>
              <CardContent className="text-white/80 leading-relaxed text-responsive-base space-y-4">
                <p>
                  FiveM Database is built to show and prove everything regarding the platform, with no associations to any company other than Velocity.
                </p>
                <p>
                  We started to surface stats on how applications, results, and actions were being taken within FiveM, and evolved into a broader mission: reveal the truth about how FiveM operates while providing transparent blacklists for creators and the reasons behind them.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* What You Can Do */}
          <section aria-labelledby="capabilities" className="space-y-6">
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle id="capabilities" className="text-gradient text-responsive-lg">What can you do on FiveM Database?</CardTitle>
              </CardHeader>
              <CardContent className="text-white/80 leading-relaxed text-responsive-base">
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <Link to="/resource-checker" className="group inline-flex items-center gap-2 underline decoration-primary/50 underline-offset-4 hover:text-primary transition-colors" aria-label="Go to Resource Compliance Checker">
                      Resource compliance checker
                      <ExternalLink className="h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <p className="text-white/60 mt-1 text-sm">Check links, resource names, and more across the internet to assess compliance.</p>
                  </li>
                  <li>
                    <Link to="/user-blacklist-checker" className="group inline-flex items-center gap-2 underline decoration-primary/50 underline-offset-4 hover:text-primary transition-colors" aria-label="Go to User Blacklists">
                      User blacklists
                      <ExternalLink className="h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <p className="text-white/60 mt-1 text-sm">Enter a FiveM ID or Discord ID to see if a user has been blacklisted and why.</p>
                  </li>
                  <li>
                    <Link to="/store-blacklist-checker" className="group inline-flex items-center gap-2 underline decoration-primary/50 underline-offset-4 hover:text-primary transition-colors" aria-label="Go to Store/Hosting/Web Blacklists">
                      Store/hosting/web blacklists
                      <ExternalLink className="h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <p className="text-white/60 mt-1 text-sm">Check creators, hosting providers, and websites to see blacklist status and reasons.</p>
                  </li>
                  <li>
                    <Link to="/server-blacklist-checker" className="group inline-flex items-center gap-2 underline decoration-primary/50 underline-offset-4 hover:text-primary transition-colors" aria-label="Go to Server Blacklists">
                      Server blacklists
                      <ExternalLink className="h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <p className="text-white/60 mt-1 text-sm">Review servers blacklisted for COC/TOS violations with attached proof.</p>
                  </li>
                  <li>
                    <Link to="/discord-blacklist-checker" className="group inline-flex items-center gap-2 underline decoration-primary/50 underline-offset-4 hover:text-primary transition-colors" aria-label="Go to Discord Blacklists">
                      Discord blacklists
                      <ExternalLink className="h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <p className="text-white/60 mt-1 text-sm">Check blacklisted Discord servers and the supporting evidence.</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Server Owner Usage */}
          <section aria-labelledby="server-owner-usage" className="space-y-6">
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle id="server-owner-usage" className="text-gradient text-responsive-lg">Server Owner Usage</CardTitle>
              </CardHeader>
              <CardContent className="text-white/80 leading-relaxed text-responsive-base space-y-3">
                <div>
                  <p className="font-medium">Resource checker</p>
                  <p className="text-white/70 text-sm">
                    Check any website and hosted resources to see blacklist status and FiveM platform compliance.
                  </p>
                  <Link to="/resource-checker" className="inline-flex items-center gap-2 mt-2 underline decoration-primary/50 underline-offset-4 hover:text-primary transition-colors" aria-label="Open Resource Checker">
                    Open Resource Checker <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Creators Usage */}
          <section aria-labelledby="creators-usage" className="space-y-6">
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle id="creators-usage" className="text-gradient text-responsive-lg">Creators' Usage</CardTitle>
              </CardHeader>
              <CardContent className="text-white/80 leading-relaxed text-responsive-base">
                <p>
                  Use the Resource Checker and Blacklists to verify whether another creator has been blacklisted with proof attached. This helps you assess safety for partnerships, collaborations, or other engagements.
                </p>
                <div className="mt-3 flex flex-wrap gap-4">
                  <Link to="/resource-checker" className="underline decoration-primary/50 underline-offset-4 hover:text-primary transition-colors" aria-label="Resource Checker for creators">
                    Resource Checker
                  </Link>
                  <Link to="/user-blacklist-checker" className="underline decoration-primary/50 underline-offset-4 hover:text-primary transition-colors" aria-label="User Blacklists for creators">
                    User Blacklists
                  </Link>
                  <Link to="/store-blacklist-checker" className="underline decoration-primary/50 underline-offset-4 hover:text-primary transition-colors" aria-label="Store/Hosting Blacklists for creators">
                    Store/Hosting Blacklists
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
};

export default WhatIsFiveMDB;
