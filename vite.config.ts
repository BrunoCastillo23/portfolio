import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // ── Headers de seguridad HTTP ─────────────────────────────────────────────
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
        "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdn.emailjs.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
        "font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net",
        "img-src 'self' data: blob:",
        "connect-src 'self' https://api.emailjs.com https://api.github.com",
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
