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
            <h1 className="hero-title">Ryan Roferos</h1>
            <h2 className="hero-subtitle">IT Professional</h2>
            <p className="hero-description">
              Technical sales, customer service, hardware & software support
            </p>
            <div className="hero-buttons">
              <a href="CV.pdf" className="hero-button primary" target="_blank" rel="noopener noreferrer">View Resume</a>
              <a href="#contact" className="hero-button primary">Contact Me</a>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-image"
          >
            <img src={profileImage} alt="Ryan Roferos" loading="lazy" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
