'use client';

import { useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import styles from './Search.module.css';
import { Suspense } from 'react';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(query) || 
    p.category.toLowerCase().includes(query)
  );

  return (
    <div className={styles.searchPage}>
      <section className={styles.pageHeader}>
        <div className="container">
          <h1>Search Results</h1>
          <p>Showing results for: "<span>{query}</span>"</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {filteredProducts.length > 0 ? (
            <div className={styles.productGrid}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <h2>No products found</h2>
              <p>We couldn't find any products matching your search. Please try different keywords.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading Search...</div>}>
      <SearchResults />
    </Suspense>
  );
}
