import type { Metadata } from "next";
import { AdminOrders } from "@/components/admin-orders";
import { PackageCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin orders",
  description: "Track and manage Happy While Away orders.",
};

export default function AdminPage() {
  return (
    <div className="container-px py-12 md:py-16">
      <div className="mb-8 max-w-2xl">
        <span className="eyebrow">
          <PackageCheck className="h-3.5 w-3.5" />
          Admin
        </span>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-brand-navy">
          Orders
        </h1>
        <p className="mt-3 text-muted-foreground">
          Track every order placed on the store. Cancel an order from here.
        </p>
      </div>
      <AdminOrders />
    </div>
  );
}
