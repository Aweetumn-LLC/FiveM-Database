
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MinimalButton from "@/components/MinimalButton";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center">
        <div className="animate-fade-in container max-w-4xl px-8 py-32">
          <h1 className="text-5xl md:text-7xl font-light mb-12 leading-tight">
            Extreme minimalism<br /> is refined elegance.
          </h1>
          <p className="text-lg md:text-xl font-light text-white/70 mb-12 max-w-2xl leading-relaxed">
            Simplicity is not about deprivation, but about bringing focus to what truly matters.
            Our design removes distraction and creates space for clarity.
          </p>
          <div className="space-x-4">
            <MinimalButton>EXPLORE</MinimalButton>
            <Link to="/about">
              <MinimalButton variant="outline">LEARN MORE</MinimalButton>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
