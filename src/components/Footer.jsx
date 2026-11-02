import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Mail, Phone } from 'lucide-react';
import { company, contactPerson } from '../config';
import { useI18n } from '../context/Language';
import { useLegal } from '../context/Legal';
import { contactHref, sectionHref } from '../lib/nav';
import { Logo } from './Logo';

function Fact({ label, value }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value || '—'}</dd>
    </div>
  );
}

function useIsMobile(query = '(max-width: 700px)') {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

function FooterGroup({ title, isMobile, children }) {
  const [open, setOpen] = useState(false);
  const expanded = !isMobile || open;

  return (
    <div className={`footer__group${isMobile ? ' footer__group--fold' : ''}`}>
      {isMobile ? (
        <button
          type="button"
          className="footer__fold-btn"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span>{title}</span>
          <ChevronDown
            className={`footer__fold-icon${open ? ' is-open' : ''}`}
            size={18}
            aria-hidden="true"
          />
        </button>
      ) : (
        <h2>{title}</h2>
      )}
      <div className="footer__group-body" hidden={!expanded}>
        {children}
      </div>
    </div>
  );
}

export function Footer() {
  const { lang, t } = useI18n();
  const { setOpen } = useLegal();
  const isMobile = useIsMobile();
  const year = new Date().getFullYear();
  const phoneHref = `tel:${contactPerson.phone.replace(/\s+/g, '')}`;

  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div className="footer__brand">
          <Logo variant="white" />
          <div className="footer-contact">
            <p className="footer-contact__title">{t.footer.contactUs}</p>
            <p className="footer-contact__name">{contactPerson.name}</p>
            <p className="footer-contact__role">{t.footer.contactRole}</p>
            <a className="footer-contact__link" href={phoneHref}>
              <Phone size={16} aria-hidden="true" />
              <span>{contactPerson.phone}</span>
            </a>
            <a className="footer-contact__link" href={`mailto:${contactPerson.email}`}>
              <Mail size={16} aria-hidden="true" />
              <span>{contactPerson.email}</span>
            </a>
          </div>
        </div>

        <FooterGroup title={t.footer.site} isMobile={isMobile}>
          <ul>
            <li><Link to={sectionHref(lang, 'home')}>{t.nav.home}</Link></li>
            <li><Link to={sectionHref(lang, 'categories')}>{t.nav.categories}</Link></li>
            <li><Link to={sectionHref(lang, 'brands')}>{t.nav.brands}</Link></li>
            <li><Link to={sectionHref(lang, 'about')}>{t.nav.about}</Link></li>
            <li><Link to={sectionHref(lang, 'faq')}>{t.nav.faq}</Link></li>
            <li><Link to={contactHref(lang)}>{t.nav.contact}</Link></li>
          </ul>
        </FooterGroup>

        <FooterGroup title={t.footer.documents} isMobile={isMobile}>
          <ul>
            <li>
              <button type="button" onClick={() => setOpen('privacy')}>{t.footer.privacy}</button>
            </li>
            <li>
              <button type="button" onClick={() => setOpen('cookies')}>{t.footer.cookies}</button>
            </li>
          </ul>
        </FooterGroup>

        <FooterGroup title={t.footer.company} isMobile={isMobile}>
          <dl className="company-facts">
            <Fact label={t.footer.legalName} value={company.legalName} />
            <Fact label={t.footer.reg} value={company.registrationNumber} />
            <Fact label={t.footer.vat} value={company.vatNumber} />
            <Fact label={t.footer.address} value={company.address} />
          </dl>
        </FooterGroup>
      </div>
      <div className="wrap footer__bottom">
        <p className="footer__copy">© {year} StockMondo. {t.footer.rights}</p>
      </div>
    </footer>
  );
}
