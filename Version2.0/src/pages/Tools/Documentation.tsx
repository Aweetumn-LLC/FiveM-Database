
import { useState } from "react";
import { Book, Mail, Users, Target, Play, Code, Database, HelpCircle, ExternalLink, AlertTriangle, Shield, CheckCircle, ArrowRight, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DOCUMENTATION_SECTIONS = [
  {
    id: "what-is",
    title: "What is FiveM Database?",
    icon: Database,
    description: "Learn about our mission and platform"
  },
  {
    id: "how-to-use",
    title: "How to Use FiveM Database",
    icon: HelpCircle,
    description: "Step-by-step guide to using our tools"
  },
  {
    id: "tools",
    title: "Our Tools & Features",
    icon: Code,
    description: "Discover our powerful safety tools"
  },
  {
    id: "contact",
    title: "Contact & Support",
    icon: Mail,
    description: "Get help and support"
  },
  {
    id: "why-use",
    title: "Why Choose FiveM Database?",
    icon: Target,
    description: "What sets us apart"
  },
  {
    id: "how-to-work",
    title: "Partnership & Collaboration",
    icon: Users,
    description: "Join our mission"
  },
];

const flagTypes = [
  { name: "IP Infringement", description: "Breaking intellectual property laws", color: "bg-red-500/10 border-red-500/20 text-red-400" },
  { name: "Leaking", description: "Leaking assets or selling leaked content", color: "bg-orange-500/10 border-orange-500/20 text-orange-400" },
  { name: "Re-selling", description: "Selling opensource, paid, or free resources", color: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400" },
  { name: "Code of Conduct", description: "Breaking Code of Conduct (e.g., child peds)", color: "bg-purple-500/10 border-purple-500/20 text-purple-400" },
  { name: "Illegal", description: "Breaking the law", color: "bg-red-600/10 border-red-600/20 text-red-400" },
  { name: "Branded Assets", description: "IRL company/branding (different from IP)", color: "bg-blue-500/10 border-blue-500/20 text-blue-400" },
  { name: "Theft (Asset Ripping)", description: "Theft of framework, vehicle, or work", color: "bg-pink-500/10 border-pink-500/20 text-pink-400" },
  { name: "Masking", description: "Pretending to be someone else", color: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400" },
  { name: "Dumping (Server Stealing)", description: "Offering server dumping services", color: "bg-teal-500/10 border-teal-500/20 text-teal-400" },
  { name: "Unauthorized Marketplace", description: "Selling outside of Tebex", color: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" },
  { name: "Misc-Market", description: "Markets like Fiverr, Etsy, eBay", color: "bg-green-500/10 border-green-500/20 text-green-400" },
  { name: "Service Selling", description: "Selling boosting services within FiveM", color: "bg-gray-500/10 border-gray-500/20 text-gray-400" },
  { name: "Leak Promoting ", description: "The act of using a leaking Website to promote your resources Or promoting a Leaking Website", color: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" },
  { name: "ESX License", description: "Failure to comply with the GPL V3 license used within ESX", color: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400" },
  { name: "Un-Authorised GSP", description: "These are Providers that do not follow the FiveM Hosting TOS (This meaning running/selling or distrubuting Game Panels using pelican, pterodactyl, Etc, Etc not VPS/Dedi's)", color: "border-red-500/20 text-red-400" }
];

const Documentation = () => {
  const [activeSection, setActiveSection] = useState(DOCUMENTATION_SECTIONS[0].id);

  const renderWhatIs = () => (
    <div className="space-y-8">
      <Card className="border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-3">
            <Database className="w-6 h-6 text-blue-400" />
            What is FiveM Database?
          </CardTitle>
          <CardDescription className="text-white/80 text-lg">
            FiveM Database is a comprehensive guidance tool designed specifically for server owners and resource developers in the FiveM community.
          </CardDescription>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 leading-relaxed">
              We are a dedicated team of people who care deeply about the FiveM platform and are committed to ensuring it remains safe and enjoyable for everyone in the community.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              Our Approach
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 leading-relaxed">
              We work on manually adding blacklists into our system and fine-tuning our automation system that searches resources for possible IP/COC violations.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="border-green-500/20 bg-gradient-to-r from-green-500/10 to-teal-500/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-400" />
            Platform Safety
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/80 leading-relaxed">
            Our goal is to help developers have an easier time protecting their servers, ensure compliance with Terms of Service and Code of Conduct, and maintain a fun, safe environment for all users.
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const renderHowToUse = () => (
    <div className="space-y-8">
      <Card className="border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-purple-400" />
            How to Use FiveM Database
          </CardTitle>
          <CardDescription className="text-white/80 text-lg">
            Our platform is designed to be simple and effective. Here's everything you need to know to get started.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-3">
            <Code className="w-5 h-5 text-blue-400" />
            Resource Checker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
            <h4 className="font-semibold text-blue-400 mb-4">Simple 3-Step Process:</h4>
            <div className="space-y-4">
              {[
                "Copy the link of the resource you want to check",
                "Paste the link into our checker",
                "Press 'Check' and get instant results!"
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-white/80">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Possible Flags & What They Mean
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {flagTypes.map((flag, index) => (
                <Card key={index} className={`${flag.color} border`}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold">{flag.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs text-white/80">{flag.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTools = () => (
    <div className="space-y-8">
      <Card className="border-green-500/20 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-3">
            <Code className="w-6 h-6 text-green-400" />
            Our Tools & Features
          </CardTitle>
          <CardDescription className="text-white/80 text-lg">
            Discover the powerful tools we've built to keep the FiveM community safe and compliant.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              <Database className="w-5 h-5 text-blue-400" />
              Resource Checker
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-white/80">Our Resource Checker scans links across the entire internet using our advanced detection system.</p>
            
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-3">Features:</h4>
              <div className="space-y-2">
                {[
                  "Automatic flag detection",
                  "Manual blacklist verification", 
                  "Real-time scanning",
                  "Comprehensive coverage"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              <Users className="w-5 h-5 text-purple-400" />
              5DB Discord Bot
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <p className="text-white/80 mb-3">Our Discord bot is currently in <strong>re-development</strong>. We are completely rewriting the bot to improve functionality and performance.</p>
              <p className="text-white/60 text-sm"><em>Note: There is no planned re-release date at this time.</em></p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              <Target className="w-5 h-5 text-green-400" />
              Report Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-white/80">A comprehensive collection of all reports created and submitted throughout our entire team.</p>
            
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-green-400 mb-3">Public Transparency:</h4>
              <div className="space-y-2">
                {[
                  "Shows accuracy of our reporting system",
                  "Displays percentage of properly handled reports",
                  "Tracks CFX's response to our submissions",
                  "Provides community accountability"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span className="text-white/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              <Shield className="w-5 h-5 text-orange-400" />
              Advanced Detection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 mb-4">Our detection system combines both automatic flags and manual blacklists for comprehensive protection.</p>
            
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-orange-400 mb-1">5,000+</div>
                  <div className="text-white/60 text-sm">Automatic Flags</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-orange-400 mb-1">150+</div>
                  <div className="text-white/60 text-sm">Manual Flags</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="space-y-8">
      <Card className="border-pink-500/20 bg-gradient-to-r from-pink-500/10 to-purple-500/10">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-3">
            <Mail className="w-6 h-6 text-pink-400" />
            Contact & Support
          </CardTitle>
          <CardDescription className="text-white/80 text-lg">
            Need help or have questions? We're here to assist you through multiple channels.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              <Users className="w-5 h-5 text-purple-400" />
              Discord Community
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-white/80">Join our active Discord community for real-time support, discussions, and updates.</p>
            <Button asChild className="bg-purple-500 hover:bg-purple-600">
              <a href="https://discord.fivemdb.online" className="flex items-center gap-2">
                Join Discord <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-400" />
              Email Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-white/80">For formal inquiries or detailed support requests, reach out via email.</p>
            <Button asChild variant="outline">
              <a href="mailto:sophia@zwrks.com" className="flex items-center gap-2">
                Email Us <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-teal-500/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-teal-400" />
            General Inquiries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/80">
            For any general questions or inquiries, we will redirect you to our Discord community where our team and community members can provide the best assistance.
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const renderWhyUse = () => (
    <div className="space-y-8">
      <Card className="border-teal-500/20 bg-gradient-to-r from-teal-500/10 to-green-500/10">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-3">
            <Target className="w-6 h-6 text-teal-400" />
            Why Choose FiveM Database?
          </CardTitle>
          <CardDescription className="text-white/80 text-lg">
            Discover what sets us apart from other tools and why thousands trust us for their FiveM security needs.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="space-y-6">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-3 mb-4">
              <Database className="w-5 h-5 text-blue-400" />
              Advanced Resource Checker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
              <p className="text-white/90 mb-6">Our resource checker works entirely differently compared to other tools like Warden. Here's what makes us unique:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-400 mb-3">Our Approach:</h4>
                  <div className="space-y-2">
                    {[
                      "Manual blacklist verification",
                      "Automatic detection system", 
                      "Comprehensive link analysis",
                      "Real-time updates"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span className="text-white/80 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-400 mb-3">Our Database:</h4>
                  <div className="space-y-2">
                    {[
                      "5,000+ automatic flags",
                      "150+ manual flags",
                      "Constantly expanding", 
                      "Community-driven updates"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span className="text-white/80 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-green-400" />
              Developer-Focused Care
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
              <p className="text-white/90">We are a community of creators, server owners, and community members who genuinely care about YOU as creators, server owners, and players. Your safety and success are our top priorities on this platform.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-purple-400" />
              Safety-First Approach
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-6 space-y-4">
              <p className="text-white/90">FiveM has been an amazing platform for over 9 years. Our founder has experienced the platform's growth and evolution, witnessing how player and creator safety has changed over time.</p>
              <div className="bg-purple-600/10 rounded-lg p-4">
                <p className="text-white/80 text-sm">We aim to make the biggest impact on platform safety by publicly listing issues and their related problems. At FiveM DB, your safety is our biggest priority.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-orange-400" />
              Community Backing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-6 space-y-4">
              <p className="text-white/90">We are backed by many creators on the platform who support our work. These creators actively work on our platform and care to see continuous improvement in the FiveM ecosystem.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Trusted", subtitle: "by the community" },
                  { label: "Supported", subtitle: "by creators" },
                  { label: "Focused", subtitle: "on improvement" }
                ].map((item, index) => (
                  <div key={index} className="bg-orange-600/10 p-3 rounded-lg text-center">
                    <div className="font-bold text-orange-400 mb-1">{item.label}</div>
                    <div className="text-white/60 text-xs">{item.subtitle}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderPartnership = () => (
    <div className="space-y-8">
      <Card className="border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-3">
            <Users className="w-6 h-6 text-indigo-400" />
            Partnership & Collaboration
          </CardTitle>
          <CardDescription className="text-white/80 text-lg">
            Join our mission to make FiveM safer. Learn about our partnership programs and collaboration opportunities.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-blue-400" />
              Partners
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
              <h4 className="font-semibold text-blue-400 mb-4">What Partners Get:</h4>
              <div className="space-y-3">
                {[
                  "Creator channels in our Discord with @here ping privileges",
                  "Featured creator store on the FiveM DB website",
                  "Direct support and backing from our team", 
                  "Collaborative project opportunities"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Requirements:</h4>
              <p className="text-white/80 text-sm">Partners must have us as a channel in their Discord server to maintain the partnership.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-green-400" />
              Recommended Creators
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
              <h4 className="font-semibold text-green-400 mb-4">What Recommended Creators Get:</h4>
              <div className="space-y-3">
                {[
                  "Featured creator store on the FiveM DB website",
                  "Direct support and backing from our team",
                  "Collaborative project opportunities",
                  "Community recognition and promotion"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
              <h4 className="font-semibold text-green-400 mb-2">Selection Process:</h4>
              <p className="text-white/80 text-sm">Recommended creators are specifically contacted and invited by our team based on their contributions to the community.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-3 mb-4">
            <Code className="w-5 h-5 text-purple-400" />
            Join Our Team
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-purple-400 mb-4">Opportunities Available:</h4>
                <div className="space-y-2">
                  {[
                    "Content Moderation",
                    "Community Management", 
                    "Technical Development",
                    "Research & Analysis"
                  ].map((opportunity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                      <span className="text-white/80 text-sm">{opportunity}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-purple-400 mb-4">How to Apply:</h4>
                <p className="text-white/80 mb-4 text-sm">Working with our team requires you to message Sophia directly in our Discord server.</p>
                <Button asChild className="bg-purple-500 hover:bg-purple-600">
                  <a href="https://discord.fivemdb.online" className="flex items-center gap-2 text-sm">
                    Contact Sophia <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "what-is": return renderWhatIs();
      case "how-to-use": return renderHowToUse();
      case "tools": return renderTools();
      case "contact": return renderContact();
      case "why-use": return renderWhyUse();
      case "how-to-work": return renderPartnership();
      default: return renderWhatIs();
    }
  };

  return (
    <Layout title="Documentation - FiveM DB" description="Complete documentation for FiveM Database">
      <div 
        className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.15) 0%, transparent 50%)
          `
        }}
      >
        <div className="relative z-10 pt-32 px-4 md:px-6 pb-16">
          <div className="container mx-auto max-w-7xl">
            {/* Header Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-display mb-8 text-gradient animate-fade-in">
                <span className="font-bold">Documentation</span>
              </h1>
              <p className="text-white/70 mb-10 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
                Everything you need to know about FiveM Database and how to use our platform effectively to keep your FiveM community safe and compliant.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg px-6 py-3">
                  <span className="text-blue-400 font-semibold">5,000+</span>
                  <span className="text-white/60 ml-2">Auto Flags</span>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-6 py-3">
                  <span className="text-green-400 font-semibold">150+</span>
                  <span className="text-white/60 ml-2">Manual Flags</span>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg px-6 py-3">
                  <span className="text-purple-400 font-semibold">24/7</span>
                  <span className="text-white/60 ml-2">Monitoring</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
              {/* Sidebar */}
              <div className="xl:col-span-1">
                <Card className="border-white/10 bg-white/5 sticky top-32">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Book className="w-5 h-5 text-blue-400" />
                      Table of Contents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <nav className="space-y-2">
                      {DOCUMENTATION_SECTIONS.map((section, index) => (
                        <button
                          key={section.id}
                          onClick={() => setActiveSection(section.id)}
                          className={`w-full text-left p-4 rounded-lg transition-all duration-300 flex items-center gap-3 group ${
                            activeSection === section.id
                              ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-white shadow-lg'
                              : 'text-white/70 hover:bg-white/5 hover:text-white border border-transparent hover:border-white/10'
                          }`}
                        >
                          <div className={`p-2 rounded-lg flex-shrink-0 ${
                            activeSection === section.id 
                              ? 'bg-blue-500/20' 
                              : 'bg-white/5 group-hover:bg-white/10'
                          }`}>
                            <section.icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate leading-relaxed">{section.title}</div>
                            <div className="text-xs text-white/50 mt-1">{section.description}</div>
                          </div>
                        </button>
                      ))}
                    </nav>
                  </CardContent>
                </Card>
              </div>

              {/* Content */}
              <div className="xl:col-span-3">
                <div className="min-h-[600px]">
                  {renderContent()}
                </div>
                
                {/* Footer Navigation */}
                <div className="flex justify-between items-center mt-10 pt-8 border-t border-white/10">
                  <Button
                    onClick={() => {
                      const currentIndex = DOCUMENTATION_SECTIONS.findIndex(s => s.id === activeSection);
                      if (currentIndex > 0) {
                        setActiveSection(DOCUMENTATION_SECTIONS[currentIndex - 1].id);
                      }
                    }}
                    disabled={DOCUMENTATION_SECTIONS.findIndex(s => s.id === activeSection) === 0}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    ← Previous
                  </Button>
                  
                  <span className="text-white/50 text-sm">
                    {DOCUMENTATION_SECTIONS.findIndex(s => s.id === activeSection) + 1} of {DOCUMENTATION_SECTIONS.length}
                  </span>
                  
                  <Button
                    onClick={() => {
                      const currentIndex = DOCUMENTATION_SECTIONS.findIndex(s => s.id === activeSection);
                      if (currentIndex < DOCUMENTATION_SECTIONS.length - 1) {
                        setActiveSection(DOCUMENTATION_SECTIONS[currentIndex + 1].id);
                      }
                    }}
                    disabled={DOCUMENTATION_SECTIONS.findIndex(s => s.id === activeSection) === DOCUMENTATION_SECTIONS.length - 1}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    Next →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Documentation;
