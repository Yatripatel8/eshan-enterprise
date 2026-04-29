import { getProductDetails } from '@/lib/actions/product';
import ProductDetailsForm from './ProductDetailsForm';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Package } from 'lucide-react';
import pageStyles from '../../admin.module.css';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductDetails(id);

  if (!product) notFound();

  return (
    <div className={pageStyles.page}>
      {/* Back + header */}
      <div>
        <Link href="/admin/products" className={pageStyles.cardLink} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
          <ChevronLeft size={14} /> Back to Products
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Package size={22} color="#2563eb" />
          </div>
          <div>
            <h1 className={pageStyles.pageTitle}>{product.name}</h1>
            <p className={pageStyles.pageSubtitle}>Technical specifications &amp; details</p>
          </div>
        </div>
      </div>

      {/* Form card */}
      <div className={pageStyles.card}>
        <div className={pageStyles.cardHeader}>
          <h2 className={pageStyles.cardTitle}>Product Specifications</h2>
        </div>
        <div style={{ padding: '24px' }}>
          <ProductDetailsForm productId={product.id} initialData={product.details as any} />
        </div>
      </div>
    </div>
  );
}
