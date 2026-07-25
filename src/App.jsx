import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Code2,
  Download,
  ExternalLink,
  GraduationCap,
  Layers3,
  Mail,
  Menu,
  Moon,
  Search,
  Send,
  Sparkles,
  Sun,
  Terminal,
  X,
} from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { about, certifications, education, experiences, profile, projects, skills } from "./data/portfolio";
import profilePhoto from "./assets/profile.jpg";

const HeroScene = lazy(() => import("./components/HeroScene"));

const navItems = [
  ["home", "Start"],
  ["story", "Story"],
  ["journey", "Journey"],
  ["projects", "Work"],
  ["stack", "Stack"],
  ["contact", "Contact"],
];

const roleTitles = ["Ship responsive React interfaces", "Turn requirements into usable UI", "Build accessible product experiences", "Solve frontend problems clearly"];
const internshipImage = `${import.meta.env.BASE_URL}images/photo_6176801367456943769_y.jpg`;
const teamImage = `${import.meta.env.BASE_URL}images/photo_6176801367456943788_y.jpg`;
const projectKinds = ["All", "Frontend", "System", "Design"];

const projectMeta = [
  {
    kind: "Frontend",
    label: "Portfolio / Web",
    decision: "Content-driven React sections keep every claim aligned with resume data while deferred visuals protect the critical render path.",
    tone: "cyan",
  },
  {
    kind: "System",
    label: "Inventory / Operations",
    decision: "Product records, stock movement, and reporting are organized around repeat tasks to reduce operational friction.",
    tone: "lime",
  },
  {
    kind: "System",
    label: "Point of sale / Transactions",
    decision: "Sales and inventory share one clear transaction flow, keeping totals, receipts, and stock state easy to verify.",
    tone: "amber",
  },
  {
    kind: "Design",
    label: "Figma / Product design",
    decision: "Reusable interface components and a deliberate user flow make frequent POS actions predictable and fast.",
    tone: "coral",
  },
];

function useScrollSpy() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -60%", threshold: [0.1, 0.25, 0.5] },
    );
    navItems.forEach(([id]) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

function useCounter(target) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(() => reduced ? target : 0);
  useEffect(() => {
    if (!visible) return undefined;
    if (reduced) return undefined;
    const start = performance.now();
    let frame;
    const tick = (now) => {
      const progress = Math.min((now - start) / 900, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced, target, visible]);
  return { ref, value };
}

function IconButton({ label, children, ...props }) {
  return (
    <button className="icon-button" type="button" aria-label={label} title={label} {...props}>
      {children}
    </button>
  );
}

function Action({ href, children, icon: Icon = ArrowRight, secondary = false, download = false, disabled = false }) {
  const className = `action${secondary ? " action-secondary" : ""}${disabled ? " is-disabled" : ""}`;
  if (disabled) return <span className={className} aria-disabled="true">{children}<Icon size={17} /></span>;
  return (
    <a className={className} href={href} download={download || undefined} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      {children}<Icon size={17} aria-hidden="true" />
    </a>
  );
}

function Header({ theme, toggleTheme }) {
  const active = useScrollSpy();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className="topbar">
      <a className="skip-link" href="#main">Skip to main content</a>
      <nav className="topbar-inner" aria-label="Primary navigation">
        <a className="wordmark" href="#home" aria-label="Ryan Roferos, home">
          <span>R/R</span><strong>Ryan Roferos</strong>
        </a>
        <div className="desktop-nav">
          {navItems.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? "active" : ""} aria-current={active === id ? "page" : undefined}>
              {label}
            </a>
          ))}
        </div>
        <div className="topbar-actions">
          <IconButton label={`Use ${theme === "dark" ? "light" : "dark"} theme`} onClick={toggleTheme}>
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </IconButton>
          <IconButton label="Open navigation" className="icon-button menu-trigger" onClick={() => setOpen(true)}>
            <Menu size={19} />
          </IconButton>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div className="drawer-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.aside className="drawer" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 32 }} onClick={(event) => event.stopPropagation()} aria-label="Mobile navigation">
              <div className="drawer-head"><span>Navigate</span><IconButton label="Close navigation" onClick={() => setOpen(false)}><X size={20} /></IconButton></div>
              <div className="drawer-links">
                {navItems.map(([id, label], index) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}><span>0{index + 1}</span>{label}</a>)}
              </div>
              <Action href={profile.resume} icon={Download} download>Resume PDF</Action>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Metric({ value, suffix = "", label }) {
  const { ref, value: count } = useCounter(value);
  return <div className="metric" ref={ref}><strong>{count}{suffix}</strong><span>{label}</span></div>;
}

