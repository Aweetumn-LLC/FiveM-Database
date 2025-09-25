
import { ReactNode } from 'react';
import { useIsMobile } from '../hooks/use-mobile';

interface ToolSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

const ToolSection = ({ 
  title, 
  description, 
  children, 
  className = '' 
}: ToolSectionProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`glass-card rounded-xl mb-4 md:mb-6 overflow-hidden animate-fade-in-delay ${className}`} 
         style={{ '--delay': '100ms' } as React.CSSProperties}>
      <div className="p-3 md:p-4 lg:p-6 border-b border-white/10 bg-white/5">
        <h3 className="text-lg md:text-xl lg:text-2xl font-display font-medium text-white">{title}</h3>
        {description && <p className="mt-1 md:mt-2 text-xs md:text-sm lg:text-base text-white/70">{description}</p>}
      </div>
      <div className={`p-3 md:p-4 lg:p-6 ${isMobile ? 'space-y-3' : 'space-y-4'}`}>
        {children}
      </div>
    </div>
  );
};

export default ToolSection;
