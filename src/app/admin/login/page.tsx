'use client';

import { useActionState } from 'react';
import { login } from '@/lib/actions/auth';
import styles from './login.module.css';

export default function LoginPage() {
  const [state, action, isPending] = useActionState(login, null);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logo}>E</div>
          <h1 className={styles.brandName}>Eshan Enterprise</h1>
          <p className={styles.brandSub}>Admin Panel</p>
        </div>

        {/* Error */}
        {state?.error && (
          <div className={styles.error}>{state.error}</div>
        )}

        {/* Form */}
        <form action={action} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className={styles.input}
              placeholder="admin@eshanenterprise.com"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className={styles.input}
              placeholder="••••••••"
            />
          </div>
          <button type="submit" disabled={isPending} className={styles.btn}>
            {isPending ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
