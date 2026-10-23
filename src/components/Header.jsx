import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import { useI18n } from '../context/Language';
import { allBrands, categories } from '../data';
import { translations } from '../i18n';
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState('home');

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (location.pathname !== '/') return undefined;
    const map = {
      home: 'home',
      values: 'home',
      categories: 'categories',
      brands: 'brands',
      about: 'about',
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
    setSearchOpen(false);
    const target = sectionHref(lang, id);
    if (location.pathname === '/' && location.hash === `#${id}`) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    navigate(target);
  };

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const categoryHits = categories.filter((category) => {
      const lv = translations.lv.categories[category.id];
      const en = translations.en.categories[category.id];
      const haystack = `${lv.title} ${lv.short} ${lv.text} ${en.title} ${en.short} ${en.text}`.toLowerCase();
      return !needle || haystack.includes(needle);
    });
    const brandHits = allBrands.filter((brand) => !needle || brand.name.toLowerCase().includes(needle));
    return {
      categories: (needle ? categoryHits : categoryHits.slice(0, 4)).slice(0, 6),
      brands: (needle ? brandHits : allBrands.slice(0, 6)).slice(0, 8),
    };
  }, [query]);

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
            <Link className="btn btn--primary" to={contactHref(lang, 'client')} onClick={() => setMenuOpen(false)}>
              {t.nav.apply}
            </Link>
          </div>
        </nav>
        <div className="header__tools">
          <LangSwitch />
          <button
            type="button"
            className="icon-btn"
            aria-expanded={searchOpen}
            aria-label={t.nav.search}
            onClick={() => {
              setSearchOpen((value) => !value);
              setMenuOpen(false);
            }}
          >
            {searchOpen ? <X size={20} /> : <Search size={20} />}
          </button>
          <Link className="btn btn--primary header__apply" to={contactHref(lang, 'client')}>
            {t.nav.apply}
          </Link>
          <button
            type="button"
            className="icon-btn burger"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t.nav.close : t.nav.open}
            onClick={() => {
              setMenuOpen((value) => !value);
              setSearchOpen(false);
            }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {searchOpen ? (
        <div className="search-panel">
          <div className="wrap">
            <label className="sr-only" htmlFor="site-search">
              {t.nav.search}
            </label>
            <input
              id="site-search"
              className="search-panel__input"
              type="search"
              value={query}
              placeholder={t.search.placeholder}
              onChange={(event) => setQuery(event.target.value)}
              autoFocus
            />
            {!query ? <p className="search-panel__hint">{t.search.hint}</p> : null}
            {results.categories.length === 0 && results.brands.length === 0 ? (
              <p className="search-panel__empty">{t.search.empty}</p>
            ) : (
              <div className="search-panel__cols">
                <div>
                  <p className="search-panel__label">{t.search.categories}</p>
                  <ul>
                    {results.categories.map((category) => (
                      <li key={category.id}>
                        <a href={sectionHref(lang, `cat-${category.id}`)} onClick={(event) => goSection(event, `cat-${category.id}`)}>
                          {t.categories[category.id].title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="search-panel__label">{t.search.brands}</p>
                  <ul>
                    {results.brands.map((brand) => (
                      <li key={brand.name}>
                        <a href={sectionHref(lang, 'brands')} onClick={(event) => goSection(event, 'brands')}>
                          {brand.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
