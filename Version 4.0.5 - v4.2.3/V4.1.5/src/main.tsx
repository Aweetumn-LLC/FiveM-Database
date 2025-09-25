
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import AnnouncementBar from './components/AnnouncementBar';
import { Toaster } from "@/components/ui/toaster";
import './index.css'

// Simplified performance optimizations
const optimizePerformance = async () => {
  // Temporarily disable service worker registration to fix loading issues
  console.log('Service Worker registration disabled for troubleshooting');
  
  // Enable basic performance tracking only
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            if (navEntry.loadEventEnd && navEntry.loadEventStart) {
              console.log('Page Load Time:', navEntry.loadEventEnd - navEntry.loadEventStart, 'ms');
            }
          }
        }
      });
      observer.observe({ entryTypes: ['navigation'] });
    } catch (error) {
      console.log('Performance tracking not available');
    }
  }
};

// Initialize performance optimizations
optimizePerformance();

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <AnnouncementBar />
    <Toaster />
  </>
);
