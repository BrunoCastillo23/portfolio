import React, { useState } from 'react';
import { useLang } from '../context/LangContext';

import logoCV       from '../assets/marcas/ConsigueVentas.svg';
import logoEffetha  from '../assets/marcas/Effetha.svg';
import logoKare     from '../assets/marcas/Kare.svg';
import logoPV       from '../assets/marcas/PVElectronica.svg';
import logoTicorp   from '../assets/marcas/Ticorp.png';
import logoSerg     from '../assets/marcas/Sergenind.svg';

// ── Foto del cargo ───────────────────────────────────
import fotoResponsableSoftware from '../assets/fotos/Responsable_Software.png';

// Datos bilingües
const expData = {
  es: {
    label: 'Trayectoria',
    title: 'Experiencia',
    strong: 'laboral',
    sub: 'Mi recorrido profesional construyendo y liderando proyectos web reales.',
    fulltime: 'Tiempo completo',
    totalPeriod: '17 Feb 2025 – 17 Jun 2026',
    brandsLabel: 'Marcas gestionadas',
    role: {
      title: 'Responsable de Desarrollo Software',
      period: '17 Feb 2025 – 17 Jun 2026',
      badge: 'Rol finalizado',
      desc: 'Fui responsable del área de desarrollo de software, liderando proyectos tecnológicos y coordinando con el equipo para garantizar la calidad y entrega de soluciones digitales.',
      achievements: [
        'Lideré el área de desarrollo de software de la agencia',
        'Coordiné proyectos tecnológicos con el equipo técnico y superiores',
        'Garanticé la calidad y entrega oportuna de soluciones digitales',
        'Gestioné y organicé al personal del área de desarrollo',
        'Supervisé el desempeño y evolución del equipo',
        'Desarrollé aplicaciones con Java y Spring Boot para servicios backend robustos',
        'Construí interfaces modernas con Angular para proyectos empresariales',
        'Implementé y administré contenedores con Docker para entornos reproducibles',
        'Desplegué y gestioné infraestructura en servidores de DigitalOcean',
      ],
      tags: ['Java', 'Spring Boot', 'Angular', 'Docker', 'DigitalOcean', 'WordPress', 'HTML5', 'CSS3', 'JavaScript', 'PHP', 'Liderazgo'],
    },
  },
  en: {
    label: 'Career',
    title: 'Work',
    strong: 'experience',
    sub: 'My professional journey building and leading real web projects.',
    fulltime: 'Full time',
    totalPeriod: 'Feb 17, 2025 – Jun 17, 2026',
    brandsLabel: 'Managed brands',
    role: {
      title: 'Software Development Lead',
      period: 'Feb 17, 2025 – Jun 17, 2026',
      badge: 'Former role',
      desc: 'I was responsible for the software development area, leading technology projects and coordinating with the team to ensure quality and timely delivery of digital solutions.',
      achievements: [
        'Led the software development area of the agency',
        'Coordinated technology projects with the technical team and management',
        'Ensured quality and timely delivery of digital solutions',
        'Managed and organized development team members',
        'Supervised team performance and professional growth',
        'Developed applications with Java and Spring Boot for robust backend services',
        'Built modern interfaces with Angular for enterprise projects',
        'Implemented and managed containers with Docker for reproducible environments',
        'Deployed and managed infrastructure on DigitalOcean servers',
      ],
      tags: ['Java', 'Spring Boot', 'Angular', 'Docker', 'DigitalOcean', 'WordPress', 'HTML5', 'CSS3', 'JavaScript', 'PHP', 'Leadership'],
    },
  },
};

const brands = [
  { name: 'Effetha',        logo: logoEffetha },
  { name: 'Kare Salud',     logo: logoKare    },
  { name: 'PV Electrónica', logo: logoPV      },
  { name: 'Ticor Perú',     logo: logoTicorp  },
  { name: 'Sergenind',      logo: logoSerg    },
];

const Experience: React.FC = () => {
  const { lang } = useLang();
  const d = expData[lang];
  const [openCard, setOpenCard] = useState<number | null>(0);

  return (
    <section id="experiencia" className="section experience">
      <div className="wrap">
        <div className="sec-label">{d.label}</div>
        <h2 className="sec-title">{d.title} <strong>{d.strong}</strong></h2>
        <p className="experience__sub">{d.sub}</p>

        <div className="exp-list">
          <div className={`exp-card${openCard === 0 ? ' exp-card--open' : ''}`}>

            {/* Header */}
            <button className="exp-card__header" onClick={() => setOpenCard(openCard === 0 ? null : 0)}>
              <div className="exp-card__logo-wrap">
                <img src={logoCV} alt="Consigue Ventas" className="exp-card__logo" />
              </div>
              <div className="exp-card__meta">
                <div className="exp-card__role">{d.role.title}</div>
                <div className="exp-card__company">Consigue Ventas</div>
                <div className="exp-card__info">
                  <span className="exp-badge">{d.totalPeriod}</span>
                  <span className="exp-badge">Lima, {lang === 'es' ? 'Perú' : 'Peru'}</span>
                  <span className="exp-badge exp-badge--accent">{d.fulltime}</span>
                </div>
              </div>
              <div className={`exp-card__chevron${openCard === 0 ? ' rotated' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </button>

            {/* Body */}
            {openCard === 0 && (
              <div className="exp-card__body">
                <div className="exp-card__body-grid">

                  {/* Izquierda */}
                  <div className="exp-card__body-left">
                    <p className="exp-card__desc">{d.role.desc}</p>
                    <div className="exp-card__achievements">
                      {d.role.achievements.map((a, j) => (
                        <div key={j} className="exp-achievement">
                          <div className="exp-achievement__dot" />
                          <span>{a}</span>
                        </div>
                      ))}
                    </div>
                    <div className="tag-row">
                      {d.role.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* Derecha: foto + marcas */}
                  <div className="exp-card__body-right">
                    <div className="exp-role-photo-wrap">
                      <img
                        src={fotoResponsableSoftware}
                        alt={d.role.title}
                        className="exp-role-photo"
                      />
                      <div className="exp-role-photo__label">
                        <span>{d.role.title}</span>
                        <span>Consigue Ventas</span>
                      </div>
                    </div>
                    <div className="exp-brands-below">
                      <div className="exp-card__brands-label">{d.brandsLabel}</div>
                      <div className="exp-card__brands">
                        {brands.map((b) => (
                          <div key={b.name} className="exp-brand">
                            <img src={b.logo} alt={b.name} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
