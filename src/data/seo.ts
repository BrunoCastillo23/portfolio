// Metadatos SEO por ruta. Sin imports de imágenes: este archivo también lo usa
// vite.config.ts para generar el HTML estático de cada página y el sitemap.

export const SITE_URL = 'https://brunocastillo.dev';

export interface SeoRoute {
  path: string;
  title: string;
  description: string;
  image: string;          // ruta dentro de /public
  type?: 'website' | 'article';
}

export const projectSeo: SeoRoute[] = [
  {
    path: '/proyectos/practicas-unjfsc',
    title: 'Sistema de Prácticas Pre Profesionales (UNJFSC) — Caso de estudio | Bruno Castillo',
    description: 'Plataforma que digitaliza las prácticas pre profesionales de la Escuela de Ingeniería de Sistemas de la UNJFSC. Laravel 12, React 19, Inertia.js, MariaDB y Docker. Rol: Developer Lead.',
    image: '/og/practicas-unjfsc.jpg',
  },
  {
    path: '/proyectos/fundo-castillo',
    title: 'Fundo Castillo — AgroERP · Caso de estudio | Bruno Castillo',
    description: 'ERP agrícola con 15 módulos: labores de campo, cuaderno fitosanitario, planilla, inventario y rentabilidad. PWA offline con Angular, Spring Boot y PostgreSQL.',
    image: '/og/fundo-castillo.jpg',
  },
];
