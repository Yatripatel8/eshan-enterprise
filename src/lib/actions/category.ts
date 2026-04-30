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

export async function createCategory(formData: FormData) {
  const name = formData.get('name') as string;
  const slug = generateSlug(name);
  
  const imageFile = formData.get('imageFile') as File | null;
  const existingImage = formData.get('existingImage') as string;
  let image = existingImage || '';
  if (imageFile && imageFile.size > 0 && imageFile.name !== 'undefined') {
    image = (await saveImage(imageFile)) || image;
  }

  try {
    await prisma.category.create({
      data: { name, slug, image },
    });
    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error: any) {
    console.error('Error:', error);
    if (error.code === 'P2002') {
      return { error: 'A category with a similar name already exists.' };
    }
    return { error: 'Failed to save category' };
  }
}

export async function updateCategory(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const slug = generateSlug(name);
  
  const imageFile = formData.get('imageFile') as File | null;
  const existingImage = formData.get('existingImage') as string;
  let image = existingImage || '';
  if (imageFile && imageFile.size > 0 && imageFile.name !== 'undefined') {
    image = (await saveImage(imageFile)) || image;
  }

  try {
    await prisma.category.update({
      where: { id },
      data: { name, slug, image },
    });
    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error: any) {
    console.error('Error:', error);
    if (error.code === 'P2002') {
      return { error: 'A category with a similar name already exists.' };
    }
    return { error: 'Failed to save category' };
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
