
import { Card, CardContent } from "@/components/ui/card";
import { Database, Shield, Eye, Trash2, Lock } from "lucide-react";

const DataPolicy = () => {
  return (
    <div className="min-h-screen">
      <main className="flex-grow pt-20 md:pt-32 px-4 md:px-6 pb-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3 md:mb-4">
              Data Policy
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              How we collect, use, and protect your information
            </p>
            <p className="text-sm text-white/50 mt-4">
              Last updated: January 9th, 2025
            </p>
          </div>

          <div className="space-y-6">
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="h-6 w-6 text-blue-400" />
                  <h2 className="text-xl font-bold text-white">Data We Collect</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Information You Provide</h3>
                    <ul className="space-y-2 text-white/70">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        Reports and submissions you make through our platform
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        Contact information when you reach out to us
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        Evidence files and screenshots you upload
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Automatically Collected Information</h3>
                    <ul className="space-y-2 text-white/70">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        IP address and general location information
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        Browser type and device information
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        Usage patterns and service interactions
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        Search queries and tool usage statistics
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="h-6 w-6 text-green-400" />
                  <h2 className="text-xl font-bold text-white">How We Use Your Data</h2>
                </div>
                <div className="space-y-3">
                  <p className="text-white/70 leading-relaxed">
                    We use the collected data to provide and improve our services:
                  </p>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      Operate and maintain our blacklist and compliance checking services
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      Generate statistics and reports for the FiveM community
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      Investigate and verify reports of policy violations
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      Prevent abuse and maintain service security
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      Improve our detection algorithms and tools
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-purple-400" />
                  <h2 className="text-xl font-bold text-white">Data Protection</h2>
                </div>
                <p className="text-white/70 leading-relaxed mb-4">
                  We implement appropriate technical and organizational measures to protect your data against 
                  unauthorized access, alteration, disclosure, or destruction. This includes:
                </p>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    Encryption of data in transit and at rest
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    Regular security audits and updates
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    Access controls and authentication systems
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    Secure hosting infrastructure with reputable providers
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="h-6 w-6 text-yellow-400" />
                  <h2 className="text-xl font-bold text-white">Data Sharing</h2>
                </div>
                <p className="text-white/70 leading-relaxed mb-4">
                  We do not sell, rent, or trade your personal information. We may share data in the 
                  following limited circumstances:
                </p>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    With service providers who assist in operating our platform
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    When required by law or legal process
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    To protect our rights, property, or safety
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    Aggregated, non-personal statistics with the community
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Trash2 className="h-6 w-6 text-red-400" />
                  <h2 className="text-xl font-bold text-white">Data Retention and Deletion</h2>
                </div>
                <p className="text-white/70 leading-relaxed mb-4">
                  We retain data only as long as necessary to provide our services and comply with legal obligations:
                </p>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    Search logs and usage data: 12 months
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    Blacklist entries: Indefinitely (for community safety)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    Evidence files: 24 months or until case resolution
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    Analytics data: Aggregated permanently, individual data 6 months
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="h-6 w-6 text-blue-400" />
                  <h2 className="text-xl font-bold text-white">Your Rights</h2>
                </div>
                <p className="text-white/70 leading-relaxed mb-4">
                  You have the right to request information about, correction of, or deletion of your personal data. 
                  However, please note that some data may be retained for legitimate business purposes or legal compliance.
                </p>
                <p className="text-white/70 leading-relaxed">
                  To exercise your rights or for questions about this policy, contact us at: 
                  <span className="text-blue-400 ml-1">autumn@fivemdb.online</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DataPolicy;

