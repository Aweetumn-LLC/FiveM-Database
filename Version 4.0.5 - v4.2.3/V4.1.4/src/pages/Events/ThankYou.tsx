import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Award, Users, TrendingUp, Database, Globe, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import VolunteerContributors from "@/components/VolunteerContributors";
import ContributorInline from "@/components/ContributorInline";
import { Helmet } from "react-helmet";
interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  partner_type: string;
}

const milestoneData = [
  { icon: Users, title: "100 Discord members", subtitle: "December 2024" },
  { icon: Users, title: "500 Discord members", subtitle: "March 2025" },
  { icon: Users, title: "1,000 Discord members", subtitle: "July 2025" },
  { icon: Globe, title: "1,000 Unique Visitors", subtitle: "October 2024" },
  { icon: Globe, title: "10,000 Unique Visitors", subtitle: "January 2025" },
  { icon: Globe, title: "50,000 Unique Visitors", subtitle: "March 2025" },
  { icon: Globe, title: "100,000 Unique Visitors", subtitle: "August 2025" },
  { icon: TrendingUp, title: "100,000 Total Visits", subtitle: "February 2025" },
  { icon: TrendingUp, title: "1,000,000 Total Visits", subtitle: "July 2025" },
  { icon: Award, title: "Acquired by Velocity", subtitle: "2025" },
  { icon: Award, title: "First Partner — IC3D", subtitle: "May 2025" },
  { icon: Database, title: "Release of Resource Checker", subtitle: "February 2025" },
  { icon: Database, title: "Release of Server Checker", subtitle: "January 2025" },
  { icon: Database, title: "Release of Blacklist System", subtitle: "August 2025" },
];

const galleryImages: { url: string; alt: string; blurb: string }[] = [
  { url: "https://zwrks.com/cdn/FiveMDB/1y-ani/FiveMDB-0.7-Dashboard.png", alt: "5DB V0.7", blurb: "This is where it all begun with our original Square space website." },
  { url: "https://zwrks.com/cdn/FiveMDB/1y-ani/FiveMDB-0.7-Dashboard.png", alt: "5DB V0.7 about page", blurb: "Our old original about us page before we moved to our current web system." },
  { url: "https://zwrks.com/cdn/FiveMDB/1y-ani/5db-2.0-dashboard.png", alt: "5DB V2.0", blurb: "The very first photo of the FiveM DB V2.0 Home page" },
  { url: "https://zwrks.com/cdn/FiveMDB/1y-ani/5db-2.0-documentation.png", alt: "5DB V2.0", blurb: "The original FiveM DB Docs page" },
  { url: "https://zwrks.com/cdn/FiveMDB/1y-ani/5db-2.0-partners.png", alt: "5DB V2.0", blurb: "Our old partner section of FiveM Database" },
  { url: "https://zwrks.com/cdn/FiveMDB/1y-ani/5db-2.0-resource-checker.png", alt: "5DB V2.0", blurb: "The very first release of our Server Checker System" },
  { url: "https://zwrks.com/cdn/FiveMDB/1y-ani/5db-2.0-server-reports.png", alt: "5DB V2.0", blurb: "Introduction of FiveM Database's blacklisting system" },
  { url: "https://zwrks.com/cdn/FiveMDB/1y-ani/5db-3.0-home.png", alt: "5DB V3.0", blurb: "The Release of FiveM Database V3.0 and its homepage" },
  { url: "https://zwrks.com/cdn/FiveMDB/1y-ani/5db-3.0-stats.png", alt: "5DB V3.0", blurb: "The introduction of Public Stats for everyone to see" },
  { url: "https://zwrks.com/cdn/FiveMDB/1y-ani/5DB-GoogleExtention.png", alt: "5DB Extention", blurb: "The Release of the FiveM Database Browser Extention" },
];

