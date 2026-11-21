"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const emptyForm = { name: "", email: "", subject: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  function update(field: keyof typeof emptyForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in your name, email and message.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Could not send your message.");
      }
      toast.success("Message sent! We'll reply within one working day.");
      setForm(emptyForm);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border bg-card p-5 shadow-sm sm:p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="contact-name">Your name</Label>
          <Input
            id="contact-name"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="Riya Sharma"
            className="mt-1.5"
            required
          />
        </div>
        <div>
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="you@example.com"
            className="mt-1.5"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="contact-subject">Subject</Label>
          <Input
            id="contact-subject"
            value={form.subject}
            onChange={(event) => update("subject", event.target.value)}
            placeholder="Order, product or just saying hi"
            className="mt-1.5"
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="contact-message">Message</Label>
          <Textarea
            id="contact-message"
            value={form.message}
            onChange={(event) => update("message", event.target.value)}
            placeholder="How can we help you and your dog?"
            className="mt-1.5"
            rows={5}
            required
          />
        </div>
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="mt-5 w-full rounded-full text-base sm:w-auto sm:px-8"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send message
          </>
        )}
      </Button>
    </form>
  );
}
