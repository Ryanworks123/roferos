import React from 'react';
import { motion } from 'framer-motion';

function Education() {
  const education = [
    {
      degree: "Bachelor of Science in Information Technology",
      institution: "Misamis Oriental Institute of Science and Technology Inc.",
      period: "2025 - 2026"
    },
    {
      degree: "General Academic Strand",
      institution: "Tagoloan National Senior High School",
      period: "2021 - 2022"
    },
    {
      degree: "High School",
      institution: "St. Mary's Academy of Carmen",
      period: "2019 - 2020"
    }
  ];

  return (
    <section id="education" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Education</h2>
          <div className="education-list">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                className="education-card"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="education-header">
                  <h3>{edu.degree}</h3>
                  <span className="education-period">{edu.period}</span>
                </div>
                <p className="education-institution">{edu.institution}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Education;
