import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { translations } from '../i18n';

const LanguageContext = createContext(null);

function readLang() {
  return new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'lv';
}

export function LanguageProvider({ children }) {
  const [params, setParams] = useSearchParams();
  const [lang, setLangState] = useState(readLang);

  useEffect(() => {
    const next = params.get('lang') === 'en' ? 'en' : 'lv';
    if (next !== lang) setLangState(next);
  }, [params, lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next) => {
    setLangState(next);
    const updated = new URLSearchParams(params);
    if (next === 'en') updated.set('lang', 'en');
    else updated.delete('lang');
    setParams(updated, { replace: true });
  };

  const value = useMemo(() => ({ lang, setLang, t: translations[lang] }), [lang, params]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useI18n must be used within LanguageProvider');
  return context;
}
