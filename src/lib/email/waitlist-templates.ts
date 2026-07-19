import { getShowcaseSiteUrl } from "@/lib/waitlist/config";

type WaitlistEmailContent = {
  subject: string;
  text: string;
  html: string;
  listUnsubscribeUrl: string;
};

function wrapHtml(body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background:#0a0a0b;color:#e4e4e7;font-family:Arial,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0a0a0b;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#111113;border:1px solid #27272a;border-radius:16px;padding:32px;">
            <tr>
              <td>
                <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#34d399;">FareShare</p>
                ${body}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buttonHtml(href: string, label: string): string {
  return `<p style="margin:28px 0;">
    <a href="${href}" style="display:inline-block;background:#10b981;color:#04120d;text-decoration:none;font-weight:700;padding:12px 20px;border-radius:999px;">
      ${label}
    </a>
  </p>`;
}

export function buildWaitlistConfirmationEmail(input: {
  confirmationToken: string;
  unsubscribeToken: string;
}): WaitlistEmailContent {
  const siteUrl = getShowcaseSiteUrl();
  const confirmUrl = `${siteUrl}/waitlist/confirm?token=${encodeURIComponent(input.confirmationToken)}`;
  const unsubscribePageUrl = `${siteUrl}/waitlist/unsubscribe?token=${encodeURIComponent(input.unsubscribeToken)}`;
  const unsubscribeOneClickUrl = `${siteUrl}/api/waitlist/unsubscribe-oneclick?token=${encodeURIComponent(input.unsubscribeToken)}`;

  const text = [
    "Confirm your FareShare waitlist signup",
    "",
    "Thanks for joining the FareShare waitlist. Confirm your email to receive launch updates and early access news.",
    "",
    `Confirm your email: ${confirmUrl}`,
    "",
    "If you did not request this, you can ignore this email.",
    "",
    `Unsubscribe: ${unsubscribePageUrl}`,
  ].join("\n");

  const html = wrapHtml(`
    <h1 style="margin:0 0 12px;font-size:24px;line-height:1.3;color:#fafafa;">Confirm your waitlist signup</h1>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#a1a1aa;">
      Thanks for joining the FareShare waitlist. Confirm your email so we can send launch updates and early access news.
    </p>
    ${buttonHtml(confirmUrl, "Confirm my email")}
    <p style="margin:0;font-size:13px;line-height:1.6;color:#71717a;">
      If you did not request this, you can ignore this email.
    </p>
    <p style="margin:24px 0 0;font-size:12px;line-height:1.6;color:#52525b;">
      <a href="${unsubscribePageUrl}" style="color:#71717a;">Unsubscribe</a>
    </p>
  `);

  return {
    subject: "Confirm your FareShare waitlist signup",
    text,
    html,
    listUnsubscribeUrl: unsubscribeOneClickUrl,
  };
}

export function buildWaitlistWelcomeEmail(input: {
  unsubscribeToken: string;
}): WaitlistEmailContent {
  const siteUrl = getShowcaseSiteUrl();
  const unsubscribePageUrl = `${siteUrl}/waitlist/unsubscribe?token=${encodeURIComponent(input.unsubscribeToken)}`;
  const unsubscribeOneClickUrl = `${siteUrl}/api/waitlist/unsubscribe-oneclick?token=${encodeURIComponent(input.unsubscribeToken)}`;

  const text = [
    "You're on the FareShare waitlist",
    "",
    "Your email is confirmed. We'll reach out with launch updates, beta invitations, and product announcements.",
    "",
    "Waitlist signup does not create a FareShare account or purchase a plan.",
    "",
    `Unsubscribe: ${unsubscribePageUrl}`,
  ].join("\n");

  const html = wrapHtml(`
    <h1 style="margin:0 0 12px;font-size:24px;line-height:1.3;color:#fafafa;">You're on the waitlist</h1>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#a1a1aa;">
      Your email is confirmed. We'll reach out with launch updates, beta invitations, and product announcements.
    </p>
    <p style="margin:0;font-size:13px;line-height:1.6;color:#71717a;">
      Waitlist signup does not create a FareShare account or purchase a plan.
    </p>
    <p style="margin:24px 0 0;font-size:12px;line-height:1.6;color:#52525b;">
      <a href="${unsubscribePageUrl}" style="color:#71717a;">Unsubscribe</a>
    </p>
  `);

  return {
    subject: "You're on the FareShare waitlist",
    text,
    html,
    listUnsubscribeUrl: unsubscribeOneClickUrl,
  };
}
