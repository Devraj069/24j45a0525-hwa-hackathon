"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Lock, ShoppingBag, Truck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProductVisual } from "@/components/product-visual";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/utils";
import { calculateTotals } from "@/lib/types";

type Config = { razorpayEnabled: boolean; keyId: string | null };

type RazorpayResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayInstance = { open: () => void };

type RazorpayConstructor = new (options: Record<string, unknown>) => RazorpayInstance;

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    const existing = (window as unknown as { Razorpay?: unknown }).Razorpay;
    if (existing) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function CheckoutView() {
  const router = useRouter();
  const { items, subtotal, clearCart, isReady } = useCart();
  const { shipping, total } = calculateTotals(items);

  const [form, setForm] = useState(emptyForm);
  const [method, setMethod] = useState<"cod" | "razorpay">("cod");
  const [config, setConfig] = useState<Config>({
    razorpayEnabled: false,
    keyId: null,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/config")
      .then((response) => response.json())
      .then((data: Config) => setConfig(data))
      .catch(() => setConfig({ razorpayEnabled: false, keyId: null }));
  }, []);

  function updateField(field: keyof typeof emptyForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function validate(): string | null {
    if (!form.name.trim()) return "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "Please enter a valid email address.";
    if (!/^[0-9+\-\s]{7,15}$/.test(form.phone))
      return "Please enter a valid phone number.";
    if (!form.address.trim()) return "Please enter your delivery address.";
    if (!form.city.trim()) return "Please enter your city.";
    if (!form.state.trim()) return "Please enter your state.";
    if (!/^[0-9]{6}$/.test(form.pincode))
      return "Please enter a valid 6-digit pincode.";
    return null;
  }

  function finish(order: unknown) {
    try {
      window.localStorage.setItem("hwa-last-order", JSON.stringify(order));
    } catch {
      return;
    }
  }

  async function placeOrder(
    payment:
      | { method: "cod" }
      | {
          method: "razorpay";
          razorpayOrderId: string;
          razorpayPaymentId: string;
          razorpaySignature: string;
        }
  ) {
    const payloadItems = items.map((item) => ({
      slug: item.slug,
      size: item.size,
      quantity: item.quantity,
    }));

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: payloadItems,
        customer: form,
        payment,
      }),
    });

    const data = await response.json();
    if (!response.ok || !data.ok) {
      throw new Error(data.error ?? "Could not place your order.");
    }

    finish(data.order);
    clearCart();
    router.push("/order/success");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    setSubmitting(true);

    try {
      if (method === "razorpay" && config.razorpayEnabled) {
        const loaded = await loadRazorpayScript();
        if (!loaded) {
          throw new Error("Could not load the payment window. Please retry.");
        }

        const orderResponse = await fetch("/api/razorpay/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((item) => ({
              slug: item.slug,
              quantity: item.quantity,
            })),
          }),
        });
        const orderData = await orderResponse.json();
        if (!orderResponse.ok || !orderData.ok) {
          throw new Error(orderData.error ?? "Could not start payment.");
        }

        const RazorpayCtor = (
          window as unknown as { Razorpay: RazorpayConstructor }
        ).Razorpay;

        const razorpay = new RazorpayCtor({
          key: orderData.keyId,
          amount: orderData.order.amount,
          currency: orderData.order.currency,
          name: "Happy While Away",
          description: "Order payment",
          order_id: orderData.order.id,
          prefill: {
            name: form.name,
            email: form.email,
            contact: form.phone,
          },
          theme: { color: "#4a76b8" },
          modal: {
            ondismiss: () => setSubmitting(false),
          },
          handler: async (response: RazorpayResponse) => {
            try {
              await placeOrder({
                method: "razorpay",
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              });
            } catch (error) {
              toast.error(
                error instanceof Error
                  ? error.message
                  : "Payment succeeded but the order could not be saved."
              );
              setSubmitting(false);
            }
          },
        });

        razorpay.open();
        return;
      }

      await placeOrder({ method: "cod" });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong."
      );
      setSubmitting(false);
    }
  }

  if (!isReady) {
    return (
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="h-96 animate-pulse rounded-3xl border bg-card" />
        <div className="h-96 animate-pulse rounded-3xl border bg-card" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-3xl border border-dashed bg-card py-20 text-center">
        <span className="text-5xl">🛍️</span>
        <div>
          <p className="font-display text-2xl font-bold">
            Nothing to check out yet
          </p>
          <p className="mt-1 text-muted-foreground">
            Add a few favourites and come back.
          </p>
        </div>
        <Button asChild size="lg" className="rounded-full px-7">
          <Link href="/products">
            <ShoppingBag className="h-5 w-5" />
            Browse products
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid items-start gap-6 lg:grid-cols-[1.5fr_1fr]"
    >
      <div className="space-y-6">
        <div className="rounded-3xl border bg-card p-5 sm:p-6">
          <h2 className="font-display text-xl font-bold">Delivery details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="Riya Sharma"
                className="mt-1.5"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="you@example.com"
                className="mt-1.5"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                placeholder="9876543210"
                className="mt-1.5"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={form.address}
                onChange={(event) => updateField("address", event.target.value)}
                placeholder="Flat, street, area, landmark"
                className="mt-1.5"
                rows={3}
                required
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={form.city}
                onChange={(event) => updateField("city", event.target.value)}
                placeholder="Hyderabad"
                className="mt-1.5"
                required
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={form.state}
                onChange={(event) => updateField("state", event.target.value)}
                placeholder="Telangana"
                className="mt-1.5"
                required
              />
            </div>
            <div>
              <Label htmlFor="pincode">Pincode</Label>
              <Input
                id="pincode"
                inputMode="numeric"
                value={form.pincode}
                onChange={(event) =>
                  updateField("pincode", event.target.value.replace(/\D/g, ""))
                }
                placeholder="500001"
                maxLength={6}
                className="mt-1.5"
                required
              />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border bg-card p-5 sm:p-6">
          <h2 className="font-display text-xl font-bold">Payment</h2>
          <div className="mt-4 space-y-3">
            <button
              type="button"
              onClick={() => setMethod("cod")}
              className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition ${
                method === "cod"
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "hover:border-primary/40"
              }`}
            >
              <span
                className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                  method === "cod" ? "border-primary" : "border-muted-foreground"
                }`}
              >
                {method === "cod" && (
                  <span className="h-2 w-2 rounded-full bg-primary" />
                )}
              </span>
              <span>
                <span className="block font-bold">Cash on Delivery</span>
                <span className="block text-sm text-muted-foreground">
                  Pay when your order arrives. Safe and simple.
                </span>
              </span>
            </button>

            {config.razorpayEnabled && (
              <button
                type="button"
                onClick={() => setMethod("razorpay")}
                className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition ${
                  method === "razorpay"
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "hover:border-primary/40"
                }`}
              >
                <span
                  className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                    method === "razorpay"
                      ? "border-primary"
                      : "border-muted-foreground"
                  }`}
                >
                  {method === "razorpay" && (
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </span>
                <span>
                  <span className="flex items-center gap-2 font-bold">
                    Pay online
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-secondary-foreground">
                      Razorpay
                    </span>
                  </span>
                  <span className="block text-sm text-muted-foreground">
                    UPI, cards, netbanking and wallets. Fully secured.
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="sticky top-24 rounded-3xl border bg-card p-5">
        <h2 className="font-display text-xl font-bold">Order summary</h2>

        <ul className="mt-4 space-y-3">
          {items.map((item) => (
            <li key={`${item.slug}-${item.size}`} className="flex gap-3">
              <ProductVisual
                emoji={item.emoji}
                accent={item.accent}
                name={item.name}
                imageSrc="/productpaw-v2.png"
                className="h-14 w-14 shrink-0"
                emojiClassName="text-2xl"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold leading-tight">
                  {item.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.size} × {item.quantity}
                </p>
              </div>
              <span className="text-sm font-semibold">
                {formatPrice(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>

        <dl className="mt-5 space-y-2 border-t pt-4 text-sm">
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

        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          className="mt-5 w-full rounded-full text-base"
        >
          {submitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Placing order…
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" />
              Place order
            </>
          )}
        </Button>

        <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <Truck className="h-3.5 w-3.5" />
          Dispatched within 24 hours
        </div>
      </div>
    </form>
  );
}
