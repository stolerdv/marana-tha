import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Log for now — wire to Mailchimp / Resend audience later
    console.log("📧 Newsletter signup:", email);

    // TODO: integrate with email provider
    // e.g. Mailchimp, Brevo, or Resend contacts API

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
