"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  Ban,
  CheckCircle2,
  Clock,
  LogOut,
  PackageCheck,
  RefreshCw,
  Search,
  Truck,
} from "lucide-react";
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

const statusOptions: Order["status"][] = [
  "placed",
  "confirmed",
  "packing",
  "shipped",
  "in_transit",
  "delivered",
  "cancelled",
];

export function AdminOrders() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Order["status"]>("all");
  const [busyId, setBusyId] = useState<string | null>(null);

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/orders");
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setOrders(Array.isArray(data.orders) ? data.orders : []);
      setAuthed(true);
    } catch {
      setAuthed(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setLoginLoading(true);
    setLoginError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Login failed");
      }
      setPassword("");
      await checkAuth();
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoginLoading(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setOrders([]);
  }

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/orders");
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Failed to load orders");
      setOrders(Array.isArray(data.orders) ? data.orders : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, []);

  async function changeStatus(id: string, status: Order["status"]) {
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Update failed");
      setOrders((current) =>
        current.map((o) => (o.id === id ? data.order : o))
      );
    } catch {
      // keep current state on failure
    } finally {
      setBusyId(null);
    }
  }

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return orders.filter((order) => {
      if (statusFilter !== "all" && order.status !== statusFilter) return false;
      if (!term) return true;
      return (
        order.id.toLowerCase().includes(term) ||
        order.customer.name.toLowerCase().includes(term) ||
        order.customer.email.toLowerCase().includes(term) ||
        order.customer.phone.includes(term)
      );
    });
  }, [orders, query, statusFilter]);

  const stats = useMemo(() => {
    const total = orders.length;
    const revenue = orders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + o.total, 0);
    const placed = orders.filter((o) => o.status === "placed").length;
    const cancelled = orders.filter((o) => o.status === "cancelled").length;
    return { total, revenue, placed, cancelled };
  }, [orders]);

  // Login gate
  if (authed === null) {
    return <div className="h-64 animate-pulse rounded-3xl border bg-card" />;
  }

  if (!authed) {
    return (
      <div className="mx-auto max-w-sm rounded-3xl border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary text-primary">
            <PackageCheck className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display text-lg font-bold text-brand-navy">
              Admin login
            </p>
            <p className="text-xs text-muted-foreground">
              Enter the admin password to continue.
            </p>
          </div>
        </div>
        <form onSubmit={login} className="space-y-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
          {loginError && (
            <p className="text-sm font-semibold text-rose-600">{loginError}</p>
          )}
          <Button type="submit" className="w-full" disabled={loginLoading}>
            {loginLoading ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    );
  }

  if (loading) {
    return <div className="h-64 animate-pulse rounded-3xl border bg-card" />;
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

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={load}>
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <span className="text-xs text-muted-foreground">
            {orders.length} order{orders.length === 1 ? "" : "s"} total
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={logout}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={PackageCheck}
          label="Total orders"
          value={String(stats.total)}
        />
        <StatCard
          icon={Clock}
          label="Awaiting confirmation"
          value={String(stats.placed)}
        />
        <StatCard
          icon={Ban}
          label="Cancelled"
          value={String(stats.cancelled)}
        />
        <StatCard
          icon={Truck}
          label="Revenue (excl. cancelled)"
          value={formatPrice(stats.revenue)}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by order id, name, email or phone"
            className="w-full rounded-xl border bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as "all" | Order["status"])
          }
          className="rounded-xl border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="all">All statuses</option>
          <option value="placed">Placed</option>
          <option value="confirmed">Confirmed</option>
          <option value="packing">Packing</option>
          <option value="shipped">Shipped</option>
          <option value="in_transit">In transit</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-3xl border bg-card py-16 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-4xl">
            <PackageCheck className="h-8 w-8 text-primary" />
          </span>
          <p className="font-display text-xl font-bold">No orders found</p>
          <p className="text-sm text-muted-foreground">
            {orders.length === 0
              ? "Orders placed on the store will show up here."
              : "Try a different search or filter."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => (
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
              {statusLabels[order.status] ?? order.status}
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

              <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
                <select
                  value={order.status}
                  disabled={busyId === order.id}
                  onChange={(e) =>
                    changeStatus(order.id, e.target.value as Order["status"])
                  }
                  className="rounded-xl border bg-background px-3 py-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {statusLabels[s]}
                    </option>
                  ))}
                </select>
                {order.status !== "cancelled" && (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={busyId === order.id}
                    onClick={() => changeStatus(order.id, "cancelled")}
                  >
                    <Ban className="h-4 w-4" />
                    Cancel
                  </Button>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-bold uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-2 font-display text-2xl font-extrabold text-brand-navy">
        {value}
      </p>
    </div>
  );
}
