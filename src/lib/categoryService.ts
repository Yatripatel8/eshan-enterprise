import { supabase } from "@/lib/supabase";

export async function getCategories() {
    const { data, error } = await supabase
        .from("categories")
        .select("*");

    if (error) {
        console.error("Error fetching categories:", error.message || error);
        return [];
    }

    return data;
}

export async function getCategoryBySlug(slug: string) {
    const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error) {
        console.error(`Error fetching category ${slug}:`, error);
        return null;
    }

    return data;
}