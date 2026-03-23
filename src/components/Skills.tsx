import React, { useEffect, useRef, useState } from 'react';

interface Skill {
  name: string;
  desc: string;
  level: number;
  icon: React.ReactNode;
}

// SVG icons inline — sin dependencias externas
const icons: Record<string, React.ReactNode> = {
  react: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
      <circle cx="12" cy="12" r="2.5" fill="#4d9fff"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#4d9fff" strokeWidth="1.2" fill="none"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#4d9fff" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#4d9fff" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/>
    </svg>
  ),
  js: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#f0db4f"/>
      <path d="M8 17.5c.5.8 1.2 1.3 2.3 1.3 1.2 0 2-.6 2-1.5 0-1-.6-1.4-1.8-1.9l-.6-.3c-1.8-.8-3-1.7-3-3.7 0-1.8 1.4-3.2 3.6-3.2 1.6 0 2.7.5 3.5 1.9l-1.9 1.2c-.4-.7-.9-1-1.6-1-.7 0-1.2.4-1.2 1 0 .7.4 1 1.5 1.5l.6.3c2.1.9 3.3 1.8 3.3 3.8 0 2.2-1.7 3.4-4 3.4-2.2 0-3.7-1.1-4.4-2.5L8 17.5z" fill="#323330"/>
      <path d="M15.5 8.4h2.3v7.3c0 2.5-1.2 3.6-2.9 3.6-.5 0-1 0-1.4-.2l.4-2c.3.1.5.2.8.2.7 0 .8-.5.8-1.2V8.4z" fill="#323330"/>
    </svg>
  ),
  ts: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#3178c6"/>
      <path d="M14.5 12H10v1.5h1.5V19H13v-5.5h1.5V12z" fill="white"/>
      <path d="M17.5 12.5c-.5-.4-1.2-.6-1.8-.6-1.2 0-2 .7-2 1.6 0 .9.6 1.3 1.5 1.7l.4.2c.5.2.8.4.8.8 0 .4-.4.7-.9.7-.6 0-1.1-.3-1.4-.7l-.9.8c.5.7 1.3 1 2.3 1 1.4 0 2.3-.7 2.3-1.9 0-1-.6-1.4-1.6-1.8l-.4-.2c-.4-.2-.7-.3-.7-.7 0-.3.3-.5.7-.5.4 0 .8.2 1.1.5l.6-.9z" fill="white"/>
    </svg>
  ),
  html: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M4 3l1.5 17L12 22l6.5-2L20 3H4z" fill="#e34c26"/>
      <path d="M12 20.5l5.3-1.5 1.3-14.5H12v16z" fill="#ef652a"/>
      <path d="M12 12.5H8.8l-.2-2.5H12V8H6.3l.5 5.5H12v-1zm0 4.5l-3.2-.9-.2-2.2H6.3l.4 4.1L12 19.5v-2.5z" fill="white"/>
      <path d="M12 12.5v1h2.9l-.3 2.6-2.6.7v2.5l4-1.1.5-5.7H12zM12 8v2h5.3l-.2 2H12v2h4.9l-.5 5.5L12 20.5v2.5l5.3-1.5.4-4.1H12" fill="#ebebeb"/>
    </svg>
  ),
  css: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M4 3l1.5 17L12 22l6.5-2L20 3H4z" fill="#264de4"/>
      <path d="M12 20.5l5.3-1.5 1.3-14.5H12v16z" fill="#2965f1"/>
      <path d="M12 12.5H8.5l-.2-2.5H12V8H6l.5 5.5H12v-1zm0 4.5l-3.3-.9-.2-2.2H6.2l.4 4.1L12 19.5v-2.5z" fill="white"/>
      <path d="M12 12.5v1h3.1l-.3 2.6-2.8.7v2.5l4.2-1.1.4-4.7H12zM12 8v2h5.5l-.2 1.5H12v2.5h4.8l-.5 5.2L12 20.5v2.5l5.3-1.5L18.5 8H12z" fill="#ebebeb"/>
    </svg>
  ),
  nodejs: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" fill="#3c873a"/>
      <path d="M12 4.5L5 8.5v7l7 3.9 7-3.9v-7L12 4.5z" fill="#3c873a"/>
      <text x="7" y="15" fontSize="7" fill="white" fontFamily="Arial" fontWeight="bold">JS</text>
    </svg>
  ),
  php: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <ellipse cx="12" cy="12" rx="10" ry="6" fill="#8892be"/>
      <text x="5.5" y="15.5" fontSize="7" fill="white" fontFamily="Arial" fontWeight="bold">PHP</text>
    </svg>
  ),
  wordpress: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <circle cx="12" cy="12" r="10" fill="#21759b"/>
      <path d="M3.6 12c0 3.5 2 6.5 5 8L4.2 9.5C3.8 10.3 3.6 11.1 3.6 12zM17.6 11.5c0-1.1-.4-1.9-.7-2.5-.5-.8-.9-1.4-.9-2.2 0-.8.6-1.6 1.5-1.6h.1C16 4.1 14.1 3.5 12 3.5c-2.8 0-5.3 1.4-6.8 3.6h.5c.9 0 2.2-.1 2.2-.1.4 0 .5.6.1.6 0 0-.4.1-.9.1L10 16l2-5.9-.9-.1c-.4 0-.5-.6-.1-.6 0 0 1.4.1 2.3.1.9 0 2.2-.1 2.2-.1.4 0 .5.6.1.6 0 0-.4.1-.9.1l2.8 8.3.8-2.6c.4-.9.6-1.6.6-2.3z" fill="white"/>
      <path d="M12.1 12.9l-2.3 6.7c.7.2 1.4.3 2.2.3 1 0 1.9-.2 2.7-.5l-.1-.1-2.5-6.4zM19.1 8c0 .9-.2 1.9-.8 3.2l-3.1 9c3-1.7 5-5 5-8.2 0-1.4-.3-2.8-.9-4h-.1l-.1 0z" fill="white"/>
    </svg>
  ),
  git: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M23 11.3L12.7 1a1 1 0 0 0-1.4 0L9 3.3 11.7 6A1.5 1.5 0 0 1 13.8 8l2.6 2.6a1.5 1.5 0 1 1-.9.9L13 8.9V15a1.5 1.5 0 1 1-1 0V8.8a1.5 1.5 0 0 1-.8-1.9L8.6 4.2l-7.6 7.6a1 1 0 0 0 0 1.4l10.3 10.3a1 1 0 0 0 1.4 0L23 12.7a1 1 0 0 0 0-1.4z" fill="#f05032"/>
    </svg>
  ),
  mysql: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M16.5 3C14 3 12 5 12 7.5S14 12 16.5 12 21 10 21 7.5 19 3 16.5 3z" fill="#00618a"/>
      <path d="M3 16.5C3 14 5 12 7.5 12S12 14 12 16.5 10 21 7.5 21 3 19 3 16.5z" fill="#00618a"/>
      <path d="M3 7.5C3 5 5 3 7.5 3S12 5 12 7.5 10 12 7.5 12 3 10 3 7.5z" fill="#e48e00"/>
      <path d="M12 12l9 9" stroke="#00618a" strokeWidth="2"/>
    </svg>
  ),
  hostinger: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#673de6"/>
      <path d="M7 8v8M12 8v8M17 8v8M7 12h10" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  python: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M12 2C8.7 2 7 3.5 7 5.5V8h5v1H5.5C3.5 9 2 10.7 2 14s1.5 5 3.5 5H7v-2.5c0-2 1.7-3.5 5-3.5s5 1.5 5 3.5V19h1.5c2 0 3.5-1.7 3.5-5s-1.5-5-3.5-5H17V8h-5V7h5V5.5C17 3.5 15.3 2 12 2z" fill="#3776ab"/>
      <path d="M12 2C8.7 2 7 3.5 7 5.5V8h5v1H5.5C3.5 9 2 10.7 2 14s1.5 5 3.5 5H7v-2.5c0-2 1.7-3.5 5-3.5s5 1.5 5 3.5V19h1.5c2 0 3.5-1.7 3.5-5s-1.5-5-3.5-5H17V8h-5V7h5V5.5C17 3.5 15.3 2 12 2z" fill="url(#pyGrad)"/>
      <defs>
        <linearGradient id="pyGrad" x1="2" y1="2" x2="22" y2="22">
          <stop offset="0%" stopColor="#3776ab"/>
          <stop offset="100%" stopColor="#ffd43b"/>
        </linearGradient>
      </defs>
      <circle cx="9.5" cy="5.5" r="1" fill="white"/>
      <circle cx="14.5" cy="18.5" r="1" fill="white"/>
    </svg>
  ),
};

