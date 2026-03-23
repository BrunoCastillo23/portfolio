import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { contactLinks } from '../data/portfolio';

// ── EmailJS config ──────────────────────────────────
const EJ_SERVICE  = 'service_yjvvhd6';
const EJ_TEMPLATE = 'template_07s1suo';
const EJ_PUBLIC   = '_QdYPwKMMi64M2bwD';

// ── Iconos ──────────────────────────────────────────
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

const allLinks = [
  { icon: 'phone' as const,   label: 'WhatsApp / Llamada',  value: '+51 912 293 737',            href: 'tel:+51912293737' },
  { icon: 'email' as const,   label: 'Email personal',      value: 'castillobruno0104@gmail.com', href: 'mailto:castillobruno0104@gmail.com' },
  { icon: 'github' as const,  label: 'GitHub',              value: 'github.com/BrunoCastillo23',  href: 'https://github.com/BrunoCastillo23' },
  { icon: 'linkedin' as const,label: 'LinkedIn',            value: 'Bruno Castillo Robles',       href: 'https://www.linkedin.com/in/bruno-castillo-robles' },
];

const iconMap = {
  phone:    <PhoneIcon />,
  email:    <EmailIcon />,
  github:   <GithubIcon />,
  linkedin: <LinkedinIcon />,
};

// ── Estado del formulario ───────────────────────────
type Status = 'idle' | 'sending' | 'success' | 'error';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({
    from_name:  '',
    from_email: '',
    subject:    '',
    message:    '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.send(EJ_SERVICE, EJ_TEMPLATE, form, EJ_PUBLIC);
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
        <div className="sec-label">¿Trabajamos juntos?</div>
        <h2 className="sec-title">
          Hablemos de tu <strong>proyecto</strong>
        </h2>

        <div className="contact__grid">
          {/* Links */}
          <div>
            <p className="contact__desc">
              Estoy disponible para proyectos freelance, colaboraciones y oportunidades laborales.
              No dudes en escribirme — respondo en menos de 24 horas.
            </p>
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
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form__row">
              <input
                type="text"
                name="from_name"
                placeholder="Tu nombre"
                value={form.from_name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="from_email"
                placeholder="Tu email"
                value={form.from_email}
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="text"
              name="subject"
              placeholder="Asunto"
              value={form.subject}
              onChange={handleChange}
            />

            <textarea
              name="message"
              placeholder="Cuéntame sobre tu proyecto..."
              value={form.message}
              onChange={handleChange}
              required
            />

            {/* Botón con estados */}
            <button
              type="submit"
              className="btn btn--white contact-form__btn"
              disabled={status === 'sending'}
            >
              {status === 'idle' && (<>Enviar mensaje <SendIcon /></>)}
              {status === 'sending' && (
                <><span className="contact-form__spinner" /> Enviando...</>
              )}
              {status === 'success' && <>✓ Mensaje enviado con éxito</>}
              {status === 'error' && <>✕ Error al enviar. Intenta de nuevo</>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
