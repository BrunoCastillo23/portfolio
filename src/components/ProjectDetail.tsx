import React, { useCallback, useEffect, useState } from 'react';
import { useLang } from '../context/LangContext';
import type { FeaturedProject } from '../data/featuredProjects';
import { linkTo } from '../router';

const Arrow: React.FC<{ dir?: 'left' | 'right' }> = ({ dir = 'right' }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
       style={dir === 'left' ? { transform: 'rotate(180deg)' } : undefined}>
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const ExternalIcon: React.FC = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const GitHubIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z"/>
  </svg>
);

const ProjectDetail: React.FC<{ project: FeaturedProject }> = ({ project: p }) => {
  const { lang, t } = useLang();
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const prev = document.title;
    document.title = `${p.name} — Bruno Castillo`;
    return () => { document.title = prev; };
  }, [p.name]);

  const move = useCallback((delta: number) => {
    setLightbox((i) => (i === null ? i : (i + delta + p.gallery.length) % p.gallery.length));
  }, [p.gallery.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') move(1);
      if (e.key === 'ArrowLeft') move(-1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox, move]);

  const shot = lightbox !== null ? p.gallery[lightbox] : null;

  return (
    <main className="pd">
      {/* ── Encabezado ── */}
      <header className="pd-hero">
        <div className="wrap">
          <a href="/#proyectos" onClick={linkTo('/#proyectos')} className="pd-back">
            <Arrow dir="left" /> {t.detail.back}
          </a>

          <div className="sec-label">{p.context[lang]}</div>
          <h1 className="pd-title">{p.name}</h1>
          <p className="pd-tagline">{p.tagline[lang]}</p>

          <div className="pd-meta">
            <div className="pd-meta__item">
              <span className="pd-meta__label">{t.detail.role}</span>
              <span className="pd-meta__value">{p.role[lang]}</span>
            </div>
            <div className="pd-meta__item">
              <span className="pd-meta__label">{t.detail.period}</span>
              <span className="pd-meta__value">{p.period[lang]}</span>
            </div>
          </div>

          <div className="pd-actions">
            <a href={p.href} target="_blank" rel="noopener noreferrer" className="btn btn--dark">
              {t.detail.visit} <ExternalIcon />
            </a>
            {p.repo && (
              <a href={p.repo} target="_blank" rel="noopener noreferrer" className="btn pd-btn-outline">
                <GitHubIcon /> {t.detail.code}
              </a>
            )}
          </div>

          <button className="pd-cover" onClick={() => setLightbox(0)} aria-label={p.gallery[0].caption[lang]}>
            <div className="proj-card__browser-bar">
              <div className="dot dot--r" /><div className="dot dot--y" /><div className="dot dot--g" />
              <span className="proj-card__url">{p.url}</span>
            </div>
            <img src={p.cover} alt="" width={960} height={600} fetchPriority="high" />
          </button>
        </div>
      </header>

      {/* ── Cifras ── */}
      <section className="pd-section pd-section--tight">
        <div className="wrap">
          <div className="pd-stats">
            {p.stats.map((s) => (
              <div key={s.label.es} className="stat-card pd-stat">
                <div className="pd-stat__value">{s.value}</div>
                <div className="stat-card__label">{s.label[lang]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problema ── */}
      <section className="pd-section">
        <div className="wrap pd-narrow">
          <h2 className="pd-h2">{t.detail.problem}</h2>
          {p.overview.map((para, i) => <p key={i} className="pd-text">{para[lang]}</p>)}
        </div>
      </section>

      {/* ── Usuarios ── */}
      <section className="pd-section pd-section--alt">
        <div className="wrap">
          <h2 className="pd-h2">{t.detail.users}</h2>
          <div className="pd-grid pd-grid--users">
            {p.users.map((u) => (
              <div key={u.name.es} className="pd-card">
                <div className="pd-card__icon">{u.icon}</div>
                <div className="pd-card__title">{u.name[lang]}</div>
                <p className="pd-card__desc">{u.desc[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Módulos ── */}
      <section className="pd-section">
        <div className="wrap">
          <h2 className="pd-h2">{t.detail.modules}</h2>
          <div className="pd-grid pd-grid--modules">
            {p.modules.map((m) => (
              <div key={m.name.es} className="pd-card pd-card--compact">
                <div className="pd-card__icon">{m.icon}</div>
                <div className="pd-card__title">{m.name[lang]}</div>
                <p className="pd-card__desc">{m.desc[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Arquitectura ── */}
      <section className="pd-section pd-section--alt">
        <div className="wrap pd-narrow">
          <h2 className="pd-h2">{t.detail.highlights}</h2>
          <div className="exp-card__achievements">
            {p.highlights.map((h, i) => (
              <div key={i} className="exp-achievement pd-highlight">
                <div className="exp-achievement__dot" />
                <span>{h[lang]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tecnologías ── */}
      <section className="pd-section">
        <div className="wrap">
          <h2 className="pd-h2">{t.detail.tech}</h2>
          <div className="pd-tech">
            {p.tech.map((g) => (
              <div key={g.group.es} className="pd-tech__group">
                <div className="exp-card__brands-label">{g.group[lang]}</div>
                <div className="tag-row">
                  {g.items.map((it) => <span key={it} className="tag pd-tag">{it}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capturas ── */}
      <section className="pd-section pd-section--alt">
        <div className="wrap">
          <h2 className="pd-h2">{t.detail.gallery}</h2>
          <p className="pd-note">{t.detail.galleryNote}</p>
          <div className="pd-gallery">
            {p.gallery.map((g, i) => (
              <button
                key={g.src}
                className={`pd-shot${g.mobile ? ' pd-shot--mobile' : ''}`}
                onClick={() => setLightbox(i)}
              >
                <img src={g.src} alt="" loading="lazy" />
                <span className="pd-shot__caption">{g.caption[lang]}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pd-section">
        <div className="wrap">
          <div className="pd-cta">
            <div>
              <div className="pd-cta__title">{t.detail.ctaTitle}</div>
              <p className="pd-cta__text">{t.detail.ctaText}</p>
            </div>
            <a href="/#contacto" onClick={linkTo('/#contacto')} className="btn btn--dark">
              {t.detail.ctaBtn} <Arrow />
            </a>
          </div>
        </div>
      </section>

      {/* ── Visor de capturas ── */}
      {shot && (
        <div className="pd-lightbox" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}>
          <button className="pd-lightbox__close" aria-label={t.detail.close} onClick={() => setLightbox(null)}>✕</button>
          <button className="pd-lightbox__nav pd-lightbox__nav--prev" aria-label={t.detail.prev}
                  onClick={(e) => { e.stopPropagation(); move(-1); }}><Arrow dir="left" /></button>
          <figure className="pd-lightbox__figure" onClick={(e) => e.stopPropagation()}>
            <img src={shot.src} alt={shot.caption[lang]} className={shot.mobile ? 'is-mobile' : undefined} />
            <figcaption>{shot.caption[lang]} · {lightbox! + 1}/{p.gallery.length}</figcaption>
          </figure>
          <button className="pd-lightbox__nav pd-lightbox__nav--next" aria-label={t.detail.next}
                  onClick={(e) => { e.stopPropagation(); move(1); }}><Arrow /></button>
        </div>
      )}
    </main>
  );
};

export default ProjectDetail;
