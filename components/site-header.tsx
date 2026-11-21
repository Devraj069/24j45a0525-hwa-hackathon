"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CartDrawer } from "@/components/cart-drawer";
import { useCart } from "@/components/cart-provider";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/products", label: "Shop all" },
  { href: "/products?category=Toys", label: "Toys" },
  { href: "/products?category=Feeders", label: "Feeders" },
  { href: "/products?category=Beds%20%26%20Comfort", label: "Beds" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const { count, isReady } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="bg-brand-navy text-white">
        <div className="container-px flex items-center justify-center gap-2 py-2 text-center text-xs font-semibold tracking-wide sm:text-sm">
          <Sparkles className="h-3.5 w-3.5 text-brand-light" />
          Free shipping over ₹1,499 · 30-day happy-pup returns
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="container-px flex h-16 items-center justify-between gap-4 md:h-20">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition hover:bg-secondary lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link href="/" className="flex items-center" aria-label="Happy While Away home">
              <Image
                src="/logo.png"
                alt="Happy While Away"
                width={180}
                height={84}
                priority
                className="h-9 w-auto mix-blend-multiply md:h-11"
              />
            </Link>
          </div>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/products"
                  ? pathname === "/products"
                  : pathname === link.href.split("?")[0] &&
                    link.href.includes("?");
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-bold text-foreground/70 transition hover:bg-secondary hover:text-foreground",
                    isActive && "bg-secondary text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link href="/products">Shop</Link>
            </Button>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition hover:bg-primary/90"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {isReady && count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-navy px-1 text-[11px] font-extrabold text-white ring-2 ring-background">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="w-[85%] max-w-sm p-0">
          <SheetHeader className="border-b px-5 py-4">
            <SheetTitle className="font-display text-xl">
              Happy While Away
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 px-3 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-bold text-foreground/80 transition hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="mt-3"
              size="lg"
              onClick={() => setMenuOpen(false)}
            >
              <Link href="/products">Shop all products</Link>
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
