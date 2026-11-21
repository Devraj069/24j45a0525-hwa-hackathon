"use client";

import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductVisual } from "@/components/product-visual";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/utils";
import { calculateTotals, FREE_SHIPPING_THRESHOLD } from "@/lib/types";

export function CartView() {
  const { items, subtotal, updateQuantity, removeItem, count, isReady } =
    useCart();
  const { shipping, total } = calculateTotals(items);
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  if (!isReady) {
    return (
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="h-64 animate-pulse rounded-3xl border bg-card" />
        <div className="h-64 animate-pulse rounded-3xl border bg-card" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-3xl border border-dashed bg-card py-20 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary text-5xl">
          🐶
        </div>
        <div>
          <p className="font-display text-2xl font-bold">Your cart is empty</p>
          <p className="mt-1 text-muted-foreground">
            Let&apos;s find something to make their tail wag.
          </p>
        </div>
        <Button asChild size="lg" className="rounded-full px-7">
          <Link href="/products">
            <ShoppingBag className="h-5 w-5" />
            Start shopping
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1.6fr_1fr]">
      <div className="rounded-3xl border bg-card p-4 sm:p-5">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="font-display text-xl font-bold">
            Your items{" "}
            <span className="text-sm font-semibold text-muted-foreground">
              ({count})
            </span>
          </h2>
          <Link
            href="/products"
            className="text-sm font-bold text-primary hover:underline"
          >
            Continue shopping
          </Link>
        </div>

        <ul className="divide-y">
          {items.map((item) => (
            <li
              key={`${item.slug}-${item.size}`}
              className="flex gap-4 py-4 first:pt-5"
            >
              <ProductVisual
                emoji={item.emoji}
                accent={item.accent}
                name={item.name}
                className="h-24 w-24 shrink-0"
                emojiClassName="text-4xl"
              />
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link
                      href={`/products/${item.slug}`}
                      className="font-display text-lg font-bold leading-tight hover:text-primary"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {item.size} · {formatPrice(item.price)} each
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.slug, item.size)}
                    className="rounded-full p-2 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center gap-1 rounded-full border bg-background p-1">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.slug, item.size, item.quantity - 1)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-secondary disabled:opacity-40"
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-7 text-center text-sm font-bold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.slug, item.size, item.quantity + 1)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-secondary"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="font-display text-lg font-extrabold text-brand-navy">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="sticky top-24 rounded-3xl border bg-card p-5">
        <h2 className="font-display text-xl font-bold">Order summary</h2>

        {remaining > 0 ? (
          <div className="mt-4">
            <p className="text-xs font-semibold text-muted-foreground">
              Add {formatPrice(remaining)} more for free shipping
            </p>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{
                  width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                }}
              />
            </div>
          </div>
        ) : (
          <p className="mt-4 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
            Free shipping unlocked 🎉
          </p>
        )}

        <dl className="mt-5 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd className="font-semibold">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Shipping</dt>
            <dd className="font-semibold">
              {shipping === 0 ? "Free" : formatPrice(shipping)}
            </dd>
          </div>
          <div className="flex justify-between border-t pt-3 text-base">
            <dt className="font-bold">Total</dt>
            <dd className="font-display text-xl font-extrabold text-brand-navy">
              {formatPrice(total)}
            </dd>
          </div>
        </dl>

        <Button asChild size="lg" className="mt-5 w-full rounded-full text-base">
          <Link href="/checkout">
            Proceed to checkout
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          Secure payments · Free returns within 30 days
        </p>
      </div>
    </div>
  );
}
