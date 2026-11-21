import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/ui/sonner";

const display = Baloo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
});

const sans = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Happy While Away | Joyful Dog Essentials",
    template: "%s | Happy While Away",
  },
  description:
    "Thoughtfully made toys, feeders, beds and grooming essentials that keep your dog happy, busy and comfortable while you're away.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Happy While Away | Joyful Dog Essentials",
    description:
      "Thoughtfully made toys, feeders, beds and grooming essentials that keep your dog happy, busy and comfortable.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-background font-sans text-foreground">
        <CartProvider>
          <SmoothScroll />
          <SiteHeader />
          <main className="flex min-h-[60vh] flex-col">{children}</main>
          <SiteFooter />
          <Toaster richColors position="top-center" />
        </CartProvider>
      </body>
    </html>
  );
}
