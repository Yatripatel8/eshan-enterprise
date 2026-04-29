'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getProducts() {
  try {
    return await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: { category: true, details: true },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const image = formData.get('image') as string;
  const shortDescription = formData.get('shortDescription') as string;
  const categoryId = formData.get('categoryId') as string;

  try {
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        image,
        shortDescription,
        categoryId,
        details: {
          create: {} // Create empty details row
        }
      },
    });
    revalidatePath('/admin/products');
    return { success: true, id: product.id };
  } catch (error) {
    console.error('Error creating product:', error);
    return { error: 'Failed to create product' };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const image = formData.get('image') as string;
  const shortDescription = formData.get('shortDescription') as string;
  const categoryId = formData.get('categoryId') as string;

  try {
    await prisma.product.update({
      where: { id },
      data: { name, slug, image, shortDescription, categoryId },
    });
    revalidatePath('/admin/products');
    return { success: true };
  } catch (error) {
    console.error('Error updating product:', error);
    return { error: 'Failed to update product' };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });
    revalidatePath('/admin/products');
    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { error: 'Failed to delete product' };
  }
}

export async function getProductDetails(id: string) {
  try {
    return await prisma.product.findUnique({
      where: { id },
      include: { details: true, category: true },
    });
  } catch (error) {
    console.error('Error fetching product details:', error);
    return null;
  }
}

export async function updateProductDetails(productId: string, formData: FormData) {
  const material = formData.get('material') as string;
  const size = parseFloat(formData.get('size') as string) || 0;
  const colour = formData.get('colour') as string;
  const specificFeatures = formData.get('specificFeatures') as string;

  try {
    await prisma.productDetails.upsert({
      where: { productId },
      update: { material, size, colour, specificFeatures },
      create: { productId, material, size, colour, specificFeatures },
    });
    revalidatePath(`/admin/products/${productId}`);
    return { success: true };
  } catch (error) {
    console.error('Error updating product details:', error);
    return { error: 'Failed to update product details' };
  }
}
