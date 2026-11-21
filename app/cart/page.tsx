import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";

export const metadata: Metadata = {
  title: "Your cart",
  description: "Review the goodies in your Happy While Away cart.",
};

export default function CartPage() {
  return (
    <div className="container-px py-12 md:py-16">
      <div className="mb-8">
        <span className="eyebrow">Almost there</span>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-brand-navy">
          Your cart
        </h1>
      </div>
      <CartView />
    </div>
  );
}