function AdaptiveHeroScene() {
  const [mounted, setMounted] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const constrainedDevice = connection?.saveData || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    if (reducedMotion || constrainedDevice) return undefined;

    const mountScene = () => setMounted(true);
    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(mountScene, { timeout: 900 });
      return () => window.cancelIdleCallback(idleId);
    }

    const frame = window.requestAnimationFrame(mountScene);
    return () => window.cancelAnimationFrame(frame);
  }, [reducedMotion]);

  return mounted
    ? <Suspense fallback={<div className="scene-fallback" />}><HeroScene /></Suspense>
    : <div className="scene-fallback" />;
}

function Hero() {
  const [role, setRole] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return undefined;
    const timer = window.setInterval(() => setRole((current) => (current + 1) % roleTitles.length), 2400);
    return () => window.clearInterval(timer);
  }, [reduced]);

  return (
    <section id="home" className="hero">
      <div className="hero-scene-wrap"><AdaptiveHeroScene /></div>
      <div className="hero-grid grid-shell">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <div className="availability"><span /><b>Open to frontend developer roles</b><em>Philippines / GMT+8</em></div>
          <p className="hero-greeting">Hello, I’m Ryan Roferos.</p>
          <h1>Frontend<br /><span>Developer.</span></h1>
          <div className="role-row"><Terminal size={19} /><span>Ready to</span><motion.strong key={role} initial={{ opacity: 0.35, y: 5 }} animate={{ opacity: 1, y: 0 }}>{roleTitles[role]}</motion.strong></div>
          <p className="hero-summary">I turn requirements into responsive, accessible interfaces with React. My technical support background adds practical troubleshooting, customer empathy, and a focus on reliable delivery.</p>
          <div className="hero-actions">
            <Action href="#projects">Review case studies</Action>
            <Action href={profile.resume} icon={Download} secondary download>Download résumé</Action>
          </div>
          <div className="hero-links">
            <a href={`mailto:${profile.email}`}><Mail /> Contact me</a>
            <a href={profile.linkedIn} target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn</a>
            <span className="unavailable" title="No GitHub URL was included in the resume"><FiGithub /> GitHub not listed</span>
          </div>
        </motion.div>
        <div className="hero-console" aria-label="Professional snapshot">
          <div className="window-bar"><span /><span /><span /><b>career://ryan-roferos</b></div>
          <div className="identity-panel">
            <img src={profilePhoto} alt="Ryan Roferos" width="96" height="112" />
            <div><span>PROFILE / 01</span><h2>Frontend Developer</h2><p>BS Information Technology</p></div>
          </div>
          <div className="metrics-row">
            <Metric value={540} suffix="h" label="Internship" />
            <Metric value={4} label="Projects" />
            <Metric value={10} label="Credentials" />
          </div>
          <div className="signal-row"><span>React.js</span><span>TypeScript</span><span>Next.js</span><span>Tailwind</span></div>
        </div>
      </div>
      <a className="scroll-cue" href="#story"><span>Scroll to inspect</span><ChevronDown size={18} /></a>
    </section>
  );
}

function SectionIntro({ index, kicker, title, copy }) {
  return <header className="section-intro"><span>{index} / 06</span><div><p>{kicker}</p><h2>{title}</h2>{copy && <div className="intro-copy">{copy}</div>}</div></header>;
}

function Story() {
  return (
    <section id="story" className="section grid-shell">
      <SectionIntro index="02" kicker="The person behind the interface" title="Technical depth, grounded in service." copy="My frontend perspective started with diagnosing real devices, explaining technical choices, and helping customers move forward." />
      <div className="story-layout">
        <motion.figure className="story-photo" initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <img src={internshipImage} alt="Laptop maintenance work during Ryan's MAKOTEK internship" loading="lazy" />
          <figcaption><span>Field note 01</span><b>Hands-on diagnostics</b><p>MAKOTEK Computer Sales Inc.</p></figcaption>
        </motion.figure>
        <div className="story-notes">
          {about.map((item, index) => <motion.article key={item} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}><span>0{index + 1}</span><p>{item}</p></motion.article>)}
          <div className="strength-line"><span>Responsive UI</span><span>Debugging</span><span>Customer empathy</span><span>Performance</span></div>
        </div>
      </div>
    </section>
  );
}

