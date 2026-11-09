import React from 'react';
import Navbar        from './components/Navbar';
import Hero          from './components/Hero';
import About         from './components/About';
import Experience    from './components/Experience';
import Skills        from './components/Skills';
import Projects      from './components/Projects';
import Testimonials  from './components/Testimonials';
import Contact       from './components/Contact';
import CustomCursor  from './components/CustomCursor';
import ProjectDetail from './components/ProjectDetail';
import Certifications from './components/Certifications';
import Notes         from './components/Notes';
import NoteDetail    from './components/NoteDetail';
import NotFound      from './components/NotFound';
import { useLang }   from './context/LangContext';
import { findProject } from './data/featuredProjects';
import { findNote }    from './data/notes';
import { usePath }   from './router';
import './styles/index.css';

const App: React.FC = () => {
  const { t } = useLang();
  const path = usePath();

  // /proyectos/:slug y /notas/:slug → páginas de detalle; / → portafolio; resto → 404
  const projectSlug = path.match(/^\/proyectos\/([\w-]+)\/?$/)?.[1];
  const noteSlug    = path.match(/^\/notas\/([\w-]+)\/?$/)?.[1];
  const project = projectSlug ? findProject(projectSlug) : undefined;
  const note    = noteSlug ? findNote(noteSlug) : undefined;
  const isHome  = path === '/' || path === '/index.html';
  const view    = project ? 'project' : note ? 'note' : isHome ? 'home' : 'notfound';

  return (
    <>
      {/* Cursor dinámico — solo desktop */}
      <CustomCursor />

      {/* key: remonta el Navbar al cambiar de vista para recalcular las secciones */}
      <Navbar key={view} isHome={view === 'home'} />
      {project ? (
        <ProjectDetail project={project} />
      ) : note ? (
        <NoteDetail note={note} />
      ) : view === 'notfound' ? (
        <NotFound />
      ) : (
        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Certifications />
          <Projects />
          <Notes />
          <Testimonials />
          <Contact />
        </main>
      )}
      <footer className="footer">
        <div className="footer__inner">
          <p className="footer__copy">{t.footer.copy}</p>
          <div className="footer__stack">
            {['React', 'TypeScript', 'Vite', 'CSS'].map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
