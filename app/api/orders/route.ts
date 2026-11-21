import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/products";
import { calculateTotals, type Customer, type OrderItem } from "@/lib/types";
import {
  generateOrderId,
  readOrders,
  saveOrder,
} from "@/lib/orders";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import type { Order } from "@/lib/types";

export const runtime = "nodejs";

type IncomingItem = { slug?: unknown; size?: unknown; quantity?: unknown };

function cleanString(value: unknown, max = 200): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function GET() {
  const orders = await readOrders();
  return NextResponse.json({
    ok: true,
    service: "Happy While Away orders",
    count: orders.length,
    orders,
  });
}

export async function POST(request: Request) {
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

  const items: OrderItem[] = [];
  for (const raw of rawItems) {
    const slug = cleanString(raw.slug, 80);
    const product = getProductBySlug(slug);
    if (!product) {
      return NextResponse.json(
        { ok: false, error: `Unknown product: ${slug || "(missing)"}` },
        { status: 400 }
      );
    }
    const quantity = Math.max(
      1,
      Math.min(20, Number(raw.quantity) || 1)
    );
    const requestedSize = cleanString(raw.size, 40);
    const size = product.sizes.includes(requestedSize)
      ? requestedSize
      : product.sizes[0];
    items.push({
      slug: product.slug,
      name: product.name,
      size,
      price: product.price,
      quantity,
    });
  }

  const rawCustomer =
    body.customer && typeof body.customer === "object"
      ? (body.customer as Record<string, unknown>)
      : {};

  const customer: Customer = {
    name: cleanString(rawCustomer.name, 120),
    email: cleanString(rawCustomer.email, 160),
    phone: cleanString(rawCustomer.phone, 20),
    address: cleanString(rawCustomer.address, 300),
    city: cleanString(rawCustomer.city, 80),
    state: cleanString(rawCustomer.state, 80),
    pincode: cleanString(rawCustomer.pincode, 10),
  };

  const missing: string[] = [];
  if (!customer.name) missing.push("name");
  if (!isEmail(customer.email)) missing.push("email");
  if (!/^[0-9+\-\s]{7,15}$/.test(customer.phone)) missing.push("phone");
  if (!customer.address) missing.push("address");
  if (!customer.city) missing.push("city");
  if (!customer.state) missing.push("state");
  if (!/^[0-9]{6}$/.test(customer.pincode)) missing.push("pincode");

  if (missing.length > 0) {
    return NextResponse.json(
      { ok: false, error: "Missing or invalid fields", fields: missing },
      { status: 422 }
    );
  }

  const { subtotal, shipping, total } = calculateTotals(items);

  const rawPayment =
    body.payment && typeof body.payment === "object"
      ? (body.payment as Record<string, unknown>)
      : {};
  const method = rawPayment.method === "razorpay" ? "razorpay" : "cod";
  const razorpayOrderId = cleanString(rawPayment.razorpayOrderId, 120);
  const razorpayPaymentId = cleanString(rawPayment.razorpayPaymentId, 120);
  const razorpaySignature = cleanString(rawPayment.razorpaySignature, 200);

  let status: "pending" | "paid" | "failed" = "pending";
  if (
    method === "razorpay" &&
    razorpayOrderId &&
    razorpayPaymentId &&
    razorpaySignature &&
    verifyRazorpaySignature({
      razorpayOrderId,
      razorpayPaymentId,
      signature: razorpaySignature,
    })
  ) {
    status = "paid";
  }

  const order: Order = {
    id: generateOrderId(),
    items,
    subtotal,
    shipping,
    total,
    customer,
    payment: {
      method,
      status,
      ...(razorpayOrderId ? { razorpayOrderId } : {}),
      ...(razorpayPaymentId ? { razorpayPaymentId } : {}),
    },
    status: status === "paid" ? "confirmed" : "placed",
    createdAt: new Date().toISOString(),
  };

  await saveOrder(order);

  return NextResponse.json({ ok: true, order }, { status: 201 });
}
