import prisma from "@/lib/prisma";

export async function getCategories() {
  try {
    return await prisma.category.findMany({
      orderBy: { name: 'asc' }
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string) {
  try {
    return await prisma.category.findUnique({
      where: { slug }
    });
  } catch (error) {
    console.error(`Error fetching category ${slug}:`, error);
    return null;
  }
}