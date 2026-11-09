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

export const onRequestPost = async ({ request, env }: Ctx): Promise<Response> => {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json(400, { error: 'invalid_json' });
  }

  // Honeypot: si viene lleno es un bot; respondemos OK sin enviar nada
  if (data.website) return json(200, { ok: true });

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
  if (!send.ok) return json(502, { error: 'email_failed' });

  return json(200, { ok: true });
};
