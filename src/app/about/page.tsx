import Link from 'next/link';
import styles from './About.module.css';

export default function About() {
  return (
    <div className={styles.aboutPage}>
      <section className={styles.pageHeader}>
        <div className="container">
          <h1>About Us</h1>
          <p>Excellence in Stainless Steel Solutions Since 1995</p>
        </div>
      </section>

      <section className={`section ${styles.storySection}`}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyContent}>
              <h6>Our Story</h6>
              <h2>Eshan Enterprise – Pioneers in Premium Bath Solutions</h2>
              <p>
                Established in 1995, Eshan Enterprise has been a trusted supplier of high-quality stainless steel, glass, acrylic bathroom shelf, bathroom fittings and accessories across India for over 25 years.
              </p>
              <p>
                Our commitment goes beyond products—we provide innovative designs and durable finishes that meet the evolving needs of builders, dealers, and modern homeowners.
              </p>
              <div className={styles.stats}>
                <div className={styles.statItem}>
                  <h3>25+</h3>
                  <p>Years Experience</p>
                </div>
                <div className={styles.statItem}>
                  <h3>100+</h3>
                  <p>Products</p>
                </div>
                <div className={styles.statItem}>
                  <h3>1000+</h3>
                  <p>Happy Clients</p>
                </div>
              </div>
            </div>
            <div className={styles.storyImage}>
              <img src="/images/about-us.jpg" alt="Factory" />
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.valuesSection}`} style={{ backgroundColor: 'var(--bg-alt)' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h6>Core Values</h6>
            <h2>What Drives Us</h2>
          </div>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>💎</div>
              <h3>Unmatched Quality</h3>
              <p>We have products with premium grade stainless steel for long-lasting durability.</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>💡</div>
              <h3>Innovation</h3>
              <p>Constantly evolving our designs to match modern architectural trends.</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🤝</div>
              <h3>Trust</h3>
              <p>Building long-term relationships with dealers and builders across India.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.teamSection}`}>
        <div className="container">
          <div className={styles.teamGrid}>
            <div className={styles.teamContent}>
              <h2>Built with Quality. Designed for Everyday Use.</h2>
              <p>
                At Eshan Enterprise, we specialize in manufacturing premium stainless steel bathroom accessories including glass shelves, acrylic shelves, napkin holders, towel rings, soap stands, and utility fittings built for modern homes and commercial spaces.
              </p>
              <p>Our focus is simple: Complete bathroom accessory solutions for every need.</p>
              <ul className={styles.featureList}>
                <li>Durable Material</li>
                <li>Precise Finishing</li>
                <li>Skilled Craftsmanship</li>
                <li>Practical Designs</li>
              </ul>
            </div>
            <div className={styles.teamImage}>
              <img src="/images/premium-product.jpg" alt="Manufacturing" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaBanner}>
        <div className="container">
          <h2>Ready to Transform Your Space?</h2>
          <p>Contact us today for bath solutions for your space.</p>
          <Link href="/contact" className="btn btn-primary">Get In Touch</Link>
        </div>
      </section>
    </div>
  );
}
