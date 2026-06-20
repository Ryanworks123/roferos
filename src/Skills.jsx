import React from 'react';
import { motion } from 'framer-motion';

function Skills() {
  const skills = [
    "Technical Sales & Product Consultation",
    "Customer Service & Relationship Management",
    "PC Troubleshooting & Hardware Repair",
    "Computer Assembly & System Installation",
    "Hardware & Software Support",
    "Hardware Compatibility Assessment",
    "CCTV Installation & Configuration",
    "After-Sales Technical Support",
    "Networking"
  ];

  return (
    <section id="skills" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Skills</h2>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.span
                key={index}
                className="skill-tag"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
