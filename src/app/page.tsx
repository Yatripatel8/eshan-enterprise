import Link from 'next/link';
import { products, categories } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import styles from './Home.module.css';

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const displayCategories = categories.map((cat, index) => ({
    ...cat,
    image: products.find(p => p.categorySlug === cat.slug)?.image || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800'
  }));

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.mainHeading}>Elevate Your Space with <br /><span>Premium Bath</span> Solutions</h1>
          <p className={styles.heroText}>Discover our range of high-quality stainless steel and acrylic accessories crafted for durability and elegance.</p>
          <div className={styles.heroBtns}>
            <Link href="/categories" className="btn btn-primary">Shop Collection</Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className={styles.trustBar}>
        <div className={`container ${styles.trustGrid}`}>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}></div>
            <div>
              <h3>100% Original</h3>
              <p>Original Products</p>
            </div>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}></div>
            <div>
              <h3>Quality You Can Trust</h3>
              <p>We stand behind every product</p>
            </div>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}></div>
            <div>
              <h3>Always Reachable</h3>
              <p>Quick replies, no bots</p>
            </div>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}></div>
            <div>
              <h3>Customer First</h3>
              <p>Your satisfaction is our priority</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className={`section ${styles.aboutPreview}`}>
        <div className={`container ${styles.aboutGrid}`}>
          <div className={styles.aboutImage}>
            <img src="images/premium-product.jpg" alt="About Eshan Enterprise" />
            <div className={styles.aboutBadge}>100% Original Products</div>
          </div>
          <div className={styles.aboutContent}>
            <h6>About Us</h6>
            <h2>Premium Bathroom Shelves & Accessories Manufacturer</h2>
            <p>At Eshan Enterprise, we believe that every bathroom deserves a perfect blend of functionality and elegance. As a dedicated manufacturer of premium bathroom shelves and accessories, we design products that elevate everyday spaces into refined experiences.</p>
            <Link href="/about" className="btn btn-outline">Read Our Story</Link>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className={`section ${styles.categoriesSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h6>Our Collection</h6>
            <h2>Shop By Categories</h2>
          </div>
          <div className={styles.categoryGrid}>
            {displayCategories.map((cat) => (
              <Link key={cat.name} href={`/categories/${cat.slug}`} className={styles.categoryCard}>
                <div className={styles.categoryImgWrapper}>
                  <img src={cat.image} alt={cat.name} />
                  <div className={styles.categoryOverlay}>
                    <span>View All</span>
                  </div>
                </div>
                <h3>{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={`section ${styles.featuredSection}`} style={{ backgroundColor: 'var(--bg-alt)' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h6>Top Picks</h6>
            <h2>Featured Products</h2>
          </div>
          <div className={styles.productGrid}>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className={styles.infoSection}>
        <div className="container">
          <div className={styles.infoGrid}>
            <div className={styles.infoImageWrapper}>
              <img src="/images/who-we-are.jpg" alt="Eshan Enterprise Manufacturing" />
            </div>
            <div className={styles.infoContent}>
              <h2>✨ Who We Are</h2>
              <p>Eshan Enterprise is a trusted name in the manufacturing of high-quality bathroom accessories. With a focus on durability, modern aesthetics, and precision craftsmanship, we cater to both residential and commercial needs.</p>
              <p>Our products are thoughtfully designed to complement contemporary interiors while ensuring long-lasting performance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className={styles.infoSection} style={{ backgroundColor: 'var(--bg-alt)' }}>
        <div className="container">
          <div className={`${styles.infoGrid} ${styles.reverseGrid}`}>
            <div className={styles.infoImageWrapper}>
              <img src="/images/what we offer.png" alt="Premium Bathroom Solutions" />
            </div>
            <div className={styles.infoContent}>
              <h2>🛠️ What We Offer</h2>
              <p>We specialise in a wide range of bathroom solutions, including:</p>
              <ul className={styles.featureList}>
                <li>Designer bathroom shelves</li>
                <li>Stainless steel accessories</li>
                <li>Wall-mounted storage solutions</li>
                <li>Space-saving organisers</li>
                <li>Customised bathroom fittings</li>
              </ul>
              <p>Each product is crafted using premium materials and strict quality standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={styles.infoSection}>
        <div className="container">
          <div className={styles.infoGrid}>
            <div className={styles.infoImageWrapper}>
              <img src="/images/why-choose-us.jpg" alt="Quality Excellence" />
            </div>
            <div className={styles.infoContent}>
              <h2>💎 Why Choose Us</h2>
              <div className={styles.whyGrid}>
                <div className={styles.whyCard}>
                  <h3>Superior Quality</h3>
                  <p>We use high-grade materials to ensure durability and corrosion resistance.</p>
                </div>
                <div className={styles.whyCard}>
                  <h3>Modern Designs</h3>
                  <p>Our designs are minimal, elegant, and aligned with current interior trends.</p>
                </div>
                <div className={styles.whyCard}>
                  <h3>Precision Manufacturing</h3>
                  <p>Every product is crafted with attention to detail and finish.</p>
                </div>
                <div className={styles.whyCard}>
                  <h3>Customer-Centric</h3>
                  <p>We prioritise customer satisfaction with reliable service and consistent quality.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaBanner}>
        <div className="container">
          <h2>Ready to Transform Your Space?</h2>
          <p>Contact us today for bath solutions for your space.</p>
          <a href="https://wa.me/919825988354?text=Hi, I am interested in your products." target="_blank" rel="noopener noreferrer" className="btn btn-primary">Get In Touch</a>
        </div>
      </section>
    </div>
  );
}
