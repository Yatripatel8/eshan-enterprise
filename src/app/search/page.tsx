import { searchProducts } from '@/lib/productService';
import ProductCard from '@/components/ProductCard';
import styles from './Search.module.css';

export default async function SearchPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ q?: string }> 
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || '';
  const filteredProducts = query ? await searchProducts(query) : [];

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
                <ProductCard key={product.id} product={product as any} />
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <h2>{query ? 'No products found' : 'Start searching'}</h2>
              <p>
                {query 
                  ? "We couldn't find any products matching your search. Please try different keywords."
                  : "Enter a keyword in the search bar above to find products."}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
