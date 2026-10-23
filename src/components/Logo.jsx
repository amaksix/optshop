import { Link } from 'react-router-dom';
import { sectionHref } from '../lib/nav';
import { useI18n } from '../context/Language';

export function Logo() {
  const { lang, t } = useI18n();

  return (
    <Link to={sectionHref(lang, 'home')} className="logo" aria-label="StockMondo">
      <span className="logo__name">
        <span className="logo__stock">STOCK</span>
        <span className="logo__mondo">MONDO</span>
      </span>
      <span className="logo__tag">{t.nav.tagline}</span>
    </Link>
  );
}