export default function ThankYou() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  const thankYouJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "FiveM DB One Year Anniversary",
    description: "Celebrating one year of FiveM Database and thanking our amazing community, partners, and contributors.",
    startDate: "2024-08-20",
    location: {
      "@type": "VirtualLocation",
      url: "https://fivemdb.net"
    },
    organizer: {
      "@type": "Organization",
      name: "FiveM DB",
      url: "https://fivemdb.net"
    }
  };

  useEffect(() => {
    const loadPartners = async () => {
      try {
        const { data, error } = await supabase
          .from("partners")
          .select("id,name,logo_url,website_url,partner_type")
          .in("partner_type", ["creator", "recommended", "hosting", "framework", "server"])
          .order("display_order", { ascending: true });
        if (error) throw error;
        setPartners(data || []);
      } catch (e) {
        console.error("Error loading partners for thank you page", e);
      } finally {
        setLoading(false);
      }
    };
    loadPartners();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>FiveM Database - Thank You FiveM Community!</title>
        <meta name="description" content="FiveM Database (5DB) is officially 1 year old! We're beyond grateful to the FiveM creators, developers, server owners, and players who made this journey possible. Thank you for supporting the FiveM community and our mission to fight leaks, promote compliance, and empower creators." />
        <meta name="keywords" content="FiveM DB anniversary, FiveM Database thank you, FiveM community, CFX community, FiveM contributors, FiveM partners, Velocity Network, Sophia FiveM, Autumn FiveM" />
        <link rel="canonical" href="https://fivemdb.net/events/thank-you/" />
        <meta property="og:title" content="FiveM Database - Thank You FiveM Community!" />
        <meta property="og:description" content="FiveM Database (5DB) is officially 1 year old! We're beyond grateful to the FiveM creators, developers, server owners, and players who made this journey possible." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fivemdb.net/events/thank-you/" />
        <meta property="og:image" content="https://cdn.velocitynet.work/5DB/Data/5DBEmbed.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FiveM Database - Thank You FiveM Community!" />
        <meta name="twitter:description" content="FiveM Database (5DB) is officially 1 year old! We're beyond grateful to the FiveM creators, developers, server owners, and players who made this journey possible." />
        <meta name="twitter:image" content="https://cdn.velocitynet.work/5DB/Data/5DBEmbed.png" />
        <script type="application/ld+json">{JSON.stringify(thankYouJsonLd)}</script>
      </Helmet>
      <main className="flex-1">
        <header className="bg-gradient-to-br from-pink-500/20 via-purple-500/10 to-primary/10 border-b border-white/10">
          <div className="container py-12 text-center">
            <Badge className="mb-4">Anniversary</Badge>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-primary">
              Thank You, FiveM Community
            </h1>
            <p className="text-white/70 max-w-3xl mx-auto">
              From the bottom of our hearts — thank you for an incredible first year of FiveM Database.
            </p>
          </div>
        </header>

        <section className="container py-10 space-y-10">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl">A message of gratitude</CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 leading-relaxed">
              <p className="mb-4">
                Where do we even begin other than to say a massive thank you to the entire community across FiveM And the broader region to where it has reached.
              </p>
              <p className="mb-4">
                FiveM Database was a small project that was started out under the name LNWK; This project was something that people started beliving that it was going to be " Annother one of those tools that are nothing " And now to think that we have reached the eyes of over 100,000+ Unique eyes, Our discord is now over 1,300+ Members whitch is a massive milestone.
              </p>

              <h3 className="text-xl font-display mt-6 mb-2">Lets go down memorie lane</h3>
              <p className="mb-4">
                FiveM Database started out as a small project named LNWK, a project that was made by Sophia before the rename to FiveM Database. LNWK Originaly opend up in 2024, August 20th. That day holds a special place for all of us within FiveM Database.
              </p>
              <p className="mb-4">
                When We chose to rebrand from LNWK And move over to the name FiveM Database because we belived it suited the name of the project we had no idea on how massive of an impact that it would have on the platform.
              </p>
              <p className="mb-6">
                Grom a passion project from someone in the fivem community that truely cares abotu Compliace and making sure that everything is as clean as could be all the way to a project that is now owned by a Company and is managed by a team of over 20 Staff members. FiveM Database has been a massive part on our lifes in the past year and we hope that everything we have been able to do has been able to help you, youre friends and people you have met across the platform.
              </p>

              <h3 className="text-xl font-display mt-6 mb-2">Our thankyou</h3>
              <p className="mb-6">
                I.. I Truely dont know what to say other thank thank you to every one of you absolutely lovely and amazing people. This project has come soo far in such a short period of time.
              </p>
              <p className="mb-6">
                To think that 365 Days ago was when we frist opend the doors of FiveM DB Is something that i can barely even belive that it has been that long.
              </p>
              <p className="mb-8">
                Thank you to everyone. Our amazing partners, our amazing community and of course our absolutely amazing Staff team that have poured countless hours into FiveM Database.
              </p>

              <h3 className="text-xl font-display mt-6 mb-4">Special Thanks</h3>
              <p className="mb-8">
                I Personaly (Autumn) want to give a Massive thanks to Sophia. She single handedly started this project from the ground up, With her networking skills she has managed to bring not only the community closer together but also resource creators, youtubers, server owners and community members closer to gether and to be able to help people.
              </p>
              <p className="mb-8">
                I Am sure that FiveM Database would be no where near where it is at now if it was not for her and all the amazing work that has been put into the project.
              </p>

              <h3 className="text-xl font-display mt-6 mb-4">Development Stats</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <ContributorInline discordId="1320215445768372366" fallbackName="Sophia" />
                  <div className="text-sm">
                    <p className="mb-2">
                      Sophia has contributed to this project with over 1100 Unique blacklists to the platform as well as single handedly done soo much work on the development end of FiveM Database and bringing to where it is at today
                    </p>
                    <div className="text-white/70">
                      <div className="font-medium">Code Stats</div>
                      <ul className="list-disc pl-5">
                        <li>Lines added ; 238,000+</li>
                        <li>Commits ; 9,733</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <ContributorInline discordId="406719326419288066" fallbackName="Autumn" />
                  <div className="text-sm">
                    <p className="mb-2">
                      While being the owner of the Velocity network Autumn has done soo much work on the backend and database's Within FiveM Database while moving the old system from version 2.0 from using json files to load all data to the new system that souly revolves arround using an entire database with over 43 Million entrys and over 2,500 Entreys added in daily.
                    </p>
                    <div className="text-white/70">
                      <div className="font-medium">Code Stats</div>
                      <ul className="list-disc pl-5">
                        <li>Lines added ; 41,000+</li>
                        <li>commits ; 1,381</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <ContributorInline discordId="807792137403236363" fallbackName="Mutt" />
                  <div className="text-sm">
                    <p className="mb-2">
                      While mut has not worked on the code end of the main website he has done a massive amount of work in helping out on the Staff panel side of FiveM Database, mutt Made the entire system that the staff team rely on for FiveM Database while making it function. This is still a system that we use today over 4 Months later and he dose not get the creddit that he deserves!
                    </p>
                    <div className="text-white/70">
                      <div className="font-medium">Code Stats</div>
                      <ul className="list-disc pl-5">
                        <li>Lines added ; 450+</li>
                        <li>Commits ; 2</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <section>
            <h2 className="text-2xl font-display mb-4">Milestones</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {milestoneData.map((m, idx) => (
                <Card key={idx} className="glass-card">
                  <CardContent className="flex items-center gap-4 p-6">
                    <m.icon className="h-8 w-8 text-pink-400" />
                    <div>
                      <div className="text-lg font-medium">{m.title}</div>
                      <div className="text-white/60 text-sm">{m.subtitle}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-display mb-4">A look back</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((img, idx) => (
                <div key={idx} className="relative overflow-hidden rounded-lg border border-white/10">
                  <div className="p-3 text-sm text-white/70">{img.blurb}</div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="w-full" aria-label={`Expand image ${idx + 1}`}>
                        <img src={img.url} alt={img.alt} loading="lazy" className="w-full h-56 object-contain bg-secondary" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <img src={img.url} alt={img.alt} className="w-full h-auto object-contain" />
                      <p className="text-sm text-muted-foreground mt-2">{img.blurb}</p>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-display">Thank you to our amazing volunteer contributors</h2>
              <Badge variant="outline" className="hidden sm:inline-flex">Volunteers</Badge>
            </div>
            <p className="text-white/70 mb-4">
              Thank you to our amazing team of volunteer contributors that have made a massive effort in helping FiveM Database with blacklists, tickets and more.
            </p>
            <VolunteerContributors />
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-display">Thank you to our partners and creators</h2>
              <Badge variant="outline" className="hidden sm:inline-flex">Community Partners</Badge>
            </div>
            {loading ? (
              <div className="text-white/70">Loading partners…</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {partners.map((p) => (
                  <Card key={p.id} className="glass-card hover:scale-105 transition-transform">
                    <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                      <img
                        src={p.logo_url || "/placeholder.svg"}
                        alt={`${p.name} logo`}
                        className="h-14 w-14 object-contain"
                      />
                      <div className="text-sm font-medium">{p.name}</div>
                      {p.website_url && (
                        <a href={p.website_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary story-link">
                          Visit store
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          <div className="flex justify-center pt-4">
            <Button variant="outline" className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30">
              <Heart className="mr-2 h-4 w-4" />
              With love — FiveM DB Team
            </Button>
          </div>
        </section>

      </main>
    </div>
  );
}
