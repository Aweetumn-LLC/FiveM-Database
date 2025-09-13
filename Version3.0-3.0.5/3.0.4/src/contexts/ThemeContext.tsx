
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Theme {
  id: string;
  name: string;
  background: string;
  backgroundSecondary: string;
  accent: string;
  accentHover: string;
}

export const themes: Theme[] = [
  {
    id: 'clean-dark',
    name: 'Clean Dark',
    background: '#0a0a0a',
    backgroundSecondary: '#141414',
    accent: '#3b82f6',
    accentHover: '#2563eb'
  }
];

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  setCustomTheme: (theme: Theme) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]); // Clean Dark theme is now default

  useEffect(() => {
    const savedThemeId = localStorage.getItem('selected-theme');
    const savedCustomTheme = localStorage.getItem('custom-theme');
    
    if (savedCustomTheme) {
      try {
        const customTheme = JSON.parse(savedCustomTheme);
        setCurrentTheme(customTheme);
      } catch (error) {
        console.error('Failed to parse custom theme:', error);
      }
    } else if (savedThemeId) {
      const savedTheme = themes.find(theme => theme.id === savedThemeId);
      if (savedTheme) {
        setCurrentTheme(savedTheme);
      }
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--theme-background', currentTheme.background);
    root.style.setProperty('--theme-background-secondary', currentTheme.backgroundSecondary);
    root.style.setProperty('--theme-accent', currentTheme.accent);
    root.style.setProperty('--theme-accent-hover', currentTheme.accentHover);
  }, [currentTheme]);

  const setTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
      localStorage.setItem('selected-theme', themeId);
      localStorage.removeItem('custom-theme');
    }
  };

  const setCustomTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('custom-theme', JSON.stringify(theme));
    localStorage.removeItem('selected-theme');
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, setCustomTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};
