'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import { defaultTheme, themes, type ThemeName } from '@/lib/themes';

type ThemeContextValue = {
  readonly theme: ThemeName;
  readonly setTheme: (theme: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

type ThemeProviderProps = {
  readonly children: ReactNode;
};

function isValidTheme(value: string | null): value is ThemeName {
  return value !== null && value in themes;
}

function getInitialTheme(): ThemeName {
  if (typeof window === 'undefined') {
    return defaultTheme;
  }

  const savedTheme = localStorage.getItem('socio-theme');

  return isValidTheme(savedTheme) ? savedTheme : defaultTheme;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeName>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('socio-theme', theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return context;
}
