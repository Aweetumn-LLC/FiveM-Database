import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchCheck, Shield, BarChart3, Users, FileText, ExternalLink, Heart, Star, Zap, ChevronRight, Globe, Lock, UserCheck, ArrowRight, Sparkles, Server, Search, AlertCircle, CheckCircle, Loader2, Copy, AlertTriangle, XCircle, MapPin, Network, Building, TrendingUp, TrendingDown, Activity, Hash, User, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [currentScene, setCurrentScene] = useState(1);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    // Start the comparison scene after a brief delay
    const timer = setTimeout(() => {
      setShowComparison(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSceneTransition = () => {
    if (currentScene < 5) {
      setCurrentScene(currentScene + 1);
      setShowComparison(false);
      // Reset comparison for next scene
      setTimeout(() => setShowComparison(true), 1000);
    }
  };

  const handleSkipIntro = () => {
    onComplete();
  };

  const handleEnterV4 = () => {
    onComplete();
  };

  // Old Home Page Content (Simplified)
  const OldHomePage = () => (
    <div className="h-full bg-black text-white overflow-hidden">
      <div className="p-6 text-center">
        <div className="flex justify-center mb-4">
          <img 
            src="https://cdn.velocitynet.work/Logos/5DBv3.1.png" 
            alt="FiveMDB.net" 
            className="h-12 w-auto"
          />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">
          <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            FiveM DB
          </span>
        </h1>
        
        <p className="text-gray-300 mb-6 text-sm leading-relaxed">
          The most comprehensive security platform for FiveM resources
        </p>
        
        <div className="flex flex-col gap-3 mb-4">
          <Button 
            size="sm"
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold px-6 py-2 text-sm rounded-xl"
          >
            <SearchCheck className="mr-2 h-4 w-4" />
            Resource Checker
          </Button>
          <Button 
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold px-6 py-2 text-sm rounded-xl"
          >
            <Shield className="mr-2 h-4 w-4" />
            Server Checker
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Card className="bg-green-500/10 border border-green-500/20 p-3">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-green-400" />
              <span className="text-xs text-white">Reports</span>
            </div>
          </Card>
          <Card className="bg-purple-500/10 border border-purple-500/20 p-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-purple-400" />
              <span className="text-xs text-white">Analytics</span>
            </div>
          </Card>
        </div>

        <Badge variant="outline" className="border-orange-400 text-orange-400 text-xs px-3 py-1 bg-orange-500/10">
          <Zap className="mr-1 h-3 w-3" />
          Live Monitoring
        </Badge>
      </div>
    </div>
  );

  // New Home Page Content (Simplified)
  const NewHomePage = () => (
    <div className="h-full bg-gradient-to-br from-primary/20 via-background to-accent/10 text-foreground overflow-hidden">
      <div className="p-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-4"
        >
          <div className="glass-effect rounded-xl border border-primary/30 p-4 mb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-pink-400" />
              <span className="text-sm font-bold text-gradient">Happy 1 Year</span>
              <Heart className="w-4 h-4 text-pink-400" />
            </div>
          </div>
        </motion.div>
        
        <h1 className="text-4xl font-black mb-4 tracking-tight">
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-300% animate-rainbow-gradient bg-clip-text text-transparent">
            FiveM DB
          </span>
        </h1>
        
        <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
          Community-driven platform for FiveM compliance and security
          <span className="text-primary font-medium block">Protect your community today.</span>
        </p>
        
        <div className="flex flex-col gap-3 mb-4">
          <Button size="sm" className="px-8 py-3 text-sm font-semibold rounded-xl">
            <Shield className="mr-2 h-4 w-4" />
            Start Checking <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="px-8 py-3 text-sm font-semibold rounded-xl">
            Learn More
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-2 mb-4">
          <Card className="bg-card/30 backdrop-blur-xl border-border/50 p-3">
            <div className="flex items-center gap-2 text-left">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-2">
                <SearchCheck className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-xs font-medium">Resource Checker</div>
                <div className="text-xs text-muted-foreground">Advanced compliance scanning</div>
              </div>
            </div>
          </Card>
        </div>

        <Badge variant="outline" className="text-xs px-3 py-1 text-primary border-primary/30 bg-primary/10">
          <Sparkles className="w-3 h-3 mr-1" />
          Community Driven • Trusted Worldwide
        </Badge>
      </div>
    </div>
  );

  // Old Server Checker (Simplified)
  const OldServerChecker = () => (
    <div className="h-full bg-black text-white overflow-hidden p-4">
      <div className="text-center mb-4">
        <Server className="h-6 w-6 text-orange-400 mx-auto mb-2" />
        <h2 className="text-xl font-bold text-orange-400">FiveM Server Checker</h2>
        <p className="text-xs text-gray-400">Basic server information lookup</p>
      </div>
      
      <div className="space-y-3">
        <div className="flex gap-2">
          <Input 
            placeholder="A1B2C3" 
            className="flex-1 bg-gray-800 border-gray-600 text-white text-xs h-8" 
            disabled 
          />
          <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-xs px-3">
            <Search className="h-3 w-3" />
          </Button>
        </div>
        
        <Card className="bg-gray-900 border-gray-700 p-2">
          <div className="text-xs text-gray-400 mb-1">Server Status</div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3 text-green-400" />
            <span className="text-xs">Online - 45/64 Players</span>
          </div>
        </Card>
        
        <div className="grid grid-cols-2 gap-2">
          <Card className="bg-gray-900 border-gray-700 p-2">
            <div className="text-xs text-gray-400">Map</div>
            <div className="text-xs font-medium">Los Santos</div>
          </Card>
          <Card className="bg-gray-900 border-gray-700 p-2">
            <div className="text-xs text-gray-400">Resources</div>
            <div className="text-xs font-medium">127 loaded</div>
          </Card>
        </div>
        
        <div className="text-xs text-gray-500 text-center">
          Basic information only • No resource analysis
        </div>
      </div>
    </div>
  );

  // New Server Checker (Simplified) 
  const NewServerChecker = () => (
    <div className="h-full bg-gradient-to-br from-primary/20 via-background to-accent/10 text-foreground overflow-hidden p-4">
      <div className="text-center mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 p-1.5 mx-auto mb-2">
          <Server className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-lg font-bold">Advanced Server Checker</h2>
        <p className="text-xs text-muted-foreground">Complete analysis with compliance checking</p>
      </div>
      
      <div className="space-y-3">
        <div className="flex gap-2">
          <Input 
            placeholder="A1B2C3" 
            className="flex-1 text-xs h-8" 
            disabled 
          />
          <Button size="sm" className="text-xs px-3">
            <Search className="h-3 w-3 mr-1" />
            Check
          </Button>
        </div>
        
        <Card className="bg-card/30 backdrop-blur-xl border-border/50 p-2">
          <div className="flex items-center justify-between mb-1">
            <div className="text-xs font-medium">Server Status</div>
            <Badge className="text-xs bg-green-600">Online</Badge>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <div className="text-xs">
              <Users className="h-3 w-3 inline mr-1" />
              45/64 Players
              <TrendingUp className="h-2 w-2 inline text-green-400 ml-1" />
            </div>
            <div className="text-xs">
              <Activity className="h-3 w-3 inline mr-1" />
              Changes tracked
            </div>
          </div>
        </Card>
        
        <Card className="bg-yellow-500/10 border-yellow-500/20 p-2">
          <div className="flex items-center gap-1 mb-1">
            <AlertTriangle className="h-3 w-3 text-yellow-400" />
            <span className="text-xs font-medium text-yellow-400">Resource Analysis</span>
          </div>
          <div className="grid grid-cols-3 gap-1 text-xs">
            <div><CheckCircle className="h-2 w-2 inline text-green-400" /> 89 Clean</div>
            <div><AlertTriangle className="h-2 w-2 inline text-yellow-400" /> 3 TOS</div>
            <div><XCircle className="h-2 w-2 inline text-red-400" /> 1 COC</div>
          </div>
        </Card>
        
        <Card className="bg-card/30 backdrop-blur-xl border-border/50 p-2">
          <div className="flex items-center gap-1 mb-1">
            <Network className="h-3 w-3 text-primary" />
            <span className="text-xs font-medium">Network Info</span>
          </div>
          <div className="text-xs text-muted-foreground">
            <MapPin className="h-2 w-2 inline mr-1" />
            Location: US-East • ASN tracked
          </div>
        </Card>
        
        <div className="text-xs text-primary text-center font-medium">
          ✨ Complete analysis • Evidence tracking • Change monitoring
        </div>
      </div>
    </div>
  );

  // Old Resource Checker (Simplified)
  const OldResourceChecker = () => (
    <div className="h-full bg-black text-white overflow-hidden p-4">
      <div className="text-center mb-4">
        <Shield className="h-6 w-6 text-blue-400 mx-auto mb-2" />
        <h2 className="text-xl font-bold text-blue-400">Resource Checker</h2>
        <p className="text-xs text-gray-400">Basic compliance checking</p>
      </div>
      
      <div className="space-y-3">
        <Input 
          placeholder="Enter resource name..." 
          className="bg-gray-800 border-gray-600 text-white text-xs h-8" 
          disabled 
        />
        
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-xs h-8">
          <Search className="h-3 w-3 mr-1" />
          Check Resource
        </Button>
        
        <Card className="bg-green-500/10 border-green-500/20 p-3">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <span className="text-xs font-medium text-green-400">Clean</span>
          </div>
          <p className="text-xs text-gray-300">
            This resource is not in our database - looks good!
          </p>
        </Card>
        
        <div className="grid grid-cols-3 gap-2">
          <Card className="bg-gray-900 border-gray-700 p-2 text-center">
            <Shield className="h-4 w-4 text-blue-400 mx-auto mb-1" />
            <div className="text-xs text-gray-400">TOS Check</div>
          </Card>
          <Card className="bg-gray-900 border-gray-700 p-2 text-center">
            <CheckCircle className="h-4 w-4 text-green-400 mx-auto mb-1" />
            <div className="text-xs text-gray-400">Verification</div>
          </Card>
          <Card className="bg-gray-900 border-gray-700 p-2 text-center">
            <AlertCircle className="h-4 w-4 text-yellow-400 mx-auto mb-1" />
            <div className="text-xs text-gray-400">Risk Check</div>
          </Card>
        </div>
        
        <div className="text-xs text-gray-500 text-center">
          Basic flagging system • Limited analysis
        </div>
      </div>
    </div>
  );

  // New Resource Checker (Simplified)
  const NewResourceChecker = () => (
    <div className="h-full bg-gradient-to-br from-primary/20 via-background to-accent/10 text-foreground overflow-hidden p-4">
      <div className="text-center mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-1.5 mx-auto mb-2">
          <Shield className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-lg font-bold">Advanced Resource Checker</h2>
        <p className="text-xs text-muted-foreground">Multi-format analysis with evidence</p>
      </div>
      
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-1 mb-2">
          <Card className="bg-blue-500/10 border-blue-500/20 p-1.5 text-center">
            <Hash className="h-3 w-3 text-blue-400 mx-auto mb-1" />
            <div className="text-xs text-blue-400">Discord ID</div>
          </Card>
          <Card className="bg-green-500/10 border-green-500/20 p-1.5 text-center">
            <Globe className="h-3 w-3 text-green-400 mx-auto mb-1" />
            <div className="text-xs text-green-400">URL</div>
          </Card>
          <Card className="bg-purple-500/10 border-purple-500/20 p-1.5 text-center">
            <User className="h-3 w-3 text-purple-400 mx-auto mb-1" />
            <div className="text-xs text-purple-400">Creator</div>
          </Card>
        </div>
        
        <Input 
          placeholder="Discord ID, URL, or Creator name..." 
          className="text-xs h-8" 
          disabled 
        />
        
        <Button className="w-full text-xs h-8">
          <Search className="h-3 w-3 mr-1" />
          Advanced Check
        </Button>
        
        <Card className="bg-red-500/10 border-red-500/20 p-2">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <span className="text-xs font-medium text-red-400">Flagged</span>
          </div>
          <div className="text-xs text-muted-foreground mb-2">
            Multiple violations detected with evidence
          </div>
          <div className="space-y-1">
            <div className="flex items-start gap-1">
              <AlertTriangle className="h-2 w-2 text-yellow-400 mt-0.5" />
              <span className="text-xs">IP violation detected</span>
            </div>
            <div className="flex items-start gap-1">
              <XCircle className="h-2 w-2 text-red-400 mt-0.5" />
              <span className="text-xs">Content policy breach</span>
            </div>
          </div>
        </Card>
        
        <Card className="bg-card/30 backdrop-blur-xl border-border/50 p-2">
          <div className="flex items-center gap-1 mb-1">
            <Info className="h-3 w-3 text-primary" />
            <span className="text-xs font-medium">Evidence Available</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Detailed documentation • Screenshots • Links
          </div>
        </Card>
        
        <div className="text-xs text-primary text-center font-medium">
          🎯 Multi-format • Evidence-backed • Comprehensive analysis
        </div>
      </div>
    </div>
  );

  // What's New Section
  const WhatsNewSection = () => (
    <div className="h-full bg-gradient-to-br from-primary/20 via-background to-accent/10 text-foreground overflow-hidden">
      <div className="p-6">
        <div className="text-center mb-6">
          <Sparkles className="w-8 h-8 text-primary mx-auto mb-2" />
          <h2 className="text-2xl font-bold mb-2">WHAT'S NEW</h2>
          <h3 className="text-xl font-bold text-primary">FiveM Database Version 4.0</h3>
        </div>
        
        <div className="space-y-3 max-h-80 overflow-y-auto">
          <Card className="bg-card/30 backdrop-blur-xl border-border/50 p-3">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <Globe className="w-3 h-3 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-1">Complete Website Redesign</h4>
                <p className="text-xs text-muted-foreground">New sidebar navigation theme & blurple (blue & purple) theme return</p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-card/30 backdrop-blur-xl border-border/50 p-3">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                <Shield className="w-3 h-3 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-1">New Blacklisting System</h4>
                <p className="text-xs text-muted-foreground">Store, User, Discord & Server blacklists with evidence</p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-card/30 backdrop-blur-xl border-border/50 p-3">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                <FileText className="w-3 h-3 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-1">Evidence System & CDN</h4>
                <p className="text-xs text-muted-foreground">ZWRKS CDN integration for proof documentation</p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-card/30 backdrop-blur-xl border-border/50 p-3">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                <Star className="w-3 h-3 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-1">Creator Market</h4>
                <p className="text-xs text-muted-foreground">Advertise paid & free FiveM resources on our platform</p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-card/30 backdrop-blur-xl border-border/50 p-3">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-3 h-3 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-1">Public Analytics</h4>
                <p className="text-xs text-muted-foreground">Transparent statistics • 185GB+ of public data</p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-card/30 backdrop-blur-xl border-border/50 p-3">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                <Lock className="w-3 h-3 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-1">Security Updates</h4>
                <p className="text-xs text-muted-foreground">Discord ID auth • EU servers • Enhanced privacy</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Mobile Navigation Controls */}
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={handleSkipIntro}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background/90"
        >
          Skip Intro
        </Button>
        
        {/* Scene Indicators */}
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((scene) => (
            <button
              key={scene}
              onClick={() => {
                setCurrentScene(scene);
                setShowComparison(false);
                setTimeout(() => setShowComparison(true), 500);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentScene === scene 
                  ? 'bg-primary scale-125' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to scene ${scene}`}
            />
          ))}
        </div>
      </div>

      {/* Mobile Continue/Next Button - Fixed Position */}
      {currentScene < 5 && (
        <div className="absolute bottom-4 left-4 right-4 z-10 md:hidden">
          <Button
            onClick={handleSceneTransition}
            size="lg"
            className="w-full py-4 text-lg font-semibold rounded-xl shadow-xl"
          >
            {currentScene === 4 ? 'Ready to Experience v4.0?' : 'Continue'} 
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {currentScene === 1 && (
          <motion.div
            key="scene1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
            className="h-full flex flex-col items-center justify-center p-8"
          >
            <motion.h1 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-center mb-12"
            >
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Evolution of FiveM DB
              </span>
            </motion.h1>

            {showComparison && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex flex-col md:flex-row gap-8 max-w-6xl w-full mb-12"
              >
                {/* Old Version */}
                <div className="flex-1">
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-center mb-4"
                  >
                    <Badge variant="outline" className="mb-2 text-orange-400 border-orange-400">
                      Version 3.0 - Old
                    </Badge>
                    <h3 className="text-xl font-semibold text-muted-foreground">Previous Design</h3>
                  </motion.div>
                  <motion.div
                    initial={{ rotateY: -15, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="bg-black border-2 border-orange-500/30 rounded-2xl h-96 transform perspective-1000 shadow-2xl"
                  >
                    <OldHomePage />
                  </motion.div>
                </div>

                {/* VS Divider */}
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="flex items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    VS
                  </div>
                </motion.div>

                {/* New Version */}
                <div className="flex-1">
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-center mb-4"
                  >
                    <Badge variant="outline" className="mb-2 text-primary border-primary">
                      Version 4.0 - New
                    </Badge>
                    <h3 className="text-xl font-semibold">Modern Design</h3>
                  </motion.div>
                  <motion.div
                    initial={{ rotateY: 15, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="border-2 border-primary/30 rounded-2xl h-96 transform perspective-1000 shadow-2xl shadow-primary/20"
                  >
                    <NewHomePage />
                  </motion.div>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="hidden md:block"
            >
              <Button 
                onClick={handleSceneTransition}
                size="lg"
                className="px-12 py-6 text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-primary/20 transition-all duration-300"
              >
                Continue <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </motion.div>
          </motion.div>
        )}

        {currentScene === 2 && (
          <motion.div
            key="scene2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
            className="h-full flex flex-col items-center justify-center p-8"
          >
            <motion.h1 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-center mb-12"
            >
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Server Checker Evolution
              </span>
            </motion.h1>

            {showComparison && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex flex-col md:flex-row gap-8 max-w-6xl w-full mb-12"
              >
                {/* Old Server Checker */}
                <div className="flex-1">
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-center mb-4"
                  >
                    <Badge variant="outline" className="mb-2 text-orange-400 border-orange-400">
                      Version 3.0 - Basic
                    </Badge>
                    <h3 className="text-xl font-semibold text-muted-foreground">Simple Server Lookup</h3>
                  </motion.div>
                  <motion.div
                    initial={{ rotateY: -15, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="bg-black border-2 border-orange-500/30 rounded-2xl h-96 transform perspective-1000 shadow-2xl"
                  >
                    <OldServerChecker />
                  </motion.div>
                </div>

                {/* VS Divider */}
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="flex items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    VS
                  </div>
                </motion.div>

                {/* New Server Checker */}
                <div className="flex-1">
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-center mb-4"
                  >
                    <Badge variant="outline" className="mb-2 text-primary border-primary">
                      Version 4.0 - Advanced
                    </Badge>
                    <h3 className="text-xl font-semibold">Complete Analysis</h3>
                  </motion.div>
                  <motion.div
                    initial={{ rotateY: 15, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="border-2 border-primary/30 rounded-2xl h-96 transform perspective-1000 shadow-2xl shadow-primary/20"
                  >
                    <NewServerChecker />
                  </motion.div>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="hidden md:block"
            >
              <Button 
                onClick={handleSceneTransition}
                size="lg"
                className="px-12 py-6 text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-primary/20 transition-all duration-300"
              >
                Continue <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </motion.div>
          </motion.div>
        )}

        {currentScene === 3 && (
          <motion.div
            key="scene3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
            className="h-full flex flex-col items-center justify-center p-8"
          >
            <motion.h1 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-center mb-12"
            >
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Resource Checker Evolution
              </span>
            </motion.h1>

            {showComparison && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex flex-col md:flex-row gap-8 max-w-6xl w-full mb-12"
              >
                {/* Old Resource Checker */}
                <div className="flex-1">
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-center mb-4"
                  >
                    <Badge variant="outline" className="mb-2 text-blue-400 border-blue-400">
                      Version 3.0 - Basic
                    </Badge>
                    <h3 className="text-xl font-semibold text-muted-foreground">Simple Flagging</h3>
                  </motion.div>
                  <motion.div
                    initial={{ rotateY: -15, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="bg-black border-2 border-blue-500/30 rounded-2xl h-96 transform perspective-1000 shadow-2xl"
                  >
                    <OldResourceChecker />
                  </motion.div>
                </div>

                {/* VS Divider */}
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="flex items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    VS
                  </div>
                </motion.div>

                {/* New Resource Checker */}
                <div className="flex-1">
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-center mb-4"
                  >
                    <Badge variant="outline" className="mb-2 text-primary border-primary">
                      Version 4.0 - Advanced
                    </Badge>
                    <h3 className="text-xl font-semibold">Multi-Format Analysis</h3>
                  </motion.div>
                  <motion.div
                    initial={{ rotateY: 15, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="border-2 border-primary/30 rounded-2xl h-96 transform perspective-1000 shadow-2xl shadow-primary/20"
                  >
                    <NewResourceChecker />
                  </motion.div>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="hidden md:block"
            >
              <Button 
                onClick={handleSceneTransition}
                size="lg"
                className="px-12 py-6 text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-primary/20 transition-all duration-300"
              >
                Continue <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </motion.div>
          </motion.div>
        )}

        {currentScene === 4 && (
          <motion.div
            key="scene4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
            className="h-full flex flex-col items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="max-w-4xl w-full"
            >
              <div className="glass-effect rounded-3xl border border-primary/30 p-8 shadow-2xl shadow-primary/20">
                <WhatsNewSection />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="mt-8 hidden md:block"
            >
              <Button 
                onClick={handleSceneTransition}
                size="lg"
                className="px-12 py-6 text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-primary/20 transition-all duration-300"
              >
                Ready to Experience v4.0? <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </motion.div>
          </motion.div>
        )}

        {currentScene === 5 && (
          <motion.div
            key="scene2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="h-full flex flex-col items-center justify-center p-8 relative overflow-hidden"
          >
            {/* Animated Background */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-3xl opacity-60" 
              />
              <motion.div 
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  rotate: [360, 180, 0]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: 2
                }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-accent/30 to-primary/30 rounded-full blur-3xl opacity-60" 
              />
            </div>

            <div className="relative z-10 text-center">
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mb-12"
              >
                <Sparkles className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse" />
                <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
                  Are you ready for
                </h1>
                <h2 className="text-6xl md:text-8xl font-black mb-8">
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-300% animate-rainbow-gradient bg-clip-text text-transparent">
                    FiveM DB v4.0?
                  </span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="relative mb-8"
              >
                {/* Pulsing Circle */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0 0 0 hsl(var(--primary) / 0.4)",
                      "0 0 0 20px hsl(var(--primary) / 0)",
                      "0 0 0 0 hsl(var(--primary) / 0)"
                    ]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-32 h-32 mx-auto bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 shadow-2xl shadow-primary/50 touch-manipulation"
                  onClick={handleEnterV4}
                >
                  <ArrowRight className="w-12 h-12 text-white" />
                </motion.div>

                {/* Arrow Pointer */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                  className="absolute -right-32 top-1/2 transform -translate-y-1/2 hidden md:block"
                >
                  <div className="flex items-center gap-4">
                    <ArrowRight className="w-8 h-8 text-primary animate-bounce" />
                    <div className="text-left">
                      <div className="text-lg font-bold text-primary">CLICK HERE</div>
                      <div className="text-sm text-muted-foreground">ENTER FIVEM DATABASE</div>
                      <div className="text-sm text-muted-foreground">VERSION 4.0</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Mobile instruction */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 2 }}
                className="md:hidden pb-20"
              >
                <p className="text-lg text-muted-foreground mb-4">Tap the circle to enter</p>
                <div className="text-primary font-bold">FIVEM DATABASE VERSION 4.0</div>
              </motion.div>

              {/* Alternative mobile button */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 2.5 }}
                className="md:hidden fixed bottom-4 left-4 right-4"
              >
                <Button 
                  onClick={handleEnterV4}
                  size="lg"
                  className="w-full py-4 text-lg font-semibold rounded-xl shadow-2xl"
                >
                  Enter FiveM Database v4.0 <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntroAnimation;