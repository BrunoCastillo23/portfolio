import React, { useState, useEffect } from 'react';
import fotoPerfil from '../assets/fotos/Perfil_04.webp';
import { useLang } from '../context/LangContext';

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const Hero: React.FC = () => {
  const { t } = useLang();
  const roles = t.hero.roles as readonly string[];

  const [displayed, setDisplayed] = useState('');
  const [roleIdx,   setRoleIdx]   = useState(0);
  const [deleting,  setDeleting]  = useState(false);
  const [charIdx,   setCharIdx]   = useState(0);

  // Reset cuando cambia el idioma
  useEffect(() => {
    setRoleIdx(0);
    setCharIdx(0);
    setDeleting(false);
    setDisplayed('');
  }, [roles[0]]);

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => { setDisplayed(current.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }, 65);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => { setDisplayed(current.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }, 35);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setRoleIdx(r => (r + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, roleIdx, roles]);

  return (
    <section id="hero" className="hero">
      <div className="hero__bg-text" aria-hidden="true">BC</div>
      <div className="wrap hero__wrap">
        <div className="hero__inner">
          <div className="hero__eyebrow">{t.hero.available}</div>
          <h1 className="hero__name">Bruno<br /><strong>Castillo</strong></h1>
          <p className="hero__role">
            <span className="hero__typing">{displayed}</span>
            <span className="hero__cursor" aria-hidden="true">|</span>
          </p>
          <p className="hero__desc">{t.hero.desc}</p>
          <div className="hero__ctas">
            <a href="#proyectos" className="btn btn--dark">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
              </svg>
              {t.hero.seeProjects}
            </a>
            <a href="/cv-bruno-castillo.pdf" download className="btn btn--cv">
              <DownloadIcon />{t.hero.downloadCV}
            </a>
          </div>
        </div>
        <div className="hero__photo-wrap">
          <div className="hero__photo-ring" />
          <img src={fotoPerfil} alt="Bruno Castillo – Full Stack Developer" className="hero__photo" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
