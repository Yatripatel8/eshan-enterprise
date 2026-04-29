'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon, Settings, X, CheckCircle, Circle } from 'lucide-react';
import { createProduct, updateProduct, deleteProduct } from '@/lib/actions/product';
import Link from 'next/link';
import styles from '../admin-table.module.css';

interface ProductDetails {
  material: string | null;
  size: number | null;
  colour: string | null;
  specificFeatures: string | null;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  shortDescription: string | null;
  categoryId: string;
  category: { name: string };
  details: ProductDetails | null;
}

interface Category {
  id: string;
  name: string;
}

function hasSpecs(d: ProductDetails | null) {
  return d && (d.material || d.size || d.colour || d.specificFeatures);
}

export default function ProductClient({
  initialProducts,
  categories,
}: {
  initialProducts: Product[];
  categories: Category[];
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const openAdd = () => { setEditingProduct(null); setIsModalOpen(true); };
  const openEdit = (p: Product) => { setEditingProduct(p); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingProduct(null); };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = editingProduct
      ? await updateProduct(editingProduct.id, formData)
      : await createProduct(formData);
    if (result.success) {
      closeModal();
      window.location.reload();
    } else {
      alert(result.error);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    const result = await deleteProduct(id);
    if (result.success) {
      window.location.reload();
    } else {
      alert(result.error);
    }
  };

  const specsComplete = initialProducts.filter(p => hasSpecs(p.details)).length;

  return (
    <div className={styles.wrap}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <div>
          <h1 className={styles.pageTitle}>Products</h1>
          <p className={styles.pageSubtitle}>
            {initialProducts.length} products &mdash; {specsComplete} with specifications filled
          </p>
        </div>
        <button className={styles.addBtn} onClick={openAdd}>
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>Image</th>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Category</th>
              <th className={styles.th}>Specifications</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {initialProducts.length === 0 ? (
              <tr className={styles.emptyRow}>
                <td colSpan={5}>No products yet. Add your first one!</td>
              </tr>
            ) : (
              initialProducts.map((prod) => (
                <tr key={prod.id}>
                  <td className={styles.td}>
                    <div className={styles.thumb}>
                      {prod.image
                        ? <img src={prod.image} alt={prod.name} />
                        : <ImageIcon size={18} className={styles.thumbPlaceholder} />}
                    </div>
                  </td>
                  <td className={styles.td}>
                    <p className={styles.cellName}>{prod.name}</p>
                    <p className={styles.cellMeta}>{prod.slug}</p>
                  </td>
                  <td className={styles.td}>
                    <span className={`${styles.badge} ${styles.badgeGray}`}>{prod.category.name}</span>
                  </td>
                  <td className={styles.td}>
                    <Link href={`/admin/products/${prod.id}`} className={styles.specsLink}>
                      {hasSpecs(prod.details)
                        ? <><CheckCircle size={13} style={{ color: '#16a34a' }} /> Filled &nbsp;·&nbsp; Edit</>
                        : <><Circle size={13} style={{ color: '#f59e0b' }} /> Empty &nbsp;·&nbsp; Add</>}
                    </Link>
                  </td>
                  <td className={styles.tdRight}>
                    <div className={styles.actions}>
                      <button className={`${styles.iconBtn} ${styles.iconBtnEdit}`} onClick={() => openEdit(prod)} title="Edit product">
                        <Edit2 size={15} />
                      </button>
                      <button className={`${styles.iconBtn} ${styles.iconBtnDelete}`} onClick={() => handleDelete(prod.id, prod.name)} title="Delete product">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                {editingProduct ? 'Edit Product' : 'Add Product'}
              </h2>
              <button className={styles.modalClose} onClick={closeModal}><X size={16} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody}>
                <div className={styles.field}>
                  <label className={styles.label}>Name *</label>
                  <input name="name" required defaultValue={editingProduct?.name ?? ''} className={styles.input} placeholder="e.g. Wave Napkin Holder" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Slug *</label>
                  <input name="slug" required defaultValue={editingProduct?.slug ?? ''} className={styles.input} placeholder="e.g. wave-napkin-holder" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Category *</label>
                  <select name="categoryId" required defaultValue={editingProduct?.categoryId ?? ''} className={styles.select}>
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Image URL</label>
                  <input name="image" defaultValue={editingProduct?.image ?? ''} className={styles.input} placeholder="https://..." />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Short Description</label>
                  <textarea name="shortDescription" rows={3} defaultValue={editingProduct?.shortDescription ?? ''} className={styles.textarea} placeholder="Brief product description…" />
                </div>
                {!editingProduct && (
                  <p className={styles.modalHint}>
                    After creating the product, click <strong>Specifications</strong> in the table to add material, size, colour and features.
                  </p>
                )}
              </div>
              <div className={styles.modalFooter}>
                <button type="button" className={styles.cancelBtn} onClick={closeModal}>Cancel</button>
                <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                  {isLoading ? 'Saving…' : editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
