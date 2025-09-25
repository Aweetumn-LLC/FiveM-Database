
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Eye, Cookie, Mail, UserCheck } from "lucide-react";
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Privacy Policy | FiveM DB</title>
        <meta name="description" content="How FiveM DB collects, uses, and protects your personal information in compliance with privacy regulations." />
        <link rel="canonical" href="https://fivemdb.net/privacy-policy" />
      </Helmet>
      <main className="flex-grow pt-20 md:pt-32 px-4 md:px-6 pb-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3 md:mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              How we protect and handle your personal information
            </p>
            <p className="text-sm text-white/50 mt-4">
              Last updated: January 9th, 2025
            </p>
          </div>

          <div className="space-y-6">
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-blue-400" />
                  <h2 className="text-xl font-bold text-white">Our Commitment to Privacy</h2>
                </div>
                <p className="text-white/70 leading-relaxed mb-4">
                  At FiveMDB, we are committed to protecting your privacy and ensuring the security of your 
                  personal information. This Privacy Policy explains how we collect, use, disclose, and 
                  safeguard your information when you use our services.
                </p>
                <p className="text-white/70 leading-relaxed">
                  We believe in transparency and want you to understand exactly how your data is handled.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="h-6 w-6 text-green-400" />
                  <h2 className="text-xl font-bold text-white">Information We Collect</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Personal Information</h3>
                    <ul className="space-y-2 text-white/70">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        Email addresses when you contact us or submit reports
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        Names or usernames you provide in communications
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        Any additional information you voluntarily provide
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Technical Information</h3>
                    <ul className="space-y-2 text-white/70">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        IP addresses and approximate geographic location
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        Browser type, version, and operating system
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        Device information and screen resolution
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        Pages visited and time spent on our site
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Cookie className="h-6 w-6 text-yellow-400" />
                  <h2 className="text-xl font-bold text-white">Cookies and Tracking</h2>
                </div>
                <p className="text-white/70 leading-relaxed mb-4">
                  We use cookies and similar technologies to enhance your experience and understand how 
                  our services are used:
                </p>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    Essential cookies for site functionality and security
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    Analytics cookies to understand usage patterns (anonymized)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    Performance cookies to optimize loading times
                  </li>
                </ul>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mt-4">
                  <p className="text-yellow-200 text-sm">
                    You can control cookie settings through your browser preferences. Note that disabling 
                    certain cookies may affect site functionality.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="h-6 w-6 text-purple-400" />
                  <h2 className="text-xl font-bold text-white">How We Protect Your Information</h2>
                </div>
                <p className="text-white/70 leading-relaxed mb-4">
                  We implement robust security measures to protect your personal information:
                </p>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    SSL/TLS encryption for all data transmission
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    Secure database storage with encryption at rest
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    Regular security audits and vulnerability assessments
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    Access controls and authentication for our team
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    Incident response procedures for potential breaches
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <UserCheck className="h-6 w-6 text-red-400" />
                  <h2 className="text-xl font-bold text-white">Your Privacy Rights</h2>
                </div>
                <p className="text-white/70 leading-relaxed mb-4">
                  You have several rights regarding your personal information:
                </p>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <strong>Access:</strong> Request a copy of personal data we hold about you
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <strong>Rectification:</strong> Ask us to correct inaccurate information
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <strong>Erasure:</strong> Request deletion of your personal data
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <strong>Portability:</strong> Receive your data in a machine-readable format
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <strong>Objection:</strong> Object to certain types of data processing
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="h-6 w-6 text-indigo-400" />
                  <h2 className="text-xl font-bold text-white">Third-Party Services</h2>
                </div>
                <p className="text-white/70 leading-relaxed mb-4">
                  We work with trusted third-party service providers to operate our platform:
                </p>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    Cloud hosting providers for secure data storage
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    Analytics services for anonymized usage statistics
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    Security services for threat detection and prevention
                  </li>
                </ul>
                <p className="text-white/70 leading-relaxed mt-4">
                  These providers are contractually bound to protect your data and use it only for the 
                  purposes we specify.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-blue-400" />
                  <h2 className="text-xl font-bold text-white">International Data Transfers</h2>
                </div>
                <p className="text-white/70 leading-relaxed mb-4">
                  Our services are hosted globally, which may involve transferring your data to countries 
                  outside your residence. We ensure all transfers comply with applicable data protection laws 
                  and implement appropriate safeguards.
                </p>
                <p className="text-white/70 leading-relaxed">
                  For users in the European Union, we comply with GDPR requirements for international transfers.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="h-6 w-6 text-green-400" />
                  <h2 className="text-xl font-bold text-white">Contact Us About Privacy</h2>
                </div>
                <p className="text-white/70 leading-relaxed mb-4">
                  If you have questions about this Privacy Policy, want to exercise your privacy rights, 
                  or have concerns about how we handle your data, please contact us:
                </p>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <p className="text-green-200">
                    <strong>Email:</strong> <span className="text-green-400">legal@nexoradata.ltd</span>
                  </p>
                  <p className="text-green-200 mt-1">
                    <strong>Subject Line:</strong> Privacy Inquiry - [Your Request Type]
                  </p>
                </div>
                <p className="text-white/60 text-sm mt-4">
                  We will respond to privacy requests within 30 days of receipt.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;

