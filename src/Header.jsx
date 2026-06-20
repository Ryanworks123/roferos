import React from 'react';

function Header() {
  return (
    <header>
      <h1><a href="#hero"><img src="favicon.png" alt="" style={{ width: '32px', height: '32px' }} /></a></h1>
      <nav className="nav-menu">
        <ul>
          <li><a href="#hero">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#archive">Archive</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#certificates">Certificates</a></li>
          <li><a href="#languages">Languages</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;