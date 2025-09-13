import { SearchCheck, Shield, BarChart3, Users, FileText, ExternalLink, Heart, Star, Zap, ChevronRight, Globe, Lock, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PlatformStatsGrid from "@/components/PlatformStatsGrid";
import CreatorCarousel from "@/components/CreatorCarousel";

const Home = () => {
  const mainActions = [
    {
      title: "Resource Checker",
      description: "Instantly verify FiveM resource safety and security",
      icon: SearchCheck,
      path: "/resource-checker",
      gradient: "from-orange-600 to-red-600",
      shadowColor: "shadow-orange-500/25",
      featured: true
    },
    {
      title: "Server Checker", 
      description: "Monitor server status and performance in real-time",
      icon: Shield,
      path: "/server-checker",
      gradient: "from-blue-600 to-cyan-600",
      shadowColor: "shadow-blue-500/25",
      featured: true
    }
  ];

  const quickTools = [
    {
      title: "Browse Reports",
      description: "Explore community findings and security reports",
      icon: FileText,
      path: "/reports",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    },
    {
      title: "Analytics Dashboard",
      description: "View comprehensive security statistics",
      icon: BarChart3,
      path: "/report-stats",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    }
  ];

  const platformFeatures = [
    {
      title: "Community Driven",
      description: "Built by developers, for developers. Every security check helps protect the entire FiveM ecosystem.",
      icon: Users,
      gradient: "from-orange-500/20 to-red-500/20"
    },
    {
      title: "Real-Time Security",
      description: "Advanced threat detection systems monitor malicious resources and servers around the clock.",
      icon: Shield,
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Trusted Network",
      description: "Join thousands of server owners who rely on our comprehensive security platform daily.",
      icon: Star,
      gradient: "from-purple-500/20 to-pink-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white w-full overflow-x-hidden">
      {/* Creator Carousel Section */}
      <section className="py-8 md:py-12 px-4 bg-gradient-to-b from-gray-900/20 to-transparent">
        <div className="responsive-container">
          <CreatorCarousel />
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-blue-500/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="responsive-container relative z-10">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <img 
                  src="https://cdn.laurelnwk.com/FiveDB_Transparent.png" 
                  alt="FiveMDB Logo" 
                  className="h-16 w-auto hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute -inset-4 bg-orange-500/20 rounded-full blur-xl -z-10" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                FiveM DB
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              The most comprehensive security platform for FiveM resources and servers, 
              <span className="text-orange-400 font-semibold"> powered by community intelligence</span>
            </p>
            
            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              {mainActions.map((action, index) => (
                <Button 
                  key={index}
                  asChild 
                  size="lg" 
                  className={`bg-gradient-to-r ${action.gradient} hover:scale-105 text-white font-semibold px-8 py-6 text-lg rounded-2xl ${action.shadowColor} shadow-2xl transition-all duration-300 group relative overflow-hidden`}
                >
                  <Link to={action.path}>
                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <action.icon className="mr-3 h-6 w-6 relative z-10" />
                    <span className="relative z-10">{action.title}</span>
                    <ChevronRight className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              ))}
            </div>
            
            <Badge variant="outline" className="border-orange-400 text-orange-400 text-sm px-6 py-2 bg-orange-500/10 backdrop-blur-sm">
              <Zap className="mr-2 h-4 w-4" />
              Live Security Monitoring Active
            </Badge>
          </div>
        </div>
      </section>

      {/* Platform Statistics */}
      <PlatformStatsGrid />

      {/* Quick Tools Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="responsive-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Security Tools
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive tools for FiveM security analysis and monitoring
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {quickTools.map((tool, index) => (
              <Card key={index} className={`${tool.bgColor} border ${tool.borderColor} hover:border-orange-500/30 transition-all duration-300 hover:scale-102 group`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-2xl ${tool.bgColor} border ${tool.borderColor}`}>
                      <tool.icon className={`h-8 w-8 ${tool.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-white group-hover:text-orange-300 transition-colors">
                        {tool.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400 mt-2">
                        {tool.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-black transition-all duration-300">
                    <Link to={tool.path}>
                      Access Tool
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-transparent to-gray-900/30">
        <div className="responsive-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Why Choose FiveM DB
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The most trusted security platform in the FiveM community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {platformFeatures.map((feature, index) => (
              <Card key={index} className={`bg-gradient-to-br ${feature.gradient} border-gray-800 hover:border-orange-500/30 transition-all duration-500 hover:scale-105 text-center group relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative z-10">
                  <div className="flex justify-center mb-6">
                    <div className="p-6 bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-gray-700 group-hover:border-orange-500/30 transition-colors duration-500">
                      <feature.icon className="h-12 w-12 text-orange-400" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-white mb-4 group-hover:text-orange-300 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-gray-400 leading-relaxed text-base">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Network Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="responsive-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Community Network
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Connect with verified creators and trusted partners
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800 hover:border-orange-500/30 transition-all duration-300 hover:scale-102 group">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-orange-500/20 rounded-2xl">
                    <Star className="h-8 w-8 text-orange-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-white group-hover:text-orange-300 transition-colors">
                      Creator Partners
                    </CardTitle>
                    <CardDescription className="text-gray-400 mt-2">
                      Discover verified content creators in our trusted network
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-black transition-all duration-300">
                  <Link to="/creator-partners">
                    Explore Partners
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800 hover:border-orange-500/30 transition-all duration-300 hover:scale-102 group">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-blue-500/20 rounded-2xl">
                    <UserCheck className="h-8 w-8 text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-white group-hover:text-blue-300 transition-colors">
                      Recommended Creators
                    </CardTitle>
                    <CardDescription className="text-gray-400 mt-2">
                      Find top-rated creators for your next project
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-black transition-all duration-300">
                  <Link to="/recommended-creators">
                    View Creators
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-orange-500/10 via-transparent to-blue-500/10 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
        
        <div className="responsive-container text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Secure Your FiveM Experience
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of server owners and developers who trust FiveM DB 
            <span className="text-orange-400 font-semibold"> for comprehensive security solutions</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-12 py-6 text-lg rounded-2xl shadow-2xl shadow-orange-500/25 hover:scale-105 transition-all duration-300">
              <a href="https://discord.fivemdb.online" target="_blank" rel="noopener noreferrer">
                <Shield className="mr-3 h-6 w-6" />
                Join Discord Community
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-black font-semibold px-12 py-6 text-lg rounded-2xl transition-all duration-300 hover:scale-105">
              <Link to="/donate">
                <Heart className="mr-3 h-6 w-6" />
                Support the Platform
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
