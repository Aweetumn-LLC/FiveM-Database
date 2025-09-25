import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";

interface Contributor {
  id: string;
  discord_id: string;
  username: string | null;
  global_name: string | null;
  avatar_url: string | null;
  manual_info: string | null;
  blacklist_count: number;
}

const DISCORD_IDS = [
  "406719326419288066",
  "569117369482608640",
  "1320215445768372366",
  "519614821193220116",
  "107372998016663552",
  "216621792276643843",
  "646794962767446026",
  "612251928801312779",
  "807792137403236363",
  "405738761041870869",
  "424921782454190085",
  "1011390148447060049",
  "771326822557417492",
  "681319165725900882",
];

export default function VolunteerContributors() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);

  const ids = useMemo(() => DISCORD_IDS, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // First try to read what's already cached
        const { data: existing, error } = await supabase
          .from("contributors")
          .select("id,discord_id,username,global_name,avatar_url,manual_info,blacklist_count")
          .in("discord_id", ids)
          .order("blacklist_count", { ascending: false });
        if (error) throw error;

        if ((existing?.length || 0) < ids.length && !localStorage.getItem("contributors_synced_v1")) {
          // Sync missing ones from Discord and cache in DB
          const { error: fnError } = await supabase.functions.invoke("sync-contributors", {
            body: { ids },
          });
          if (fnError) throw fnError;
          localStorage.setItem("contributors_synced_v1", "1");

          // Re-fetch
          const { data: refreshed, error: refErr } = await supabase
            .from("contributors")
            .select("id,discord_id,username,global_name,avatar_url,manual_info,blacklist_count")
            .in("discord_id", ids)
            .order("blacklist_count", { ascending: false });
          if (refErr) throw refErr;
          setContributors((refreshed || []).map(c => ({ ...c, blacklist_count: parseInt(c.blacklist_count) || 0 })));
        } else {
          setContributors((existing || []).map(c => ({ ...c, blacklist_count: parseInt(c.blacklist_count) || 0 })));
        }
      } catch (e: any) {
        console.error("Error loading contributors", e);
        toast.error(e?.message || "Unable to load contributors");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [ids]);

  if (loading) {
    return <div className="text-white/70">Loading volunteers…</div>;
  }

  if (!contributors.length) {
    return <div className="text-white/60">No volunteers to display yet.</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {contributors.map((c) => (
        <Card key={c.id || c.discord_id} className="glass-card hover:scale-105 transition-transform">
          <CardContent className="p-4 flex flex-col items-center text-center gap-3">
            <Avatar className="h-14 w-14">
              <AvatarImage src={c.avatar_url || "/placeholder.svg"} alt={(c.global_name || c.username || "Contributor") + " avatar"} />
              <AvatarFallback>{(c.global_name || c.username || "?").slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium">
              {c.global_name || c.username || `#${c.discord_id}`}
            </div>
            {c.manual_info && (
              <div className="text-xs text-white/70 line-clamp-2">{c.manual_info}</div>
            )}
            <Badge variant="outline" className="text-xs">Blacklists: {c.blacklist_count ?? 0}</Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
