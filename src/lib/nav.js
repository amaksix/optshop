export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function sectionHref(lang, id) {
  const params = new URLSearchParams();
  if (lang === 'lv') params.set('lang', 'lv');
  const query = params.toString();
  return `/${query ? `?${query}` : ''}${id ? `#${id}` : ''}`;
}

export function contactHref(lang) {
  const params = new URLSearchParams();
  if (lang === 'lv') params.set('lang', 'lv');
  const query = params.toString();
  return `/contact${query ? `?${query}` : ''}`;
}

export function pageUrl(siteUrl, pathname, lang) {
  const url = new URL(pathname || '/', siteUrl);
  if (lang === 'lv') url.searchParams.set('lang', 'lv');
  return url.toString();
}
