"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { PackageCheck, Search, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/lib/types";

const statusLabels: Record<string, string> = {
  placed: "Placed",
  confirmed: "Confirmed",
  packing: "Packing",
  shipped: "Shipped",
  in_transit: "In transit",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const statusStyles: Record<string, string> = {
  placed: "bg-amber-100 text-amber-800",
  confirmed: "bg-sky-100 text-sky-800",
  packing: "bg-violet-100 text-violet-800",
  shipped: "bg-indigo-100 text-indigo-800",
  in_transit: "bg-blue-100 text-blue-800",
  delivered: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-rose-100 text-rose-800",
};

const timeline: Order["status"][] = [
  "placed",
  "confirmed",
  "packing",
  "shipped",
  "in_transit",
  "delivered",
];

export default function TrackOrderPage() {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);

  async function track(event?: React.FormEvent) {
    event?.preventDefault();
    const trimmed = id.trim();
    if (!trimmed) return;
    setLoading(true);
    setError(null);
    setOrder(null);
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(trimmed)}`);
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Order not found");
      }
      setOrder(data.order as Order);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Order not found");
    } finally {
      setLoading(false);
    }
  }

  const currentStep = order ? timeline.indexOf(order.status) : -1;
  const cancelled = order?.status === "cancelled";

  return (
    <div className="container-px py-12 md:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <span className="eyebrow">
            <Truck className="h-3.5 w-3.5" />
            Track
          </span>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-brand-navy">
            Track your order
          </h1>
          <p className="mt-3 text-muted-foreground">
            Enter your order ID to see the latest status and details.
          </p>
        </div>

        <form onSubmit={track} className="flex gap-2">
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="e.g. HWA-XXXX-XXXX"
            className="flex-1 rounded-xl border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
          <Button type="submit" disabled={loading}>
            <Search className="h-4 w-4" />
            {loading ? "Looking…" : "Track"}
          </Button>
        </form>

        {error && (
          <p className="mt-4 text-sm font-semibold text-rose-600">{error}</p>
        )}

        {order && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-6"
          >
            <div className="rounded-3xl border bg-card p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-bold">{order.id}</p>
                  <p className="text-xs text-muted-foreground">
                    Placed on {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wide ${statusStyles[order.status] ?? statusStyles.placed}`}
                >
                  {statusLabels[order.status] ?? order.status}
                </span>
              </div>

              {/* Timeline */}
              {!cancelled && (
                <div className="mt-6">
                  <div className="flex items-center justify-between gap-1">
                    {timeline.map((s, index) => {
                      const done = index <= currentStep;
                      const active = index === currentStep;
                      return (
                        <div
                          key={s}
                          className="flex flex-1 flex-col items-center gap-1.5"
                        >
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                              done
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-muted-foreground"
                            } ${active ? "ring-2 ring-primary/40" : ""}`}
                          >
                            {done ? "✓" : index + 1}
                          </div>
                          <span
                            className={`text-center text-[10px] font-semibold leading-tight ${
                              done ? "text-foreground" : "text-muted-foreground"
                            }`}
                          >
                            {statusLabels[s]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {cancelled && (
                <p className="mt-4 text-sm font-semibold text-rose-600">
                  This order has been cancelled.
                </p>
              )}
            </div>

            <div className="rounded-3xl border bg-card p-5 shadow-sm">
              <h2 className="font-display text-lg font-bold">Items</h2>
              <div className="mt-3 space-y-2 text-sm">
                {order.items.map((item) => (
                  <div
                    key={`${item.slug}-${item.size}`}
                    className="flex justify-between gap-2"
                  >
                    <span>
                      {item.name} · {item.size} × {item.quantity}
                    </span>
                    <span className="font-semibold">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total</span>
                    <span className="font-display font-bold">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Payment</span>
                    <span>
                      {order.payment.method === "razorpay"
                        ? "Paid online"
                        : "Cash on Delivery"}{" "}
                      · {order.payment.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border bg-card p-5 shadow-sm">
              <h2 className="font-display text-lg font-bold">Delivery details</h2>
              <div className="mt-3 grid gap-1 text-sm">
                <p>
                  <span className="text-muted-foreground">Name: </span>
                  {order.customer.name}
                </p>
                <p>
                  <span className="text-muted-foreground">Email: </span>
                  {order.customer.email}
                </p>
                <p>
                  <span className="text-muted-foreground">Phone: </span>
                  {order.customer.phone}
                </p>
                <p>
                  <span className="text-muted-foreground">Address: </span>
                  {order.customer.address}, {order.customer.city},{" "}
                  {order.customer.state} — {order.customer.pincode}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
