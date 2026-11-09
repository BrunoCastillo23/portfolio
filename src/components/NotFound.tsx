import React, { useEffect } from 'react';
import { useLang } from '../context/LangContext';
import { linkTo } from '../router';

const NotFound: React.FC = () => {
  const { t } = useLang();

  useEffect(() => {
    const prev = document.title;
    document.title = `404 — ${t.notFound.title} | Bruno Castillo`;
    return () => { document.title = prev; };
  }, [t]);

  return (
    <main className="pd">
      <section className="pd-hero notfound">
        <div className="wrap">
          <div className="notfound__code">404</div>
          <h1 className="pd-title">{t.notFound.title}</h1>
          <p className="pd-tagline">{t.notFound.text}</p>
          <div className="pd-actions">
            <a href="/" onClick={linkTo('/')} className="btn btn--dark">{t.notFound.home}</a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
