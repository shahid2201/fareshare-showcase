export const SUPPORT_EMAIL = "support@fareshare.app";

export type AccountMenuRow =
  | {
      label: string;
      href: string;
      external?: boolean;
    }
  | {
      label: string;
      action: "sign-out";
    };

/** MVP account menu — only rows that are honest for launch. */
export const MVP_ACCOUNT_MENU: AccountMenuRow[] = [
  { label: "Profile", href: "/account/profile" },
  { label: "Subscription", href: "/account/subscription" },
  { label: "Help & Support", href: "/account/help" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Sign Out", action: "sign-out" },
];

/**
 * Hidden until auth and infra exist. Routes and API handlers are scaffolded
 * but not linked from the MVP account menu.
 */
export const FUTURE_ACCOUNT_FEATURES = [
  "notifications",
  "privacy-settings",
  "sessions",
  "mfa",
] as const;

export type FutureAccountFeature = (typeof FUTURE_ACCOUNT_FEATURES)[number];

export const FUTURE_ACCOUNT_ROUTES: Record<
  FutureAccountFeature,
  { path: string; title: string }
> = {
  notifications: {
    path: "/account/notifications",
    title: "Notification Settings",
  },
  "privacy-settings": {
    path: "/account/privacy-settings",
    title: "Privacy Settings",
  },
  sessions: {
    path: "/account/sessions",
    title: "Session Management",
  },
  mfa: {
    path: "/account/security",
    title: "Two-Factor Authentication",
  },
};
