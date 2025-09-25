
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Creator {
  id: string;
  name: string;
  image_url: string;
  display_order: number;
}

const CreatorCarousel = () => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [duplicatedCreators, setDuplicatedCreators] = useState<Creator[]>([]);

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    try {
      const { data, error } = await supabase
        .from('featured_creators')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      
      if (data && data.length > 0) {
        setCreators(data);
        // Create multiple copies for seamless infinite scroll
        const duplicated = [
          ...data,
          ...data,
          ...data,
          ...data
        ];
        setDuplicatedCreators(duplicated);
      }
    } catch (error) {
      console.error('Error fetching featured creators:', error);
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="relative">
        {/* Gradient overlays for smooth edges */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <div 
          className="flex will-change-transform"
          style={{
            animation: 'scroll-infinite 80s linear infinite'
          }}
        >
          {duplicatedCreators.map((creator, index) => (
            <div
              key={`${creator.id}-${index}`}
              className="flex-shrink-0 w-80 mx-4 glass-card rounded-2xl p-6 hover:scale-105 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-primary/10 flex-shrink-0 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                  <img 
                    src={creator.image_url} 
                    alt={creator.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/64x64/333/fff?text=?";
                    }}
                  />
                </div>
                <div className="text-left min-w-0 flex-1">
                  <div className="text-foreground font-semibold text-lg truncate group-hover:text-primary transition-colors duration-300">
                    {creator.name}
                  </div>
                  <div className="text-muted-foreground text-sm mt-1 flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-ring" />
                    Verified Partner
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${creators.length * 352}px);
          }
        }
      `}</style>
    </div>
  );
};

export default CreatorCarousel;
