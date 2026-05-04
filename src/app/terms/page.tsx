import Link from 'next/link';
import styles from './Legal.module.css';

export default function TermsPage() {
  return (
    <div className={styles.legalPage}>
      <section className={styles.header}>
        <div className="container">
          <h1>Terms & Conditions</h1>
          <p>Last Updated: April 25, 2026</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.content}>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>

            <h2>2. Use of Website</h2>
            <p>The content on this website is provided for informational purposes only. You may view and not use the product images for personal or non-commercial purposes.</p>

            <h2>3. Product Information</h2>
            <p>We strive to provide accurate product information. However, product specifications, designs, and availability may change in some case without prior notice.</p>

            <h2>4.Intellectual Property</h2>
            <p>All product images and materials on this website are the property of Eshan Enterprise and may not be copied, reproduced, or distributed without permission.</p>

            <h2>5. Limitations of Liability</h2>
            <p>Eshan Enterprise shall not be liable for any damages arising from the use or inability to use the materials.</p>

            <h2>6. Inquiry Disclaimer</h2>
            <p>Submitting an inquiry through this website does not create any contractual obligation or guarantee of product availability.</p>

            <h2>7. Changes to Terms</h2>
            <p>We reserve the right to update or modify these Terms at any time without prior notice.</p>
          </div>
          <Link href="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </section>
    </div>
  );
}
