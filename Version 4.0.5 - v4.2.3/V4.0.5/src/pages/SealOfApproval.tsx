import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Shield } from 'lucide-react';
import soaIcon from '@/assets/soa.png';

interface SealOfApprovalData {
  creator_name: string;
  approver_name: string;
  created_at: string;
}

export default function SealOfApproval() {
  const { creator_name } = useParams<{ creator_name: string }>();
  const [sealData, setSealData] = useState<SealOfApprovalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!creator_name) return;

    const fetchSealData = async () => {
      try {
        const { data, error } = await supabase
          .from('seal_of_approval')
          .select('creator_name, approver_name, created_at')
          .eq('creator_name', creator_name)
          .maybeSingle();

        if (error) {
          console.error('Error fetching seal data:', error);
          setError('Failed to load seal of approval data');
          return;
        }

        if (!data) {
          setError('No seal of approval found for this creator');
          return;
        }

        setSealData(data);
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSealData();
  }, [creator_name]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Loading seal of approval...</p>
        </div>
      </div>
    );
  }

  if (error || !sealData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Not Found</h1>
            <p className="text-muted-foreground">
              {error || 'No seal of approval found for this creator'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-52 h-52 bg-primary/10 rounded-full flex items-center justify-center mr-4">
              <img src={soaIcon} alt="Seal of Approval" className="w-48 h-48" />
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2 bg-primary/5 border-primary/20">
              Verified Creator
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            {sealData.creator_name.toUpperCase()}
          </h1>
        </div>

        {/* Main Content */}
        <Card className="mb-8">
          <CardContent className="p-8 space-y-6">
            <div className="text-center space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">{sealData.creator_name}</span> has been awarded the Creator Seal of Approval from FiveM Database. 
                This is a sign that you can trust this creator for being a legit and trustworthy creator.
              </p>
              
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>Seal of approval assigned by <span className="font-medium text-foreground">{sealData.approver_name}</span></span>
              </div>
            </div>

            <Separator />

            <div className="bg-muted/30 rounded-lg p-6">
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                I, <span className="font-medium text-foreground">{sealData.approver_name}</span>, hereby certify that all of the resources on this store are officially their own work and none of their work is stolen. 
                The creator follows FiveM &amp; Tebex's Terms of Service &amp; Code of Conduct.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* What is a Seal of Approval Section */}
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-foreground">What is a Seal of Approval?</h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                A Seal of Approval is an award handed out to creators to display on their store to show that their work is truly their own. 
                These awards are handed out after our team at FiveM Database has inspected their Tebex store and have approved that all of the work on there is compliant with 
                FiveM's Terms of Service, Code of Conduct and Tebex's Terms of Service as well as being their own work and not stolen.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}