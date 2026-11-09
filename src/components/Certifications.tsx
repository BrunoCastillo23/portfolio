import React from 'react';
import { useLang } from '../context/LangContext';

type L = { es: string; en: string };

interface Item {
  icon: string;
  kind: L;
  title: L;
  org: string;
  date: L;
  detail: L;
}

const items: Item[] = [
  {
    icon: '🗄️',
    kind: { es: 'Certificación', en: 'Certification' },
    title: { es: 'Especialización en Microsoft SQL Server', en: 'Microsoft SQL Server Specialization' },
    org: 'Datux Perú S.A.C.',
    date: { es: 'May – Jun 2026', en: 'May – Jun 2026' },
    detail: { es: 'Niveles básico, intermedio y avanzado · 68 horas · Nota 19/20', en: 'Basic, intermediate and advanced levels · 68 hours · Grade 19/20' },
  },
  {
    icon: '🌐',
    kind: { es: 'Idioma', en: 'Language' },
    title: { es: 'Inglés — nivel intermedio', en: 'English — intermediate level' },
    org: 'Instituto de Idiomas UNJFSC',
    date: { es: '2023 – 2025', en: '2023 – 2025' },
    detail: { es: 'Básico (2023–2024) e intermedio (2024–2025)', en: 'Basic (2023–2024) and intermediate (2024–2025)' },
  },
  {
    icon: '🎪',
    kind: { es: 'Evento', en: 'Event' },
    title: { es: 'DevFest Lima 2025', en: 'DevFest Lima 2025' },
    org: 'Google Developer Groups',
    date: { es: '2025', en: '2025' },
    detail: { es: 'Charlas y talleres de la comunidad de desarrolladores de Google', en: 'Talks and workshops from the Google developer community' },
  },
];

const Certifications: React.FC = () => {
  const { lang, t } = useLang();
  return (
    <section id="certificaciones" className="section certs">
      <div className="wrap">
        <div className="sec-label">{t.certs.label}</div>
        <h2 className="sec-title">{t.certs.title} <strong>{t.certs.strong}</strong></h2>
        <div className="certs__grid">
          {items.map((it) => (
            <article key={it.title.es} className="cert-card">
              <div className="cert-card__top">
                <div className="pd-card__icon">{it.icon}</div>
                <span className="exp-badge exp-badge--accent">{it.kind[lang]}</span>
              </div>
              <h3 className="cert-card__title">{it.title[lang]}</h3>
              <div className="cert-card__org">{it.org}</div>
              <p className="cert-card__detail">{it.detail[lang]}</p>
              <div className="cert-card__date">{it.date[lang]}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
