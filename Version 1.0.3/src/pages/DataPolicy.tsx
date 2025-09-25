
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DataPolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center">
        <div className="animate-fade-in container max-w-4xl px-8 py-24">
          <h1 className="text-5xl md:text-6xl font-light mb-12 leading-tight">
            <span className="text-gradient font-semibold">Data</span> Policy
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-lg font-light text-white/70 mb-8">
              Last updated: May 14, 2025
            </p>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">Data Collection and Use</h2>
              <p className="text-white/70">
                FiveMDB collects and maintains information about FiveM servers and their compliance with 
                the FiveM Terms of Service. This data is collected from user reports, public sources, and 
                through our own verification processes.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">Types of Data Collected</h2>
              <p className="text-white/70 mb-4">
                Our database may include the following types of information:
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2">
                <li>Server names and connection codes</li>
                <li>Server owner profiles and contact information (only publicly available)</li>
                <li>Documented violations of FiveM Terms of Service</li>
                <li>Report status and verification information</li>
                <li>Links to evidence and documentation</li>
              </ul>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">Data Accuracy and Updates</h2>
              <p className="text-white/70">
                We strive to maintain accurate and up-to-date information in our database. However, we rely 
                on community reports and may not always have the most current information. If you believe any 
                information in our database is incorrect or outdated, please contact us to request verification 
                or updates.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">Data Retention</h2>
              <p className="text-white/70">
                We maintain records in our database for historical and educational purposes. Reports may remain 
                in our system indefinitely, even if a server has resolved its violations or ceased operations. 
                We may add notes or updates to reports to reflect changes in status.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">Removal Requests</h2>
              <p className="text-white/70">
                Server owners who believe they have been incorrectly included in our database or who have resolved 
                all violations may submit a removal request. Each request will be evaluated individually based on 
                evidence provided and our verification process. Please note that we maintain the right to decline 
                removal if we believe maintaining the record serves the community interest.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-display mb-4">Data Security</h2>
              <p className="text-white/70 mb-4">
                We implement reasonable security measures to protect the data in our database from unauthorized 
                access or alteration. However, no system is completely secure, and we cannot guarantee the absolute 
                security of our database.
              </p>
              <p className="text-white/70">
                For questions about our data policies or to submit a data-related request, please contact us at:
                data@fivemdb.online
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DataPolicy;
