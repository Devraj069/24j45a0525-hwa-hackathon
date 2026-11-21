"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
  { id: "about", href: "/#about", label: "About Us" },
  { id: "contact", href: "/#contact", label: "Contact Us" },
];

export function SiteHeader() {
  const { count, isReady } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="container-px flex h-20 items-center justify-between gap-4 md:h-24">
          <Link
            href="/"
            className="flex shrink-0 items-center"
            aria-label="Happy While Away home"
          >
            <Image
              src="/logo.png"
              alt="Happy While Away"
              width={240}
              height={112}
              priority
              className="h-12 w-auto mix-blend-multiply md:h-16"
            />
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      "group relative rounded-full px-4 py-2 text-sm font-bold text-foreground/70 transition hover:text-foreground",
                      isActive && "text-foreground"
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute inset-x-4 bottom-0.5 h-0.5 origin-left rounded-full bg-primary transition-transform duration-300",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )}
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}
            </nav>

            <Button asChild className="hidden rounded-full px-6 md:inline-flex">
              <Link href="/#products">Shop Now</Link>
            </Button>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition hover:bg-primary/90"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {isReady && count > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 min-w-5 justify-center rounded-full border-2 border-background bg-brand-navy px-1 text-[11px] font-extrabold text-white shadow-none hover:bg-brand-navy">
                  {count}
                </Badge>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full text-foreground transition hover:bg-secondary md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="right" className="w-[85%] max-w-sm p-0">
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
            <Button asChild className="mt-3" size="lg" onClick={() => setMenuOpen(false)}>
              <Link href="/#products">Shop Now</Link>
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
