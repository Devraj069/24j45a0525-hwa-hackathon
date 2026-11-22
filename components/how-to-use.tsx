"use client";

import { motion } from "motion/react";
import { Bone, Lock, PackageOpen, Sparkles } from "lucide-react";

const steps = [
  {
    icon: PackageOpen,
    title: "Open the Treat Compartment",
    text: "Twist the top ring and lift the lid to open the treat chamber. The lid lifts straight off, so no bits get lost.",
  },
  {
    icon: Bone,
    title: "Add a Few Small Treats",
    text: "Drop in a few small dog-safe treats or pieces of kibble. Small bites work best so they roll out slowly.",
  },
  {
    icon: Lock,
    title: "Close the Compartment",
    text: "Snap the lid back on and twist until it locks, so nothing spills out while your dog works on it.",
  },
  {
    icon: Sparkles,
    title: "Place It on a Flat Surface",
    text: "Set the ball on the floor and let your dog roll, paw and nudge it — every tumble releases a little treat.",
  },
];

export function HowToUse() {
  return (
    <section id="how-to-use" className="relative z-30 scroll-mt-20 bg-background">
      <div className="container-px py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <span className="eyebrow">How to use</span>
          <h2 className="mt-4 font-display text-[2.1rem] font-extrabold leading-tight text-brand-navy sm:text-4xl">
            Four steps to snack-time play.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            No batteries, no complicated parts. Fill it, lock it, drop it on
            the floor and let the fun begin.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col rounded-3xl border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="absolute right-5 top-4 font-display text-4xl font-extrabold text-brand-navy/10 transition group-hover:text-brand-navy/20">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                <step.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-brand-navy">
                {step.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                {step.text}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
