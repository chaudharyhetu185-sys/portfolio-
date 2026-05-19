import { useMemo, useState } from 'react';

const stats = [
  { value: '2', label: 'Stories Created' },
  { value: '1', label: 'IEEE Project Built' }
];

const experiences = [
  {
    tag: 'IEEE Creative',
    title: 'Student Committee Contributor',
    description: 'Support creative campaigns, write event narratives, and help shape the IEEE Student Chapter visual identity.',
    badge: '2026 — Present'
  },
  {
    tag: 'IEEE Technical',
    title: 'Project Collaborator',
    description: 'Participate in Python-based team projects and help deliver practical solutions for student chapter initiatives.',
    badge: '2026 — Present'
  }
];

const projects = [
  {
    type: 'Storytelling',
    title: 'Creative Committee Showcase',
    description: 'Produced copy and concept direction for IEEE student chapter materials and communication collateral.',
    tags: ['Writing', 'Design', 'Community']
  },
  {
    type: 'Python Project',
    title: 'Student Tech Initiative',
    description: 'Built a collaborative Python project while working with peers in the IEEE Technical committee.',
    tags: ['Python', 'Collaboration', 'Learning']
  }
];

const chips = ['Creative', 'Technical', 'Storytelling', 'Python'];

function App() {
  const [selectedChip, setSelectedChip] = useState(chips[0]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const filteredProjects = useMemo(
    () => projects.filter((project) => project.tags.some((tag) => tag === selectedChip || selectedChip === 'Creative')),
    [selectedChip]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to send message');
      setStatus(result.message);
      setContactForm({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <div className="page-shell">
      <nav className="nav">
        <a href="#top" className="nav-logo">
          Hina Patel
        </a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <main>
        <section className="hero" id="top">
          <div className="hero-text">
            <span className="hero-label">✦ IEEE Member · Silveroak University</span>
            <h1>
              Patel <em>Hina</em>
            </h1>
            <p className="hero-desc">
              A curious student passionate about creativity and technology — weaving stories with words and building solutions with code.
            </p>
            <div className="hero-btns">
              <a href="#projects" className="btn-primary">View My Work &rarr;</a>
              <a href="#contact" className="btn-outline">Get In Touch</a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="stat-row">
              {stats.map((item) => (
                <div className={`stat-card ${item.label === 'Stories Created' ? 'accent' : ''}`} key={item.label}>
                  <div className="stat-num">{item.value}</div>
                  <div className="stat-label">{item.label}</div>
                </div>
              ))}
            </div>
            <div className="wide-card">
              <div className="wide-icon">🏅</div>
              <div>
                <div className="wide-title">Python 101 Certificate</div>
                <div className="wide-sub">Silveroak University · IEEE Chapter</div>
              </div>
            </div>
            <div className="wide-card">
              <div className="wide-icon">⚡</div>
              <div>
                <div className="wide-title">IEEE Member since March 2026</div>
                <div className="wide-sub">Creative & Technical Committees</div>
              </div>
            </div>
          </div>
        </section>

        <section id="about">
          <p className="section-label">About Me</p>
          <h2>Who <span>I am</span></h2>
          <div className="about-grid">
            <div className="about-text">
              <p>
                I'm Hina Patel, a student at Silveroak University and a proud member of the IEEE Student Chapter. I joined IEEE in March 2026 and have since been actively contributing to both the Creative and Technical committees.
              </p>
              <p>
                My passion lives at the intersection of storytelling and technology. Whether I'm crafting narratives for the Creative committee or building Python projects in team sessions, I bring curiosity and dedication to everything I do.
              </p>
              <ul className="detail-list">
                <li><span className="detail-icon">🎓</span> Silveroak University</li>
                <li><span className="detail-icon">📧</span> <a href="mailto:chaudharyhetvi158@gmail.com">chaudharyhetvi158@gmail.com</a></li>
                <li><span className="detail-icon">🔗</span> <a href="https://www.linkedin.com/in/hina-patel-1760343b5" target="_blank" rel="noreferrer">LinkedIn Profile</a></li>
              </ul>
            </div>
            <div className="committees">
              <div className="profile-photo-wrap">
                <img
                  src="/pppp.jpeg"
                  alt="Hina Patel"
                  className="profile-photo"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="photo-placeholder fallback">
                  H
                  <span>Profile</span>
                </div>
              </div>
              <div className="committees-card">
                <h3>Committees</h3>
                <div className="chip-group">
                  {chips.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      className={`chip ${chip === selectedChip ? 'active' : ''}`}
                      onClick={() => setSelectedChip(chip)}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
                <p className="detail-sub">
                  Explore the contributions made across both creative storytelling and technical teamwork.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="experience">
          <p className="section-label">Experience</p>
          <h2>What <span>I've done</span></h2>
          <div className="exp-grid">
            {experiences.map((item) => (
              <div className="exp-card" key={item.title}>
                <span className="exp-tag">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="exp-badge">{item.badge}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects">
          <p className="section-label">Projects</p>
          <h2>Recent <span>Work</span></h2>
          <div className="project-list">
            {filteredProjects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-visual">✨</div>
                <div className="project-body">
                  <span className="project-type">{project.type}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span className="project-tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact">
          <div className="contact-inner">
            <span className="section-label">Contact</span>
            <h2>Let's <span>connect</span></h2>
            <p>Reach out if you'd like to collaborate, learn more, or share a project idea.</p>
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={contactForm.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={contactForm.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                rows="5"
                placeholder="Your message"
                value={contactForm.message}
                onChange={handleChange}
                required
              />
              <button type="submit" className="btn-primary">Send Message</button>
            </form>
            {status && <p className="status-message">{status}</p>}
            <div className="contact-links">
              <a href="mailto:chaudharyhetvi158@gmail.com" className="btn-outline">Email Me</a>
              <a href="https://www.linkedin.com/in/hina-patel-1760343b5" target="_blank" rel="noreferrer" className="btn-outline">LinkedIn</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        Built with React + Node · © 2026 Hina Patel
      </footer>
    </div>
  );
}

export default App;
