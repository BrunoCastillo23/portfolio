import React from 'react';
import { useLang } from '../context/LangContext';
import { featuredProjects } from '../data/featuredProjects';
import { linkTo } from '../router';

import logoEffetha       from '../assets/marcas/Effetha.svg';
import logoCV            from '../assets/marcas/ConsigueVentas.svg';
import logoTicorp        from '../assets/marcas/Ticorp.png';
import logoKare          from '../assets/marcas/Kare.svg';
import logoPVElectronica from '../assets/marcas/PVElectronica.svg';
import logoSergenind     from '../assets/marcas/Sergenind.svg';

const logoMap: Record<string, string> = {
  'effetha.com':          logoEffetha,
  'consigueventas.com':   logoCV,
  'ticorperu.net':        logoTicorp,
  'karesaludrenal.com':   logoKare,
  'pvelectronica.com.pe': logoPVElectronica,
  'sergenind.com':        logoSergenind,
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
      es: 'Landing Page Horizontal realizada por la misma empresa Effetha. Desarrollada con WordPress, HTML5, CSS3, JavaScript y PHP.',
      en: 'Horizontal Landing Page made by Effetha itself. Built with WordPress, HTML5, CSS3, JavaScript and PHP.',
    },
    tags: ['WordPress', 'HTML5', 'CSS3', 'JavaScript', 'PHP'],
  },
  {
    name: 'Consigue Ventas',
    url: 'consigueventas.com',
    href: 'https://consigueventas.com',
    desc: {
      es: 'Multipage realizada por la misma empresa Consigue Ventas. Desarrollada con WordPress, HTML5, CSS3, JavaScript y PHP.',
      en: 'Multipage site made by Consigue Ventas itself. Built with WordPress, HTML5, CSS3, JavaScript and PHP.',
    },
    tags: ['WordPress', 'HTML5', 'CSS3', 'JavaScript', 'PHP'],
  },
  {
    name: 'Ticorp Perú',
    url: 'ticorperu.net',
    href: 'https://ticorperu.net',
    desc: {
      es: 'Multipage realizada por Consigue Ventas. Desarrollada con WordPress, HTML5, CSS3, JavaScript y PHP.',
      en: 'Multipage site made by Consigue Ventas. Built with WordPress, HTML5, CSS3, JavaScript and PHP.',
    },
    tags: ['WordPress', 'HTML5', 'CSS3', 'JavaScript', 'PHP'],
  },
  {
    name: 'Kare Salud Renal',
    url: 'karesaludrenal.com',
    href: 'https://karesaludrenal.com',
    desc: {
      es: 'Landing Page Vertical realizada por Consigue Ventas. Desarrollada con WordPress, HTML5, CSS3, JavaScript y PHP.',
      en: 'Vertical Landing Page made by Consigue Ventas. Built with WordPress, HTML5, CSS3, JavaScript and PHP.',
    },
    tags: ['WordPress', 'HTML5', 'CSS3', 'JavaScript', 'PHP'],
  },
  {
    name: 'PV Electrónica',
    url: 'pvelectronica.com.pe',
    href: 'https://pvelectronica.com.pe/',
    desc: {
      es: 'Multipage realizada por Consigue Ventas. Desarrollada con WordPress, HTML5, CSS3, JavaScript y PHP.',
      en: 'Multipage site made by Consigue Ventas. Built with WordPress, HTML5, CSS3, JavaScript and PHP.',
    },
    tags: ['WordPress', 'HTML5', 'CSS3', 'JavaScript', 'PHP'],
  },
  {
    name: 'Sergenind',
    url: 'sergenind.com',
    href: 'https://sergenind.com',
    desc: {
      es: 'Multipage realizada por Consigue Ventas. Desarrollada con WordPress, HTML5, CSS3, JavaScript y PHP.',
      en: 'Multipage site made by Consigue Ventas. Built with WordPress, HTML5, CSS3, JavaScript and PHP.',
    },
    tags: ['WordPress', 'HTML5', 'CSS3', 'JavaScript', 'PHP'],
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
        <p className="projects__sub">{t.projects.sub}</p>

        {/* ── Plataformas destacadas: abren su página de detalle ── */}
        <h3 className="projects__group-title">{t.projects.featured}</h3>
        <div className="featured__grid">
          {featuredProjects.map((proj) => (
            <a
              key={proj.slug}
              href={`/proyectos/${proj.slug}`}
              onClick={linkTo(`/proyectos/${proj.slug}`)}
              className="featured-card"
            >
              <div className="featured-card__preview">
                <div className="proj-card__browser-bar">
                  <div className="dot dot--r" />
                  <div className="dot dot--y" />
                  <div className="dot dot--g" />
                  <span className="proj-card__url">{proj.url}</span>
                </div>
                <img src={proj.cover} alt={`Captura de ${proj.name}`} className="featured-card__img" loading="lazy" />
              </div>
              <div className="featured-card__body">
                <div className="proj-card__company">{proj.context[lang]}</div>
                <div className="featured-card__name">{proj.name}</div>
                <p className="featured-card__desc">{proj.summary[lang]}</p>
                <div className="tag-row">
                  {proj.cardTags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="featured-card__link">
                  {t.projects.caseStudy}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* ── Sitios para clientes (Consigue Ventas) ── */}
        <h3 className="projects__group-title">{t.projects.clients}</h3>
        <p className="projects__sub">
          {t.projects.clientsSub} <strong>Consigue Ventas</strong>.
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
