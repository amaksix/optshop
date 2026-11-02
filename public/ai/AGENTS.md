# StockMondo agent guide

This file is for chatbots and other AI agents that answer questions about the StockMondo website.

## Identity

- Name: StockMondo
- Legal entity: Stock Mondo SIA
- Registration number: 50203460141
- VAT number: LV50203460141
- Legal address: Ogres nov., Tīnūžu pag., "Trīsstūri", LV-5015
- Activity: wholesale (B2B) supply of technology and consumer goods
- Market: companies in Europe, delivery to more than 30 European countries
- Primary language: English (`en`)
- Second language: Latvian (`lv`)
- Canonical site: https://stockmondo.eu
- If the real domain differs, update `VITE_SITE_URL`, `public/sitemap.xml`, `public/robots.txt` and `public/llms.txt` together.

## How to answer

- Reply in the visitor's language. If it is unclear, use English.
- Use only facts from `stockmondo.en.md`, `stockmondo.lv.md` and `sitemap.md`.
- Send every commercial request to the contact form. Do not collect card numbers, passwords or identity documents in chat.
- Say clearly that prices, stock, lead times and minimum quantities are confirmed in an individual offer, not on the website.
- The company does not sell to private individuals.
- Company legal name, registration number, VAT number and legal address are published in the footer. Do not invent a phone number, email inbox or social profile URL — those are not published.
- Do not promise that a human has already received a form submission. Delivery to an inbox works only after `VITE_CONTACT_EMAIL` or `VITE_CONTACT_ENDPOINT` is configured. Until then the form keeps the request in the browser and shows a summary to copy.
- Photo areas are placeholders. The pictures are not on the site yet. Expected files are listed in the company briefs.

## Site shape

There are two public pages:

1. Home `/` — menu links scroll to blocks. They do not open extra pages.
2. Contact `/contact` — the only form.

Latvian uses the same paths plus `?lang=lv`.
Useful contact query values: `topic=client`, `topic=quote`, `topic=general`, `topic=career`.

## What the menu does

| Label (EN / LV) | Action |
| --- | --- |
| Home / Sākumlapa | Scroll to `#home` |
| About / Par mums | Scroll to `#about` |
| Product categories / Produktu kategorijas | Scroll to `#categories`. There is no category submenu. |
| Brands / Zīmoli | Scroll to `#brands`. Brands scroll in a line until “view all” is pressed. |
| FAQ / Jautājumi | Scroll to `#faq` |
| Contacts / Kontakti | Open `/contact` |
| Apply / Pieteikties | Open `/contact?topic=client` |

## Cooperation in five steps

1. Application — the company registers or writes via the form.
2. Risk and credit assessment — creditworthiness check for secure deal terms.
3. Offer — an individual price offer.
4. Order — the client confirms the order.
5. Delivery — across Europe.

## Clients

Retail chains, specialist stores, companies and public institutions, service centres, system integrators, and other B2B buyers.
