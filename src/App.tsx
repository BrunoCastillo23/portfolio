import React from 'react';
import Navbar       from './components/Navbar';
import Hero         from './components/Hero';
import About        from './components/About';
import Experience   from './components/Experience';
import Skills       from './components/Skills';
import Projects     from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact      from './components/Contact';
import './styles/index.css';

const App: React.FC = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Testimonials />
      <Contact />
    </main>
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__copy">© 2025 Bruno Castillo · Full Stack Developer · Lima, Perú</p>
        <div className="footer__stack">
          {['React', 'TypeScript', 'Vite', 'CSS'].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </footer>
  </>
);

export default App;
