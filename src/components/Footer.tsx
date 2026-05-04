import Link from 'next/link';
import styles from './Footer.module.css';
import { getCategories } from '@/lib/categoryService';

export default async function Footer() {
  const categories = await getCategories();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <Link href="/" className={styles.logo}>
              <img src="images/logo-eshan.svg" style={{ color: ' transparent', filter: 'brightness(0) invert(1)' }} width={200} height={150} alt="" />
            </Link>
            <p className={styles.description}>
              Premium stainless steel bath accessories.
              We guarantee innovation, quality, and style to modern homes across India.
            </p>
            <div className={styles.socias}>
              {/* Add social icons here */}
              <p style={{ marginBottom: '5px' }}>Visit our Facebook page:</p>
              <a href="https://www.facebook.com/vinod.patel.142240?rdid=B6QI2wvFHfoqMDut&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1K9BziM4kK%2F#" target="_blank"><img src="images/facebook-new-logo.png" alt="Facebook" /></a>

            </div>
          </div>

          <div className={styles.footerLinks}>
            <h3>Categories</h3>
            <ul>
              {categories.slice(0, 5).map(cat => (
                <li key={cat.id}><Link href={`/categories/${cat.slug}`}>{cat.name}</Link></li>
              ))}
            </ul>
          </div>

          <div className={styles.footerLinks}>
            <h3>Quick Links</h3>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/terms">Terms & Conditions</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className={styles.footerContact}>
            <h3>Contact Us</h3>
            <p>DG-1, Vishwa Residency,
              Nr. Vishramnagar, Gurukul Road,
              Memnagar, Ahmedabad – 380052
              Gujarat, India</p>

            <p><span style={{ fontWeight: 'bold' }}>Email:</span> <a href="mailto:eshanenterprise68@gmail.com" style={{ color: 'inherit' }}>eshanenterprise68@gmail.com</a></p>
            <p><span style={{ fontWeight: 'bold' }}>Phone:</span> <a href="tel:+919825988354" style={{ color: 'inherit' }}> (+91) 98259 88354</a></p>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; {currentYear} Eshan Enterprise. All Rights Reserved.</p>
          {/* <p>Powered by <a href="https://brandbanalo.com/" target="_blank">Brandbanalo</a></p> */}
        </div>
      </div>
    </footer>
  );
}
