import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Key, Users, Server, Store, MessageCircle, AlertTriangle, Link, Clock } from "lucide-react";
import KeywordManagement from "@/components/KeywordManagement";
import BlacklistManagement from "@/components/BlacklistManagement";
import BlacklistLinksManagement from "@/components/BlacklistLinksManagement";
import PendingLinksReview from "@/components/PendingLinksReview";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";

const AdminDatabase = () => {
  const [activeTab, setActiveTab] = useState("keywords");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full" style={{ background: 'var(--theme-background)' }}>
        <AdminSidebar />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="glass-effect border-b border-white/10 sticky top-0 z-40">
            <div className="px-6 py-4">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="text-white/80 hover:text-white" />
                <div>
                  <h1 className="text-2xl font-bold text-white">Database Management</h1>
                  <p className="text-white/60">Manage keywords, blacklists, and link reviews</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 lg:w-[800px] bg-white/5 border border-white/10">
                <TabsTrigger value="keywords" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
                  <Key className="h-4 w-4 mr-2" />
                  Keywords
                </TabsTrigger>
                <TabsTrigger value="blacklists" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
                  <Shield className="h-4 w-4 mr-2" />
                  Blacklists
                </TabsTrigger>
                <TabsTrigger value="blacklisted-links" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
                  <Link className="h-4 w-4 mr-2" />
                  Blacklisted Links
                </TabsTrigger>
                <TabsTrigger value="pending-links" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
                  <Clock className="h-4 w-4 mr-2" />
                  Pending Links
                </TabsTrigger>
              </TabsList>

              <TabsContent value="keywords" className="space-y-6">
                <div className="grid gap-6">
                  <KeywordManagement
                    type="ip-violation"
                    title="IP Violation Keywords"
                    description="Keywords that trigger IP violations"
                    icon={AlertTriangle}
                  />
                  
                  <KeywordManagement
                    type="coc-violation"
                    title="Code of Conduct Violation Keywords"
                    description="Keywords that violate the code of conduct"
                    icon={Shield}
                  />
                  
                  <KeywordManagement
                    type="ip-bypass"
                    title="IP Bypass Keywords"
                    description="Keywords that bypass IP violation checks"
                    icon={Key}
                  />
                  
                  <KeywordManagement
                    type="coc-bypass"
                    title="CoC Bypass Keywords"
                    description="Keywords that bypass code of conduct checks"
                    icon={Key}
                  />
                  
                  <KeywordManagement
                    type="contextual"
                    title="Contextual Patterns"
                    description="Complex patterns for contextual analysis"
                    icon={Shield}
                  />
                </div>
              </TabsContent>

              <TabsContent value="blacklists" className="space-y-6">
                <div className="grid gap-6">
                  <BlacklistManagement
                    type="user"
                    title="User Blacklist"
                    description="Blacklisted users by Discord ID or FiveM ID"
                    icon={Users}
                  />
                  
                  <BlacklistManagement
                    type="server"
                    title="Server Blacklist"
                    description="Blacklisted FiveM servers"
                    icon={Server}
                  />
                  
                  <BlacklistManagement
                    type="store"
                    title="Store/Hosting Blacklist"
                    description="Blacklisted stores and marketplaces"
                    icon={Store}
                  />
                  
                  <BlacklistManagement
                    type="discord"
                    title="Discord Blacklist"
                    description="Blacklisted Discord servers"
                    icon={MessageCircle}
                  />
                </div>
              </TabsContent>

              <TabsContent value="blacklisted-links" className="space-y-6">
                <BlacklistLinksManagement />
              </TabsContent>

              <TabsContent value="pending-links" className="space-y-6">
                <PendingLinksReview />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDatabase;