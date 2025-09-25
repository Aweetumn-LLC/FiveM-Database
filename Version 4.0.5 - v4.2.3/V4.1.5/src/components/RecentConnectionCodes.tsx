import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface RecentConnectionCodesProps {
  onCodeSelect: (code: string) => void;
}

const RecentConnectionCodes = ({ onCodeSelect }: RecentConnectionCodesProps) => {
  const [recentCodes, setRecentCodes] = useState<string[]>([]);

  useEffect(() => {
    const fetchRecentCodes = async () => {
      try {
        const { data, error } = await supabase
          .from('server_checks')
          .select('connection_code, server_data')
          .order('checked_at', { ascending: false })
          .limit(8);

        if (error) {
          console.error('Error fetching recent codes:', error);
          // Fallback to default codes
          setRecentCodes(['A1B2C3', 'XYZ123', '7F8E9D', 'QWE456']);
          return;
        }

        if (data && data.length > 0) {
          const codes = data
            .filter(record => record.server_data) // Only include successful checks
            .map(record => record.connection_code.toUpperCase());
          // Remove duplicates and take first 4
          const uniqueCodes = [...new Set(codes)].slice(0, 4);
          setRecentCodes(uniqueCodes.length > 0 ? uniqueCodes : ['A1B2C3', 'XYZ123', '7F8E9D', 'QWE456']);
        } else {
          // Fallback to default codes
          setRecentCodes(['A1B2C3', 'XYZ123', '7F8E9D', 'QWE456']);
        }
      } catch (error) {
        console.error('Error fetching recent codes:', error);
        // Fallback to default codes
        setRecentCodes(['A1B2C3', 'XYZ123', '7F8E9D', 'QWE456']);
      }
    };

    fetchRecentCodes();
  }, []);

  return (
    <div className="text-gray-300">
      <h4 className="font-semibold mb-2">Recent Connection Codes:</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {recentCodes.map((code) => (
          <Button
            key={code}
            variant="outline"
            size="sm"
            onClick={() => onCodeSelect(code)}
            className="text-gray-300 border-gray-600 hover:bg-gray-800"
          >
            {code}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default RecentConnectionCodes;