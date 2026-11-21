"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ProductVisual } from "@/components/product-visual";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/products";

const steps = [
  {
    title: "Twist & fill",
    text: "Pop the chamber open and add 1–2 cups of kibble or treats.",
  },
  {
    title: "Set the challenge",
    text: "Choose small, medium or large openings for your dog's level.",
  },
  {
    title: "Lock, roll & repeat",
    text: "Snap it shut and let the rewarding puzzle play begin.",
  },
];

export function ScrollProductShowcase({ product }: { product: Product }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const ballRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const ball = ballRef.current;
    const bar = barRef.current;
    if (!root || !ball || !bar) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const stepEls = gsap.utils.toArray<HTMLElement>("[data-step]");
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });

      tl.to(ball, { rotate: 200, scale: 1.12, duration: 1 }, 0)
        .to(ball, { rotate: 380, scale: 0.94, duration: 1 }, 1)
        .to(ball, { rotate: 560, scale: 1.04, duration: 1 }, 2);

      stepEls.forEach((el, index) => {
        tl.fromTo(
          el,
          { opacity: 0.3, y: 26 },
          { opacity: 1, y: 0, duration: 0.5 },
          index
        );
      });

      tl.fromTo(bar, { scaleY: 0 }, { scaleY: 1, duration: 3 }, 0);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative h-[220vh] sm:h-[260vh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="container-px grid w-full items-center gap-5 sm:gap-10 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" />
              The one and only
            </span>
            <h2 className="mt-2 font-display text-2xl font-extrabold leading-tight text-brand-navy sm:mt-3 sm:text-4xl lg:text-5xl">
              {product.name}
            </h2>
            <p className="mt-2 hidden max-w-md text-sm leading-relaxed text-muted-foreground sm:mt-3 sm:block sm:text-base">
              {product.short}
            </p>

            <div className="mt-4 space-y-2 sm:mt-6 sm:space-y-3">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  data-step
                  className="flex items-start gap-3 rounded-2xl border bg-card/85 p-2.5 shadow-sm backdrop-blur sm:p-4"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary font-display text-xs font-extrabold text-brand-navy sm:h-8 sm:w-8 sm:text-sm">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-bold leading-tight sm:text-base">
                      {step.title}
                    </p>
                    <p className="text-xs leading-snug text-muted-foreground sm:text-sm">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 sm:mt-7">
              <Button asChild size="lg" className="rounded-full px-6 text-sm sm:text-base">
                <Link href={`/products/${product.slug}`}>
                  Shop now · {formatPrice(product.price)}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-2">
            <div className="relative w-full max-w-[170px] sm:max-w-sm">
              <div
                ref={ballRef}
                className="relative aspect-square rounded-[2rem] bg-gradient-to-br from-brand-sky via-white to-brand-light/40 p-3 shadow-2xl shadow-brand/20 ring-1 ring-white/70 sm:rounded-[2.5rem] sm:p-4"
              >
                <ProductVisual
                  emoji={product.emoji}
                  accent={product.accent}
                  name={product.name}
                  className="h-full w-full"
                  emojiClassName="text-[4.5rem] sm:text-[9rem]"
                />
              </div>
              <span className="absolute -right-1 top-4 hidden h-16 w-1.5 overflow-hidden rounded-full bg-border sm:block">
                <span
                  ref={barRef}
                  className="block h-full w-full origin-top rounded-full bg-primary"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
