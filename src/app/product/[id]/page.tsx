import { getProductById } from '@/lib/productService';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './ProductDetail.module.css';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  const hasSpecs = product.details && (
    product.details.material ||
    product.details.size ||
    product.details.colour ||
    product.details.specificFeatures
  );

  const specs = hasSpecs ? [
    { label: 'Material', value: product.details!.material },
    { label: 'Size', value: product.details!.size ? `${product.details!.size} mm` : null },
    { label: 'Colour', value: product.details!.colour },
    { label: 'Features', value: product.details!.specificFeatures },
  ].filter(s => s.value) : [];

  return (
    <div className={styles.productDetailPage}>
      <div className="container">
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link> / <Link href="/categories">Categories</Link> / <span>{product.name}</span>
        </div>

        <div className={styles.productLayout}>
          <div className={styles.productImage}>
            {product.image
              ? <img src={product.image} alt={product.name} />
              : <div className={styles.noImage}><span>No image available</span></div>}
          </div>

          <div className={styles.productInfo}>
            <h6>{product.category.name}</h6>
            <h1>{product.name}</h1>

            {product.shortDescription && (
              <div className={styles.description}>
                <h3>Product Description</h3>
                <p>{product.shortDescription}</p>
              </div>
            )}

            {specs.length > 0 && (
              <div className={styles.specs}>
                <h3>Specifications</h3>
                <ul>
                  {specs.map(s => (
                    <li key={s.label}>
                      <strong>{s.label}:</strong> {s.value}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className={styles.actions}>
              <a
                href={`https://wa.me/919825988354?text=I%20am%20interested%20in%20${encodeURIComponent(product.name)}`}
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Enquire on WhatsApp
              </a>
              <a
                href="https://wa.me/919825988354?text=Hi%2C%20I%20have%20an%20inquiry%20about%20your%20products."
                className="btn btn-outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Send Inquiry
              </a>
            </div>

            <p className={styles.trustText}>🛡️ 100% Genuine Product &nbsp;|&nbsp; 📦 Fast Shipping</p>
          </div>
        </div>
      </div>
    </div>
  );
}
