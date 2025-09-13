
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Shield, Star, AlertCircle, CheckCircle, Target, FileText, MessageSquare, Server, User, BarChart3 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const OurAsk = () => {
  return (
    <div className="min-h-screen">
      <main className="flex-grow pt-20 md:pt-32 px-4 md:px-6 pb-8">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center mb-6">
              <Badge className="px-4 py-2 text-sm bg-indigo-500/20 text-indigo-400 border-indigo-500/20">
                OFFICIAL STATEMENT
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-light mb-6 leading-tight text-center animate-fade-in">
              To CFX: This is <span className="text-gradient font-semibold">OUR ASK</span>.
            </h1>
            
            <Card className="glass-card border-l-4 border-indigo-500 max-w-4xl mx-auto animate-fade-in border-0" style={{animationDelay: '100ms'}}>
              <CardContent className="p-6">
                <p className="text-lg md:text-xl font-light text-white/80 leading-relaxed">
                  We as a Group & As a company Would like to See changes made that should not have had to be done By us (The terms We, Us, FDB, 5DB Refers to FiveM DB In the following Document).
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-12">
            <Card className="glass-card animate-fade-in border-0" style={{animationDelay: '200ms'}}>
              <CardContent className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-indigo-500/20 p-3 rounded-lg">
                    <Shield size={28} className="text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-display font-light text-white">
                      Enforcement and Application of the PLA & Terms of Service
                    </h2>
                    <Badge variant="outline" className="text-xs border-red-500/50 text-red-400 mt-2">
                      HIGH PRIORITY
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-6 text-white/80 font-light leading-relaxed">
                  <p>
                    Since Rockstar's acquisition of CFX, the community has held strong expectations for more consistent, transparent, and thorough enforcement of the Terms of Service (TOS) and Platform License Agreement (PLA).
                  </p>
                  
                  <p>
                    While we acknowledge that some progress has been made and enforcement has occurred in certain instances, there is still a clear inconsistency in how these policies are applied. At times, this inconsistency can appear to reflect favoritism or oversight, which risks eroding trust within the community.
                  </p>
                  
                  <p>
                    We respectfully urge CFX to consider expanding its compliance team to support a more uniform and timely application of rules across the platform. Additionally, we ask for a more transparent and reliable support ticket process, particularly regarding TOS and PLA violations. Community members who report these issues should receive clear responses—outlining what actions, if any, were taken.
                  </p>
                  
                  <Card className="bg-yellow-500/10 border-yellow-500/30">
                    <CardContent className="p-4">
                      <p className="text-white/80">
                        As dedicated and engaged users, many of us have spent considerable time reporting servers that openly violate the code of conduct. Unfortunately, we have observed very limited enforcement outcomes, which is disheartening and discourages continued community involvement in maintaining platform integrity.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <p>
                    We sincerely hope to see meaningful improvements in enforcement consistency and communication. The community is eager to support a fair, transparent, and thriving platform environment—and we believe these steps will significantly help in achieving that goal.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card animate-fade-in border-0" style={{animationDelay: '300ms'}}>
              <CardContent className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-teal-500/20 p-3 rounded-lg">
                    <Target size={28} className="text-teal-400" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-display font-light text-white">
                      What We Would Like to See
                    </h2>
                    <Badge variant="outline" className="text-xs border-teal-500/50 text-teal-400 mt-2">
                      OUR REQUESTS
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-6 text-white/80 font-light leading-relaxed">
                  <p>
                    As both a company and an active part of the community, we are asking CFX to improve how support tickets—especially those related to compliance and violations—are managed and responded to.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Users className="h-5 w-5 text-blue-400" />
                          <h3 className="font-display text-lg text-white">Increased Staffing</h3>
                        </div>
                        <p className="text-white/70 text-sm">
                          We would like to see an increase in staffing within the compliance team to ensure more consistent oversight and faster response times.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <BarChart3 className="h-5 w-5 text-green-400" />
                          <h3 className="font-display text-lg text-white">Transparency Reports</h3>
                        </div>
                        <p className="text-white/70 text-sm">
                          We believe it would be beneficial if CFX published periodic public data reports detailing the number of servers reported versus actions taken.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <p>
                    Greater transparency is also requested regarding enforcement actions taken against non-compliant servers. This would help the community understand that reports are being taken seriously and addressed appropriately.
                  </p>

                  <Card className="bg-blue-500/10 border-blue-500/30">
                    <CardContent className="p-4">
                      <p className="text-white/80">
                        While we understand the current compliance efforts are largely managed by a single individual (Neon), we do not believe this is sufficient to manage the tens of thousands of active servers on the platform. Expansion of the compliance team is essential to maintain integrity and consistency.
                      </p>
                    </CardContent>
                  </Card>

                  <p>
                    Our team is eager to contribute toward solving these issues. One of our members, Sophia, previously expressed interest in joining the compliance team but received no response, and the support ticket was closed without acknowledgment. We remain open and willing to assist in addressing the widespread issue of non-compliant servers across the platform.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card animate-fade-in border-0" style={{animationDelay: '400ms'}}>
              <CardContent className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-500/20 p-3 rounded-lg">
                    <FileText size={28} className="text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-display font-light text-white">
                      How Do We Collect & Use Data?
                    </h2>
                    <Badge variant="outline" className="text-xs border-blue-500/50 text-blue-400 mt-2">
                      DATA GATHERING
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-6 text-white/80 font-light leading-relaxed">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle className="h-5 w-5 text-purple-400" />
                          <h3 className="font-display text-lg text-white">Manual Collection</h3>
                        </div>
                        <p className="text-white/70 text-sm">
                          All reports are compiled manually by key members of the FDB team. Each report is carefully documented and submitted by hand to ensure accuracy and reliability.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Server className="h-5 w-5 text-teal-400" />
                          <h3 className="font-display text-lg text-white">Impartial Approach</h3>
                        </div>
                        <p className="text-white/70 text-sm">
                          Our approach is entirely impartial—servers are selected based on observed behavior, not personal preference. We maintain detailed records to avoid duplication.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <p>
                    The data we collect is used solely to demonstrate how the Platform License Agreement (PLA), End User License Agreement (EULA), and Code of Conduct (CoC) are enforced within the CFX ecosystem.
                  </p>
                  
                  <p>
                    This work is conducted voluntarily, with Sophia leading the collection and documentation of all information during her own time.
                  </p>
                  
                  <p>
                    All data gathered is publicly accessible and is never sold, shared commercially, or sourced through unauthorized means.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Separator className="my-16 bg-white/10" />
          
          <Card className="glass-card text-center animate-fade-in border-0" style={{animationDelay: '500ms'}}>
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-lg">
                  <MessageSquare size={32} className="text-white" />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-display mb-6 text-gradient">Our Commitment</h2>
              <p className="text-white/70 leading-relaxed max-w-2xl mx-auto mb-10">
                We at FiveM DB remain committed to supporting the FiveM community through data-driven advocacy and transparent reporting. Our goal is not to criticize but to collaborate toward a more compliant, fair, and sustainable ecosystem for all stakeholders.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 text-indigo-400 flex justify-center">
                      <User size={28} />
                    </div>
                    <h3 className="font-display mb-3 text-white">Community-Centered</h3>
                    <p className="text-white/60 text-sm">
                      We operate for and with the community, maintaining transparency in all our efforts.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 text-teal-400 flex justify-center">
                      <Server size={28} />
                    </div>
                    <h3 className="font-display mb-3 text-white">Data-Driven</h3>
                    <p className="text-white/60 text-sm">
                      Our reports and advocacy are based on verifiable data and documented observations.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 text-blue-400 flex justify-center">
                      <MessageSquare size={28} />
                    </div>
                    <h3 className="font-display mb-3 text-white">Solution-Focused</h3>
                    <p className="text-white/60 text-sm">
                      We aim to provide constructive feedback and viable solutions to improve the platform.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default OurAsk;
