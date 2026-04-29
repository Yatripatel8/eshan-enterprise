import { getProducts } from '@/lib/actions/product';
import { getCategories } from '@/lib/actions/category';
import ProductClient from './ProductClient';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ]);

  return (
    <ProductClient 
      initialProducts={products as any} 
      categories={categories as any} 
    />
  );
}
