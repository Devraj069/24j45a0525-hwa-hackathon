"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Minus, Plus, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products";

export function ProductPurchase({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const discount = product.compareAt
    ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
    : 0;

  function handleAdd() {
    addItem({
      slug: product.slug,
      name: product.name,
      size,
      price: product.price,
      emoji: product.emoji,
      accent: product.accent,
      quantity,
    });
    toast.success(`${product.name} added to cart`);
  }

  function handleBuyNow() {
    addItem({
      slug: product.slug,
      name: product.name,
      size,
      price: product.price,
      emoji: product.emoji,
      accent: product.accent,
      quantity,
    });
    router.push("/checkout");
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wide text-secondary-foreground">
          {product.category}
        </span>
        <span className="text-sm font-semibold text-muted-foreground">
          ⭐ {product.rating} · {product.reviews} reviews
        </span>
      </div>

      <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight text-brand-navy sm:text-4xl">
        {product.name}
      </h1>

      <div className="mt-4 flex flex-wrap items-baseline gap-3">
        <span className="font-display text-3xl font-extrabold text-brand-navy">
          {formatPrice(product.price)}
        </span>
        {product.compareAt && (
          <span className="text-lg text-muted-foreground line-through">
            {formatPrice(product.compareAt)}
          </span>
        )}
        {discount > 0 && (
          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-extrabold text-emerald-700">
            Save {discount}%
          </span>
        )}
      </div>

      <p className="mt-4 leading-relaxed text-muted-foreground">
        {product.description}
      </p>

      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
        {product.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <Check className="h-3 w-3" />
            </span>
            <span className="text-foreground/80">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <p className="text-sm font-bold">
          Size{" "}
          <span className="font-normal text-muted-foreground">· {size}</span>
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.sizes.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSize(option)}
              className={cn(
                "rounded-xl border px-4 py-2 text-sm font-bold transition",
                size === option
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground/70 hover:border-primary/40"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border bg-background p-1">
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-secondary disabled:opacity-40"
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center font-bold">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.min(20, value + 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-secondary"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <Button
          size="lg"
          onClick={handleAdd}
          className="flex-1 rounded-full px-6 text-base"
        >
          <ShoppingBag className="h-5 w-5" />
          Add to cart
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={handleBuyNow}
          className="flex-1 rounded-full px-6 text-base"
        >
          Buy now
        </Button>
      </div>

      <div className="mt-6 grid gap-2 rounded-2xl bg-secondary/60 p-4 text-sm sm:grid-cols-2">
        <span className="flex items-center gap-2 font-semibold text-secondary-foreground">
          <Truck className="h-4 w-4" /> Free shipping over ₹1,499
        </span>
        <span className="flex items-center gap-2 font-semibold text-secondary-foreground">
          <ShieldCheck className="h-4 w-4" /> 30-day happy-pup returns
        </span>
      </div>
    </div>
  );
}
