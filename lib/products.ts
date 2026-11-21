import productsData from "@/data/products.json";

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  compareAt: number | null;
  rating: number;
  reviews: number;
  emoji: string;
  accent: string;
  badge: string | null;
  short: string;
  description: string;
  features: string[];
  sizes: string[];
  inStock: boolean;
};

export const products = productsData.products as Product[];

export const categories = Array.from(
  new Set(products.map((product) => product.category))
);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts(limit = 4): Product[] {
  return products.filter((product) => product.badge).slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const sameCategory = products.filter(
    (item) => item.category === product.category && item.slug !== product.slug
  );
  const others = products.filter(
    (item) => item.category !== product.category && item.slug !== product.slug
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const term = query.trim().toLowerCase();
  if (!term) return products;
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      product.short.toLowerCase().includes(term)
  );
}
