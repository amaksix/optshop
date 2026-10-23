import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { company } from '../config';
import { useI18n } from '../context/Language';
import { useLegal } from '../context/Legal';
import { contactHref, sectionHref } from '../lib/nav';
import { Logo } from './Logo';

const socials = [
  { id: 'linkedin', Icon: Linkedin },
  { id: 'instagram', Icon: Instagram },
  { id: 'facebook', Icon: Facebook },
  { id: 'youtube', Icon: Youtube },
];

function Fact({ label, value }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value || '—'}</dd>
    </div>
  );
}

export function Footer() {
  const { lang, t } = useI18n();
  const { setOpen } = useLegal();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div className="footer__brand">
          <Logo />
          <div className="socials">
            {socials.map(({ id, Icon }) => (
              <span key={id} className="social" aria-hidden="true">
                <Icon size={16} />
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2>{t.footer.site}</h2>
          <ul>
            <li><Link to={sectionHref(lang, 'home')}>{t.nav.home}</Link></li>
            <li><Link to={sectionHref(lang, 'categories')}>{t.nav.categories}</Link></li>
            <li><Link to={sectionHref(lang, 'brands')}>{t.nav.brands}</Link></li>
            <li><Link to={sectionHref(lang, 'about')}>{t.nav.about}</Link></li>
            <li><Link to={sectionHref(lang, 'faq')}>{t.nav.faq}</Link></li>
            <li><Link to={contactHref(lang)}>{t.nav.contact}</Link></li>
          </ul>
        </div>

        <div>
          <h2>{t.footer.documents}</h2>
          <ul>
            <li>
              <button type="button" onClick={() => setOpen('privacy')}>{t.footer.privacy}</button>
            </li>
            <li>
              <button type="button" onClick={() => setOpen('cookies')}>{t.footer.cookies}</button>
            </li>
            <li>
              <a href="/sitemap.xml">{t.footer.sitemap}</a>
            </li>
          </ul>
        </div>

        <div>
          <h2>{t.footer.company}</h2>
          <dl className="company-facts">
            <Fact label={t.footer.legalName} value={company.legalName} />
            <Fact label={t.footer.reg} value={company.registrationNumber} />
            <Fact label={t.footer.vat} value={company.vatNumber} />
            <Fact label={t.footer.address} value={company.address} />
          </dl>
        </div>
      </div>
      <div className="wrap footer__bottom">
        <p className="footer__copy">© {year} StockMondo. {t.footer.rights}</p>
      </div>
    </footer>
  );
}
