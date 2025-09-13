
import { useState } from "react";
import { Shield, Search, ExternalLink, ShieldAlert, ShieldCheck, ArrowRight, CheckCircle, Star, Zap, Globe, Lock, ChartBar, HeartHandshake, BookUser } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useResourceStats } from "@/hooks/useResourceStats";

const Home = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const { stats, loading } = useResourceStats();

  const features = [
    {
      icon: ChartBar,
      title: "Report Statistics",
      description: "View our Live Statistics from Clean & Detected searches To Our Server Reports & More!",
      link: "/report-stats",
      color: "from-blue-500 to-indigo-600",
      highlight: "Live Statistics"
    },
    {
      icon: HeartHandshake, 
      title: "Our Partners",
      description: "View a list of Our FiveM Partners (Creators)",
      link: "/creator-partners",
      color: "from-blue-500 to-indigo-600",
      highlight: "Partners!!"
    },
    {
      icon: Search,
      title: "Resource Checker",
      description: "You can use this tool on all links, discords, discord ID's and more!! This Features our Leading Automation system to Detect TOS//COC Violations for Resources & Links!",
      link: "/resource-checker",
      color: "from-blue-500 to-indigo-600",
      highlight: "Resource Checker!"
    },
    {
      icon: HeartHandshake,
      title: "Recommended Creators",
      description: "Here you can find OUR Recomended & Affiliated Creators.",
      link: "/recommended-creators",
      color: "from-blue-500 to-indigo-600",
      highlight: "Recommended Creators"
    },
    {
      icon: BookUser,
      title: "Documentation",
      description: "This is our Documentation, You can use this to understand what all the flags on our website and understand each of the tools and find out more about our preject.",
      link: "/documentation",
      color: "from-blue-500 to-indigo-600",
      highlight: "Documentation"
    },
    {
      icon: HeartHandshake,
      title: "Partnered Frameworks",
      description: "Here you can Find the Frameworks that Back our Work and our Project!",
      link: "/Frameworks",
      color: "from-blue-500 to-indigo-600",
      highlight: "Partnered Frameworks"
    },
  ];

  const statsData = [
    { 
      label: "Clean Searches", 
      value: loading ? "..." : stats.cleanSearches.toLocaleString(),
      description: "Resources verified as safe",
      icon: ShieldCheck,
      color: "from-green-400 to-emerald-500",
      percentage: loading ? 0 : Math.round((stats.cleanSearches / stats.totalSearches) * 100)
    },
    { 
      label: "Blacklisted Searches", 
      value: loading ? "..." : stats.blacklistedSearches.toLocaleString(),
      description: "Flagged resources detected",
      icon: ShieldAlert,
      color: "from-red-400 to-pink-500",
      percentage: loading ? 0 : Math.round((stats.blacklistedSearches / stats.totalSearches) * 100)
    },
    { 
      label: "Resources Checked", 
      value: loading ? "..." : stats.totalSearches.toLocaleString(),
      description: "Total verification requests",
      icon: Search,
      color: "from-blue-400 to-indigo-500",
      percentage: 100
    }
  ];

  const safetyFeatures = [
    // { icon: Lock, text: "Intellectual Detection Tool's", color: "text-blue-400" },
    { icon: Shield, text: "FiveM Terms of Service Compliance", color: "text-green-400" },
    { icon: Zap, text: "Code of Conduct Violation Detection", color: "text-yellow-400" },
    { icon: Globe, text: "Unauthorized Marketplace Monitoring", color: "text-purple-400" }
  ];

  const trustIndicators = [
    { number: "Daily Updates!", label: "", description: "" },
    { number: "99.9%", label: "Uptime", description: "Reliable service" },
    { number: "15,000+", label: "Daily Checks", description: "Active verification" },
    { number: "5★", label: "Community Rating", description: "Trusted by users" }
  ];

  return (
    <Layout title="FiveM DB - Community Driven Reports Database" description="FiveM DB is a community-driven reports database for the FiveM ecosystem, helping server owners and developers stay compliant and safe.">
      <div className="min-h-screen overflow-hidden">
        {/* Enhanced Hero Section with Interactive Elements */}
        <section className="relative pt-20 md:pt-28 lg:pt-36 pb-20 md:pb-28 px-4 md:px-6">
          <div className="container mx-auto text-center relative z-10 max-w-7xl">
            <div className="animate-fade-in">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 text-sm text-white/90">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                Trusted by 1,000+ FiveM Communities
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-display font-bold mb-6 md:mb-8 leading-tight">
                Safeguarding the
                <br />
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent animate-pulse">
                  FiveM Ecosystem
                </span>
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl text-white/80 mb-8 md:mb-12 max-w-5xl mx-auto leading-relaxed px-4">
                The most comprehensive community-driven safety database for FiveM. 
                Protect your server with real-time verification, detailed analytics, 
                and trusted community insights.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-4 mb-12">
                <Button asChild size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 md:px-12 py-4 text-lg md:text-xl w-full sm:w-auto shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
                  <Link to="/resource-checker">
                    Start Checking Resources <ArrowRight className="ml-3 h-5 w-5 md:h-6 md:w-6" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8 md:px-12 py-4 text-lg md:text-xl w-full sm:w-auto border-white/30 hover:bg-white/10 backdrop-blur-sm">
                  <Link to="/reports">
                    Explore Reports
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
                {trustIndicators.map((indicator, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">{indicator.number}</div>
                    <div className="text-sm md:text-base text-white/80 font-medium">{indicator.label}</div>
                    <div className="text-xs md:text-sm text-white/60">{indicator.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Enhanced Background Elements */}
          <div className="absolute top-0 right-0 w-96 md:w-[500px] h-96 md:h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 md:w-[500px] h-96 md:h-[500px] bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </section>

        {/* Enhanced Stats Section with Interactive Cards */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-transparent to-white/5">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 md:mb-6 text-white">
                Real-time Security
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Intelligence</span>
              </h2>
              <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                Live statistics powered by our community-driven verification system
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {statsData.map((stat, index) => (
                <Card 
                  key={index} 
                  className={`text-center border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 hover:scale-105 group cursor-pointer relative overflow-hidden ${
                    hoveredStat === index ? 'shadow-2xl' : ''
                  }`}
                  onMouseEnter={() => setHoveredStat(index)}
                  onMouseLeave={() => setHoveredStat(null)}
                >
                  <CardContent className="pt-8 pb-8 relative z-10">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.value}
                    </div>
                    <div className="text-white font-semibold text-lg mb-2">{stat.label}</div>
                    <div className="text-white/60 text-sm mb-4">{stat.description}</div>
                    {!loading && (
                      <div className="text-xs text-white/50">
                        {stat.percentage}% of total checks
                      </div>
                    )}
                  </CardContent>
                  
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section className="py-20 md:py-28 px-4 md:px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-display font-bold mb-6 md:mb-8 text-white">
                Comprehensive Security
                <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent"> Arsenal</span>
              </h2>
              <p className="text-white/70 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
                Advanced tools and features designed to keep your FiveM community safe, 
                compliant, and thriving with cutting-edge protection mechanisms
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className="group cursor-pointer border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl relative overflow-hidden"
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <CardHeader className="pb-4 relative z-10">
                    {feature.highlight && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                        {feature.highlight}
                      </div>
                    )}
                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <feature.icon className="h-7 w-7 md:h-8 md:w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl md:text-2xl text-white group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-200 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-white/70 mb-6 text-base md:text-lg leading-relaxed">
                      {feature.description}
                    </CardDescription>
                    <Button asChild variant="ghost" className="p-0 h-auto text-indigo-400 hover:text-indigo-300 text-base md:text-lg group/button">
                      <Link to={feature.link} className="flex items-center gap-3">
                        Explore This Page!
                        <ExternalLink className={`h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 ${hoveredFeature === index ? 'translate-x-1' : ''} group-hover/button:translate-x-1`} />
                      </Link>
                    </Button>
                  </CardContent>
                  
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Safety Features Section */}
        <section className="py-20 md:py-28 px-4 md:px-6 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 md:mb-8 text-white">
                Advanced Protection
                <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent"> Features</span>
              </h2>
              <p className="text-white/70 text-lg md:text-xl mb-8 leading-relaxed max-w-5xl mx-auto">
                Our comprehensive detection system monitors for various types of violations and safety concerns,
                providing multiple layers of protection for your FiveM community with industry-leading accuracy.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {safetyFeatures.map((feature, index) => (
                <div key={index} className="group">
                  <div className="flex items-center gap-4 p-6 md:p-8 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 hover:scale-105 cursor-pointer">
                    <div className={`p-3 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors duration-300`}>
                      <feature.icon className={`h-6 w-6 md:h-7 md:w-7 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    <span className="text-white/80 group-hover:text-white text-sm md:text-base font-medium leading-relaxed flex-1">{feature.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-20 md:py-28 px-4 md:px-6">
          <div className="container mx-auto text-center max-w-6xl">
            <Card className="border-white/5 bg-gradient-to-br from-indigo-700/5 via-purple-700/5 to-pink-700/5 backdrop-blur-sm overflow-hidden relative">
              <CardContent className="pt-16 md:pt-20 pb-16 md:pb-20 px-8 md:px-12 relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 text-sm text-white/90">
                  <Shield className="h-4 w-4 text-green-400" />
                  Join the Protection Revolution
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 md:mb-8 text-white">
                  Ready to Protect Your
                  <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"> FiveM Community?</span>
                </h2>
                
                <p className="text-white/70 text-lg md:text-xl mb-10 md:mb-12 max-w-4xl mx-auto leading-relaxed">
                  Join thousands of server owners and developers who trust FiveM DB 
                  to keep their communities safe, compliant, and thriving with our industry-leading 
                  verification and protection tools.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center max-w-lg mx-auto">
                  <Button asChild size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 md:px-12 py-4 text-lg w-full sm:w-auto shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
                    <Link to="/resource-checker">
                      Get Started Now
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="px-8 md:px-12 py-4 text-lg w-full sm:w-auto border-white/30 hover:bg-white/10 backdrop-blur-sm">
                    <Link to="/documentation">
                      View Documentation
                    </Link>
                  </Button>
                </div>
              </CardContent>
              
              {/* Enhanced background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-pink-500/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
