import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create Gmail compose URL with form data
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const gmailLink = `https://mail.google.com/mail/?view=cm&to=ryanroferos.work@gmail.com&su=${subject}&body=${body}`;
    
    // Open Gmail in new tab
    window.open(gmailLink, '_blank');
    
    // Show success message and reset form
    setSubmitStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Clear success message after 5 seconds
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  const contactInfo = [
    { label: "Phone", value: "+63 9455105552", icon: "📱" },
    { label: "Email", value: "Message me on Gmail", icon: "✉", link: "https://mail.google.com/mail/?view=cm&to=ryanroferos.work@gmail.com" },
    { label: "Location", value: "Carmen, Cagayan de Oro, Misamis Oriental", icon: "🇵🇭" },
    { label: "LinkedIn", value: "Find me on LinkedIn", icon: "💼", link: "https://www.linkedin.com/in/ryanganiii" }
  ];

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Contact Me</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Get in Touch</h3>
              <p>
                I'm always open to discussing new projects, creative ideas, 
                or opportunities to be part of your vision.
              </p>
              <div className="contact-details">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="contact-detail-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <span className="contact-icon">{info.icon}</span>
                    {info.link ? (
                      <a href={info.link} target="_blank" rel="noopener noreferrer" className="contact-value">
                        {info.value}
                      </a>
                    ) : (
                      <span className="contact-value">{info.value}</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.form
              className="contact-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                Send Message
              </button>
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="success-message"
                >
                  ✓ Message sent successfully! A confirmation has been sent to your email.
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="error-message"
                >
                  ✗ Failed to send message. Please try again.
                </motion.div>
              )}
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
