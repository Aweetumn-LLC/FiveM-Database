
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Shield, AlertCircle, CheckCircle } from "lucide-react";
import { Helmet } from "react-helmet";

const UsagePolicy = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Usage Policy | FiveM DB</title>
        <meta name="description" content="Guidelines for responsible use of FiveM DB services, including acceptable use and prohibited activities." />
        <link rel="canonical" href="https://fivemdb.net/usage-policy" />
      </Helmet>
      <main className="flex-grow pt-20 md:pt-32 px-4 md:px-6 pb-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3 md:mb-4">
              Usage Policy
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              Guidelines for responsible use of FiveMDB services
            </p>
            <p className="text-sm text-white/50 mt-4">
              Last updated: January 9th, 2025
            </p>
          </div>

          <div className="space-y-6">
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-6 w-6 text-blue-400" />
                  <h2 className="text-xl font-bold text-white">Purpose and Scope</h2>
                </div>
                <p className="text-white/70 leading-relaxed mb-4">
                  This Usage Policy outlines the acceptable use of FiveMDB's services and tools. Our platform 
                  is designed to help the FiveM community maintain standards and identify potential violations 
                  of Terms of Service and Community Guidelines.
                </p>
                <p className="text-white/70 leading-relaxed">
                  By using our services, you agree to use them responsibly and in accordance with this policy.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <h2 className="text-xl font-bold text-white">Acceptable Use</h2>
                </div>
                <div className="space-y-3">
                  <p className="text-white font-medium">You may use our services to:</p>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      Check resources, servers, and users for policy compliance
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      Verify the legitimacy of FiveM community members and content
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      Access publicly available statistics and reports
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      Submit legitimate reports with proper evidence
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      Educational and research purposes related to FiveM community safety
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="h-6 w-6 text-red-400" />
                  <h2 className="text-xl font-bold text-white">Prohibited Activities</h2>
                </div>
                <div className="space-y-3">
                  <p className="text-white font-medium">You must not use our services to:</p>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      Submit false, misleading, or malicious reports
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      Harass, threaten, or intimidate other users
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      Attempt to circumvent or manipulate our detection systems
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      Use automated tools to spam or overload our services
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      Share or distribute personal information without consent
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      Engage in any illegal activities or promote illegal content
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-purple-400" />
                  <h2 className="text-xl font-bold text-white">Reporting and Evidence</h2>
                </div>
                <p className="text-white/70 leading-relaxed mb-4">
                  When submitting reports, you must provide accurate and truthful information. All reports 
                  should be supported by appropriate evidence such as screenshots, links, or other documentation.
                </p>
                <p className="text-white/70 leading-relaxed">
                  False reports may result in restriction of your access to our services. We reserve the right 
                  to verify all submitted information.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="h-6 w-6 text-yellow-400" />
                  <h2 className="text-xl font-bold text-white">Rate Limits and Fair Use</h2>
                </div>
                <p className="text-white/70 leading-relaxed mb-4">
                  To ensure fair access for all users, we implement rate limits on our services. Excessive 
                  use may result in temporary restrictions. Please use our services reasonably and considerately.
                </p>
                <p className="text-white/70 leading-relaxed">
                  If you need higher rate limits for legitimate purposes, please contact us to discuss 
                  your requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-blue-400" />
                  <h2 className="text-xl font-bold text-white">Enforcement</h2>
                </div>
                <p className="text-white/70 leading-relaxed mb-4">
                  Violations of this Usage Policy may result in warnings, temporary restrictions, or permanent 
                  bans from our services. The severity of the response will depend on the nature and frequency 
                  of the violation.
                </p>
                <p className="text-white/70 leading-relaxed">
                  If you believe your access has been restricted in error, please contact us at: 
                  <span className="text-blue-400 ml-1">legal@nexoradata.ltd</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UsagePolicy;

