import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useI18n } from '../context/Language';
import { Flag } from './Flag';

export function LangSwitch({ className = '' }) {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onPointer = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const choose = (next) => {
    setLang(next);
    setOpen(false);
  };

  return (
    <div className={`lang ${className}`.trim()} ref={ref}>
      <button
        type="button"
        className="lang__btn"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t.nav.language}
        onClick={() => setOpen((value) => !value)}
      >
        <Flag code={lang} />
        <span>{lang.toUpperCase()}</span>
        <ChevronDown size={16} aria-hidden="true" />
      </button>
      {open ? (
        <ul className="lang__menu" role="listbox" aria-label={t.nav.language}>
          {['lv', 'en'].map((code) => (
            <li key={code}>
              <button type="button" role="option" aria-selected={lang === code} onClick={() => choose(code)}>
                <Flag code={code} />
                {code.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
