import React, { useState } from 'react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Equipo Consigue Ventas',
    role: 'Empresa de Marketing Digital',
    company: 'Consigue Ventas',
    initials: 'CV',
    text: 'Bruno demostró ser un desarrollador comprometido y proactivo. Su capacidad para gestionar múltiples proyectos simultáneamente y entregar resultados de calidad en tiempo récord fue fundamental para el crecimiento digital de nuestras marcas.',
  },
  {
    name: 'Tu nombre aquí',
    role: 'Tu cargo',
    company: 'Tu empresa',
    initials: 'TN',
    text: 'Aquí va el testimonio. Puedes pedirle a un colega, cliente o compañero que escriba uno y reemplazar este texto. Un testimonio real de 2-3 oraciones es suficiente.',
  },
  {
    name: 'Tu nombre aquí',
    role: 'Tu cargo',
    company: 'Tu empresa',
    initials: 'TN',
    text: 'Otro testimonio de alguien que ha trabajado contigo. Cuanto más específico sea — mencionando un proyecto o resultado concreto — más impacto tendrá en quien lo lea.',
  },
];

const QuoteIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.692-1.327-.817-.56-.124-1.074-.13-1.54-.022-.16-.94.09-1.95.75-3.02.66-1.06 1.514-1.86 2.557-2.4L18.49 5c-.8.396-1.555.898-2.26 1.505-.708.607-1.34 1.305-1.894 2.094-.556.79-.97 1.68-1.24 2.69-.273 1-.345 2.04-.217 3.1.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003z"/>
  </svg>
);

const Testimonials: React.FC = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="testimonios" className="section testimonials">
      <div className="wrap">
        <div className="sec-label">Lo que dicen</div>
        <h2 className="sec-title">
          Personas que han <strong>trabajado conmigo</strong>
        </h2>

        <div className="testimonials__grid">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`testi-card${i === active ? ' testi-card--active' : ''}`}
              onClick={() => setActive(i)}
            >
              {/* Comillas */}
              <div className="testi-card__quote">
                <QuoteIcon />
              </div>

              {/* Texto */}
              <p className="testi-card__text">{t.text}</p>

              {/* Autor */}
              <div className="testi-card__author">
                <div className="testi-card__avatar">{t.initials}</div>
                <div>
                  <div className="testi-card__name">{t.name}</div>
                  <div className="testi-card__role">{t.role} · {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="testimonials__hint">
          💡 Reemplaza los testimonios de ejemplo con reseñas reales de colegas o clientes en{' '}
          <code>src/components/Testimonials.tsx</code>
        </p>
      </div>
    </section>
  );
};

export default Testimonials;
