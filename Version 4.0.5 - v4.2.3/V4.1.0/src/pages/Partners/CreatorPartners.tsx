import { useState, useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star, TrendingUp, Calendar, Award, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet";
import { Separator } from "@/components/ui/separator";

interface Partner {
  id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  website_url: string | null;
  partner_type: string;
  featured: boolean;
  display_order: number;
  metadata: any;
}

const CreatorPartners = () => {
  const [creatorPartners, setCreatorPartners] = useState<Partner[]>([]);
  const [recommendedCreators, setRecommendedCreators] = useState<Partner[]>([]);
  const [selectedCreator, setSelectedCreator] = useState<Partner | null>(null);
  const [activeTab, setActiveTab] = useState<'creators' | 'recommended'>('creators');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPartners = async () => {
      try {
        // Load both creator partners and recommended creators
        const [creatorsResponse, recommendedResponse] = await Promise.all([
          supabase
            .from('partners')
            .select('*')
            .eq('partner_type', 'creator')
            .order('display_order', { ascending: true }),
          supabase
            .from('partners')
            .select('*')
            .eq('partner_type', 'recommended')
            .order('display_order', { ascending: true })
        ]);

        if (creatorsResponse.error) throw creatorsResponse.error;
        if (recommendedResponse.error) throw recommendedResponse.error;

        setCreatorPartners(creatorsResponse.data || []);
        setRecommendedCreators(recommendedResponse.data || []);
        
        // Set default selected creator
        if (creatorsResponse.data && creatorsResponse.data.length > 0) {
          setSelectedCreator(creatorsResponse.data[0]);
        }
      } catch (error) {
        console.error('Error loading partners:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPartners();
  }, []);

  const currentCreators = activeTab === 'creators' ? creatorPartners : recommendedCreators;

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>FiveM Database - Creator Partners & Recommended Creators</title>
        <meta name="description" content="Explore FiveM Database creator partners and recommended creators: BSD, IC3D, REFLOW, Codeforge, UZ Store, Luxu, and more. Trusted FiveM creators bringing premium scripts, models, and resources to the community." />
        <link rel="canonical" href="https://fivemdb.net/creator-partners" />
        <meta property="og:title" content="FiveM Database - Creator Partners & Recommended Creators" />
        <meta property="og:description" content="Explore FiveM Database creator partners and recommended creators: BSD, IC3D, REFLOW, Codeforge, UZ Store, Luxu, and more. Trusted FiveM creators bringing premium scripts, models, and resources to the community." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fivemdb.net/creator-partners" />
        <meta property="og:image" content="https://cdn.nexoradata.ltd/5DB/Data/5DBEmbed.png" />
        <meta name="robots" content="index,follow" />
      </Helmet>
      
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

            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="glass-card rounded-full p-2 flex gap-2">
                <button
                  onClick={() => {
                    setActiveTab('creators');
                    setSelectedCreator(creatorPartners[0] || null);
                  }}
                  className={`px-6 py-3 rounded-full transition-all duration-300 ${
                    activeTab === 'creators'
                      ? 'bg-blue-500 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Creator Partners
                </button>
                <button
                  onClick={() => {
                    setActiveTab('recommended');
                    setSelectedCreator(recommendedCreators[0] || null);
                  }}
                  className={`px-6 py-3 rounded-full transition-all duration-300 ${
                    activeTab === 'recommended'
                      ? 'bg-green-500 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Recommended Creators
                </button>
              </div>
            </div>
          </div>

          {/* Creator Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
            {currentCreators.map((creator, index) => (
              <Card 
                key={creator.id} 
                className={`glass-card border-0 overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in ${
                  selectedCreator?.id === creator.id ? 
                    `ring-2 ${activeTab === 'creators' ? 'ring-blue-500/50' : 'ring-green-500/50'}` : ''
                }`}
                style={{animationDelay: `${index * 150}ms`}}
                onClick={() => setSelectedCreator(creator)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={creator.logo_url || "/placeholder.svg"} 
                    alt={creator.name} 
                    className="w-full aspect-square object-cover"
                  />
                  {creator.featured && (
                    <Badge className={`absolute top-4 right-4 ${
                      activeTab === 'creators' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                        : 'bg-gradient-to-r from-green-500 to-emerald-500'
                    }`}>
                      {activeTab === 'creators' ? 'Featured Partner' : 'Top Pick'}
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
                      {creator.metadata?.specialty || 'Resource Development'}
                    </div>
                    <div className="flex items-center text-sm text-white/60">
                      <Calendar className="w-4 h-4 mr-1" />
                      Since {creator.metadata?.founded || 'N/A'}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(creator.metadata?.tags || []).map((tag: string) => (
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
                    <a href={creator.website_url || "#"} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      Visit Store
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Featured Creator Showcase */}
          {selectedCreator && (
            <div className="mb-16">
              <Card className="glass-card border-0 overflow-hidden animate-fade-in" style={{animationDelay: '300ms'}}>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-display text-white mb-2">
                    {activeTab === 'creators' ? 'Featured Creator Partner' : 'Recommended Creator'} Spotlight
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
                        src={selectedCreator.logo_url || "/placeholder.svg"} 
                        alt={selectedCreator.name} 
                        className="w-32 h-32 object-cover rounded-full mx-auto mb-4 ring-4 ring-white/10"
                      />
                      <h3 className="text-xl font-display text-white">{selectedCreator.name}</h3>
                      <p className="text-white/70 text-sm">{selectedCreator.description}</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-white/5 rounded-lg">
                        <div className="text-sm text-white/50">Specialty</div>
                        <div className="font-medium text-white">{selectedCreator.metadata?.specialty || 'Resource Development'}</div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <div className="text-sm text-white/50">Established</div>
                        <div className="font-medium text-white">{selectedCreator.metadata?.founded || 'N/A'}</div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <div className="text-sm text-white/50 mb-2">Specialties</div>
                        <div className="flex flex-wrap gap-1">
                          {(selectedCreator.metadata?.tags || []).map((tag: string) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                       <div className="mt-4 flex justify-center">
                    <Button className={`${
                      activeTab === 'creators' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                        : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                    }`} asChild>
                      <a href={selectedCreator.website_url || "#"} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit {selectedCreator.name}
                      </a>
                    </Button>
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
                        <div className="text-xs text-white/50 ml-2">{selectedCreator.website_url}</div>
                      </div>
                    </div>
                    <AspectRatio ratio={16/10}>
                      <embed 
                        src={selectedCreator.website_url || "#"} 
                        title={`${selectedCreator.name} website`} 
                        className="w-full h-full rounded-lg" 
                        type="text/html"
                      />
                    </AspectRatio>
                  </div>
                  
                 
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CreatorPartners;
