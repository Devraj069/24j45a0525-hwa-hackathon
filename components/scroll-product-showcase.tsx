"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Brain, Dumbbell, type LucideIcon } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/products";

const physicalBenefits = [
  "Slows fast eating for healthier digestion",
  "Encourages rolling, pawing and active movement",
  "Keeps jaws and paws busy in a safe, rewarding way",
];

const mentalBenefits = [
  "Turns boredom into focused problem-solving",
  "Eases alone-time restlessness and anxiety",
  "Builds confidence with every treat they unlock",
];

function BenefitBlock({
  icon: Icon,
  title,
  items,
}: {
  icon: LucideIcon;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border bg-card/85 p-3 shadow-sm backdrop-blur sm:p-4">
      <p className="flex items-center gap-2 font-display text-sm font-bold text-brand-navy sm:text-base">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-primary">
          <Icon className="h-4 w-4" />
        </span>
        {title}
      </p>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-xs leading-snug text-muted-foreground sm:text-sm"
          >
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ScrollProductShowcase({ product }: { product: Product }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const content = contentRef.current;
    const image = imageRef.current;
    if (!root || !content || !image) return;

    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      gsap.set(image, { xPercent: 36, yPercent: 0, rotation: 0, scale: 1, opacity: 1 });
      if (reduced) return;

      gsap.set(image, { xPercent: 180, yPercent: 0, rotation: 220, scale: 0.55, opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.25,
        },
      });

      tl.to(
        image,
        {
          keyframes: [
            {
              xPercent: 36,
              rotation: 0,
              scale: 1,
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            },
            { xPercent: -36, rotation: -300, duration: 1.2 },
            {
              xPercent: -26,
              rotation: -360,
              scale: 3.4,
              duration: 0.6,
              ease: "power2.inOut",
            },
          ],
        },
        0
      ).to(content, { opacity: 0, y: -40, duration: 0.5 }, 1.5);
    });

    mm.add("(max-width: 1023px)", () => {
      gsap.set(image, { xPercent: 0, yPercent: 0, rotation: 0, scale: 0.95, opacity: 1 });
      if (reduced) return;

      gsap.set(image, { xPercent: 180, yPercent: 0, rotation: 220, scale: 0.5, opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.25,
        },
      });

      tl.to(
        image,
        {
          keyframes: [
            {
              xPercent: 0,
              rotation: 0,
              scale: 0.95,
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            },
            { xPercent: -30, rotation: -300, duration: 1.2 },
            {
              xPercent: -18,
              rotation: -360,
              scale: 3.4,
              duration: 0.6,
              ease: "power2.inOut",
            },
          ],
        },
        0
      ).to(content, { opacity: 0, y: -30, duration: 0.5 }, 1.5);
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative h-[200vh] lg:h-[220vh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="container-px relative grid w-full items-center gap-5 lg:block">
          <div className="pointer-events-none relative z-20 flex justify-center lg:absolute lg:inset-0 lg:items-center">
            <div
              ref={imageRef}
              className="w-[56vw] max-w-[210px] will-change-transform sm:max-w-[260px] lg:w-[46vw] lg:max-w-[520px]"
            >
              <Image
                src="/productpaw-v2.png"
                alt={product.name}
                width={612}
                height={408}
                priority
                className="h-auto w-full drop-shadow-2xl"
              />
            </div>
          </div>

          <div ref={contentRef} className="relative z-10 lg:max-w-[24rem]">
            <h2 className="font-display text-2xl font-extrabold leading-tight text-brand-navy sm:text-4xl lg:text-5xl">
              {product.name}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:mt-3 sm:text-base">
              A refillable puzzle feeder that hides kibble or treats inside. As
              your dog rolls and paws it, food drops out through adjustable
              openings — turning mealtime into active, rewarding play.
            </p>

            <div className="mt-4 grid gap-3 sm:mt-6 sm:grid-cols-2 lg:grid-cols-1">
              <BenefitBlock
                icon={Dumbbell}
                title="Physical benefits"
                items={physicalBenefits}
              />
              <BenefitBlock
                icon={Brain}
                title="Mental benefits"
                items={mentalBenefits}
              />
            </div>

            <div className="mt-4 sm:mt-6">
              <Button
                asChild
                size="lg"
                className="rounded-full px-6 text-sm sm:text-base"
              >
                <Link href={`/products/${product.slug}`}>
                  Shop now · {formatPrice(product.price)}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
