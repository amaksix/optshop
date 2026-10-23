import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useI18n } from '../context/Language';
import { useLegal } from '../context/Legal';

export function LegalDialog() {
  const { t } = useI18n();
  const { open, setOpen } = useLegal();
  const cardRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.activeElement;
    closeRef.current?.focus();
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(null);
    };
    document.addEventListener('keydown', onKey);
    document.body.classList.add('dialog-open');
    if (open === 'cookies') {
      cardRef.current?.querySelector('#cookie-policy')?.scrollIntoView({ block: 'start' });
    } else {
      cardRef.current?.scrollTo?.(0, 0);
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('dialog-open');
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div className="legal-dialog" role="presentation" onClick={() => setOpen(null)}>
      <div
        className="legal-dialog__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-dialog-title"
        ref={cardRef}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="legal-dialog__head">
          <h2 id="legal-dialog-title">{t.legal.privacyTitle}</h2>
          <button type="button" className="icon-btn" ref={closeRef} onClick={() => setOpen(null)} aria-label={t.legal.close}>
            <X size={20} />
          </button>
        </div>
        <section>
          {t.legal.privacy.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
        <section id="cookie-policy">
          <h3>{t.legal.cookiesTitle}</h3>
          {t.legal.cookies.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      </div>
    </div>
  );
}
