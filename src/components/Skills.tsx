import React, { useEffect, useRef, useState } from 'react';
import { useLang } from '../context/LangContext';

interface Skill {
  name: string;
  desc: { es: string; en: string };
  level: number;
  icon: string;   // nombre del SVG en src/assets/skills/
}

// Íconos de devicon 2.18.0 servidos desde el propio sitio (antes: fuente
// completa de 774 KB desde un CDN, que bloqueaba la carga en celulares).
const iconFiles = import.meta.glob('../assets/skills/*.svg', { eager: true, import: 'default' }) as Record<string, string>;
const iconSrc = (name: string) => iconFiles[`../assets/skills/${name}.svg`];
// Íconos muy oscuros que en el tema oscuro necesitan aclararse
const darkIconFix: Record<string, string> = { github: 'invert', wordpress: 'invert', mysql: 'brighten' };

const skillsData: Skill[] = [
  // Backend
  { name: 'Java',           desc: { es: 'Java 21, POO, colecciones, streams',           en: 'Java 21, OOP, collections, streams'          }, level: 80, icon: 'java' },
  { name: 'Spring Boot',    desc: { es: 'APIs REST, Security/JWT, JPA, Flyway',         en: 'REST APIs, Security/JWT, JPA, Flyway'        }, level: 78, icon: 'spring' },
  { name: 'Laravel',        desc: { es: 'Arquitectura modular, Fortify, Pest',          en: 'Modular architecture, Fortify, Pest'         }, level: 70, icon: 'laravel' },
  { name: 'PHP',            desc: { es: 'Laravel, WordPress, backend',                  en: 'Laravel, WordPress, backend'                 }, level: 68, icon: 'php' },
  { name: 'Node.js',        desc: { es: 'APIs REST, Express, middleware',               en: 'REST APIs, Express, middleware'              }, level: 65, icon: 'nodejs' },
  // Frontend
  { name: 'Angular',        desc: { es: 'Standalone, Material, RxJS, PWA',              en: 'Standalone, Material, RxJS, PWA'             }, level: 76, icon: 'angular' },
  { name: 'React',          desc: { es: 'Hooks, Inertia.js, React Hook Form',           en: 'Hooks, Inertia.js, React Hook Form'          }, level: 78, icon: 'react' },
  { name: 'TypeScript',     desc: { es: 'Tipado estático, interfaces, generics',        en: 'Static typing, interfaces, generics'         }, level: 76, icon: 'typescript' },
  { name: 'JavaScript',     desc: { es: 'ES6+, async/await, fetch, DOM',                en: 'ES6+, async/await, fetch, DOM'               }, level: 82, icon: 'javascript' },
  { name: 'Tailwind CSS',   desc: { es: 'Utilidades, shadcn/ui, temas',                 en: 'Utilities, shadcn/ui, theming'               }, level: 72, icon: 'tailwindcss' },
  { name: 'HTML5',          desc: { es: 'Semántica, accesibilidad, estructura',         en: 'Semantics, accessibility, structure'         }, level: 90, icon: 'html5' },
  { name: 'CSS3',           desc: { es: 'Responsive, Flexbox, Grid, animaciones',       en: 'Responsive, Flexbox, Grid, animations'       }, level: 88, icon: 'css3' },
  { name: 'WordPress',      desc: { es: 'Personalización avanzada, plugins, temas',     en: 'Advanced customization, plugins, themes'     }, level: 85, icon: 'wordpress' },
  // Bases de datos
  { name: 'PostgreSQL',     desc: { es: 'Modelado, índices, migraciones',               en: 'Modeling, indexes, migrations'               }, level: 75, icon: 'postgresql' },
  { name: 'SQL Server',     desc: { es: 'T-SQL avanzado · certificado Datux',           en: 'Advanced T-SQL · Datux certified'            }, level: 75, icon: 'microsoftsqlserver' },
  { name: 'MySQL / MariaDB',desc: { es: 'Consultas, relaciones, optimización',          en: 'Queries, relationships, optimization'        }, level: 70, icon: 'mysql' },
  // DevOps y herramientas
  { name: 'Docker',         desc: { es: 'Imágenes, Compose, despliegue en VPS',         en: 'Images, Compose, VPS deployment'             }, level: 74, icon: 'docker' },
  { name: 'GitHub Actions', desc: { es: 'CI/CD, build y despliegue automático',         en: 'CI/CD, automated build and deploy'           }, level: 70, icon: 'githubactions' },
  { name: 'Git',            desc: { es: 'Ramas, Pull Requests, code review',            en: 'Branches, Pull Requests, code review'        }, level: 80, icon: 'git' },
  { name: 'GitHub',         desc: { es: 'Repositorios, PRs, GHCR',                      en: 'Repositories, PRs, GHCR'                     }, level: 78, icon: 'github' },
  { name: 'Python',         desc: { es: 'Scripts, automatización, básico-intermedio',   en: 'Scripts, automation, basic-intermediate'     }, level: 55, icon: 'python' },
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
                <img
                  src={iconSrc(skill.icon)}
                  alt=""
                  width={30}
                  height={30}
                  loading="lazy"
                  className={`skill-card__img${darkIconFix[skill.icon] ? ` skill-card__img--${darkIconFix[skill.icon]}` : ''}`}
                />
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
