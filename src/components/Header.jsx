import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useI18n } from '../context/Language';
import { contactHref, sectionHref } from '../lib/nav';
import { LangSwitch } from './LangSwitch';
import { Logo } from './Logo';

const sectionNav = [
  { id: 'home', key: 'home' },
  { id: 'categories', key: 'categories' },
  { id: 'brands', key: 'brands' },
  { id: 'about', key: 'about' },
  { id: 'faq', key: 'faq' },
];

export function Header() {
  const { lang, t } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (location.pathname !== '/') return undefined;
    const map = {
      home: 'home',
      values: 'home',
      categories: 'categories',
      brands: 'brands',
      about: 'about',
      clients: 'about',
      faq: 'faq',
    };
    const elements = Object.keys(map)
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!elements.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(map[visible.target.id] || '');
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.15, 0.4] },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [location.pathname]);

  const goSection = (event, id) => {
    event.preventDefault();
    setMenuOpen(false);
    const target = sectionHref(lang, id);
    if (location.pathname === '/' && location.hash === `#${id}`) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    navigate(target);
  };

  const contactActive = location.pathname === '/contact';

  return (
    <header className={`header ${menuOpen ? 'is-open' : ''}`}>
      <a className="skip" href="#main">
        {t.nav.skip}
      </a>
      <div className="wrap header__bar">
        <Logo />
        <nav className={`nav ${menuOpen ? 'is-open' : ''}`} aria-label={t.nav.menu}>
          {sectionNav.map((item) => (
            <a
              key={item.id}
              href={sectionHref(lang, item.id)}
              className={active === item.key && !contactActive ? 'is-active' : undefined}
              onClick={(event) => goSection(event, item.id)}
            >
              {t.nav[item.key]}
            </a>
          ))}
          <Link to={contactHref(lang)} className={contactActive ? 'is-active' : undefined} onClick={() => setMenuOpen(false)}>
            {t.nav.contact}
          </Link>
          <div className="nav__mobile-tools">
            <LangSwitch />
            <Link className="btn btn--primary" to={contactHref(lang)} onClick={() => setMenuOpen(false)}>
              {t.nav.apply}
            </Link>
          </div>
        </nav>
        <div className="header__tools">
          <LangSwitch />
          <Link className="btn btn--primary header__apply" to={contactHref(lang)}>
            {t.nav.apply}
          </Link>
          <button
            type="button"
            className="icon-btn burger"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t.nav.close : t.nav.open}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
