import { getCategories } from '@/lib/actions/category';
import CategoryClient from './CategoryClient';

export const dynamic = 'force-dynamic';

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <CategoryClient initialCategories={categories as any} />
  );
}
