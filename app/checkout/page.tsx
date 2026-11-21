import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout-view";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Happy While Away order securely.",
};

export default function CheckoutPage() {
  return (
    <div className="container-px py-12 md:py-16">
      <div className="mb-8">
        <span className="eyebrow">Secure checkout</span>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-brand-navy">
          Let&apos;s get these goodies home
        </h1>
      </div>
      <CheckoutView />
    </div>
  );
}
