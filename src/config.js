export const site = {
  name: 'StockMondo',
  url: (import.meta.env.VITE_SITE_URL || 'https://stockmondo.eu').replace(/\/$/, ''),
  tagline: 'Technology wholesale · Europe',
};

/** Fill these in when the company details are confirmed. Empty values show as a dash. */
export const company = {
  legalName: '',
  registrationNumber: '',
  vatNumber: '',
  address: '',
};

export const contactDelivery = {
  endpoint: import.meta.env.VITE_CONTACT_ENDPOINT || '',
  email: import.meta.env.VITE_CONTACT_EMAIL || '',
};
