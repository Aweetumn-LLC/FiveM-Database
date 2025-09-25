import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ModernPageWrapperProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function ModernPageWrapper({ children, title, subtitle, className = "" }: ModernPageWrapperProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`min-h-screen bg-gradient-to-br from-background via-card/50 to-background ${className}`}
    >
      {/* Hero Section */}
      {(title || subtitle) && (
        <div className="relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
          
          <div className="relative z-10 container mx-auto px-6 py-16 text-center">
            {title && (
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-6"
              >
                {title}
              </motion.h1>
            )}
            {subtitle && (
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}