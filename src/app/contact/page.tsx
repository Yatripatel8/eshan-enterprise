import styles from './Contact.module.css';

export default function Contact() {
  return (
    <div className={styles.contactPage}>
      <section className={styles.pageHeader}>
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd Love To Hear From You</p>
        </div>
      </section>

      <section className={`section ${styles.contactSection}`}>
        <div className="container">
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h6>Get In Touch</h6>
              <h2>Contact Details</h2>
              <p>Have questions about our products or need a quote? Reach out to us through any of the following channels.</p>

              <div className={styles.infoItems}>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>📍</div>
                  <div>
                    <h3>Our Office Address</h3>
                    <p>DG-1, Vishwa Residency,
                      Nr. Vishramnagar, Gurukul Road,
                      Memnagar, Ahmedabad – 380052
                      Gujarat, India</p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>📞</div>
                  <div>
                    <h3>Phone Number</h3>
                    <p><a href="tel:+919825988354" className={styles.contactLink}>(+91) 98259 88354</a></p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>✉️</div>
                  <div>
                    <h3>Email Address</h3>
                    <p><a href="mailto:eshanenterprise68@gmail.com" className={styles.contactLink}>eshanenterprise68@gmail.com</a></p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>🕒</div>
                  <div>
                    <h3>Working Hours</h3>
                    <p>Mon - Sat: 10:00 AM - 7:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* <div className={styles.ctaCard}>
                <h3>Bulk Inquiries?</h3>
                <p>Register as a dealer or builder to get exclusive pricing and priority shipping.</p>
                <a href="https://wa.me/919825988354" className="btn btn-primary" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
              </div> */}
            </div>

            <div className={styles.contactFormWrapper}>
              <form className={styles.contactForm}>
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
            </div>
          </div>
        </div>
      </section>

      <section className={styles.mapSection}>
        <a
          href="https://www.google.com/maps/dir//Vishwa+Residency,+VISHRAM+NAGAR+CO-OPERATIVE+SOCIETY,+9,+Gurukul+Rd,+Tarun+Nagar+Part+1,+Tarun+Nagar+Part+2,+Memnagar,+Ahmedabad,+Gujarat+380052/@23.1001633,72.4307577,10z/data=!4m8!4m7!1m0!1m5!1m1!1s0x395e84a7cae10dc1:0xf062a54bf92c0f88!2m2!1d72.5334677!2d23.0552987?entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          className={styles.mapLink}
        >
          <img src="/images/map.png" alt="Eshan Enterprise Ahmedabad Location" className={styles.mapImage} />
          <div className={styles.mapOverlay}>
            <span>View on Google Maps</span>
          </div>
        </a>
      </section>
    </div>
  );
}
