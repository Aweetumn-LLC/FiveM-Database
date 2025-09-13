
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
    id: 'pride',
    name: 'Pride',
    background: '#1a0d2e',
    backgroundSecondary: '#2d1b4e',
    accent: '#ff006e',
    accentHover: '#d90054'
  },
  {
    id: 'default',
    name: 'Default Dark',
    background: '#080818',
    backgroundSecondary: '#0c0c1e',
    accent: '#6366f1',
    accentHover: '#4f46e5'
  },
  {
    id: 'purple',
    name: 'Purple Night',
    background: '#1a0a2e',
    backgroundSecondary: '#16213e',
    accent: '#8b5cf6',
    accentHover: '#7c3aed'
  },
  {
    id: 'teal',
    name: 'Ocean Deep',
    background: '#0f2027',
    backgroundSecondary: '#203a43',
    accent: '#14b8a6',
    accentHover: '#0d9488'
  },
  {
    id: 'red',
    name: 'Crimson',
    background: '#2d1b27',
    backgroundSecondary: '#3d2b37',
    accent: '#ef4444',
    accentHover: '#dc2626'
  },
  {
    id: 'blue',
    name: 'Deep Blue',
    background: '#0f172a',
    backgroundSecondary: '#1e293b',
    accent: '#3b82f6',
    accentHover: '#2563eb'
  },
  {
    id: 'green',
    name: 'Forest',
    background: '#1a2e1a',
    backgroundSecondary: '#2a3e2a',
    accent: '#22c55e',
    accentHover: '#16a34a'
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
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]); // Pride theme is now default

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
