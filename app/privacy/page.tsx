import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Happy While Away",
  description:
    "How Happy While Away collects, uses and protects the information you share with us.",
};

const sections = [
  {
    title: "1. The short version",
    body: [
      "We collect only what we need to deliver your order and to answer your messages. We do not sell your data, and we do not share it with advertisers.",
      "You can ask us at any time to show, correct or delete the information we hold about you.",
    ],
  },
  {
    title: "2. Information we collect",
    body: [
      "When you place an order we collect your name, delivery address, email address, phone number and the details of what you bought. We also receive the payment status from our payment partner, but we never see or store your card number.",
      "When you contact us through the contact form or subscribe to our emails, we keep the message and your email address so we can reply and keep you posted.",
      "Our site also collects basic technical data such as browser type, device type and pages visited, used only to understand which parts of the site work well.",
    ],
  },
  {
    title: "3. How we use your information",
    body: [
      "We use your details to process and deliver orders, to handle returns and refunds, to answer your questions and to send you occasional emails about new products and dog-care tips.",
      "Every marketing email includes a one-click unsubscribe link. We never sell your data to anyone.",
    ],
  },
  {
    title: "4. Sharing with trusted partners",
    body: [
      "We share only what is needed, and only with partners who help us run the shop: the payment processor that takes your payment and the courier that delivers your parcel.",
      "These partners are required to keep your information confidential and to use it only for the service they provide to us.",
    ],
  },
  {
    title: "5. Cookies",
    body: [
      "We use cookies and similar technologies to keep your cart and session working and to understand how the site is used. You can clear or block cookies in your browser settings; some features of the shop may stop working if you do.",
    ],
  },
  {
    title: "6. How long we keep it",
    body: [
      "Order records are kept for as long as the law requires us to keep them for accounting and tax purposes. Messages and newsletter subscriptions are kept until you ask us to remove them.",
    ],
  },
  {
    title: "7. Your rights",
    body: [
      "You can ask us for a copy of the information we hold, ask us to correct anything that is wrong, or ask us to delete it entirely where we are not legally required to keep it.",
      "Send any such request to hello@happywhileaway.com and we will action it within a reasonable time.",
    ],
  },
  {
    title: "8. Keeping your data safe",
    body: [
      "All traffic to our site is encrypted with HTTPS, access to customer records is limited to the people who need it, and no payment card data is stored on our systems at all.",
    ],
  },
  {
    title: "9. Children",
    body: [
      "Our shop is made for adults who buy products for their pets. We do not knowingly collect information from children, and we will delete any such information if we learn that it was provided.",
    ],
  },
  {
    title: "10. Changes and contact",
    body: [
      "If we make a significant change to this policy, we will update the date at the top of this page. Questions about privacy can be sent to hello@happywhileaway.com.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="We keep the amount of data we collect small, we never sell it, and we are happy to delete it whenever you ask. Here is exactly what that means."
      updated="21 November 2026"
      sections={sections}
    />
  );
}
