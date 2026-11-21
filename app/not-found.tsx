import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-px flex flex-col items-center justify-center py-24 text-center">
      <span className="text-7xl">🐕‍🦺</span>
      <h1 className="mt-6 font-display text-4xl font-extrabold text-brand-navy">
        This page wandered off
      </h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        We couldn&apos;t find what you were looking for. Let&apos;s get you back
        to the good stuff.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg" className="rounded-full px-7">
          <Link href="/">Back home</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="rounded-full px-7">
          <Link href="/products">Shop products</Link>
        </Button>
      </div>
    </div>
  );
}
