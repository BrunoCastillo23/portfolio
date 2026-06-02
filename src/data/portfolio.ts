export interface Skill {
  icon: string;
  name: string;
  desc: string;
  level: number;
}

export interface Project {
  name: string;
  company: string;
  url: string;
  href: string;
  bg: string;
  desc: string;
  tags: string[];
}

export interface ContactLink {
  icon: 'email' | 'github' | 'linkedin' | 'phone';
  label: string;
  value: string;
  href: string;
}

export const skills: Skill[] = [
  { icon: '⚛️', name: 'React',          desc: 'SPAs, hooks, context, estado global',       level: 75 },
  { icon: '🟨', name: 'JavaScript',     desc: 'ES6+, async/await, fetch, DOM',              level: 82 },
  { icon: '🎨', name: 'HTML & CSS',     desc: 'Responsive, Flexbox, Grid, animaciones',     level: 90 },
  { icon: '🟢', name: 'Node.js',        desc: 'APIs REST, Express, middleware',              level: 68 },
  { icon: '🗄️', name: 'Bases de datos', desc: 'SQL, MongoDB, queries básicos',              level: 62 },
  { icon: '🔷', name: 'TypeScript',     desc: 'Tipado estático, interfaces, generics',      level: 60 },
  { icon: '🔧', name: 'Git & Deploy',   desc: 'GitHub, Vercel, Netlify, CI/CD básico',      level: 74 },
  { icon: '🚀', name: 'Performance',    desc: 'SEO, optimización, Web Vitals',              level: 65 },
];

export const projects: Project[] = [
  {
    name: 'Effetha',
    company: 'Consigue Ventas',
    url: 'effetha.com',
    href: 'https://effetha.com',
    bg: '#0d1520',
    desc: 'Landing Page Horizontal realizada por la misma empresa Effetha. Desarrollada con WordPress, HTML5, CSS3, JavaScript y PHP.',
    tags: ['WordPress', 'HTML5', 'CSS3', 'JavaScript', 'PHP'],
  },
  {
    name: 'Consigue Ventas',
    company: 'Consigue Ventas',
    url: 'consigueventas.com',
    href: 'https://consigueventas.com',
    bg: '#0d1520',
    desc: 'Multipage realizada por la misma empresa Consigue Ventas. Desarrollada con WordPress, HTML5, CSS3, JavaScript y PHP.',
    tags: ['WordPress', 'HTML5', 'CSS3', 'JavaScript', 'PHP'],
  },
  {
    name: 'Ticor Perú',
    company: 'Consigue Ventas',
    url: 'ticorperu.net',
    href: 'https://ticorperu.net',
    bg: '#0d1520',
    desc: 'Multipage realizada por Consigue Ventas. Desarrollada con WordPress, HTML5, CSS3, JavaScript y PHP.',
    tags: ['WordPress', 'HTML5', 'CSS3', 'JavaScript', 'PHP'],
  },
  {
    name: 'Kare Salud Renal',
    company: 'Consigue Ventas',
    url: 'karesaludrenal.com',
    href: 'https://karesaludrenal.com',
    bg: '#0d1520',
    desc: 'Landing Page Vertical realizada por Consigue Ventas. Desarrollada con WordPress, HTML5, CSS3, JavaScript y PHP.',
    tags: ['WordPress', 'HTML5', 'CSS3', 'JavaScript', 'PHP'],
  },
  {
    name: 'PV Electrónica',
    company: 'Consigue Ventas',
    url: 'pvelectronica.com.pe',
    href: 'https://pvelectronica.com.pe/',
    bg: '#0d1520',
    desc: 'Multipage realizada por Consigue Ventas. Desarrollada con WordPress, HTML5, CSS3, JavaScript y PHP.',
    tags: ['WordPress', 'HTML5', 'CSS3', 'JavaScript', 'PHP'],
  },
  {
    name: 'Sergenind',
    company: 'Consigue Ventas',
    url: 'sergenind.com',
    href: 'https://sergenind.com',
    bg: '#0d1520',
    desc: 'Multipage realizada por Consigue Ventas. Desarrollada con WordPress, HTML5, CSS3, JavaScript y PHP.',
    tags: ['WordPress', 'HTML5', 'CSS3', 'JavaScript', 'PHP'],
  },
];

export const contactLinks: ContactLink[] = [
  {
    icon: 'email',
    label: 'Email personal',
    value: 'castillobruno0104@gmail.com',
    href: 'mailto:castillobruno0104@gmail.com',
  },
  {
    icon: 'github',
    label: 'GitHub',
    value: 'github.com/BrunoCastillo23',
    href: 'https://github.com/BrunoCastillo23',
  },
  {
    icon: 'linkedin',
    label: 'LinkedIn',
    value: 'Bruno Castillo Robles',
    href: 'https://www.linkedin.com/in/bruno-castillo-robles',
  },
];
