import { useI18n } from '../context/Language';
import { useLegal } from '../context/Legal';

export function CookieBanner() {
  const { t } = useI18n();
  const { accepted, accept, setOpen } = useLegal();

  if (accepted) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-labelledby="cookie-banner-title">
      <div className="wrap cookie-banner__inner">
        <div>
          <p id="cookie-banner-title">{t.legal.bannerTitle}</p>
          <p>{t.legal.bannerText}</p>
        </div>
        <div className="cookie-banner__actions">
          <button type="button" className="btn btn--ghost" onClick={() => setOpen('privacy')}>
            {t.legal.privacyTitle}
          </button>
          <button type="button" className="btn btn--primary" onClick={accept}>
            {t.legal.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
