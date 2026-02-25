import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM || "onboarding@resend.dev";
const TO_EMAIL = process.env.RESEND_TO || "mohantejad15@gmail.com";

declare global {
  // eslint-disable-next-line no-var
  var __rateLimitStore: Record<string, { count: number; resetAt: number }> | undefined;
}

const rateLimitStore: Record<string, { count: number; resetAt: number }> =
  globalThis.__rateLimitStore || {};
globalThis.__rateLimitStore = rateLimitStore;

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

function getClientIp(req: Request) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const now = Date.now();
    const entry = rateLimitStore[ip] || { count: 0, resetAt: now + WINDOW_MS };
    if (now > entry.resetAt) {
      entry.count = 0;
      entry.resetAt = now + WINDOW_MS;
    }
    entry.count += 1;
    rateLimitStore[ip] = entry;
    if (entry.count > MAX_REQUESTS) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const { name, email, subject, message, company } = await req.json();

    if (company) {
      return NextResponse.json({ success: "Email sent successfully!" });
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(String(name));
    const safeEmail = escapeHtml(String(email));
    const safeSubject = escapeHtml(String(subject));
    const safeMessage = escapeHtml(String(message));

    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `Portfolio contact: ${safeSubject}`,
      html: `<p><strong>Name:</strong> ${safeName}</p>
             <p><strong>Email:</strong> ${safeEmail}</p>
             <p><strong>Subject:</strong> ${safeSubject}</p>
             <p><strong>Message:</strong></p>
             <p>${safeMessage}</p>`,
    });

    if (data.error) {
      throw new Error(data.error.message);
    }

    return NextResponse.json({ success: "Email sent successfully!" });
  } catch {
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
