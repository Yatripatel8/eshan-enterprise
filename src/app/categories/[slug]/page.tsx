'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { products, categories } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import styles from './CategoryDetail.module.css';

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const category = categories.find(c => c.slug === slug);
  const filteredProducts = products.filter(p => p.categorySlug === slug);

  if (!category) {
    return (
      <div className={styles.noProducts}>
        <p>Category not found.</p>
        <Link href="/categories" className="btn btn-primary">Back to Categories</Link>
      </div>
    );
  }

  return (
    <div className={styles.detailPage}>
      {/* Category Hero */}
      <section className={styles.categoryHero}>
        <div className={styles.heroOverlay}></div>
        <div className="container">
          <div className={styles.heroContent}>
            <h1>{category.name}</h1>
            <p className={styles.breadcrumb}>
              <Link href="/">Home</Link> / <Link href="/categories">Categories</Link> / <span>{category.name}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className={`section ${styles.introSection}`}>
        <div className="container">
          <div className={styles.introGrid}>
            <div className={styles.introText}>
              <h6>Premium Selection</h6>
              <h2>Leading {category.name} Provider</h2>
              <p>
                Discover our extensive range of high-quality {category.name.toLowerCase()} items.
                At Eshan Enterprise, we specialize in providing durable, stylish, and high-performance bath accessories
                crafted with precision for modern homes and commercial projects.
              </p>
              <div className={styles.features}>
                <div className={styles.feature}>
                  <span>✓</span> High-Grade Materials
                </div>
                <div className={styles.feature}>
                  <span>✓</span> Modern Designs
                </div>
                <div className={styles.feature}>
                  <span>✓</span> Long-lasting Finish
                </div>
              </div>
            </div>
            <div className={styles.introImage}>
              <img src="/images/category-img.jpg" alt={category.name} className={styles.sideImg} />
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className={`section ${styles.productsSection}`} style={{ backgroundColor: 'var(--bg-alt)' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Available Collections</h2>
            <div className={styles.titleLine}></div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className={styles.productGrid}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className={styles.noProducts}>
              <p>No products found in this category yet. Please check back later.</p>
              <Link href="/categories" className="btn btn-primary">Back to Categories</Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
