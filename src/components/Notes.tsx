import React from 'react';
import { useLang } from '../context/LangContext';
import { notes, type Note } from '../data/notes';
import { linkTo } from '../router';

export const formatDate = (iso: string, lang: 'es' | 'en') =>
  new Date(iso + 'T12:00:00').toLocaleDateString(lang === 'es' ? 'es-PE' : 'en-US', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

export const NoteCard: React.FC<{ note: Note }> = ({ note }) => {
  const { lang, t } = useLang();
  const href = `/notas/${note.slug}`;
  return (
    <a href={href} onClick={linkTo(href)} className="note-card">
      <div className="note-card__meta">
        <span>{formatDate(note.date, lang)}</span>
        <span>·</span>
        <span>{note.readMin} {t.notes.min}</span>
      </div>
      <h3 className="note-card__title">{note.title[lang]}</h3>
      <p className="note-card__summary">{note.summary[lang]}</p>
      <div className="tag-row">
        {note.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
      </div>
      <div className="featured-card__link">
        {t.notes.read}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
      </div>
    </a>
  );
};

const Notes: React.FC = () => {
  const { t } = useLang();
  return (
    <section id="notas" className="section notes">
      <div className="wrap">
        <div className="sec-label">{t.notes.label}</div>
        <h2 className="sec-title">{t.notes.title} <strong>{t.notes.strong}</strong></h2>
        <p className="projects__sub">{t.notes.sub}</p>
        <div className="notes__grid">
          {notes.map((n) => <NoteCard key={n.slug} note={n} />)}
        </div>
      </div>
    </section>
  );
};

export default Notes;
