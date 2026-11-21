import { promises as fs } from "fs";
import path from "path";
import type { Order } from "@/lib/types";

const isServerless = process.env.VERCEL === "1";
const dataDir = isServerless ? "/tmp" : path.join(process.cwd(), "data");
const ordersPath = path.join(dataDir, "orders.json");

type OrderFile = { orders: Order[] };

let writeQueue: Promise<unknown> = Promise.resolve();

async function ensureFile() {
  try {
    await fs.access(ordersPath);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(ordersPath, JSON.stringify({ orders: [] }, null, 2), "utf8");
  }
}

export async function readOrders(): Promise<Order[]> {
  await ensureFile();
  try {
    const raw = await fs.readFile(ordersPath, "utf8");
    const parsed = JSON.parse(raw) as OrderFile;
    return Array.isArray(parsed.orders) ? parsed.orders : [];
  } catch {
    return [];
  }
}

async function writeOrders(orders: Order[]) {
  await fs.writeFile(
    ordersPath,
    JSON.stringify({ orders }, null, 2),
    "utf8"
  );
}

export function generateOrderId(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `HWA-${stamp}-${random}`;
}

export async function saveOrder(order: Order): Promise<Order> {
  const task = writeQueue.then(async () => {
    const orders = await readOrders();
    orders.unshift(order);
    await writeOrders(orders.slice(0, 500));
    return order;
  });
  writeQueue = task.catch(() => undefined);
  return task;
}

export async function getOrder(id: string): Promise<Order | undefined> {
  const orders = await readOrders();
  return orders.find((order) => order.id === id);
}
