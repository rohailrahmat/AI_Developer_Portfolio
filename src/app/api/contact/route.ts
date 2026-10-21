import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";

// ─── Rate limiter ─────────────────────────────────────────────────────────────
let ratelimit: Ratelimit | null = null;
if (
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
) {
  ratelimit = new Ratelimit({
    redis: new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    }),
    limiter: Ratelimit.slidingWindow(3, "10 m"),
    analytics: false,
    prefix: "contact",
  });
}

// ─── Zod schema ───────────────────────────────────────────────────────────────
const ContactSchema = z.object({
  name: z.string().min(2, "Name is required.").max(100),
  email: z.string().email("Please enter a valid email address."),
  projectType: z.string().min(1, "Please select a project type.").max(100),
  budget: z.string().max(100).optional(),
  message: z
    .string()
    .min(20, "Please write at least 20 characters.")
    .max(3000, "Please keep your message under 3,000 characters."),
  // Honeypot — must be empty
  website: z.string().max(0, "Bot detected.").optional(),
  // Turnstile token
  turnstileToken: z.string().min(1, "Please complete the security check."),
});

// ─── Turnstile verification ────────────────────────────────────────────────────
async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return process.env.NODE_ENV !== "production";

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, response: token }),
      }
    );
    const data = await res.json();
    return data.success === true;
  } catch {
    return false;
  }
}

// ─── Route handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  if (
    process.env.NODE_ENV === "production" &&
    (!process.env.RESEND_API_KEY?.trim() ||
      !process.env.TURNSTILE_SECRET_KEY?.trim() ||
      !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim())
  ) {
    return NextResponse.json(
      { error: "The contact form is not configured. Please email me directly." },
      { status: 503 }
    );
  }

  // Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "anonymous";

  if (ratelimit) {
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please wait 10 minutes and try again." },
        { status: 429 }
      );
    }
  }

  // Parse and validate
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, projectType, budget, message, website, turnstileToken } =
    parsed.data;

  // Honeypot
  if (website && website.length > 0) {
    // Silently succeed to not tip off bots
    return NextResponse.json({ success: true });
  }

  // Turnstile
  const valid = await verifyTurnstile(turnstileToken);
  if (!valid) {
    return NextResponse.json(
      { error: "Security check failed. Please try again." },
      { status: 400 }
    );
  }

  const resendKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.OWNER_EMAIL ?? "rohailrahmat7525@gmail.com";

  if (!resendKey?.trim()) {
    return NextResponse.json(
      { error: "The contact service is temporarily unavailable. Please email me directly." },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(resendKey);
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ownerEmail,
      replyTo: email,
      subject: `New inquiry from ${name} — ${projectType}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Project type: ${projectType}`,
        budget ? `Budget: ${budget}` : null,
        "",
        "Message:",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });
    if (error) {
      console.error("[contact] Resend error:", error.message);
      return NextResponse.json(
        { error: "Your message could not be sent. Please try again or email me directly." },
        { status: 502 }
      );
    }
    return NextResponse.json({ success: true, delivered: true });
  } catch (error) {
    console.error(
      "[contact] Resend error:",
      error instanceof Error ? error.message : "unknown"
    );
    return NextResponse.json(
      { error: "Your message could not be sent. Please try again or email me directly." },
      { status: 502 }
    );
  }
}
