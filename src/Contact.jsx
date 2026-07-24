import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import LinkButton from "./components/LinkButton";
import Section from "./components/Section";
import { profile } from "./data/portfolio";

const initialFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function Contact() {
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState("");

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(formData.subject || "Portfolio inquiry");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`,
    );
    return `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }, [formData.email, formData.message, formData.name, formData.subject]);

  const handleChange = (event) => {
    setStatus("");
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = mailtoHref;
    setStatus("Your email app should open with the message prepared.");
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Professional contact details."
      intro="This is a frontend-only portfolio. The form prepares an email locally without sending data to a backend service."
    >
      <div className="contact-layout">
        <div className="contact-panel interactive-card">
          <h3>Contact information</h3>
          <ul className="contact-list">
            <li>
              <span>Email</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <span>Phone</span>
              <a href={`tel:${profile.phone.replaceAll(" ", "")}`}>{profile.phone}</a>
            </li>
            <li>
              <span>LinkedIn</span>
              <a href={profile.linkedIn} target="_blank" rel="noreferrer">
                linkedin.com/in/ryanganiii
              </a>
            </li>
            <li>
              <span>Portfolio</span>
              {profile.portfolio ? <a href={profile.portfolio}>{profile.portfolio}</a> : <em>Not listed</em>}
            </li>
            <li>
              <span>GitHub</span>
              {profile.github ? <a href={profile.github}>{profile.github}</a> : <em>Not listed</em>}
            </li>
          </ul>
          <div className="contact-actions">
            <LinkButton href={profile.resume} target="_blank" rel="noreferrer">
              Resume
            </LinkButton>
            <LinkButton href={`mailto:${profile.email}`} variant="primary">
              Email Ryan
            </LinkButton>
          </div>
        </div>

        <motion.form
          className="contact-form interactive-card"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" value={formData.name} onChange={handleChange} required autoComplete="name" />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>
          <div className="form-field">
            <label htmlFor="subject">Subject</label>
            <input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="5" required />
          </div>
          <button className="button button-primary" type="submit">
            Open Email App
          </button>
          {status && <p className="form-status success">{status}</p>}
        </motion.form>
      </div>
    </Section>
  );
}

export default Contact;
