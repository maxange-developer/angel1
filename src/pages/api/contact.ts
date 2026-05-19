import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import { z } from "zod";

const FROM_ADDRESS = "Angel1 <noreply@massimilianoangelone.com>";
const TO_ADDRESS = "hello@massimilianoangelone.com";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  projectType: z.string().min(1),
  message: z.string().min(20),
});

const TYPE_LABELS: Record<string, string> = {
  "ai-sprint": "AI Sprint — €2,500",
  "mvp-lite": "MVP Lite — €5,000",
  "mvp-full": "MVP Full — €9,500",
  custom: "Custom scope",
  other: "Just exploring",
};

function buildNotificationHtml(data: z.infer<typeof contactSchema>): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:sans-serif;background:#0a0a0a;color:#fff;padding:32px;max-width:600px;margin:0 auto;">
  <h2 style="color:#1F8BFF;margin-bottom:24px;">New contact from Angel1</h2>
  <table style="width:100%;border-collapse:collapse;">
    <tr><td style="padding:8px 0;color:#aaa;width:120px;">Name</td><td style="padding:8px 0;color:#fff;font-weight:600;">${data.name}</td></tr>
    <tr><td style="padding:8px 0;color:#aaa;">Email</td><td style="padding:8px 0;"><a href="mailto:${data.email}" style="color:#1F8BFF;">${data.email}</a></td></tr>
    <tr><td style="padding:8px 0;color:#aaa;">Project type</td><td style="padding:8px 0;color:#fff;">${TYPE_LABELS[data.projectType] ?? data.projectType}</td></tr>
  </table>
  <div style="margin-top:24px;padding:16px;background:#111;border-left:3px solid #1F8BFF;border-radius:4px;">
    <p style="color:#aaa;font-size:12px;margin:0 0 8px;">Message</p>
    <p style="color:#fff;margin:0;white-space:pre-wrap;">${data.message}</p>
  </div>
  <p style="margin-top:24px;color:#555;font-size:12px;">Sent via massimilianoangelone.com</p>
</body>
</html>`;
}

function buildAutoReplyHtml(name: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:sans-serif;background:#0a0a0a;color:#fff;padding:32px;max-width:600px;margin:0 auto;">
  <h2 style="color:#1F8BFF;margin-bottom:16px;">Hi ${name}!</h2>
  <p style="color:#ccc;line-height:1.7;">I received your message and will get back to you within <strong style="color:#fff;">24 hours</strong> (usually much sooner).</p>
  <p style="color:#ccc;line-height:1.7;">For urgent matters, write to me at <a href="mailto:${TO_ADDRESS}" style="color:#1F8BFF;">${TO_ADDRESS}</a>.</p>
  <p style="color:#aaa;line-height:1.7;font-size:14px;">Talk soon,<br><strong style="color:#fff;">Massi</strong><br><span style="color:#555;">massimilianoangelone.com</span></p>
</body>
</html>`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact API] RESEND_API_KEY is not set");
    return res.status(500).json({ error: "Email service not configured" });
  }
  const resend = new Resend(apiKey);

  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid data", issues: parsed.error.flatten() });
  }

  const data = parsed.data;

  try {
    await Promise.all([
      resend.emails.send({
        from: FROM_ADDRESS,
        to: TO_ADDRESS,
        subject: `[Angel1] ${data.name} — ${TYPE_LABELS[data.projectType] ?? data.projectType}`,
        html: buildNotificationHtml(data),
        replyTo: data.email,
      }),
      resend.emails.send({
        from: FROM_ADDRESS,
        to: data.email,
        subject: "Got your message! — Massimiliano Angelone",
        html: buildAutoReplyHtml(data.name),
      }),
    ]);

    return res.status(200).json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[contact API] Email send failed:", message);
    return res.status(500).json({ error: "Email failed to send. Try writing directly to hello@massimilianoangelone.com" });
  }
}
