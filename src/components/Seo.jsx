import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { site } from '../config';
import { useI18n } from '../context/Language';
import { pageUrl } from '../lib/nav';

function setMeta(name, content, attribute = 'name') {
  let element = document.head.querySelector(`meta[${attribute}="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setAlternate(hreflang, href) {
  let element = document.head.querySelector(`link[data-hreflang="${hreflang}"]`);
  if (!element) {
    element = document.createElement('link');
    element.rel = 'alternate';
    element.dataset.hreflang = hreflang;
    document.head.appendChild(element);
  }
  element.hreflang = hreflang;
  element.href = href;
}

export function Seo({ title, description }) {
  const { lang } = useI18n();
  const location = useLocation();

  useEffect(() => {
    document.title = title;
    document.documentElement.lang = lang;
    setMeta('description', description);
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', 'website', 'property');

    const canonicalHref = pageUrl(site.url, location.pathname, lang);
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalHref;
    setMeta('og:url', canonicalHref, 'property');
    setAlternate('lv', pageUrl(site.url, location.pathname, 'lv'));
    setAlternate('en', pageUrl(site.url, location.pathname, 'en'));
    setAlternate('x-default', pageUrl(site.url, location.pathname, 'lv'));
  }, [title, description, lang, location.pathname]);

  return null;
}
