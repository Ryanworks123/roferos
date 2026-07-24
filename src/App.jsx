import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Skills from "./Skills";
import Projects from "./Projects";
import Education from "./Education";
import Certificates from "./Certificates";
import Contact from "./Contact";
import PageLoader from "./components/PageLoader";
import ScrollProgress from "./components/ScrollProgress";

const themes = ["system", "light", "dark"];

function App() {
  const [theme, setTheme] = useState(() => window.localStorage.getItem("theme") || "system");

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const currentIndex = themes.indexOf(currentTheme);
      return themes[(currentIndex + 1) % themes.length];
    });
  };

  return (
    <div className="app-shell">
      <PageLoader />
      <ScrollProgress />
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <AnimatePresence mode="wait">
        <motion.main
          id="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Certificates />
          <Contact />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
