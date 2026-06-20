import React from 'react';
import { motion } from 'framer-motion';

function Languages() {
  const languages = [
    {
      name: "English",
      proficiency: "Proficient (both written and spoken)"
    },
    {
      name: "Filipino",
      proficiency: "Native fluency"
    }
  ];

  return (
    <section id="languages" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Languages</h2>
          <div className="languages-list">
            {languages.map((lang, index) => (
              <motion.div
                key={index}
                className="language-card"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <h3>{lang.name}</h3>
                <p className="language-proficiency">{lang.proficiency}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Languages;
