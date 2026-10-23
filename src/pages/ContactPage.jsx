import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check, Copy } from 'lucide-react';
import { Seo } from '../components/Seo';
import { contactDelivery } from '../config';
import { useI18n } from '../context/Language';
import { categories, countries, topics } from '../data';

const emptyForm = {
  topic: 'client',
  company: '',
  reg: '',
  person: '',
  email: '',
  phone: '',
  country: 'LV',
  interests: [],
  message: '',
  consent: false,
  website: '',
};

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function remember(entry) {
  try {
    const previous = JSON.parse(localStorage.getItem('stockmondo-requests') || '[]');
    previous.unshift(entry);
    localStorage.setItem('stockmondo-requests', JSON.stringify(previous.slice(0, 20)));
  } catch {
    /* Storage can be unavailable. The summary is still shown. */
  }
}

export function ContactPage() {
  const { lang, t } = useI18n();
  const [params] = useSearchParams();
  const topicFromUrl = params.get('topic');
  const [form, setForm] = useState(() => ({
    ...emptyForm,
    topic: topics.includes(topicFromUrl) ? topicFromUrl : 'client',
  }));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [summary, setSummary] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (topics.includes(topicFromUrl)) {
      setForm((current) => ({ ...current, topic: topicFromUrl }));
    }
  }, [topicFromUrl]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const onChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const toggleInterest = (id) => {
    setForm((current) => ({
      ...current,
      interests: current.interests.includes(id)
        ? current.interests.filter((item) => item !== id)
        : [...current.interests, id],
    }));
  };

  const buildSummary = (value) => {
    const country = countries.find((item) => item[0] === value.country);
    const countryName = country ? country[lang === 'lv' ? 1 : 2] : value.country;
    const interestNames = value.interests.map((id) => t.categories[id].title).join(', ');
    return [
      `StockMondo — ${t.contact.topics[value.topic]}`,
      `${t.contact.company}: ${value.company}`,
      `${t.contact.reg}: ${value.reg || '—'}`,
      `${t.contact.person}: ${value.person}`,
      `${t.contact.email}: ${value.email}`,
      `${t.contact.phone}: ${value.phone}`,
      `${t.contact.country}: ${countryName}`,
      `${t.contact.interests}: ${interestNames || '—'}`,
      '',
      value.message.trim(),
    ].join('\n');
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.company.trim()) nextErrors.company = t.contact.errors.required;
    if (!form.person.trim()) nextErrors.person = t.contact.errors.required;
    if (!isEmail(form.email)) nextErrors.email = t.contact.errors.email;
    if (form.phone.replace(/\D/g, '').length < 6) nextErrors.phone = t.contact.errors.phone;
    if (!form.country) nextErrors.country = t.contact.errors.required;
    if (form.message.trim().length < 10) nextErrors.message = t.contact.errors.message;
    if (!form.consent) nextErrors.consent = t.contact.errors.consent;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const first = Object.keys(nextErrors)[0];
      document.getElementById(first === 'consent' ? 'consent' : first)?.focus();
      return;
    }
    if (form.website) {
      setStatus('sent');
      return;
    }

    const text = buildSummary(form);
    setSummary(text);
    const payload = {
      ...form,
      website: undefined,
      lang,
      createdAt: new Date().toISOString(),
    };
    remember(payload);

    if (contactDelivery.endpoint) {
      setStatus('sending');
      try {
        const response = await fetch(contactDelivery.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error('Request failed');
        setStatus('sent');
      } catch {
        setStatus('error');
      }
      return;
    }

    if (contactDelivery.email) {
      const subject = encodeURIComponent(`StockMondo — ${t.contact.topics[form.topic]}`);
      const body = encodeURIComponent(text);
      window.location.href = `mailto:${contactDelivery.email}?subject=${subject}&body=${body}`;
      setStatus('mailto');
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
    setStatus('local');
  };

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const reset = () => {
    setForm({ ...emptyForm, topic: form.topic, country: form.country });
    setErrors({});
    setStatus('idle');
    setSummary('');
    setCopied(false);
  };

  const done = status === 'sent' || status === 'mailto' || status === 'local';
  const successCopy = {
    sent: [t.contact.success.sentTitle, t.contact.success.sentText],
    mailto: [t.contact.success.mailTitle, t.contact.success.mailText],
    local: [t.contact.success.localTitle, t.contact.success.localText],
  };

  return (
    <main id="main" className="contact-page">
      <Seo title={t.meta.contactTitle} description={t.meta.contactDescription} />
      <div className="wrap">
        <section className="contact-card" id="form">
          <p className="eyebrow eyebrow--dark">{t.nav.contact}</p>
          <h1>{t.contact.title}</h1>
          <p className="contact-card__lead">{t.contact.lead}</p>

          {done ? (
            <div className="success" role="status">
              <span className="success__icon">
                <Check size={22} />
              </span>
              <h2>{successCopy[status][0]}</h2>
              <p>{successCopy[status][1]}</p>
              {status !== 'sent' ? <pre className="success__summary">{summary}</pre> : null}
              <div className="hero__actions">
                {status !== 'sent' ? (
                  <button type="button" className="btn btn--ghost-dark" onClick={copySummary}>
                    <Copy size={16} /> {copied ? t.contact.success.copied : t.contact.success.copy}
                  </button>
                ) : null}
                <button type="button" className="btn btn--primary" onClick={reset}>
                  {t.contact.success.again}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <fieldset className="topics">
                <legend>{t.contact.topic}</legend>
                <div className="topics__row">
                  {topics.map((topic) => (
                    <label key={topic}>
                      <input
                        type="radio"
                        name="topic"
                        value={topic}
                        checked={form.topic === topic}
                        onChange={onChange}
                      />
                      {t.contact.topics[topic]}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="form-grid">
                <Field id="company" label={t.contact.company} error={errors.company} required>
                  <input id="company" name="company" value={form.company} onChange={onChange} autoComplete="organization" aria-invalid={Boolean(errors.company)} aria-describedby={errors.company ? 'company-error' : undefined} />
                </Field>
                <Field id="reg" label={`${t.contact.reg} (${t.contact.regOptional})`}>
                  <input id="reg" name="reg" value={form.reg} onChange={onChange} />
                </Field>
                <Field id="person" label={t.contact.person} error={errors.person} required>
                  <input id="person" name="person" value={form.person} onChange={onChange} autoComplete="name" aria-invalid={Boolean(errors.person)} aria-describedby={errors.person ? 'person-error' : undefined} />
                </Field>
                <Field id="email" label={t.contact.email} error={errors.email} required>
                  <input id="email" name="email" type="email" inputMode="email" value={form.email} onChange={onChange} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
                </Field>
                <Field id="phone" label={t.contact.phone} error={errors.phone} required>
                  <input id="phone" name="phone" type="tel" inputMode="tel" value={form.phone} onChange={onChange} autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} />
                </Field>
                <Field id="country" label={t.contact.country} error={errors.country} required>
                  <select id="country" name="country" value={form.country} onChange={onChange} autoComplete="country">
                    {countries.map(([code, lvName, enName]) => (
                      <option key={code} value={code}>
                        {lang === 'lv' ? lvName : enName}
                      </option>
                    ))}
                  </select>
                </Field>
                <div className="field field--full">
                  <span className="field__label">{t.contact.interests}</span>
                  <div className="checks">
                    {categories.map((category) => (
                      <label key={category.id} className="check">
                        <input
                          type="checkbox"
                          checked={form.interests.includes(category.id)}
                          onChange={() => toggleInterest(category.id)}
                        />
                        <span>{t.categories[category.id].title}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <Field id="message" label={t.contact.message} error={errors.message} required full>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={onChange}
                    placeholder={t.contact.messagePlaceholder}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                </Field>
              </div>

              <div className="hp" aria-hidden="true">
                <label>
                  Website
                  <input tabIndex={-1} autoComplete="off" name="website" value={form.website} onChange={onChange} />
                </label>
              </div>

              <label className={`consent ${errors.consent ? 'has-error' : ''}`}>
                <input id="consent" type="checkbox" name="consent" checked={form.consent} onChange={onChange} aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? 'consent-error' : undefined} />
                <span>{t.contact.consent}</span>
              </label>
              {errors.consent ? <p id="consent-error" className="field__error">{errors.consent}</p> : null}
              {status === 'error' ? <p className="field__error" role="alert">{t.contact.success.fail}</p> : null}

              <button className="btn btn--primary" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? t.contact.sending : t.contact.submit}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}

function Field({ id, label, error, required, full, children }) {
  return (
    <div className={`field ${full ? 'field--full' : ''} ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {children}
      {error ? <p id={`${id}-error`} className="field__error">{error}</p> : null}
    </div>
  );
}
