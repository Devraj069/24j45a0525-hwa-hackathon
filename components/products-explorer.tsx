"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { categories, products } from "@/lib/products";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
];

export function ProductsExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "All";

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");

  const allCategories = useMemo(() => ["All", ...categories], []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    let list = products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;
      const matchesQuery =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.short.toLowerCase().includes(term);
      return matchesCategory && matchesQuery;
    });

    list = [...list];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [activeCategory, query, sort]);

  function selectCategory(category: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    const next = params.toString();
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
  }

  return (
    <div>
      <div className="rounded-3xl border bg-card p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search toys, feeders, beds…"
              className="h-11 bg-background pl-10"
              aria-label="Search products"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-secondary"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="hidden h-4 w-4 text-muted-foreground sm:block" />
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="h-11 w-full bg-background md:w-52">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {allCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => selectCategory(category)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-bold transition",
                activeCategory === category
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground/70 hover:border-primary/40 hover:text-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm font-semibold text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "product" : "products"}
        {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-4 rounded-3xl border border-dashed bg-card py-16 text-center">
          <span className="text-5xl">🐕</span>
          <div>
            <p className="font-display text-xl font-bold">No products found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different search or category.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              selectCategory("All");
            }}
            className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
