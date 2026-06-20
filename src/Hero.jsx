import React from 'react';
import { motion } from 'framer-motion';
import profileImage from './assets/profile.jpg';

function Hero() {
  return (
    <section id="hero" className="section hero-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-content"
        >
          <div className="hero-text">
            <h1 className="hero-title">I'm Ryan Roferos</h1>
            <h2 className="hero-subtitle">Information Technology Professional</h2>
            <p className="hero-description">
              Information Technology graduate with hands-on experience in technical sales, 
              customer service, hardware and software support, PC assembly, troubleshooting, 
              and system installation. Completed a 540-hour Internship at MAKOTEK Computer 
              Sales Inc. assisting customers with product recommendations, compatibility 
              assessments, and after-sales support. Strong communication, problem-solving, 
              and technical skills with a commitment to delivering excellent customer 
              experiences and business results.
            </p>
            <div className="hero-buttons">
              <a href="CV.pdf" className="hero-button primary" target="_blank" rel="noopener noreferrer">Check Resume</a>
              <a href="#contact" className="hero-button primary">Get in Touch</a>
              <a href="#experience" className="hero-button secondary">View Experience</a>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-image"
          >
            <img src={profileImage} alt="profile.jpg" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
