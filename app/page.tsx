"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  HeartHandshake,
  Mail,
  MapPin,
  Recycle,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/hero";
import { ScrollProductShowcase } from "@/components/scroll-product-showcase";
import { HowToUse } from "@/components/how-to-use";
import { ContactForm } from "@/components/contact-form";
import { products } from "@/lib/products";

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

export default function HomePage() {
  const product = products[0];

  return (
    <div className="overflow-hidden">
      <Hero productSlug={product.slug} />

      <section id="products" className="scroll-mt-16">
        <ScrollProductShowcase product={product} />
      </section>

      <HowToUse />

      <section id="about" className="scroll-mt-20 border-y bg-white/60">
        <div className="container-px grid gap-10 py-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
          >
            <h2 className="font-display text-3xl font-extrabold text-brand-navy sm:text-4xl">
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
            <h2 className="font-display text-3xl font-extrabold text-brand-navy sm:text-4xl">
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
