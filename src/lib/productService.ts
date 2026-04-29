import prisma from "@/lib/prisma";

export async function getFeaturedProducts() {
  try {
    return await prisma.product.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

export async function getProductsByCategory(categoryId: string) {
  try {
    return await prisma.product.findMany({
      where: { categoryId }
    });
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error);
    return [];
  }
}

export async function getProductBySlug(slug: string) {
  try {
    return await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        details: true
      }
    });
  } catch (error) {
    console.error(`Error fetching product ${slug}:`, error);
    return null;
  }
}

export async function getProductById(id: string) {
  try {
    return await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        details: true
      }
    });
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

export async function searchProducts(query: string) {
  try {
    return await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { shortDescription: { contains: query, mode: 'insensitive' } }
        ]
      },
      include: { category: true }
    });
  } catch (error) {
    console.error(`Error searching products for ${query}:`, error);
    return [];
  }
}
