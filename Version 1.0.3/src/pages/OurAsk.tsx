
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, MessageSquare, CheckSquare, Server, User, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const OurAsk = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center pt-28">
        <div className="animate-fade-in container max-w-5xl px-8 py-20">
          <div className="mb-12">
            <div className="flex items-center justify-center mb-6">
              <Badge className="px-3 py-1 text-sm bg-indigo-500/20 text-indigo-400 border-indigo-500/20">
                OFFICIAL STATEMENT
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-light mb-6 leading-tight text-center">
              To CFX: This is <span className="text-gradient">OUR ASK</span>.
            </h1>
            
            <div className="glass-effect border-l-4 border-indigo-500 pl-6 py-4 rounded-r-lg max-w-3xl mx-auto">
              <p className="text-lg md:text-xl font-light text-white/80 leading-relaxed">
                We as a Group & As a company Would like to See changes made that should not have had to be done By us (The terms We, Us, FDB, 5DB Refers to FiveM DB In the following Document).
              </p>
            </div>
          </div>
          
          <div className="space-y-12">
            <Card className="glass-neo">
              <CardContent className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-indigo-500/20 p-2 rounded-lg">
                    <Shield size={24} className="text-indigo-400" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-light">Enforcement and Application of the PLA & Terms of Service</h2>
                  <Badge variant="outline" className="text-xs border-white/30 text-white/70">PRIORITY</Badge>
                </div>
                
                <div className="space-y-4 text-white/80 font-light leading-relaxed">
                  <p>
                    Since Rockstar's acquisition of CFX, the community has held strong expectations for more consistent, transparent, and thorough enforcement of the Terms of Service (TOS) and Platform License Agreement (PLA).
                  </p>
                  
                  <p>
                    While we acknowledge that some progress has been made and enforcement has occurred in certain instances, there is still a clear inconsistency in how these policies are applied. At times, this inconsistency can appear to reflect favoritism or oversight, which risks eroding trust within the community.
                  </p>
                  
                  <p>
                    We respectfully urge CFX to consider expanding its compliance team to support a more uniform and timely application of rules across the platform. Additionally, we ask for a more transparent and reliable support ticket process, particularly regarding TOS and PLA violations. Community members who report these issues should receive clear responses—outlining what actions, if any, were taken.
                  </p>
                  
                  <p>
                    As dedicated and engaged users, many of us have spent considerable time reporting servers that openly violate the code of conduct. Unfortunately, we have observed very limited enforcement outcomes, which is disheartening and discourages continued community involvement in maintaining platform integrity.
                  </p>
                  
                  <p>
                    We sincerely hope to see meaningful improvements in enforcement consistency and communication. The community is eager to support a fair, transparent, and thriving platform environment—and we believe these steps will significantly help in achieving that goal.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-neo">
              <CardContent className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-teal-500/20 p-2 rounded-lg">
                    <CheckSquare size={24} className="text-teal-400" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-light">What We Would Like to See</h2>
                  <Badge variant="outline" className="text-xs border-white/30 text-white/70">OUR REQUEST</Badge>
                </div>
                
                <div className="space-y-4 text-white/80 font-light leading-relaxed">
                  <p>
                    As both a company and an active part of the community, we are asking CFX to improve how support tickets—especially those related to compliance and violations—are managed and responded to.
                  </p>

                  <p>
                    We would like to see an increase in staffing within the compliance team to ensure more consistent oversight and faster response times.
                  </p>

                  <p>
                    Greater transparency is also requested regarding enforcement actions taken against non-compliant servers. This would help the community understand that reports are being taken seriously and addressed appropriately.
                  </p>

                  <p>
                    We believe it would be beneficial if CFX published a periodic public data report detailing the number of servers reported versus the actions taken. This would add much-needed visibility and accountability to the enforcement process.
                  </p>

                  <p>
                    While we understand the current compliance efforts are largely managed by a single individual (Neon), we do not believe this is sufficient to manage the tens of thousands of active servers on the platform. Expansion of the compliance team is essential to maintain integrity and consistency.
                  </p>

                  <p>
                    Our team is eager to contribute toward solving these issues. One of our members, Sophia, previously expressed interest in joining the compliance team but received no response, and the support ticket was closed without acknowledgment. We remain open and willing to assist in addressing the widespread issue of non-compliant servers across the platform.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-neo">
              <CardContent className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-500/20 p-2 rounded-lg">
                    <FileText size={24} className="text-blue-400" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-light">How Do We Collect & Use Data?</h2>
                  <Badge variant="outline" className="text-xs border-white/30 text-white/70">DATA GATHERING</Badge>
                </div>
                
                <div className="space-y-4 text-white/80 font-light leading-relaxed">
                  <p>
                    All reports are compiled manually by key members of the FDB team. Each report is carefully documented and submitted by hand to ensure accuracy and reliability.
                  </p>
                  
                  <p>
                    Our approach is entirely impartial—servers are selected based on observed behavior, not personal preference. We maintain a detailed record of previously reported servers to avoid duplication.
                  </p>
                  
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
          
          <div className="glass-effect p-8 rounded-xl text-center">
            <h2 className="text-2xl md:text-3xl font-display mb-6">Our Commitment</h2>
            <p className="text-white/70 leading-relaxed max-w-2xl mx-auto">
              We at FiveM DB remain committed to supporting the FiveM community through data-driven advocacy and transparent reporting. Our goal is not to criticize but to collaborate toward a more compliant, fair, and sustainable ecosystem for all stakeholders.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <div className="bg-white/5 p-6 rounded-lg">
                <div className="mb-4 text-indigo-400 flex justify-center">
                  <User size={28} />
                </div>
                <h3 className="font-display mb-3">Community-Centered</h3>
                <p className="text-white/60 text-sm">
                  We operate for and with the community, maintaining transparency in all our efforts.
                </p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-lg">
                <div className="mb-4 text-teal-400 flex justify-center">
                  <Server size={28} />
                </div>
                <h3 className="font-display mb-3">Data-Driven</h3>
                <p className="text-white/60 text-sm">
                  Our reports and advocacy are based on verifiable data and documented observations.
                </p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-lg">
                <div className="mb-4 text-blue-400 flex justify-center">
                  <MessageSquare size={28} />
                </div>
                <h3 className="font-display mb-3">Solution-Focused</h3>
                <p className="text-white/60 text-sm">
                  We aim to provide constructive feedback and viable solutions to improve the platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OurAsk;
