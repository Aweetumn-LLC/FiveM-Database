import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const DiscordCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithDiscord } = useAdminAuth();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const processCallback = async () => {
      const code = searchParams.get('code');
      const error = searchParams.get('error');

      if (error) {
        toast.error(`Discord authentication failed: ${error}`);
        navigate('/admin');
        return;
      }

      if (!code) {
        toast.error("No authorization code received from Discord");
        navigate('/admin');
        return;
      }

      try {
        const result = await loginWithDiscord(code, 'https://fivemdb.net/admin/discord-callback');
        
        if (result.success) {
          toast.success("Successfully logged in with Discord!");
          navigate('/admin');
        } else {
          toast.error(result.error || "Discord authentication failed");
          navigate('/admin');
        }
      } catch (error) {
        console.error('Discord callback error:', error);
        toast.error("An error occurred during authentication");
        navigate('/admin');
      } finally {
        setIsProcessing(false);
      }
    };

    processCallback();
  }, [searchParams, navigate, loginWithDiscord]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Processing Login</CardTitle>
          <CardDescription>
            {isProcessing ? "Authenticating with Discord..." : "Redirecting..."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </CardContent>
      </Card>
    </div>
  );
};

export default DiscordCallback;