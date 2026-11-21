"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, Facebook, Twitter, PawPrint, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const exploreLinks = [
  { href: "/#products", label: "Products" },
  { href: "/#about", label: "About Us" },
  { href: "/#contact", label: "Contact Us" },
];

export function SiteFooter() {
  const [email, setEmail] = useState("");

  function handleSubscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("You're on the list! Tail wags incoming.");
    setEmail("");
  }

  return (
    <footer className="mt-10 border-t bg-brand-sky/40">
      <div className="container-px grid gap-10 py-14 md:grid-cols-3">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <PawPrint className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-extrabold text-brand-navy">
              Happy While Away
            </span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            One thoughtfully made puzzle ball that keeps your dog happy, busy
            and slow-eating — even while you&apos;re away.
          </p>
          <div className="flex gap-2">
            {[Instagram, Facebook, Twitter].map((Icon, index) => (
              <span
                key={index}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-navy shadow-sm"
                aria-hidden="true"
              >
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-brand-navy">
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {exploreLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-muted-foreground transition hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-brand-navy">
            Join the pack
          </h3>
          <p className="mt-4 text-sm text-muted-foreground">
            Get 10% off your first order and friendly dog tips.
          </p>
          <form onSubmit={handleSubscribe} className="mt-3 space-y-2">
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="bg-white pl-9"
                aria-label="Email address"
              />
            </div>
            <Button type="submit" className="w-full">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      <div className="border-t">
        <div className="container-px flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} Happy While Away. Made with love for
            happy dogs.
          </p>
          <p>Secure payments · Free returns · Friendly support</p>
        </div>
      </div>
    </footer>
  );
}
