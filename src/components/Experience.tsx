import React, { useState } from 'react';
import { useLang } from '../context/LangContext';
import { linkTo } from '../router';

import logoCV       from '../assets/marcas/ConsigueVentas.svg';
import logoEffetha  from '../assets/marcas/Effetha.svg';
import logoKare     from '../assets/marcas/Kare.svg';
import logoPV       from '../assets/marcas/PVElectronica.svg';
import logoTicorp   from '../assets/marcas/Ticorp.webp';
import logoSerg     from '../assets/marcas/Sergenind.svg';
import logoUNJFSC   from '../assets/marcas/UNJFSC.webp';
import logoSistemas from '../assets/marcas/Sistemas-UNJFSC.webp';

// ── Foto del cargo ───────────────────────────────────
import fotoResponsableSoftware from '../assets/fotos/Responsable_Software.webp';

type L = { es: string; en: string };
type LList = { es: string[]; en: string[] };

interface Job {
  company: string;
  short?: string;       // nombre corto para la etiqueta de la foto
  logo: string;
  title: L;
  period: L;
  location: L;
  type: L;
  current?: boolean;
  desc: L;
  achievements: LList;
  tags: LList;
  photo: { src: string; caption: L; isLogo?: boolean };
  brands?: { name: string; logo: string }[];
  project?: { slug: string; name: string };
}

// Textos de la sección
const sectionText = {
  es: {
    label: 'Trayectoria',
    title: 'Experiencia',
    strong: 'laboral',
    sub: 'Mi recorrido profesional construyendo y liderando proyectos de software reales.',
    current: 'Actual',
    brandsLabel: 'Marcas gestionadas',
    projectLabel: 'Proyecto que lidero',
    projectCta: 'Ver caso de estudio',
  },
  en: {
    label: 'Career',
    title: 'Work',
    strong: 'experience',
    sub: 'My professional journey building and leading real software projects.',
    current: 'Current',
    brandsLabel: 'Managed brands',
    projectLabel: 'Project I lead',
    projectCta: 'View case study',
  },
};

