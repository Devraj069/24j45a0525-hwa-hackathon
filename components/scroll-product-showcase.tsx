"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Brain, Dumbbell, type LucideIcon } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
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
    <div className="rounded-2xl border bg-card/90 p-3.5 shadow-sm backdrop-blur sm:p-4">
      <p className="flex items-center gap-2 font-display text-base font-bold text-brand-navy">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-primary">
          <Icon className="h-4 w-4" />
        </span>
        {title}
      </p>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-[13px] leading-snug text-muted-foreground sm:text-sm"
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
  const pinRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    const content = contentRef.current;
    const image = imageRef.current;
    if (!root || !pin || !content || !image) return;

    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      gsap.set(image, { xPercent: 34, rotation: 0, scale: 1, opacity: 1 });
      if (reduced) return;

      gsap.set(image, { xPercent: 180, rotation: 220, scale: 1, opacity: 0 });

      // Pin the showcase section with spacer to eliminate empty tail
      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: () => "+=" + window.innerHeight * 0.55,
        pin,
        pinSpacing: true,
        anticipatePin: 1,
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top 50%",
          end: () => "+=" + window.innerHeight * 1.05,
          scrub: 0.3,
          invalidateOnRefresh: true,
        },
      });

      // Entrance: ball comes from right and settles at the right side
      tl.to(
        image,
        {
          xPercent: 34,
          rotation: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power1.out",
        },
        0
      )
        // Hold ball at the right side (no further movement)
        .to(image, { xPercent: 34, rotation: 0, duration: 0.55 }, 0.5);
    });

    mm.add("(max-width: 1023px)", () => {
      gsap.set(image, { xPercent: 0, rotation: 0, scale: 1, opacity: 1 });
      if (reduced) return;

      gsap.set(image, { xPercent: 180, rotation: 220, scale: 1, opacity: 0 });

      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: () => "+=" + window.innerHeight * 0.55,
        pin,
        pinSpacing: true,
        anticipatePin: 1,
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top 50%",
          end: () => "+=" + window.innerHeight * 1.05,
          scrub: 0.3,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        image,
        {
          xPercent: 0,
          rotation: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power1.out",
        },
        0
      )
        .to(image, { xPercent: 0, rotation: 0, duration: 0.55 }, 0.5);
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <div
        ref={pinRef}
        className="relative flex h-[100svh] items-center overflow-hidden bg-background pt-[88px] lg:pt-0"
      >
        <div className="container-px relative grid w-full items-center gap-5 lg:block">
          <div className="pointer-events-none relative z-20 flex justify-center lg:absolute lg:inset-0 lg:items-center">
            <div
              ref={imageRef}
              className="w-[80vw] max-w-[320px] will-change-transform sm:max-w-[360px] lg:w-[46vw] lg:max-w-[480px]"
            >
              <Image
                src="/productpaw-v2.png"
                alt={product.name}
                width={389}
                height={384}
                priority
                className="h-auto w-full drop-shadow-xl"
              />
            </div>
          </div>

          <div ref={contentRef} className="relative z-10 lg:w-[36rem]">
            <h2 className="whitespace-nowrap font-display text-[2rem] font-extrabold leading-tight text-brand-navy sm:text-4xl lg:text-[2.75rem]">
              {product.name}
            </h2>
            <p className="mt-2 max-w-md text-base leading-relaxed text-muted-foreground sm:mt-3 sm:text-base">
              A refillable puzzle feeder that hides kibble or treats inside. As
              your dog rolls and paws it, food drops out through adjustable
              openings — turning mealtime into active, rewarding play.
            </p>

            <div className="mt-4 grid max-w-xl gap-3 sm:mt-6 sm:grid-cols-2 lg:max-w-[30rem] lg:grid-cols-1">
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
                className="rounded-full px-7 text-base"
              >
                <Link href={`/products/${product.slug}`}>
                  Buy Now
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