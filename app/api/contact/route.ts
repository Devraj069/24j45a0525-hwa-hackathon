import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const isServerless = process.env.VERCEL === "1";
const dataDir = isServerless ? "/tmp" : path.join(process.cwd(), "data");
const messagesPath = path.join(dataDir, "messages.json");

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

async function readMessages(): Promise<Message[]> {
  try {
    const raw = await fs.readFile(messagesPath, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.messages) ? parsed.messages : [];
  } catch {
    return [];
  }
}

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function GET() {
  const messages = await readMessages();
  return NextResponse.json({ ok: true, count: messages.length });
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

  const name = clean(body.name, 120);
  const email = clean(body.email, 160);
  const subject = clean(body.subject, 160);
  const message = clean(body.message, 2000);

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) {
    return NextResponse.json(
      { ok: false, error: "Please provide a name, valid email and message." },
      { status: 422 }
    );
  }

  const entry: Message = {
    id: `MSG-${Date.now().toString(36).toUpperCase()}`,
    name,
    email,
    subject: subject || "General enquiry",
    message,
    createdAt: new Date().toISOString(),
  };

  try {
    await fs.mkdir(dataDir, { recursive: true });
    const messages = await readMessages();
    messages.unshift(entry);
    await fs.writeFile(
      messagesPath,
      JSON.stringify({ messages: messages.slice(0, 500) }, null, 2),
      "utf8"
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not send your message right now." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, message: "Message received" });
}
