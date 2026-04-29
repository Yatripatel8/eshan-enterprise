'use client';

import { useState } from 'react';
import { updateProductDetails } from '@/lib/actions/product';
import { Save, CheckCircle, AlertCircle } from 'lucide-react';
import styles from './details.module.css';

interface ProductDetails {
  material: string | null;
  size: number | null;
  colour: string | null;
  specificFeatures: string | null;
}

export default function ProductDetailsForm({
  productId,
  initialData,
}: {
  productId: string;
  initialData: ProductDetails | null;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    const formData = new FormData(e.currentTarget);
    const result = await updateProductDetails(productId, formData);
    setMessage(
      result.success
        ? { type: 'success', text: 'Specifications saved successfully!' }
        : { type: 'error', text: result.error ?? 'Something went wrong' }
    );
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {message && (
        <div className={`${styles.alert} ${message.type === 'success' ? styles.alertSuccess : styles.alertError}`}>
          {message.type === 'success'
            ? <CheckCircle size={16} />
            : <AlertCircle size={16} />}
          <span>{message.text}</span>
        </div>
      )}

      <div className={styles.grid}>
        <div className={styles.field}>
          <label className={styles.label}>Material</label>
          <input name="material" defaultValue={initialData?.material ?? ''} className={styles.input} placeholder="e.g. 304 Grade Stainless Steel" />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Size (mm / inch)</label>
          <input name="size" type="number" step="0.01" defaultValue={initialData?.size ?? ''} className={styles.input} placeholder="e.g. 24" />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Colour / Finish</label>
          <input name="colour" defaultValue={initialData?.colour ?? ''} className={styles.input} placeholder="e.g. Mirror Polish / Chrome" />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Specific Features</label>
        <textarea name="specificFeatures" rows={5} defaultValue={initialData?.specificFeatures ?? ''} className={styles.textarea} placeholder="Detailed description of features, installation notes, etc." />
      </div>

      <div className={styles.footer}>
        <button type="submit" disabled={isLoading} className={styles.saveBtn}>
          <Save size={15} />
          {isLoading ? 'Saving…' : 'Save Specifications'}
        </button>
      </div>
    </form>
  );
}
