import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Link, AlertTriangle, CheckCircle2, Database } from "lucide-react";
import { useResourceStats } from "@/hooks/useResourceStats";
import { supabase } from "@/integrations/supabase/client";

interface SearchEntry {
  id: string;
  search_query: string;
  search_type: string;
  is_blacklisted: boolean;
  created_at: string;
  violation_keywords?: string[];
  violation_type?: string;
}

const RecentSearches = () => {
  const [searches, setSearches] = useState<SearchEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { stats } = useResourceStats();

  useEffect(() => {
    loadRecentSearches();
  }, []);

  const loadRecentSearches = async () => {
    try {
      setLoading(true);
      
      // Fetch real data from the database
      const { data: searchData, error } = await supabase
        .from('resource_searches')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) {
        console.error('Error fetching resource searches:', error);
        setSearches([]);
        return;
      }

      // Transform the data to match our interface
      const transformedSearches: SearchEntry[] = (searchData || []).map(search => ({
        id: search.id,
        search_query: search.search_query,
        search_type: search.search_type,
        is_blacklisted: search.is_blacklisted,
        created_at: search.created_at,
        violation_keywords: search.violation_keywords || [],
        violation_type: search.violation_type
      }));

      setSearches(transformedSearches);
    } catch (error) {
      console.error('Error loading recent searches:', error);
      setSearches([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const extractDomain = (query: string) => {
    try {
      if (query.match(/^https?:\/\//)) {
        return new URL(query).hostname;
      }
      return query;
    } catch {
      return query;
    }
  };

  const filteredSearches = searches.filter(search => 
    search.search_query.toLowerCase().includes(searchTerm.toLowerCase()) ||
    extractDomain(search.search_query).toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Recent Resource Searches</h2>
          <p className="text-muted-foreground">Monitor recently searched resource links</p>
        </div>
        <Button onClick={loadRecentSearches} variant="outline" className="border-white/20 hover:bg-white/10 text-white/80 hover:text-white">
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Searches</p>
                <p className="text-3xl font-bold text-white">{stats.totalSearches.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/20">
                <Search className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Blacklisted</p>
                <p className="text-3xl font-bold text-white">{stats.blacklistedSearches.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-red-500/20">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Clean Searches</p>
                <p className="text-3xl font-bold text-white">{stats.cleanSearches.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/20">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Database className="w-5 h-5 text-cyan-400" />
            <span>Search History</span>
          </CardTitle>
          <CardDescription>
            <div className="flex items-center space-x-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by URL or domain..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
              <Badge variant="secondary" className="bg-white/10 text-white border-0">
                {filteredSearches.length} searches
              </Badge>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-white/80">Search Query</TableHead>
                  <TableHead className="text-white/80">Type</TableHead>
                  <TableHead className="text-white/80">Status</TableHead>
                  <TableHead className="text-white/80">Violations</TableHead>
                  <TableHead className="text-white/80">Searched At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSearches.map((search) => (
                  <TableRow key={search.id} className="border-white/10">
                    <TableCell className="text-white max-w-md">
                      <div className="flex items-center space-x-2">
                        <Link className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        <span className="truncate font-mono text-sm">{search.search_query}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-white">
                      <Badge variant="outline" className="text-xs capitalize">
                        {search.search_type.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {search.is_blacklisted ? (
                        <div className="flex items-center space-x-2 text-red-400">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Blacklisted</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-green-400">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Clean</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {search.violation_keywords && search.violation_keywords.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {search.violation_keywords.map((keyword, index) => (
                            <Badge key={index} className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-white/60">
                      {formatDate(search.created_at)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredSearches.length === 0 && (
            <div className="text-center py-8">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No searches found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentSearches;