import { motion } from "framer-motion";
import Section from "./components/Section";
import { experiences } from "./data/portfolio";

function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Internship experience across technical support and retail sales."
      intro="Only MAKOTEK Computer Sales Inc. internship experience is included."
    >
      <div className="timeline">
        {experiences.map((experience, index) => (
          <motion.article
            className="timeline-item"
            key={experience.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
          >
            <div className="timeline-marker" aria-hidden="true" />
            <div className="timeline-card interactive-card">
              <div className="card-header">
                <div>
                  <h3>{experience.title}</h3>
                  <p>{experience.company}</p>
                </div>
                <span>{experience.duration}</span>
              </div>
              <ul className="check-list">
                {experience.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

export default Experience;
