import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useLang } from '../context/LangContext';
import {
  checkRateLimit,
  registerSubmission,
  sanitize,
  validateForm,
} from '../hooks/useFormSecurity';

const EJ_SERVICE  = import.meta.env.VITE_EJ_SERVICE  as string;
const EJ_TEMPLATE = import.meta.env.VITE_EJ_TEMPLATE as string;
const EJ_PUBLIC   = import.meta.env.VITE_EJ_PUBLIC   as string;

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.44 2 2 0 0 1 3.58 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l1.62-1.62a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);
const SendIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const iconMap = {
  phone:    <PhoneIcon />,
  email:    <EmailIcon />,
  github:   <GithubIcon />,
  linkedin: <LinkedinIcon />,
};

type Status = 'idle' | 'sending' | 'success' | 'error' | 'rate_limited';

const Contact: React.FC = () => {
  const { lang, t } = useLang();
  const [status,      setStatus]      = useState<Status>('idle');
  const [errors,      setErrors]      = useState<Record<string, string>>({});
  const [minutesLeft, setMinutesLeft] = useState(0);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    from_name:  '',
    from_email: '',
    subject:    '',
    message:    '',
  });

  // Links con labels traducidos
  const allLinks = [
    { icon: 'phone'    as const, label: lang === 'es' ? 'WhatsApp / Llamada'  : 'WhatsApp / Call',    value: '+51 912 293 737',             href: 'tel:+51912293737' },
    { icon: 'email'    as const, label: lang === 'es' ? 'Email personal'      : 'Personal email',     value: 'castillobruno0104@gmail.com', href: 'mailto:castillobruno0104@gmail.com' },
    { icon: 'github'   as const, label: 'GitHub',                                                      value: 'github.com/BrunoCastillo23',  href: 'https://github.com/BrunoCastillo23' },
    { icon: 'linkedin' as const, label: 'LinkedIn',                                                    value: 'Bruno Castillo Robles',       href: 'https://www.linkedin.com/in/bruno-castillo-robles' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypotRef.current?.value) return;

    const { allowed, minutesLeft: ml } = checkRateLimit();
    if (!allowed) { setMinutesLeft(ml); setStatus('rate_limited'); return; }

    const { valid, errors: validationErrors } = validateForm(form);
    if (!valid) { setErrors(validationErrors); return; }

    setStatus('sending');
    setErrors({});

    const safePayload = {
      from_name:  sanitize(form.from_name),
      from_email: sanitize(form.from_email),
      subject:    sanitize(form.subject || (lang === 'es' ? 'Sin asunto' : 'No subject')),
      message:    sanitize(form.message),
    };

    try {
      await emailjs.send(EJ_SERVICE, EJ_TEMPLATE, safePayload, EJ_PUBLIC);
      registerSubmission();
      setStatus('success');
      setForm({ from_name: '', from_email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contacto" className="section contact">
      <div className="wrap">
        <div className="sec-label">{t.contact.label}</div>
        <h2 className="sec-title">
          {t.contact.title} <strong>{t.contact.strong}</strong>
        </h2>

        <div className="contact__grid">
          {/* Links */}
          <div>
            <p className="contact__desc">{t.contact.desc}</p>
            <div className="contact__links">
              {allLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.icon === 'github' || link.icon === 'linkedin' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="contact__link"
                >
                  <div className="contact__link-ico">{iconMap[link.icon]}</div>
                  <div>
                    <div className="contact__link-val">{link.value}</div>
                    <div className="contact__link-lbl">{link.label}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Formulario */}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <input ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: 'none' }} />

            <div className="contact-form__row">
              <div className="contact-form__field">
                <input type="text" name="from_name" placeholder={t.contact.name} value={form.from_name} onChange={handleChange} maxLength={80} className={errors.from_name ? 'input--error' : ''} />
                {errors.from_name && <span className="contact-form__error">{errors.from_name}</span>}
              </div>
              <div className="contact-form__field">
                <input type="email" name="from_email" placeholder={t.contact.email} value={form.from_email} onChange={handleChange} className={errors.from_email ? 'input--error' : ''} />
                {errors.from_email && <span className="contact-form__error">{errors.from_email}</span>}
              </div>
            </div>

            <div className="contact-form__field">
              <input type="text" name="subject" placeholder={t.contact.subject} value={form.subject} onChange={handleChange} maxLength={120} className={errors.subject ? 'input--error' : ''} />
              {errors.subject && <span className="contact-form__error">{errors.subject}</span>}
            </div>

            <div className="contact-form__field">
              <textarea name="message" placeholder={t.contact.message} value={form.message} onChange={handleChange} maxLength={2000} className={errors.message ? 'input--error' : ''} />
              <div className="contact-form__char-count">{form.message.length}/2000</div>
              {errors.message && <span className="contact-form__error">{errors.message}</span>}
            </div>

            {status === 'rate_limited' && (
              <div className="contact-form__alert contact-form__alert--warn">
                {t.contact.rateLimitMsg} {minutesLeft} {t.contact.rateLimitMin}
              </div>
            )}

            <button type="submit" className="btn btn--white contact-form__btn" disabled={status === 'sending' || status === 'rate_limited'}>
              {status === 'idle'         && (<>{t.contact.send} <SendIcon /></>)}
              {status === 'sending'      && (<><span className="contact-form__spinner" /> {t.contact.sending}</>)}
              {status === 'success'      && <>{t.contact.success}</>}
              {status === 'error'        && <>{t.contact.error}</>}
              {status === 'rate_limited' && <>{t.contact.rateLimit}</>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
