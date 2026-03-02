import { createClient } from './supabase';
import { Product, Category } from '@/types';

const supabase = createClient();

export async function getProducts(): Promise<Product[]> {
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  if (!products) return [];

  // Transform the data to match the Product type
  return products.map((product: any) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description || '',
    price: parseFloat(product.price as unknown as string),
    compareAtPrice: product.compare_at_price ? parseFloat(product.compare_at_price as unknown as string) : undefined,
    images: [], // This would need to be fetched separately from product_images table
    category: product.category ? {
      id: product.category.id,
      name: product.category.name,
      slug: product.category.slug,
      isActive: product.category.is_active
    } : ({} as Category),
    inventory: product.inventory_quantity || 0,
    sku: product.sku,
    isFeatured: product.is_featured || false,
    isActive: product.is_active || true,
    createdAt: new Date(product.created_at),
    updatedAt: new Date(product.updated_at)
  }));
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(product => product.isFeatured);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      images:product_images(*)
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error || !product) {
    console.error('Error fetching product:', error);
    return null;
  }

  const images = product.images?.map((img: any) => img.url) || ['/placeholder-product.jpg'];

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description || '',
    price: parseFloat(product.price as unknown as string),
    compareAtPrice: product.compare_at_price ? parseFloat(product.compare_at_price as unknown as string) : undefined,
    images: images,
    category: product.category ? {
      id: product.category.id,
      name: product.category.name,
      slug: product.category.slug,
      isActive: product.category.is_active
    } : ({} as Category),
    inventory: product.inventory_quantity || 0,
    sku: product.sku,
    isFeatured: product.is_featured || false,
    isActive: product.is_active || true,
    createdAt: new Date(product.created_at),
    updatedAt: new Date(product.updated_at)
  };
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('category.slug', categorySlug)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }

  if (!products) return [];

  return products.map((product: any) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description || '',
    price: parseFloat(product.price as unknown as string),
    compareAtPrice: product.compare_at_price ? parseFloat(product.compare_at_price as unknown as string) : undefined,
    images: [],
    category: product.category ? {
      id: product.category.id,
      name: product.category.name,
      slug: product.category.slug,
      isActive: product.category.is_active
    } : ({} as Category),
    inventory: product.inventory_quantity || 0,
    sku: product.sku,
    isFeatured: product.is_featured || false,
    isActive: product.is_active || true,
    createdAt: new Date(product.created_at),
    updatedAt: new Date(product.updated_at)
  }));
}

export async function searchProducts(query: string): Promise<Product[]> {
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*)
    `)
    .or(`name.ilike.%${query}%,description.ilike.%${query}%,sku.ilike.%${query}%`)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error searching products:', error);
    return [];
  }

  if (!products) return [];

  return products.map((product: any) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description || '',
    price: parseFloat(product.price as unknown as string),
    compareAtPrice: product.compare_at_price ? parseFloat(product.compare_at_price as unknown as string) : undefined,
    images: [],
    category: product.category ? {
      id: product.category.id,
      name: product.category.name,
      slug: product.category.slug,
      isActive: product.category.is_active
    } : ({} as Category),
    inventory: product.inventory_quantity || 0,
    sku: product.sku,
    isFeatured: product.is_featured || false,
    isActive: product.is_active || true,
    createdAt: new Date(product.created_at),
    updatedAt: new Date(product.updated_at)
  }));
}
