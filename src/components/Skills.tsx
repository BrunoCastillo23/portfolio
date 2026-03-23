import React, { useEffect, useRef, useState } from 'react';
import { skills } from '../data/portfolio';

const Skills: React.FC = () => {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="habilidades" className="section skills" ref={sectionRef}>
      <div className="wrap">
        <div className="sec-label">Stack técnico</div>
        <h2 className="sec-title">
          Mis <strong>habilidades</strong>
        </h2>
        <p className="skills__sub">
          Tecnologías que uso día a día para construir productos web completos, de principio a fin.
        </p>

        <div className="skills__grid">
          {skills.map((skill) => (
            <div key={skill.name} className="skill-card">
              <div className="skill-card__icon">{skill.icon}</div>
              <div className="skill-card__name">{skill.name}</div>
              <div className="skill-card__desc">{skill.desc}</div>
              <div className="skill-card__bar-track">
                <div
                  className={`skill-card__bar-fill${animated ? ' animated' : ''}`}
                  style={{ '--level': `${skill.level}%` } as React.CSSProperties}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
