import prisma from '@/lib/prisma';
import { Layers, Package, Clock } from 'lucide-react';
import Link from 'next/link';
import styles from './admin.module.css';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [categoryCount, productCount, latestProducts] = await Promise.all([
    prisma.category.count(),
    prisma.product.count(),
    prisma.product.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { category: true },
    }),
  ]);

  const stats = [
    { name: 'Total Categories', value: categoryCount, icon: Layers, colorClass: styles.iconBlue },
    { name: 'Total Products', value: productCount, icon: Package, colorClass: styles.iconPurple },
    { name: 'Recent (last 5)', value: latestProducts.length, icon: Clock, colorClass: styles.iconOrange },
  ];

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageSubtitle}>Welcome back! Here's what's happening with your store.</p>
        </div>
        <div className={styles.headerActions}>
          <Link href="/admin/categories" className={styles.btnOutline}>Manage Categories</Link>
          <Link href="/admin/products" className={styles.btnPrimary}>Add Product</Link>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <div key={stat.name} className={styles.statCard}>
            <div className={`${styles.statIcon} ${stat.colorClass}`}>
              <stat.icon size={22} />
            </div>
            <div className={styles.statBody}>
              <p className={styles.statName}>{stat.name}</p>
              <p className={styles.statValue}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Products */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Recently Added Products</h2>
          <Link href="/admin/products" className={styles.cardLink}>View all →</Link>
        </div>
        <div className={styles.productList}>
          {latestProducts.length === 0 ? (
            <div className={styles.emptyState}>
              <Package size={32} className={styles.emptyIcon} />
              <p className={styles.emptyText}>No products yet. Start by adding some!</p>
              <Link href="/admin/products" className={styles.btnPrimary}>Add First Product</Link>
            </div>
          ) : (
            latestProducts.map((product) => (
              <div key={product.id} className={styles.productRow}>
                <div className={styles.productThumb}>
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    <Package size={18} className={styles.productPlaceholder} />
                  )}
                </div>
                <div className={styles.productInfo}>
                  <p className={styles.productName}>{product.name}</p>
                  <p className={styles.productCategory}>{product.category.name}</p>
                </div>
                <p className={styles.productDate}>
                  {new Date(product.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  })}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
