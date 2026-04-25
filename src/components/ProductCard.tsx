import Link from 'next/link';
import { Product } from '@/data/products';
import styles from './ProductCard.module.css';

interface ProductProps {
  product: Product;
}

export default function ProductCard({ product }: ProductProps) {
  return (
    <div className={styles.productCard}>
      <div className={styles.productImg}>
        <img src={product.image} alt={product.name} />
      </div>
      <div className={styles.productInfo}>
        <h3>{product.name}</h3>
        {/* <p className={styles.price}>{product.price}</p> */}
        <Link href={`/product/${product.id}`} className={styles.viewBtn}>View Details</Link>
      </div>
    </div>
  );
}
