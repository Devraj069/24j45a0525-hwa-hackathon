import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions | Happy While Away",
  description:
    "The terms that apply when you buy the PawQuest Puzzle Ball from Happy While Away.",
};

const sections = [
  {
    title: "1. About these terms",
    body: [
      "These terms apply to every visit to our website and every order placed with Happy While Away. By browsing the site or placing an order, you agree to them.",
      "We may update these terms from time to time. The version published on this page is the one that applies to your order.",
    ],
  },
  {
    title: "2. Orders and acceptance",
    body: [
      "An order is a request to buy a product. It becomes a contract when we send you an order confirmation email with the shipping details.",
      "We may cancel and refund an order if the product is out of stock, if the listing price was published by mistake, or if we suspect fraud. If we cancel an order that was already paid for, the full amount goes back to the original payment method.",
    ],
  },
  {
    title: "3. Pricing and payment",
    body: [
      "All prices are listed in Indian Rupees and include applicable taxes unless stated otherwise. Delivery charges are shown separately at checkout.",
      "Payment is collected at checkout through our payment partner. We only receive the money once the payment is confirmed, and we never store your card details.",
    ],
  },
  {
    title: "4. Delivery",
    body: [
      "Delivery timelines are estimates and can be affected by courier delays or events outside our control. Please read our Shipping & Delivery policy for the full details.",
      "Please check your shipping address carefully before placing the order. We are not responsible for parcels that do not arrive because of an incorrect address.",
    ],
  },
  {
    title: "5. Use of the product",
    body: [
      "The PawQuest Puzzle Ball is designed for use under normal household conditions and under the supervision of an adult. It is not a chew toy for aggressive chewers.",
      "Use the product as described in our How to Use section. Stop use if the product is damaged or if your dog shows signs of discomfort, and contact us so we can help.",
    ],
  },
  {
    title: "6. Returns and refunds",
    body: [
      "If the product is not right for your dog, you can return it within 30 days of delivery. Items must be unused, clean and packed in the original packaging.",
      "Read our Refund Policy for the full process and for how quickly refunds are processed.",
    ],
  },
  {
    title: "7. Intellectual property",
    body: [
      "The name Happy While Away, the PawQuest brand, the product designs, the copy on this site and every image, illustration and logo used here belong to us or to our licensors.",
      "You may not copy, resell or republish our content or product designs without written permission.",
    ],
  },
  {
    title: "8. Limitation of liability",
    body: [
      "To the fullest extent the law allows, our liability for any claim connected with a product is limited to the amount you paid for that product.",
      "We are not responsible for indirect or consequential loss, including lost profits or harm caused by misuse of the product.",
    ],
  },
  {
    title: "9. Governing law",
    body: [
      "These terms are governed by the laws of India, and the courts of Hyderabad, Telangana have exclusive jurisdiction over any dispute that arises from them.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      intro="The straightforward rules for buying from Happy While Away — what we promise, what we ask of you, and how we handle the rare occasions when something goes wrong."
      updated="21 November 2026"
      sections={sections}
    />
  );
}
