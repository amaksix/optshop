import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { Icon } from '../components/Icon';
import { PhotoSlot } from '../components/PhotoSlot';
import { Seo } from '../components/Seo';
import { site } from '../config';
import { useI18n } from '../context/Language';
import {
  allBrands,
  categories,
  clients,
  heroPoints,
  homeBrands,
  newsItems,
  partnerPoints,
  steps,
  techBrands,
  values,
} from '../data';
import { contactHref, prefersReducedMotion, sectionHref } from '../lib/nav';

export function HomePage() {
  const { lang, t } = useI18n();
  const location = useLocation();
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const id = location.hash.replace('#', '');
    const index = categories.findIndex((category) => `cat-${category.id}` === id);
    if (index >= 4) setShowAllCategories(true);
  }, [location.hash]);

  useEffect(() => {
    const id = location.hash.replace('#', '');
    const behavior = prefersReducedMotion() ? 'auto' : 'smooth';
    const frame = requestAnimationFrame(() => {
      if (!id) {
        window.scrollTo({ top: 0, behavior });
        return;
      }
      document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.hash, showAllCategories]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'StockMondo',
    url: site.url,
    slogan: site.tagline,
    description: t.meta.homeDescription,
    areaServed: 'Europe',
    knowsLanguage: ['lv', 'en'],
  };

  const visibleCategories = showAllCategories ? categories : categories.slice(0, 4);
  const marqueeBrands = [...allBrands, ...allBrands];

  return (
    <main id="main">
      <Seo title={t.meta.homeTitle} description={t.meta.homeDescription} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      <section className="hero" id="home">
        <div className="wrap hero__grid">
          <div className="hero__copy">
            <p className="eyebrow">{t.hero.eyebrow}</p>
            <h1>
              {t.hero.title} <span className="accent">{t.hero.accent}</span>
            </h1>
            <p className="hero__text">{t.hero.text}</p>
            <div className="hero__actions">
              <a className="btn btn--primary" href={sectionHref(lang, 'partner')}>
                {t.hero.ctaPartner} <ArrowRight size={18} />
              </a>
            </div>
          </div>
          <div className="hero__media">
            <PhotoSlot id="hero-map" label={t.photos.hero} className="photo-slot--dark" />
            <div className="hero__shade" />
          </div>
          <ul className="hero__points">
            {heroPoints.map((point) => (
              <li key={point.id}>
                <span className="point-icon">
                  <Icon name={point.icon} size={18} />
                </span>
                {t.heroPoints[point.id]}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="values" id="values">
        <div className="wrap values__grid">
          {values.map((item) => (
            <article key={item.id} className="value">
              <Icon name={item.icon} size={28} strokeWidth={1.6} />
              <p>{t.values[item.id]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="categories">
        <div className="wrap">
          <div className="section-head">
            <h2>
              <span>{t.categories.title}</span>
              <i className="rule" aria-hidden="true" />
            </h2>
            <button type="button" className="text-link" onClick={() => setShowAllCategories((open) => !open)}>
              {showAllCategories ? t.categories.showLess : t.categories.seeAll} <ArrowRight size={16} />
            </button>
          </div>
          <div className="category-grid">
            {visibleCategories.map((category) => (
              <article key={category.id} id={`cat-${category.id}`} className="category-card">
                <PhotoSlot id={category.photo} label={t.photos.category} />
                <h3>{t.categories[category.id].title}</h3>
                <p>{t.categories[category.id].text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft" id="brands">
        <div className="wrap">
          <div className="section-head">
            <h2>
              <span>{t.brands.title}</span>
              <i className="rule" aria-hidden="true" />
            </h2>
            <button type="button" className={`text-link ${showAllBrands ? 'is-active' : ''}`} onClick={() => setShowAllBrands((open) => !open)}>
              {showAllBrands ? t.brands.showLine : t.brands.seeAll} <ArrowRight size={16} />
            </button>
          </div>
          {showAllBrands ? (
            <>
              <h3 className="brand-subtitle">{t.brands.tech}</h3>
              <ul className="brand-grid">
                {techBrands.map((brand) => (
                  <li key={brand.name}>
                    <BrandLogo brand={brand} />
                  </li>
                ))}
              </ul>
              <h3 className="brand-subtitle">{t.brands.home}</h3>
              <ul className="brand-grid">
                {homeBrands.map((brand) => (
                  <li key={brand.name}>
                    <BrandLogo brand={brand} />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="brand-marquee">
              <ul className="brand-marquee__track" aria-hidden="true">
                {marqueeBrands.map((brand, index) => (
                  <li key={`${brand.name}-${index}`} aria-hidden={index >= allBrands.length}>
                    <BrandLogo brand={brand} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="logistics" id="partner">
        <div className="wrap logistics__grid">
          <div className="logistics__lead">
            <PhotoSlot id="logistics-truck" label={t.photos.truck} className="photo-slot--dark logistics__truck" />
            <div className="logistics__copy">
              <p className="eyebrow">{t.logistics.eyebrow}</p>
              <h2>{t.logistics.title}</h2>
              <p>{t.logistics.text}</p>
              <a className="btn btn--primary" href={sectionHref(lang, 'process')}>
                {t.logistics.more} <ArrowRight size={18} />
              </a>
            </div>
          </div>
          <article className="partner-card">
            <h2>{t.partner.title}</h2>
            <p>{t.partner.text}</p>
            <ul>
              {partnerPoints.map((point) => (
                <li key={point}>
                  <Check size={18} aria-hidden="true" />
                  <span>{t.partner[point]}</span>
                </li>
              ))}
            </ul>
            <Link className="btn btn--primary" to={contactHref(lang, 'client')}>
              {t.partner.cta}
            </Link>
          </article>
          <PhotoSlot id="logistics-handshake" label={t.photos.handshake} className="photo-slot--dark logistics__hands" />
        </div>
      </section>

      <section className="section" id="process">
        <div className="wrap">
          <div className="section-head">
            <h2>
              <span>{t.process.title}</span>
              <i className="rule" aria-hidden="true" />
            </h2>
            <a className="text-link" href={sectionHref(lang, 'faq')}>
              {t.process.more} <ArrowRight size={16} />
            </a>
          </div>
          <ol className="steps">
            {steps.map((step, index) => (
              <li key={step} className="step">
                <span className="step__num">{index + 1}</span>
                <div>
                  <h3>{t.process[step].title}</h3>
                  <p>{t.process[step].text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--soft" id="about">
        <div className="wrap clients">
          <h2>{t.clients.title}</h2>
          <ul className="client-list">
            {clients.map((client) => (
              <li key={client.id}>
                <Icon name={client.icon} size={32} strokeWidth={1.5} />
                <span>{t.clients[client.id]}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="news">
        <div className="wrap">
          <div className="section-head">
            <h2>
              <span>{t.news.title}</span>
              <i className="rule" aria-hidden="true" />
            </h2>
          </div>
          <div className="news-grid">
            {newsItems.map((item) => (
              <article key={item.id} className="news-card" id={`news-${item.id}`}>
                <span className="news-card__icon">
                  <Icon name={item.icon} size={22} />
                </span>
                <h3>{t.news[item.id].title}</h3>
                <p>{t.news[item.id].text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft" id="faq">
        <div className="wrap faq">
          <h2>{t.faq.title}</h2>
          <div className="faq__list">
            {t.faq.items.map((item, index) => {
              const open = openFaq === index;
              return (
                <div key={item.q} className={`faq__item ${open ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? -1 : index)}
                  >
                    <span>{item.q}</span>
                    <span className="faq__mark" aria-hidden="true" />
                  </button>
                  <div className="faq__panel" aria-hidden={!open}>
                    <div className="faq__panel-inner">
                      <p>{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
