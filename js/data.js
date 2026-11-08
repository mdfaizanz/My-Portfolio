/* =========================================================
   data.js — ALL of your content lives here.
   Edit the text, save, refresh. No other file needs touching.
   ========================================================= */
App.data = {

  /* ---------- Who you are ---------- */
  profile: {
    name: 'MD FAIZAN',
    initials: 'FZ',                       // shown in the nav logo
    availability: 'Available for work',
    roles: [                              // typed after "I build …"
      'MERN stack applications',
      'clean, fast interfaces',
      'Python tools & automation',
      'fun browser games'
    ],
    tagline: 'Full-stack developer who turns ideas into simple, fast and good-looking web apps.',
    email: 'hello@yourdomain.com',
    location: 'Your City, Country'
  },

  /* ---------- About ---------- */
  about: {
    paragraphs: [
      'I’m a full-stack developer who enjoys building things end to end — from the database to the last pixel on screen.',
      'I work mostly with the MERN stack and Python, and I keep my code simple, readable and easy to change. When I’m not building products, I’m making small games and experiments to learn something new.'
    ],

    // Numbers count up when they scroll into view
    stats: [
      { value: 2,  suffix: '+', label: 'Years of coding' },
      { value: 5, suffix: '+', label: 'Projects built' },
      { value: 4,  suffix: '',  label: 'Games shipped' },
      { value: 100, suffix: '%', label: 'Curiosity' }
    ],

    // Languages you speak — level is 0–100 (fills the ring)
    languages: [
      { name: 'English', level: 90, note: 'Fluent' },
      { name: 'Hindi',   level: 95, note: 'Native' }

    ],

    // Technical skills — level is 0–100
    skills: [
      {
        group: 'MERN Stack', tag: 'Web',
        items: [
          { name: 'MongoDB',    level: 80 },
          { name: 'Express.js', level: 82 },
          { name: 'React',      level: 85 },
          { name: 'Node.js',    level: 84 }
        ]
      },
      {
        group: 'Python', tag: 'Language',
        items: [
          { name: 'Python',               level: 80 },
          { name: 'Flask / FastAPI',      level: 68 },
          { name: 'Scripting & Automation', level: 82 }
        ]
      },
      {
        group: 'Git & GitHub', tag: 'Workflow',
        items: [
          { name: 'Git',                level: 86 },
          { name: 'GitHub',             level: 86 },
          { name: 'Branching & Pull Requests', level: 78 }
        ]
      }
    ],

    tools: ['VS Code', 'Figma', 'Docker', 'Vercel', 'npm', 'JavaScript', 'HTML & CSS']
  },

  /* ---------- Projects ----------
     tabs:  the top tabs (id is used by `categories` below)
     items: one object per project. A project can appear in several tabs.
       status: 'building' shows an "In progress" badge
       image:  optional path like 'assets/shot.png' (otherwise a letter tile is shown)
       links:  live / code — leave out any you don't have                      */
  projects: {
    tabs: [
      { id: 'recent',   label: 'Recent' },
      { id: 'games',    label: 'Games' },
      { id: 'websites', label: 'Websites' },
      { id: 'working',  label: 'Working on' }
    ],
    items: [
      {
        title: 'TaskFlow',
        description: 'Kanban-style task manager with authentication, drag-and-drop boards and live updates.',
        stack: ['MongoDB', 'Express', 'React', 'Node'],
        categories: ['recent', 'websites'],
        links: { live: 'https://example.com', code: 'https://github.com' }
      },
      {
        title: 'DevBlog',
        description: 'Markdown-powered blogging platform with tags, search and an admin dashboard.',
        stack: ['React', 'Node', 'MongoDB'],
        categories: ['recent', 'websites'],
        links: { live: 'https://example.com', code: 'https://github.com' }
      },
      {
        title: 'Pixel Runner',
        description: 'Endless runner built with the HTML canvas — no libraries, just vanilla JavaScript.',
        stack: ['JavaScript', 'Canvas'],
        categories: ['recent', 'games'],
        links: { live: 'https://example.com', code: 'https://github.com' }
      },
      {
        title: 'Memory Match',
        description: 'Classic card-matching game with levels, timers and a local high-score board.',
        stack: ['JavaScript', 'CSS'],
        categories: ['games'],
        links: { live: 'https://example.com', code: 'https://github.com' }
      },
      {
        title: 'Snake Reloaded',
        description: 'A modern take on Snake with smooth movement, power-ups and touch controls.',
        stack: ['JavaScript', 'Canvas'],
        categories: ['games'],
        links: { live: 'https://example.com', code: 'https://github.com' }
      },
      {
        title: 'Cafe Landing Page',
        description: 'Responsive, animated landing page for a local coffee shop with online menu.',
        stack: ['HTML', 'CSS', 'JavaScript'],
        categories: ['websites'],
        links: { live: 'https://example.com', code: 'https://github.com' }
      },
      {
        title: 'Study Buddy',
        description: 'Python web app that turns notes into quizzes and flashcards.',
        stack: ['Python', 'Flask', 'SQLite'],
        categories: ['working'],
        status: 'building',
        links: { code: 'https://github.com' }
      },
      {
        title: 'Realtime Chat',
        description: 'Rooms, typing indicators and presence using WebSockets.',
        stack: ['Node', 'Socket.io', 'React'],
        categories: ['working'],
        status: 'building',
        links: { code: 'https://github.com' }
      }
    ]
  },

  /* ---------- Contact form ----------
     endpoint: paste a form URL (e.g. https://formspree.io/f/yourid) to receive
     messages directly. Leave '' to open the visitor's email app instead.        */
  contact: {
    lead: 'Have an idea, a project or just want to say hi? Send a message — I usually reply within a day.',
    endpoint: ''
  },

  /* ---------- Footer links ---------- */
  socials: [
    { label: 'GitHub',   url: 'https://github.com/' },
    { label: 'LinkedIn', url: 'https://linkedin.com/' },
    { label: 'X',        url: 'https://x.com/' },
    { label: 'Instagram', url: 'https://instagram.com/' }
  ],

  /* ---------- Puzzle game ---------- */
  puzzle: {
    size: 5,               // 5 → a 5×5 grid (25 tiles)
    autoNextSeconds: 6     // after solving, next puzzle starts by itself (0 = wait for the button)
  }
};
