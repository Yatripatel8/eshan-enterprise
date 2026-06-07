import { Suspense } from 'react';
import { getAllProductsWithDetails } from '@/lib/productService';
import SearchClient from './SearchClient';

export default async function SearchPage() {
  const products = await getAllProductsWithDetails();
  return (
    <Suspense fallback={<div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>}>
      <SearchClient products={products as any} />
    </Suspense>
  );
}
