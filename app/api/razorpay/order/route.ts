import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/products";
import { calculateTotals } from "@/lib/types";
import {
  createRazorpayOrder,
  getPublicKeyId,
  isRazorpayConfigured,
} from "@/lib/razorpay";

export const runtime = "nodejs";

type IncomingItem = { slug?: unknown; quantity?: unknown };

export async function POST(request: Request) {
  if (!isRazorpayConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Online payment is not configured" },
      { status: 503 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const rawItems = Array.isArray(body.items) ? (body.items as IncomingItem[]) : [];
  if (rawItems.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Cart is empty" },
      { status: 400 }
    );
  }

  const priced: { price: number; quantity: number }[] = [];
  for (const raw of rawItems) {
    const slug = typeof raw.slug === "string" ? raw.slug : "";
    const product = getProductBySlug(slug);
    if (!product) {
      return NextResponse.json(
        { ok: false, error: `Unknown product: ${slug || "(missing)"}` },
        { status: 400 }
      );
    }
    priced.push({
      price: product.price,
      quantity: Math.max(1, Math.min(20, Number(raw.quantity) || 1)),
    });
  }

  const { total } = calculateTotals(priced);
  const receipt = `hwa_${Date.now()}`;

  try {
    const razorpayOrder = await createRazorpayOrder(total, receipt);
    return NextResponse.json({
      ok: true,
      keyId: getPublicKeyId(),
      order: razorpayOrder,
      amount: total,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not start online payment" },
      { status: 502 }
    );
  }
}
