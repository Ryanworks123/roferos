import { motion } from "framer-motion";
import Section from "./components/Section";
import { skills } from "./data/portfolio";

function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Technical Skills"
      title="Frontend-focused stack with supporting backend and database knowledge."
      intro="Grouped exactly from the resume-backed skill list provided for this portfolio."
    >
      <div className="skills-grid">
        {skills.map((group, index) => (
          <motion.article
            className="skill-card interactive-card"
            key={group.category}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.04 }}
            whileHover={{ y: -4 }}
          >
            <h3>{group.category}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

export default Skills;
