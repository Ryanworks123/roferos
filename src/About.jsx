import Section from "./components/Section";
import { about } from "./data/portfolio";

function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Recent IT graduate building practical frontend skills."
      intro="This section is limited to documented resume information."
    >
      <div className="about-grid">
        {about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}

export default About;
