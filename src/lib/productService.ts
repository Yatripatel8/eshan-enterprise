import { supabase } from "@/lib/supabase";

export async function getFeaturedProducts() {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_featured", true)
        .limit(4);

    if (error) {
        console.error("Error fetching featured products:", error.message || error);
        return [];
    }

    return data;
}

export async function getProductsByCategory(categoryId: string) {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category_id", categoryId);

    if (error) {
        console.error(`Error fetching products for category ${categoryId}:`, error.message || error);
        return [];
    }

    return data;
}

export async function getProductBySlug(slug: string) {
    const { data, error } = await supabase
        .from("products")
        .select(`
            *,
            product_images (*),
            product_specifications (*)
        `)
        .eq("slug", slug)
        .single();

    if (error) {
        console.error(`Error fetching product ${slug}:`, error);
        return null;
    }

    return data;
}

export async function getProductById(id: string) {
    const { data, error } = await supabase
        .from("products")
        .select(`
            *,
            product_images (*),
            product_specifications (*)
        `)
        .eq("id", id)
        .single();

    if (error) {
        console.error(`Error fetching product ${id}:`, error);
        return null;
    }

    return data;
}

export async function searchProducts(query: string) {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .ilike("name", `%${query}%`);

    if (error) {
        console.error(`Error searching products for ${query}:`, error.message || error);
        return [];
    }

    return data;
}
