'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage, translations, getTranslationValue } from '../translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'farmsheild_language_preference';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default language is Hindi ('hi') for Indian livestock farmers
  const [language, setLanguageState] = useState<SupportedLanguage>('hi');
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    // Restore user language selection from localStorage
    try {
      const savedLang = localStorage.getItem(LOCAL_STORAGE_KEY) as SupportedLanguage;
      if (savedLang && (savedLang === 'hi' || savedLang === 'en')) {
        setLanguageState(savedLang);
      }
    } catch {
      // Ignore localStorage errors if blocked
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, lang);
    } catch {
      // Ignore
    }
  };

  const t = (key: string): string => {
    const currentDict = translations[language] || translations['hi'];
    return getTranslationValue(currentDict as unknown as Record<string, unknown>, key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div data-lang={language} className={isInitialized ? '' : 'opacity-95'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
