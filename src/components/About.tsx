import React, { useState } from 'react';

import foto2       from '../assets/fotos/Perfil_02.webp';
import foto3       from '../assets/fotos/Perfil_03.webp';
import foto4       from '../assets/fotos/Perfil_04.webp';
import fotoDevFest from '../assets/fotos/DevFest.webp';
import fotoGrupo   from '../assets/fotos/Grupo.webp';

const fotos = [foto2, foto3, foto4, fotoDevFest, fotoGrupo];

const stats = [
  { num: '5', sup: '+', label: 'Proyectos en producción' },
  { num: '1', sup: '+', label: 'Años de experiencia'     },
  { num: '3', sup: '+', label: 'Industrias atendidas'    },
  { num: '∞', sup: '',  label: 'Ganas de aprender'       },
];

const About: React.FC = () => {
  const [current, setCurrent] = useState(0);

  return (
    <section id="sobre" className="section about">
      <div className="wrap">
        <div className="sec-label">Sobre mí</div>
        <h2 className="sec-title">
          Apasionado por el <strong>desarrollo web</strong>
        </h2>

        <div className="about__grid">

          {/* Columna izquierda: texto + stats pegados debajo del texto */}
          <div className="about__content">
            <p className="about__text">
              Soy un desarrollador Full Stack de Lima, Perú, con pasión por construir
              productos digitales que combinen buen diseño con código sólido y escalable.
            </p>
            <p className="about__text">
              Me enfoco en crear experiencias de usuario intuitivas en el frontend y APIs
              eficientes en el backend. Creo que el mejor código es aquel que resuelve
              problemas reales de forma simple y elegante.
            </p>
            <p className="about__text">
              Fuera del trabajo, participo en comunidades de tecnología, eventos de
              desarrolladores y siempre estoy explorando nuevas herramientas y frameworks
              para seguir creciendo como profesional.
            </p>

            {/* Stats en 2×2 debajo del texto — sin espacio vacío */}
            <div className="about__stats-inline">
              {stats.map((s) => (
                <div key={s.label} className="stat-card">
                  <div className="stat-card__num">
                    {s.num}{s.sup && <sup>{s.sup}</sup>}
                  </div>
                  <div className="stat-card__label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Columna derecha: carrusel */}
          <div className="about__carousel">
            <div className="carousel__img-wrap">
              <img
                src={fotos[current]}
                alt={`Bruno Castillo foto ${current + 1}`}
                className="carousel__img"
              />
            </div>
            <div className="carousel__dots">
              {fotos.map((_, i) => (
                <button
                  key={i}
                  className={`carousel__dot${i === current ? ' carousel__dot--active' : ''}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Foto ${i + 1}`}
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
