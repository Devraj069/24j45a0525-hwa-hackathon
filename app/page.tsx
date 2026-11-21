"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Check,
  HeartHandshake,
  Mail,
  MapPin,
  Recycle,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductVisual } from "@/components/product-visual";
import { ScrollProductShowcase } from "@/components/scroll-product-showcase";
import { ContactForm } from "@/components/contact-form";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 },
};

const aboutValues = [
  {
    icon: Recycle,
    title: "Reusable by design",
    text: "Refill, wash and repeat. Built to last for years, not weeks.",
  },
  {
    icon: ShieldCheck,
    title: "Safe materials",
    text: "Non-toxic, food-grade and vet-friendly materials dogs can trust.",
  },
  {
    icon: HeartHandshake,
    title: "Happiness promise",
    text: "30-day returns and real human support from fellow dog lovers.",
  },
];

const stats = [
  ["10,000+", "Happy dogs"],
  ["4.9/5", "Average rating"],
  ["30-day", "Easy returns"],
  ["100%", "Non-toxic"],
];

export default function HomePage() {
  const product = products[0];

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
              One product, done right
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] text-brand-navy text-balance sm:text-5xl lg:text-6xl">
              Keep tails wagging while you&apos;re away.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
              The PawQuest Puzzle Ball turns mealtime into twenty minutes of
              happy, slow-eating play — even when you&apos;re not home.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="rounded-full px-7 text-base">
                <Link href="#products">
                  Explore PawQuest
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-brand/30 bg-white/60 px-7 text-base"
              >
                <Link href="#contact">Talk to us</Link>
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
                emoji={product.emoji}
                accent={product.accent}
                name={product.name}
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
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2,
              }}
              className="absolute -bottom-3 left-10 rounded-full bg-brand-navy px-4 py-2 text-sm font-bold text-white shadow-lg"
            >
              {formatPrice(product.price)}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="border-y bg-white/60">
        <div className="container-px grid grid-cols-2 gap-6 py-6 text-center md:grid-cols-4">
          {stats.map(([value, label]) => (
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

      <section id="products" className="scroll-mt-16">
        <ScrollProductShowcase product={product} />
      </section>

      <section id="about" className="scroll-mt-20 border-y bg-white/60">
        <div className="container-px grid gap-10 py-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
          >
            <span className="eyebrow">About us</span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-brand-navy sm:text-4xl">
              Made by dog people, for dog people.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Happy While Away began with one simple wish: to leave our dogs
              happily busy instead of bored and anxious while we were out.
              Instead of a catalogue of everything, we make one thing
              exceptionally well.
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Every PawQuest is designed with vets, tested by real chewers and
              built from safe, reusable materials — so it earns its place in
              your home for years.
            </p>
          </motion.div>

          <div className="grid gap-4">
            {aboutValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="flex items-start gap-4 rounded-3xl border bg-card p-5 shadow-sm"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <value.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold">
                    {value.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {value.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20">
        <div className="container-px grid gap-10 py-16 lg:grid-cols-2 lg:items-start">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
          >
            <span className="eyebrow">Contact us</span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-brand-navy sm:text-4xl">
              Questions? We&apos;re all ears.
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
              Sizing, shipping, or just want to say hi — send a message and a
              real human will get back to you within one working day.
            </p>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary">
                  <Mail className="h-5 w-5" />
                </span>
                <span className="font-semibold">hello@happywhileaway.com</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary">
                  <MapPin className="h-5 w-5" />
                </span>
                <span className="font-semibold">Hyderabad, India</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      <section className="container-px pb-16">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-sky via-white to-brand-light/40 px-6 py-14 text-center ring-1 ring-white/70">
          <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-brand-light/40 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-12 right-0 h-48 w-48 rounded-full bg-brand/20 blur-2xl" />
          <div className="relative mx-auto max-w-2xl">
            <span className="text-5xl">🐾</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-brand-navy sm:text-4xl">
              Ready to make their day?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Free shipping over ₹1,499 and a 30-day happiness promise.
            </p>
            <Button asChild size="lg" className="mt-6 rounded-full px-8 text-base">
              <Link href={`/products/${product.slug}`}>
                Shop the PawQuest
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
