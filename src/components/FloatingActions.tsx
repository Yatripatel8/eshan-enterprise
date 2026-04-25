"use client";

import { useState, useEffect } from 'react';
import styles from './FloatingActions.module.css';

export default function FloatingActions() {
  const [isExpanded, setIsExpanded] = useState(false);
  const phoneNumber = '+919825988354';

  // Collapse by default on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsExpanded(window.innerWidth > 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`${styles.floatingActions} ${isExpanded ? styles.expanded : styles.collapsed}`}>
      <button className={styles.toggleBtn} onClick={toggleMenu} aria-label="Toggle Contact Menu">
        <span className={styles.desktopArrow}>{isExpanded ? '→' : '←'}</span>
        <span className={styles.mobileArrow}>{isExpanded ? '↓' : '↑'}</span>
      </button>
      
      <div className={styles.actionButtons}>
        <a 
          href={`https://wa.me/${phoneNumber.replace('+', '')}`} 
          className={styles.whatsappBtn}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.411 0 .01 5.403.007 12.04c0 2.12.552 4.188 1.597 6.049L0 24l6.135-1.61a11.8 11.8 0 005.91 1.586h.005c6.637 0 12.038-5.403 12.04-12.04a11.813 11.813 0 00-3.578-8.487z"/>
          </svg>
          <span className={styles.btnLabel}>WhatsApp</span>
        </a>
        <a 
          href={`tel:${phoneNumber}`} 
          className={styles.callBtn}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 00-1.02.24l-2.2 2.2a15.045 15.045 0 01-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02A11.36 11.36 0 018.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM4.03 5h2.26c.11.8.29 1.57.54 2.31L5.35 8.79a17.13 17.13 0 01-1.32-3.79zM19 19.97c-1.39 0-2.74-.24-4.01-.68l1.47-1.47c.74.25 1.51.43 2.31.54v1.61z"/>
          </svg>
          <span className={styles.btnLabel}>Call Us</span>
        </a>
      </div>
    </div>
  );
}
