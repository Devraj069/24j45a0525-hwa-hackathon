import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight, Recycle, ShieldCheck, Sparkles } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductVisual } from "@/components/product-visual";
import { ProductPurchase } from "@/components/product-purchase";
import { ProductCard } from "@/components/product-card";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/products";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.short,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getRelatedProducts(product, 4);

  return (
    <div className="container-px py-8 md:py-12">
      <nav className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/products" className="hover:text-foreground">
          Shop
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-semibold text-foreground">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="group relative">
            <ProductVisual
              emoji={product.emoji}
              accent={product.accent}
              name={product.name}
              className="aspect-square w-full rounded-[2.5rem] ring-1 ring-white/70"
              emojiClassName="text-[10rem] sm:text-[12rem]"
            />
            {product.badge && (
              <span className="absolute left-5 top-5 rounded-full bg-brand-navy px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white shadow">
                {product.badge}
              </span>
            )}
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

        <div>
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
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-extrabold text-brand-navy sm:text-3xl">
            You might also like
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
