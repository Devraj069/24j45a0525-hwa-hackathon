"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { Button } from "@/components/ui/button";

export function Hero({ productSlug }: { productSlug: string }) {
  const headlineRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const headline = headlineRef.current;
    if (!headline) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(SplitText);

    const split = new SplitText(headline, { type: "words,chars" });

    const tween = gsap.from(split.chars, {
      yPercent: 120,
      opacity: 0,
      duration: 0.85,
      ease: "power3.out",
      stagger: 0.018,
      delay: 0.15,
    });

    return () => {
      tween.kill();
      split.revert();
    };
  }, []);

  return (
    <section className="relative flex min-h-[calc(100svh-5.5rem)] w-full items-center overflow-hidden md:min-h-[calc(100svh-6rem)]">
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero.jpg"
          aria-hidden="true"
        >
          <source src="/herovideo.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/65 via-brand-navy/25 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/45 via-transparent to-transparent" />

      <div className="container-px relative w-full py-10">
        <h1
          ref={headlineRef}
          className="max-w-3xl font-display text-[2.65rem] font-extrabold leading-[1.03] text-balance text-white drop-shadow-lg sm:text-5xl lg:text-6xl xl:text-7xl"
        >
          Make Every Meal a little Adventure
        </h1>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-white/85 sm:text-xl">
          Turn every roll into reward with PawQuest Puzzle Feeder Ball.
        </p>
        <div className="mt-7">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full bg-white px-9 text-lg text-brand-navy shadow-xl hover:bg-brand-light"
          >
            <Link href={`/products/${productSlug}`}>
              <ShoppingCart className="h-5 w-5" />
              Shop Now
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
