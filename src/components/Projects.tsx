import React from 'react';
import { projects } from '../data/portfolio';

import logoEffetha       from '../assets/marcas/Effetha.svg';
import logoCV            from '../assets/marcas/ConsigueVentas.svg';
import logoTicorp        from '../assets/marcas/Ticorp.svg';
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

const ExternalIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const Projects: React.FC = () => (
  <section id="proyectos" className="section projects">
    <div className="wrap">
      <div className="sec-label">Trabajo real</div>
      <h2 className="sec-title">Proyectos & <strong>marcas</strong></h2>
      <p className="projects__sub">
        Sitios desarrollados y mantenidos para empresas reales dentro de{' '}
        <strong>Consigue Ventas</strong>.
      </p>

      <div className="projects__grid">
        {projects.map((proj) => (
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
                <img src={logoMap[proj.url]} alt={`Logo ${proj.name}`} className="proj-card__logo-img" />
              </div>
            </div>

            <div className="proj-card__body">
              <div className="proj-card__name">{proj.name}</div>
              <div className="proj-card__company">{proj.company}</div>
              <div className="proj-card__desc">{proj.desc}</div>
              <div className="tag-row">
                {proj.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <div className="proj-card__link">
                Ver sitio <ExternalIcon />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
