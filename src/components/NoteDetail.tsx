import React, { useEffect } from 'react';
import { useLang } from '../context/LangContext';
import { notes, type Note } from '../data/notes';
import { linkTo } from '../router';
import { formatDate, NoteCard } from './Notes';

const NoteDetail: React.FC<{ note: Note }> = ({ note }) => {
  const { lang, t } = useLang();

  useEffect(() => {
    const prev = document.title;
    document.title = `${note.title[lang]} — Bruno Castillo`;
    return () => { document.title = prev; };
  }, [note, lang]);

  const others = notes.filter((n) => n.slug !== note.slug);

  return (
    <main className="pd">
      <article className="pd-hero note">
        <div className="wrap note__wrap">
          <a href="/#notas" onClick={linkTo('/#notas')} className="pd-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: 'rotate(180deg)' }}>
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
            {t.notes.back}
          </a>

          <div className="note-card__meta">
            <span>{formatDate(note.date, lang)}</span><span>·</span><span>{note.readMin} {t.notes.min}</span>
          </div>
          <h1 className="pd-title note__title">{note.title[lang]}</h1>
          <p className="pd-tagline">{note.summary[lang]}</p>
          <div className="tag-row note__tags">
            {note.tags.map((tag) => <span key={tag} className="tag pd-tag">{tag}</span>)}
          </div>

          <div className="note__body">
            {note.body.map((b, i) => {
              if (b.type === 'p') return <p key={i}>{b.text[lang]}</p>;
              if (b.type === 'h') return <h2 key={i}>{b.text[lang]}</h2>;
              if (b.type === 'list') return <ul key={i}>{b.items.map((it, j) => <li key={j}>{it[lang]}</li>)}</ul>;
              return (
                <pre key={i} className="note__code" data-lang={b.lang}><code>{b.code}</code></pre>
              );
            })}
          </div>

          <a href={`/proyectos/${note.project.slug}`} onClick={linkTo(`/proyectos/${note.project.slug}`)} className="exp-brands-below exp-project-link note__project">
            <div className="exp-card__brands-label">{t.notes.project}</div>
            <div className="exp-project-link__name">{note.project.name}</div>
            <div className="exp-project-link__cta">{t.projects.caseStudy} →</div>
          </a>
        </div>
      </article>

      <section className="pd-section pd-section--alt">
        <div className="wrap">
          <h2 className="pd-h2">{t.notes.more}</h2>
          <div className="notes__grid notes__grid--two">
            {others.map((n) => <NoteCard key={n.slug} note={n} />)}
          </div>
        </div>
      </section>
    </main>
  );
};

export default NoteDetail;
