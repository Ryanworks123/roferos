import React from 'react';
import { motion } from 'framer-motion';

function Experience() {
  const experiences = [
    {
      title: "On-the-Job Trainee - Technical Department",
      company: "MAKOTEK Computer Sales Inc.",
      duration: "540 hours total (shared with Sales Dept.)",
      responsibilities: [
        "Diagnosed and troubleshoot PC hardware and software issues for customer units",
        "Working in computer assembly, system installation, and maintenance",
        "Installed and configured CCTV systems (cameras, DVR, cabling)",
        "Provided technical recommendations on hardware compatibility and upgrades",
        "Supported after-sales technical inquiries"
      ]
    },
    {
      title: "On-the-Job Trainee - Sales Department",
      company: "MAKOTEK Computer Sales Inc.",
      duration: "540 hours total (shared with Technical Dept.)",
      responsibilities: [
        "Assisted customers in selecting computer products (laptops, desktops, components)",
        "Answered product inquiries and explained features based on customer needs",
        "Built rapport with walk-in customers and provided follow-up support",
        "Stayed updated on available stock, specs, and pricing to make relevant recommendations"
      ]
    }
  ];

  return (
    <section id="experience" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Experience</h2>
          <div className="experience-list">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="experience-card"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="experience-header">
                  <h3>{exp.title}</h3>
                  <span className="experience-duration">{exp.duration}</span>
                </div>
                <p className="experience-company">{exp.company}</p>
                <ul className="experience-responsibilities">
                  {exp.responsibilities.map((resp, respIndex) => (
                    <li key={respIndex}>{resp}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Experience;
