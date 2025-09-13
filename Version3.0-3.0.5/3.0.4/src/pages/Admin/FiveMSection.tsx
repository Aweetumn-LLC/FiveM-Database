import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Server, Search } from "lucide-react";
import RecentServers from "./RecentServers";
import RecentSearches from "./RecentSearches";

const FiveMSection = () => {
  const [activeTab, setActiveTab] = useState("servers");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">FiveM Monitoring</h2>
        <p className="text-muted-foreground">Monitor server checks and resource searches</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-white/5 p-1">
          <TabsTrigger 
            value="servers" 
            className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 flex items-center space-x-2"
          >
            <Server className="w-4 h-4" />
            <span>Recent Servers</span>
          </TabsTrigger>
          <TabsTrigger 
            value="searches" 
            className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 flex items-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>Recent Searches</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="servers">
          <RecentServers />
        </TabsContent>

        <TabsContent value="searches">
          <RecentSearches />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FiveMSection;