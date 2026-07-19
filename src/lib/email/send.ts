import "server-only";

import nodemailer from "nodemailer";

import { getWaitlistFromEmail, isWaitlistEmailConfigured } from "@/lib/waitlist/config";

type SendEmailInput = {
  to: string;
  subject: string;
  text: string;
  html: string;
  listUnsubscribeUrl?: string;
};

let transporter: nodemailer.Transporter | null = null;

function getSmtpUser(): string | null {
  return (
    process.env.WAITLIST_SMTP_USER?.trim() ??
    process.env.OUTLOOK_SMTP_USER?.trim() ??
    null
  );
}

function getSmtpPassword(): string | null {
  return (
    process.env.WAITLIST_SMTP_PASSWORD?.trim() ??
    process.env.OUTLOOK_SMTP_PASSWORD?.trim() ??
    null
  );
}

function getTransporter(): nodemailer.Transporter | null {
  if (!isWaitlistEmailConfigured()) {
    return null;
  }

  if (!transporter) {
    const user = getSmtpUser()!;
    const pass = getSmtpPassword()!;
    const host =
      process.env.WAITLIST_SMTP_HOST?.trim() ??
      process.env.SMTP_HOST?.trim() ??
      "smtp.office365.com";
    const port = Number(process.env.WAITLIST_SMTP_PORT ?? process.env.SMTP_PORT ?? 587);

    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }

  return transporter;
}

export async function sendTransactionalEmail(
  input: SendEmailInput,
): Promise<void> {
  const transport = getTransporter();
  const from = getWaitlistFromEmail();

  if (!transport || !from) {
    throw new Error("Waitlist email is not configured.");
  }

  const headers: Record<string, string> = {};

  if (input.listUnsubscribeUrl) {
    headers["List-Unsubscribe"] = `<${input.listUnsubscribeUrl}>`;
    headers["List-Unsubscribe-Post"] = "List-Unsubscribe=One-Click";
  }

  await transport.sendMail({
    from: `FareShare <${from}>`,
    to: input.to,
    subject: input.subject,
    text: input.text,
    html: input.html,
    headers,
  });
}
