import React, { useState } from 'react';
import { useLang } from '../context/LangContext';

import fotoBrenda  from '../assets/reseñas/Brenda-Nicole-Tasayco-Saravia.webp';
import fotomaria   from '../assets/reseñas/Maria-Trigoso-Losa.webp';
import fotoMartin  from '../assets/reseñas/Martín-Alonso-Andrés-Puertas-Cuadros.webp';
import fotoVictor  from '../assets/reseñas/Victor-Nontol-Nureña.webp';

interface Testimonial {
  name: string;
  role: { es: string; en: string };
  company: string;
  period: string;
  linkedin: string;
  text: { es: string; en: string };
  photo: string;
  pending: boolean;
}

const testimonials: Testimonial[] = [
  {
    name: 'Brenda Nicole Tasayco Saravia',
    role: { es: 'Líder de Talento Humano', en: 'Human Talent Leader' },
    company: 'Consigue Ventas',
    period: 'Mar 2025 – Mar 2026',
    linkedin: 'https://www.linkedin.com/in/brenda-nicole/',
    photo: fotoBrenda,
    pending: false,
    text: {
      es: 'Tuve el gusto de trabajar con él y puedo destacar su fuerte liderazgo, organización y enfoque en resultados. Su solidez técnica, comunicación efectiva y actitud proactiva facilitan el trabajo entre áreas y contribuyen directamente al éxito de los proyectos. Es confiable, comprometido y capaz de desempeñarse con excelencia en entornos exigentes. Lo recomiendo totalmente como un talento que aporta valor real y genera impacto positivo en cualquier organización.',
      en: 'I had the pleasure of working with him and can highlight his strong leadership, organization and results-driven focus. His technical strength, effective communication and proactive attitude facilitate cross-team collaboration and directly contribute to project success. He is reliable, committed and capable of performing with excellence in demanding environments. I highly recommend him as a talent who adds real value and generates positive impact in any organization.',
    },
  },
  {
    name: 'Maria Trigoso Loza',
    role: { es: 'Líder de Talento Humano', en: 'Human Talent Leader' },
    company: 'Consigue Ventas',
    period: 'Mar 2026 – Presente',
    linkedin: 'https://www.linkedin.com/in/maria-trigoso-loza-a22748265/',
    photo: fotomaria,
    pending: true,
    text: { es: '', en: '' },
  },
  {
    name: 'Martín Alonso Andrés Puertas Cuadros',
    role: { es: 'Líder de Tecnología', en: 'Technology Leader' },
    company: 'Consigue Ventas',
    period: 'Ene 2025 – Presente',
    linkedin: 'https://www.linkedin.com/in/martin-alonso-andres-puertas-cuadros/',
    photo: fotoMartin,
    pending: true,
    text: { es: '', en: '' },
  },
  {
    name: 'Victor Jesus Nontol Nureña',
    role: { es: 'Co-responsable de Desarrollo Web', en: 'Co-Lead Web Development' },
    company: 'Consigue Ventas',
    period: '17 Mar 2026 – Presente',
    linkedin: 'https://www.linkedin.com/in/victor-jesus-nontol-nure%C3%B1a-8b4891367/',
    photo: fotoVictor,
    pending: true,
    text: { es: '', en: '' },
  },
];

const QuoteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.692-1.327-.817-.56-.124-1.074-.13-1.54-.022-.16-.94.09-1.95.75-3.02.66-1.06 1.514-1.86 2.557-2.4L18.49 5c-.8.396-1.555.898-2.26 1.505-.708.607-1.34 1.305-1.894 2.094-.556.79-.97 1.68-1.24 2.69-.273 1-.345 2.04-.217 3.1.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const Testimonials: React.FC = () => {
  const { lang, t } = useLang();
  const [active, setActive] = useState(0);
  const pendingText = lang === 'es' ? 'Reseña en progreso...' : 'Review in progress...';
  const linkedinText = lang === 'es' ? 'Ver perfil en LinkedIn' : 'View LinkedIn profile';

  return (
    <section id="testimonios" className="section testimonials">
      <div className="wrap">
        <div className="sec-label">{t.testimonials.label}</div>
        <h2 className="sec-title">
          {t.testimonials.title} <strong>{t.testimonials.strong}</strong>
        </h2>

        <div className="testimonials__grid">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className={`testi-card${i === active ? ' testi-card--active' : ''}`}
              onClick={() => setActive(i)}
            >
              <div className="testi-card__header-row">
                <img src={item.photo} alt={item.name} className="testi-card__photo" />
                <div className="testi-card__info">
                  <div className="testi-card__name">{item.name}</div>
                  <div className="testi-card__role">{item.role[lang]}</div>
                  <div className="testi-card__company">{item.company}</div>
                  <span className="testi-card__period-badge">{item.period}</span>
                </div>
              </div>

              <div className="testi-card__divider" />

              <div className="testi-card__quote"><QuoteIcon /></div>

              {item.pending ? (
                <div className="testi-card__pending">
                  <span className="testi-card__pending-dot" />
                  {pendingText}
                </div>
              ) : (
                <p className="testi-card__text">{item.text[lang]}</p>
              )}

              <a
                href={item.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="testi-card__linkedin"
                onClick={(e) => e.stopPropagation()}
              >
                <LinkedInIcon /> {linkedinText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
