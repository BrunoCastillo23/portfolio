import React, { useState, useEffect } from 'react';

const navItems = [
  { label: 'Sobre mí',    href: '#sobre'       },
  { label: 'Experiencia', href: '#experiencia'  },
  { label: 'Skills',      href: '#habilidades'  },
  { label: 'Proyectos',   href: '#proyectos'    },
  { label: 'GitHub',      href: '#github'       },
];

const Navbar: React.FC = () => {
  const [active,   setActive]   = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <>
      <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <div className="nav__inner">
          <a href="#hero" className="nav__logo" onClick={closeMenu}>
            bruno<span>.</span>dev
          </a>

          <ul className="nav__links">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`nav__link${active === item.href.replace('#', '') ? ' nav__link--active' : ''}`}
                >
                  {item.label}
                  <span className="nav__link-underline" />
                </a>
              </li>
            ))}
            <li>
              <a href="#contacto" className="nav__cta">
                Contactar
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
            </li>
          </ul>

          <button
            className={`nav__hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`nav__mobile-menu${menuOpen ? ' open' : ''}`}>
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`nav__mobile-link${active === item.href.replace('#', '') ? ' nav__mobile-link--active' : ''}`}
            onClick={closeMenu}
          >
            {item.label}
          </a>
        ))}
        <a href="#contacto" className="nav__mobile-cta" onClick={closeMenu}>
          Contactar
        </a>
      </div>
    </>
  );
};

export default Navbar;
