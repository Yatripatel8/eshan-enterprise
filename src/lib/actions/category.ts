'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getCategories() {
  try {
    return await prisma.category.findMany({
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { products: true } } },
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function createCategory(formData: FormData) {
  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const image = formData.get('image') as string;

  try {
    await prisma.category.create({
      data: { name, slug, image },
    });
    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error) {
    console.error('Error creating category:', error);
    return { error: 'Failed to create category' };
  }
}

export async function updateCategory(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const image = formData.get('image') as string;

  try {
    await prisma.category.update({
      where: { id },
      data: { name, slug, image },
    });
    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error) {
    console.error('Error updating category:', error);
    return { error: 'Failed to update category' };
  }
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({
      where: { id },
    });
    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error) {
    console.error('Error deleting category:', error);
    return { error: 'Failed to delete category' };
  }
}
