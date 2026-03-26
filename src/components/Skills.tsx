import React, { useEffect, useRef, useState } from 'react';
import { useLang } from '../context/LangContext';

interface Skill {
  name: string;
  desc: { es: string; en: string };
  level: number;
  devicon: string;
  color: string;
}

const skillsData: Skill[] = [
  { name: 'React',       desc: { es: 'SPAs, hooks, context, estado global',       en: 'SPAs, hooks, context, global state'       }, level: 75, devicon: 'devicon-react-original',  color: '#61dafb' },
  { name: 'JavaScript',  desc: { es: 'ES6+, async/await, fetch, DOM',              en: 'ES6+, async/await, fetch, DOM'              }, level: 82, devicon: 'devicon-javascript-plain', color: '#f7df1e' },
  { name: 'TypeScript',  desc: { es: 'Tipado estático, interfaces, generics',      en: 'Static typing, interfaces, generics'        }, level: 60, devicon: 'devicon-typescript-plain', color: '#3178c6' },
  { name: 'HTML5',       desc: { es: 'Semántica, accesibilidad, estructura',       en: 'Semantics, accessibility, structure'        }, level: 90, devicon: 'devicon-html5-plain',      color: '#e34c26' },
  { name: 'CSS3',        desc: { es: 'Responsive, Flexbox, Grid, animaciones',     en: 'Responsive, Flexbox, Grid, animations'      }, level: 88, devicon: 'devicon-css3-plain',       color: '#264de4' },
  { name: 'Node.js',     desc: { es: 'APIs REST, Express, middleware',              en: 'REST APIs, Express, middleware'             }, level: 68, devicon: 'devicon-nodejs-plain',     color: '#3c873a' },
  { name: 'PHP',         desc: { es: 'Funciones WordPress, backend básico',        en: 'WordPress functions, basic backend'         }, level: 60, devicon: 'devicon-php-plain',        color: '#8892be' },
  { name: 'WordPress',   desc: { es: 'Personalización avanzada, plugins, temas',   en: 'Advanced customization, plugins, themes'   }, level: 85, devicon: 'devicon-wordpress-plain',  color: '#21759b' },
  { name: 'Java',        desc: { es: 'POO, estructuras de datos, fundamentos',     en: 'OOP, data structures, fundamentals'         }, level: 50, devicon: 'devicon-java-plain',       color: '#f89820' },
  { name: 'Spring Boot', desc: { es: 'APIs REST, inyección de dependencias',       en: 'REST APIs, dependency injection'            }, level: 40, devicon: 'devicon-spring-plain',     color: '#6db33f' },
  { name: 'Git',         desc: { es: 'Control de versiones, ramas, commits',       en: 'Version control, branches, commits'         }, level: 74, devicon: 'devicon-git-plain',        color: '#f05032' },
  { name: 'MySQL',       desc: { es: 'Consultas, relaciones, phpMyAdmin',          en: 'Queries, relationships, phpMyAdmin'         }, level: 62, devicon: 'devicon-mysql-plain',      color: '#00618a' },
  { name: 'Python',      desc: { es: 'Scripts, automatización, básico-intermedio', en: 'Scripts, automation, basic-intermediate'    }, level: 55, devicon: 'devicon-python-plain',     color: '#3776ab' },
  { name: 'GitHub',      desc: { es: 'Repositorios, pull requests, deploy',        en: 'Repositories, pull requests, deploy'        }, level: 74, devicon: 'devicon-github-original',  color: '#ffffff' },
];

const Skills: React.FC = () => {
  const { lang, t } = useLang();
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
        <div className="sec-label">{t.skills.label}</div>
        <h2 className="sec-title">{t.skills.title} <strong>{t.skills.strong}</strong></h2>
        <p className="skills__sub">{t.skills.sub}</p>

        <div className="skills__grid">
          {skillsData.map((skill) => (
            <div key={skill.name} className="skill-card">
              <div className="skill-card__icon">
                <i className={`${skill.devicon} colored`} style={{ fontSize: '32px', color: skill.color }} />
              </div>
              <div className="skill-card__name">{skill.name}</div>
              <div className="skill-card__desc">{skill.desc[lang]}</div>
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
