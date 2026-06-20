import React, { useState, useEffect, useCallback } from 'react';

function Gallery() {
  // Gallery images data with captions
  const images = [
    {
      src: "/src/assets/hero.png",
      alt: "Portfolio Hero Image",
      caption: "Modern portfolio design with clean aesthetics"
    },
    {
      src: "/src/assets/react.svg",
      alt: "React Logo",
      caption: "Built with React for dynamic user interfaces"
    },
    {
      src: "/src/assets/vite.svg",
      alt: "Vite Logo",
      caption: "Powered by Vite for fast development"
    },
    {
      src: "/src/assets/hero.png",
      alt: "Project Showcase",
      caption: "Responsive design that works on all devices"
    },
    {
      src: "/src/assets/react.svg",
      alt: "Component Architecture",
      caption: "Modular components for maintainable code"
    },
    {
      src: "/src/assets/vite.svg",
      alt: "Performance Optimized",
      caption: "Fast loading times and smooth interactions"
    }
  ];

  // Slideshow state
  const [isSlideshowOpen, setIsSlideshowOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    if (!isSlideshowOpen || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isSlideshowOpen, isPaused, images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isSlideshowOpen) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
          break;
        case 'ArrowRight':
          setCurrentIndex((prev) => (prev + 1) % images.length);
          break;
        case 'Escape':
          setIsSlideshowOpen(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSlideshowOpen, images.length]);

  // Navigation functions
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const openSlideshow = useCallback((index) => {
    setCurrentIndex(index);
    setIsSlideshowOpen(true);
  }, []);

  const closeSlideshow = useCallback(() => {
    setIsSlideshowOpen(false);
    setIsPaused(false);
  }, []);

  return (
    <section id="gallery" className="section">
      <div className="container">
        <h2>Image Gallery</h2>
        <p className="gallery-description">
          Click on any image to view the slideshow with navigation controls
        </p>
        
        {/* Thumbnail Grid */}
        <div className="gallery-grid">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="gallery-item"
              onClick={() => openSlideshow(index)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  openSlideshow(index);
                }
              }}
            >
              <div className="gallery-item-inner">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="gallery-thumbnail"
                />
                <div className="gallery-overlay">
                  <span className="gallery-overlay-text">View</span>
                </div>
              </div>
              <p className="gallery-caption">{image.caption}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Slideshow Modal */}
      {isSlideshowOpen && (
        <div 
          className="slideshow-modal"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="slideshow-content">
            {/* Close Button */}
            <button 
              className="slideshow-close"
              onClick={closeSlideshow}
              aria-label="Close slideshow"
            >
              ×
            </button>

            {/* Main Image */}
            <div className="slideshow-image-container">
              <img 
                src={images[currentIndex].src} 
                alt={images[currentIndex].alt}
                className="slideshow-image"
              />
            </div>

            {/* Caption */}
            <div className="slideshow-caption">
              <p>{images[currentIndex].caption}</p>
            </div>

            {/* Navigation Buttons */}
            <button 
              className="slideshow-nav slideshow-prev"
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button 
              className="slideshow-nav slideshow-next"
              onClick={goToNext}
              aria-label="Next image"
            >
              ›
            </button>

            {/* Slide Counter */}
            <div className="slideshow-counter">
              {currentIndex + 1} / {images.length}
            </div>

            {/* Thumbnail Previews */}
            <div className="slideshow-thumbnails">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`slideshow-thumbnail ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <img src={image.src} alt={image.alt} />
                </button>
              ))}
            </div>

            {/* Pause Indicator */}
            {isPaused && (
              <div className="slideshow-paused-indicator">
                Paused
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Gallery;
