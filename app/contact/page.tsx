import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Questions about an order or a product? Talk to the Happy While Away team.",
};

const details = [
  { icon: Mail, label: "Email", value: "hello@happywhileaway.com" },
  { icon: Phone, label: "Phone", value: "+91 98765 43210" },
  { icon: MapPin, label: "Studio", value: "Hyderabad, India" },
  { icon: Clock, label: "Hours", value: "Mon–Sat, 9am–6pm IST" },
];

export default function ContactPage() {
  return (
    <div className="container-px py-12 md:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">We&apos;d love to help</span>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-brand-navy sm:text-5xl">
          Get in touch
        </h1>
        <p className="mt-3 text-muted-foreground">
          Questions about an order, a product or your dog&apos;s next favourite
          toy? Send us a note and a real human will reply.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-3">
          {details.map((detail) => (
            <div
              key={detail.label}
              className="flex items-start gap-3 rounded-2xl border bg-card p-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                <detail.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  {detail.label}
                </p>
                <p className="font-semibold">{detail.value}</p>
              </div>
            </div>
          ))}
          <div className="rounded-2xl bg-brand-navy p-5 text-white">
            <p className="font-display text-lg font-bold">Quick answers</p>
            <p className="mt-1 text-sm text-white/70">
              Free shipping over ₹1,499 · 30-day returns · Dispatched within 24
              hours.
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
