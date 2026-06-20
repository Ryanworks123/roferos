import React from 'react';
import { motion } from 'framer-motion';

function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Information Technology graduate with hands-on experience in technical sales, 
                customer service, hardware and software support, PC assembly, troubleshooting, 
                and system installation. Completed a 540-hour Internship at MAKOTEK Computer 
                Sales Inc. assisting customers with product recommendations, compatibility 
                assessments, and after-sales support. Strong communication, problem-solving, 
                and technical skills with a commitment to delivering excellent customer 
                experiences and business results.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
