
import { ReactNode } from 'react';
import Header from './Header';
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="theme-color" content="#080818" />
        <meta name="format-detection" content="telephone=no" />
      </Helmet>
      <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
        <Header />
        <main className="flex-grow pt-16 sm:pt-18 lg:pt-20 safe-area-top safe-area-bottom">
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </main>
      </div>
    </>
  );
};

export default Layout;
