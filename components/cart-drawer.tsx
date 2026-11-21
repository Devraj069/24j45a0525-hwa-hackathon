"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ProductVisual } from "@/components/product-visual";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/utils";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/types";

type CartDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, subtotal, updateQuantity, removeItem, count } = useCart();
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b px-5 py-4">
          <SheetTitle className="flex items-center gap-2 font-display text-xl">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Your cart
            <span className="ml-1 rounded-full bg-secondary px-2 py-0.5 text-xs font-bold text-secondary-foreground">
              {count}
            </span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary text-5xl">
              🐶
            </div>
            <div>
              <p className="font-display text-lg font-bold">
                Your cart is feeling light
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Add a little joy for your pup and come back here.
              </p>
            </div>
            <Button asChild onClick={() => onOpenChange(false)}>
              <Link href="/products">Start shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={`${item.slug}-${item.size}`}
                    className="flex gap-3 rounded-2xl border bg-card p-3"
                  >
                    <ProductVisual
                      emoji={item.emoji}
                      accent={item.accent}
                      name={item.name}
                      className="h-20 w-20 shrink-0"
                      emojiClassName="text-3xl"
                    />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate font-semibold leading-tight">
                            {item.name}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {item.size}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.slug, item.size)}
                          className="rounded-full p-1 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1 rounded-full border bg-background p-0.5">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.slug,
                                item.size,
                                item.quantity - 1
                              )
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-secondary disabled:opacity-40"
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-bold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.slug,
                                item.size,
                                item.quantity + 1
                              )
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-secondary"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="font-display font-bold">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t bg-card px-5 py-4">
              {remaining > 0 ? (
                <p className="mb-3 rounded-xl bg-secondary px-3 py-2 text-xs font-semibold text-secondary-foreground">
                  You&apos;re {formatPrice(remaining)} away from free shipping.
                </p>
              ) : (
                <p className="mb-3 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                  You&apos;ve unlocked free shipping.
                </p>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-display text-lg font-bold">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <Button asChild className="mt-3 w-full" size="lg">
                <Link href="/checkout" onClick={() => onOpenChange(false)}>
                  Checkout
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="mt-2 w-full"
                onClick={() => onOpenChange(false)}
              >
                Continue shopping
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
