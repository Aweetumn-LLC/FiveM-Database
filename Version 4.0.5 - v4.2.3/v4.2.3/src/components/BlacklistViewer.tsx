
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Shield, Users, Globe, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getSeverityClass } from "@/utils/blacklistChecker";

interface BlacklistEntry {
  id: string;
  name: string;
  links: string[];
  reason: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'discord' | 'tebex' | 'other';
  keyword: string;
  flagged_by: string;
  discord_server_id?: string;
}

const BlacklistViewer = () => {
  const [blacklistEntries, setBlacklistEntries] = useState<BlacklistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterBy, setFilterBy] = useState("all");
  const [filterValue, setFilterValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadBlacklistEntries();
  }, []);

  const loadBlacklistEntries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blacklist_entries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading blacklist entries:', error);
        return;
      }

      setBlacklistEntries((data || []) as BlacklistEntry[]);
    } catch (error) {
      console.error('Error loading blacklist entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const uniqueReporters = [...new Set(blacklistEntries.map(creator => creator.flagged_by))];
  const uniqueCategories = [...new Set(blacklistEntries.map(creator => creator.category))];

  const filteredCreators = blacklistEntries.filter(creator => {
    // Search filter
    if (searchTerm && !creator.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !creator.reason.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Type filter
    if (filterBy === "reporter" && filterValue && filterValue !== "all-reporters" && creator.flagged_by !== filterValue) {
      return false;
    }
    if (filterBy === "category" && filterValue && filterValue !== "all-categories" && creator.category !== filterValue) {
      return false;
    }

    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'creator':
        return <Users className="h-4 w-4" />;
      case 'website':
        return <Globe className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'creator':
        return 'Creator';
      case 'website':
        return 'Website';
      default:
        return 'Other';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Blacklist Database
          </CardTitle>
          <CardDescription className="text-white/70">
            Total entries: {blacklistEntries.length} | Showing: {filteredCreators.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Input
              placeholder="Search by name or reason..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            
            <div className="flex gap-2">
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Entries</SelectItem>
                  <SelectItem value="reporter">By Reporter</SelectItem>
                  <SelectItem value="category">By Category</SelectItem>
                </SelectContent>
              </Select>
              
              {filterBy === "reporter" && (
                <Select value={filterValue} onValueChange={setFilterValue}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select reporter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-reporters">All Reporters</SelectItem>
                    {uniqueReporters.map(reporter => (
                      <SelectItem key={reporter} value={reporter}>{reporter}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              
              {filterBy === "category" && (
                <Select value={filterValue} onValueChange={setFilterValue}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-categories">All Categories</SelectItem>
                    {uniqueCategories.map(category => (
                      <SelectItem key={category} value={category}>{getCategoryTitle(category)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Blacklist Entries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredCreators.map((creator, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getCategoryIcon(creator.category)}
                      <h4 className="font-medium text-white">{creator.name}</h4>
                      <Badge className={`text-xs ${getSeverityClass(creator.severity)}`}>
                        {creator.severity}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {getCategoryTitle(creator.category)}
                      </Badge>
                    </div>
                    <p className="text-sm text-white/70 mb-2">{creator.reason}</p>
                    {creator.discord_server_id && (
                      <p className="text-xs text-white/60 mb-1">Discord ID: {creator.discord_server_id}</p>
                    )}
                    {creator.links && creator.links.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-white/60 mb-1">Associated Links:</p>
                        <div className="flex flex-wrap gap-1">
                          {creator.links.map((link, linkIndex) => (
                            <Badge key={linkIndex} variant="outline" className="text-xs">
                              {link}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/60">Reported by</p>
                    <p className="text-sm text-white/80 font-medium">{creator.flagged_by}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredCreators.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-white/30 mx-auto mb-4" />
                <p className="text-white/60">No entries found matching your filters</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlacklistViewer;
