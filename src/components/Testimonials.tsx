import React, { useState } from 'react';
import { useLang } from '../context/LangContext';

import fotoBrenda  from '../assets/reseñas/Brenda-Nicole-Tasayco-Saravia.webp';
import fotomaria   from '../assets/reseñas/Maria-Trigoso-Losa.webp';
import fotoMartin  from '../assets/reseñas/Martín-Alonso-Andrés-Puertas-Cuadros.webp';
import fotoVictor  from '../assets/reseñas/Victor-Nontol-Nureña.webp';

interface Testimonial {
  name: string;
  role: { es: string; en: string };
  company: string;
  period: string;
  linkedin: string;
  text: { es: string; en: string };
  photo: string;
  pending: boolean;
}

const testimonials: Testimonial[] = [
  {
    name: 'Brenda Nicole Tasayco Saravia',
    role: { es: 'Líder de Talento Humano', en: 'Human Talent Leader' },
    company: 'Consigue Ventas',
    period: 'Mar 2025 – Mar 2026',
    linkedin: 'https://www.linkedin.com/in/brenda-nicole/',
    photo: fotoBrenda,
    pending: false,
    text: {
      es: 'Tuve el gusto de trabajar con él y puedo destacar su fuerte liderazgo, organización y enfoque en resultados. Su solidez técnica, comunicación efectiva y actitud proactiva facilitan el trabajo entre áreas y contribuyen directamente al éxito de los proyectos. Es confiable, comprometido y capaz de desempeñarse con excelencia en entornos exigentes. Lo recomiendo totalmente como un talento que aporta valor real y genera impacto positivo en cualquier organización.',
      en: 'I had the pleasure of working with him and can highlight his strong leadership, organization and results-driven focus. His technical strength, effective communication and proactive attitude facilitate cross-team collaboration and directly contribute to project success. He is reliable, committed and capable of performing with excellence in demanding environments. I highly recommend him as a talent who adds real value and generates positive impact in any organization.',
    },
  },
  {
    name: 'Maria Trigoso Loza',
    role: { es: 'Líder de Talento Humano', en: 'Human Talent Leader' },
    company: 'Consigue Ventas',
    period: 'Mar 2026 – Presente',
    linkedin: 'https://www.linkedin.com/in/maria-trigoso-loza-a22748265/',
    photo: fotomaria,
    pending: false,
    text: {
      es: 'Me complace recomendar ampliamente a Bruno Castillo. Durante el tiempo que compartimos en el equipo, demostró ser un profesional altamente comprometido, responsable y orientado a resultados. Se destacó especialmente por su capacidad para desarrollar soluciones creativas e innovadoras en diseño web, manteniendo siempre un enfoque centrado en la experiencia del cliente y en los objetivos del negocio. Su dominio técnico, sumado a su atención al detalle, le permitió entregar proyectos de alta calidad, cumpliendo con los plazos establecidos y superando expectativas. Bruno es una persona con excelentes competencias interpersonales, trabaja muy bien en equipo y aporta ideas valiosas que enriquecen el trabajo del área. Sin duda, es un gran trabajador y un valioso aporte para cualquier organización.',
      en: 'I am pleased to highly recommend Bruno Castillo. During the time we shared on the team, he proved to be a highly committed, responsible and results-oriented professional. He stood out especially for his ability to develop creative and innovative web design solutions, always maintaining a focus on client experience and business objectives. His technical expertise, combined with his attention to detail, allowed him to deliver high-quality projects, meeting deadlines and exceeding expectations. Bruno is a person with excellent interpersonal skills, works very well in a team and contributes valuable ideas that enrich the team\'s work. He is undoubtedly a great professional and a valuable asset to any organization.',
    },
  },
  {
    name: 'Martín Alonso Andrés Puertas Cuadros',
    role: { es: 'Líder de Tecnología', en: 'Technology Leader' },
    company: 'Consigue Ventas',
    period: 'Ene 2025 – Presente',
    linkedin: 'https://www.linkedin.com/in/martin-alonso-andres-puertas-cuadros/',
    photo: fotoMartin,
    pending: false,
    text: {
      es: 'Es grato para mí recomendar a Bruno Castillo. Tengo la oportunidad de trabajar con él y estar a su supervisión dentro de la Agencia Consigue Ventas. Durante su labor como Responsable del Núcleo de Desarrollo Web, ha demostrado tener amplios conocimientos en el área, siempre aportando gran valor al equipo desde las capacidades técnicas que demuestra. Como encargado y líder del área, ha inspirado confianza en su equipo a cargo y los sabe guiar en medio de los proyectos. Ayuda y guía a sus compañeros desde las capacitaciones hasta su desenvolvimiento en proyectos y marcas reales. Siempre tiene una gran disposición y compromiso para poder cumplir las actividades y objetivos que se le proponen. Más allá de ser un gran profesional, también es una excelente persona y un buen amigo dentro y fuera del trabajo. Ha demostrado tener una gran calidad como persona, y siempre trata con respeto, amabilidad y empatía a cada persona que conoce. Sin duda alguna recomiendo a Bruno para quienes deseen contar con él en su equipo de trabajo.',
      en: 'It is a pleasure for me to recommend Bruno Castillo. I have had the opportunity to work with him and be under his supervision at Consigue Ventas Agency. During his role as Web Development Team Lead, he has demonstrated broad knowledge in the field, always contributing great value to the team through his technical skills. As team lead, he has inspired confidence in his team and knows how to guide them through projects. He supports and guides his colleagues from onboarding to their development in real projects and brands. He always shows great dedication and commitment to fulfilling the tasks and goals set for him. Beyond being a great professional, he is also an excellent person and a good friend inside and outside of work. He has shown great character as a person, always treating everyone with respect, kindness and empathy. I wholeheartedly recommend Bruno to anyone who wants him on their team.',
    },
  },
  {
    name: 'Victor Jesus Nontol Nureña',
    role: { es: 'Responsable de Desarrollo Web', en: 'Web Development Lead' },
    company: 'Consigue Ventas',
    period: '30 Mar 2026 – Presente',
    linkedin: 'https://www.linkedin.com/in/victor-jesus-nontol-nure%C3%B1a-8b4891367/',
    photo: fotoVictor,
    pending: false,
    text: {
      es: 'Bruno es un profesional comprometido y proactivo, con quien tuve la oportunidad de trabajar en el mismo equipo. Durante ese tiempo, demostró una gran capacidad para resolver problemas, adaptarse a nuevos retos y mantener una actitud positiva incluso bajo presión. Destaca por su responsabilidad, su disposición para colaborar y su enfoque en cumplir objetivos de manera eficiente. Además, tiene buenas habilidades técnicas como desarrollador web y siempre busca mejorar y aprender nuevas herramientas.',
      en: 'Bruno is a committed and proactive professional with whom I had the opportunity to work on the same team. During that time, he demonstrated a great ability to solve problems, adapt to new challenges and maintain a positive attitude even under pressure. He stands out for his responsibility, his willingness to collaborate and his focus on achieving goals efficiently. Additionally, he has strong technical skills as a web developer and is always looking to improve and learn new tools.',
    },
  },
];

const QuoteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.692-1.327-.817-.56-.124-1.074-.13-1.54-.022-.16-.94.09-1.95.75-3.02.66-1.06 1.514-1.86 2.557-2.4L18.49 5c-.8.396-1.555.898-2.26 1.505-.708.607-1.34 1.305-1.894 2.094-.556.79-.97 1.68-1.24 2.69-.273 1-.345 2.04-.217 3.1.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const Testimonials: React.FC = () => {
  const { lang, t } = useLang();
  const [active, setActive] = useState(0);
  const pendingText  = lang === 'es' ? 'Reseña en progreso...' : 'Review in progress...';
  const linkedinText = lang === 'es' ? 'Ver perfil en LinkedIn' : 'View LinkedIn profile';

  return (
    <section id="testimonios" className="section testimonials">
      <div className="wrap">
        <div className="sec-label">{t.testimonials.label}</div>
        <h2 className="sec-title">
          {t.testimonials.title} <strong>{t.testimonials.strong}</strong>
        </h2>

        <div className="testimonials__grid">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className={`testi-card${i === active ? ' testi-card--active' : ''}`}
              onClick={() => setActive(i)}
            >
              <div className="testi-card__header-row">
                <img src={item.photo} alt={item.name} className="testi-card__photo" />
                <div className="testi-card__info">
                  <div className="testi-card__name">{item.name}</div>
                  <div className="testi-card__role">{item.role[lang]}</div>
                  <div className="testi-card__company">{item.company}</div>
                  <span className="testi-card__period-badge">{item.period}</span>
                </div>
              </div>

              <div className="testi-card__divider" />

              <div className="testi-card__quote"><QuoteIcon /></div>

              {item.pending ? (
                <div className="testi-card__pending">
                  <span className="testi-card__pending-dot" />
                  {pendingText}
                </div>
              ) : (
                <p className="testi-card__text">{item.text[lang]}</p>
              )}

              <a
                href={item.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="testi-card__linkedin"
                onClick={(e) => e.stopPropagation()}
              >
                <LinkedInIcon /> {linkedinText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
