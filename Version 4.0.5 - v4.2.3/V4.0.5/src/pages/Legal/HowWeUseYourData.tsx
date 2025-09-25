import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Shield, Users, Zap, Eye, Lock } from "lucide-react";

const HowWeUseYourData = () => {
  return (
    <div className="min-h-screen">
      <main className="flex-grow pt-20 md:pt-32 px-4 md:px-6 pb-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3 md:mb-4">
              How We Use Your Data
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              Detailed explanation of our data usage practices
            </p>
            <p className="text-sm text-white/50 mt-4">
              Last updated: January 9th, 2025
            </p>
          </div>

          <div className="space-y-6">
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="h-6 w-6 text-blue-400" />
                  <h2 className="text-xl font-bold text-white">Service Analytics</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-white/70 leading-relaxed">
                    We use anonymized usage data to understand how our services are being used and to improve them:
                  </p>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      Track search volumes and popular queries to optimize our detection systems
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      Monitor tool usage patterns to identify areas for improvement
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      Generate community statistics and transparency reports
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      Identify trending violations and emerging threats
                    </li>
                  </ul>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mt-4">
                    <p className="text-blue-200 text-sm">
                      <strong>Important:</strong> All analytics data is aggregated and anonymized. 
                      We cannot trace specific actions back to individual users.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-green-400" />
                  <h2 className="text-xl font-bold text-white">Security and Fraud Prevention</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-white/70 leading-relaxed">
                    Your data helps us maintain a secure platform and prevent abuse:
                  </p>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      Detect and prevent automated attacks and spam
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      Identify suspicious patterns and potential false reports
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      Protect against unauthorized access and data breaches
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      Maintain rate limits and fair usage policies
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-purple-400" />
                  <h2 className="text-xl font-bold text-white">Community Safety</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-white/70 leading-relaxed">
                    We process data to maintain a safe and compliant FiveM community:
                  </p>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      Verify and investigate reports of policy violations
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      Maintain accurate blacklists for known violators
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      Cross-reference information to identify patterns of abuse
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      Provide transparency through public compliance statistics
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-6 w-6 text-yellow-400" />
                  <h2 className="text-xl font-bold text-white">Service Optimization</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-white/70 leading-relaxed">
                    Usage data helps us continuously improve our platform:
                  </p>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      Optimize search algorithms for better accuracy and speed
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      Identify and fix performance bottlenecks
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      Develop new features based on user needs and behavior
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      Scale infrastructure to handle growing usage
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="h-6 w-6 text-red-400" />
                  <h2 className="text-xl font-bold text-white">Data Minimization</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-white/70 leading-relaxed">
                    We follow strict data minimization principles:
                  </p>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      Collect only data that is necessary for our services
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      Automatically delete data when it's no longer needed
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      Anonymize personal identifiers wherever possible
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      Regularly audit our data usage and retention policies
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="h-6 w-6 text-indigo-400" />
                  <h2 className="text-xl font-bold text-white">Data You Control</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-white/70 leading-relaxed">
                    You have control over certain aspects of your data:
                  </p>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 mt-1">•</span>
                      Choose what information to include in reports you submit
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 mt-1">•</span>
                      Request deletion of personal data (subject to legal requirements)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 mt-1">•</span>
                      Contact us to correct inaccurate information
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 mt-1">•</span>
                      Opt out of certain non-essential data processing
                    </li>
                  </ul>
                  <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4 mt-4">
                    <p className="text-indigo-200 text-sm">
                      <strong>Questions about your data?</strong> Contact us at 
                      <span className="text-indigo-400 ml-1">autumn@fivemdb.online</span> 
                      for assistance with data requests or concerns.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HowWeUseYourData;
