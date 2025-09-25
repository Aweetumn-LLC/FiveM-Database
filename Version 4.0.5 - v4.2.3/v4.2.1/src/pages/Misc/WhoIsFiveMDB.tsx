import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { Helmet } from "react-helmet";

const WhoIsFiveMDB = () => {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FiveM Database",
    url: "https://fivemdb.net",
    parentOrganization: {
      "@type": "Organization",
      name: "Velocity",
      url: "https://velocitynet.work",
      foundingDate: "2019",
      founder: { "@type": "Person", name: "Sophia" },
      owner: { "@type": "Person", name: "Autumn" },
    },
    sameAs: ["https://velocitynet.work"],
    description:
      "Who owns FiveM DB, Velocity's founding story, services, websites, and game servers.",
  };

  return (
    <div className="min-h-screen bg-gradient-radial from-background to-black/50">
      <Helmet>
        <title>FiveM Database - Who Runs FiveM DB?</title>
        <meta name="description" content="Discover the people behind FiveM Database. Learn why FiveM DB was created, our mission to protect creators, stop leaks, and help the community build safe and compliant servers." />
        <link rel="canonical" href="https://fivemdb.online/who-is-fivem-db" />
        <meta property="og:title" content="FiveM Database - Who Runs FiveM DB?" />
        <meta property="og:description" content="Discover the people behind FiveM Database. Learn why FiveM DB was created, our mission to protect creators, stop leaks, and help the community build safe and compliant servers." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fivemdb.online/who-is-fivem-db" />
        <meta property="og:image" content="https://cdn.velocitynet.work/5DB/Data/5DBEmbed.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FiveM Database - Who Runs FiveM DB?" />
        <meta name="twitter:description" content="Discover the people behind FiveM Database. Learn why FiveM DB was created, our mission to protect creators, stop leaks, and help the community." />
        <meta name="twitter:image" content="https://cdn.velocitynet.work/5DB/Data/5DBEmbed.png" />
        <script type="application/ld+json">{JSON.stringify(orgJsonLd)}</script>
      </Helmet>

      <div className="responsive-container py-responsive">
        <header className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-primary" />
            <h1 className="text-responsive-3xl font-display font-bold text-gradient">
              Who is FiveM DB?
            </h1>
          </div>
          <p className="text-responsive-base text-white/70 max-w-3xl mx-auto leading-relaxed">
            Learn about FiveM Database ownership, our parent company Velocity, and the
            platforms and games we operate across.
          </p>
        </header>

        <main className="space-responsive max-w-5xl mx-auto">
          {/* Ownership */}
          <section aria-labelledby="ownership" className="space-y-6">
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle id="ownership" className="text-gradient text-responsive-lg">
                  Ownership
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/80 leading-relaxed text-responsive-base space-y-3">
                <div>
                  <p className="font-medium">Who owns FiveM Database?</p>
                  <p>
                    FiveM Database is owned by its parent company
                    {" "}
                    <a
                      href="https://velocitynet.work"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-primary/50 underline-offset-4 hover:text-primary transition-colors"
                      aria-label="Visit Velocity website"
                    >
                      Velocity
                    </a>
                    .
                  </p>
                </div>

                <div>
                  <p className="font-medium">When was Velocity founded?</p>
                  <p>
                    Velocity was founded in 2019 following the closure of our range of FiveM servers.
                  </p>
                </div>

                <div>
                  <p className="font-medium">About Velocity</p>
                  <p>
                    The
                    {" "}
                    <a
                      href="https://velocitynet.work"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-primary/50 underline-offset-4 hover:text-primary transition-colors"
                      aria-label="Learn about The Velocity Network"
                    >
                      Velocity Network
                    </a>
                    {" "}
                    was founded by Sophia and later sold to Autumn, the current owner, in 2025. Sophia chose to sell Velocity due to not having the time to dedicate to managing the team and operations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Services & Presence */}
          <section aria-labelledby="services" className="space-y-6">
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle id="services" className="text-gradient text-responsive-lg">
                  Services and Presence
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/80 leading-relaxed text-responsive-base space-y-4">
                <p>
                  Velocity operates across a wide range of platforms and websites.
                </p>

                <div>
                  <p className="font-medium">Websites</p>
                  <p>
                    Velocity currently operates 13 websites, with the largest being
                    {" "}
                    <a
                      href="https://fivemdb.net"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-primary/50 underline-offset-4 hover:text-primary transition-colors"
                      aria-label="Visit FiveM Database"
                    >
                      FiveM Database
                    </a>
                    {" "}and{ " "}
                    <a
                      href="https://velocitynet.work"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-primary/50 underline-offset-4 hover:text-primary transition-colors"
                      aria-label="Visit Velocity website"
                    >
                      Velocity
                    </a>
                    .
                  </p>
                </div>

                <div>
                  <p className="font-medium">Game servers</p>
                  <p>Velocity owns and operates over 40 game servers across several different games:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>
                      Garry's Mod —
                      {" "}
                      <a
                        href="https://en.wikipedia.org/wiki/Garry%27s_Mod"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-primary/50 underline-offset-4 hover:text-primary transition-colors"
                        aria-label="Learn about Garry's Mod"
                      >
                        Learn more
                      </a>
                    </li>
                    <li>
                      Rust —
                      {" "}
                      <a
                        href="https://en.wikipedia.org/wiki/Rust_(video_game)"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-primary/50 underline-offset-4 hover:text-primary transition-colors"
                        aria-label="Learn about Rust video game"
                      >
                        Learn more
                      </a>
                    </li>
                    <li>
                      ARK: Survival Evolved —
                      {" "}
                      <a
                        href="https://en.wikipedia.org/wiki/Ark:_Survival_Evolved"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-primary/50 underline-offset-4 hover:text-primary transition-colors"
                        aria-label="Learn about Ark Survival Evolved"
                      >
                        Learn more
                      </a>
                    </li>
                    <li>
                      FiveM —
                      {" "}
                      <a
                        href="https://fivem.net"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-primary/50 underline-offset-4 hover:text-primary transition-colors"
                        aria-label="Learn about FiveM"
                      >
                        Learn more
                      </a>
                    </li>
                    <li>
                      Assetto Corsa & Assetto Corsa Evo —
                      {" "}
                      <a
                        href="https://www.assettocorsa.net/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-primary/50 underline-offset-4 hover:text-primary transition-colors"
                        aria-label="Learn about Assetto Corsa"
                      >
                        Learn more
                      </a>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
};

export default WhoIsFiveMDB;
