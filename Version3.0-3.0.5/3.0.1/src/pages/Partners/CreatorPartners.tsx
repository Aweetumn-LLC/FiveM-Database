import { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, Award, Globe } from "lucide-react";
import Header from "@/components/Header";

export const CREATORS_DATA = [
  {
    id: 0,
    name: "BS-Development",
    description: "Specializing in FiveM resource development and custom server solutions.",
    website: "https://bsd.tebex.io/",
    image: "https://dunb17ur4ymx4.cloudfront.net/webstore/logos/0957c952fe7116e460da23ee1dfe02045a4cbda1.png",
    specialty: "Resource Development",
    founded: "2025",
    featured: true,
    tags: ["Resources", "Custom Solutions", "Development"]
  },
  {
    id: 1,
    name: "IC3D MARKETPLACE",
    description: "Specializing in FiveM resource development and custom server solutions.",
    website: "https://ic3d-marketplace.tebex.io/",
    image: "https://i.ibb.co/Y44778WM/LOGO-IC3-D-Marketplace-2000x2000-Transparente-by-Design-Ideal-Copy.png",
    specialty: "Resource Development",
    founded: "2020",
    featured: true,
    tags: ["Resources", "Custom Solutions", "Development"]
  },
   {
     id: 2,
     name: "Uniqers Scripts",
     description: "We, as Uniqers Scripts, are dedicated to delivering high-quality and affordable FiveM scripts to the community.",
     website: "https://uniqers-scripts.tebex.io/",
     image: "https://dunb17ur4ymx4.cloudfront.net/webstore/logos/9312b8d8655fb1abc0d1adfe148ca0e081134c99.png",
     specialty: "Script Development",
     founded: "2022",
     featured: true,
     tags: ["Scripts", "RP Focused", "Hardcore"]
   },
  {
    id: 3,
    name: "Pegasus Anticheat",
    description: "A privacy-focused AntiCheat solution for FiveM servers.",
    website: "https://pegasusac.tebex.io/",
    image: "https://dunb17ur4ymx4.cloudfront.net/webstore/logos/1c502ec0d63eb6158e7e467b165f243c9d2ab9d0.png",
    specialty: "Anticheat Development",
    founded: "2023",
    featured: true,
    tags: ["Fivem", "Anticheat"]
  },
  {
    id: 4, // Dont change this
    name: "BOII Development",
    description: "The epi-centre of top tier source-available resources!",
    website: "https://boiidevelopment.tebex.io",
    image: "https://i.ibb.co/Myx615bZ/BG-LOGO-7.jpg",
    specialty: "Resource Development",
    founded: "23/03/2021",
    featured: true,
    tags: ["Source Available","Resources","Development"]
  },
  {
    id: 5, // Dont change this
    name: "Revel Scripts",
    description: "At Revel Scripts, our goal is to deliver exactly what the community is looking for: efficient, easy-to-use, and polished scripts that solve real problems or improve gameplay. We always aim to listen to player feedback and transform their ideas into high-quality solutions.",
    website: "https://revel.tebex.io/",
    image: "https://dunb17ur4ymx4.cloudfront.net/webstore/logos/f659c805399b4ae3170baa6d281c5208ca1e1553.png",
    specialty: "Resource Development",
    founded: "2025",
    featured: true,
    tags: ["Source Available","Resources","Development"]
  },
    {
    id: 6,
    name: "Evolent",
    description: "We love making cool stuff for FiveM",
    website: "https://evolent.dev",
    image: "https://i.ibb.co/nZ3s56g/Frame-1.png",
    specialty: "FiveM Resources",
    founded: "2023.11.30",
    featured: true, // IGNORE THIS
    tags: ["Advanced FiveM Scripts", "FiveM Development", "FiveM Scripts"]
  },
  {
  id: 7,
  name: "CodeForge",
  description: "Professional FiveM scripts with modern UI, optimized performance, and full framework compatibility.",
  website: "https://codeforge.tebex.io/",
  image: "https://cdn.laurelnwk.com/Uploads/codeforge.png", 
  specialty: "High-quality scripts with sleek interfaces",
  founded: "2022",
  featured: true, 
  tags: ["CUSTOM SCRIPTS", "UI DESIGN", "MODERN UX", "ROLEPLAY", "JOB SYSTEMS", "ESX", "QB", "QBOX"]
},
{
    id: 8,
    name: "Luxu",
    description: "Sleek And Modern Scripts",
    website: "https://luxu.gg",
    image: "https://cdn.laurelnwk.com/VelocityDriftNetwork/luxu2.png", 
    specialty: "Admin Tooling", 
    founded: "2023",
    featured: true, 
    tags: ["Admin", "Crypto", "Bitcoin", "UI"] 
  },
  {
    id: 9,
    name: "Big Bang Scripts",
    description: "Premium scripts and 3D models, built by the best developers & designers",
    website: "https://big-bang-scripts.tebex.io",
    image: "https://cdn.laurelnwk.com/VelocityDriftNetwork/BBS.png", // IF YOU DONT OWN A CDN WE CAN COVER THIS IMAGE LINK (DO NOT USE A DISCORD IMAGE LINK!!)
    specialty: "Scripts & Models", // WHAT YOUR STORE DOSE
    founded: "May 2025",
    featured: true, // IGNORE THIS
    tags: ["YOUR", "TAGES", "HERE"] // CUSTOM CREATORS TAGS CAN BE HERE LIKE "CUSTOM SCRIPTS", "CUSTOM MLO" ETC, ETC
  },
   {
    id: 10,
    name: "UZ Scripts",
    description: "High quality scripts with exceptional performance, cutting edge features and sleek designs for roleplay servers",
    website: "https://uzscripts.com/scripts",
    image: "https://cdn.laurelnwk.com/VelocityDriftNetwork/UZlogo.png", // IF YOU DONT OWN A CDN WE CAN COVER THIS IMAGE LINK
    specialty: "FiveM Scripts", // WHAT YOUR STORE DOSE
    founded: "22/07/2022",
    featured: true, // IGNORE THIS
    tags: ["Reliable", "Performance", "Quality"] // CUSTOM CREATORS TAGS CAN BE HERE LIKE "CUSTOM SCRIPTS", "CUSTOM MLO" ETC, ETC
  },
];


