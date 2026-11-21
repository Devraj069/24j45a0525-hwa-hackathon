import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductsExplorer } from "@/components/products-explorer";

export const metadata: Metadata = {
  title: "Shop all products",
  description:
    "Browse thoughtfully made toys, feeders, beds, grooming and travel essentials for happy dogs.",
};

export default function ProductsPage() {
  return (
    <div className="container-px py-12 md:py-16">
      <div className="max-w-2xl">
        <span className="eyebrow">The collection</span>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-brand-navy sm:text-5xl">
          Everything for a happy dog
        </h1>
        <p className="mt-3 text-muted-foreground">
          Useful, reusable and thoughtfully made — find the perfect pick for
          your best friend.
        </p>
      </div>

      <div className="mt-8">
        <Suspense
          fallback={
            <div className="h-40 animate-pulse rounded-3xl border bg-card" />
          }
        >
          <ProductsExplorer />
        </Suspense>
      </div>
    </div>
  );
}
