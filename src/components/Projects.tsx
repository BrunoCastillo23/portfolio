import React from 'react';
import { useLang } from '../context/LangContext';

import logoEffetha       from '../assets/marcas/Effetha.svg';
import logoCV            from '../assets/marcas/ConsigueVentas.svg';
import logoTicorp        from '../assets/marcas/Ticorp.png';
import logoKare          from '../assets/marcas/Kare.svg';
import logoPVElectronica from '../assets/marcas/PVElectronica.svg';
import logoSergenind     from '../assets/marcas/Sergenind.svg';

const logoMap: Record<string, string> = {
  'effetha.com':                      logoEffetha,
  'consigueventas.com':               logoCV,
  'ticorperu.net':                    logoTicorp,
  'karesaludrenal.com':               logoKare,
  'pvelectronica.consigueventas.com': logoPVElectronica,
  'sergenind.com':                    logoSergenind,
};

// Tamaño extra para logos con mucho margen interno
const logoStyleMap: Record<string, React.CSSProperties> = {
  'ticorperu.net': { maxWidth: '85%', maxHeight: '76px' },
};

interface Project {
  name: string;
  url: string;
  href: string;
  desc: { es: string; en: string };
  tags: string[];
}

const projectsData: Project[] = [
  {
    name: 'Effetha',
    url: 'effetha.com',
    href: 'https://effetha.com',
    desc: {
      es: 'Sitio corporativo con identidad de marca sólida y experiencia de usuario optimizada para conversión.',
      en: 'Corporate site with strong brand identity and user experience optimized for conversion.',
    },
    tags: ['WordPress', 'CSS', 'SEO', 'Branding'],
  },
  {
    name: 'Consigue Ventas',
    url: 'consigueventas.com',
    href: 'https://consigueventas.com',
    desc: {
      es: 'Plataforma principal. Landing pages de alto rendimiento orientadas a conversión y ventas.',
      en: 'Main platform. High-performance landing pages focused on conversion and sales.',
    },
    tags: ['HTML', 'CSS', 'JavaScript', 'Funnels'],
  },
  {
    name: 'Ticor Perú',
    url: 'ticorperu.net',
    href: 'https://ticorperu.net',
    desc: {
      es: 'Sitio institucional con presencia digital profesional y optimización SEO local.',
      en: 'Institutional site with professional digital presence and local SEO optimization.',
    },
    tags: ['Web', 'Branding', 'SEO', 'Responsive'],
  },
  {
    name: 'Kare Salud Renal',
    url: 'karesaludrenal.com',
    href: 'https://karesaludrenal.com',
    desc: {
      es: 'Sitio de salud con información clara. Formularios de captación y atención al paciente.',
      en: 'Health site with clear information. Lead capture forms and patient care flow.',
    },
    tags: ['HTML', 'CSS', 'Forms', 'UX'],
  },
  {
    name: 'PV Electrónica',
    url: 'pvelectronica.consigueventas.com',
    href: 'https://pvelectronica.consigueventas.com',
    desc: {
      es: 'Tienda electrónica con catálogo de productos, filtros y gestión de pedidos integrada.',
      en: 'Electronics store with product catalog, filters and integrated order management.',
    },
    tags: ['E-commerce', 'CSS', 'UX', 'Catalog'],
  },
  {
    name: 'Sergenind',
    url: 'sergenind.com',
    href: 'https://sergenind.com',
    desc: {
      es: 'Empresa de mantenimiento industrial. Sitio con servicios, portafolio y captación de clientes.',
      en: 'Industrial maintenance company. Site with services, portfolio and client acquisition.',
    },
    tags: ['WordPress', 'CSS', 'SEO', 'Maintenance'],
  },
];

const ExternalIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const Projects: React.FC = () => {
  const { lang, t } = useLang();

  return (
    <section id="proyectos" className="section projects">
      <div className="wrap">
        <div className="sec-label">{t.projects.label}</div>
        <h2 className="sec-title">{t.projects.title} <strong>{t.projects.strong}</strong></h2>
        <p className="projects__sub">
          {t.projects.sub} <strong>Consigue Ventas</strong>.
        </p>

        <div className="projects__grid">
          {projectsData.map((proj) => (
            <a
              key={proj.name}
              href={proj.href}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-card"
            >
              <div className="proj-card__preview">
                <div className="proj-card__browser-bar">
                  <div className="dot dot--r" />
                  <div className="dot dot--y" />
                  <div className="dot dot--g" />
                  <span className="proj-card__url">{proj.url}</span>
                </div>
                <div className="proj-card__logo-wrap">
                  <img
                    src={logoMap[proj.url]}
                    alt={`Logo ${proj.name}`}
                    className="proj-card__logo-img"
                    style={logoStyleMap[proj.url]}
                  />
                </div>
              </div>

              <div className="proj-card__body">
                <div className="proj-card__name">{proj.name}</div>
                <div className="proj-card__company">Consigue Ventas</div>
                <div className="proj-card__desc">{proj.desc[lang]}</div>
                <div className="tag-row">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="proj-card__link">
                  {t.projects.see} <ExternalIcon />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
