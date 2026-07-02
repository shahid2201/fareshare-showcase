/** Common disposable / throwaway email domains blocked on waitlist signup. */

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "guerrillamail.net",
  "guerrillamail.org",
  "sharklasers.com",
  "grr.la",
  "tempmail.com",
  "temp-mail.org",
  "throwaway.email",
  "yopmail.com",
  "trashmail.com",
  "getnada.com",
  "dispostable.com",
  "maildrop.cc",
  "10minutemail.com",
  "fakeinbox.com",
  "mintemail.com",
  "mailnesia.com",
  "spamgourmet.com",
  "mytemp.email",
  "emailondeck.com",
  "tempail.com",
  "burnermail.io",
]);

export function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1]?.trim().toLowerCase();
  if (!domain) {
    return false;
  }

  return DISPOSABLE_EMAIL_DOMAINS.has(domain);
}
