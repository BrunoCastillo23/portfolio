// ── Notas técnicas (/notas/:slug) ─────────────────────────────────────────────
// Artículos cortos sobre decisiones reales tomadas en mis proyectos.

type L = { es: string; en: string };

export type Block =
  | { type: 'p'; text: L }
  | { type: 'h'; text: L }
  | { type: 'list'; items: L[] }
  | { type: 'code'; lang: string; code: string };

export interface Note {
  slug: string;
  title: L;
  summary: L;
  date: string;          // ISO
  readMin: number;
  project: { name: string; slug: string };
  tags: string[];
  body: Block[];
}

export const notes: Note[] = [
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'cola-offline-pwa-angular',
    title: {
      es: 'Registrar sin señal: una cola offline para una PWA en Angular',
      en: 'Logging without signal: an offline queue for an Angular PWA',
    },
    summary: {
      es: 'Cómo AgroERP guarda labores y asistencia en el celular cuando no hay internet y las sincroniza sin duplicar registros.',
      en: 'How AgroERP stores field work and attendance on the phone when there is no internet and syncs them without duplicates.',
    },
    date: '2026-10-20',
    readMin: 4,
    project: { name: 'Fundo Castillo — AgroERP', slug: 'fundo-castillo' },
    tags: ['Angular', 'PWA', 'IndexedDB', 'Spring Boot'],
    body: [
      { type: 'p', text: {
        es: 'En el campo la señal va y viene. Si el capataz registra un riego y la petición falla, no puede perder ese dato ni tener que escribirlo dos veces. El Service Worker de Angular resuelve la mitad del problema (la interfaz carga sin internet), pero los datos necesitan su propia estrategia.',
        en: 'In the field, signal comes and goes. If the foreman logs an irrigation and the request fails, that data cannot be lost or typed twice. Angular’s Service Worker solves half of the problem (the UI loads offline), but data needs its own strategy.',
      } },
      { type: 'h', text: { es: 'La idea', en: 'The idea' } },
      { type: 'p', text: {
        es: 'Cada POST que falla por red se guarda en una cola local. Cuando vuelve la conexión (evento online o botón "sincronizar") se reintenta en orden. La clave es que cada elemento tiene un id que viaja como cabecera Idempotency-Key: si un reintento ya había llegado al servidor, el backend no crea un duplicado.',
        en: 'Every POST that fails due to network is stored in a local queue. When the connection returns (online event or a "sync" button) it is retried in order. The key is that each item has an id sent as an Idempotency-Key header: if a retry had already reached the server, the backend does not create a duplicate.',
      } },
      { type: 'code', lang: 'ts', code:
`export function esErrorReintentable(err: unknown): boolean {
  if (!(err instanceof HttpErrorResponse)) return true;
  // 0 = sin conexión; 5xx = servidor caído; 408/429 = temporal
  return err.status === 0 || err.status >= 500 ||
         err.status === 408 || err.status === 429;
}

// Al sincronizar, cada item viaja con su id:
this.http.post(url, item.payload, {
  headers: { 'Idempotency-Key': item.id },
});` },
      { type: 'h', text: { es: 'Los casos que importan', en: 'The cases that matter' } },
      { type: 'list', items: [
        { es: 'Error 4xx (dato inválido): no se reintenta para siempre; pasa a "rechazados" para que el usuario lo corrija.', en: '4xx error (invalid data): it is not retried forever; it moves to "rejected" so the user can fix it.' },
        { es: 'Sesión vencida (401): no se descarta nada; la cola se pausa y se reanuda al volver a iniciar sesión.', en: 'Expired session (401): nothing is discarded; the queue pauses and resumes after signing in again.' },
        { es: 'Celular compartido: cada registro guarda quién lo hizo y solo se envía con la sesión de esa persona.', en: 'Shared phone: each record stores who created it and is only sent with that person’s session.' },
        { es: 'Una sola sincronización a la vez, para que el evento online y el botón no envíen lo mismo dos veces.', en: 'Only one sync at a time, so the online event and the button never send the same thing twice.' },
      ] },
      { type: 'p', text: {
        es: 'La primera versión usaba localStorage; al crecer el volumen migré la cola a IndexedDB, manteniendo una copia en memoria para que el resto de la app siga usando métodos síncronos.',
        en: 'The first version used localStorage; as volume grew I migrated the queue to IndexedDB, keeping an in-memory copy so the rest of the app can keep using synchronous methods.',
      } },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'invitaciones-un-solo-uso-laravel',
    title: {
      es: 'Invitaciones de un solo uso para empresas en Laravel',
      en: 'Single-use company invitations in Laravel',
    },
    summary: {
      es: 'El flujo que usamos en el Sistema de Prácticas para que una empresa active su cuenta de forma segura a partir de un correo.',
      en: 'The flow we use in the Internship System so a company can safely activate its account from an email.',
    },
    date: '2026-10-28',
    readMin: 4,
    project: { name: 'Sistema de Prácticas Pre Profesionales', slug: 'practicas-unjfsc' },
    tags: ['Laravel', 'PHP', 'Seguridad', 'React'],
    body: [
      { type: 'p', text: {
        es: 'Cuando un estudiante propone una empresa nueva, el docente titular la revisa. Si la aprueba, la plataforma crea la empresa y le envía un correo con un enlace para activar su cuenta. Ese enlace es, en la práctica, una contraseña temporal: hay que tratarlo como tal.',
        en: 'When a student proposes a new company, the lead professor reviews it. If approved, the platform creates the company and emails it a link to activate its account. That link is effectively a temporary password, so it must be treated as one.',
      } },
      { type: 'h', text: { es: 'Reglas del token', en: 'Token rules' } },
      { type: 'list', items: [
        { es: 'En la base de datos solo se guarda el hash SHA-256 del token, nunca el token en claro.', en: 'Only the SHA-256 hash of the token is stored in the database, never the plain token.' },
        { es: 'Tiene fecha de vencimiento configurable (en horas).', en: 'It has a configurable expiration (in hours).' },
        { es: 'Se marca como consumido al activar la cuenta y puede revocarse si se reenvía otra invitación.', en: 'It is marked as consumed on activation and can be revoked if a new invitation is sent.' },
        { es: 'Un token inválido, vencido o usado responde 410 con un mensaje claro para pedir un nuevo envío.', en: 'An invalid, expired or used token returns 410 with a clear message to request a new one.' },
      ] },
      { type: 'code', lang: 'php', code:
`// Al aprobar: se envía el token por correo y se guarda solo su hash
CompanyInvitation::create([
    'company_id' => $company->id,
    'token_hash' => hash('sha256', $token),
    'expires_at' => now()->addHours(config('company_validation.invitation_hours')),
]);

// Al abrir el enlace
$invitation = CompanyInvitation::where('token_hash', hash('sha256', $token))->firstOrFail();
abort_if(
    $invitation->consumed_at || $invitation->revoked_at || $invitation->expires_at->isPast(),
    410, 'La invitación expiró o ya fue utilizada. Solicita un nuevo envío.'
);` },
      { type: 'h', text: { es: 'El frontend no decide', en: 'The frontend does not decide' } },
      { type: 'p', text: {
        es: 'Las pantallas en React muestran u ocultan acciones según el estado, pero las reglas viven en el servidor: un estudiante no puede subir su plan ni su informe hasta que la empresa lo acepte, ni siquiera enviando la petición a mano. Todo el flujo está cubierto con pruebas HTTP en Pest, incluidos los tokens vencidos y reutilizados.',
        en: 'The React screens show or hide actions depending on the state, but the rules live on the server: a student cannot upload a plan or report until the company accepts them, even by sending the request by hand. The whole flow is covered by Pest HTTP tests, including expired and reused tokens.',
      } },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'desplegar-vps-docker-caddy-github-actions',
    title: {
      es: 'De git push a producción: Docker, Caddy y GitHub Actions en un VPS',
      en: 'From git push to production: Docker, Caddy and GitHub Actions on a VPS',
    },
    summary: {
      es: 'La infraestructura sencilla y barata con la que despliego mis plataformas, con HTTPS automático y respaldos diarios.',
      en: 'The simple, low-cost infrastructure I use to deploy my platforms, with automatic HTTPS and daily backups.',
    },
    date: '2026-11-04',
    readMin: 3,
    project: { name: 'Fundo Castillo — AgroERP', slug: 'fundo-castillo' },
    tags: ['Docker', 'Caddy', 'GitHub Actions', 'Cloudflare'],
    body: [
      { type: 'p', text: {
        es: 'Para un equipo pequeño no hace falta Kubernetes. AgroERP corre completo en un solo VPS con Docker Compose, y el Sistema de Prácticas sigue la misma idea. Lo importante es que desplegar sea aburrido: un push y listo.',
        en: 'A small team does not need Kubernetes. AgroERP runs entirely on a single VPS with Docker Compose, and the Internship System follows the same idea. What matters is that deploying is boring: one push and done.',
      } },
      { type: 'code', lang: 'text', code:
`Internet ─443─▶ Caddy (HTTPS automático)
                 └─▶ nginx (frontend + /api)
                       └─▶ Spring Boot ─▶ PostgreSQL
                                           └─▶ pg_dump diario ─▶ Cloudflare R2` },
      { type: 'h', text: { es: 'Las piezas', en: 'The pieces' } },
      { type: 'list', items: [
        { es: 'Caddy obtiene y renueva el certificado HTTPS solo. Sin HTTPS, el celular no activa el modo offline de la PWA.', en: 'Caddy obtains and renews the HTTPS certificate by itself. Without HTTPS, the phone will not enable the PWA offline mode.' },
        { es: 'El esquema de base de datos se versiona con migraciones (Flyway en Spring Boot, migrations en Laravel) que corren al desplegar.', en: 'The database schema is versioned with migrations (Flyway in Spring Boot, migrations in Laravel) that run on deploy.' },
        { es: 'Respaldo diario con pg_dump y copia externa en Cloudflare R2, cuya capa gratuita alcanza de sobra.', en: 'Daily pg_dump backup with an off-site copy in Cloudflare R2, whose free tier is more than enough.' },
        { es: 'En el Sistema de Prácticas el tráfico entra por Cloudflare y el servidor no expone puertos públicos.', en: 'In the Internship System, traffic comes through Cloudflare and the server exposes no public ports.' },
      ] },
      { type: 'h', text: { es: 'El pipeline', en: 'The pipeline' } },
      { type: 'p', text: {
        es: 'Cada merge a main dispara GitHub Actions: construye la imagen Docker (incluido el build del frontend), la publica en GHCR, se conecta por SSH al VPS, actualiza el contenedor y ejecuta las migraciones. Si el build falla, producción sigue con la versión anterior. Por eso todo entra por Pull Request con revisión, nunca con push directo a main.',
        en: 'Every merge to main triggers GitHub Actions: it builds the Docker image (including the frontend build), publishes it to GHCR, connects over SSH to the VPS, updates the container and runs migrations. If the build fails, production keeps the previous version. That is why everything goes through a reviewed Pull Request, never a direct push to main.',
      } },
    ],
  },
];

export const findNote = (slug: string) => notes.find((n) => n.slug === slug);
