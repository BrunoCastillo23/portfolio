// ── Seguridad del formulario de contacto ────────────────────────────────────
// Incluye: rate limiting, validación, sanitización y detección de spam

// ── Rate Limiting ────────────────────────────────────────────────────────────
const RATE_LIMIT_KEY = 'contact_submissions';
const MAX_SUBMISSIONS = 3;       // máximo 3 envíos
const WINDOW_MS = 60 * 60 * 1000; // por hora

interface RateLimitEntry {
  count: number;
  firstSubmit: number;
}

export function checkRateLimit(): { allowed: boolean; minutesLeft: number } {
  try {
    const raw = sessionStorage.getItem(RATE_LIMIT_KEY);
    const now = Date.now();

    if (!raw) {
      return { allowed: true, minutesLeft: 0 };
    }

    const entry: RateLimitEntry = JSON.parse(raw);
    const elapsed = now - entry.firstSubmit;

    // Ventana expirada → reset
    if (elapsed > WINDOW_MS) {
      sessionStorage.removeItem(RATE_LIMIT_KEY);
      return { allowed: true, minutesLeft: 0 };
    }

    if (entry.count >= MAX_SUBMISSIONS) {
      const minutesLeft = Math.ceil((WINDOW_MS - elapsed) / 60000);
      return { allowed: false, minutesLeft };
    }

    return { allowed: true, minutesLeft: 0 };
  } catch {
    return { allowed: true, minutesLeft: 0 };
  }
}

export function registerSubmission(): void {
  try {
    const raw = sessionStorage.getItem(RATE_LIMIT_KEY);
    const now = Date.now();

    if (!raw) {
      sessionStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({ count: 1, firstSubmit: now }));
      return;
    }

    const entry: RateLimitEntry = JSON.parse(raw);
    sessionStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({
      count: entry.count + 1,
      firstSubmit: entry.firstSubmit,
    }));
  } catch {
    // silencioso
  }
}

// ── Sanitización ─────────────────────────────────────────────────────────────
// Elimina HTML, scripts y caracteres peligrosos
export function sanitize(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')       // elimina onclick=, onload=, etc.
    .trim();
}

// ── Validación ───────────────────────────────────────────────────────────────
export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

// Palabras clave típicas de spam
const SPAM_KEYWORDS = [
  'viagra', 'casino', 'lottery', 'winner', 'click here',
  'free money', 'crypto', 'bitcoin investment', 'make money fast',
  'enlarge', 'congratulations you have won',
];

function containsSpam(text: string): boolean {
  const lower = text.toLowerCase();
  return SPAM_KEYWORDS.some((kw) => lower.includes(kw));
}

export function validateForm(form: {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  // Nombre
  if (!form.from_name.trim()) {
    errors.from_name = 'El nombre es requerido.';
  } else if (form.from_name.trim().length < 2) {
    errors.from_name = 'El nombre debe tener al menos 2 caracteres.';
  } else if (form.from_name.trim().length > 80) {
    errors.from_name = 'El nombre no puede superar los 80 caracteres.';
  }

  // Email
  if (!form.from_email.trim()) {
    errors.from_email = 'El email es requerido.';
  } else if (!EMAIL_REGEX.test(form.from_email.trim())) {
    errors.from_email = 'Ingresa un email válido.';
  }

  // Asunto (opcional, pero con límite)
  if (form.subject && form.subject.length > 120) {
    errors.subject = 'El asunto no puede superar los 120 caracteres.';
  }

  // Mensaje
  if (!form.message.trim()) {
    errors.message = 'El mensaje es requerido.';
  } else if (form.message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres.';
  } else if (form.message.trim().length > 2000) {
    errors.message = 'El mensaje no puede superar los 2000 caracteres.';
  } else if (containsSpam(form.message) || containsSpam(form.subject)) {
    errors.message = 'El mensaje fue detectado como spam.';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
