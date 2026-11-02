import { Link } from 'react-router-dom';
import { sectionHref } from '../lib/nav';
import { useI18n } from '../context/Language';

const LOGO_SRC = {
  color: `${import.meta.env.BASE_URL}images/StockMondo_blue_svg.svg`,
  white: `${import.meta.env.BASE_URL}images/StockMondo_white_svg.svg`,
};

export function Logo({ variant = 'color' }) {
  const { lang } = useI18n();
  const src = LOGO_SRC[variant] ?? LOGO_SRC.color;

  return (
    <Link to={sectionHref(lang, 'home')} className="logo" aria-label="StockMondo">
      <img
        className="logo__img"
        src={src}
        alt="StockMondo"
        width={210}
        height={64}
        decoding="async"
      />
    </Link>
  );
}
