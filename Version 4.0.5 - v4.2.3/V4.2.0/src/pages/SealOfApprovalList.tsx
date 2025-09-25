import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield, Award, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface SealOfApprovalData {
  id: string;
  creator_name: string;
  approver_name: string;
  created_at: string;
}

export default function SealOfApprovalList() {
  const [seals, setSeals] = useState<SealOfApprovalData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeals = async () => {
      try {
        const { data, error } = await supabase
          .from('seal_of_approval')
          .select('id, creator_name, approver_name, created_at')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching seals:', error);
          setError('Failed to load seals of approval');
          return;
        }

        setSeals(data || []);
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSeals();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Loading seals of approval...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <Helmet>
        <title>FiveM Database - Seal of Approval | Verified Creators</title>
        <meta name="description" content="Browse all verified FiveM creators who have earned the Seal of Approval from FiveM Database. Discover trustworthy creators with TOS and COC compliant resources." />
        <meta name="keywords" content="FiveM creator seal of approval, verified creators, trusted FiveM creators, TOS compliant creators, verified resources, FiveM creator certification" />
        <link rel="canonical" href="https://fivemdb.net/seal-of-approval" />
        <meta property="og:title" content="FiveM Database - Seal of Approval | Verified Creators" />
        <meta property="og:description" content="Browse all verified FiveM creators who have earned the Seal of Approval from FiveM Database." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fivemdb.net/seal-of-approval" />
        <meta property="og:image" content="https://cdn.velocitynet.work/5DB/Data/5DBEmbed.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Seal of Approval - Verified FiveM Creators" />
        <meta name="twitter:description" content="Browse all verified FiveM creators with seal of approval from FiveM Database." />
        <meta name="twitter:image" content="https://cdn.velocitynet.work/5DB/Data/5DBEmbed.png" />
      </Helmet>

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <Award className="w-12 h-12 text-primary" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Seal of <span className="text-primary">Approval</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">
              FiveM Database offers a Seal of approval to creators that we have examined there work, seen there work and that we can recommed to people as a trustworthy creator. This system was introduced to help people know what creators are trust worthy.
            </p>
          </motion.div>
        </div>

        {/* What is a Seal of Approval Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="mb-12">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">What is a Seal of Approval?</h2>
              </div>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  A Seal of Approval is an award handed out to creators to display on their store to show that their work is truly their own. 
                  These awards are handed out after our team at FiveM Database has inspected their Tebex store and have approved that all of the work on there is compliant with 
                  FiveM's Terms of Service, Code of Conduct and Tebex's Terms of Service as well as being their own work and not stolen.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Seals List */}
        {error ? (
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Error Loading Seals</h3>
              <p className="text-muted-foreground">{error}</p>
            </CardContent>
          </Card>
        ) : seals.length === 0 ? (
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-muted/10 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">No Seals Yet</h3>
              <p className="text-muted-foreground">
                No seals of approval have been awarded yet. Check back later!
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold mb-6 text-center">
                Verified <span className="text-primary">Creators</span>
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                {seals.length} creator{seals.length !== 1 ? 's' : ''} verified with Seal of Approval
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seals.map((seal, index) => (
                <motion.div
                  key={seal.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 + (index * 0.1) }}
                >
                  <Link to={`/seal-of-approval/${seal.creator_name}`}>
                    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer border-primary/20 hover:border-primary/40">
                      <CardHeader className="text-center pb-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle className="text-xl font-bold">{seal.creator_name}</CardTitle>
                        <Badge variant="outline" className="mt-2 px-3 py-1 bg-primary/5 border-primary/20">
                          Verified Creator
                        </Badge>
                      </CardHeader>
                      <CardContent className="text-center pt-0">
                        <Separator className="mb-4" />
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p>
                            <span className="font-medium text-foreground">Approved by:</span> {seal.approver_name}
                          </p>
                          <p>
                            <span className="font-medium text-foreground">Date:</span> {new Date(seal.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}