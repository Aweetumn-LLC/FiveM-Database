
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Toaster } from "@/components/ui/toaster";
import AnnouncementBar from './components/AnnouncementBar';
import './index.css'

createRoot(document.getElementById("root")!).render(
  <>
    <AnnouncementBar />
    <App />
    <Toaster />
    <div className="fixed inset-0 pointer-events-none -z-10">
      {/* Dynamic background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/10 to-pink-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 to-cyan-500/5 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/3 left-1/4 w-[800px] h-[400px] bg-gradient-to-r from-indigo-500/5 to-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      
      {/* Subtle grid overlay for modern tech feeling */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzFhMSAxIDAgMTEtMi0uMDAxIDEgMSAwIDAxMiAuMDAxeiIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKSIgZmlsbC1vcGFjaXR5PSIuMiIvPjwvZz48L3N2Zz4=')]"></div>
      
      {/* Subtle gradient lines */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
      </div>
    </div>
  </>
);
