import React from 'react';
import { motion } from 'framer-motion';

function Certificates() {
  const certificates = [
    {
      name: "Certificate of Completion – On-the-Job Training at MAKOTEK Computer Sales Inc.",
      issuer: "MAKOTEK Computer Sales Inc.",
      date: "540 hours",
      type: "certificate"
    },
    {
      name: "Certificate of Completion – Windows Server 2012 Training (ltfreetraining)",
      issuer: "ltfreetraining",
      date: "9 hours and 24 minutes",
      type: "certificate"
    },
    {
      name: "Certificate of Completion – Active Directory by ltfreetraining",
      issuer: "ltfreetraining",
      date: "14 hours and 51 minutes",
      type: "certificate"
    },
    {
      name: "Certificate of Completion – Introduction to the Fundamentals of Databases",
      issuer: "Training Program",
      date: "",
      type: "certificate"
    },
    {
      name: "Certificate of Completion – Databases with SQL by CS50",
      issuer: "CS50",
      date: "",
      type: "certificate"
    },
    {
      name: "Certificate of Completion – MongoDB Database Training",
      issuer: "Training Program",
      date: "11 hours",
      type: "certificate"
    },
    {
      name: "Certificate of Completion – PHP for Web Development by CodeMy",
      issuer: "CodeMy",
      date: "2 hours and 33 minutes",
      type: "certificate"
    },
    {
      name: "Certificate of Completion – JavaScript Programming by Bro Code",
      issuer: "Bro Code",
      date: "8 hours",
      type: "certificate"
    },
    {
      name: "Certificate of Completion – HTML and CSS by Telugu",
      issuer: "Telugu",
      date: "9 hours and 7 minutes",
      type: "certificate"
    },
    {
      name: "Certificate of Recognition – Participating in School Voting Management System of College Students Elections",
      issuer: "Recognition",
      date: "",
      type: "award"
    }
  ];

  return (
    <section id="certificates" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Certificates & Awards</h2>
          <div className="certificates-list">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                className="certificate-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="certificate-icon">{cert.type === 'award' ? '🏆' : '🎓'}</div>
                <div className="certificate-info">
                  <h3>{cert.name}</h3>
                  <p className="certificate-issuer">{cert.issuer}</p>
                  {cert.date && <p className="certificate-date">{cert.date}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Certificates;
