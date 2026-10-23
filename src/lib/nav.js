export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function sectionHref(lang, id) {
  const params = new URLSearchParams();
  if (lang === 'en') params.set('lang', 'en');
  const query = params.toString();
  return `/${query ? `?${query}` : ''}${id ? `#${id}` : ''}`;
}

export function contactHref(lang, topic) {
  const params = new URLSearchParams();
  if (lang === 'en') params.set('lang', 'en');
  if (topic) params.set('topic', topic);
  const query = params.toString();
  return `/contact${query ? `?${query}` : ''}`;
}

export function pageUrl(siteUrl, pathname, lang) {
  const url = new URL(pathname || '/', siteUrl);
  if (lang === 'en') url.searchParams.set('lang', 'en');
  return url.toString();
}
