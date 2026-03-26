import React, { useState } from 'react';
import { useLang } from '../context/LangContext';

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
  roles: Role[];
  brands?: { name: string; logo: string }[];
}

// Datos bilingües
const expData = {
  es: {
    label: 'Trayectoria',
    title: 'Experiencia',
    strong: 'laboral',
    sub: 'Mi recorrido profesional construyendo y liderando proyectos web reales.',
    fulltime: 'Tiempo completo',
    totalPeriod: 'Oct 2025 – Presente',
    brandsLabel: 'Marcas gestionadas',
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
  },
  en: {
    label: 'Career',
    title: 'Work',
    strong: 'experience',
    sub: 'My professional journey building and leading real web projects.',
    fulltime: 'Full time',
    totalPeriod: 'Oct 2025 – Present',
    brandsLabel: 'Managed brands',
    roles: [
      {
        title: 'Web Development Lead',
        period: 'Nov 17, 2025 – Present',
        badge: 'Current role',
        desc: 'I lead the web development area managing projects, staff and client relationships. I am the point of contact between the technical team and management.',
        achievements: [
          'Manage and organize web development team members',
          'Conduct a 3-week in-person onboarding for new collaborators before integrating them into live projects',
          'Supervise and evaluate the performance of team collaborators',
          'Communicate directly with clients of each brand to coordinate progress and requirements',
          'Manage hosting on Hostinger including domains, databases, backups and server migrations',
          'Perform migrations of websites between servers and domains',
          'Execute and manage periodic backups for all production websites',
          'Report project status and progress updates to management',
          'Support the team by resolving technical questions and unblocking issues',
        ],
        tags: ['WordPress', 'Hostinger', 'HTML', 'CSS', 'JavaScript', 'PHP', 'Leadership', 'Management'],
      },
      {
        title: 'Web Collaborator',
        period: 'Oct 07, 2025 – Nov 16, 2025',
        badge: 'First role',
        desc: 'I joined performing corrections and improvements on assigned websites. Temporary credentials were provided per task and revoked upon completion.',
        achievements: [
          'Performed fixes and improvements on web pages assigned by the team',
          'Worked with temporary access credentials managed per completed task',
          'Executed HTML, CSS and JavaScript corrections in WordPress environments',
          'Familiarized myself with the team workflows and quality standards',
        ],
        tags: ['WordPress', 'HTML', 'CSS', 'JavaScript', 'PHP'],
      },
    ],
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
  const [openCard,   setOpenCard]   = useState<number | null>(0);
  const [activeRole, setActiveRole] = useState<number>(0);

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
                <div className="exp-card__role">{d.roles[activeRole].title}</div>
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
                    <div className="exp-roles-tabs">
                      {d.roles.map((role, ri) => (
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
                    <p className="exp-card__desc">{d.roles[activeRole].desc}</p>
                    <div className="exp-card__achievements">
                      {d.roles[activeRole].achievements.map((a, j) => (
                        <div key={j} className="exp-achievement">
                          <div className="exp-achievement__dot" />
                          <span>{a}</span>
                        </div>
                      ))}
                    </div>
                    <div className="tag-row">
                      {d.roles[activeRole].tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* Derecha: foto + marcas */}
                  <div className="exp-card__body-right">
                    <div className="exp-role-photo-wrap">
                      <img src={fotoRol} alt={d.roles[0].title} className="exp-role-photo" />
                      <div className="exp-role-photo__label">
                        <span>{d.roles[0].title}</span>
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
