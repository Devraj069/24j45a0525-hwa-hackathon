import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Shipping & Delivery | Happy While Away",
  description:
    "How long the PawQuest Puzzle Ball takes to arrive, where we ship and what it costs.",
};

const sections = [
  {
    title: "1. Where we ship",
    body: [
      "We ship across India, and we also ship internationally to a growing list of countries. If your country is not listed at checkout, email us and we will see what we can do.",
      "Orders placed on weekdays are packed the same working day. Orders placed on Sundays or public holidays are packed on the next working day.",
    ],
  },
  {
    title: "2. Delivery timelines",
    body: [
      "Metro cities usually receive orders in 2 to 4 working days. The rest of India takes 4 to 7 working days. International orders take 7 to 15 working days after dispatch.",
      "These are estimates. Occasional delays happen with couriers and weather, and we will let you know by email if your parcel is held up.",
    ],
  },
  {
    title: "3. Shipping charges",
    body: [
      "Shipping is free on orders above ₹1,499. Below that, a flat ₹79 applies within India. International shipping is calculated at checkout based on destination and order weight.",
      "The exact shipping charge is always shown before you pay, so there are no surprises at the last step.",
    ],
  },
  {
    title: "4. Tracking your order",
    body: [
      "As soon as your parcel is picked up we email you a tracking link. You can also reply to that email with your order number and we will check on the parcel for you.",
    ],
  },
  {
    title: "5. Packing",
    body: [
      "The puzzle ball arrives in a snug recycled-cardboard box with no plastic fillers, so it can go straight into the bin or the recycling pile after unboxing.",
      "Every parcel is packed by hand in Hyderabad and checked before it leaves us.",
    ],
  },
  {
    title: "6. Delayed or lost parcels",
    body: [
      "If tracking has not updated for more than 7 working days, email us and we will contact the courier on your behalf and send a replacement where needed.",
      "A replacement is shipped at no extra cost whenever a parcel is confirmed lost in transit.",
    ],
  },
  {
    title: "7. Undeliverable parcels",
    body: [
      "If a parcel comes back because the address was incomplete or unreachable, we will contact you and either reship it after you confirm the address or refund the order, minus the original shipping charge.",
    ],
  },
  {
    title: "8. Need it faster",
    body: [
      "Send us a message with your order number and we will check what the courier can do for you. We cannot guarantee same-day delivery, but we will always be straight about what is possible.",
    ],
  },
];

export default function ShippingPage() {
  return (
    <LegalPage
      title="Shipping & Delivery"
      intro="Where your puzzle ball goes, how long it takes to get there and what it costs. Packed by hand in Hyderabad and on its way the same working day."
      updated="21 November 2026"
      sections={sections}
    />
  );
}
