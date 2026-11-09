import { useEffect, useState } from 'react';
import type React from 'react';

// Enrutador mínimo con History API: el portafolio solo necesita "/" y
// "/proyectos/:slug". Cloudflare Pages sirve index.html para cualquier ruta
// (modo SPA), así que las URLs funcionan también al recargar o compartir.

const NAV_EVENT = 'app:navigate';

export function navigate(to: string): void {
  const url = new URL(to, window.location.origin);
  window.history.pushState(null, '', url.pathname + url.hash);
  window.dispatchEvent(new Event(NAV_EVENT));

  // Espera a que React pinte la nueva vista antes de hacer scroll
  window.setTimeout(() => {
    const target = url.hash ? document.querySelector(url.hash) : null;
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0 });
  }, 60);
}

export function usePath(): string {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const update = () => setPath(window.location.pathname);
    window.addEventListener('popstate', update);
    window.addEventListener(NAV_EVENT, update);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener(NAV_EVENT, update);
    };
  }, []);

  return path;
}

/** onClick para <a href>: navega sin recargar, respetando Ctrl/Cmd+clic (nueva pestaña). */
export function linkTo(to: string) {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };
}
