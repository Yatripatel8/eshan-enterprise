import Link from 'next/link';
import styles from './ProductCard.module.css';

interface Product {
  id: string;
  name: string;
  image: string | null;
  shortDescription?: string | null;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className={styles.productCard}>
      <div className={styles.productImg}>
        {product.image
          ? <img src={product.image} alt={product.name} />
          : <div className={styles.noImage}><span>No Image</span></div>}
      </div>
      <div className={styles.productInfo}>
        <h3>{product.name}</h3>
        <Link href={`/product/${product.id}`} className={styles.viewBtn}>View Details</Link>
      </div>
    </div>
  );
}
