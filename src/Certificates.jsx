import Section from "./components/Section";
import { certifications } from "./data/portfolio";

function Certificates() {
  return (
    <Section
      id="certifications"
      eyebrow="Certifications"
      title="Certifications and recognition."
      intro="Displayed with issuer and duration where available."
    >
      <div className="cert-grid">
        {certifications.map((certificate) => (
          <article className="cert-card interactive-card" key={`${certificate.name}-${certificate.issuer}`}>
            <h3>{certificate.name}</h3>
            <p>{certificate.issuer}</p>
            {certificate.duration && <span>{certificate.duration}</span>}
          </article>
        ))}
      </div>
    </Section>
  );
}

export default Certificates;