const CreatorPartners = () => {
  const [selectedCreator, setSelectedCreator] = useState(CREATORS_DATA[0]);
  
  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-grow pt-8 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-display mb-6 text-gradient animate-fade-in">
              Creator <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Partners</span>
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
              We collaborate with the best creators in the FiveM ecosystem to bring
              transparency, innovation, and community-driven development.
            </p>
            <div className="flex justify-center gap-4 mb-12">
              <Badge variant="outline" className="text-blue-400 border-blue-400/50">
                <Award className="w-4 h-4 mr-2" />
                Verified Partners
              </Badge>
              <Badge variant="outline" className="text-purple-400 border-purple-400/50">
                <Globe className="w-4 h-4 mr-2" />
                Global Reach
              </Badge>
            </div>
          </div>

          {/* Creator Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
            {CREATORS_DATA.map((creator, index) => (
              <Card 
                key={creator.id} 
                className={`glass-card border-0 overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in ${
                  selectedCreator.id === creator.id ? 'ring-2 ring-blue-500/50' : ''
                }`}
                style={{animationDelay: `${index * 150}ms`}}
                onClick={() => setSelectedCreator(creator)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={creator.image} 
                    alt={creator.name} 
                    className="w-full aspect-square object-cover"
                  />
                  {creator.featured && (
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500">
                      Featured Partner
                    </Badge>
                  )}
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl font-display text-white">{creator.name}</CardTitle>
                  <CardDescription className="text-white/70">{creator.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center text-sm text-white/60">
                      <Award className="w-4 h-4 mr-1" />
                      {creator.specialty}
                    </div>
                    <div className="flex items-center text-sm text-white/60">
                      <Calendar className="w-4 h-4 mr-1" />
                      Since {creator.founded}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {creator.tags.map(tag => (
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
                    <a href={creator.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      Visit Store
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Featured Creator Showcase */}
          <div className="mb-16">
            <Card className="glass-card border-0 overflow-hidden animate-fade-in" style={{animationDelay: '300ms'}}>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-display text-white mb-2">
                  Featured Creator Spotlight
                </CardTitle>
                <CardDescription className="text-white/70">
                  Explore {selectedCreator.name}'s store and discover their latest offerings
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Creator Info */}
                  <div className="lg:col-span-1 space-y-6">
                    <div className="text-center">
                      <img 
                        src={selectedCreator.image} 
                        alt={selectedCreator.name} 
                        className="w-32 h-32 object-cover rounded-full mx-auto mb-4 ring-4 ring-white/10"
                      />
                      <h3 className="text-xl font-display text-white">{selectedCreator.name}</h3>
                      <p className="text-white/70 text-sm">{selectedCreator.description}</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-white/5 rounded-lg">
                        <div className="text-sm text-white/50">Specialty</div>
                        <div className="font-medium text-white">{selectedCreator.specialty}</div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <div className="text-sm text-white/50">Established</div>
                        <div className="font-medium text-white">{selectedCreator.founded}</div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <div className="text-sm text-white/50 mb-2">Specialties</div>
                        <div className="flex flex-wrap gap-1">
                          {selectedCreator.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Website Preview */}
                  <div className="lg:col-span-2">
                    <div className="rounded-lg overflow-hidden border border-white/10 bg-black/30">
                      <div className="bg-white/5 px-4 py-2 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="text-xs text-white/50 ml-2">{selectedCreator.website}</div>
                        </div>
                      </div>
                      <AspectRatio ratio={16/10}>
                        <iframe 
                          src={selectedCreator.website} 
                          title={`${selectedCreator.name} website`} 
                          className="w-full h-full" 
                          sandbox="allow-same-origin allow-scripts"
                        />
                      </AspectRatio>
                    </div>
                    
                    <div className="mt-4 flex justify-center">
                      <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600" asChild>
                        <a href={selectedCreator.website} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Visit {selectedCreator.name}
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {/* <Footer /> */}
    </div>
  );
};

export default CreatorPartners;
