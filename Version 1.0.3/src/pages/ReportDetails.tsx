
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Calendar, Clock, Flag, Server, User, FileText, Mail } from "lucide-react";
import { exampleReports } from "./Reports";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ReportStatus, ServerStatus } from "@/components/ReportTile";
import { useState, useEffect } from "react";
import { fetchServerData, getServerBannerUrl, FiveMServerResponse } from "@/utils/serverApi";
import { Button } from "@/components/ui/button";

const ReportDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [serverData, setServerData] = useState<FiveMServerResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [serverBanner, setServerBanner] = useState<string | null>(null);
  
  // Find the report from the example data
  const report = exampleReports.find(r => r.id === id);
  
  // Fetch server data when the component mounts or the report changes
  useEffect(() => {
    const getServerData = async () => {
      if (!report || report.connectionCode === 'N/a') return;
      
      setIsLoading(true);
      try {
        const data = await fetchServerData(report.connectionCode);
        setServerData(data);
        
        // Get the banner URL
        if (data) {
          const bannerUrl = getServerBannerUrl(data);
          console.log("Server banner URL:", bannerUrl);
          setServerBanner(bannerUrl);
        }
      } catch (error) {
        console.error('Failed to fetch server data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    getServerData();
  }, [report]);
  
  // Determine actual server status and player count from API data
  const actualServerStatus: ServerStatus = serverData ? "online" : (report?.serverStatus || "unknown");
  const actualPlayerCount = serverData ? serverData.Data.clients : report?.playerCount;
  const actualMaxPlayers = serverData ? serverData.Data.sv_maxclients : report?.maxPlayers;
  
  if (!report) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="container px-6 py-12">
            <Card className="glass-neo p-8 max-w-xl mx-auto">
              <h2 className="text-2xl font-display mb-4">Report Not Found</h2>
              <p className="text-white/70">The report you're looking for doesn't exist or may have been removed.</p>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const getStatusColor = (status: ReportStatus) => {
    switch (status) {
      case 'open':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'closed':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'resolved':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      default:
        return '';
    }
  };
  
  const getServerStatusColor = (status: ServerStatus = 'unknown') => {
    switch (status) {
      case 'online':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'offline':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'unknown':
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container max-w-5xl px-6 py-12 md:py-20">
          <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-light mb-2">
                  Report: {report.serverName}
                </h1>
                <p className="text-white/60 font-mono mb-4">{report.connectionCode}</p>
                
                <div className="flex flex-wrap gap-3">
                  <Badge className={`${getStatusColor(report.status)} capitalize px-3 py-1`}>
                    {report.status}
                  </Badge>
                  
                  <Badge 
                    className={`${getServerStatusColor(actualServerStatus)} capitalize px-3 py-1 flex items-center gap-1`}
                  >
                    {isLoading ? (
                      <>Loading server status...</>
                    ) : (
                      <>
                        <Server size={14} />
                        {actualServerStatus}
                        {actualServerStatus === 'online' && actualPlayerCount !== undefined && actualMaxPlayers !== undefined && 
                          ` (${actualPlayerCount}/${actualMaxPlayers})`}
                      </>
                    )}
                  </Badge>
                </div>
              </div>
              
              {report.reportDate && (
                <div className="glass-effect px-4 py-2 rounded-md flex items-center gap-2 text-sm text-white/70">
                  <Calendar size={16} />
                  Reported on {report.reportDate}
                </div>
              )}
            </div>
            
            {serverBanner && (
              <Card className="glass-neo mb-8 overflow-hidden">
                <AspectRatio ratio={16/6}>
                  <img 
                    src={serverBanner} 
                    alt={report.serverName} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error("Failed to load server banner:", serverBanner);
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </AspectRatio>
              </Card>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Card className="glass-neo">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-display mb-4 flex items-center gap-2">
                      <Flag size={20} className="text-red-400" />
                      TOS & Code of Conduct Violations
                    </h2>
                    
                    {report.violations.length > 0 ? (
                      <ul className="space-y-4 pl-2">
                        {report.violations.map((violation, index) => (
                          <li 
                            key={index} 
                            className="flex items-start gap-3 animate-fade-in pb-4 border-b border-white/10 last:border-0"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div className="bg-red-500/20 p-1 rounded-full mt-0.5">
                              <div className="w-2 h-2 rounded-full bg-red-400"></div>
                            </div>
                            <div>
                              <p className="text-white/90">{violation}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-white/50 italic">No violations recorded</p>
                    )}
                  </CardContent>
                </Card>
                
                <Card className="glass-neo">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-display mb-4 flex items-center gap-2">
                      <Clock size={20} className="text-blue-400" />
                      Evidence & Documentation
                    </h2>
                    
                    <div className="space-y-4">
                      <p className="text-white/80">
                        Server: <a 
                          href={`https://servers.fivem.net/servers/detail/${report.connectionCode.replace('/', '')}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          {`https://servers.fivem.net/servers/detail/${report.connectionCode.replace('/', '')}`}
                        </a>
                      </p>
                      
                      <p className="text-white/80">
                        Owner Profile: <a 
                          href={report.ownerProfile}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          {report.ownerProfile}
                        </a>
                      </p>
                      
                      {report.reportLink && (
                        <p className="text-white/80">
                          Additional Documentation: <a 
                            href={report.reportLink}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            View Documentation
                          </a>
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card className="glass-neo">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-display mb-4 flex items-center gap-2">
                      <User size={20} className="text-indigo-400" />
                      Server Owner
                    </h2>
                    
                    <a 
                      href={report.ownerProfile} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="glass-button block p-4 rounded-lg hover:bg-white/15 transition-colors flex items-center justify-between"
                    >
                      <span>View Profile</span>
                      <ExternalLink size={18} className="text-white/70" />
                    </a>
                  </CardContent>
                </Card>
                
                <Card className="glass-neo">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-display mb-4">Server Status</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-white/50">Current Status</p>
                        {isLoading ? (
                          <p className="text-white/70 mt-1">Checking status...</p>
                        ) : (
                          <Badge className={`${getServerStatusColor(actualServerStatus)} capitalize mt-1 px-3 py-1`}>
                            {actualServerStatus}
                          </Badge>
                        )}
                      </div>
                      
                      <div>
                        <p className="text-sm text-white/50">Players</p>
                        <p className="text-xl font-display mt-1">
                          {isLoading ? "..." : `${actualPlayerCount || 0}/${actualMaxPlayers || 0}`}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-neo">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-display mb-4">Connection Info</h2>
                    
                    <div>
                      <p className="text-sm text-white/50">Connection Code</p>
                      <p className="font-mono text-lg bg-white/10 px-3 py-1.5 rounded-md mt-1">
                        {report.connectionCode}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-neo">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-display mb-4">Actions</h2>
                    
                    <div className="space-y-3">
                      <a 
                        href="https://support.cfx.re/hc/en-us/requests/new" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-full"
                      >
                        <Button 
                          variant="outline" 
                          className="w-full glass-button hover:bg-white/20 flex items-center gap-2"
                        >
                          <FileText size={16} />
                          Report to cfx.re
                        </Button>
                      </a>
                      
                      <a 
                        href={`mailto:sophia@zwrks.com?subject=FiveM%20DB%20Report%20Submission&body=Server%20Name:%20${report.serverName}%0D%0AConnection%20Code:%20${report.connectionCode}%0D%0A%0D%0APlease%20provide%20details%20about%20the%20violation:`} 
                        className="w-full"
                      >
                        <Button 
                          variant="outline" 
                          className="w-full glass-button hover:bg-white/20 flex items-center gap-2"
                        >
                          <Mail size={16} />
                          Submit to FiveM DB
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReportDetails;
