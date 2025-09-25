
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { FileText, Shield, BookOpen, Info, ExternalLink } from "lucide-react";

const FiveMTOS = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <main className="flex-1 pt-28">
        <div className="container max-w-6xl mx-auto px-6 py-12">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-display font-light mb-6 text-gradient animate-fade-in">
              FiveM Terms of Service
            </h1>
            <p className="text-lg text-white/70 leading-relaxed animate-fade-in" style={{animationDelay: '100ms'}}>
              Understanding the terms that govern the FiveM platform is essential for all server owners
              and community members. This page explains the key provisions of the Platform License Agreement
              and Code of Conduct.
            </p>
          </div>
          
          <Tabs defaultValue="tos" className="mb-12 animate-fade-in" style={{animationDelay: '200ms'}}>
            <div className="flex justify-center mb-8">
              <TabsList className="glass-effect">
                <TabsTrigger value="tos" className="data-[state=active]:bg-white/10">
                  <span className="flex items-center gap-2">
                    <FileText size={16} />
                    Terms of Service
                  </span>
                </TabsTrigger>
                <TabsTrigger value="coc" className="data-[state=active]:bg-white/10">
                  <span className="flex items-center gap-2">
                    <Shield size={16} />
                    Code of Conduct
                  </span>
                </TabsTrigger>
                <TabsTrigger value="explanations" className="data-[state=active]:bg-white/10">
                  <span className="flex items-center gap-2">
                    <BookOpen size={16} />
                    Explanations
                  </span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="tos" className="space-y-8">
              <Card className="glass-neo animate-fade-in" style={{animationDelay: '300ms'}}>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-display mb-6 flex items-center gap-2">
                    <FileText size={24} className="text-indigo-400" />
                    Platform License Agreement (PLA)
                  </h2>
                  
                  <p className="text-white/70 mb-6">
                    The Platform License Agreement (PLA) is a legal contract between users and Cfx.re that governs the use of the FiveM platform.
                    Below are key provisions that server owners and community members should be aware of:
                  </p>
                  
                  <div className="space-y-6">
                    <div className="glass-effect p-6 rounded-xl">
                      <h3 className="text-xl font-display mb-3">Commercial Use Restrictions</h3>
                      <p className="text-white/70">
                        The FiveM platform may not be used for commercial purposes. This includes selling vehicles, maps, or other assets
                        that are derived from GTA intellectual property. Only legally sourced content may be distributed.
                      </p>
                    </div>
                    
                    <div className="glass-effect p-6 rounded-xl">
                      <h3 className="text-xl font-display mb-3">Monetization Limitations</h3>
                      <p className="text-white/70">
                        Server owners may only monetize their servers through legitimate channels approved by Cfx.re, such as:
                      </p>
                      <ul className="list-disc pl-6 mt-3 space-y-2 text-white/70">
                        <li>Donations that do not provide gameplay advantages</li>
                        <li>Cosmetic items that do not use Rockstar's intellectual property</li>
                        <li>Server access fees that do not exceed $15 per month</li>
                      </ul>
                    </div>
                    
                    <div className="glass-effect p-6 rounded-xl">
                      <h3 className="text-xl font-display mb-3">Intellectual Property Rights</h3>
                      <p className="text-white/70">
                        Users must respect intellectual property rights of Rockstar Games, Take-Two Interactive, and third parties.
                        This means you cannot use, sell, or distribute content that infringes on these rights.
                      </p>
                    </div>
                    
                    <div className="glass-effect p-6 rounded-xl">
                      <h3 className="text-xl font-display mb-3">Technical Requirements</h3>
                      <p className="text-white/70">
                        Servers must comply with certain technical requirements, including:
                      </p>
                      <ul className="list-disc pl-6 mt-3 space-y-2 text-white/70">
                        <li>No modifications to the game that would enable multiplayer outside of Cfx.re's platforms</li>
                        <li>No use of private/modified clients</li>
                        <li>No distribution of modified clients</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 border border-indigo-500/30 bg-indigo-500/10 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="text-indigo-400 mt-1">
                        <Info size={20} />
                      </div>
                      <div>
                        <p className="text-white/80">
                          The complete Platform License Agreement can be viewed on the Cfx.re website. Server owners
                          should familiarize themselves with all provisions to ensure compliance.
                        </p>
                        <a 
                          href="https://cfx.re/terms" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 mt-2"
                        >
                          View Full PLA on Cfx.re <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-neo animate-fade-in" style={{animationDelay: '400ms'}}>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-display mb-6 flex items-center gap-2">
                    <Shield size={24} className="text-teal-400" />
                    Common Violations
                  </h2>
                  
                  <p className="text-white/70 mb-6">
                    Below are some of the most common violations of the Platform License Agreement that we observe:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                      <h3 className="text-lg font-display mb-2">Selling Non-Compliant Vehicles</h3>
                      <p className="text-white/70">
                        Many servers offer "custom" vehicles for purchase that are actually based on Rockstar's intellectual property,
                        violating both copyright laws and the PLA.
                      </p>
                    </div>
                    
                    <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                      <h3 className="text-lg font-display mb-2">Unauthorized MLOs and Maps</h3>
                      <p className="text-white/70">
                        Selling or distributing map modifications (MLOs) that are derived from GTA's map or other copyrighted content
                        is not permitted under the PLA.
                      </p>
                    </div>
                    
                    <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                      <h3 className="text-lg font-display mb-2">Pay-to-Win Mechanics</h3>
                      <p className="text-white/70">
                        Servers that offer gameplay advantages in exchange for real money payments are in violation of the PLA's
                        monetization restrictions.
                      </p>
                    </div>
                    
                    <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                      <h3 className="text-lg font-display mb-2">Excessive Access Fees</h3>
                      <p className="text-white/70">
                        Charging more than $15 per month for server access or implementing tiered access fees that exceed
                        this amount violates the PLA.
                      </p>
                    </div>
                    
                    <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                      <h3 className="text-lg font-display mb-2">Blacklisted Resources</h3>
                      <p className="text-white/70">
                        Using resources that have been specifically blacklisted by Cfx.re, which often includes content that
                        enables cheating or violates game mechanics.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="coc" className="space-y-8">
              <Card className="glass-neo">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-display mb-6 flex items-center gap-2">
                    <Shield size={24} className="text-purple-400" />
                    Code of Conduct
                  </h2>
                  
                  <p className="text-white/70 mb-6">
                    The Code of Conduct outlines the behavioral expectations for all users of the FiveM platform, including
                    server owners, administrators, and players.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="glass-effect p-6 rounded-xl">
                      <h3 className="text-xl font-display mb-3">Respectful Conduct</h3>
                      <p className="text-white/70">
                        Users must treat others with respect and refrain from harassment, discrimination, or bullying based on
                        race, gender, sexuality, religion, or other personal characteristics.
                      </p>
                    </div>
                    
                    <div className="glass-effect p-6 rounded-xl">
                      <h3 className="text-xl font-display mb-3">Appropriate Content</h3>
                      <p className="text-white/70">
                        Content within servers must be appropriate and legal. This prohibits:
                      </p>
                      <ul className="list-disc pl-6 mt-3 space-y-2 text-white/70">
                        <li>Child exploitation material</li>
                        <li>Explicit sexual content involving minors</li>
                        <li>Content that promotes violence, self-harm, or illegal activities</li>
                        <li>Hate speech and discriminatory content</li>
                      </ul>
                    </div>
                    
                    <div className="glass-effect p-6 rounded-xl">
                      <h3 className="text-xl font-display mb-3">Prohibited Behavior</h3>
                      <p className="text-white/70">
                        The following behaviors are strictly prohibited:
                      </p>
                      <ul className="list-disc pl-6 mt-3 space-y-2 text-white/70">
                        <li>Cheating or using unauthorized modifications</li>
                        <li>Attempting to exploit vulnerabilities in the platform</li>
                        <li>Impersonating Cfx.re staff or other users</li>
                        <li>Creating false or misleading reports</li>
                        <li>Engaging in disruptive behavior that negatively impacts others' experience</li>
                      </ul>
                    </div>
                    
                    <div className="glass-effect p-6 rounded-xl">
                      <h3 className="text-xl font-display mb-3">Server Administration</h3>
                      <p className="text-white/70">
                        Server administrators are responsible for:
                      </p>
                      <ul className="list-disc pl-6 mt-3 space-y-2 text-white/70">
                        <li>Enforcing the Code of Conduct within their servers</li>
                        <li>Addressing reports of misconduct promptly</li>
                        <li>Maintaining a safe and welcoming environment for all players</li>
                        <li>Not enabling or participating in activities that violate the Code of Conduct</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 border border-purple-500/30 bg-purple-500/10 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="text-purple-400 mt-1">
                        <Info size={20} />
                      </div>
                      <div>
                        <p className="text-white/80">
                          The full Code of Conduct contains additional provisions and details. All community members should
                          review it to ensure they understand the expected standards of behavior.
                        </p>
                        <a 
                          href="https://cfx.re/conduct" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:text-purple-300 flex items-center gap-1 mt-2"
                        >
                          View Full Code of Conduct <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-neo">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-display mb-6 flex items-center gap-2">
                    <Shield size={24} className="text-orange-400" />
                    Code of Conduct Violations
                  </h2>
                  
                  <p className="text-white/70 mb-6">
                    Common Code of Conduct violations that are reportable:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                      <h3 className="text-lg font-display mb-2">Discriminatory Behavior</h3>
                      <p className="text-white/70">
                        Servers or users engaging in racism, sexism, homophobia, or other forms of discrimination.
                      </p>
                    </div>
                    
                    <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                      <h3 className="text-lg font-display mb-2">Harassment and Bullying</h3>
                      <p className="text-white/70">
                        Targeted harassment, bullying, or intimidation of other users, including verbal abuse or threats.
                      </p>
                    </div>
                    
                    <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                      <h3 className="text-lg font-display mb-2">Inappropriate Content</h3>
                      <p className="text-white/70">
                        Distribution of content that violates platform standards, particularly content involving minors
                        or promoting harmful activities.
                      </p>
                    </div>
                    
                    <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                      <h3 className="text-lg font-display mb-2">Cheating and Exploitation</h3>
                      <p className="text-white/70">
                        Use of cheats, hacks, or exploits that provide unfair advantages or disrupt gameplay for others.
                      </p>
                    </div>
                    
                    <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                      <h3 className="text-lg font-display mb-2">Impersonation and Fraud</h3>
                      <p className="text-white/70">
                        Pretending to be Cfx.re staff or other community members, or engaging in fraudulent activities.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="explanations" className="space-y-8">
              <Card className="glass-neo">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-display mb-6 flex items-center gap-2">
                    <BookOpen size={24} className="text-teal-400" />
                    Understanding the Terms
                  </h2>
                  
                  <p className="text-white/70 mb-6">
                    Here are explanations of some key terms and concepts to help server owners and community members
                    better understand the requirements:
                  </p>
                  
                  <div className="space-y-6">
                    <div className="glass-effect p-6 rounded-xl">
                      <h3 className="text-xl font-display mb-3">What is "Intellectual Property"?</h3>
                      <p className="text-white/70">
                        Intellectual property refers to creations of the mind, such as inventions, literary and artistic works,
                        designs, symbols, names, and images used in commerce. In the context of FiveM, this includes:
                      </p>
                      <ul className="list-disc pl-6 mt-3 space-y-2 text-white/70">
                        <li>Vehicle designs and models</li>
                        <li>Map layouts and buildings</li>
                        <li>Character models and animations</li>
                        <li>Logos, branding, and trademarks</li>
                        <li>Gameplay mechanics and features</li>
                      </ul>
                    </div>
                    
                    <div className="glass-effect p-6 rounded-xl">
                      <h3 className="text-xl font-display mb-3">What is a "Derivative Work"?</h3>
                      <p className="text-white/70">
                        A derivative work is a new, original product that includes elements of a preexisting, protected work.
                        Examples in FiveM include:
                      </p>
                      <ul className="list-disc pl-6 mt-3 space-y-2 text-white/70">
                        <li>Modified versions of Rockstar's vehicles</li>
                        <li>Buildings or interiors based on Rockstar's designs</li>
                        <li>Altered character models from the base game</li>
                        <li>Custom scripts that replicate protected gameplay features</li>
                      </ul>
                    </div>
                    
                    <div className="glass-effect p-6 rounded-xl">
                      <h3 className="text-xl font-display mb-3">Acceptable Monetization Methods</h3>
                      <p className="text-white/70">
                        The PLA allows for certain types of monetization, including:
                      </p>
                      <ul className="list-disc pl-6 mt-3 space-y-2 text-white/70">
                        <li><strong>Donations:</strong> Voluntary contributions that do not provide gameplay advantages</li>
                        <li><strong>Cosmetic Items:</strong> Visual customizations that don't infringe on IP rights</li>
                        <li><strong>Access Fees:</strong> Reasonable charges for server access (up to $15/month)</li>
                        <li><strong>Original Content:</strong> Custom scripts, systems, and assets created from scratch</li>
                      </ul>
                    </div>
                    
                    <div className="glass-effect p-6 rounded-xl">
                      <h3 className="text-xl font-display mb-3">Understanding "Blacklisted Resources"</h3>
                      <p className="text-white/70">
                        Blacklisted resources are specific scripts, mods, or assets that Cfx.re has explicitly prohibited.
                        These typically include:
                      </p>
                      <ul className="list-disc pl-6 mt-3 space-y-2 text-white/70">
                        <li>Cheating tools and hacks</li>
                        <li>Scripts that enable exploitation of game mechanics</li>
                        <li>Tools that facilitate copyright infringement</li>
                        <li>Resources that compromise server or client security</li>
                        <li>Modified game files that violate the terms</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-neo">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-display mb-6 flex items-center gap-2">
                    <Info size={24} className="text-blue-400" />
                    Compliance Guidelines
                  </h2>
                  
                  <p className="text-white/70 mb-6">
                    Here are some practical guidelines to help ensure compliance with the PLA and Code of Conduct:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                      <h3 className="text-lg font-display mb-2">Audit Your Server</h3>
                      <p className="text-white/70">
                        Regularly review all assets, scripts, and monetization systems to identify potential violations.
                        Remove any content that violates the PLA or Code of Conduct.
                      </p>
                    </div>
                    
                    <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                      <h3 className="text-lg font-display mb-2">Verify Content Sources</h3>
                      <p className="text-white/70">
                        Ensure all content used on your server comes from legitimate sources and respects intellectual property rights.
                        Use only legally acquired and permitted resources.
                      </p>
                    </div>
                    
                    <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                      <h3 className="text-lg font-display mb-2">Implement Moderation Systems</h3>
                      <p className="text-white/70">
                        Establish clear rules and effective moderation systems to enforce the Code of Conduct within your server.
                        Train staff on recognizing and addressing violations.
                      </p>
                    </div>
                    
                    <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                      <h3 className="text-lg font-display mb-2">Review Monetization Methods</h3>
                      <p className="text-white/70">
                        Ensure all monetization methods comply with the PLA's restrictions. Avoid pay-to-win mechanics
                        and excessive access fees.
                      </p>
                    </div>
                    
                    <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                      <h3 className="text-lg font-display mb-2">Stay Updated</h3>
                      <p className="text-white/70">
                        Regularly review the latest versions of the PLA and Code of Conduct to stay informed about any changes
                        or new requirements.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <p className="text-white/70 max-w-2xl mx-auto">
                      Remember, compliance is not just about avoiding penalties—it's about contributing to a healthy, sustainable
                      community ecosystem that respects the rights of all stakeholders.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Separator className="my-12 bg-white/10" />
          
          <div className="glass-effect p-8 md:p-12 rounded-xl text-center animate-fade-in" style={{animationDelay: '500ms'}}>
            <h2 className="text-3xl font-display mb-6">Report a Violation</h2>
            
            <p className="text-white/70 leading-relaxed max-w-2xl mx-auto mb-8">
              If you've observed a server or user violating the Platform License Agreement or Code of Conduct,
              you can report it through our database or directly to Cfx.re.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="https://cfx.re/report" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="glass-button px-6 py-3 rounded-lg hover:bg-white/15 transition-all inline-flex items-center gap-2"
              >
                <Shield size={18} />
                Report to Cfx.re
              </a>
              
              <a 
                href="https://discord.com/invite/fivemdb" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-gradient px-6 py-3 rounded-lg hover:opacity-90 transition-all inline-flex items-center gap-2"
              >
                <FileText size={18} />
                Submit to FiveM DB
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FiveMTOS;
