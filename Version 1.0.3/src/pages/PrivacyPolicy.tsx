
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center">
        <div className="animate-fade-in container max-w-4xl px-8 py-24">
          <h1 className="text-5xl md:text-6xl font-light mb-12 leading-tight">
            <span className="text-gradient font-semibold">Privacy</span> Policy
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-lg font-light text-white/70 mb-8">
              Last updated: May 14, 2025
            </p>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">Overview</h2>
              <p className="text-white/70">
                This Privacy Policy describes how FiveMDB ("we", "us", or "our") collects, uses, and discloses your information 
                when you use our service, and what choices you have associated with that information.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">Information Collection</h2>
              <p className="text-white/70 mb-4">
                We collect information that you provide directly to us when you:
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2 mb-4">
                <li>Use our services</li>
                <li>Fill in forms on our website</li>
                <li>Communicate with us</li>
                <li>Submit reports</li>
              </ul>
              <p className="text-white/70">
                We may also collect certain information automatically when you visit our website, 
                including your IP address, browser type, operating system, and browsing actions and patterns.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">Use of Information</h2>
              <p className="text-white/70 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process and manage reports submitted to our database</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Analyze how you use our services</li>
                <li>Protect against, identify, and prevent fraud and other illegal activity</li>
              </ul>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">Sharing of Information</h2>
              <p className="text-white/70">
                We may share your information with third parties in limited circumstances, including:
                when required by law, to protect rights and safety, with your consent, or with service providers
                who assist in our operations.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">Your Rights</h2>
              <p className="text-white/70">
                Depending on your location, you may have certain rights regarding your personal information, 
                such as the right to access, correct, or delete your personal information, or to object to or 
                restrict certain processing of your personal information.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-display mb-4">Contact Us</h2>
              <p className="text-white/70">
                If you have any questions about this Privacy Policy, please contact us at:
                privacy@fivemdb.online
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
