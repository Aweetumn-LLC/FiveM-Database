import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Server, Globe, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet";

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

const PartneredHosting = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHostingPartners = async () => {
      try {
        const { data, error } = await supabase
          .from('partners')
          .select('*')
          .eq('partner_type', 'hosting')
          .order('display_order', { ascending: true });

        if (error) throw error;
        setPartners(data || []);
      } catch (error) {
        console.error('Error loading hosting partners:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHostingPartners();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Helmet>
        <title>FiveM Partnered Hosting | FiveM DB</title>
        <meta name="description" content="Trusted FiveM server hosting partners recommended by FiveM DB for reliability and performance." />
        <link rel="canonical" href="https://fivemdb.online/partnered-hosting" />
      </Helmet>
      <main className="flex-1 flex flex-col items-center">
        <div className="animate-fade-in container max-w-7xl px-8 py-24">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-12 leading-tight">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Velocity Network</span> Hosting Partners
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover reliable hosting providers that Velocity Network partners with to ensure 
              your FiveM server runs smoothly with optimal performance.
            </p>
            <div className="flex justify-center gap-4 mb-12">
              <Badge variant="outline" className="border-primary/30 bg-primary/10">
                <Server className="w-4 h-4 mr-2" />
                Verified Hosting
              </Badge>
              <Badge variant="outline" className="border-accent/30 bg-accent/10">
                <Award className="w-4 h-4 mr-2" />
                Trusted Partners
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
            {partners.map((partner, index) => (
              <Card 
                key={partner.id} 
                className="bg-card/50 backdrop-blur-xl border-border/50 hover:bg-card/70 hover:border-primary/30 transition-all duration-500 rounded-2xl overflow-hidden hover:scale-105 animate-fade-in"
                style={{animationDelay: `${index * 150}ms`}}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={partner.logo_url || "/placeholder.svg"} 
                    alt={partner.name} 
                    className="w-full aspect-square object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500">
                    Hosting Partner
                  </Badge>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-foreground">{partner.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">{partner.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(partner.metadata?.tags || []).map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center gap-2 hover:bg-primary/10 hover:border-primary/50" 
                    asChild
                  >
                    <a href={partner.website_url || "#"} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      View Hosting
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {partners.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No hosting partners found.
            </div>
          )}

          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Interested in becoming a hosting partner?
            </p>
            <a href="https://forms.gle/7uGS2qFwFZJgeRrA8"><Button variant="outline" className="hover:bg-primary/10 hover:border-primary/50">
              <Globe className="w-4 h-4 mr-2" />
              Contact Us
            </Button></a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PartneredHosting;