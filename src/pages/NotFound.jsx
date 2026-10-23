import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { useI18n } from '../context/Language';
import { contactHref, sectionHref } from '../lib/nav';

export function NotFound() {
  const { lang, t } = useI18n();

  return (
    <main id="main" className="not-found">
      <Seo title={t.meta.notFoundTitle} description={t.notFound.text} />
      <div className="wrap">
        <p className="eyebrow eyebrow--dark">404</p>
        <h1>{t.notFound.title}</h1>
        <p>{t.notFound.text}</p>
        <div className="hero__actions">
          <Link className="btn btn--primary" to={sectionHref(lang, 'home')}>
            {t.notFound.home}
          </Link>
          <Link className="btn btn--ghost-dark" to={contactHref(lang)}>
            {t.notFound.contact}
          </Link>
        </div>
      </div>
    </main>
  );
}
