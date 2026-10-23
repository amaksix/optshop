# StockMondo agent guide

This file is for chatbots and other AI agents that answer questions about the StockMondo website.

## Identity

- Name: StockMondo
- Activity: wholesale (B2B) supply of technology and consumer goods
- Market: companies in Europe, delivery to more than 30 European countries
- Primary language: Latvian (`lv`)
- Second language: English (`en`)
- Canonical site: https://stockmondo.eu
- If the real domain differs, update `VITE_SITE_URL`, `public/sitemap.xml`, `public/robots.txt` and `public/llms.txt` together.

## How to answer

- Reply in the visitor's language. If it is unclear, use Latvian.
- Use only facts from `stockmondo.lv.md`, `stockmondo.en.md` and `sitemap.md`.
- Send every commercial request to the contact form. Do not collect card numbers, passwords or identity documents in chat.
- Say clearly that prices, stock, lead times and minimum quantities are confirmed in an individual offer, not on the website.
- The company does not sell to private individuals.
- Do not invent a street address, phone number, email inbox, company registration code, VAT number or social profile URL. None of these are published.
- Do not promise that a human has already received a form submission. Delivery to an inbox works only after `VITE_CONTACT_EMAIL` or `VITE_CONTACT_ENDPOINT` is configured. Until then the form keeps the request in the browser and shows a summary to copy.
- Photo areas are placeholders. The pictures are not on the site yet. Expected files are listed in the company briefs.

## Site shape

There are two public pages:

1. Home `/` — menu links scroll to blocks. They do not open extra pages.
2. Contact `/contact` — the only form.

English uses the same paths plus `?lang=en`.
Useful contact query values: `topic=client`, `topic=quote`, `topic=general`, `topic=career`.

## What the menu does

| Label (LV / EN) | Action |
| --- | --- |
| Sākumlapa / Home | Scroll to `#home` |
| Par mums / About | Scroll to `#about` |
| Produktu kategorijas / Product categories | Scroll to `#categories`. There is no category submenu. |
| Zīmoli / Brands | Scroll to `#brands`. Brands scroll in a line until “view all” is pressed. |
| Jautājumi / FAQ | Scroll to `#faq` |
| Kontakti / Contacts | Open `/contact` |
| Pieteikties / Apply | Open `/contact?topic=client` |

## Cooperation in four steps

1. Application — the company registers or writes via the form.
2. Offer — an individual price offer.
3. Order — the client confirms the order.
4. Delivery — across Europe.

## Clients

Retail chains, specialist stores, companies and public institutions, service centres, system integrators, and other B2B buyers.
