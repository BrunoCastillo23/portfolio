// Cloudflare Pages Function: POST /api/contact
//
// 1. Verifica el token de Turnstile (anti-spam) con la clave secreta.
// 2. Valida los campos en el servidor.
// 3. Envía el correo con la API REST de EmailJS (clave privada, nunca expuesta).
//
// Variables (Cloudflare Pages → Settings → Variables and Secrets):
//   TURNSTILE_SECRET_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID,
//   EMAILJS_PUBLIC_KEY, EMAILJS_PRIVATE_KEY
// En EmailJS: Account → Security → activar "Allow EmailJS API for non-browser applications".

interface Env {
  TURNSTILE_SECRET_KEY: string;
  EMAILJS_SERVICE_ID: string;
  EMAILJS_TEMPLATE_ID: string;
  EMAILJS_PUBLIC_KEY: string;
  EMAILJS_PRIVATE_KEY: string;
}

interface Ctx {
  request: Request;
  env: Env;
}

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const clean = (v: unknown, max: number) =>
  String(v ?? '').replace(/[<>]/g, '').trim().slice(0, max);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function handle({ request, env }: Ctx): Promise<Response> {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json(400, { error: 'invalid_json' });
  }

  // Honeypot: si viene lleno es un bot; respondemos OK sin enviar nada
  if (data.website) return json(200, { ok: true });

  // Variables que faltan en Cloudflare Pages → error claro en vez de un fallo de EmailJS
  const missing = ['TURNSTILE_SECRET_KEY', 'EMAILJS_SERVICE_ID', 'EMAILJS_TEMPLATE_ID', 'EMAILJS_PUBLIC_KEY', 'EMAILJS_PRIVATE_KEY']
    .filter((k) => !env[k as keyof Env]);
  if (missing.length) {
    console.error('Faltan variables', missing);
    return json(500, { error: 'missing_env', missing });
  }

  const token = String(data.token ?? '');
  if (!token) return json(400, { error: 'missing_token' });

  const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: new URLSearchParams({
      secret: env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: request.headers.get('CF-Connecting-IP') ?? '',
    }),
  });
  const outcome = (await verify.json()) as { success: boolean };
  if (!outcome.success) return json(403, { error: 'captcha_failed' });

  const params = {
    from_name:  clean(data.from_name, 80),
    from_email: clean(data.from_email, 120),
    subject:    clean(data.subject, 120) || 'Sin asunto',
    message:    clean(data.message, 2000),
  };
  if (params.from_name.length < 2 || !EMAIL_RE.test(params.from_email) || params.message.length < 10) {
    return json(422, { error: 'invalid_fields' });
  }

  const send = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: env.EMAILJS_SERVICE_ID,
      template_id: env.EMAILJS_TEMPLATE_ID,
      user_id: env.EMAILJS_PUBLIC_KEY,
      accessToken: env.EMAILJS_PRIVATE_KEY,
      template_params: params,
    }),
  });
  if (!send.ok) {
    // El texto de EmailJS no contiene secretos y ayuda a diagnosticar
    // (ej. "API calls are disabled for non-browser applications").
    const detail = (await send.text()).slice(0, 300);
    console.error('EmailJS error', send.status, detail);
    // 424 y no 502: Cloudflare reemplaza las respuestas 502 por su propia página de error
    return json(424, { error: 'email_failed', status: send.status, detail });
  }

  return json(200, { ok: true });
}

// Cualquier excepción inesperada se devuelve como JSON (en vez de la página
// de error HTML de Cloudflare) para poder diagnosticarla desde el navegador.
export const onRequestPost = async (ctx: Ctx): Promise<Response> => {
  try {
    return await handle(ctx);
  } catch (err) {
    const detail = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
    console.error('contact exception', detail);
    return json(500, { error: 'exception', detail: detail.slice(0, 300) });
  }
};
