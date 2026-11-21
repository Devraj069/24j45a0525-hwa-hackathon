import type { Metadata } from "next";
import { OrderSuccess } from "@/components/order-success";

export const metadata: Metadata = {
  title: "Order confirmed",
  description: "Thank you for your Happy While Away order.",
};

export default function OrderSuccessPage() {
  return (
    <div className="container-px py-14 md:py-20">
      <OrderSuccess />
    </div>
  );
}
