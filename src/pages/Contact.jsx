import { useState } from 'react';
import { useStore } from '../context/storeContext';

const Contact = () => {
  const { notify } = useStore();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !/^\S+@\S+\.\S+$/.test(formData.email) || !formData.message.trim()) {
      notify('Please complete all contact fields correctly', 'error');
      return;
    }

    notify('Message sent successfully. We will contact you soon.', 'success');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="container page-stack">
      <div className="section-head">
        <h1>Contact Us</h1>
        <p>We reply within 24 hours for orders, support, and partnerships.</p>
      </div>

      <div className="contact-layout">
        <article className="summary-card">
          <h2>Support Channels</h2>
          <p>Email: support@shopsphere.store</p>
          <p>Phone: +1 (555) 123-4098</p>
          <p>Location: 42 Market Street, New York, NY</p>
          <p>Hours: Mon - Sat, 9:00 AM to 6:00 PM</p>
        </article>

        <form className="summary-card" onSubmit={handleSubmit} noValidate>
          <h2>Send a Message</h2>
          <div className="field-group">
            <label htmlFor="contact-name">Full Name</label>
            <input
              id="contact-name"
              value={formData.name}
              onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              type="email"
              value={formData.email}
              onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              rows="5"
              value={formData.message}
              onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
