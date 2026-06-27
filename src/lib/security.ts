const DANGEROUS_PROTOCOL =
  /^(javascript|data|vbscript|file|blob):/i;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function sanitizeHref(href: string, fallback = "#"): string {
  if (typeof href !== "string") return fallback;

  const trimmed = href.trim();
  if (!trimmed) return fallback;

  if (trimmed.startsWith("#")) {
    return trimmed;
  }

  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    return trimmed;
  }

  const lower = trimmed.toLowerCase();
  if (DANGEROUS_PROTOCOL.test(lower)) return fallback;

  if (
    lower.startsWith("https://") ||
    lower.startsWith("http://") ||
    lower.startsWith("mailto:") ||
    lower.startsWith("tel:")
  ) {
    return trimmed;
  }

  return fallback;
}

export function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href.trim());
}

export function sanitizeTextInput(
  value: string,
  options: { maxLength?: number; allowNewlines?: boolean } = {}
): string {
  const { maxLength = 500, allowNewlines = false } = options;

  const withoutControlChars = allowNewlines
    ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    : value.replace(/[\u0000-\u001F\u007F]/g, "");

  const trimmed = withoutControlChars.trim();
  return trimmed.length > maxLength ? trimmed.slice(0, maxLength) : trimmed;
}

export function sanitizeEmail(value: string): string | null {
  const sanitized = sanitizeTextInput(value, { maxLength: 254 });
  if (!EMAIL_PATTERN.test(sanitized)) return null;
  return sanitized.toLowerCase();
}

export function sanitizeFileName(value: string): string {
  const baseName = value.split(/[/\\]/).pop() ?? "file";
  return sanitizeTextInput(baseName, { maxLength: 120 }) || "file";
}

export function buildMailtoHref(
  email: string,
  options: { subject?: string; body?: string } = {}
): string {
  const params = new URLSearchParams();

  if (options.subject) {
    params.set("subject", sanitizeTextInput(options.subject, { maxLength: 200 }));
  }

  if (options.body) {
    params.set("body", sanitizeTextInput(options.body, { maxLength: 2000 }));
  }

  const query = params.toString();
  return query ? `mailto:${email}?${query}` : `mailto:${email}`;
}
