import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Code, Zap, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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

const PartneredFrameworks = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFrameworkPartners = async () => {
      try {
        const { data, error } = await supabase
          .from('partners')
          .select('*')
          .eq('partner_type', 'framework')
          .order('display_order', { ascending: true });

        if (error) throw error;
        setPartners(data || []);
      } catch (error) {
        console.error('Error loading framework partners:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFrameworkPartners();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  }
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-1 flex flex-col items-center">
        <div className="animate-fade-in container max-w-7xl px-8 py-24">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-light mb-12 leading-tight">
              <span className="text-gradient font-semibold">Partnered</span> Frameworks
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
              Explore the frameworks we collaborate with to provide robust 
              and reliable foundations for your FiveM server development.
            </p>
            <div className="flex justify-center gap-4 mb-12">
              <Badge variant="outline" className="text-blue-400 border-blue-400/50">
                <Code className="w-4 h-4 mr-2" />
                Verified Frameworks
              </Badge>
              <Badge variant="outline" className="text-purple-400 border-purple-400/50">
                <Zap className="w-4 h-4 mr-2" />
                High Performance
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
            {partners.map((partner, index) => (
              <Card 
                key={partner.id} 
                className="glass-card border-0 overflow-hidden transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{animationDelay: `${index * 150}ms`}}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={partner.logo_url || "/placeholder.svg"} 
                    alt={partner.name} 
                    className="w-full aspect-square object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500">
                    Framework Partner
                  </Badge>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl font-display text-white">{partner.name}</CardTitle>
                  <CardDescription className="text-white/70">{partner.description}</CardDescription>
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
                    className="w-full flex items-center gap-2 hover:bg-white/10" 
                    asChild
                  >
                    <a href={partner.website_url || "#"} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      View Framework
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {partners.length === 0 && (
            <div className="text-center py-8 text-white/60">
              No framework partners found.
            </div>
          )}

          <div className="text-center">
            <p className="text-white/70 mb-4">
              Want to partner with us for your framework?
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

export default PartneredFrameworks;