function Journey() {
  const entries = [
    ...education.map((item) => ({ type: "Education", icon: GraduationCap, title: item.degree, place: item.institution, period: item.period, detail: item.location || "Academic foundation" })),
    ...experiences.map((item) => ({ type: "Experience", icon: BriefcaseBusiness, title: item.title, place: item.company, period: item.duration, detail: item.responsibilities.slice(0, 5).join(" · ") })),
  ];
  return (
    <section id="journey" className="section journey-section">
      <div className="grid-shell">
        <SectionIntro index="03" kicker="Education and experience" title="A timeline of learning by doing." />
        <div className="journey-grid">
          <figure className="journey-visual"><img src={teamImage} alt="Ryan with colleagues at MAKOTEK Computer Sales" loading="lazy" /><figcaption><Sparkles size={17} /> 540 hours of workplace learning</figcaption></figure>
          <div className="timeline">
            {entries.map((entry, index) => {
              const Icon = entry.icon;
              return <motion.article key={`${entry.title}-${index}`} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="timeline-icon"><Icon size={18} /></div>
                <div className="timeline-meta"><span>{entry.type}</span><b>{entry.period}</b></div>
                <h3>{entry.title}</h3><p>{entry.place}</p><small>{entry.detail}</small>
              </motion.article>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectPreview({ index }) {
  if (index === 0) return <div className="preview portfolio-preview"><div className="preview-nav"><i /><i /><i /><span /></div><div className="preview-hero"><small>FRONTEND DEVELOPER</small><strong>Interfaces with<br />clarity built in.</strong><button>Explore work</button></div></div>;
  if (index === 1) return <div className="preview inventory-preview"><aside><b>JAM</b><i /><i /><i /></aside><main><small>Inventory overview</small><div className="mini-stats"><i /><i /><i /></div><div className="mini-table"><span /><span /><span /><span /></div></main></div>;
  if (index === 2) return <div className="preview pos-preview"><main><small>Current order</small><div className="receipt-lines"><i /><i /><i /></div><strong>₱ 1,240.00</strong><button>Complete sale</button></main><aside><span /><span /><span /><span /><span /><span /></aside></div>;
  return <div className="preview design-preview"><div className="design-toolbar"><i /><i /><i /><i /></div><main><small>BURGERISM / POS</small><strong>Fast orders.<br />Clear choices.</strong><div className="food-grid"><span /><span /><span /></div></main></div>;
}

function ProjectModal({ project, index, close }) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.focus();
    const onKey = (event) => event.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);
  const meta = projectMeta[index];
  return (
    <motion.div className="modal-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
      <motion.article className="project-modal" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} onClick={(event) => event.stopPropagation()} tabIndex="-1" ref={ref} aria-modal="true" role="dialog" aria-labelledby="modal-title">
        <IconButton label="Close project details" onClick={close}><X size={20} /></IconButton>
        <span className="modal-kicker">{meta.label}</span><h2 id="modal-title">{project.title}</h2>
        <ProjectPreview index={index} title={project.title} />
        <div className="modal-columns">
          <div><h3>What it does</h3><p>{project.description}</p><h3>Engineering decision</h3><p>{meta.decision}</p></div>
          <div><h3>Core features</h3><ul>{project.features.map((feature) => <li key={feature}><Check size={15} />{feature}</li>)}</ul><h3>What I learned</h3><p>{project.learned}</p></div>
        </div>
      </motion.article>
    </motion.div>
  );
}

function Projects() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const visible = useMemo(() => projects.map((project, index) => ({ project, index })).filter(({ project, index }) => {
    const matchesKind = filter === "All" || projectMeta[index].kind === filter;
    const haystack = `${project.title} ${project.description} ${project.technologies.join(" ")}`.toLowerCase();
    return matchesKind && haystack.includes(query.trim().toLowerCase());
  }), [filter, query]);

  return (
    <section id="projects" className="section grid-shell projects-section">
      <SectionIntro index="04" kicker="Selected work" title="Projects built around real workflows." copy="Each case study focuses on the interface problem, the supporting stack, and the engineering judgment practiced through the project." />
      <div className="project-tools">
        <div className="filter-tabs" aria-label="Filter projects">{projectKinds.map((kind) => <button key={kind} className={filter === kind ? "active" : ""} onClick={() => setFilter(kind)}>{kind}</button>)}</div>
        <label className="search-box"><Search size={17} /><span className="sr-only">Search projects</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search work" /></label>
      </div>
      <div className="project-list">
        {visible.map(({ project, index }) => <motion.article className={`project-workspace tone-${projectMeta[index].tone}`} key={project.title} layout initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="project-copy"><span>0{index + 1} / {projectMeta[index].label}</span><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.technologies.map((tech) => <i key={tech}>{tech}</i>)}</div><button className="text-action" onClick={() => setSelected(index)}>Open case study <ArrowRight size={17} /></button></div>
          <div className="device-stage"><div className="laptop"><div className="laptop-screen"><ProjectPreview index={index} title={project.title} /></div><div className="laptop-base" /></div><div className="phone"><div className="phone-camera" /><ProjectPreview index={index} title={project.title} /></div></div>
        </motion.article>)}
        {!visible.length && <p className="empty-results">No projects match that search.</p>}
      </div>
      <AnimatePresence>{selected !== null && <ProjectModal project={projects[selected]} index={selected} close={() => setSelected(null)} />}</AnimatePresence>
    </section>
  );
}

