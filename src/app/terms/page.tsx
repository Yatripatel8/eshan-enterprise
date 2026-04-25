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
            
            <h2>2. Use of License</h2>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on Eshan Enterprise's website for personal, non-commercial transitory viewing only.</p>
            
            <h2>3. Disclaimer</h2>
            <p>The materials on Eshan Enterprise's website are provided on an 'as is' basis. Eshan Enterprise makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            
            <h2>4. Limitations</h2>
            <p>In no event shall Eshan Enterprise or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Eshan Enterprise's website.</p>
          </div>
          <Link href="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </section>
    </div>
  );
}
