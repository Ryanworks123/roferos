import { Monitor, Moon, Sun } from "lucide-react";

const icons = {
  system: Monitor,
  light: Sun,
  dark: Moon,
};

function ThemeToggle({ theme, onToggle }) {
  const Icon = icons[theme] || Monitor;

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={onToggle}
      aria-label={`Switch color theme. Current theme: ${theme}`}
      title={`Theme: ${theme}`}
    >
      <Icon size={17} aria-hidden="true" />
    </button>
  );
}

export default ThemeToggle;