function CertificateModal({ certificate, close }) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.focus();
    const onKey = (event) => event.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <motion.div className="modal-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
      <motion.article
        className="certificate-modal"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18 }}
        onClick={(event) => event.stopPropagation()}
        tabIndex="-1"
        ref={ref}
        aria-modal="true"
        role="dialog"
        aria-labelledby="certificate-title"
      >
        <div className="certificate-modal-head">
          <div><span>Anthropic · {certificate.issued}</span><h2 id="certificate-title">{certificate.name}</h2><p>Credential ID {certificate.credentialId}</p></div>
          <IconButton label="Close certificate" onClick={close}><X size={20} /></IconButton>
        </div>
        <img src={certificate.image} alt={`${certificate.name} certificate issued to Ryan John Roferos by Anthropic`} />
      </motion.article>
    </motion.div>
  );
}

function Stack() {
  const [category, setCategory] = useState(0);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const latestCertificates = certifications.filter((certificate) => certificate.featured);
  return (
    <section id="stack" className="section stack-section">
      <div className="grid-shell"><SectionIntro index="05" kicker="Technical toolkit" title="A stack that spans interface to data." />
        <div className="certificate-heading">
          <div><p>Latest credentials</p><h3>Anthropic learning path · July 2026</h3></div>
          <span>{latestCertificates.length} verified completions</span>
        </div>
        <div className="certificate-grid">
          {latestCertificates.map((certificate, index) => (
            <motion.article key={certificate.credentialId} className="certificate-card" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }}>
              <button className="certificate-image" type="button" onClick={() => setSelectedCertificate(certificate)} aria-label={`View ${certificate.name} certificate`}>
                <img src={certificate.image} alt="" loading="lazy" />
                <span><ExternalLink size={17} /> View certificate</span>
              </button>
              <div className="certificate-copy"><span>ANTHROPIC / {certificate.issued.toUpperCase()}</span><h4>{certificate.name}</h4><p>Credential ID {certificate.credentialId}</p><button className="text-action" type="button" onClick={() => setSelectedCertificate(certificate)}>Show credential <ArrowRight size={16} /></button></div>
            </motion.article>
          ))}
        </div>
        <div className="stack-console">
          <div className="stack-tabs" role="tablist" aria-label="Skill categories">{skills.map((group, index) => <button role="tab" aria-selected={category === index} key={group.category} className={category === index ? "active" : ""} onClick={() => setCategory(index)}><span>0{index + 1}</span>{group.category}</button>)}</div>
          <AnimatePresence mode="wait"><motion.div className="skill-space" key={category} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} role="tabpanel"><p>~/skills/{skills[category].category.toLowerCase().replaceAll(" ", "-")}</p><div>{skills[category].items.map((skill, index) => <motion.span key={skill} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.04 }} style={{ "--i": index }}><Code2 size={17} />{skill}</motion.span>)}</div></motion.div></AnimatePresence>
        </div>
        <div className="credentials"><div><p>Previous certificates & awards</p><h3>All {certifications.length} credentials retained</h3></div><div className="credential-marquee">{certifications.filter((item) => !item.featured).map((item) => <span key={item.name}>{item.name}<b>{item.issuer}{item.duration ? ` · ${item.duration}` : ""}</b></span>)}</div></div>
        <AnimatePresence>{selectedCertificate && <CertificateModal certificate={selectedCertificate} close={() => setSelectedCertificate(null)} />}</AnimatePresence>
      </div>
    </section>
  );
}

