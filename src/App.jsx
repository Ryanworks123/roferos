import Header from "./Header";
import Footer from "./Footer";
import Hero from "./Hero";
import About from "./About";
import Archive from "./Archive";
import Experience from "./Experience";
import Skills from "./Skills";
import Education from "./Education";
import Certificates from "./Certificates";
import Languages from "./Languages";
import Contact from "./Contact";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <About />
        <Archive />
        <Experience />
        <Skills />
        <Education />
        <Certificates />
        <Languages />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
