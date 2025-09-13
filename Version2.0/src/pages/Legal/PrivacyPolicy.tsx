
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Eye, Database, Lock, Mail, Calendar } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <main className="flex-1 pt-28">
        <div className="container max-w-4xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-6xl font-display font-light mb-6 leading-tight animate-fade-in">
              <span className="text-gradient font-semibold">Privacy</span> Policy
            </h1>
            <p className="text-lg font-light text-white/70 mb-4 animate-fade-in" style={{animationDelay: '100ms'}}>
              Last updated: May 14, 2025
            </p>
            <p className="text-white/60 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '200ms'}}>
              Your privacy is important to us. This policy explains how FiveMDB collects, uses, and protects your information.
            </p>
          </div>
          
          <div className="space-y-8">
            <Card className="glass-neo animate-fade-in border-white/10" style={{animationDelay: '300ms'}}>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-500/20 p-2 rounded-lg">
                    <Eye size={24} className="text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-display text-white">Overview</h2>
                </div>
                <p className="text-white/70 leading-relaxed">
                  This Privacy Policy describes how FiveMDB ("we", "us", or "our") collects, uses, and discloses your information 
                  when you use our service, and what choices you have associated with that information.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-neo animate-fade-in border-white/10" style={{animationDelay: '350ms'}}>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-green-500/20 p-2 rounded-lg">
                    <Database size={24} className="text-green-400" />
                  </div>
                  <h2 className="text-2xl font-display text-white">Information Collection</h2>
                </div>
                <p className="text-white/70 mb-6 leading-relaxed">
                  We collect information that you provide directly to us when you:
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {[
                    "Use our services",
                    "Fill in forms on our website",
                    "Communicate with us",
                    "Submit reports"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-white/70">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-white/70 leading-relaxed">
                  We may also collect certain information automatically when you visit our website, 
                  including your IP address, browser type, operating system, and browsing actions and patterns.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-neo animate-fade-in border-white/10" style={{animationDelay: '400ms'}}>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-purple-500/20 p-2 rounded-lg">
                    <Shield size={24} className="text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-display text-white">Use of Information</h2>
                </div>
                <p className="text-white/70 mb-6 leading-relaxed">
                  We use the information we collect to:
                </p>
                <div className="space-y-3">
                  {[
                    "Provide, maintain, and improve our services",
                    "Process and manage reports submitted to our database",
                    "Respond to your comments, questions, and requests",
                    "Analyze how you use our services",
                    "Protect against, identify, and prevent fraud and other illegal activity"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                      <span className="text-white/70">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-neo animate-fade-in border-white/10" style={{animationDelay: '450ms'}}>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-orange-500/20 p-2 rounded-lg">
                    <Lock size={24} className="text-orange-400" />
                  </div>
                  <h2 className="text-2xl font-display text-white">Sharing of Information</h2>
                </div>
                <p className="text-white/70 leading-relaxed">
                  We may share your information with third parties in limited circumstances, including:
                  when required by law, to protect rights and safety, with your consent, or with service providers
                  who assist in our operations.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-neo animate-fade-in border-white/10" style={{animationDelay: '500ms'}}>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-teal-500/20 p-2 rounded-lg">
                    <Calendar size={24} className="text-teal-400" />
                  </div>
                  <h2 className="text-2xl font-display text-white">Your Rights</h2>
                </div>
                <p className="text-white/70 leading-relaxed">
                  Depending on your location, you may have certain rights regarding your personal information, 
                  such as the right to access, correct, or delete your personal information, or to object to or 
                  restrict certain processing of your personal information.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-neo animate-fade-in border-white/10" style={{animationDelay: '550ms'}}>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-indigo-500/20 p-2 rounded-lg">
                    <Mail size={24} className="text-indigo-400" />
                  </div>
                  <h2 className="text-2xl font-display text-white">Contact Us</h2>
                </div>
                <p className="text-white/70 mb-4 leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="bg-white/5 p-4 rounded-lg">
                  <code className="text-indigo-400">privacy@fivemdb.online</code>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {/* <Footer /> */}
    </div>
  );
};

export default PrivacyPolicy;
