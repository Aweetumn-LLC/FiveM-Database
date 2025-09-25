
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from 'react-helmet';
import { TooltipProvider } from './ui/tooltip';

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
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-20">
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
