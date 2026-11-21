export type CartItem = {
  slug: string;
  name: string;
  size: string;
  price: number;
  emoji: string;
  accent: string;
  quantity: number;
};

export type Customer = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

export type PaymentInfo = {
  method: "cod" | "razorpay";
  status: "pending" | "paid" | "failed";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
};

export type OrderItem = {
  slug: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: Customer;
  payment: PaymentInfo;
  status: "placed" | "confirmed";
  createdAt: string;
};

export const FREE_SHIPPING_THRESHOLD = 1499;
export const SHIPPING_FEE = 79;

export function calculateTotals(items: { price: number; quantity: number }[]) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  return { subtotal, shipping, total: subtotal + shipping };
}
