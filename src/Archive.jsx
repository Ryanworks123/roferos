import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Archive() {
  const images = [
    'photo_6176801367456943769_y.jpg',
    'photo_6176801367456943770_y.jpg',
    'photo_6176801367456943771_y.jpg',
    'photo_6176801367456943772_y.jpg',
    'photo_6176801367456943773_y.jpg',
    'photo_6176801367456943774_y.jpg',
    'photo_6176801367456943775_y.jpg',
    'photo_6176801367456943776_y.jpg',
    'photo_6176801367456943777_y.jpg',
    'photo_6176801367456943778_y.jpg',
    'photo_6176801367456943779_y.jpg',
    'photo_6176801367456943780_y.jpg',
    'photo_6176801367456943781_y.jpg',
    'photo_6176801367456943782_y.jpg',
    'photo_6176801367456943783_y.jpg',
    'photo_6176801367456943784_y.jpg',
    'photo_6176801367456943785_y.jpg',
    'photo_6176801367456943786_y.jpg',
    'photo_6176801367456943787_y.jpg',
    'photo_6176801367456943788_y.jpg',
    'photo_6176801367456943789_y.jpg',
    'photo_6176801367456943790_y.jpg',
    'photo_6176801367456943791_y.jpg',
    'photo_6176801367456943792_y.jpg',
    'photo_6176801367456943793_y.jpg',
    'photo_6176801367456943794_y.jpg',
    'photo_6176801367456943795_y.jpg',
    'photo_6176801367456943800_y.jpg',
    'photo_6176801367456943801_y.jpg',
    'photo_6176801367456943802_y.jpg'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying, images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section id="archive" className="section archive-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Archive</h2>
          <div className="archive-content">
            <div className="slideshow-container">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={`/images/${images[currentIndex]}`}
                  alt={`Archive image ${currentIndex + 1}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="slideshow-image"
                />
              </AnimatePresence>
              
              <button className="slideshow-button slideshow-prev" onClick={goToPrevious}>
                ‹
              </button>
              <button className="slideshow-button slideshow-next" onClick={goToNext}>
                ›
              </button>
              
              <button 
                className="slideshow-play-pause" 
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
            </div>
            
            <div className="slideshow-dots">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`slideshow-dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Archive;
