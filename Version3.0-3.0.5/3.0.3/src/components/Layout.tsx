
import { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import { TooltipProvider } from './ui/tooltip';
import { SidebarProvider, SidebarInset, SidebarTrigger } from './ui/sidebar';
import { AppSidebar } from './AppSidebar';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const Layout = ({ children, title = "FiveM DB", description = "FiveM DB - Community Driven Reports Database" }: LayoutProps) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="format-detection" content="telephone=no" />
      </Helmet>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background relative">
          {/* Sidebar - overlay on mobile/tablet, inline on desktop */}
          <AppSidebar />
          
          {/* Main content area - always takes full width and is centered */}
          <main className="flex-1 w-full min-w-0 bg-background overflow-auto">
            {/* Mobile header with sidebar trigger */}
            <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
              <h1 className="text-foreground font-semibold font-display text-lg">FiveM DB</h1>
              <SidebarTrigger className="text-foreground hover:text-primary transition-colors" />
            </div>
            
            {/* Content wrapper with responsive padding */}
            <div className="w-full">
              <TooltipProvider>
                {children}
              </TooltipProvider>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </>
  );
};

export default Layout;
