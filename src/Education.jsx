import Section from "./components/Section";
import { education } from "./data/portfolio";

function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Academic background.">
      <div className="education-list">
        {education.map((item) => (
          <article className="simple-card interactive-card" key={`${item.degree}-${item.institution}`}>
            <div className="card-header">
              <div>
                <h3>{item.degree}</h3>
                <p>{item.institution}</p>
              </div>
              <span>{item.period}</span>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

export default Education;
