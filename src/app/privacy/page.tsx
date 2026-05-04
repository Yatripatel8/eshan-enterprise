import Link from 'next/link';
import styles from '../terms/Legal.module.css';

export default function PrivacyPage() {
  return (
    <div className={styles.legalPage}>
      <section className={styles.header}>
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>Last Updated: April 25, 2026</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.content}>
            <h2>1. Information We Collect</h2>
            <p>We collect information that you voluntarily provide to us when you make an inquiry or contact us. We retain your submitted information only for as long as necessary to respond to your inquiry or maintain business records.</p>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, and to communicate with you about your inquiries.</p>

            <h2>3. Data Protection</h2>
            <p>We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.</p>

            <h2>4. Cookies</h2>
            <p>We do not intentionally use tracking cookies for advertising or profiling. However, basic technical cookies may be used by hosting providers for website functionality.</p>

            <h2>5. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at eshanenterprise68@gmail.com.</p>


          </div>
          <Link href="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </section>
    </div>
  );
}
