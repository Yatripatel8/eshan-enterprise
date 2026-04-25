'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { products } from '@/data/products';
import styles from './ProductDetail.module.css';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const product = products.find(p => p.id === id) || products[0];

  return (
    <div className={styles.productDetailPage}>
      <div className="container">
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link> / <Link href="/categories">Categories</Link> / <span>{product.name}</span>
        </div>

        <div className={styles.productLayout}>
          <div className={styles.productImage}>
            <img src={product.image} alt={product.name} />
          </div>

          <div className={styles.productInfo}>
            <h6>{product.category}</h6>
            <h1>{product.name}</h1>
            <div className={styles.description}>
              <h3>Product Description</h3>
              <p>{product.description}</p>
            </div>

            <div className={styles.specs}>
              <h3>Specifications</h3>
              <ul>
                <li><strong>Material:</strong> {product.specs.material}</li>
                <li><strong>Finish:</strong> {product.specs.finish}</li>
                <li><strong>Warranty:</strong> {product.specs.warranty}</li>
                <li><strong>Installation:</strong> {product.specs.installation}</li>
              </ul>
            </div>

            <div className={styles.actions}>
              <a href={`https://wa.me/919825988354?text=I%20am%20interested%20in%20${product.name}`} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Enquire on WhatsApp</a>
              <a href="https://wa.me/919825988354?text=Hi, I have an inquiry about your products." className="btn btn-outline" target="_blank" rel="noopener noreferrer">Send Inquiry</a>
            </div>
            
            <p className={styles.trustText}>🛡️ 100% Genuine Product | 📦 Fast Shipping</p>
          </div>
        </div>
      </div>
    </div>
  );
}
