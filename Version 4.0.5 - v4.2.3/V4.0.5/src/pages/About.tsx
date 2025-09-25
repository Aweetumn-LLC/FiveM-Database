
import Layout from "@/components/Layout";
import { Separator } from "@/components/ui/separator";
import MinimalButton from "@/components/MinimalButton";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Database, FileText, Server, Flag } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const About = () => {
  return (
    <Layout>
      <main className="flex-1 pt-32">
        <div className="container mx-auto px-6 py-12 md:py-24">
          <div className="animate-fade-in max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-display font-light mb-6 text-gradient">About FiveM DB</h1>
              
              <p className="text-lg md:text-2xl font-light text-white/70 leading-relaxed max-w-3xl mx-auto">
                A community-driven initiative dedicated to documenting and reporting violations 
                within the FiveM ecosystem to promote a more accountable and compliant platform.
              </p>
            </div>
            
            <Card className="glass-effect mb-16 overflow-hidden">
              <AspectRatio ratio={21/9}>
                <img 
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" 
                  alt="FiveM community" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent flex items-center p-8 md:p-12">
                  <div className="max-w-xl">
                    <h2 className="text-3xl md:text-4xl font-display mb-4 font-light text-white">Our Mission</h2>
                    <p className="text-white/80 text-lg leading-relaxed">
                      To create a transparent accountability system where FiveM community members can identify, 
                      document, and track violations of the Platform License Agreement (PLA) and Terms of Service (TOS), 
                      ultimately working toward a more compliant ecosystem for everyone.
                    </p>
                  </div>
                </div>
              </AspectRatio>
            </Card>
            
            <Separator className="my-16 bg-white/10" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
              <div className="glass-effect p-8 rounded-xl animate-slide-in">
                <div className="mb-6 text-indigo-400">
                  <Shield size={36} />
                </div>
                <h2 className="text-2xl font-display mb-6">Our Principles</h2>
                <ul className="space-y-4 text-white/80 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="bg-white/20 rounded-full p-1 mt-1 min-w-[8px] min-h-[8px]"></span>
                    <span><strong className="text-white">Transparency:</strong> We believe in open documentation and clear reporting processes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-white/20 rounded-full p-1 mt-1 min-w-[8px] min-h-[8px]"></span>
                    <span><strong className="text-white">Fairness:</strong> Every report is submitted based on objective evidence, not personal preference.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-white/20 rounded-full p-1 mt-1 min-w-[8px] min-h-[8px]"></span>
                    <span><strong className="text-white">Accountability:</strong> We aim to create a more accountable FiveM ecosystem.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-white/20 rounded-full p-1 mt-1 min-w-[8px] min-h-[8px]"></span>
                    <span><strong className="text-white">Community:</strong> We foster a community dedicated to improving FiveM.</span>
                  </li>
                </ul>
              </div>
              
              <div className="glass-effect p-8 rounded-xl animate-slide-in" style={{ animationDelay: '0.2s' }}>
                <div className="mb-6 text-teal-400">
                  <Users size={36} />
                </div>
                <h2 className="text-2xl font-display mb-6">Our Team</h2>
                <p className="text-white/80 leading-relaxed mb-6">
                  FiveM DB is powered by a dedicated team of volunteers passionate about maintaining 
                  the integrity of the FiveM community. Our team includes:
                </p>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-center gap-2">
                    <span className="bg-indigo-500/20 p-1.5 rounded-md">
                      <Database size={16} className="text-indigo-400" />
                    </span>
                    <span>Data Collectors & Researchers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-green-500/20 p-1.5 rounded-md">
                      <FileText size={16} className="text-green-400" />
                    </span>
                    <span>Documentation Specialists</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-blue-500/20 p-1.5 rounded-md">
                      <Server size={16} className="text-blue-400" />
                    </span>
                    <span>Technical Administrators</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-orange-500/20 p-1.5 rounded-md">
                      <Flag size={16} className="text-orange-400" />
                    </span>
                    <span>Community Advocates</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="glass-effect p-8 md:p-12 rounded-xl mb-16">
              <h2 className="text-3xl font-display mb-8 text-center">What We Do</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-display mb-4">Documentation</h3>
                    <p className="text-white/70 leading-relaxed">
                      We maintain a comprehensive database of reported violations, complete with evidence, 
                      documentation, and current status. Each report undergoes careful verification before publication.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-display mb-4">Reporting</h3>
                    <p className="text-white/70 leading-relaxed">
                      We submit detailed reports to CFX about violations of the PLA, TOS, and Code of Conduct, 
                      providing clear evidence and context to assist with enforcement efforts.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-display mb-4">Analysis</h3>
                    <p className="text-white/70 leading-relaxed">
                      We analyze trends in violations, track enforcement patterns, and generate insights 
                      about the state of compliance within the broader FiveM ecosystem.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-display mb-4">Education</h3>
                    <p className="text-white/70 leading-relaxed">
                      We provide resources to help server owners understand compliance requirements, 
                      best practices, and how to maintain a TOS-compliant server environment.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="glass-effect p-8 md:p-12 rounded-xl text-center mb-16">
              <h2 className="text-3xl font-display mb-6">Our Impact</h2>
              
              <p className="text-white/70 leading-relaxed max-w-2xl mx-auto mb-8">
                Since our founding, FiveM DB has contributed significantly to improving the FiveM ecosystem:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white/5 p-6 rounded-lg">
                  <div className="text-3xl font-display font-bold mb-2 text-gradient">50+</div>
                  <p className="text-white/60">Reports Submitted</p>
                </div>
                
                <div className="bg-white/5 p-6 rounded-lg">
                  <div className="text-3xl font-display font-bold mb-2 text-gradient">30+</div>
                  <p className="text-white/60">Servers Documented</p>
                </div>
                
                <div className="bg-white/5 p-6 rounded-lg">
                  <div className="text-3xl font-display font-bold mb-2 text-gradient">100+</div>
                  <p className="text-white/60">Violations Identified</p>
                </div>
                
                <div className="bg-white/5 p-6 rounded-lg">
                  <div className="text-3xl font-display font-bold mb-2 text-gradient">10+</div>
                  <p className="text-white/60">Servers Improved</p>
                </div>
              </div>
            </div>
            
            <div className="glass-effect bg-gradient-to-r from-indigo-900/20 to-teal-900/20 p-8 md:p-12 rounded-xl text-center mb-16">
              <h2 className="text-3xl font-display mb-6">Get Involved</h2>
              
              <p className="text-white/80 leading-relaxed max-w-2xl mx-auto mb-8">
                We welcome community members who share our commitment to improving the FiveM ecosystem. 
                Whether you'd like to submit reports, help with documentation, or contribute to our tools, 
                we'd love to have you join us.
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link to="/discord">
                  <MinimalButton icon iconPosition="right">JOIN OUR DISCORD</MinimalButton>
                </Link>
                <Link to="/reports">
                  <MinimalButton variant="outline" icon iconPosition="right">EXPLORE REPORTS</MinimalButton>
                </Link>
              </div>
            </div>
            
            <Separator className="my-16 bg-white/10" />
            
            <div className="text-center">
              <h2 className="text-3xl font-display mb-6">Learn More</h2>
              
              <div className="flex flex-wrap gap-6 justify-center">
                <Link to="/our-ask">
                  <MinimalButton variant="outline">OUR ASK</MinimalButton>
                </Link>
                <Link to="/fivem-tos">
                  <MinimalButton variant="outline">FIVEM TOS</MinimalButton>
                </Link>
                <Link to="/cfx-tools">
                  <MinimalButton variant="outline">CFX TOOLS</MinimalButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default About;
