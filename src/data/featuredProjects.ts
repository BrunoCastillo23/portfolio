// ── Proyectos destacados (cards + página de detalle /proyectos/:slug) ─────────

import fundoLanding      from '../assets/proyectos/fundo-castillo/landing.webp';
import fundoCover        from '../assets/proyectos/fundo-castillo/cover.webp';
import fundoDashboard    from '../assets/proyectos/fundo-castillo/dashboard.webp';
import fundoPlanif       from '../assets/proyectos/fundo-castillo/planificacion.webp';
import fundoLabores      from '../assets/proyectos/fundo-castillo/labores.webp';
import fundoInsumos      from '../assets/proyectos/fundo-castillo/insumos.webp';
import fundoAsistencia   from '../assets/proyectos/fundo-castillo/asistencia.webp';
import fundoMovil        from '../assets/proyectos/fundo-castillo/movil-asistencia.webp';

import pppLanding        from '../assets/proyectos/practicas-unjfsc/landing.webp';
import pppCover          from '../assets/proyectos/practicas-unjfsc/cover.webp';
import pppEstPanel       from '../assets/proyectos/practicas-unjfsc/estudiante-panel.webp';
import pppExpediente     from '../assets/proyectos/practicas-unjfsc/estudiante-expediente.webp';
import pppPasantia       from '../assets/proyectos/practicas-unjfsc/estudiante-pasantia.webp';
import pppTitPanel       from '../assets/proyectos/practicas-unjfsc/titular-panel.webp';
import pppTitConfig      from '../assets/proyectos/practicas-unjfsc/titular-config.webp';

import { BadgeCheck, Bell, BookOpen, Building2, CalendarDays, ChartColumn, ClipboardCheck, FileText, FolderOpen, GraduationCap, HardHat, KeyRound, Package, Presentation, School, ShieldCheck, Tractor, Trees, TrendingUp, UserCog, Users, Wallet, type LucideIcon } from 'lucide-react';

type L = { es: string; en: string };

export interface FeaturedProject {
  slug: string;
  name: string;
  url: string;          // dominio mostrado en la barra del navegador
  href: string;         // enlace a la plataforma en producción
  repo?: string;        // repositorio público (si lo hay)
  cover: string;        // versión liviana (960 px) para card y portada
  context: L;           // "Proyecto propio", "Prácticas pre profesionales · UNJFSC"
  role: L;
  period: L;
  tagline: L;
  summary: L;           // texto corto para la card
  overview: L[];        // párrafos de "¿Qué resuelve?"
  stats: { value: string; label: L }[];
  users: { icon: LucideIcon; name: L; desc: L }[];
  modules: { icon: LucideIcon; name: L; desc: L }[];
  highlights: L[];      // arquitectura y buenas prácticas
  tech: { group: L; items: string[] }[];
  cardTags: string[];
  gallery: { src: string; caption: L; mobile?: boolean }[];
}

