
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center">
        <div className="animate-fade-in container max-w-4xl px-8 py-24">
          <h1 className="text-5xl md:text-6xl font-light mb-12 leading-tight">
            <span className="text-gradient font-semibold">Terms</span> of Service
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-lg font-light text-white/70 mb-8">
              Last updated: May 14, 2025
            </p>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">Acceptance of Terms</h2>
              <p className="text-white/70">
                By accessing or using FiveMDB services, you agree to be bound by these Terms of Service.
                If you do not agree to these terms, please do not use our services.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">Use of Services</h2>
              <p className="text-white/70 mb-4">
                Our services are provided for informational purposes only. You may use our services for lawful purposes and in accordance with these Terms.
              </p>
              <p className="text-white/70">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2">
                <li>Use our services in any way that violates any applicable laws</li>
                <li>Submit false or misleading information</li>
                <li>Engage in any activity that interferes with or disrupts our services</li>
                <li>Attempt to gain unauthorized access to any part of our services</li>
              </ul>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">Content and Submissions</h2>
              <p className="text-white/70">
                By submitting content to our services, you grant us a non-exclusive, royalty-free license
                to use, reproduce, modify, and display such content in connection with providing our services.
                You represent that you have all necessary rights to grant this license.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">Intellectual Property</h2>
              <p className="text-white/70">
                Our services and all content and materials available through our services are protected by
                intellectual property laws. You may not use, reproduce, distribute, or create derivative
                works based upon our services without our express permission.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">Limitation of Liability</h2>
              <p className="text-white/70">
                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred
                directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-display mb-4">Changes to Terms</h2>
              <p className="text-white/70 mb-4">
                We may modify these Terms from time to time. It is your responsibility to review these Terms periodically.
                Your continued use of our services after any modifications indicates your acceptance of the revised Terms.
              </p>
              <p className="text-white/70">
                If you have any questions about these Terms, please contact us at:
                terms@fivemdb.online
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
