import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ContributorInlineProps {
  discordId: string;
  fallbackName?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function ContributorInline({
  discordId,
  fallbackName = "Contributor",
  className,
  size = "md",
}: ContributorInlineProps) {
  const [name, setName] = useState<string>(fallbackName);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchContributor = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("contributors")
          .select("global_name,username,avatar_url,discord_id")
          .eq("discord_id", discordId)
          .limit(1)
          .maybeSingle();

        if (error) throw error;

        if (!data) {
          const lsKey = `contributors_synced_${discordId}`;
          if (!localStorage.getItem(lsKey)) {
            // Sync from edge function once, then cache flag
            await supabase.functions.invoke("sync-contributors", {
              body: { ids: [discordId] },
            });
            localStorage.setItem(lsKey, "1");

            const { data: refreshed } = await supabase
              .from("contributors")
              .select("global_name,username,avatar_url,discord_id")
              .eq("discord_id", discordId)
              .limit(1)
              .maybeSingle();
            if (isMounted && refreshed) {
              setName(refreshed.global_name || refreshed.username || fallbackName);
              setAvatarUrl(refreshed.avatar_url || null);
            }
          }
        } else if (isMounted) {
          setName(data.global_name || data.username || fallbackName);
          setAvatarUrl(data.avatar_url || null);
        }
      } catch (e) {
        // Silent fail to avoid noisy UI; fallback name is used
        console.error("ContributorInline error", e);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchContributor();
    return () => {
      isMounted = false;
    };
  }, [discordId, fallbackName]);

  const sizeClasses =
    size === "sm"
      ? { avatar: "h-8 w-8", name: "text-sm" }
      : size === "lg"
      ? { avatar: "h-14 w-14", name: "text-lg" }
      : { avatar: "h-10 w-10", name: "text-base" };

  const initials = (name || fallbackName).slice(0, 2).toUpperCase();

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Avatar className={sizeClasses.avatar}>
        <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={`${name} avatar`} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className={cn("font-medium", sizeClasses.name)}>
        {loading ? <span className="text-white/60">Loading…</span> : name}
      </div>
    </div>
  );
}
