'use client';

import { useState } from 'react';
import styles from './Contact.module.css';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    (e.target as HTMLFormElement).reset();
  }

  return (
    <>
      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input type="text" placeholder="Your Name" required />
          </div>
          <div className={styles.formGroup}>
            <label>Email Address</label>
            <input type="email" placeholder="Your Email" required />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>Phone Number</label>
          <input type="tel" placeholder="Your Phone" required />
        </div>
        <div className={styles.formGroup}>
          <label>Message</label>
          <textarea rows={5} placeholder="How can we help you?" required></textarea>
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
      </form>

      {submitted && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <button className={styles.popupClose} onClick={() => setSubmitted(false)}>&#x2715;</button>
            <div className={styles.popupIcon}>&#10003;</div>
            <h3>Thank You!</h3>
            <p>Your message has been sent successfully. We&apos;ll get back to you shortly.</p>
          </div>
        </div>
      )}
    </>
  );
}
