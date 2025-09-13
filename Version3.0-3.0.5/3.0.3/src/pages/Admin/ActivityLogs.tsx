import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Activity, Search, Calendar, MapPin, Monitor, User } from 'lucide-react';

interface ActivityLog {
  id: string;
  maintainer_username: string;
  action_type: string;
  action_description: string;
  ip_address?: string;
  user_agent?: string;
  target_table?: string;
  target_id?: string;
  metadata?: any;
  created_at: string;
}

export default function ActivityLogs() {
  const { user, hasPermission } = useAdminAuth();
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('all');

  const loadActivityLogs = async () => {
    try {
      let query = supabase
        .from('maintainer_activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(500);

      // If user is not "Maintainer", only show their own logs
      if (user?.username !== 'Maintainer' && user?.id) {
        query = query.eq('maintainer_id', user.id);
      }

      const { data, error } = await query;

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error loading activity logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasPermission('view_logs') || user?.username === 'Maintainer') {
      loadActivityLogs();
    }
  }, [user, hasPermission]);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.action_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.maintainer_username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === 'all' || log.action_type === actionFilter;
    const matchesUser = userFilter === 'all' || log.maintainer_username === userFilter;
    
    return matchesSearch && matchesAction && matchesUser;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case 'create':
      case 'add':
        return 'bg-green-500/20 text-green-400';
      case 'update':
      case 'edit':
        return 'bg-blue-500/20 text-blue-400';
      case 'delete':
      case 'remove':
        return 'bg-red-500/20 text-red-400';
      case 'login':
      case 'session':
        return 'bg-purple-500/20 text-purple-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const uniqueActions = [...new Set(logs.map(log => log.action_type))];
  const uniqueUsers = [...new Set(logs.map(log => log.maintainer_username))];

  if (!hasPermission('view_logs') && user?.username !== 'Maintainer') {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            You don't have permission to view activity logs.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Activity className="h-6 w-6" />
          Activity Logs
        </h2>
        <p className="text-muted-foreground">
          {user?.username === 'Maintainer' ? 'All maintainer activities' : 'Your activity history'}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter & Search</CardTitle>
          <CardDescription>Find specific activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Action type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                {uniqueActions.map(action => (
                  <SelectItem key={action} value={action}>{action}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {user?.username === 'Maintainer' && (
              <Select value={userFilter} onValueChange={setUserFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="User" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  {uniqueUsers.map(username => (
                    <SelectItem key={username} value={username}>{username}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities ({filteredLogs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : filteredLogs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No activities found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{log.maintainer_username}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getActionColor(log.action_type)}>
                        {log.action_type}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <span className="truncate">{log.action_description}</span>
                      {log.target_table && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Table: {log.target_table}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {log.ip_address && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{log.ip_address}</span>
                          </div>
                        )}
                        {log.metadata?.country && (
                          <div className="text-xs text-muted-foreground">
                            {log.metadata.country}
                          </div>
                        )}
                        {log.user_agent && (
                          <div className="flex items-center gap-1 mt-1">
                            <Monitor className="h-3 w-3" />
                            <span className="text-xs text-muted-foreground truncate max-w-[100px]">
                              {log.user_agent.split(' ')[0]}
                            </span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(log.created_at)}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}