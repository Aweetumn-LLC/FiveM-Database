import { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star, TrendingUp, Calendar } from "lucide-react";
import Header from "@/components/Header";

const RECOMMENDED_CREATORS_DATA = [
  {
    id: 1,
    name: "RTX Development",
    description: "High-quality scripts and resources with exceptional performance optimization.",
    website: "https://rtx.tebex.io/",
    image: "https://cdn.laurelnwk.com/image_2025-05-24_163304781.png",
    specialty: "Resource Development",
    founded: "31-10-2019",
    tags: ["Performance", "Quality", "Optimized"]
  },
  {
    id: 2,
    name: "Dynyx Scripts",
    description: "Innovative scripting solutions with cutting-edge features for roleplay servers.",
    website: "https://www.dynyxscripts.com/category/2215578",
    image: "https://dunb17ur4ymx4.cloudfront.net/webstore/logos/558a2424dfac63bd9c53711157728cce3e93d84b.png",
    specialty: "Resource Development",
    founded: "2021",
    tags: ["Innovation", "Features"]
  },
  {
    id: 3,
    name: "MRC",
    description: "Reliable and robust FiveM resources with comprehensive documentation and support.",
    website: "https://mrcscripts.tebex.io/",
    image: "https://dunb17ur4ymx4.cloudfront.net/webstore/logos/d227cf4764797085db757a3df0aa820f14a120d9.png",
    specialty: "Resource Development",
    founded: "2020",
    tags: ["Reliable", "Support", "Documentation"]
  },
  {
    id: 4,
    name: "RAINMAD Scripts",
    description: "Rainmad is an Innovative Resources creator with a Wide selection of resources that you can find!",
    website: "https://store.rainmad.com/",
    image: "https://dunb17ur4ymx4.cloudfront.net/webstore/logos/eaeafef0c28a1dc1a2f3be1eafdcaaf9e12953ad.png",
    specialty: "Resource Development",
    founded: "2021",
    tags: ["Performance", "Quality", "Optimized"]
  },
  {
    id: 5,
    name: "JG Scripts",
    description: "JG Scripts is a Creative Script creator on the FiveM Platform.",
    website: "https://jgscripts.com/",
    image: "https://jgscripts.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fjg-scripts-logo.4d8a9a1c.png&w=3840&q=75",
    specialty: "Resource Development",
    founded: "",
    tags: ["Reliable", "Support", "Documentation"]
  },
  {
    id: 6,
    name: "Quasar",
    description: "Premium FiveM resources and comprehensive development solutions for modern servers.",
    website: "https://www.quasar-store.com/",
    image: "https://cdn.laurelnwk.com/image_2025-05-24_163358243.png",
    specialty: "Resource Development",
    founded: "2020",
    tags: ["Premium", "Resources", "Modern"]
  },
  {
    id: 6,
    name: "Wix Development",
    description: "Wix Development",
    website: "https://wix-development.tebex.io/",
    image: "https://media.discordapp.net/attachments/1374086521694720142/1381330258887835658/logo.png?ex=684d0e4d&is=684bbccd&hm=5418fe696e1a75f93a0c7094a7d7caf0c84124b4342556d23171baab07e043a3&=&format=webp&quality=lossless&width=884&height=884",
    specialty: "Resource Development",
    founded: "2023",
    tags: ["Premium", "Resources", "Modern"]
  },
];

const RecommendedCreators = () => {
  const [selectedCreator, setSelectedCreator] = useState(RECOMMENDED_CREATORS_DATA[0]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-display mb-6 text-gradient animate-fade-in">
              Recommended <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Creators</span>
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
              Discover the creators we recommend for quality FiveM resources and scripts
              in the ecosystem. Each creator has been vetted for quality and reliability.
            </p>
            <div className="flex justify-center gap-4 mb-12">
              <Badge variant="outline" className="text-green-400 border-green-400/50">
                <Star className="w-4 h-4 mr-2" />
                Community Approved
              </Badge>
              <Badge variant="outline" className="text-blue-400 border-blue-400/50">
                <TrendingUp className="w-4 h-4 mr-2" />
                Top Rated
              </Badge>
            </div>
          </div>

          {/* Creators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
            {RECOMMENDED_CREATORS_DATA.map((creator, index) => (
              <Card 
                key={creator.id} 
                className={`glass-card border-0 overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in group ${
                  selectedCreator.id === creator.id ? 'ring-2 ring-green-500/50' : ''
                }`}
                style={{animationDelay: `${index * 100}ms`}}
                onClick={() => setSelectedCreator(creator)}
              >
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={creator.image} 
                    alt={creator.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-display text-white">{creator.name}</CardTitle>
                  <CardDescription className="text-white/70 text-sm line-clamp-2">
                    {creator.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-center mb-3">
                    <div className="flex items-center text-xs text-white/60">
                      <Calendar className="w-3 h-3 mr-1" />
                      Since {creator.founded}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {creator.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full flex items-center gap-2 hover:bg-white/10" 
                    asChild
                  >
                    <a href={creator.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3" />
                      Visit Store
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Featured Creator Showcase */}
          <div className="mb-16">
            <Card className="glass-card border-0 overflow-hidden animate-fade-in" style={{animationDelay: '400ms'}}>
              <CardHeader className="text-center border-b border-white/10">
                <CardTitle className="text-3xl font-display text-white mb-2">
                  Creator Spotlight
                </CardTitle>
                <CardDescription className="text-white/70 text-lg">
                  Featured: {selectedCreator.name}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  {/* Creator Stats */}
                  <div className="lg:col-span-1 space-y-6">
                    <div className="text-center">
                      <img 
                        src={selectedCreator.image} 
                        alt={selectedCreator.name} 
                        className="w-24 h-24 object-cover rounded-full mx-auto mb-4 ring-4 ring-white/10"
                      />
                      <h3 className="text-xl font-display text-white mb-2">{selectedCreator.name}</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-3 bg-white/5 rounded-lg text-center">
                        <div className="text-lg font-medium text-white">{selectedCreator.founded}</div>
                        <div className="text-sm text-white/50">Founded</div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg">
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
                  <div className="lg:col-span-3">
                    <div className="mb-4">
                      <h4 className="text-lg font-display text-white mb-2">Store Preview</h4>
                      <p className="text-white/70 text-sm">{selectedCreator.description}</p>
                    </div>
                    
                    <div className="rounded-lg overflow-hidden border border-white/10 bg-black/30 mb-4">
                      <div className="bg-white/5 px-4 py-3 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="flex gap-1">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="text-sm text-white/70 bg-white/10 px-3 py-1 rounded-full">
                            {selectedCreator.website}
                          </div>
                        </div>
                      </div>
                      <AspectRatio ratio={16/9}>
                        <iframe 
                          src={selectedCreator.website} 
                          title={`${selectedCreator.name} website`} 
                          className="w-full h-full" 
                          sandbox="allow-same-origin allow-scripts"
                        />
                      </AspectRatio>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600" asChild>
                        <a href={selectedCreator.website} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Explore {selectedCreator.name}'s Store
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

export default RecommendedCreators;
