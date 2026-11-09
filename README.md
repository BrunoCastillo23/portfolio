# 🚀 Portfolio — Bruno Castillo

Portafolio personal como **Full Stack Developer**, construido con React + TypeScript + Vite.

## 🔗 Demo en vivo
> [brunocastillo.dev](https://brunocastillo.dev)

## 🛠️ Stack
- **React 18** + **TypeScript**
- **Vite** — bundler ultrarrápido
- **CSS puro** — sin frameworks de estilos
- **EmailJS** + **Cloudflare Turnstile** — formulario de contacto con anti-spam verificado en servidor
- **Cloudflare Pages** — hosting, cabeceras de seguridad y Pages Functions
- **Bilingüe** — español / inglés

## 📁 Estructura del proyecto

```
cv/                          # Fuente del CV (HTML → PDF)
functions/
└── api/contact.ts           # Pages Function: verifica Turnstile y envía el correo
public/
├── _headers                 # Cabeceras HTTP de seguridad (Cloudflare Pages)
├── robots.txt
├── og/                      # Imágenes para compartir de cada proyecto (1200×630)
├── og-image.jpg             # Imagen para compartir del portafolio
├── CV_Bruno_Castillo_Robles.pdf / _EN.pdf
└── favicon.svg
src/
├── assets/
│   ├── fotos/               # Fotos personales
│   ├── marcas/              # Logos de empresas y de la UNJFSC
│   ├── proyectos/           # Capturas de las plataformas destacadas
│   └── reseñas/             # Fotos de quienes dejaron testimonios
├── components/
│   ├── Navbar, Hero, About, Experience, Skills, Certifications,
│   ├── Projects, Notes, Testimonials, Contact
│   ├── ProjectDetail.tsx    # Página /proyectos/:slug
│   ├── NoteDetail.tsx       # Página /notas/:slug
│   ├── Turnstile.tsx        # Widget anti-spam
│   └── CustomCursor.tsx, ThemeToggle.tsx
├── context/                 # Idioma (LangContext) y textos ES / EN
├── data/
│   ├── featuredProjects.ts  # Contenido de los casos de estudio
│   ├── notes.ts             # Notas técnicas
│   └── seo.ts               # Títulos y descripciones por ruta
├── hooks/useFormSecurity.ts
├── router.ts                # Enrutador mínimo (History API)
└── styles/                  # index.css, extras.css, projects.css
```

## ⚡ Desarrollo local

```bash
git clone https://github.com/BrunoCastillo23/portfolio.git
cd portfolio
npm install

# .env.local (no se sube a git)
# VITE_EJ_SERVICE=...
# VITE_EJ_TEMPLATE=...
# VITE_EJ_PUBLIC=...
# Sin VITE_TURNSTILE_SITE_KEY el formulario usa EmailJS directo (modo desarrollo).

npm run dev
npm run build
```

Al hacer `npm run build`, un plugin de Vite genera `dist/proyectos/<slug>.html`,
`dist/notas/<slug>.html` (cada uno con su título, descripción e imagen) y `dist/sitemap.xml`.

## ☁️ Despliegue en Cloudflare Pages

1. **Workers & Pages → Create → Pages → Connect to Git** y elegir este repositorio.
2. Framework preset **React (Vite)** · Build command `npm run build` · Output directory `dist`.
3. **Variables de entorno** (Settings → Variables and Secrets):

   | Variable | Para qué |
   |---|---|
   | `VITE_EJ_SERVICE`, `VITE_EJ_TEMPLATE`, `VITE_EJ_PUBLIC` | EmailJS (respaldo si no hay Turnstile) |
   | `VITE_TURNSTILE_SITE_KEY` | Clave pública de Turnstile (activa el widget) |
   | `TURNSTILE_SECRET_KEY` *(secreto)* | Verificación del token en `functions/api/contact.ts` |
   | `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY` | Envío desde el servidor |
   | `EMAILJS_PRIVATE_KEY` *(secreto)* | EmailJS → Account → API keys |

   En EmailJS activa **Account → Security → "Allow EmailJS API for non-browser applications"**.
   La clave de Turnstile se crea en **Cloudflare → Turnstile → Add widget** con el dominio `brunocastillo.dev`.
4. **Custom domains** → agregar `brunocastillo.dev` (y `www`).
5. **Web Analytics**: en el proyecto de Pages → *Metrics* → activar Web Analytics (gratis, sin cookies).
   El CSP de `public/_headers` ya permite su script.

## 📄 CV

El CV se edita en `cv/cv-es.html` y `cv/cv-en.html`. Para exportarlo: abrir el archivo en Chrome →
**Ctrl + P** → *Guardar como PDF*, tamaño **Carta**, márgenes **Ninguno** → reemplazar los PDF de `public/`.

## ✅ CI

`.github/workflows/ci.yml` compila el proyecto en cada Pull Request y push a `main`, y ejecuta
Lighthouse CI (rendimiento, accesibilidad, buenas prácticas y SEO) sobre el sitio generado.

## 📬 Contacto

- **Email:** castillobruno0104@gmail.com
- **LinkedIn:** [bruno-castillo-robles](https://www.linkedin.com/in/bruno-castillo-robles)
- **GitHub:** [@BrunoCastillo23](https://github.com/BrunoCastillo23)
- **Teléfono:** +51 912 293 737
