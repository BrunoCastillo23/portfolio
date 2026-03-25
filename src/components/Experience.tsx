import React, { useState } from 'react';

import logoCV       from '../assets/marcas/ConsigueVentas.svg';
import logoEffetha  from '../assets/marcas/Effetha.svg';
import logoKare     from '../assets/marcas/Kare.svg';
import logoPV       from '../assets/marcas/PVElectronica.svg';
import logoTicorp   from '../assets/marcas/Ticorp.svg';
import logoSerg     from '../assets/marcas/Sergenind.svg';
import fotoRol      from '../assets/fotos/Responsable.webp';

interface Role {
  title: string;
  period: string;
  badge: string;
  desc: string;
  achievements: string[];
  tags: string[];
}

interface ExperienceItem {
  company: string;
  logo: string;
  rolePhoto?: string;
  location: string;
  type: string;
  totalPeriod: string;
  roles: Role[];
  brands?: { name: string; logo: string }[];
}

const experiences: ExperienceItem[] = [
  {
    company: 'Consigue Ventas',
    logo: logoCV,
    rolePhoto: fotoRol,
    location: 'Lima, Perú',
    type: 'Tiempo completo',
    totalPeriod: 'Oct 2025 – Presente',
    roles: [
      {
        title: 'Responsable de Desarrollo Web',
        period: '17 Nov 2025 – Presente',
        badge: 'Cargo actual',
        desc: 'Lidero el área de desarrollo web gestionando proyectos, personal y relaciones con clientes. Soy el punto de contacto entre el equipo técnico y los superiores.',
        achievements: [
          'Gestiono y organizo al personal del área de desarrollo web',
          'Realizo inducción presencial de 3 semanas a los nuevos colaboradores antes de integrarlos a proyectos web',
          'Superviso y evalúo el desempeño de los colaboradores del equipo',
          'Hablo directamente con los clientes de cada marca para coordinar avances y requerimientos',
          'Administro el hosting en Hostinger donde están alojadas todas las marcas',
          'Realizo migraciones de sitios web entre servidores y dominios',
          'Ejecuto y gestiono copias de seguridad periódicas de todos los sitios web',
          'Informo a los superiores sobre el estado y avance de los proyectos',
          'Apoyo al equipo resolviendo dudas técnicas y desbloqueando problemas',
        ],
        tags: ['WordPress', 'Hostinger', 'HTML', 'CSS', 'JavaScript', 'PHP', 'Liderazgo', 'Gestión'],
      },
      {
        title: 'Colaborador Web',
        period: '07 Oct 2025 – 16 Nov 2025',
        badge: 'Primer cargo',
        desc: 'Ingresé realizando correcciones y mejoras en sitios web asignados. Se me proporcionaban credenciales temporales para cada tarea y se revocaban al finalizar.',
        achievements: [
          'Realicé arreglos y mejoras en páginas web asignadas por el equipo',
          'Trabajé con credenciales temporales de acceso, gestionadas por tarea completada',
          'Ejecuté correcciones de HTML, CSS y JavaScript en entornos WordPress',
          'Me familiaricé con los flujos de trabajo y estándares del equipo',
        ],
        tags: ['WordPress', 'HTML', 'CSS', 'JavaScript', 'PHP'],
      },
    ],
    brands: [
      { name: 'Effetha',        logo: logoEffetha },
      { name: 'Kare Salud',     logo: logoKare    },
      { name: 'PV Electrónica', logo: logoPV      },
      { name: 'Ticor Perú',     logo: logoTicorp  },
      { name: 'Sergenind',      logo: logoSerg    },
    ],
  },
];

const Experience: React.FC = () => {
  const [openCard,   setOpenCard]   = useState<number | null>(0);
  const [activeRole, setActiveRole] = useState<number>(0);

  return (
    <section id="experiencia" className="section experience">
      <div className="wrap">
        <div className="sec-label">Trayectoria</div>
        <h2 className="sec-title">Experiencia <strong>laboral</strong></h2>
        <p className="experience__sub">
          Mi recorrido profesional construyendo y liderando proyectos web reales.
        </p>

        <div className="exp-list">
          {experiences.map((exp, i) => (
            <div key={i} className={`exp-card${openCard === i ? ' exp-card--open' : ''}`}>

              {/* ── Header ── */}
              <button
                className="exp-card__header"
                onClick={() => setOpenCard(openCard === i ? null : i)}
              >
                <div className="exp-card__logo-wrap">
                  <img src={exp.logo} alt={exp.company} className="exp-card__logo" />
                </div>
                <div className="exp-card__meta">
                  <div className="exp-card__role">{exp.roles[activeRole].title}</div>
                  <div className="exp-card__company">{exp.company}</div>
                  <div className="exp-card__info">
                    <span className="exp-badge">{exp.totalPeriod}</span>
                    <span className="exp-badge">{exp.location}</span>
                    <span className="exp-badge exp-badge--accent">{exp.type}</span>
                  </div>
                </div>
                <div className={`exp-card__chevron${openCard === i ? ' rotated' : ''}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
              </button>

              {/* ── Body ── */}
              {openCard === i && (
                <div className="exp-card__body">
                  <div className="exp-card__body-grid">

                    {/* ── Columna izquierda ── */}
                    <div className="exp-card__body-left">
                      <div className="exp-roles-tabs">
                        {exp.roles.map((role, ri) => (
                          <button
                            key={ri}
                            className={`exp-role-tab${activeRole === ri ? ' exp-role-tab--active' : ''}`}
                            onClick={() => setActiveRole(ri)}
                          >
                            <span className="exp-role-tab__title">{role.title}</span>
                            <span className="exp-role-tab__period">{role.period}</span>
                          </button>
                        ))}
                      </div>

                      <p className="exp-card__desc">{exp.roles[activeRole].desc}</p>

                      <div className="exp-card__achievements">
                        {exp.roles[activeRole].achievements.map((a, j) => (
                          <div key={j} className="exp-achievement">
                            <div className="exp-achievement__dot" />
                            <span>{a}</span>
                          </div>
                        ))}
                      </div>

                      <div className="tag-row">
                        {exp.roles[activeRole].tags.map((tag) => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
                    </div>

                    {/* ── Columna derecha: foto + marcas ── */}
                    {exp.rolePhoto && (
                      <div className="exp-card__body-right">
                        <div className="exp-role-photo-wrap">
                          <img
                            src={exp.rolePhoto}
                            alt={`${exp.roles[0].title} en ${exp.company}`}
                            className="exp-role-photo"
                          />
                          <div className="exp-role-photo__label">
                            <span>{exp.roles[0].title}</span>
                            <span>{exp.company}</span>
                          </div>
                        </div>

                        {exp.brands && (
                          <div className="exp-brands-below">
                            <div className="exp-card__brands-label">Marcas gestionadas</div>
                            <div className="exp-card__brands">
                              {exp.brands.map((b) => (
                                <div key={b.name} className="exp-brand">
                                  <img src={b.logo} alt={b.name} />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
