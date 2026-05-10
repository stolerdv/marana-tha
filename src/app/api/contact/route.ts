import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, city, message } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Log to console for now — Resend email can be wired here later
    console.log("📬 Nová správa z Pridaj sa:", { name, email, city, message });

    // TODO: wire Resend email when RESEND_API_KEY is set
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "web@maranatha.sk",
    //   to: "info@maranathapo.sk",
    //   subject: `Nová správa od ${name}`,
    //   html: `<p>Od: ${name} (${email})</p><p>Mesto: ${city}</p><p>${message}</p>`,
    // });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
