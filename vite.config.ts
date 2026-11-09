import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { SITE_URL, projectSeo, type SeoRoute } from './src/data/seo'
import { notes } from './src/data/notes'

// ── SEO: un HTML estático por ruta ───────────────────────────────────────────
// Buscadores y redes sociales (LinkedIn, WhatsApp) no ejecutan JavaScript, así
// que al hacer el build se copia dist/index.html a dist/proyectos/<slug>.html y
// dist/notas/<slug>.html con su propio título, descripción e imagen.
// Cloudflare Pages sirve /proyectos/<slug> desde ese archivo. También genera
// el sitemap.xml con todas las rutas.
const esc = (v: string) => v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function withMeta(html: string, r: SeoRoute): string {
  const url = SITE_URL + r.path
  const image = SITE_URL + r.image
  const set = (attr: string, key: string, value: string) => {
    html = html.replace(
      new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`),
      `$1${esc(value)}$2`,
    )
  }
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(r.title)}</title>`)
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
  set('name', 'description', r.description)
  set('property', 'og:type', r.type ?? 'website')
  set('property', 'og:url', url)
  set('property', 'og:title', r.title)
  set('property', 'og:description', r.description)
  set('property', 'og:image', image)
  set('name', 'twitter:title', r.title)
  set('name', 'twitter:description', r.description)
  set('name', 'twitter:image', image)
  return html
}

function seoPages(): Plugin {
  return {
    name: 'seo-pages',
    apply: 'build',
    closeBundle() {
      const base = readFileSync('dist/index.html', 'utf8')
      const routes: SeoRoute[] = [
        ...projectSeo,
        ...notes.map((n) => ({
          path: `/notas/${n.slug}`,
          title: `${n.title.es} | Bruno Castillo`,
          description: n.summary.es,
          image: `/og/${n.project.slug}.jpg`,
          type: 'article' as const,
        })),
      ]
      for (const r of routes) {
        const file = `dist${r.path}.html`
        mkdirSync(dirname(file), { recursive: true })
        writeFileSync(file, withMeta(base, r))
      }
      const today = new Date().toISOString().slice(0, 10)
      const urls = ['/', ...routes.map((r) => r.path)]
        .map((p) => `  <url><loc>${SITE_URL}${p}</loc><lastmod>${today}</lastmod></url>`)
        .join('\n')
      writeFileSync(
        'dist/sitemap.xml',
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      )
    },
  }
}

export default defineConfig({
  plugins: [react(), seoPages()],

  // ── Headers de seguridad HTTP ─────────────────────────────────────────────
  // Solo aplican en `npm run dev`. En producción los envía el hosting:
  // ver public/_headers de Cloudflare Pages (mantener ambos sincronizados).
  server: {
    headers: {
      // Evita que el sitio se incruste en iframes externos (clickjacking)
      'X-Frame-Options': 'DENY',
      // Evita que el navegador adivine el tipo de contenido (MIME sniffing)
      'X-Content-Type-Options': 'nosniff',
      // Fuerza HTTPS en navegadores modernos
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      // Controla qué información de referrer se envía
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      // Permisos de APIs del navegador — solo las necesarias
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
      // Content Security Policy — controla qué recursos puede cargar el sitio
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com https://challenges.cloudflare.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
        "font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net",
        "img-src 'self' data: blob:",
        "connect-src 'self' https://api.emailjs.com https://cloudflareinsights.com",
        "frame-src https://challenges.cloudflare.com",
        "frame-ancestors 'none'",
      ].join('; '),
    },
  },

  // ── Build optimizado ──────────────────────────────────────────────────────
  build: {
    // Divide el bundle en chunks para mejor caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          emailjs: ['@emailjs/browser'],
        },
      },
    },
    // Genera sourcemaps solo en desarrollo (no exponer código en producción)
    sourcemap: false,
    // Minifica el código de producción
    minify: 'esbuild',
  },
})
