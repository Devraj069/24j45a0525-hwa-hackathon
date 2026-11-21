import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Refund Policy | Happy While Away",
  description:
    "How to return the PawQuest Puzzle Ball and get your money back within 30 days.",
};

const sections = [
  {
    title: "1. Our promise",
    body: [
      "If the PawQuest Puzzle Ball is not right for your dog, send it back within 30 days of delivery and we will refund you. We would rather fix a bad fit than argue about it.",
      "This promise applies to orders placed on our site, in the currency and market you ordered in.",
    ],
  },
  {
    title: "2. What has to be in order",
    body: [
      "The ball must be unused, clean, dry and packed in its original packaging. A little wear from play is fine, but the product should not be chewed apart or damaged.",
      "Please include the original invoice or order number with the parcel so we can find your order quickly.",
    ],
  },
  {
    title: "3. How to start a return",
    body: [
      "Email us at hello@happywhileaway.com with your order number and a line about what happened. We will reply within one working day with a return address and a pickup option where we have one.",
      "Returns are always sent to our return address in Hyderabad, Telangana. Please do not send a parcel to any other address, as it will not reach us.",
    ],
  },
  {
    title: "4. Who pays for shipping",
    body: [
      "If the product arrived damaged, faulty or not as described, we cover the return shipping and any replacement shipment.",
      "If the return is because the product is not a fit for your dog, the cost of return shipping is yours.",
    ],
  },
  {
    title: "5. How quickly you get your money back",
    body: [
      "We inspect every return within 5 working days of it reaching us. If the return is approved, the refund is issued to the original payment method and usually reaches you within 5 to 10 working days, depending on your bank.",
      "Any delivery charges you paid at checkout are refunded along with the product price. If your order qualified for free shipping, we do not charge a restocking fee.",
    ],
  },
  {
    title: "6. Damaged on arrival",
    body: [
      "If the ball arrives broken or with a missing part, photograph it and email us within 7 days of delivery. We will ship a replacement straight away, and you do not need to return the damaged item unless we ask you to.",
    ],
  },
  {
    title: "7. Wrong or unwanted items",
    body: [
      "We are happy to arrange a return if you ordered the wrong item or simply changed your mind, as long as it is unused and within the 30-day window.",
    ],
  },
  {
    title: "8. Orders that cannot be returned",
    body: [
      "Personalised items, gift cards and products that have been chewed or damaged after delivery cannot be returned or refunded.",
      "Orders that were paid for with a promotional code are still eligible, but we do not refund the value of a separate discount coupon that was used.",
    ],
  },
  {
    title: "9. Contact",
    body: [
      "Any question about a refund can be sent to hello@happywhileaway.com with your order number. We answer every refund message personally.",
    ],
  },
];

export default function RefundsPage() {
  return (
    <LegalPage
      title="Refund Policy"
      intro="Thirty days, no argument. If the puzzle ball is not a fit for your dog, send it back and we will refund you."
      updated="21 November 2026"
      sections={sections}
    />
  );
}
