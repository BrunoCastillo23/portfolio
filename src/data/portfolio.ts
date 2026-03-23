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
    desc: 'Sitio corporativo con identidad de marca sólida y experiencia de usuario optimizada para conversión.',
    tags: ['WordPress', 'CSS', 'SEO', 'Branding'],
  },
  {
    name: 'Consigue Ventas',
    company: 'Consigue Ventas',
    url: 'consigueventas.com',
    href: 'https://consigueventas.com',
    bg: '#0d1520',
    desc: 'Plataforma principal. Landing pages de alto rendimiento orientadas a conversión y ventas.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Funnels'],
  },
  {
    name: 'Ticor Perú',
    company: 'Consigue Ventas',
    url: 'ticorperu.net',
    href: 'https://ticorperu.net',
    bg: '#0d1520',
    desc: 'Sitio institucional con presencia digital profesional y optimización SEO local.',
    tags: ['Web', 'Branding', 'SEO', 'Responsive'],
  },
  {
    name: 'Kare Salud Renal',
    company: 'Consigue Ventas',
    url: 'karesaludrenal.com',
    href: 'https://karesaludrenal.com',
    bg: '#0d1520',
    desc: 'Sitio de salud con información clara. Formularios de captación y atención al paciente.',
    tags: ['HTML', 'CSS', 'Formularios', 'UX'],
  },
  {
    name: 'PV Electrónica',
    company: 'Consigue Ventas',
    url: 'pvelectronica.consigueventas.com',
    href: 'https://pvelectronica.consigueventas.com',
    bg: '#0d1520',
    desc: 'Tienda electrónica con catálogo de productos, filtros y gestión de pedidos integrada.',
    tags: ['E-commerce', 'CSS', 'UX', 'Catálogo'],
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
