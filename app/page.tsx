"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Recycle,
  ShieldCheck,
  Truck,
  HeartHandshake,
  Star,
  Check,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { ProductVisual } from "@/components/product-visual";
import { getFeaturedProducts, products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 },
};

const categoryTiles = [
  { label: "Toys", emoji: "🧸", accent: "#b5566f" },
  { label: "Feeders", emoji: "🥣", accent: "#4a76b8" },
  { label: "Beds & Comfort", emoji: "🛏️", accent: "#5b6b8c" },
  { label: "Grooming", emoji: "🪥", accent: "#6b5b8c" },
  { label: "Treats", emoji: "🍖", accent: "#8a6f4e" },
  { label: "Walk & Travel", emoji: "🦮", accent: "#2f7f8c" },
];

const valueProps = [
  {
    icon: Recycle,
    title: "Reusable by design",
    text: "Refill, wash and repeat. Built to last for years, not weeks.",
  },
  {
    icon: ShieldCheck,
    title: "Safe materials",
    text: "Non-toxic, food-grade and vet-friendly materials your dog can trust.",
  },
  {
    icon: Truck,
    title: "Fast free delivery",
    text: "Free shipping over ₹1,499, dispatched within 24 hours.",
  },
  {
    icon: HeartHandshake,
    title: "Happiness promise",
    text: "30-day returns and real human support from fellow dog lovers.",
  },
];

const steps = [
  {
    title: "Twist & fill",
    text: "Open the chamber and add kibble or treats — 1 to 2 cups.",
  },
  {
    title: "Set difficulty",
    text: "Slide to small, medium or large openings for your dog's level.",
  },
  {
    title: "Lock & roll",
    text: "Snap it shut and let the rolling puzzle begin.",
  },
  {
    title: "Refill & repeat",
    text: "Empty, rinse, refill. Endless happy, busy mealtimes.",
  },
];

