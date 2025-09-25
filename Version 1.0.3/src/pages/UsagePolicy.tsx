
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const UsagePolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center">
        <div className="animate-fade-in container max-w-4xl px-8 py-24">
          <h1 className="text-5xl md:text-6xl font-light mb-12 leading-tight">
            <span className="text-gradient font-semibold">Usage</span> of our Service
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-lg font-light text-white/70 mb-8">
              Last updated: May 14, 2025
            </p>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">Purpose of FiveMDB</h2>
              <p className="text-white/70">
                FiveMDB is a community-driven reports database that aims to improve the FiveM ecosystem through 
                transparency and accountability. Our platform allows users to access information about reported 
                FiveM servers that may be in violation of the FiveM Terms of Service.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">Appropriate Usage</h2>
              <p className="text-white/70 mb-4">
                When using our service, please:
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2">
                <li>Use the information provided for educational and informational purposes only</li>
                <li>Verify information independently before taking action</li>
                <li>Report any inaccuracies or outdated information to our team</li>
                <li>Respect the privacy and rights of individuals and organizations featured in reports</li>
              </ul>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">Prohibited Usage</h2>
              <p className="text-white/70 mb-4">
                The following uses of our service are strictly prohibited:
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2">
                <li>Harassment or targeting of individuals or organizations listed in our reports</li>
                <li>Using our data for illegal activities or to cause harm</li>
                <li>Scraping, copying, or redistributing our database without permission</li>
                <li>Submitting false reports or malicious information</li>
                <li>Using our service to unfairly damage the reputation of competitors</li>
              </ul>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">Report Submission Guidelines</h2>
              <p className="text-white/70 mb-4">
                When submitting reports to our database:
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2">
                <li>Provide factual, verifiable information</li>
                <li>Include evidence to support your claims</li>
                <li>Be objective and avoid personal attacks</li>
                <li>Focus on actual violations of the FiveM Terms of Service</li>
                <li>Respect confidentiality where appropriate</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-display mb-4">Enforcement</h2>
              <p className="text-white/70 mb-4">
                We reserve the right to:
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2 mb-4">
                <li>Remove reports that do not meet our standards</li>
                <li>Restrict access for users who violate these policies</li>
                <li>Cooperate with law enforcement if illegal activity is detected</li>
                <li>Update these usage policies as needed</li>
              </ul>
              <p className="text-white/70">
                If you have questions or concerns about our usage policies, please contact us at:
                support@fivemdb.online
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UsagePolicy;
