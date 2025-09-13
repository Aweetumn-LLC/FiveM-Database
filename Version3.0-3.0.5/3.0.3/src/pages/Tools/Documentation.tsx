
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Code, Shield, Database, Users, ExternalLink } from "lucide-react";

const Documentation = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-start justify-center py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="h-8 w-8 text-orange-400" />
            <h1 className="text-4xl font-bold text-orange-400">Documentation</h1>
          </div>
          <p className="text-gray-300 text-lg">
            Complete guide to using FiveM DB tools and resources
          </p>
        </div>

        <div className="space-y-8">
          {/* Getting Started */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-orange-400 flex items-center gap-2">
                <Code className="h-5 w-5" />
                Getting Started
              </CardTitle>
              <CardDescription className="text-gray-400">
                Learn the basics of using FiveM DB platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">What is FiveM DB?</h3>
                <p className="text-gray-300">
                  FiveM DB is a community-driven database that provides security tools, resource verification, 
                  and reporting capabilities for the FiveM ecosystem. Our platform helps server owners and 
                  developers make informed decisions about resources and maintain secure environments.
                </p>
              </div>
              <Separator className="bg-gray-700" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Key Features</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Resource integrity checking and security scanning</li>
                  <li>Community-driven reporting system</li>
                  <li>Server verification and monitoring tools</li>
                  <li>Creator partnership and recommendation system</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Resource Checker */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-orange-400 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Resource Checker
                <Badge variant="secondary" className="bg-orange-500/20 text-orange-400">Tool</Badge>
              </CardTitle>
              <CardDescription className="text-gray-400">
                Verify the safety and integrity of FiveM resources
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">How to Use</h3>
                <ol className="list-decimal list-inside text-gray-300 space-y-2">
                  <li>Navigate to the Resource Checker tool</li>
                  <li>Enter the resource name or URL you want to check</li>
                  <li>Click "Check Resource" to scan for potential issues</li>
                  <li>Review the results and recommendations</li>
                </ol>
              </div>
              <Separator className="bg-gray-700" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">What We Check</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Malicious code patterns and backdoors</li>
                  <li>Known blacklisted resources</li>
                  <li>Community reports and feedback</li>
                  <li>Code quality and best practices</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Server Checker */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-orange-400 flex items-center gap-2">
                <Database className="h-5 w-5" />
                Server Checker
                <Badge variant="secondary" className="bg-orange-500/20 text-orange-400">Tool</Badge>
              </CardTitle>
              <CardDescription className="text-gray-400">
                Monitor and verify FiveM server configurations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Server Verification</h3>
                <p className="text-gray-300">
                  Our server checker tool allows you to verify server connectivity, check configuration 
                  settings, and monitor server health. Enter a server's connect code to get detailed 
                  information about its status and configuration.
                </p>
              </div>
              <Separator className="bg-gray-700" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Information Provided</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Server status and connectivity</li>
                  <li>Player count and slots</li>
                  <li>Server variables and settings</li>
                  <li>Network information and location</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Community Reports */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-orange-400 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Community Reports
                <Badge variant="secondary" className="bg-green-500/20 text-green-400">Community</Badge>
              </CardTitle>
              <CardDescription className="text-gray-400">
                Community-driven reporting and feedback system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Reporting System</h3>
                <p className="text-gray-300">
                  Our community reporting system allows users to share information about resources, 
                  servers, and security issues. All reports are reviewed and verified by our 
                  community moderators to ensure accuracy and reliability.
                </p>
              </div>
              <Separator className="bg-gray-700" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Types of Reports</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Resource security vulnerabilities</li>
                  <li>Malicious server behavior</li>
                  <li>Code quality issues</li>
                  <li>Community recommendations</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* API Documentation */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-orange-400 flex items-center gap-2">
                <Code className="h-5 w-5" />
                API Access
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">Developer</Badge>
              </CardTitle>
              <CardDescription className="text-gray-400">
                Integrate FiveM DB functionality into your applications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">API Endpoints</h3>
                <p className="text-gray-300">
                  We provide REST API endpoints for accessing our database and tools programmatically. 
                  Contact us through Discord for API access and documentation.
                </p>
              </div>
              <Separator className="bg-gray-700" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Available Endpoints</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Resource checking and verification</li>
                  <li>Server status and information</li>
                  <li>Community reports and statistics</li>
                  <li>Blacklist and security data</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-orange-400 flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                Support & Contact
              </CardTitle>
              <CardDescription className="text-gray-400">
                Get help and connect with the community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Need Help?</h3>
                <p className="text-gray-300">
                  Join our Discord community for support, feedback, and discussions about FiveM security 
                  and development. Our community is active and ready to help with any questions.
                </p>
              </div>
              <Separator className="bg-gray-700" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Links</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>
                    <a href="https://discord.fivemdb.online" target="_blank" rel="noopener noreferrer" 
                       className="text-orange-400 hover:text-orange-300 transition-colors">
                      Discord Community
                    </a>
                  </li>
                  <li>Report issues and suggestions through Discord</li>
                  <li>Contribute to the project on GitHub (coming soon)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