// Experiencias, de la más reciente a la más antigua
const jobs: Job[] = [
  {
    company: 'Universidad Nacional José Faustino Sánchez Carrión',
    short: 'UNJFSC',
    logo: logoUNJFSC,
    title: { es: 'Developer Lead — Prácticas Pre Profesionales', en: 'Developer Lead — Pre-professional Internship' },
    period: { es: '24 Ago 2026 – Actualidad', en: 'Aug 24, 2026 – Present' },
    location: { es: 'Huacho, Perú', en: 'Huacho, Peru' },
    type: { es: 'Prácticas · FIISI', en: 'Internship · FIISI' },
    current: true,
    desc: {
      es: 'Realizo mis prácticas pre profesionales en la Escuela de Ingeniería de Sistemas de la Facultad de Ingeniería Industrial, Sistemas e Informática (FIISI), donde lidero el desarrollo de la plataforma que digitaliza la gestión de prácticas pre profesionales de la escuela.',
      en: 'I am doing my pre-professional internship at the Systems Engineering School of the Faculty of Industrial, Systems and Computer Engineering (FIISI), where I lead the development of the platform that digitizes the school’s internship management.',
    },
    achievements: {
      es: [
        'Lidero al equipo de desarrollo de la plataforma de Prácticas Pre Profesionales (practicaspre.kerpun.com)',
        'Lideré la reorganización de la arquitectura, que estaba desordenada, a módulos por dominio en backend y frontend (Laravel 12, React 19, Inertia.js), documentada en el repositorio',
        'Implementé el flujo de validación de empresas: consulta de RUC, revisión del docente, invitación y activación de la cuenta empresarial',
        'Organizo el trabajo con Pull Requests y code review, con más de 120 pruebas automatizadas en Pest',
        'Automaticé el despliegue con GitHub Actions y Docker: cada merge a main se publica solo en el VPS',
        'Coordino requerimientos con docentes y autoridades de la escuela',
      ],
      en: [
        'Lead the development team of the Pre-professional Internship platform (practicaspre.kerpun.com)',
        'Led the reorganization of a messy codebase into domain-based modules on backend and frontend (Laravel 12, React 19, Inertia.js), documented in the repository',
        'Built the company validation flow: RUC lookup, professor review, invitation and company account activation',
        'Run the workflow with Pull Requests and code review, backed by 120+ automated Pest tests',
        'Automated deployment with GitHub Actions and Docker: every merge to main ships to the VPS',
        'Coordinate requirements with the school’s professors and authorities',
      ],
    },
    tags: {
      es: ['Laravel', 'PHP', 'React', 'TypeScript', 'Inertia.js', 'Tailwind CSS', 'MariaDB', 'Docker', 'GitHub Actions', 'Liderazgo'],
      en: ['Laravel', 'PHP', 'React', 'TypeScript', 'Inertia.js', 'Tailwind CSS', 'MariaDB', 'Docker', 'GitHub Actions', 'Leadership'],
    },
    photo: {
      src: logoSistemas,
      isLogo: true,
      caption: { es: 'Escuela de Ingeniería de Sistemas', en: 'Systems Engineering School' },
    },
    project: { slug: 'practicas-unjfsc', name: 'Sistema de Prácticas Pre Profesionales' },
  },
  {
    company: 'Consigue Ventas',
    logo: logoCV,
    title: { es: 'Responsable de Desarrollo Software', en: 'Software Development Lead' },
    period: { es: '17 Feb 2025 – 17 Jun 2026', en: 'Feb 17, 2025 – Jun 17, 2026' },
    location: { es: 'Lima, Perú', en: 'Lima, Peru' },
    type: { es: 'Tiempo completo', en: 'Full time' },
    desc: {
      es: 'Cuando la agencia abrió su área de desarrollo de software, asumí su liderazgo: empecé con un equipo de 6 personas que fue creciendo hasta 12, coordinando los proyectos y la calidad de cada entrega.',
      en: 'When the agency opened its software development area, I took on its leadership: I started with a team of 6 people that grew to 12, coordinating the projects and the quality of every delivery.',
    },
    achievements: {
      es: [
        'Lideré el área de desarrollo de software desde su apertura, con un equipo (backend y frontend) que creció de 6 a 12 desarrolladores',
        'Dirigí los proyectos del área, como el e-commerce Café del Barrio y la plataforma de oona.es',
        'Coordiné los proyectos con el equipo técnico y la gerencia, y garanticé la calidad de las entregas',
        'Organicé, capacité y supervisé al personal del área',
        'Desarrollé aplicaciones con Java y Spring Boot para servicios backend robustos',
        'Construí interfaces modernas con Angular para proyectos empresariales',
        'Implementé y administré contenedores con Docker para entornos reproducibles',
        'Desplegué y gestioné infraestructura en servidores de DigitalOcean',
      ],
      en: [
        'Led the software development area from its opening, with a backend and frontend team that grew from 6 to 12 developers',
        'Directed the area’s projects, such as the Café del Barrio e-commerce and the oona.es platform',
        'Coordinated projects with the technical team and management, ensuring delivery quality',
        'Organized, trained and supervised the area’s staff',
        'Developed applications with Java and Spring Boot for robust backend services',
        'Built modern interfaces with Angular for enterprise projects',
        'Implemented and managed containers with Docker for reproducible environments',
        'Deployed and managed infrastructure on DigitalOcean servers',
      ],
    },
    tags: {
      es: ['Java', 'Spring Boot', 'Angular', 'Docker', 'DigitalOcean', 'WordPress', 'HTML5', 'CSS3', 'JavaScript', 'PHP', 'Liderazgo'],
      en: ['Java', 'Spring Boot', 'Angular', 'Docker', 'DigitalOcean', 'WordPress', 'HTML5', 'CSS3', 'JavaScript', 'PHP', 'Leadership'],
    },
    photo: {
      src: fotoResponsableSoftware,
      caption: { es: 'Responsable de Desarrollo Software', en: 'Software Development Lead' },
    },
    brands: [
      { name: 'Effetha',        logo: logoEffetha },
      { name: 'Kare Salud',     logo: logoKare    },
      { name: 'PV Electrónica', logo: logoPV      },
      { name: 'Ticor Perú',     logo: logoTicorp  },
      { name: 'Sergenind',      logo: logoSerg    },
    ],
  },
];

