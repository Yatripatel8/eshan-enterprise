'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon, X } from 'lucide-react';
import { createCategory, updateCategory, deleteCategory } from '@/lib/actions/category';
import styles from '../admin-table.module.css';

interface Category {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  _count?: { products: number };
}

export default function CategoryClient({ initialCategories }: { initialCategories: Category[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const openAdd = () => { setEditingCategory(null); setIsModalOpen(true); };
  const openEdit = (cat: Category) => { setEditingCategory(cat); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingCategory(null); };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = editingCategory
      ? await updateCategory(editingCategory.id, formData)
      : await createCategory(formData);
    if (result.success) {
      closeModal();
      window.location.reload();
    } else {
      alert(result.error);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? All related products will also be deleted.`)) return;
    const result = await deleteCategory(id);
    if (result.success) {
      window.location.reload();
    } else {
      alert(result.error);
    }
  };

  return (
    <div className={styles.wrap}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <div>
          <h1 className={styles.pageTitle}>Categories</h1>
          <p className={styles.pageSubtitle}>Manage your product categories</p>
        </div>
        <button className={styles.addBtn} onClick={openAdd}>
          <Plus size={16} /> Add Category
        </button>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>Image</th>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Slug</th>
              <th className={styles.th}>Products</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {initialCategories.length === 0 ? (
              <tr className={styles.emptyRow}>
                <td colSpan={5}>No categories yet. Add your first one!</td>
              </tr>
            ) : (
              initialCategories.map((cat) => (
                <tr key={cat.id}>
                  <td className={styles.td}>
                    <div className={styles.thumb}>
                      {cat.image
                        ? <img src={cat.image} alt={cat.name} />
                        : <ImageIcon size={18} className={styles.thumbPlaceholder} />}
                    </div>
                  </td>
                  <td className={styles.td}>
                    <p className={styles.cellName}>{cat.name}</p>
                  </td>
                  <td className={styles.td}>
                    <span className={`${styles.badge} ${styles.badgeGray}`}>{cat.slug}</span>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.badge}>{cat._count?.products ?? 0} products</span>
                  </td>
                  <td className={styles.tdRight}>
                    <div className={styles.actions}>
                      <button className={`${styles.iconBtn} ${styles.iconBtnEdit}`} onClick={() => openEdit(cat)} title="Edit">
                        <Edit2 size={15} />
                      </button>
                      <button className={`${styles.iconBtn} ${styles.iconBtnDelete}`} onClick={() => handleDelete(cat.id, cat.name)} title="Delete">
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
                {editingCategory ? 'Edit Category' : 'Add Category'}
              </h2>
              <button className={styles.modalClose} onClick={closeModal}><X size={16} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody}>
                <div className={styles.field}>
                  <label className={styles.label}>Name *</label>
                  <input name="name" required defaultValue={editingCategory?.name ?? ''} className={styles.input} placeholder="e.g. Bathroom Shelf" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Slug *</label>
                  <input name="slug" required defaultValue={editingCategory?.slug ?? ''} className={styles.input} placeholder="e.g. bathroom-shelf" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Image URL</label>
                  <input name="image" defaultValue={editingCategory?.image ?? ''} className={styles.input} placeholder="https://..." />
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button type="button" className={styles.cancelBtn} onClick={closeModal}>Cancel</button>
                <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                  {isLoading ? 'Saving…' : editingCategory ? 'Update Category' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