function Contact() {
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(() => new URLSearchParams(window.location.search).get("sent") === "1");

  useEffect(() => {
    if (!toast) return undefined;
    const cleanUrl = `${window.location.pathname}${window.location.hash || "#contact"}`;
    window.history.replaceState({}, "", cleanUrl);
    const timer = window.setTimeout(() => setToast(false), 6000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const submit = (event) => {
    const data = new FormData(event.currentTarget);
    const next = {};
    if (!data.get("name")?.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.get("email") || "")) next.email = "Enter a valid email address.";
    if ((data.get("message") || "").trim().length < 10) next.message = "Please add at least 10 characters.";
    setErrors(next);
    if (Object.keys(next).length) {
      event.preventDefault();
      return;
    }
    setSubmitting(true);
  };
  return (
    <section id="contact" className="section contact-section grid-shell">
      <SectionIntro index="06" kicker="Start a conversation" title="Let’s build something useful." copy="I’m open to frontend opportunities where thoughtful interfaces, continuous learning, and practical problem solving matter." />
      <div className="contact-layout">
        <div className="contact-panel"><span>STATUS / AVAILABLE</span><h3>Based in Misamis Oriental.<br />Ready to contribute.</h3><p>{profile.location}</p><div className="contact-actions"><Action href={`mailto:${profile.email}`} icon={Mail}>Email Ryan</Action><Action href={profile.linkedIn} icon={FiLinkedin} secondary>LinkedIn</Action></div><a className="plain-email" href={`mailto:${profile.email}`}>{profile.email}</a></div>
        <form className="contact-form" action={`https://formsubmit.co/${profile.email}`} method="POST" onSubmit={submit} noValidate>
          <input type="hidden" name="_subject" value="New portfolio inquiry for Ryan Roferos" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_next" value="https://ryanworks123.github.io/roferos/?sent=1#contact" />
          <input type="hidden" name="_url" value="https://ryanworks123.github.io/roferos/#contact" />
          <input
            type="hidden"
            name="_autoresponse"
            value="Thank you for contacting Ryan Roferos. Your message has been received at ryanroferos.work@gmail.com. Ryan will review your inquiry and reply as soon as possible. This is an automated confirmation."
          />
          <input type="text" name="_honey" tabIndex="-1" autoComplete="off" style={{ display: "none" }} aria-hidden="true" />
          <div className="form-head"><Layers3 size={20} /><span>New message</span></div>
          <label><span>Name</span><input name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} placeholder="Your name" />{errors.name && <em id="name-error">{errors.name}</em>}</label>
          <label><span>Email</span><input name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} placeholder="you@company.com" />{errors.email && <em id="email-error">{errors.email}</em>}</label>
          <label><span>Message</span><textarea name="message" rows="5" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} placeholder="Tell me about the role or project." />{errors.message && <em id="message-error">{errors.message}</em>}</label>
          <button className="action" type="submit" disabled={submitting}>{submitting ? "Sending…" : "Send message"} <Send size={17} /></button>
        </form>
      </div>
      <AnimatePresence>{toast && <motion.div className="toast" role="status" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><Check size={18} /><span><strong>Message sent to Ryan.</strong>A confirmation receipt was sent to your email.</span></motion.div>}</AnimatePresence>
    </section>
  );
}

function Loader() {
  return <motion.div className="loader" exit={{ opacity: 0 }}><div><span>R/R</span><i /></div><p>Loading career workspace</p></motion.div>;
}

export default function App() {
  const [ready, setReady] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("rr-theme") || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));
  const [showTop, setShowTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 30, mass: 0.2 });
  useEffect(() => {
    let secondFrame;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => setReady(true));
    });
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("rr-theme", theme);
  }, [theme]);

  return (
    <>
      <AnimatePresence>{!ready && <Loader />}</AnimatePresence>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <Header theme={theme} toggleTheme={() => setTheme((current) => current === "dark" ? "light" : "dark")} />
      <main id="main"><Hero /><Story /><Journey /><Projects /><Stack /><Contact /></main>
      <footer className="footer grid-shell"><div><span>R/R</span><p>Ryan Roferos · Frontend Developer</p></div><p>Built with React, Three.js, and attention to detail.</p></footer>
      <AnimatePresence>{showTop && <motion.a className="back-top" href="#home" aria-label="Back to top" title="Back to top" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}><ArrowUp size={19} /></motion.a>}</AnimatePresence>
    </>
  );
}
