import React, { useState, useEffect } from 'react';
import fotoPerfil from '../assets/fotos/Perfil_01.webp';

const roles = [
  'Full Stack Developer',
  'React Developer',
  'Node.js Developer',
  'TypeScript Developer',
];

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const Hero: React.FC = () => {
  const [displayed, setDisplayed] = useState('');
  const [roleIdx,   setRoleIdx]   = useState(0);
  const [deleting,  setDeleting]  = useState(false);
  const [charIdx,   setCharIdx]   = useState(0);

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      // Escribiendo
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, 65);
    } else if (!deleting && charIdx === current.length) {
      // Pausa al terminar de escribir
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIdx > 0) {
      // Borrando
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, 35);
    } else if (deleting && charIdx === 0) {
      // Siguiente rol
      setDeleting(false);
      setRoleIdx((r) => (r + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, roleIdx]);

  return (
    <section id="hero" className="hero">
      <div className="hero__bg-text" aria-hidden="true">BC</div>

      <div className="wrap hero__wrap">
        {/* Texto izquierda */}
        <div className="hero__inner">
          <div className="hero__eyebrow">Disponible para proyectos</div>

          <h1 className="hero__name">
            Bruno<br />
            <strong>Castillo</strong>
          </h1>

          {/* Typing animado */}
          <p className="hero__role">
            <span className="hero__typing">{displayed}</span>
            <span className="hero__cursor" aria-hidden="true">|</span>
          </p>

          <p className="hero__desc">
            Desarrollo soluciones web completas — desde interfaces de usuario
            hasta APIs robustas. Especializado en React, Node.js y TypeScript
            para construir productos que generan resultados reales.
          </p>

          <div className="hero__ctas">
            <a href="#proyectos" className="btn btn--dark">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
              </svg>
              Ver proyectos
            </a>

            {/* Botón descargar CV — el PDF se llama cv-bruno-castillo.pdf en /public */}
            <a href="/cv-bruno-castillo.pdf" download className="btn btn--cv">
              <DownloadIcon />
              Descargar CV
            </a>

            <a href="#contacto" className="btn btn--ghost">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Contactar
            </a>

            <a href="https://github.com/BrunoCastillo23" target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>

        {/* Foto derecha */}
        <div className="hero__photo-wrap">
          <div className="hero__photo-ring" />
          <img
            src={fotoPerfil}
            alt="Bruno Castillo – Full Stack Developer"
            className="hero__photo"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
