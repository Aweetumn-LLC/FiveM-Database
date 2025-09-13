const HowWeUseYourData = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-1 flex flex-col items-center">
        <div className="animate-fade-in container max-w-4xl px-8 py-24">
          <h1 className="text-5xl md:text-6xl font-light mb-12 leading-tight">
            How We Use <span className="text-gradient font-semibold">Your Data</span>
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-lg font-light text-white/70 mb-8">
              Last updated: January 19, 2025
            </p>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">Our Data Usage Philosophy</h2>
              <p className="text-white/70">
                We believe in minimal, purposeful data collection. We only collect and use data 
                that directly improves your experience on our platform and helps us provide 
                better services to the FiveM community.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">Primary Data Uses</h2>
              <p className="text-white/70 mb-4">
                We use your data for the following specific purposes:
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2">
                <li>Tracking recent servers you have checked to provide personalized recommendations</li>
                <li>Recording which tools you use to understand feature popularity and usage patterns</li>
                <li>Comparing server data across different time periods to identify trends</li>
                <li>Improving our algorithms based on collective user behavior patterns</li>
                <li>Providing customer support and resolving technical issues</li>
              </ul>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">Server History Tracking</h2>
              <p className="text-white/70">
                When you check servers using our tools, we maintain a history of these checks to:
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2 mt-4">
                <li>Enable quick access to previously checked servers</li>
                <li>Provide personalized server recommendations</li>
                <li>Track changes in server status over time</li>
                <li>Improve our detection algorithms based on user feedback</li>
              </ul>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">Tool Usage Analytics</h2>
              <p className="text-white/70">
                We collect data about which tools and features you use to:
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2 mt-4">
                <li>Prioritize development of popular features</li>
                <li>Identify tools that need improvement or updates</li>
                <li>Optimize the user interface based on common usage patterns</li>
                <li>Plan future tool development based on community needs</li>
              </ul>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">Data Comparison and Analysis</h2>
              <p className="text-white/70">
                We analyze collective data to:
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2 mt-4">
                <li>Identify trends in server violations and compliance</li>
                <li>Improve the accuracy of our detection systems</li>
                <li>Generate community insights and reports</li>
                <li>Enhance our understanding of the FiveM ecosystem</li>
              </ul>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-display mb-4">What We Don't Do</h2>
              <p className="text-white/70 mb-4">
                We strictly limit our data usage and never:
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2">
                <li>Sell your personal data to third parties</li>
                <li>Use your data for advertising or marketing to external parties</li>
                <li>Share individual user data without explicit consent</li>
                <li>Track your activity outside of our platform</li>
                <li>Store unnecessary personal information</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-display mb-4">Questions About Data Usage</h2>
              <p className="text-white/70">
                If you have specific questions about how we use your data or want to understand 
                what data we have about you, please reach out to us at: Sophia@zwrks.com
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HowWeUseYourData;