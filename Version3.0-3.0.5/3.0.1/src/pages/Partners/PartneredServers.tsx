import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Users, Star, Award } from "lucide-react";

const SERVER_PARTNERS_DATA = [
   {
     id: 1,
     name: "Velocity Network",
     description: "The Velocity network is your Dream place to be if you love cars, meeting friends and having fun!",
     website: "https://velocitynet.work",
     image: "https://cdn.laurelnwk.com/VelocityDriftNetwork/VelocityNetwork.png",
     specialty: "Automotive Freeroam",
     founded: "2019",
     tags: ["Drifting", "no-hesi", "custom vehicles"]
   },
   {
     id: 2,
     name: "Pro Gamer Netwokr [PGN]",
     description: "The pro gamer network is your goto server for the best RP Possibile!!",
     website: "https://discord.gg/PGN",
     image: "https://cdn.laurelnwk.com/VelocityDriftNetwork/pgn.jpg",
     specialty: "Roleplay",
     founded: "2022",
     tags: ["Roleplay", "public", "whitelist"]
   }
];

  // {
  //   id: 1,
  //   name: "REPLACE_WITH_NAME",
  //   description: "REPLACE_WITH_DESCRIPTION",
  //   website: "REPLACE_WITH_WEBSITE_OR_DISCORD",
  //   image: "REPLACE_WITH_LOGO",
  //   specialty: "REPALCE_WITH_SPECIALITY",
  //   founded: "REPLACE_WITH_DATE",
  //   tags: ["REPLAECE", "WITH", "TAGS"]
  // }

const PartneredServers = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-1 flex flex-col items-center">
        <div className="animate-fade-in container max-w-7xl px-8 py-24">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-light mb-12 leading-tight">
              <span className="text-gradient font-semibold">Partnered</span> Servers
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
              Join our featured partner servers that exemplify quality roleplay 
              and community engagement in the FiveM ecosystem.
            </p>
            <div className="flex justify-center gap-4 mb-12">
              <Badge variant="outline" className="text-blue-400 border-blue-400/50">
                <Users className="w-4 h-4 mr-2" />
                Active Communities
              </Badge>
              <Badge variant="outline" className="text-purple-400 border-purple-400/50">
                <Star className="w-4 h-4 mr-2" />
                Quality Servers
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
            {SERVER_PARTNERS_DATA.map((partner, index) => (
              <Card 
                key={partner.id} 
                className="glass-card border-0 overflow-hidden transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{animationDelay: `${index * 150}ms`}}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={partner.image} 
                    alt={partner.name} 
                    className="w-full aspect-square object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500">
                    Server Partner
                  </Badge>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl font-display text-white">{partner.name}</CardTitle>
                  <CardDescription className="text-white/70">{partner.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {partner.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center gap-2 hover:bg-white/10" 
                    asChild
                  >
                    <a href={partner.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      Join Server
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-white/70 mb-4">
              Ready to showcase your server as a partner?
            </p>
            <Button variant="outline" className="bg-white/5 hover:bg-white/10">
              <Award className="w-4 h-4 mr-2" />
              Apply for Partnership
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PartneredServers;