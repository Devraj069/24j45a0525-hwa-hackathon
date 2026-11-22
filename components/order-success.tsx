"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Check, Package, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/lib/types";

export function OrderSuccess() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("hwa-last-order");
      if (raw) setOrder(JSON.parse(raw) as Order);
    } catch {
      setOrder(null);
    }
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="h-72 animate-pulse rounded-3xl border bg-card" />
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-3xl border bg-card py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <Check className="h-10 w-10" />
        </div>
        <div>
          <p className="font-display text-2xl font-bold">Thank you!</p>
          <p className="mt-1 text-muted-foreground">
            Your order has been received. A confirmation is on its way.
          </p>
        </div>
        <Button asChild size="lg" className="rounded-full px-7">
          <Link href="/products">Continue shopping</Link>
        </Button>
      </div>
    );
  }

  const firstName = order.customer.name.split(" ")[0] || "friend";
  const paid = order.payment.status === "paid";

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
        >
          <Check className="h-10 w-10" />
        </motion.div>
        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wide text-secondary-foreground">
          <PartyPopper className="h-3.5 w-3.5" />
          {paid ? "Payment received" : "Order placed"}
        </span>
        <h1 className="mt-3 font-display text-[2.1rem] font-extrabold leading-tight text-brand-navy sm:text-4xl">
          Thank you, {firstName}!
        </h1>
        <p className="mt-2 max-w-md text-muted-foreground">
          Your order is confirmed and the tail wags are on their way. We&apos;ll
          email you tracking details soon.
        </p>
        <p className="mt-3 rounded-full border bg-card px-4 py-1.5 text-sm font-bold">
          Order ID: {order.id}
        </p>
      </div>

      <div className="mt-8 rounded-3xl border bg-card p-5 sm:p-6">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold">
          <Package className="h-5 w-5 text-primary" />
          Order summary
        </h2>
        <ul className="mt-4 divide-y">
          {order.items.map((item) => (
            <li
              key={`${item.slug}-${item.size}`}
              className="flex items-center justify-between gap-3 py-3 text-sm"
            >
              <div>
                <p className="font-bold">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.size} × {item.quantity}
                </p>
              </div>
              <span className="font-semibold">
                {formatPrice(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <dl className="mt-3 space-y-2 border-t pt-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd className="font-semibold">{formatPrice(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Shipping</dt>
            <dd className="font-semibold">
              {order.shipping === 0 ? "Free" : formatPrice(order.shipping)}
            </dd>
          </div>
          <div className="flex justify-between text-base">
            <dt className="font-bold">Total</dt>
            <dd className="font-display text-lg font-extrabold text-brand-navy">
              {formatPrice(order.total)}
            </dd>
          </div>
        </dl>

        <div className="mt-5 grid gap-4 rounded-2xl bg-secondary/50 p-4 text-sm sm:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Delivering to
            </p>
            <p className="mt-1 font-semibold">{order.customer.name}</p>
            <p className="text-muted-foreground">
              {order.customer.address}, {order.customer.city},{" "}
              {order.customer.state} — {order.customer.pincode}
            </p>
            <p className="text-muted-foreground">{order.customer.phone}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Payment
            </p>
            <p className="mt-1 font-semibold">
              {order.payment.method === "razorpay"
                ? "Paid online (Razorpay)"
                : "Cash on Delivery"}
            </p>
            <p className="text-muted-foreground">
              {paid ? "Payment confirmed" : "Pay on delivery"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg" className="rounded-full px-7">
          <Link href="/products">Continue shopping</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="rounded-full px-7">
          <Link href="/contact">Need help?</Link>
        </Button>
      </div>
    </div>
  );
}
