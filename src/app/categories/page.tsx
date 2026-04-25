import Link from 'next/link';
import styles from './Categories.module.css';

const categories = [
  { name: 'Stainless steel napkin holder', image: '/images/products/napkin-holder.jpeg' },
  { name: 'Bathroom shelf', image: '/images/products/bathroom-shelf.jpeg' },
  { name: 'Stainless steel towel rack', image: '/images/products/towel-rack (2).png' },
  { name: 'Stainless steel soap dish', image: '/images/products/soap-dish.jpeg' },
  { name: 'Stainless steel tumbler', image: '/images/products/stainless-steel-tumbler.jpeg' },
  { name: 'Stainless steel toilet paper holder', image: '/images/products/toilet-paper-holder.jpeg' },
  { name: 'Liquid dispenser', image: '/images/products/liquid-dispenser.jpeg' },
  { name: 'ABS mirror cabinet', image: '/images/products/abs-mirror-cabinet.jpg' },
];

export default function CategoriesPage() {
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
              <Link key={cat.name} href={`/categories/${cat.name.toLowerCase().replace(/ /g, '-')}`} className={styles.categoryCard}>
                <div className={styles.cardInner}>
                  <div className={styles.imageWrapper}>
                    <img src={cat.image} alt={cat.name} />
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
