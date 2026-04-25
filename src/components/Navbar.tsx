'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const categories = [
  'Stainless steel napkin holder',
  'Bathroom shelf',
  'Stainless steel towel rack',
  'Stainless steel soap dish',
  'Stainless steel tumbler',
  'Stainless steel toilet paper holder',
  'Liquid dispenser',
  'ABS mirror cabinet',
];

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [isDesktopCatOpen, setIsDesktopCatOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsCatOpen(false);
    setIsDesktopCatOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
      setIsDesktopCatOpen(false);
    }
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={`container ${styles.navContainer}`}>
          <Link href="/" className={styles.logo}>
            {/* <h1>ESHAN<span>ENTERPRISE</span></h1> */}
            <img src="images/logo-eshan.svg" width={150} height={120} alt="" />
          </Link>

          {/* Desktop Links */}
          <ul className={styles.navLinks}>
            <li><Link href="/">Home</Link></li>
            <li 
              className={styles.dropdown}
              onMouseEnter={() => setIsDesktopCatOpen(true)}
              onMouseLeave={() => setIsDesktopCatOpen(false)}
            >
              <Link href="/categories">Our Categories</Link>
              <div className={`${styles.megaMenu} ${isDesktopCatOpen ? styles.showMega : ''}`}>
                <div className={styles.megaGrid}>
                  {categories.map((cat) => (
                    <Link 
                      key={cat} 
                      href={`/categories/${cat.toLowerCase().replace(/ /g, '-')}`}
                      onClick={() => setIsDesktopCatOpen(false)}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>

          <div className={styles.navActions}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <button type="submit" className={styles.navIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </form>
            <a href="https://wa.me/919825988354?text=Hi, I am interested in your products." target="_blank" rel="noopener noreferrer" className={`btn btn-primary ${styles.desktopBtn}`}>Enquire Now</a>

            {/* Hamburger Toggle */}
            <button
              className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`${styles.mobileDrawer} ${isMenuOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerHeader}>
          <Link href="/" className={styles.logo}>
            <h1>ESHAN<span>ENTERPRISE</span></h1>
          </Link>
          <button className={styles.closeBtn} onClick={() => setIsMenuOpen(false)}>&times;</button>
        </div>

        <div className={styles.drawerContent}>
          <form onSubmit={handleSearch} className={styles.mobileSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          <ul className={styles.drawerLinks}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li className={styles.drawerSection}>
              <button
                className={`${styles.accordionToggle} ${isCatOpen ? styles.active : ''}`}
                onClick={() => setIsCatOpen(!isCatOpen)}
              >
                Our Categories
                <span className={styles.arrow}>{isCatOpen ? '−' : '+'}</span>
              </button>
              <ul className={`${styles.mobileCategoryList} ${isCatOpen ? styles.catOpen : ''}`}>
                {categories.map((cat) => (
                  <li key={cat}>
                    <Link href={`/categories/${cat.toLowerCase().replace(/ /g, '-')}`}>
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          <div className={styles.drawerFooter}>
            <a href="https://wa.me/919825988354?text=Hi, I am interested in your products." target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'block', width: '100%', textAlign: 'center' }}>
              Enquire Now
            </a>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div className={`${styles.overlay} ${isMenuOpen ? styles.overlayVisible : ''}`} onClick={() => setIsMenuOpen(false)}></div>
    </>

  );
}
