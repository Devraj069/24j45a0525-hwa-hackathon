import { NextResponse } from "next/server";
import { verifyRazorpaySignature } from "@/lib/razorpay";

export const runtime = "nodejs";

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

  const razorpayOrderId =
    typeof body.razorpay_order_id === "string" ? body.razorpay_order_id : "";
  const razorpayPaymentId =
    typeof body.razorpay_payment_id === "string"
      ? body.razorpay_payment_id
      : "";
  const signature =
    typeof body.razorpay_signature === "string" ? body.razorpay_signature : "";

  if (!razorpayOrderId || !razorpayPaymentId || !signature) {
    return NextResponse.json(
      { ok: false, error: "Missing payment fields" },
      { status: 400 }
    );
  }

  const verified = verifyRazorpaySignature({
    razorpayOrderId,
    razorpayPaymentId,
    signature,
  });

  if (!verified) {
    return NextResponse.json(
      { ok: false, verified: false, error: "Signature verification failed" },
      { status: 400 }
    );
  }

  return NextResponse.json({ ok: true, verified: true });
}
