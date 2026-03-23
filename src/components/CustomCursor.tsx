import React, { useState, useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos  = useRef({ x: -100, y: -100 });
  const rafRef   = useRef<number>(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // Mueve el punto exactamente con el mouse
    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
      }
      // Hover sobre interactivos
      const el = e.target as HTMLElement;
      setHovered(!!el.closest('a, button, [role="button"], input, textarea, select'));
    };

    // Anillo sigue con lerp suave — sin saltar
    const animate = () => {
      const { x: mx, y: my } = mousePos.current;
      const rx = ringPos.current.x;
      const ry = ringPos.current.y;

      // lerp 0.10 → retraso suave
      ringPos.current.x = rx + (mx - rx) * 0.10;
      ringPos.current.y = ry + (my - ry) * 0.10;

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
  }, []);

  return (
    <>
      {/* Punto pequeño — sigue exacto */}
      <div
        ref={dotRef}
        className={`cursor__dot${hovered ? ' cursor__dot--hover' : ''}`}
      />
      {/* Anillo grande — sigue con retraso */}
      <div
        ref={ringRef}
        className={`cursor__ring${hovered ? ' cursor__ring--hover' : ''}`}
      />
    </>
  );
};

export default CustomCursor;
