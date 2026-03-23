import React, { useEffect, useRef, useState } from 'react';

interface Skill {
  name: string;
  desc: string;
  level: number;
  devicon: string;   // clase de devicon
  color: string;     // color original de la tecnología
}

const skillsData: Skill[] = [
  {
    name: 'React',
    desc: 'SPAs, hooks, context, estado global',
    level: 75,
    devicon: 'devicon-react-original',
    color: '#61dafb',
  },
  {
    name: 'JavaScript',
    desc: 'ES6+, async/await, fetch, DOM',
    level: 82,
    devicon: 'devicon-javascript-plain',
    color: '#f7df1e',
  },
  {
    name: 'TypeScript',
    desc: 'Tipado estático, interfaces, generics',
    level: 60,
    devicon: 'devicon-typescript-plain',
    color: '#3178c6',
  },
  {
    name: 'HTML5',
    desc: 'Semántica, accesibilidad, estructura',
    level: 90,
    devicon: 'devicon-html5-plain',
    color: '#e34c26',
  },
  {
    name: 'CSS3',
    desc: 'Responsive, Flexbox, Grid, animaciones',
    level: 88,
    devicon: 'devicon-css3-plain',
    color: '#264de4',
  },
  {
    name: 'Node.js',
    desc: 'APIs REST, Express, middleware',
    level: 68,
    devicon: 'devicon-nodejs-plain',
    color: '#3c873a',
  },
  {
    name: 'PHP',
    desc: 'Funciones WordPress, backend básico',
    level: 60,
    devicon: 'devicon-php-plain',
    color: '#8892be',
  },
  {
    name: 'WordPress',
    desc: 'Personalización avanzada, plugins, temas',
    level: 85,
    devicon: 'devicon-wordpress-plain',
    color: '#21759b',
  },
  {
    name: 'Git',
    desc: 'Control de versiones, ramas, commits',
    level: 74,
    devicon: 'devicon-git-plain',
    color: '#f05032',
  },
  {
    name: 'MySQL',
    desc: 'Consultas, relaciones, phpMyAdmin',
    level: 62,
    devicon: 'devicon-mysql-plain',
    color: '#00618a',
  },
  {
    name: 'Python',
    desc: 'Scripts, automatización, básico-intermedio',
    level: 55,
    devicon: 'devicon-python-plain',
    color: '#3776ab',
  },
  {
    name: 'GitHub',
    desc: 'Repositorios, pull requests, deploy',
    level: 74,
    devicon: 'devicon-github-original',
    color: '#ffffff',
  },
];

const Skills: React.FC = () => {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.2 }
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
          {skillsData.map((skill) => (
            <div key={skill.name} className="skill-card">
              {/* Icono devicon con color original de la tecnología */}
              <div className="skill-card__icon">
                <i
                  className={`${skill.devicon} colored`}
                  style={{ fontSize: '32px', color: skill.color }}
                />
              </div>
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
