"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Ban, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/lib/types";

const statusStyles: Record<string, string> = {
  placed: "bg-amber-100 text-amber-800",
  confirmed: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-rose-100 text-rose-800",
};

export function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/orders");
      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Failed to load orders");
      }
      setOrders(Array.isArray(data.orders) ? (data.orders as Order[]) : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function cancelOrder(id: string) {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancelled" }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Failed to cancel order");
      }
      setOrders((current) =>
        current.map((order) => (order.id === id ? data.order : order))
      );
    } catch {
      // keep the list as it is when cancellation fails
    }
  }

  if (loading) {
    return (
      <div className="h-64 animate-pulse rounded-3xl border bg-card" />
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border bg-card p-6 text-center">
        <p className="font-bold">Could not load orders</p>
        <p className="mt-1 text-sm text-muted-foreground">{error}</p>
        <Button className="mt-4" onClick={load}>
          Retry
        </Button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border bg-card py-16 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-4xl">
          <PackageCheck className="h-8 w-8 text-primary" />
        </span>
        <p className="font-display text-xl font-bold">No orders yet</p>
        <p className="text-sm text-muted-foreground">
          Orders placed on the store will show up here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <motion.article
          key={order.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl border bg-card p-5 shadow-sm"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-display text-lg font-bold">{order.id}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wide ${statusStyles[order.status] ?? statusStyles.placed}`}
            >
              {order.status}
            </span>
          </div>

          <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <p>
              <span className="text-muted-foreground">Customer: </span>
              {order.customer.name} · {order.customer.email}
            </p>
            <p>
              <span className="text-muted-foreground">Phone: </span>
              {order.customer.phone}
            </p>
            <p className="sm:col-span-2">
              <span className="text-muted-foreground">Address: </span>
              {order.customer.address}, {order.customer.city},{" "}
              {order.customer.state} — {order.customer.pincode}
            </p>
            <p>
              <span className="text-muted-foreground">Payment: </span>
              {order.payment.method === "razorpay"
                ? "Paid online (Razorpay)"
                : "Cash on Delivery"}{" "}
              · {order.payment.status}
            </p>
          </div>

          <div className="mt-4 rounded-2xl bg-secondary/50 p-3 text-sm">
            {order.items.map((item) => (
              <div
                key={`${item.slug}-${item.size}`}
                className="flex justify-between gap-2 py-1"
              >
                <span>
                  {item.name} · {item.size} × {item.quantity}
                </span>
                <span className="font-semibold">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
            <div className="mt-2 border-t pt-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="font-display font-bold">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            {order.status !== "cancelled" ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => cancelOrder(order.id)}
              >
                <Ban className="h-4 w-4" />
                Cancel order
              </Button>
            ) : (
              <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Cancelled
              </span>
            )}
          </div>
        </motion.article>
      ))}
    </div>
  );
}
