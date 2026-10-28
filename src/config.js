export const site = {
  name: 'StockMondo',
  url: (import.meta.env.VITE_SITE_URL || 'https://stockmondo.eu').replace(/\/$/, ''),
  tagline: 'Technology wholesale · Europe',
};

/** Legal entity details shown in the site footer. */
export const company = {
  legalName: 'Stock Mondo SIA',
  registrationNumber: '50203460141',
  vatNumber: 'LV50203460141',
  address: 'Ogres nov., Tīnūžu pag., "Trīsstūri", LV-5015',
};

/** Primary contact shown in the site footer. */
export const contactPerson = {
  name: 'Inese Hlibova',
  phone: '+371 29444224',
  email: 'sales@stockmondo.com',
};

export const contactDelivery = {
  endpoint: import.meta.env.VITE_CONTACT_ENDPOINT || '',
  email: import.meta.env.VITE_CONTACT_EMAIL || '',
};
