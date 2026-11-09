import React, { useState, useEffect, useRef } from 'react';

// Anillo decorativo que sigue al mouse con retraso suave.
// No reemplaza al cursor del sistema (accesibilidad) y no se monta en
// pantallas táctiles ni con "reducir movimiento" activado.
const enabled = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const CustomCursor: React.FC = () => {
  const ringRef  = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos  = useRef({ x: -100, y: -100 });
  const rafRef   = useRef<number>(0);
  const [hovered, setHovered] = useState(false);
  const [active] = useState(enabled);

  useEffect(() => {
    if (!active) return;

    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      const el = e.target as HTMLElement;
      setHovered(!!el.closest('a, button, [role="button"], input, textarea, select'));
    };

    // lerp 0.15 → sigue con retraso suave, sin saltos
    const animate = () => {
      const { x: mx, y: my } = mousePos.current;
      ringPos.current.x += (mx - ringPos.current.x) * 0.15;
      ringPos.current.y += (my - ringPos.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [active]);

  if (!active) return null;
  return <div ref={ringRef} className={`cursor__ring${hovered ? ' cursor__ring--hover' : ''}`} aria-hidden="true" />;
};

export default CustomCursor;