const skillsData: Skill[] = [
  { name: 'React',       desc: 'SPAs, hooks, context, estado global',       level: 75, icon: icons.react },
  { name: 'JavaScript',  desc: 'ES6+, async/await, fetch, DOM',              level: 82, icon: icons.js },
  { name: 'TypeScript',  desc: 'Tipado estático, interfaces, generics',      level: 60, icon: icons.ts },
  { name: 'HTML5',       desc: 'Semántica, accesibilidad, estructura',       level: 90, icon: icons.html },
  { name: 'CSS3',        desc: 'Responsive, Flexbox, Grid, animaciones',     level: 88, icon: icons.css },
  { name: 'Node.js',     desc: 'APIs REST, Express, middleware',              level: 68, icon: icons.nodejs },
  { name: 'PHP',         desc: 'Funciones WordPress, backend básico',        level: 60, icon: icons.php },
  { name: 'WordPress',   desc: 'Personalización avanzada, plugins, temas',   level: 85, icon: icons.wordpress },
  { name: 'Git & GitHub',desc: 'Control de versiones, ramas, pull requests', level: 74, icon: icons.git },
  { name: 'MySQL',       desc: 'Consultas, relaciones, phpMyAdmin',          level: 62, icon: icons.mysql },
  { name: 'Hostinger',   desc: 'Dominios, hosting, backups, migraciones',    level: 80, icon: icons.hostinger },
  { name: 'Python',      desc: 'Scripts, automatización, básico-intermedio', level: 55, icon: icons.python },
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
