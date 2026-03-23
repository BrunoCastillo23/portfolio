import React, { useEffect, useState } from 'react';

const USERNAME = 'BrunoCastillo23';

interface Repo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

interface ContribDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

// Genera un grid de 52 semanas × 7 días de contribuciones simuladas
// basado en datos reales de la API pública de GitHub
const buildContribGrid = (events: { created_at: string }[]): ContribDay[][] => {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - 364);

  // Mapa de fecha → conteo
  const countMap: Record<string, number> = {};
  events.forEach((e) => {
    const d = e.created_at.slice(0, 10);
    countMap[d] = (countMap[d] || 0) + 1;
  });

  const weeks: ContribDay[][] = [];
  let week: ContribDay[] = [];
  const cur = new Date(start);

  // Empieza en domingo
  while (cur.getDay() !== 0) cur.setDate(cur.getDate() - 1);

  while (cur <= today) {
    const dateStr = cur.toISOString().slice(0, 10);
    const count = countMap[dateStr] || 0;
    const level =
      count === 0 ? 0 :
      count <= 2  ? 1 :
      count <= 5  ? 2 :
      count <= 9  ? 3 : 4;

    week.push({ date: dateStr, count, level: level as 0|1|2|3|4 });

    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
    cur.setDate(cur.getDate() + 1);
  }
  if (week.length) weeks.push(week);
  return weeks;
};

const MONTHS = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

const GitHubActivity: React.FC = () => {
  const [repos,  setRepos]  = useState<Repo[]>([]);
  const [weeks,  setWeeks]  = useState<ContribDay[][]>([]);
  const [total,  setTotal]  = useState(0);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Repos
        const repoRes = await fetch(
          `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=6`
        );
        const repoData: Repo[] = await repoRes.json();
        setRepos(Array.isArray(repoData) ? repoData.slice(0, 6) : []);

        // Eventos públicos (últimos 300 eventos = proxy de contribuciones)
        const evRes = await fetch(
          `https://api.github.com/users/${USERNAME}/events/public?per_page=100`
        );
        const evData = await evRes.json();
        const events = Array.isArray(evData) ? evData : [];
        setTotal(events.length);
        setWeeks(buildContribGrid(events));
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Etiquetas de mes para el grid
  const monthLabels: { label: string; col: number }[] = [];
  if (weeks.length) {
    let lastMonth = -1;
    weeks.forEach((week, wi) => {
      const m = new Date(week[0].date).getMonth();
      if (m !== lastMonth) {
        monthLabels.push({ label: MONTHS[m], col: wi });
        lastMonth = m;
      }
    });
  }

  const langColors: Record<string, string> = {
    TypeScript: '#3178c6', JavaScript: '#f1e05a', Python: '#3572A5',
    HTML: '#e34c26', CSS: '#563d7c', Vue: '#41b883', React: '#61dafb',
    'C#': '#178600', Java: '#b07219', PHP: '#4F5D95',
  };

  return (
    <section id="github" className="section github-activity">
      <div className="wrap">
        <div className="sec-label">Open Source</div>
        <h2 className="sec-title">
          Actividad en <strong>GitHub</strong>
        </h2>
        <p className="github-activity__sub">
          Mis repositorios públicos y contribuciones recientes.
        </p>

        {loading && (
          <div className="github-activity__loading">
            <div className="github-activity__spinner" />
            Cargando datos de GitHub...
          </div>
        )}

        {error && (
          <div className="github-activity__error">
            No se pudo cargar la actividad de GitHub. Verifica tu conexión.
          </div>
        )}

        {!loading && !error && (
          <>
            {/* ── Contribution Grid ── */}
            <div className="contrib-wrap">
              <div className="contrib-header">
                <span className="contrib-total">
                  <strong>{total}</strong> contribuciones en el último año
                </span>
                <a
                  href={`https://github.com/${USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contrib-link"
                >
                  Ver perfil completo →
                </a>
              </div>

              <div className="contrib-grid-wrap">
                {/* Mes labels */}
                <div className="contrib-months" style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}>
                  {monthLabels.map((m, i) => (
                    <span
                      key={i}
                      className="contrib-month-label"
                      style={{ gridColumnStart: m.col + 1 }}
                    >
                      {m.label}
                    </span>
                  ))}
                </div>

                <div className="contrib-days-wrap">
                  {/* Día labels */}
                  <div className="contrib-day-labels">
                    {['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'].map((d, i) => (
                      <span key={i} className={`contrib-day-label${i % 2 === 0 ? '' : ' visible'}`}>{d}</span>
                    ))}
                  </div>

                  {/* Grid de celdas */}
                  <div className="contrib-grid">
                    {weeks.map((week, wi) => (
                      <div key={wi} className="contrib-week">
                        {week.map((day, di) => (
                          <div
                            key={di}
                            className={`contrib-cell contrib-cell--${day.level}`}
                            title={`${day.date}: ${day.count} contribuciones`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Leyenda */}
                <div className="contrib-legend">
                  <span>Menos</span>
                  {[0,1,2,3,4].map((l) => (
                    <div key={l} className={`contrib-cell contrib-cell--${l}`} />
                  ))}
                  <span>Más</span>
                </div>
              </div>
            </div>

            {/* ── Repos ── */}
            {repos.length > 0 && (
              <div className="repos-grid">
                {repos.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="repo-card"
                  >
                    <div className="repo-card__top">
                      <div className="repo-card__icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                        </svg>
                      </div>
                      <span className="repo-card__name">{repo.name}</span>
                    </div>
                    {repo.description && (
                      <p className="repo-card__desc">{repo.description}</p>
                    )}
                    <div className="repo-card__meta">
                      {repo.language && (
                        <span className="repo-card__lang">
                          <span
                            className="repo-card__lang-dot"
                            style={{ background: langColors[repo.language] || '#8892a4' }}
                          />
                          {repo.language}
                        </span>
                      )}
                      {repo.stargazers_count > 0 && (
                        <span className="repo-card__stat">
                          ⭐ {repo.stargazers_count}
                        </span>
                      )}
                      {repo.forks_count > 0 && (
                        <span className="repo-card__stat">
                          🍴 {repo.forks_count}
                        </span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default GitHubActivity;
