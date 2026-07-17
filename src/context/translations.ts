// ── Traducciones ES / EN ─────────────────────────────────────────────────────

export type Lang = 'es' | 'en';

export const translations = {
  es: {
    // Navbar
    nav: {
      about:      'Sobre mí',
      experience: 'Experiencia',
      skills:     'Skills',
      projects:   'Proyectos',
      contact:    'Contactar',
    },
    // Hero
    hero: {
      available:  'Disponible para proyectos',
      roles:      ['Full Stack Developer','React Developer','Node.js Developer','TypeScript Developer'],
      desc:       'Desarrollo soluciones web completas — desde interfaces de usuario hasta APIs robustas. Especializado en React, Node.js y TypeScript para construir productos que generan resultados reales.',
      seeProjects:'Ver proyectos',
      downloadCV: 'Descargar CV',
      cvFile:     '/CV_Bruno_Castillo_Robles.pdf',
    },
    // About
    about: {
      label:  'Sobre mí',
      title:  'Apasionado por el',
      strong: 'desarrollo de software',
      p1: 'Soy Bruno Castillo, desarrollador Full Stack de Huaral, Perú, con 22 años y actualmente en el 9° ciclo de Ingeniería de Sistemas en la UNJFSC. Mi pasión por el desarrollo de software nació al ver cómo el código puede transformar ideas en productos reales que impactan a las personas.',
      p2: 'En el frontend construyo interfaces modernas con React, Angular y TypeScript. En el backend tengo una base sólida con Java, Spring Boot, Node.js y PHP, y manejo Docker y DigitalOcean para desplegar y administrar infraestructura en producción. Actualmente lidero el área de desarrollo de software en una agencia digital, gestionando un equipo y coordinando con clientes.',
      p3: 'Fuera del trabajo participo activamente en la comunidad tech — asistí al DevFest Lima 2025, me mantengo en constante aprendizaje y disfruto colaborar con otros desarrolladores para seguir creciendo.',
      badges: [
        '🎓 Ing. Sistemas — 9° ciclo · UNJFSC',
        '📍 Huaral, Lima — Perú',
        '🎂 22 años',
        '💼 Disponible para proyectos',
        '🌐 Español nativo · Inglés intermedio',
        '🎪 DevFest Lima 2025 · Comunidad de devs',
      ],
      stats: [
        { num: '5', sup: '+', label: 'Proyectos en producción' },
        { num: '1', sup: '+', label: 'Años de experiencia'     },
        { num: '3', sup: '+', label: 'Industrias atendidas'    },
        { num: '∞', sup: '',  label: 'Ganas de aprender'       },
      ],
    },
    // Experience
    experience: {
      label:    'Trayectoria',
      title:    'Experiencia',
      strong:   'laboral',
      sub:      'Mi recorrido profesional construyendo y liderando proyectos web reales.',
      role1:    'Responsable de Desarrollo Web',
      role2:    'Colaborador Web',
      period1:  '17 Nov 2025 – Presente',
      period2:  '07 Oct 2025 – 16 Nov 2025',
      fulltime: 'Tiempo completo',
      brands:   'Marcas gestionadas',
      desc1: 'Lidero y organizo al personal del área de desarrollo web, asignando tareas y evaluando el desempeño del equipo.',
      desc2: 'Realicé correcciones y mejoras en páginas web asignadas usando credenciales temporales por tarea.',
    },
    // Skills
    skills: {
      label:  'Stack técnico',
      title:  'Mis',
      strong: 'habilidades',
      sub:    'Tecnologías que uso día a día para construir productos web completos, de principio a fin.',
    },
    // Projects
    projects: {
      label:  'Trabajo real',
      title:  'Proyectos &',
      strong: 'marcas',
      sub:    'Sitios desarrollados y mantenidos para empresas reales dentro de',
      see:    'Ver sitio',
    },
    // Testimonials
    testimonials: {
      label:  'Lo que dicen',
      title:  'Personas que han',
      strong: 'trabajado conmigo',
    },
    // Contact
    contact: {
      label:       '¿Trabajamos juntos?',
      title:       'Hablemos de tu',
      strong:      'proyecto',
      desc:        'Estoy disponible para proyectos freelance, colaboraciones y oportunidades laborales. No dudes en escribirme — respondo en menos de 24 horas.',
      name:        'Tu nombre *',
      email:       'Tu email *',
      subject:     'Asunto',
      message:     'Cuéntame sobre tu proyecto...',
      send:        'Enviar mensaje',
      sending:     'Enviando...',
      success:     '✓ Mensaje enviado con éxito',
      error:       '✕ Error al enviar. Intenta de nuevo',
      rateLimit:   '⚠️ Límite alcanzado',
      rateLimitMsg:'⚠️ Has enviado demasiados mensajes. Espera',
      rateLimitMin:'min antes de intentar de nuevo.',
    },
    // Footer
    footer: {
      copy: '© 2025 Bruno Castillo · Full Stack Developer · Lima, Perú',
    },
  },

  en: {
    nav: {
      about:      'About',
      experience: 'Experience',
      skills:     'Skills',
      projects:   'Projects',
      contact:    'Contact',
    },
    hero: {
      available:  'Available for projects',
      roles:      ['Full Stack Developer','React Developer','Node.js Developer','TypeScript Developer'],
      desc:       'I build complete web solutions — from user interfaces to robust APIs. Specialized in React, Node.js and TypeScript to create products that deliver real results.',
      seeProjects:'View projects',
      downloadCV: 'Download CV',
      cvFile:     '/CV_Bruno_Castillo_Robles_EN.pdf',
    },
    about: {
      label:  'About me',
      title:  'Passionate about',
      strong: 'software development',
      p1: "I'm Bruno Castillo, a Full Stack developer from Huaral, Peru, 22 years old, currently in my 9th semester of Systems Engineering at UNJFSC. My passion for software development started when I realized code can transform ideas into real products that impact people.",
      p2: 'On the frontend I build modern interfaces with React, Angular and TypeScript. On the backend I have a solid foundation with Java, Spring Boot, Node.js and PHP, and I work with Docker and DigitalOcean to deploy and manage production infrastructure. I currently lead the software development area at a digital agency, managing a team and coordinating with clients.',
      p3: 'Outside work I actively participate in the tech community — I attended DevFest Lima 2025, keep learning constantly and enjoy collaborating with other developers to keep growing.',
      badges: [
        '🎓 Systems Eng. — 9th semester · UNJFSC',
        '📍 Huaral, Lima — Peru',
        '🎂 22 years old',
        '💼 Available for projects',
        '🌐 Native Spanish · Intermediate English',
        '🎪 DevFest Lima 2025 · Dev community',
      ],
      stats: [
        { num: '5', sup: '+', label: 'Projects in production' },
        { num: '1', sup: '+', label: 'Years of experience'    },
        { num: '3', sup: '+', label: 'Industries served'      },
        { num: '∞', sup: '',  label: 'Eagerness to learn'     },
      ],
    },
    experience: {
      label:    'Career',
      title:    'Work',
      strong:   'experience',
      sub:      'My professional journey building and leading real web projects.',
      role1:    'Web Development Lead',
      role2:    'Web Collaborator',
      period1:  'Nov 17, 2025 – Present',
      period2:  'Oct 07, 2025 – Nov 16, 2025',
      fulltime: 'Full time',
      brands:   'Managed brands',
      desc1: 'I lead and organize the web development team, assigning tasks and evaluating the performance of each collaborator.',
      desc2: 'I performed corrections and improvements on assigned web pages using temporary credentials per task.',
    },
    skills: {
      label:  'Tech stack',
      title:  'My',
      strong: 'skills',
      sub:    'Technologies I use daily to build complete web products from front to back.',
    },
    projects: {
      label:  'Real work',
      title:  'Projects &',
      strong: 'brands',
      sub:    'Sites developed and maintained for real companies within',
      see:    'Visit site',
    },
    testimonials: {
      label:  'What they say',
      title:  'People who have',
      strong: 'worked with me',
    },
    contact: {
      label:       "Let's work together",
      title:       "Let's talk about your",
      strong:      'project',
      desc:        "I'm available for freelance projects, collaborations and job opportunities. Feel free to write — I respond within 24 hours.",
      name:        'Your name *',
      email:       'Your email *',
      subject:     'Subject',
      message:     'Tell me about your project...',
      send:        'Send message',
      sending:     'Sending...',
      success:     '✓ Message sent successfully',
      error:       '✕ Failed to send. Please try again',
      rateLimit:   '⚠️ Limit reached',
      rateLimitMsg:'⚠️ Too many messages sent. Wait',
      rateLimitMin:'min before trying again.',
    },
    footer: {
      copy: '© 2025 Bruno Castillo · Full Stack Developer · Lima, Peru',
    },
  },
} as const;
