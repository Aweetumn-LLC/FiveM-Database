const Legal = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-1 flex flex-col items-center">
        <div className="animate-fade-in container max-w-4xl px-8 py-24">
          <h1 className="text-5xl md:text-6xl font-light mb-12 leading-tight">
            <span className="text-gradient font-semibold">Legal</span> Disclaimer
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-lg font-light text-white/70 mb-8">
              Last updated: January 19, 2025
            </p>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">Important Legal Notice</h2>
              <p className="text-white/70">
                The information provided by FiveMDB and displayed on our platform is for 
                informational purposes only and should not be construed as legal advice. 
                We are not a law firm and do not provide legal services.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">No Legal Advice</h2>
              <p className="text-white/70 mb-4">
                The data, reports, and analysis provided through our platform should not be used as:
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2">
                <li>Substitute for professional legal advice</li>
                <li>Basis for legal action without proper legal consultation</li>
                <li>Definitive proof of legal violations or compliance</li>
                <li>Grounds for making business or legal decisions without proper legal review</li>
              </ul>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">Consult Legal Professionals</h2>
              <p className="text-white/70">
                If you require legal advice or have legal questions regarding:
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2 mt-4">
                <li>FiveM Terms of Service violations</li>
                <li>Intellectual property concerns</li>
                <li>Server compliance issues</li>
                <li>Content licensing and usage rights</li>
                <li>Any other legal matters</li>
              </ul>
              <p className="text-white/70 mt-4">
                Please consult with qualified legal professionals who can provide advice 
                specific to your situation and jurisdiction.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">Information Accuracy</h2>
              <p className="text-white/70">
                While we strive to provide accurate information, we cannot guarantee the 
                completeness, accuracy, or timeliness of all data displayed on our platform. 
                Information should be independently verified before taking any action.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">Limitation of Liability</h2>
              <p className="text-white/70">
                FiveMDB and its operators are not liable for any decisions made based on 
                information provided through our platform. Users assume full responsibility 
                for verifying information and seeking appropriate professional advice when needed.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">Community Resources</h2>
              <p className="text-white/70">
                Our platform serves as a community resource for sharing information about 
                FiveM servers and resources. This information is provided by the community 
                and should be treated as such, not as official legal determinations.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">Disputes and Resolution</h2>
              <p className="text-white/70">
                If you believe information on our platform is inaccurate or if you have 
                disputes regarding content, please contact us directly. We encourage 
                resolution through communication rather than legal action where possible.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-display mb-4">Legal Inquiries</h2>
              <p className="text-white/70">
                For legal inquiries or concerns about our platform, please contact us at:
                Sophia@zwrks.com Note that this contact is for platform-related legal 
                matters only and does not constitute legal advice.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Legal;