import Link from 'next/link';
import { getFeaturedProducts } from '@/lib/productService';
import { getCategories } from '@/lib/categoryService';
import ProductCard from '@/components/ProductCard';
import styles from './Home.module.css';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories()
  ]);

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

      

      {/* Categories Preview */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header text-center">
            <h6>Our Collections</h6>
            <h2>Shop by Category</h2>
          </div>
          <div className={styles.categoryGrid}>
            {categories.map((cat) => (
              <Link key={cat.id} href={`/categories/${cat.slug}`} className={styles.categoryCard}>
                <div className={styles.categoryImg}>
                  <img src={cat.image || '/images/category-img.jpg'} alt={cat.name} />
                </div>
                <h3>{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h6>Trending Now</h6>
              <h2>Featured Products</h2>
            </div>
            <Link href="/categories" className="btn btn-outline">View All</Link>
          </div>
          <div className={styles.productGrid}>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product as any} />
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
    </div>
  );
}
