"use client";

import Link from "next/link";
import { Plus, Star } from "lucide-react";
import { toast } from "sonner";
import { ProductVisual } from "@/components/product-visual";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  function quickAdd(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    addItem({
      slug: product.slug,
      name: product.name,
      size: product.sizes[0],
      price: product.price,
      emoji: product.emoji,
      accent: product.accent,
      quantity: 1,
    });
    toast.success(`${product.name} added to cart`);
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col rounded-3xl border bg-card p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/10"
    >
      <div className="relative">
        <ProductVisual
          emoji={product.emoji}
          accent={product.accent}
          name={product.name}
          imageSrc="/productpaw-v2.png"
          className="aspect-square w-full"
          emojiClassName="text-7xl"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-brand-navy px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white shadow-sm">
            {product.badge}
          </span>
        )}
        <button
          type="button"
          onClick={quickAdd}
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-navy shadow-md transition hover:bg-primary hover:text-white"
          aria-label={`Add ${product.name} to cart`}
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wide text-primary">
            {product.category}
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {product.rating}
          </span>
        </div>
        <h3 className="mt-1.5 font-display text-lg font-bold leading-tight">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {product.short}
        </p>
        <div className="mt-auto flex items-end justify-between pt-4">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl font-extrabold text-brand-navy">
              {formatPrice(product.price)}
            </span>
            {product.compareAt && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.compareAt)}
              </span>
            )}
          </div>
          <span className="text-xs font-semibold text-muted-foreground">
            {product.reviews} reviews
          </span>
        </div>
      </div>
    </Link>
  );
}
