import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Shield, Star, AlertCircle, CheckCircle, Target, FileText, MessageSquare, Server, User, BarChart3, Handshake, Building2, Lightbulb } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const OurAsk = () => {
  return (
    <div className="min-h-screen">
      <main className="flex-grow pt-20 md:pt-32 px-4 md:px-6 pb-8">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center mb-6">
              <Badge className="px-4 py-2 text-sm bg-blue-500/20 text-blue-400 border-blue-500/20">
                COLLABORATIVE APPROACH
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-light mb-6 leading-tight text-center animate-fade-in">
              Working Together with <span className="text-gradient font-semibold">CFX</span>
            </h1>
            
            <Card className="glass-card border-l-4 border-blue-500 max-w-4xl mx-auto animate-fade-in border-0" style={{animationDelay: '100ms'}}>
              <CardContent className="p-6">
                <p className="text-lg md:text-xl font-light text-white/80 leading-relaxed">
                  We deeply appreciate the amazing platform that CFX has built and the incredible community that has grown around FiveM. Our goal is to support and strengthen this ecosystem through constructive collaboration and mutual understanding.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-12">
            <Card className="glass-card animate-fade-in border-0" style={{animationDelay: '200ms'}}>
              <CardContent className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-green-500/20 p-3 rounded-lg">
                    <Heart size={28} className="text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-display font-light text-white">
                      Our Appreciation for CFX
                    </h2>
                    <Badge variant="outline" className="text-xs border-green-500/50 text-green-400 mt-2">
                      COMMUNITY FIRST
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-6 text-white/80 font-light leading-relaxed">
                  <p>
                    FiveM has revolutionized online gaming by creating an incredible platform that empowers thousands of developers and millions of players worldwide. The innovation, creativity, and dedication that CFX has shown in building and maintaining this ecosystem is truly remarkable.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Building2 className="h-5 w-5 text-blue-400" />
                          <h3 className="font-display text-lg text-white">Platform Excellence</h3>
                        </div>
                        <p className="text-white/70 text-sm">
                          CFX has created an outstanding platform that enables incredible creativity and innovation in the gaming community.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Users className="h-5 w-5 text-green-400" />
                          <h3 className="font-display text-lg text-white">Community Impact</h3>
                        </div>
                        <p className="text-white/70 text-sm">
                          The platform has fostered a thriving community of developers, server owners, and players who create amazing experiences together.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <p>
                    We recognize the challenges that come with managing such a large and diverse ecosystem, and we have nothing but respect for the team at CFX and their ongoing efforts to balance innovation, community needs, and platform integrity.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card animate-fade-in border-0" style={{animationDelay: '300ms'}}>
              <CardContent className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-500/20 p-3 rounded-lg">
                    <Handshake size={28} className="text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-display font-light text-white">
                      Our Collaborative Vision
                    </h2>
                    <Badge variant="outline" className="text-xs border-blue-500/50 text-blue-400 mt-2">
                      PARTNERSHIP FOCUSED
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-6 text-white/80 font-light leading-relaxed">
                  <p>
                    We believe that open dialogue and collaboration between community tools like ours and CFX can benefit everyone. Our platform exists to support the FiveM ecosystem by providing transparency and helping server owners understand compliance requirements.
                  </p>

                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="p-4 text-center">
                        <div className="mb-3 text-blue-400 flex justify-center">
                          <Shield size={24} />
                        </div>
                        <h3 className="font-display mb-2 text-white text-sm">Support Compliance</h3>
                        <p className="text-white/60 text-xs">
                          Help server owners understand and follow platform guidelines
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="p-4 text-center">
                        <div className="mb-3 text-green-400 flex justify-center">
                          <BarChart3 size={24} />
                        </div>
                        <h3 className="font-display mb-2 text-white text-sm">Provide Insights</h3>
                        <p className="text-white/60 text-xs">
                          Offer data-driven insights to improve platform health
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="p-4 text-center">
                        <div className="mb-3 text-purple-400 flex justify-center">
                          <Users size={24} />
                        </div>
                        <h3 className="font-display mb-2 text-white text-sm">Foster Community</h3>
                        <p className="text-white/60 text-xs">
                          Strengthen the overall FiveM community ecosystem
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <p>
                    We see ourselves as a supportive tool in the FiveM ecosystem, not as critics or competitors. Our aim is to work alongside CFX to help maintain the health and integrity of this amazing platform.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card animate-fade-in border-0" style={{animationDelay: '400ms'}}>
              <CardContent className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-purple-500/20 p-3 rounded-lg">
                    <Lightbulb size={28} className="text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-display font-light text-white">
                      How We Can Work Together
                    </h2>
                    <Badge variant="outline" className="text-xs border-purple-500/50 text-purple-400 mt-2">
                      MUTUAL BENEFIT
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-6 text-white/80 font-light leading-relaxed">
                  <p>
                    We believe there are opportunities for productive collaboration that could benefit both CFX and the broader community. Here are some areas where we see potential for positive impact:
                  </p>

                  <div className="space-y-4">
                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-blue-400 mt-1" />
                          <div>
                            <h3 className="font-display text-lg text-white mb-2">Data Sharing</h3>
                            <p className="text-white/70 text-sm">
                              We could potentially share aggregated insights about platform trends and compliance patterns to help inform policy decisions and resource allocation.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-3">
                          <MessageSquare className="h-5 w-5 text-green-400 mt-1" />
                          <div>
                            <h3 className="font-display text-lg text-white mb-2">Community Education</h3>
                            <p className="text-white/70 text-sm">
                              Work together to educate server owners about compliance requirements and best practices, helping prevent violations before they occur.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-3">
                          <Target className="h-5 w-5 text-purple-400 mt-1" />
                          <div>
                            <h3 className="font-display text-lg text-white mb-2">Tool Enhancement</h3>
                            <p className="text-white/70 text-sm">
                              Collaborate on improving our detection accuracy and ensuring our tools align with CFX's enforcement priorities and methodologies.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <p>
                    We're open to feedback, suggestions, and dialogue about how we can better serve the FiveM community while supporting CFX's vision and goals.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card animate-fade-in border-0" style={{animationDelay: '500ms'}}>
              <CardContent className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-teal-500/20 p-3 rounded-lg">
                    <Server size={28} className="text-teal-400" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-display font-light text-white">
                      Our Methodology & Transparency
                    </h2>
                    <Badge variant="outline" className="text-xs border-teal-500/50 text-teal-400 mt-2">
                      ETHICAL APPROACH
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-6 text-white/80 font-light leading-relaxed">
                  <p>
                    We want to be completely transparent about how we operate and ensure CFX understands our approach and intentions:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <h3 className="font-display text-lg text-white">Ethical Data Collection</h3>
                        </div>
                        <p className="text-white/70 text-sm">
                          All our data comes from publicly accessible APIs and sources. We never use unauthorized methods or access private information.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <User className="h-5 w-5 text-blue-400" />
                          <h3 className="font-display text-lg text-white">Privacy Conscious</h3>
                        </div>
                        <p className="text-white/70 text-sm">
                          We protect server and user privacy by masking IP addresses and focusing on resource compliance rather than personal data.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <p>
                    Our team operates with integrity and respect for the platform. We're committed to constructive engagement and always welcome feedback on how we can improve our approach.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Separator className="my-16 bg-white/10" />
          
          <Card className="glass-card text-center animate-fade-in border-0" style={{animationDelay: '600ms'}}>
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-green-600 p-3 rounded-lg">
                  <Handshake size={32} className="text-white" />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-display mb-6 text-gradient">Our Commitment to CFX</h2>
              <p className="text-white/70 leading-relaxed max-w-2xl mx-auto mb-10">
                We're committed to being a positive force in the FiveM ecosystem. Our tools exist to support the community and help maintain the high standards that make this platform so special. We're always open to dialogue and collaboration.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 text-blue-400 flex justify-center">
                      <Heart size={28} />
                    </div>
                    <h3 className="font-display mb-3 text-white">Respectful Approach</h3>
                    <p className="text-white/60 text-sm">
                      We approach all interactions with CFX and the community with respect, professionalism, and good faith.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 text-green-400 flex justify-center">
                      <Shield size={28} />
                    </div>
                    <h3 className="font-display mb-3 text-white">Platform Support</h3>
                    <p className="text-white/60 text-sm">
                      Our goal is to support CFX's efforts in maintaining platform integrity and community standards.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 text-purple-400 flex justify-center">
                      <MessageSquare size={28} />
                    </div>
                    <h3 className="font-display mb-3 text-white">Open Communication</h3>
                    <p className="text-white/60 text-sm">
                      We're always available for dialogue and welcome feedback on how we can better serve the community.
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