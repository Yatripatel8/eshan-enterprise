import { getCategoryBySlug } from '@/lib/categoryService';
import { getProductsByCategory } from '@/lib/productService';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './CategoryDetail.module.css';

export default async function CategoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(category.id);

  return (
    <div className={styles.categoryDetailPage}>
      <div className={styles.header}>
        <div className="container">
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link> / <Link href="/categories">Categories</Link> / <span>{category.name}</span>
          </div>
          <h1>{category.name}</h1>
          <p>{products.length} products found</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {products.length === 0 ? (
            <div className={styles.noProducts}>
              <p>No products found in this category.</p>
              <Link href="/categories" className="btn btn-primary">Back to Categories</Link>
            </div>
          ) : (
            <div className={styles.productGrid}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product as any} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
