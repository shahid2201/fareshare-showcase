import type { NextConfig } from "next";

import { loadSharedFareShareEnv } from "./src/lib/env/load-shared-env";

loadSharedFareShareEnv();

const cloudflareTurnstile =
  "https://challenges.cloudflare.com https://*.challenges.cloudflare.com";
const cloudflareInsights = "https://static.cloudflareinsights.com";

const contentSecurityPolicy = [
  "default-src 'self'",
  [
    "script-src",
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    cloudflareTurnstile,
    cloudflareInsights,
  ].join(" "),
  "style-src 'self' 'unsafe-inline'",
  ["img-src", "'self'", "data:", "blob:", cloudflareTurnstile].join(" "),
  "font-src 'self'",
  [
    "connect-src",
    "'self'",
    "https://*.supabase.co",
    cloudflareTurnstile,
    cloudflareInsights,
  ].join(" "),
  // Turnstile loads from challenges.cloudflare.com only.
  // Do not list about:blank / about:srcdoc — Chromium rejects them as invalid CSP sources.
  ["frame-src", "'self'", cloudflareTurnstile].join(" "),
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
