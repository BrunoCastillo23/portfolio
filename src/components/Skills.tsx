import React from 'react';
import { useLang } from '../context/LangContext';

interface Skill {
  name: string;
  desc: { es: string; en: string };
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
  { name: 'Java',           desc: { es: 'Java 21, POO, colecciones, streams',           en: 'Java 21, OOP, collections, streams'          }, icon: 'java' },
  { name: 'Spring Boot',    desc: { es: 'APIs REST, Security/JWT, JPA, Flyway',         en: 'REST APIs, Security/JWT, JPA, Flyway'        }, icon: 'spring' },
  { name: 'Laravel',        desc: { es: 'Arquitectura modular, Fortify, Pest',          en: 'Modular architecture, Fortify, Pest'         }, icon: 'laravel' },
  { name: 'PHP',            desc: { es: 'Laravel, WordPress, backend',                  en: 'Laravel, WordPress, backend'                 }, icon: 'php' },
  { name: 'Node.js',        desc: { es: 'APIs REST, Express, middleware',               en: 'REST APIs, Express, middleware'              }, icon: 'nodejs' },
  // Frontend
  { name: 'Angular',        desc: { es: 'Standalone, Material, RxJS, PWA',              en: 'Standalone, Material, RxJS, PWA'             }, icon: 'angular' },
  { name: 'React',          desc: { es: 'Hooks, Inertia.js, React Hook Form',           en: 'Hooks, Inertia.js, React Hook Form'          }, icon: 'react' },
  { name: 'TypeScript',     desc: { es: 'Tipado estático, interfaces, generics',        en: 'Static typing, interfaces, generics'         }, icon: 'typescript' },
  { name: 'JavaScript',     desc: { es: 'ES6+, async/await, fetch, DOM',                en: 'ES6+, async/await, fetch, DOM'               }, icon: 'javascript' },
  { name: 'Tailwind CSS',   desc: { es: 'Utilidades, shadcn/ui, temas',                 en: 'Utilities, shadcn/ui, theming'               }, icon: 'tailwindcss' },
  { name: 'HTML5',          desc: { es: 'Semántica, accesibilidad, estructura',         en: 'Semantics, accessibility, structure'         }, icon: 'html5' },
  { name: 'CSS3',           desc: { es: 'Responsive, Flexbox, Grid, animaciones',       en: 'Responsive, Flexbox, Grid, animations'       }, icon: 'css3' },
  { name: 'WordPress',      desc: { es: 'Personalización avanzada, plugins, temas',     en: 'Advanced customization, plugins, themes'     }, icon: 'wordpress' },
  // Bases de datos
  { name: 'PostgreSQL',     desc: { es: 'Modelado, índices, migraciones',               en: 'Modeling, indexes, migrations'               }, icon: 'postgresql' },
  { name: 'SQL Server',     desc: { es: 'T-SQL avanzado · certificado Datux',           en: 'Advanced T-SQL · Datux certified'            }, icon: 'microsoftsqlserver' },
  { name: 'MySQL / MariaDB',desc: { es: 'Consultas, relaciones, optimización',          en: 'Queries, relationships, optimization'        }, icon: 'mysql' },
  // DevOps y herramientas
  { name: 'Docker',         desc: { es: 'Imágenes, Compose, despliegue en VPS',         en: 'Images, Compose, VPS deployment'             }, icon: 'docker' },
  { name: 'GitHub Actions', desc: { es: 'CI/CD, build y despliegue automático',         en: 'CI/CD, automated build and deploy'           }, icon: 'githubactions' },
  { name: 'Git',            desc: { es: 'Ramas, Pull Requests, code review',            en: 'Branches, Pull Requests, code review'        }, icon: 'git' },
  { name: 'GitHub',         desc: { es: 'Repositorios, PRs, GHCR',                      en: 'Repositories, PRs, GHCR'                     }, icon: 'github' },
  { name: 'Python',         desc: { es: 'Scripts, automatización, básico-intermedio',   en: 'Scripts, automation, basic-intermediate'     }, icon: 'python' },
];

const Skills: React.FC = () => {
  const { lang, t } = useLang();

  return (
    <section id="habilidades" className="section skills">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