const Chevron: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const Experience: React.FC = () => {
  const { lang } = useLang();
  const d = sectionText[lang];
  const [openCard, setOpenCard] = useState<number | null>(0);

  return (
    <section id="experiencia" className="section experience">
      <div className="wrap">
        <div className="sec-label">{d.label}</div>
        <h2 className="sec-title">{d.title} <strong>{d.strong}</strong></h2>
        <p className="experience__sub">{d.sub}</p>

        <div className="exp-list">
          {jobs.map((job, i) => {
            const open = openCard === i;
            return (
              <div key={job.company} className={`exp-card${open ? ' exp-card--open' : ''}`}>

                {/* Header */}
                <button className="exp-card__header" onClick={() => setOpenCard(open ? null : i)} aria-expanded={open}>
                  <div className="exp-card__logo-wrap">
                    <img src={job.logo} alt={job.company} className="exp-card__logo" />
                  </div>
                  <div className="exp-card__meta">
                    <div className="exp-card__role">{job.title[lang]}</div>
                    <div className="exp-card__company">{job.company}</div>
                    <div className="exp-card__info">
                      <span className="exp-badge">{job.period[lang]}</span>
                      <span className="exp-badge">{job.location[lang]}</span>
                      <span className="exp-badge exp-badge--accent">{job.type[lang]}</span>
                      {job.current && <span className="exp-badge exp-badge--live">{d.current}</span>}
                    </div>
                  </div>
                  <div className={`exp-card__chevron${open ? ' rotated' : ''}`}>
                    <Chevron />
                  </div>
                </button>

                {/* Body */}
                {open && (
                  <div className="exp-card__body">
                    <div className="exp-card__body-grid">

                      {/* Izquierda */}
                      <div className="exp-card__body-left">
                        <p className="exp-card__desc">{job.desc[lang]}</p>
                        <div className="exp-card__achievements">
                          {job.achievements[lang].map((a, j) => (
                            <div key={j} className="exp-achievement">
                              <div className="exp-achievement__dot" />
                              <span>{a}</span>
                            </div>
                          ))}
                        </div>
                        <div className="tag-row">
                          {job.tags[lang].map((tag) => (
                            <span key={tag} className="tag">{tag}</span>
                          ))}
                        </div>
                      </div>

                      {/* Derecha: foto + marcas / proyecto */}
                      <div className="exp-card__body-right">
                        <div className="exp-role-photo-wrap">
                          <img
                            src={job.photo.src}
                            alt={job.photo.caption[lang]}
                            className={`exp-role-photo${job.photo.isLogo ? ' exp-role-photo--logo' : ''}`}
                          />
                          <div className="exp-role-photo__label">
                            <span>{job.photo.caption[lang]}</span>
                            <span>{job.short ?? job.company}</span>
                          </div>
                        </div>

                        {job.brands && (
                          <div className="exp-brands-below">
                            <div className="exp-card__brands-label">{d.brandsLabel}</div>
                            <div className="exp-card__brands">
                              {job.brands.map((b) => (
                                <div key={b.name} className="exp-brand">
                                  <img src={b.logo} alt={b.name} loading="lazy" />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {job.project && (
                          <a
                            href={`/proyectos/${job.project.slug}`}
                            onClick={linkTo(`/proyectos/${job.project.slug}`)}
                            className="exp-brands-below exp-project-link"
                          >
                            <div className="exp-card__brands-label">{d.projectLabel}</div>
                            <div className="exp-project-link__name">{job.project.name}</div>
                            <div className="exp-project-link__cta">{d.projectCta} →</div>
                          </a>
                        )}
                      </div>

                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
