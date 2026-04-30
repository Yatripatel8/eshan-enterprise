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

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);
}

async function saveImage(file: File | null): Promise<string | null> {
  if (!file || file.size === 0 || !file.name || file.name === 'undefined') return null;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'eshan-enterprise' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result?.secure_url || null);
      }
    );
    uploadStream.end(buffer);
  });
}

export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const slug = generateSlug(name);
  const shortDescription = formData.get('shortDescription') as string;
  const categoryId = formData.get('categoryId') as string;

  const imageFile = formData.get('imageFile') as File | null;
  const existingImage = formData.get('existingImage') as string;
  let image = existingImage || '';
  if (imageFile && imageFile.size > 0 && imageFile.name !== 'undefined') {
    image = (await saveImage(imageFile)) || image;
  }

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
  } catch (error: any) {
    console.error('Error:', error);
    if (error.code === 'P2002') {
      return { error: 'A product with a similar name already exists.' };
    }
    return { error: 'Failed to save product' };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const slug = generateSlug(name);
  const shortDescription = formData.get('shortDescription') as string;
  const categoryId = formData.get('categoryId') as string;

  const imageFile = formData.get('imageFile') as File | null;
  const existingImage = formData.get('existingImage') as string;
  let image = existingImage || '';
  if (imageFile && imageFile.size > 0 && imageFile.name !== 'undefined') {
    image = (await saveImage(imageFile)) || image;
  }

  try {
    await prisma.product.update({
      where: { id },
      data: { name, slug, image, shortDescription, categoryId },
    });
    revalidatePath('/admin/products');
    return { success: true };
  } catch (error: any) {
    console.error('Error:', error);
    if (error.code === 'P2002') {
      return { error: 'A product with a similar name already exists.' };
    }
    return { error: 'Failed to save product' };
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
