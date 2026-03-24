import React, { createContext, useContext, useState } from 'react';
import { translations, Lang } from './translations';

// Tipo que acepta tanto 'es' como 'en' sin conflicto
type Translations = typeof translations[Lang];

interface LangContextType {
  lang:   Lang;
  t:      Translations;
  toggle: () => void;
}

const LangContext = createContext<LangContextType>({
  lang:   'es',
  t:      translations['es'] as Translations,
  toggle: () => {},
});

export const LangProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('lang') as Lang | null;
      return saved === 'en' ? 'en' : 'es';
    } catch {
      return 'es';
    }
  });

  const toggle = () => {
    const next: Lang = lang === 'es' ? 'en' : 'es';
    setLang(next);
    try { localStorage.setItem('lang', next); } catch { /* silencioso */ }
  };

  return (
    <LangContext.Provider value={{ lang, t: translations[lang] as Translations, toggle }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
