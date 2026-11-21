import { NextResponse } from "next/server";
import { isRazorpayConfigured, getPublicKeyId } from "@/lib/razorpay";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    razorpayEnabled: isRazorpayConfigured(),
    keyId: isRazorpayConfigured() ? getPublicKeyId() : null,
  });
}
