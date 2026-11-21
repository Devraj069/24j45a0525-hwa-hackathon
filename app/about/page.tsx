import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Heart, Leaf, PawPrint, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "Happy While Away makes joyful, useful and reusable essentials for happy dogs.",
};

const values = [
  {
    icon: Heart,
    title: "Made for their happiness",
    text: "Every product starts with one question: will this make a dog genuinely happier and more engaged?",
  },
  {
    icon: Leaf,
    title: "Reusable and responsible",
    text: "We design things to last and refill, not to be thrown away. Less waste, more play.",
  },
  {
    icon: PawPrint,
    title: "Dog-first design",
    text: "Sizes, textures and difficulty levels shaped by real dogs, real vets and real dog parents.",
  },
  {
    icon: Sparkles,
    title: "Little moments of joy",
    text: "From slow-feed puzzles to calming beds, we turn everyday routines into happy moments.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="container-px py-14 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">
            <PawPrint className="h-3.5 w-3.5" />
            Our story
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-brand-navy text-balance sm:text-5xl">
            We make good days for good dogs.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Happy While Away began with a simple observation: our dogs spend so
            much of the day waiting for us. We wanted to fill that time with
            joy, curiosity and comfort — with products that are genuinely
            useful, safe and made to last.
          </p>
        </div>
      </section>

      <section className="container-px">
        <div className="grid items-center gap-10 rounded-[2.5rem] bg-brand-sky/50 p-6 md:p-10 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-light/50 via-white to-brand-sky p-6 ring-1 ring-white/70">
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <span className="text-7xl">🐕</span>
              <p className="font-display text-2xl font-extrabold text-brand-navy">
                Happier dogs, calmer homes
              </p>
              <p className="max-w-xs text-sm text-muted-foreground">
                Enrichment, comfort and care — thoughtfully designed for the
                moments you&apos;re away.
              </p>
            </div>
          </div>
          <div>
            <h2 className="font-display text-3xl font-extrabold text-brand-navy">
              Why we started
            </h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
              <p>
                Like most dog parents, we hated leaving for work and wondering
                if our dogs were bored, anxious or rushing their meals. The
                toys we tried were either boring within minutes or broken within
                days.
              </p>
              <p>
                So we set out to build better: enrichment toys that actually
                engage, feeders that slow down mealtimes, and comfort products
                that make alone-time feel safe. Everything reusable, everything
                built to last.
              </p>
              <p>
                Today, more than 10,000 happy dogs use our products every day.
                That&apos;s 10,000 more wagging tails — and we&apos;re just
                getting started.
              </p>
            </div>
            <Button asChild className="mt-6 rounded-full" size="lg">
              <Link href="/products">
                Explore our products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container-px py-16">
        <div className="text-center">
          <span className="eyebrow">What we stand for</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-brand-navy sm:text-4xl">
            Our promises to you and your dog
          </h2>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-3xl border bg-card p-6 shadow-sm"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                <value.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold">
                {value.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-px pb-8">
        <div className="grid gap-6 rounded-[2.5rem] bg-brand-navy px-6 py-10 text-center text-white sm:grid-cols-3 md:px-12">
          {[
            ["10,000+", "Happy dogs"],
            ["25+", "Products designed"],
            ["4.9/5", "Average rating"],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="font-display text-4xl font-extrabold text-brand-light">
                {value}
              </p>
              <p className="mt-1 text-sm font-semibold text-white/70">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
