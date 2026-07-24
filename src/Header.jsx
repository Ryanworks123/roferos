import { useEffect, useState } from "react";
import ThemeToggle from "./components/ThemeToggle";
import { profile } from "./data/portfolio";

const navItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

function Header({ theme, onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      const current = navItems.findLast((item) => {
        const element = document.getElementById(item.id);
        return element && window.scrollY + 120 >= element.offsetTop;
      });

      if (current) {
        setActiveSection(current.id);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <nav className="nav-bar" aria-label="Primary navigation">
        <a className="brand" href="#hero" aria-label={`${profile.name} portfolio home`}>
          <span aria-hidden="true">RR</span>
          <div>
            <strong>{profile.name}</strong>
            <small>{profile.role}</small>
          </div>
        </a>

        <button
          className={isOpen ? "menu-toggle is-open" : "menu-toggle"}
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={isOpen ? "nav-links is-open" : "nav-links"}>
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={activeSection === item.id ? "active" : ""}
                aria-current={activeSection === item.id ? "page" : undefined}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </nav>
    </header>
  );
}

export default Header;
