import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import profileImage from "./assets/profile.jpg";
import LinkButton from "./components/LinkButton";
import { profile, skills } from "./data/portfolio";

const HeroScene = lazy(() => import("./components/HeroScene"));

function Hero() {
  const coreSkills = skills
    .find((group) => group.category === "Frontend")
    .items.slice(0, 4);

  return (
    <section id="hero" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-grid">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="eyebrow">{profile.headline}</p>
          <h1 id="hero-title">{profile.name}</h1>
          <p className="hero-role">{profile.role}</p>
          <p className="hero-summary">{profile.summary}</p>

          <dl className="hero-meta" aria-label="Profile details">
            <div>
              <dt>Location</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Responsive frontend applications</dd>
            </div>
          </dl>

          <div className="hero-actions" aria-label="Primary links">
            <LinkButton href="#projects" variant="primary">
              View Projects
            </LinkButton>
            <LinkButton href={profile.resume} target="_blank" rel="noreferrer">
              Resume
            </LinkButton>
            <LinkButton href={profile.linkedIn} target="_blank" rel="noreferrer">
              LinkedIn
            </LinkButton>
            <LinkButton href={`mailto:${profile.email}`}>Email</LinkButton>
            <LinkButton href={profile.github} disabledLabel="GitHub link not listed">
              GitHub
            </LinkButton>
          </div>
        </motion.div>

        <motion.aside
          className="hero-card"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
          aria-label="Frontend profile summary"
        >
          <Suspense fallback={<div className="hero-scene"><div className="scene-skeleton" /></div>}>
            <HeroScene />
          </Suspense>
          <img src={profileImage} alt="Ryan Roferos" width="420" height="420" loading="eager" />
          <div className="hero-card-body">
            <p>Frontend toolkit</p>
            <div className="mini-skill-row">
              {coreSkills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

export default Hero;
