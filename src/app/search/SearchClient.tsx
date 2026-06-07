'use client';

import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import styles from './Search.module.css';

interface Product {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  shortDescription: string | null;
  categoryId: string;
  category: { id: string; name: string; slug: string };
}

export default function SearchClient({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const filtered = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.shortDescription?.toLowerCase().includes(query.toLowerCase()) ||
          p.category.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className={styles.searchPage}>
      <section className={styles.pageHeader}>
        <div className="container">
          <h1>Search Results</h1>
          {query && (
            <p>
              Showing results for: &ldquo;<span>{query}</span>&rdquo;
            </p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          {filtered.length > 0 ? (
            <div className={styles.productGrid}>
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <h2>{query ? 'No products found' : 'Start searching'}</h2>
              <p>
                {query
                  ? "We couldn't find any products matching your search. Please try different keywords."
                  : 'Enter a keyword in the search bar above to find products.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
