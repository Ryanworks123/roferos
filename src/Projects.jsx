import { motion } from "framer-motion";
import Section from "./components/Section";
import LinkButton from "./components/LinkButton";
import { projects } from "./data/portfolio";

function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Resume-backed projects presented with clear scope and technologies."
      intro="No additional projects or undocumented features were added."
    >
      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.article
            className="project-card interactive-card"
            whileHover={{ y: -6 }}
            key={project.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
          >
            <div className="project-visual" aria-label={`${project.title} hero image`}>
              <img src={project.image} alt="" loading="lazy" />
              <div>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>Project</p>
              </div>
            </div>
            <div className="project-body">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tech-list" aria-label={`${project.title} technologies`}>
                {project.technologies.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <div className="project-detail-grid">
                <div>
                  <h4>Features</h4>
                  <ul>
                    {project.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>Challenges</h4>
                  <p>{project.challenges}</p>
                </div>
                <div>
                  <h4>What I Learned</h4>
                  <p>{project.learned}</p>
                </div>
              </div>
              <div className="project-actions">
                <LinkButton href={project.liveDemo} disabledLabel="Live demo not listed">
                  Live Demo
                </LinkButton>
                <LinkButton href={project.github} disabledLabel="GitHub link not listed">
                  GitHub
                </LinkButton>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

export default Projects;
