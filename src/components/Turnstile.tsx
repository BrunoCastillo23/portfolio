import React, { useEffect, useRef } from 'react';

// Widget de Cloudflare Turnstile (anti-spam sin acertijos molestos).
// Solo se usa si existe VITE_TURNSTILE_SITE_KEY; el token se verifica en
// la Pages Function /api/contact antes de enviar el correo.

interface TurnstileApi {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id: string) => void;
}
declare global {
  interface Window { turnstile?: TurnstileApi }
}

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = SCRIPT_SRC;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => { scriptPromise = null; reject(new Error('Turnstile no cargó')); };
      document.head.appendChild(s);
    });
  }
  return scriptPromise;
}

interface Props {
  siteKey: string;
  lang: 'es' | 'en';
  theme: 'light' | 'dark';
  onToken: (token: string | null) => void;
  resetSignal: number;   // cambia este número para pedir un token nuevo
}

const Turnstile: React.FC<Props> = ({ siteKey, lang, theme, onToken, resetSignal }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const idRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  useEffect(() => {
    let cancelled = false;
    loadScript().then(() => {
      if (cancelled || !boxRef.current || !window.turnstile) return;
      idRef.current = window.turnstile.render(boxRef.current, {
        sitekey: siteKey,
        language: lang,
        theme,
        callback: (token: string) => onTokenRef.current(token),
        'expired-callback': () => onTokenRef.current(null),
        'error-callback': () => onTokenRef.current(null),
      });
    }).catch(() => onTokenRef.current(null));

    return () => {
      cancelled = true;
      if (idRef.current && window.turnstile) window.turnstile.remove(idRef.current);
      idRef.current = null;
    };
  }, [siteKey, lang, theme]);

  useEffect(() => {
    if (resetSignal > 0 && idRef.current && window.turnstile) {
      window.turnstile.reset(idRef.current);
      onTokenRef.current(null);
    }
  }, [resetSignal]);

  return <div ref={boxRef} className="contact-form__turnstile" />;
};

export default Turnstile;
