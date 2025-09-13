
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Database, Shield, Clock, Trash2, Lock, Mail } from "lucide-react";

const DataPolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <main className="flex-1 pt-28">
        <div className="container max-w-4xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-6xl font-display font-light mb-6 leading-tight animate-fade-in">
              <span className="text-gradient font-semibold">Data</span> Policy
            </h1>
            <p className="text-lg font-light text-white/70 mb-4 animate-fade-in" style={{animationDelay: '100ms'}}>
              Last updated: May 14, 2025
            </p>
            <p className="text-white/60 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '200ms'}}>
              Learn how we collect, store, and manage data within our platform to maintain community safety and transparency.
            </p>
          </div>
          
          <div className="space-y-8">
            <Card className="glass-neo animate-fade-in border-white/10" style={{animationDelay: '300ms'}}>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-500/20 p-2 rounded-lg">
                    <Database size={24} className="text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-display text-white">Data Collection and Use</h2>
                </div>
                <p className="text-white/70 leading-relaxed">
                  FiveMDB collects and maintains information about FiveM servers and their compliance with 
                  the FiveM Terms of Service. This data is collected from user reports, public sources, and 
                  through our own verification processes.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-neo animate-fade-in border-white/10" style={{animationDelay: '350ms'}}>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-green-500/20 p-2 rounded-lg">
                    <Shield size={24} className="text-green-400" />
                  </div>
                  <h2 className="text-2xl font-display text-white">Types of Data Collected</h2>
                </div>
                <p className="text-white/70 mb-6 leading-relaxed">
                  Our database may include the following types of information:
                </p>
                <div className="grid gap-3">
                  {[
                    "Server names and connection codes",
                    "Server owner profiles and contact information (only publicly available)",
                    "Documented violations of FiveM Terms of Service",
                    "Report status and verification information",
                    "Links to evidence and documentation"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                      <span className="text-white/70">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-neo animate-fade-in border-white/10" style={{animationDelay: '400ms'}}>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-purple-500/20 p-2 rounded-lg">
                    <Shield size={24} className="text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-display text-white">Data Accuracy and Updates</h2>
                </div>
                <p className="text-white/70 leading-relaxed">
                  We strive to maintain accurate and up-to-date information in our database. However, we rely 
                  on community reports and may not always have the most current information. If you believe any 
                  information in our database is incorrect or outdated, please contact us to request verification 
                  or updates.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-neo animate-fade-in border-white/10" style={{animationDelay: '450ms'}}>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-orange-500/20 p-2 rounded-lg">
                    <Clock size={24} className="text-orange-400" />
                  </div>
                  <h2 className="text-2xl font-display text-white">Data Retention</h2>
                </div>
                <p className="text-white/70 leading-relaxed">
                  We maintain records in our database for historical and educational purposes. Reports may remain 
                  in our system indefinitely, even if a server has resolved its violations or ceased operations. 
                  We may add notes or updates to reports to reflect changes in status.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-neo animate-fade-in border-white/10" style={{animationDelay: '500ms'}}>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-red-500/20 p-2 rounded-lg">
                    <Trash2 size={24} className="text-red-400" />
                  </div>
                  <h2 className="text-2xl font-display text-white">Removal Requests</h2>
                </div>
                <p className="text-white/70 leading-relaxed">
                  Server owners who believe they have been incorrectly included in our database or who have resolved 
                  all violations may submit a removal request. Each request will be evaluated individually based on 
                  evidence provided and our verification process. Please note that we maintain the right to decline 
                  removal if we believe maintaining the record serves the community interest.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-neo animate-fade-in border-white/10" style={{animationDelay: '550ms'}}>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-teal-500/20 p-2 rounded-lg">
                    <Lock size={24} className="text-teal-400" />
                  </div>
                  <h2 className="text-2xl font-display text-white">Data Security</h2>
                </div>
                <p className="text-white/70 mb-6 leading-relaxed">
                  We implement reasonable security measures to protect the data in our database from unauthorized 
                  access or alteration. However, no system is completely secure, and we cannot guarantee the absolute 
                  security of our database.
                </p>
                <div className="bg-teal-500/10 border border-teal-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail size={16} className="text-teal-400" />
                    <span className="text-white font-medium">Contact for Data Requests</span>
                  </div>
                  <p className="text-white/70 mb-2">
                    For questions about our data policies or to submit a data-related request, please contact us at:
                  </p>
                  <code className="text-teal-400">data@fivemdb.online</code>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {/* <Footer /> */}
    </div>
  );
};

export default DataPolicy;
