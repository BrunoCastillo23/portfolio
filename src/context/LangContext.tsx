import React, { createContext, useContext, useState } from 'react';
import { translations, Lang } from './translations';

interface LangContextType {
  lang:   Lang;
  t:      typeof translations['es'];
  toggle: () => void;
}

const LangContext = createContext<LangContextType>({
  lang:   'es',
  t:      translations['es'],
  toggle: () => {},
});

export const LangProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('lang') as Lang | null;
    return saved === 'en' ? 'en' : 'es';
  });

  const toggle = () => {
    const next: Lang = lang === 'es' ? 'en' : 'es';
    setLang(next);
    localStorage.setItem('lang', next);
  };

  return (
    <LangContext.Provider value={{ lang, t: translations[lang], toggle }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
