
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Toaster } from "@/components/ui/use-toast";
import './index.css'

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Toaster />
    <div className="fixed inset-0 pointer-events-none -z-10">
      {/* Dynamic background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl animate-pulse-subtle"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-3xl animate-pulse-subtle" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/3 left-1/4 w-[800px] h-[400px] bg-purple-500/5 rounded-full blur-3xl animate-pulse-subtle" style={{animationDelay: '1s'}}></div>
      
      {/* Subtle grid overlay for modern tech feeling */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzFhMSAxIDAgMTEtMi0uMDAxIDEgMSAwIDAxMiAuMDAxeiIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKSIgZmlsbC1vcGFjaXR5PSIuMiIvPjwvZz48L3N2Zz4=')]"></div>
      
      {/* Subtle gradient lines */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      </div>
    </div>
  </>
);
