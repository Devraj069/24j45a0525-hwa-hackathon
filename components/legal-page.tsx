import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export type LegalSection = {
  title: string;
  body: string[];
};

export function LegalPage({
  title,
  intro,
  updated,
  sections,
}: {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <div className="container-px py-12 md:py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>

      <div className="mt-6 max-w-3xl">
        <h1 className="font-display text-3xl font-extrabold text-brand-navy sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">{intro}</p>
        <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground/80">
          Last updated: {updated}
        </p>
      </div>

      <div className="mt-10 max-w-3xl space-y-8">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-display text-xl font-bold text-brand-navy">
              {section.title}
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 max-w-3xl rounded-3xl border bg-card p-6">
        <h2 className="font-display text-lg font-bold text-brand-navy">
          Questions about this policy?
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Write to us at hello@happywhileaway.com and a real human from our
          small team will get back to you within one working day.
        </p>
      </div>
    </div>
  );
}
