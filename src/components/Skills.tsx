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
  // Backend
  { name: 'Java',           desc: { es: 'Java 21, POO, colecciones, streams',           en: 'Java 21, OOP, collections, streams'          }, level: 80, devicon: 'devicon-java-plain',               color: '#f89820' },
  { name: 'Spring Boot',    desc: { es: 'APIs REST, Security/JWT, JPA, Flyway',         en: 'REST APIs, Security/JWT, JPA, Flyway'        }, level: 78, devicon: 'devicon-spring-plain',             color: '#6db33f' },
  { name: 'Laravel',        desc: { es: 'Arquitectura modular, Fortify, Pest',          en: 'Modular architecture, Fortify, Pest'         }, level: 70, devicon: 'devicon-laravel-original',         color: '#ff2d20' },
  { name: 'PHP',            desc: { es: 'Laravel, WordPress, backend',                  en: 'Laravel, WordPress, backend'                 }, level: 68, devicon: 'devicon-php-plain',                color: '#8892be' },
  { name: 'Node.js',        desc: { es: 'APIs REST, Express, middleware',               en: 'REST APIs, Express, middleware'              }, level: 65, devicon: 'devicon-nodejs-plain',             color: '#3c873a' },
  // Frontend
  { name: 'Angular',        desc: { es: 'Standalone, Material, RxJS, PWA',              en: 'Standalone, Material, RxJS, PWA'             }, level: 76, devicon: 'devicon-angular-plain',            color: '#dd0031' },
  { name: 'React',          desc: { es: 'Hooks, Inertia.js, React Hook Form',           en: 'Hooks, Inertia.js, React Hook Form'          }, level: 78, devicon: 'devicon-react-original',           color: '#61dafb' },
  { name: 'TypeScript',     desc: { es: 'Tipado estático, interfaces, generics',        en: 'Static typing, interfaces, generics'         }, level: 76, devicon: 'devicon-typescript-plain',         color: '#3178c6' },
  { name: 'JavaScript',     desc: { es: 'ES6+, async/await, fetch, DOM',                en: 'ES6+, async/await, fetch, DOM'               }, level: 82, devicon: 'devicon-javascript-plain',         color: '#f7df1e' },
  { name: 'Tailwind CSS',   desc: { es: 'Utilidades, shadcn/ui, temas',                 en: 'Utilities, shadcn/ui, theming'               }, level: 72, devicon: 'devicon-tailwindcss-original',     color: '#38bdf8' },
  { name: 'HTML5',          desc: { es: 'Semántica, accesibilidad, estructura',         en: 'Semantics, accessibility, structure'         }, level: 90, devicon: 'devicon-html5-plain',              color: '#e34c26' },
  { name: 'CSS3',           desc: { es: 'Responsive, Flexbox, Grid, animaciones',       en: 'Responsive, Flexbox, Grid, animations'       }, level: 88, devicon: 'devicon-css3-plain',               color: '#264de4' },
  { name: 'WordPress',      desc: { es: 'Personalización avanzada, plugins, temas',     en: 'Advanced customization, plugins, themes'     }, level: 85, devicon: 'devicon-wordpress-plain',          color: '#21759b' },
  // Bases de datos
  { name: 'PostgreSQL',     desc: { es: 'Modelado, índices, migraciones',               en: 'Modeling, indexes, migrations'               }, level: 75, devicon: 'devicon-postgresql-plain',         color: '#336791' },
  { name: 'SQL Server',     desc: { es: 'T-SQL avanzado · certificado Datux',           en: 'Advanced T-SQL · Datux certified'            }, level: 75, devicon: 'devicon-microsoftsqlserver-plain', color: '#cc2927' },
  { name: 'MySQL / MariaDB',desc: { es: 'Consultas, relaciones, optimización',          en: 'Queries, relationships, optimization'        }, level: 70, devicon: 'devicon-mysql-plain',              color: '#00618a' },
  // DevOps y herramientas
  { name: 'Docker',         desc: { es: 'Imágenes, Compose, despliegue en VPS',         en: 'Images, Compose, VPS deployment'             }, level: 74, devicon: 'devicon-docker-plain',             color: '#2496ed' },
  { name: 'GitHub Actions', desc: { es: 'CI/CD, build y despliegue automático',         en: 'CI/CD, automated build and deploy'           }, level: 70, devicon: 'devicon-githubactions-plain',      color: '#2088ff' },
  { name: 'Git',            desc: { es: 'Ramas, Pull Requests, code review',            en: 'Branches, Pull Requests, code review'        }, level: 80, devicon: 'devicon-git-plain',                color: '#f05032' },
  { name: 'GitHub',         desc: { es: 'Repositorios, PRs, GHCR',                      en: 'Repositories, PRs, GHCR'                     }, level: 78, devicon: 'devicon-github-original',          color: '#ffffff' },
  { name: 'Python',         desc: { es: 'Scripts, automatización, básico-intermedio',   en: 'Scripts, automation, basic-intermediate'     }, level: 55, devicon: 'devicon-python-plain',             color: '#3776ab' },
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