export const featuredProjects: FeaturedProject[] = [
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'practicas-unjfsc',
    name: 'Sistema de Prácticas Pre Profesionales',
    url: 'practicaspre.kerpun.com',
    href: 'https://practicaspre.kerpun.com/',
    repo: 'https://github.com/nimudx/system-ppp-unjfsc',
    cover: pppCover,
    context: { es: 'Prácticas pre profesionales · UNJFSC', en: 'Pre-professional internship · UNJFSC' },
    role:    { es: 'Developer Lead', en: 'Developer Lead' },
    period:  { es: 'Ago 2026 – Actualidad', en: 'Aug 2026 – Present' },
    tagline: {
      es: 'Plataforma web que digitaliza de principio a fin el proceso de prácticas pre profesionales de la Escuela de Ingeniería de Sistemas (FIISI) de la UNJFSC.',
      en: 'Web platform that digitizes the entire pre-professional internship process for the Systems Engineering School (FIISI) at UNJFSC.',
    },
    summary: {
      es: 'Gestión completa de prácticas: expediente del estudiante, validación de empresas por RUC, plan e informe, supervisión docente y evaluación. 5 perfiles de usuario.',
      en: 'End-to-end internship management: student records, company validation by RUC, plan and report, faculty supervision and grading. 5 user profiles.',
    },
    overview: [
      {
        es: 'Antes, las prácticas se gestionaban con documentos físicos, correos y hojas de cálculo: el estudiante no sabía en qué estado estaba su trámite y los docentes revisaban expedientes a mano. Esta plataforma centraliza todo el flujo en un solo lugar, con estados claros y trazabilidad de cada documento.',
        en: 'Internships used to be handled with paper documents, emails and spreadsheets: students did not know the status of their process and faculty reviewed files by hand. This platform centralizes the whole flow in one place, with clear statuses and traceability for every document.',
      },
      {
        es: 'Como Developer Lead coordino al equipo de desarrollo, defino la arquitectura modular por dominios, reviso cada Pull Request y me encargo del despliegue automatizado en producción.',
        en: 'As Developer Lead I coordinate the development team, define the domain-based modular architecture, review every Pull Request and own the automated production deployment.',
      },
    ],
    stats: [
      { value: '13', label: { es: 'Módulos funcionales', en: 'Functional modules' } },
      { value: '5',  label: { es: 'Perfiles de usuario', en: 'User profiles' } },
      { value: '120+', label: { es: 'Pruebas automatizadas', en: 'Automated tests' } },
      { value: 'CI/CD', label: { es: 'Despliegue en cada merge', en: 'Deploy on every merge' } },
    ],
    users: [
      { icon: GraduationCap, name: { es: 'Estudiante', en: 'Student' },
        desc: { es: 'Sube su expediente, registra su empresa por RUC, entrega plan e informe y sigue su avance en un panel con tareas pendientes.', en: 'Uploads their records, registers their company by RUC, submits plan and report, and tracks progress on a dashboard with pending tasks.' } },
      { icon: Presentation, name: { es: 'Docente titular', en: 'Lead professor' },
        desc: { es: 'Aprueba, observa o rechaza las empresas propuestas y configura las etapas y requisitos documentales del ciclo.', en: 'Approves, flags or rejects proposed companies and configures the stages and document requirements of each term.' } },
      { icon: ClipboardCheck, name: { es: 'Docente supervisor', en: 'Supervising professor' },
        desc: { es: 'Supervisa a sus grupos de estudiantes, revisa entregas y registra la evaluación de cada práctica.', en: 'Supervises student groups, reviews submissions and records the grade for each internship.' } },
      { icon: Building2, name: { es: 'Empresa', en: 'Company' },
        desc: { es: 'Activa su cuenta por invitación y acepta o rechaza a los estudiantes que quieren hacer prácticas con ella.', en: 'Activates its account via invitation and accepts or rejects students who want to intern there.' } },
      { icon: ShieldCheck, name: { es: 'Administrador', en: 'Administrator' },
        desc: { es: 'Gestiona usuarios, facultades, escuelas, semestres y secciones, y publica recursos para cada perfil.', en: 'Manages users, faculties, schools, terms and sections, and publishes resources for each profile.' } },
    ],
    modules: [
      { icon: KeyRound, name: { es: 'Identidad y accesos', en: 'Identity & access' }, desc: { es: 'Login, perfiles, roles y permisos por tipo de usuario.', en: 'Login, profiles, roles and per-user-type permissions.' } },
      { icon: School, name: { es: 'Gestión académica', en: 'Academic management' }, desc: { es: 'Facultades, escuelas, semestres y secciones.', en: 'Faculties, schools, terms and sections.' } },
      { icon: FolderOpen, name: { es: 'Expediente', en: 'Student records' }, desc: { es: 'Carga y validación de ficha de matrícula y récord académico.', en: 'Upload and validation of enrollment form and transcript.' } },
      { icon: BadgeCheck, name: { es: 'Validación de empresas', en: 'Company validation' }, desc: { es: 'Consulta de RUC, revisión del titular, invitación y activación de la empresa.', en: 'RUC lookup, professor review, company invitation and activation.' } },
      { icon: FileText, name: { es: 'Pasantía y formalización', en: 'Internship & formalization' }, desc: { es: 'Datos de la práctica, jefe inmediato y documentos de formalización.', en: 'Internship details, direct supervisor and formalization documents.' } },
      { icon: ChartColumn, name: { es: 'Plan e informe', en: 'Plan & report' }, desc: { es: 'Entrega y revisión del plan y del informe final de prácticas.', en: 'Submission and review of the internship plan and final report.' } },
      { icon: Users, name: { es: 'Supervisión y evaluación', en: 'Supervision & grading' }, desc: { es: 'Grupos de supervisión, seguimiento y calificación.', en: 'Supervision groups, follow-up and grading.' } },
      { icon: Bell, name: { es: 'Notificaciones y recursos', en: 'Notifications & resources' }, desc: { es: 'Avisos por correo y en la plataforma, y material por perfil.', en: 'Email and in-app notices, plus per-profile materials.' } },
    ],
    highlights: [
      { es: 'Arquitectura modular por dominios: cada área (identidad, académico, expediente, empresas, supervisión…) tiene sus páginas, componentes y API pública propios.', en: 'Domain-based modular architecture: each area (identity, academic, records, companies, supervision…) owns its pages, components and public API.' },
      { es: 'Flujo de validación de empresas con 13 endpoints: consulta de RUC, revisión, invitación con token de un solo uso y aceptación del estudiante.', en: 'Company validation flow with 13 endpoints: RUC lookup, review, single-use token invitation and student acceptance.' },
      { es: 'Reglas de negocio aplicadas también en el servidor: un estudiante no puede subir plan ni informe sin aceptación empresarial, ni siquiera con una petición directa.', en: 'Business rules enforced on the server too: a student cannot upload a plan or report without company acceptance, even with a direct request.' },
      { es: 'CI/CD con GitHub Actions: build de la imagen Docker, publicación en GHCR, despliegue por SSH y migraciones automáticas en cada merge a main.', en: 'CI/CD with GitHub Actions: Docker image build, GHCR publishing, SSH deploy and automatic migrations on every merge to main.' },
      { es: 'Trabajo en equipo con Pull Requests, code review, ESLint, Prettier, Laravel Pint y pruebas con Pest.', en: 'Team workflow with Pull Requests, code review, ESLint, Prettier, Laravel Pint and Pest tests.' },
      { es: 'Producción detrás de Cloudflare (proxy y túnel): el servidor no expone puertos públicos.', en: 'Production behind Cloudflare (proxy and tunnel): the server exposes no public ports.' },
    ],
    tech: [
      { group: { es: 'Frontend', en: 'Frontend' }, items: ['React 19', 'TypeScript', 'Inertia.js', 'Tailwind CSS', 'shadcn/ui', 'React Hook Form', 'Zod'] },
      { group: { es: 'Backend', en: 'Backend' }, items: ['Laravel 12', 'PHP 8.2', 'Laravel Fortify', 'Sanctum', 'Wayfinder'] },
      { group: { es: 'Base de datos', en: 'Database' }, items: ['MariaDB 10.11'] },
      { group: { es: 'DevOps y calidad', en: 'DevOps & quality' }, items: ['Docker', 'GitHub Actions', 'GHCR', 'Caddy', 'Cloudflare', 'Pest', 'ESLint', 'Prettier'] },
    ],
    cardTags: ['Laravel', 'React', 'TypeScript', 'Inertia.js', 'MariaDB', 'Docker'],
    gallery: [
      { src: pppLanding,    caption: { es: 'Página de inicio pública', en: 'Public landing page' } },
      { src: pppEstPanel,   caption: { es: 'Panel del estudiante con avance por área y tareas pendientes', en: 'Student dashboard with progress by area and pending tasks' } },
      { src: pppExpediente, caption: { es: 'Expediente: carga y validación de documentos', en: 'Records: document upload and validation' } },
      { src: pppPasantia,   caption: { es: 'Pasantía: consulta de la empresa por RUC', en: 'Internship: company lookup by RUC' } },
      { src: pppTitPanel,   caption: { es: 'Panel del docente titular', en: 'Lead professor dashboard' } },
      { src: pppTitConfig,  caption: { es: 'Configuración de etapas y requisitos del ciclo', en: 'Term stages and requirements configuration' } },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'fundo-castillo',
    name: 'Fundo Castillo — AgroERP',
    url: 'fundocastillo.brunocastillo.dev',
    href: 'https://fundocastillo.brunocastillo.dev/',
    cover: fundoCover,
    context: { es: 'Proyecto propio · En producción', en: 'Own project · In production' },
    role:    { es: 'Desarrollador Full Stack', en: 'Full Stack Developer' },
    period:  { es: 'Jul 2026 – Actualidad', en: 'Jul 2026 – Present' },
    tagline: {
      es: 'ERP agrícola para fundos de mandarina, palta, pecana y kumquat: planifica labores, controla inventario y planilla, y calcula el costo y la rentabilidad de cada lote. Funciona desde el celular, incluso sin señal en el campo.',
      en: 'Agricultural ERP for mandarin, avocado, pecan and kumquat farms: plans field work, controls inventory and payroll, and calculates the cost and profitability of each plot. Works from a phone, even with no signal in the field.',
    },
    summary: {
      es: 'ERP agrícola con 15 módulos: lotes, labores de campo, cuaderno fitosanitario, asistencia, planilla, inventario, ventas y rentabilidad. PWA que funciona sin internet.',
      en: 'Agricultural ERP with 15 modules: plots, field work, phytosanitary log, attendance, payroll, inventory, sales and profitability. PWA that works offline.',
    },
    overview: [
      {
        es: 'En un fundo, las labores (riego, fumigación, abonamiento, poda, cosecha) se anotaban en cuadernos y la planilla se calculaba a mano. Así era difícil saber cuánto costaba realmente cada lote o cuándo se podía cosechar después de una fumigación.',
        en: 'On a farm, field work (irrigation, spraying, fertilizing, pruning, harvest) was written down in notebooks and payroll was calculated by hand. That made it hard to know the real cost of each plot or when it was safe to harvest after spraying.',
      },
      {
        es: 'AgroERP lo resuelve con una app pensada para el capataz en el campo: registra cada labor desde el celular (aunque no haya señal), descuenta los insumos del inventario, respeta los periodos de carencia y genera la planilla y los reportes de rentabilidad automáticamente. Lo diseñé, desarrollé y desplegué de punta a punta.',
        en: 'AgroERP solves this with an app built for the foreman in the field: they log each task from a phone (even without signal), inputs are deducted from inventory, pre-harvest intervals are enforced, and payroll and profitability reports are generated automatically. I designed, built and deployed it end to end.',
      },
    ],
    stats: [
      { value: '15', label: { es: 'Módulos de negocio', en: 'Business modules' } },
      { value: '5',  label: { es: 'Tipos de labor de campo', en: 'Field task types' } },
      { value: 'PWA', label: { es: 'Funciona sin internet', en: 'Works offline' } },
      { value: '24/7', label: { es: 'En producción con HTTPS y respaldos', en: 'In production with HTTPS and backups' } },
    ],
    users: [
      { icon: UserCog, name: { es: 'Administrador', en: 'Administrator' },
        desc: { es: 'Acceso total: usuarios, finanzas, planilla, campañas y reportes de rentabilidad por lote.', en: 'Full access: users, finances, payroll, seasons and per-plot profitability reports.' } },
      { icon: HardHat, name: { es: 'Operador / capataz', en: 'Operator / foreman' },
        desc: { es: 'Registra labores, asistencia e inventario desde el celular en el campo, con o sin conexión.', en: 'Logs field work, attendance and inventory from a phone in the field, online or offline.' } },
    ],
    modules: [
      { icon: Trees, name: { es: 'Fundos y lotes', en: 'Farms & plots' }, desc: { es: 'Hectáreas, número de árboles y cultivos por lote.', en: 'Hectares, tree count and crops per plot.' } },
      { icon: CalendarDays, name: { es: 'Planificación', en: 'Planning' }, desc: { es: 'Programa labores, reprograma o cancela y ve lo pendiente de la semana.', en: 'Schedule, reschedule or cancel tasks and see what is due this week.' } },
      { icon: Tractor, name: { es: 'Labores de campo', en: 'Field work' }, desc: { es: 'Riego, fumigación, abonamiento, poda y cosecha con su detalle técnico.', en: 'Irrigation, spraying, fertilizing, pruning and harvest with technical details.' } },
      { icon: BookOpen, name: { es: 'Cuaderno fitosanitario', en: 'Phytosanitary log' }, desc: { es: 'Registro SENASA, carencia y reingreso; exporta a PDF y Excel (CSV).', en: 'SENASA registry, pre-harvest and re-entry intervals; exports to PDF and Excel.' } },
      { icon: Users, name: { es: 'Trabajadores y asistencia', en: 'Workers & attendance' }, desc: { es: 'Fijos y jornaleros; asistencia diaria en un toque.', en: 'Permanent and day workers; one-tap daily attendance.' } },
      { icon: Wallet, name: { es: 'Planilla', en: 'Payroll' }, desc: { es: 'Cálculo automático según días trabajados y tarifa.', en: 'Automatic calculation from days worked and rate.' } },
      { icon: Package, name: { es: 'Inventario', en: 'Inventory' }, desc: { es: 'Insumos, movimientos y alertas de stock mínimo.', en: 'Inputs, stock movements and low-stock alerts.' } },
      { icon: TrendingUp, name: { es: 'Ventas, finanzas y rentabilidad', en: 'Sales, finance & profitability' }, desc: { es: 'Ventas por cliente, gastos y costo por hectárea por campaña.', en: 'Sales by customer, expenses and cost per hectare per season.' } },
    ],
    highlights: [
      { es: 'PWA offline-first: Service Worker para la interfaz y una cola de sincronización que guarda labores y asistencia sin señal y las envía al volver la conexión.', en: 'Offline-first PWA: Service Worker for the UI plus a sync queue that stores tasks and attendance without signal and sends them when the connection returns.' },
      { es: 'Reglas de negocio reales: al fumigar se descuenta el stock y, si un producto no alcanza, no se guarda nada; el sistema bloquea la cosecha hasta que pasa la carencia.', en: 'Real business rules: spraying deducts stock and nothing is saved if a product runs short; harvest is blocked until the pre-harvest interval has passed.' },
      { es: 'Seguridad: sesión en cookie HttpOnly con JWT, roles ADMIN/OPERADOR, bloqueo por intentos fallidos y auditoría de cambios.', en: 'Security: HttpOnly cookie session with JWT, ADMIN/OPERATOR roles, lockout after failed attempts and change auditing.' },
      { es: 'Esquema versionado con Flyway y pruebas de integración con Testcontainers (PostgreSQL real).', en: 'Schema versioned with Flyway and integration tests with Testcontainers (real PostgreSQL).' },
      { es: 'Infraestructura en un VPS con Docker Compose: Caddy (HTTPS automático) → nginx → Spring Boot → PostgreSQL, con respaldos diarios a Cloudflare R2.', en: 'Infrastructure on a VPS with Docker Compose: Caddy (automatic HTTPS) → nginx → Spring Boot → PostgreSQL, with daily backups to Cloudflare R2.' },
      { es: 'GitHub Actions para CI, despliegue y monitoreo de disponibilidad.', en: 'GitHub Actions for CI, deployment and uptime monitoring.' },
    ],
    tech: [
      { group: { es: 'Frontend', en: 'Frontend' }, items: ['Angular 21', 'TypeScript', 'Angular Material', 'RxJS', 'Service Worker (PWA)', 'Vitest'] },
      { group: { es: 'Backend', en: 'Backend' }, items: ['Java 21', 'Spring Boot 3.5', 'Spring Security', 'JWT', 'Spring Data JPA', 'Flyway'] },
      { group: { es: 'Base de datos', en: 'Database' }, items: ['PostgreSQL 16'] },
      { group: { es: 'DevOps', en: 'DevOps' }, items: ['Docker Compose', 'Caddy', 'nginx', 'GitHub Actions', 'Cloudflare R2', 'Testcontainers'] },
    ],
    cardTags: ['Angular', 'Spring Boot', 'Java', 'PostgreSQL', 'Docker', 'PWA'],
    gallery: [
      { src: fundoLanding,     caption: { es: 'Página de inicio pública', en: 'Public landing page' } },
      { src: fundoDashboard,   caption: { es: 'Dashboard con labores programadas y alertas de stock', en: 'Dashboard with scheduled tasks and stock alerts' } },
      { src: fundoPlanif,      caption: { es: 'Planificación de labores por lote', en: 'Field task planning by plot' } },
      { src: fundoLabores,     caption: { es: 'Registro de labores de campo', en: 'Field work log' } },
      { src: fundoInsumos,     caption: { es: 'Inventario de insumos con carencia y reingreso', en: 'Input inventory with pre-harvest and re-entry intervals' } },
      { src: fundoAsistencia,  caption: { es: 'Asistencia diaria de trabajadores', en: 'Daily worker attendance' } },
      { src: fundoMovil,       caption: { es: 'Versión móvil para el capataz en el campo', en: 'Mobile view for the foreman in the field' }, mobile: true },
    ],
  },
];

export const findProject = (slug: string) => featuredProjects.find((p) => p.slug === slug);
