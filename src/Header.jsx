import React, { useState, useEffect } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
    closeMenu();
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'archive', 'experience', 'skills', 'education', 'certificates', 'languages', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header>
        <div className="header-logo">
          <img src="/favicon.png" alt="Logo" className="initials-logo" />
          <div>
            <span className="header-name">Roferos</span>
            <span className="header-role"> / Developer</span>
          </div>
        </div>
        <nav className="nav-menu">
          <ul>
            <li><a href="#hero" className={activeSection === 'hero' ? 'active' : ''} onClick={() => handleNavClick('hero')}>Home</a></li>
            <li><a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={() => handleNavClick('about')}>About</a></li>
            <li><a href="#archive" className={activeSection === 'archive' ? 'active' : ''} onClick={() => handleNavClick('archive')}>Archive</a></li>
            <li><a href="#experience" className={activeSection === 'experience' ? 'active' : ''} onClick={() => handleNavClick('experience')}>Experience</a></li>
            <li><a href="#skills" className={activeSection === 'skills' ? 'active' : ''} onClick={() => handleNavClick('skills')}>Skills</a></li>
            <li>
              <button 
                className={`dropdown-button ${isDropdownOpen ? 'open' : ''}`}
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen}
              >
                More <i className="ti ti-chevron-down"></i>
              </button>
              <div className={`dropdown-panel ${isDropdownOpen ? 'open' : ''}`}>
                <a href="#education" className="dropdown-item" onClick={() => handleNavClick('education')}>
                  <i className="ti ti-school"></i> Education
                </a>
                <a href="#certificates" className="dropdown-item" onClick={() => handleNavClick('certificates')}>
                  <i className="ti ti-certificate"></i> Certificates
                </a>
                <a href="#languages" className="dropdown-item" onClick={() => handleNavClick('languages')}>
                  <i className="ti ti-language"></i> Languages
                </a>
              </div>
            </li>
          </ul>
          <a href="#contact" className="contact-cta" onClick={() => handleNavClick('contact')}>
            <i className="ti ti-mail"></i> Contact
          </a>
        </nav>
        <button 
          className="hamburger" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>
      <nav className={`nav-menu mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        <div className="nav-section">
          <div className="nav-section-label">Navigate</div>
          <ul>
            <li><a href="#hero" className={`nav-item ${activeSection === 'hero' ? 'active' : ''}`} onClick={() => handleNavClick('hero')}><i className="ti ti-home"></i> Home</a></li>
            <li><a href="#about" className={`nav-item ${activeSection === 'about' ? 'active' : ''}`} onClick={() => handleNavClick('about')}><i className="ti ti-user"></i> About</a></li>
            <li><a href="#archive" className={`nav-item ${activeSection === 'archive' ? 'active' : ''}`} onClick={() => handleNavClick('archive')}><i className="ti ti-archive"></i> Archive</a></li>
            <li><a href="#experience" className={`nav-item ${activeSection === 'experience' ? 'active' : ''}`} onClick={() => handleNavClick('experience')}><i className="ti ti-briefcase"></i> Experience</a></li>
            <li><a href="#skills" className={`nav-item ${activeSection === 'skills' ? 'active' : ''}`} onClick={() => handleNavClick('skills')}><i className="ti ti-tool"></i> Skills</a></li>
          </ul>
        </div>
        <div className="nav-divider"></div>
        <div className="nav-section">
          <div className="nav-section-label">Background</div>
          <ul>
            <li><a href="#education" className={`nav-item ${activeSection === 'education' ? 'active' : ''}`} onClick={() => handleNavClick('education')}><i className="ti ti-school"></i> Education</a></li>
            <li><a href="#certificates" className={`nav-item ${activeSection === 'certificates' ? 'active' : ''}`} onClick={() => handleNavClick('certificates')}><i className="ti ti-certificate"></i> Certificates</a></li>
            <li><a href="#languages" className={`nav-item ${activeSection === 'languages' ? 'active' : ''}`} onClick={() => handleNavClick('languages')}><i className="ti ti-language"></i> Languages</a></li>
          </ul>
        </div>
        <a href="#contact" className="nav-contact-button" onClick={() => handleNavClick('contact')}>
          <i className="ti ti-mail"></i> Contact
        </a>
      </nav>
    </>
  );
}

export default Header;