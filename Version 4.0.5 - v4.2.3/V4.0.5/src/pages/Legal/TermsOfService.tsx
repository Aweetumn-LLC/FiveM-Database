import { Card, CardContent } from "@/components/ui/card";
import { Gavel, Shield, Users, AlertTriangle } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen">
      <main className="flex-grow pt-20 md:pt-32 px-4 md:px-6 pb-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3 md:mb-4">
              Terms of Service
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              Your rights and responsibilities when using FiveMDB
            </p>
            <p className="text-sm text-white/50 mt-4">
              Last updated: January 9th, 2025
            </p>
          </div>

          <div className="space-y-6">
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Gavel className="h-6 w-6 text-blue-400" />
                  <h2 className="text-xl font-bold text-white">Acceptance of Terms</h2>
                </div>
                <p className="text-white/70 leading-relaxed">
                  By accessing or using FiveMDB services, you agree to be bound by these Terms of Service.
                  If you do not agree to these terms, please do not use our services. These terms constitute
                  a legally binding agreement between you and FiveMDB.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-green-400" />
                  <h2 className="text-xl font-bold text-white">Use of Services</h2>
                </div>
                <p className="text-white/70 leading-relaxed mb-4">
                  Our services are provided for informational purposes only. You may use our services for 
                  lawful purposes and in accordance with these Terms.
                </p>
                <div className="space-y-3">
                  <p className="text-white font-medium">You agree not to:</p>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      Use our services in any way that violates any applicable laws or regulations
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      Submit false, misleading, or malicious information
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      Engage in any activity that interferes with or disrupts our services
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      Attempt to gain unauthorized access to any part of our services
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      Use automated tools to access our services without permission
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-purple-400" />
                  <h2 className="text-xl font-bold text-white">Content and Submissions</h2>
                </div>
                <p className="text-white/70 leading-relaxed mb-4">
                  By submitting content to our services, you grant us a non-exclusive, royalty-free license
                  to use, reproduce, modify, and display such content in connection with providing our services.
                  You represent that you have all necessary rights to grant this license.
                </p>
                <p className="text-white/70 leading-relaxed">
                  We reserve the right to remove any content that violates these terms or is otherwise 
                  inappropriate for our platform.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-yellow-400" />
                  <h2 className="text-xl font-bold text-white">Intellectual Property</h2>
                </div>
                <p className="text-white/70 leading-relaxed">
                  Our services and all content and materials available through our services are protected by
                  intellectual property laws. You may not use, reproduce, distribute, or create derivative
                  works based upon our services without our express written permission.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                  <h2 className="text-xl font-bold text-white">Limitation of Liability</h2>
                </div>
                <p className="text-white/70 leading-relaxed mb-4">
                  To the maximum extent permitted by law, we shall not be liable for any indirect, incidental,
                  special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred
                  directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
                </p>
                <p className="text-white/70 leading-relaxed">
                  Our total liability to you for any claim arising out of or relating to these terms or our 
                  services shall not exceed the amount you paid us, if any, for using our services.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Gavel className="h-6 w-6 text-blue-400" />
                  <h2 className="text-xl font-bold text-white">Changes to Terms</h2>
                </div>
                <p className="text-white/70 leading-relaxed mb-4">
                  We may modify these Terms from time to time. It is your responsibility to review these Terms 
                  periodically. Your continued use of our services after any modifications indicates your 
                  acceptance of the revised Terms.
                </p>
                <p className="text-white/70 leading-relaxed">
                  If you have any questions about these Terms, please contact us at: 
                  <span className="text-blue-400 ml-1">autumn@fivemdb.online</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;