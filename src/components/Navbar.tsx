import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { useLang } from '../context/LangContext';
import { linkTo } from '../router';

// isHome=false en las páginas de detalle: los enlaces #seccion pasan a /#seccion
const Navbar: React.FC<{ isHome?: boolean }> = ({ isHome = true }) => {
  const { lang, t, toggle: toggleLang } = useLang();
  const href = (h: string) => (isHome ? h : `/${h}`);
  const go = (h: string, after?: () => void) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    after?.();
    if (!isHome) linkTo(`/${h}`)(e);
  };
  const [active,   setActive]   = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: t.nav.about,        href: '#sobre'       },
    { label: t.nav.experience,   href: '#experiencia' },
    { label: t.nav.skills,       href: '#habilidades' },
    { label: t.nav.projects,     href: '#proyectos'   },
    { label: t.nav.testimonials, href: '#testimonios' },
  ];

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      sections.forEach((s) => {
        const el = s as HTMLElement;
        if (window.scrollY >= el.offsetTop - 80) setActive(el.id);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const LangBtn = () => (
    <button className="lang-toggle" onClick={toggleLang} title="Cambiar idioma">
      <span className={lang === 'es' ? 'lang-toggle__opt lang-toggle__opt--active' : 'lang-toggle__opt'}>ES</span>
      <span className="lang-toggle__sep">|</span>
      <span className={lang === 'en' ? 'lang-toggle__opt lang-toggle__opt--active' : 'lang-toggle__opt'}>EN</span>
    </button>
  );

  return (
    <>
      <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <div className="nav__inner">

          {/* ── Izquierda: Logo ── */}
          <a href={href('#hero')} className="nav__logo" onClick={go('#hero', closeMenu)}>
            bruno<span>.</span>dev
          </a>

          {/* ── Centro: Links de navegación (solo desktop) ── */}
          <ul className="nav__links nav__links--center">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={href(item.href)}
                  onClick={go(item.href)}
                  className={`nav__link${active === item.href.replace('#', '') ? ' nav__link--active' : ''}`}
                >
                  {item.label}
                  <span className="nav__link-underline" />
                </a>
              </li>
            ))}
          </ul>

          {/* ── Derecha: ES|EN + Tema + Contactar (solo desktop) ── */}
          <div className="nav__right">
            <LangBtn />
            <ThemeToggle />
            <a href={href('#contacto')} onClick={go('#contacto')} className="nav__cta">
              {t.nav.contact}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>

          {/* ── Móvil: solo hamburger ── */}
          <button
            className={`nav__hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span /><span /><span />
          </button>

        </div>
      </nav>

      {/* ── Menú móvil desplegable ── */}
      <div id="mobile-menu" className={`nav__mobile-menu${menuOpen ? ' open' : ''}`}>
        {navItems.map((item) => (
          <a
            key={item.href}
            href={href(item.href)}
            className={`nav__mobile-link${active === item.href.replace('#', '') ? ' nav__mobile-link--active' : ''}`}
            onClick={go(item.href, closeMenu)}
          >
            {item.label}
          </a>
        ))}
        {/* Fila de acciones en móvil */}
        <div className="nav__mobile-actions">
          <LangBtn />
          <ThemeToggle />
        </div>
        <a href={href('#contacto')} className="nav__mobile-cta" onClick={go('#contacto', closeMenu)}>
          {t.nav.contact}
        </a>
      </div>
    </>
  );
};

export default Navbar;
