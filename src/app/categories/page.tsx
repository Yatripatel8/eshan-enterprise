import Link from 'next/link';
import { getCategories } from '@/lib/categoryService';
import styles from './Categories.module.css';

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className={styles.categoriesPage}>
      <section className={styles.pageHeader}>
        <div className="container">
          <h1>Our Categories</h1>
          <p>Explore our premium collection of bath accessories</p>
        </div>
      </section>

      <section className={`section ${styles.gridSection}`}>
        <div className="container">
          <div className={styles.categoryGrid}>
            {categories.map((cat) => (
              <Link key={cat.id} href={`/categories/${cat.slug}`} className={styles.categoryCard}>
                <div className={styles.cardInner}>
                  <div className={styles.imageWrapper}>
                    <img src={cat.image || '/images/category-img.jpg'} alt={cat.name} />
                  </div>
                  <div className={styles.content}>
                    <h3>{cat.name}</h3>
                    <p>High-quality manufacturing with premium materials.</p>
                    <span className={styles.btnLink}>Explore Now</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
