import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export default function WebsiteSettings(){
  const [maintenance, setMaintenance] = useState(false);
  const [rateLimit, setRateLimit] = useState<number>(5);
  const [siteClosed, setSiteClosed] = useState(false);
  const [siteName, setSiteName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(()=>{
    const load = async () => {
      const { data: m } = await supabase.from('website_settings').select('*').eq('setting_key','maintenance_mode').maybeSingle();
      if (m) setMaintenance(m.setting_value === true || m.setting_value === 'true');
      const { data: r } = await supabase.from('website_settings').select('*').eq('setting_key','global_tool_rate_limit_per_min').maybeSingle();
      if (r && typeof r.setting_value === 'number') setRateLimit(r.setting_value);
      const { data: c } = await supabase.from('website_settings').select('*').eq('setting_key','site_closed_mode').maybeSingle();
      if (c) setSiteClosed(c.setting_value === true || c.setting_value === 'true');

      const { data: n } = await supabase.from('website_settings').select('*').eq('setting_key','site_name').maybeSingle();
      if (n && typeof n.setting_value === 'string') setSiteName(n.setting_value);
      const { data: l } = await supabase.from('website_settings').select('*').eq('setting_key','logo_url').maybeSingle();
      if (l && typeof l.setting_value === 'string') setLogoUrl(l.setting_value);
      const { data: e } = await supabase.from('website_settings').select('*').eq('setting_key','contact_email').maybeSingle();
      if (e && typeof e.setting_value === 'string') setContactEmail(e.setting_value);
    };
    load();
  },[]);

  const upsertSetting = async (key:string, value:any) => {
    const { data: existing } = await supabase.from('website_settings').select('*').eq('setting_key', key).maybeSingle();
    if (existing) {
      return supabase.from('website_settings').update({ setting_value: value }).eq('id', existing.id);
    } else {
      return supabase.from('website_settings').insert({ setting_key: key, setting_value: value });
    }
  };

  const save = async () => {
    try {
      setSaving(true);
      const r1 = await upsertSetting('maintenance_mode', maintenance); if (r1.error) throw r1.error;
      const r2 = await upsertSetting('global_tool_rate_limit_per_min', rateLimit); if (r2.error) throw r2.error;
      const r3 = await upsertSetting('site_closed_mode', siteClosed); if (r3.error) throw r3.error;
      const r4 = await upsertSetting('site_name', siteName); if (r4.error) throw r4.error;
      const r5 = await upsertSetting('logo_url', logoUrl); if (r5.error) throw r5.error;
      const r6 = await upsertSetting('contact_email', contactEmail); if (r6.error) throw r6.error;
      toast.success('Settings saved');
    } catch(e:any){
      toast.error(e.message || 'Failed to save settings');
    } finally { setSaving(false); }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <Helmet>
        <title>Website Settings | FiveM DB</title>
        <meta name="description" content="Manage site identity, maintenance mode, and rate limits." />
        <link rel="canonical" href={`${window.location.origin}/Maintainer/settings`} />
      </Helmet>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Site Identity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Site name</Label>
              <Input value={siteName} onChange={(e)=> setSiteName(e.target.value)} placeholder="FiveM DB" />
            </div>
            <div>
              <Label>Logo URL</Label>
              <Input value={logoUrl} onChange={(e)=> setLogoUrl(e.target.value)} placeholder="https://…/logo.png" />
            </div>
            <div>
              <Label>Contact email</Label>
              <Input value={contactEmail} onChange={(e)=> setContactEmail(e.target.value)} placeholder="support@example.com" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Behavior</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Enable Maintenance Mode</div>
                <div className="text-sm text-muted-foreground">Temporarily put the site under maintenance</div>
              </div>
              <Switch checked={maintenance} onCheckedChange={setMaintenance} />
            </div>

            <div>
              <Label>Global Tool use per minute per session</Label>
              <Input type="number" min={1} value={rateLimit} onChange={(e)=> setRateLimit(parseInt(e.target.value || '5',10))} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Website Closed Mode</div>
                <div className="text-sm text-muted-foreground">Lock the entire website until manually reopened</div>
              </div>
              <Switch checked={siteClosed} onCheckedChange={setSiteClosed} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={save} disabled={saving}>{saving? 'Saving…':'Save Settings'}</Button>
      </div>
    </div>
  );
}
