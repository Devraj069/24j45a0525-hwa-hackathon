import crypto from "crypto";

export function isRazorpayConfigured(): boolean {
  const keyId = (process.env.RAZORPAY_KEY_ID ?? "").trim();
  const keySecret = (process.env.RAZORPAY_KEY_SECRET ?? "").trim();
  return Boolean(keyId && keySecret);
}

export function getPublicKeyId(): string | null {
  const keyId = (
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? process.env.RAZORPAY_KEY_ID ?? ""
  ).trim();
  return keyId || null;
}

export async function createRazorpayOrder(
  amountInRupees: number,
  receipt: string
) {
  const keyId = (process.env.RAZORPAY_KEY_ID ?? "").trim();
  const keySecret = (process.env.RAZORPAY_KEY_SECRET ?? "").trim();
  if (!keyId || !keySecret) {
    throw new Error("Razorpay is not configured");
  }

  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify({
      amount: Math.round(amountInRupees * 100),
      currency: "INR",
      receipt,
      notes: { store: "Happy While Away" },
    }),
  });

  if (!response.ok) {
    throw new Error("Could not create Razorpay order");
  }

  return (await response.json()) as {
    id: string;
    amount: number;
    currency: string;
  };
}

export function verifyRazorpaySignature(params: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  signature: string;
}): boolean {
  const secret = (process.env.RAZORPAY_KEY_SECRET ?? "").trim();
  if (!secret) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${params.razorpayOrderId}|${params.razorpayPaymentId}`)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected),
      Buffer.from(params.signature)
    );
  } catch {
    return false;
  }
}
