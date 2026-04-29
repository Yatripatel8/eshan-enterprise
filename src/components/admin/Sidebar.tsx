'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Layers, Package, ChevronRight, ArrowLeft, LogOut } from 'lucide-react';
import { logout } from '@/lib/actions/auth';
import styles from './Sidebar.module.css';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Categories', href: '/admin/categories', icon: Layers },
  { name: 'Products', href: '/admin/products', icon: Package },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      {/* Brand */}
      <div className={styles.brand}>
        <div className={styles.logo}>E</div>
        <div>
          <p className={styles.brandName}>Eshan Enterprise</p>
          <p className={styles.brandSub}>Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className={styles.nav}>
        <p className={styles.navLabel}>Menu</p>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
            >
              <item.icon className={styles.navIcon} size={16} />
              <span>{item.name}</span>
              {isActive && <ChevronRight className={styles.navChevron} size={14} />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className={styles.sidebarFooter}>
        <Link href="/" className={styles.backLink}>
          <ArrowLeft size={14} />
          <span>Back to website</span>
        </Link>
        <form action={logout}>
          <button type="submit" className={styles.logoutBtn}>
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
