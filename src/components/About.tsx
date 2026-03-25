import React, { useState, useEffect } from 'react';
import { useLang } from '../context/LangContext';

import foto4       from '../assets/fotos/Perfil_04.webp';
import fotoDevFest from '../assets/fotos/DevFest.webp';
import fotoGrupo   from '../assets/fotos/Grupo.webp';

// Solo 3 fotos: Perfil_04, DevFest, Grupo
const fotos = [foto4, fotoDevFest, fotoGrupo];
const fotoLabels = ['Foto personal', 'DevFest Lima 2025', 'Grupo de estudio'];

const AUTOPLAY_MS = 5000; // cambia cada 5 segundos

const About: React.FC = () => {
  const { t } = useLang();
  const [current, setCurrent] = useState(0);

  // Carrusel automático cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % fotos.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="sobre" className="section about">
      <div className="wrap">
        <div className="sec-label">{t.about.label}</div>
        <h2 className="sec-title">{t.about.title} <strong>{t.about.strong}</strong></h2>

        <div className="about__grid">
          <div className="about__content">
            <p className="about__text">{t.about.p1}</p>
            <p className="about__text">{t.about.p2}</p>
            <p className="about__text">{t.about.p3}</p>

            <div className="about__badges">
              {t.about.badges.map((b) => (
                <span key={b} className="about__badge">{b}</span>
              ))}
            </div>

            <div className="about__stats-inline">
              {t.about.stats.map((s) => (
                <div key={s.label} className="stat-card">
                  <div className="stat-card__num">{s.num}{s.sup && <sup>{s.sup}</sup>}</div>
                  <div className="stat-card__label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="about__carousel">
            <div className="carousel__img-wrap">
              <img src={fotos[current]} alt={fotoLabels[current]} className="carousel__img" />
              <div className="carousel__label">{fotoLabels[current]}</div>
            </div>
            <div className="carousel__dots">
              {fotos.map((_, i) => (
                <button
                  key={i}
                  className={`carousel__dot${i === current ? ' carousel__dot--active' : ''}`}
                  onClick={() => setCurrent(i)}
                  aria-label={fotoLabels[i]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