const testimonials = [
  {
    name: "Ananya",
    dog: "with Mochi, Beagle",
    text: "The puzzle ball buys me a calm 20 minutes every morning. Mochi is obsessed and eats so much slower now.",
  },
  {
    name: "Rahul",
    dog: "with Simba, Labrador",
    text: "Finally a toy that survives Simba's chewing. The build quality is genuinely excellent.",
  },
  {
    name: "Priya",
    dog: "with Coco, Shih Tzu",
    text: "The snuffle mat has become Coco's wind-down routine. Delivery was quick and the packaging was lovely.",
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts(8);

  return (
    <div className="overflow-hidden">
      <section className="relative">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-light/40 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-brand-sky blur-3xl" />

        <div className="container-px relative grid items-center gap-12 py-14 md:py-20 lg:grid-cols-2 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" />
              New enrichment collection
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] text-brand-navy text-balance sm:text-5xl lg:text-6xl">
              Keep tails wagging while you&apos;re away.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Thoughtfully made toys, feeders and comfort essentials that keep
              your dog happily busy, calm and cared for — even when you&apos;re
              not home.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="rounded-full px-7 text-base">
                <Link href="/products">
                  Shop all products
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-brand/30 bg-white/60 px-7 text-base"
              >
                <Link href="/products/refillable-puzzle-feeder-ball">
                  Meet the Puzzle Ball
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5 font-semibold">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                4.9/5 from 2,400+ reviews
              </span>
              <span className="flex items-center gap-1.5 font-semibold">
                <Truck className="h-4 w-4 text-primary" />
                Free shipping over ₹1,499
              </span>
              <span className="flex items-center gap-1.5 font-semibold">
                <Recycle className="h-4 w-4 text-emerald-600" />
                Reusable by design
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="relative aspect-square rounded-[2.75rem] bg-gradient-to-br from-brand-sky via-white to-brand-light/40 p-5 shadow-2xl shadow-brand/20 ring-1 ring-white/70">
              <ProductVisual
                emoji="🎾"
                accent="#4a76b8"
                name="Refillable Puzzle Feeder Ball"
                className="h-full w-full"
                emojiClassName="text-[9rem] sm:text-[11rem]"
              />
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-3 top-8 rounded-2xl bg-white px-4 py-3 shadow-xl sm:-left-6"
            >
              <p className="text-xs font-semibold text-muted-foreground">
                Slow feeder
              </p>
              <p className="flex items-center gap-1 font-display font-bold text-emerald-600">
                <Check className="h-4 w-4" /> 20 min of play
              </p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
              className="absolute -right-3 bottom-10 rounded-2xl bg-white px-4 py-3 shadow-xl sm:-right-6"
            >
              <div className="flex items-center gap-1 text-amber-400">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-1 text-xs font-semibold text-muted-foreground">
                214 happy reviews
              </p>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2,
              }}
              className="absolute -bottom-3 left-10 rounded-full bg-brand-navy px-4 py-2 text-sm font-bold text-white shadow-lg"
            >
              {formatPrice(1299)}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="border-y bg-white/60">
        <div className="container-px grid grid-cols-2 gap-6 py-6 text-center md:grid-cols-4">
          {[
            ["10,000+", "Happy dogs"],
            ["4.9/5", "Average rating"],
            ["30-day", "Easy returns"],
            ["100%", "Non-toxic materials"],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="font-display text-2xl font-extrabold text-brand-navy">
                {value}
              </p>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-px py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Shop by need</span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-brand-navy sm:text-4xl">
              Find their new favourite
            </h2>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1 text-sm font-bold text-primary hover:underline"
          >
            Browse everything <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categoryTiles.map((tile, index) => (
            <motion.div
              key={tile.label}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link
                href={`/products?category=${encodeURIComponent(tile.label)}`}
                className="group flex flex-col items-center gap-3 rounded-2xl border bg-card px-3 py-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl transition group-hover:scale-110"
                  style={{ backgroundColor: `${tile.accent}18` }}
                >
                  {tile.emoji}
                </span>
                <span className="text-sm font-bold">{tile.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container-px py-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Loved by dogs</span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-brand-navy sm:text-4xl">
              Bestsellers & new favourites
            </h2>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1 text-sm font-bold text-primary hover:underline"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, index) => (
            <motion.div
              key={product.slug}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              transition={{ duration: 0.45, delay: (index % 4) * 0.06 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container-px py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((prop, index) => (
            <motion.div
              key={prop.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="rounded-3xl border bg-card p-6 shadow-sm"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                <prop.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold">
                {prop.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{prop.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container-px pb-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-[2.5rem] bg-brand-navy text-white"
        >
          <div className="grid items-center gap-10 p-8 md:p-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-light">
                Star product
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
                The Refillable Puzzle Feeder Ball
              </h2>
              <p className="mt-4 max-w-lg text-white/70">
                One clever ball turns mealtime into 20 minutes of rewarding,
                slow-eating play. Refill, wash, repeat — for years.
              </p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {steps.map((step, index) => (
                  <div key={step.title} className="flex gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-light font-display text-sm font-extrabold text-brand-navy">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-bold">{step.title}</p>
                      <p className="text-sm text-white/60">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                asChild
                size="lg"
                className="mt-8 rounded-full bg-white px-7 text-base text-brand-navy hover:bg-brand-light"
              >
                <Link href="/products/refillable-puzzle-feeder-ball">
                  Shop the Puzzle Ball
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="relative mx-auto w-full max-w-sm">
              <div className="aspect-square rounded-[2rem] bg-gradient-to-br from-white/20 to-white/5 p-5 ring-1 ring-white/20">
                <ProductVisual
                  emoji="🎾"
                  accent="#a9c9ea"
                  name="Refillable Puzzle Feeder Ball"
                  className="h-full w-full"
                  emojiClassName="text-[8rem]"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="container-px py-16">
        <div className="text-center">
          <span className="eyebrow">Happy tails</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-brand-navy sm:text-4xl">
            Dog parents love us
          </h2>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {testimonials.map((review, index) => (
            <motion.figure
              key={review.name}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-3xl border bg-card p-6 shadow-sm"
            >
              <div className="flex items-center gap-1 text-amber-400">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-foreground/80">
                “{review.text}”
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-bold">{review.name}</span>
                <span className="text-muted-foreground"> {review.dog}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      <section className="container-px pb-4">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-sky via-white to-brand-light/40 px-6 py-14 text-center ring-1 ring-white/70">
          <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-brand-light/40 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-12 right-0 h-48 w-48 rounded-full bg-brand/20 blur-2xl" />
          <div className="relative mx-auto max-w-2xl">
            <span className="text-5xl">🐾</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-brand-navy sm:text-4xl">
              Ready to make their day?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Join 10,000+ happy dogs and their people. Free shipping over
              ₹1,499 and a 30-day happiness promise.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-6 rounded-full px-8 text-base"
            >
              <Link href="/products">
                Start shopping
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="container-px pb-10 pt-8 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {products.length} thoughtfully made products · Made for happy dogs
      </div>
    </div>
  );
}
