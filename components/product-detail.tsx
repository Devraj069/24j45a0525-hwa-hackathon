"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  PackageOpen,
  Recycle,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ProductPurchase } from "@/components/product-purchase";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/products";

const gallery = [
  {
    src: "/pawquest-lifestyle.jpg",
    alt: "PawQuest Puzzle Ball with its treat box and a happy golden retriever",
    label: "Lifestyle",
    fit: "object-cover",
    thumb: "object-cover",
    bg: "#f3ece2",
  },
  {
    src: "/productpaw-v2.png",
    alt: "PawQuest Puzzle Ball product photo",
    label: "Product",
    fit: "object-contain p-6",
    thumb: "object-contain p-2",
    bg: "linear-gradient(145deg, #4a76b822 0%, #ffffff 55%, #4a76b814 100%)",
  },
  {
    src: "/pawquest-manual.jpg",
    alt: "PawQuest Puzzle Ball quick-start manual",
    label: "Manual",
    fit: "object-contain p-3",
    thumb: "object-contain p-1",
    bg: "#ffffff",
  },
];

const featureIcons = [PackageOpen, SlidersHorizontal, ShieldCheck, Recycle];

const inTheBox = [
  "1× PawQuest Puzzle Ball",
  "1× Quick-start manual",
  "Treats not included",
];

export function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [active, setActive] = useState(0);
  const manualRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: manualRef,
    offset: ["start end", "end start"],
  });
  const manualY = useTransform(scrollYProgress, [0, 1], [48, -48]);

  function buyNow() {
    addItem({
      slug: product.slug,
      name: product.name,
      size: product.sizes[0],
      price: product.price,
      emoji: product.emoji,
      accent: product.accent,
      quantity: 1,
    });
    toast.success(`${product.name} added to cart`);
    router.push("/checkout");
  }

  const image = gallery[active];

  return (
    <>
      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="group relative"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-[2.5rem] ring-1 ring-black/5 shadow-sm">
              <AnimatePresence initial={false}>
                <motion.div
                  key={image.src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                  style={{ background: image.bg }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className={`${image.fit} transition-transform duration-700 group-hover:scale-[1.03]`}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            {product.badge && (
              <span className="absolute left-5 top-5 rounded-full bg-brand-navy px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white shadow">
                {product.badge}
              </span>
            )}
          </motion.div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {gallery.map((item, index) => (
              <button
                key={item.src}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`View ${item.label} image`}
                aria-pressed={active === index}
                className={`relative aspect-square overflow-hidden rounded-2xl ring-2 transition ${
                  active === index
                    ? "ring-primary"
                    : "ring-transparent hover:ring-primary/40"
                }`}
                style={{ background: item.bg }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="120px"
                  className={item.thumb}
                />
              </button>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { icon: Recycle, label: "Reusable" },
              { icon: ShieldCheck, label: "Non-toxic" },
              { icon: Sparkles, label: "Vet-friendly" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-1.5 rounded-2xl border bg-card py-3 text-center"
              >
                <item.icon className="h-5 w-5 text-primary" />
                <span className="text-xs font-bold">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          id="buy-panel"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          className="scroll-mt-24"
        >
          <ProductPurchase product={product} />

          <Accordion type="single" collapsible className="mt-8">
            <AccordionItem value="shipping">
              <AccordionTrigger>Shipping & delivery</AccordionTrigger>
              <AccordionContent>
                Orders are dispatched within 24 hours. Free shipping on orders
                over ₹1,499, otherwise a flat ₹79 fee applies. Delivery usually
                takes 2–5 working days across India.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="care">
              <AccordionTrigger>Care & materials</AccordionTrigger>
              <AccordionContent>
                Made with safe, non-toxic, pet-friendly materials. Wipe clean
                or follow the care label — many of our products are top-rack
                dishwasher or machine-washable for easy, everyday use.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="returns">
              <AccordionTrigger>Our happiness promise</AccordionTrigger>
              <AccordionContent>
                If your dog doesn&apos;t love it, you have 30 days to return it
                for a refund or exchange. Real humans, friendly support — just
                reach out through the contact page.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>

      <section
        ref={manualRef}
        className="relative mt-16 overflow-hidden rounded-[2.5rem] border bg-secondary/40 px-5 py-10 sm:px-10 lg:mt-24 lg:px-14 lg:py-16"
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow">Inside the box</span>
            <h2 className="mt-4 font-display text-[2.1rem] font-extrabold leading-tight text-brand-navy sm:text-4xl">
              Everything you need to start the quest.
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Unbox the ball, fill the hidden chamber with a few treats, and
              hand it over. The included quick-start guide walks you through
              the three difficulty settings in under a minute.
            </p>

            <ul className="mt-6 space-y-2.5">
              {inTheBox.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm font-semibold text-brand-navy"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button asChild size="lg" className="rounded-full bg-primary px-8 py-6 text-lg font-extrabold text-primary-foreground shadow-lg shadow-primary/30 transition hover:scale-105 hover:bg-primary/90">
                <a href="#buy-panel">Buy Now</a>
              </Button>
            </div>
          </motion.div>

          <div className="relative">
            <motion.div
              style={{ y: manualY }}
              className="will-change-transform"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94, rotate: -1.5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/5"
              >
                <Image
                  src="/pawquest-manual.jpg"
                  alt="PawQuest Puzzle Ball quick-start manual showing how to fill, lock and roll the ball"
                  width={1199}
                  height={1312}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="h-auto w-full"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mt-16 lg:mt-24">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <span className="eyebrow">Why dogs love it</span>
          <h2 className="mt-4 font-display text-[2.1rem] font-extrabold leading-tight text-brand-navy sm:text-4xl">
            Built for busy paws.
          </h2>
        </motion.div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {product.features.map((feature, index) => {
            const Icon = featureIcons[index % featureIcons.length];
            return (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="flex items-start gap-4 rounded-3xl border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {feature}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-display text-lg font-extrabold leading-none text-brand-navy">
              {formatPrice(product.price)}
            </p>
            <p className="mt-1 text-[11px] font-semibold text-muted-foreground">
              Free shipping over ₹1,499
            </p>
          </div>
          <Button
            size="lg"
            onClick={buyNow}
            className="h-12 flex-1 rounded-full bg-primary text-base font-extrabold text-primary-foreground shadow-lg shadow-primary/30 transition hover:scale-[1.02] hover:bg-primary/90"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </>
  );
}
