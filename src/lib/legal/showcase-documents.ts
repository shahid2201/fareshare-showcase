export type ShowcaseLegalSlug = "terms" | "privacy-policy";

export type ShowcaseLegalSection = {
  title: string;
  body: string[];
  bullets?: string[];
};

export type ShowcaseLegalDocument = {
  slug: ShowcaseLegalSlug;
  title: string;
  effectiveDate: string;
  policyVersion: string;
  summary: string;
  scopeNote: string;
  sections: ShowcaseLegalSection[];
};

export const SHOWCASE_LEGAL_LAST_UPDATED = "July 2, 2026";
export const SHOWCASE_LEGAL_VERSION = "2026-07-showcase-v1";

export const showcaseLegalDocuments: Record<ShowcaseLegalSlug, ShowcaseLegalDocument> = {
  terms: {
    slug: "terms",
    title: "FareShare Website Terms of Service",
    effectiveDate: SHOWCASE_LEGAL_LAST_UPDATED,
    policyVersion: SHOWCASE_LEGAL_VERSION,
    summary:
      "Terms governing your use of the FareShare marketing website at https://fareshare.app — including waitlist signup, product previews, and optional scan demonstrations.",
    scopeNote:
      "These Terms apply to the FareShare showcase and marketing website only. Use of the FareShare mobile application is governed by separate in-app Terms of Service and Privacy Policy.",
    sections: [
      {
        title: "1. Agreement and Scope",
        body: [
          'These Terms of Service (the "Terms") are a binding agreement between you and Derhid Inc. ("Derhid," "we," "us," or "our") governing your access to and use of the FareShare marketing and showcase website at https://fareshare.app, including waitlist forms, product previews, informational pages, and any optional website demonstrations (collectively, the "Website").',
          "BY ACCESSING OR USING THE WEBSITE, SUBMITTING A WAITLIST FORM, OR INTERACTING WITH WEBSITE FEATURES, YOU AGREE TO THESE TERMS AND OUR WEBSITE PRIVACY POLICY. If you do not agree, do not use the Website.",
          "These Terms do not govern the FareShare mobile application for Android or iOS. App use is subject to separate in-app legal terms presented at account creation or within the app.",
        ],
      },
      {
        title: "2. Eligibility",
        body: [
          "You must be at least 18 years of age (or the age of majority in your province or territory, if higher) to use the Website and submit a waitlist request.",
          "You represent that information you provide is accurate and that you have authority to accept these Terms if acting on behalf of an organization.",
        ],
      },
      {
        title: "3. What This Website Provides",
        body: [
          "The Website provides marketing information about FareShare, illustrative product previews, pricing and launch updates, educational content about receipt scanning and bill splitting, and tools to join a waitlist for future product access.",
          "The Website is for informational and promotional purposes. It is not the live FareShare product, a financial service, or a substitute for the mobile application.",
          "Screens, amounts, names, flows, and phone mockups may be stylized, sample-based, or incomplete. The mobile app at launch may differ by platform, region, release channel, and account status.",
        ],
      },
      {
        title: "4. Waitlist and Early Access",
        body: [
          "Submitting your email to the waitlist does not create a FareShare account, reserve a specific price, guarantee launch access, or constitute a purchase.",
          "Launch timing, perks, pricing, plan features, and availability may change before release. We will communicate material changes through the Website, email, or other reasonable channels.",
          "We may contact waitlist subscribers about launch updates, beta invitations, and product announcements in accordance with our Privacy Policy and Canada's Anti-Spam Legislation (CASL).",
          "We may decline, remove, or limit waitlist entries that appear fraudulent, abusive, duplicated, or submitted with disposable or invalid contact information.",
        ],
      },
      {
        title: "5. Website Scan Demonstrations",
        body: [
          "The Website may offer, from time to time, a limited receipt-scan demonstration that shows how extraction may work. When available, receipt images are processed transiently through third-party OCR and AI providers (such as Google Document AI and DeepSeek) to display illustrative results.",
          "Website demonstrations do not create a FareShare account, save receipts to your profile, create splits, assign items to other users, or charge payment methods unless expressly stated otherwise in a future, separate checkout flow.",
          "Demonstration outputs may be inaccurate or incomplete. You must not rely on demo results for reimbursement, tax, accounting, or legal purposes. Receipt images submitted to demonstrations are not retained as stored image files after processing, as described in our Privacy Policy.",
          "We may enable, modify, rate-limit, or disable website demonstrations at any time without notice.",
        ],
      },
      {
        title: "6. Acceptable Use",
        body: ["You agree not to:"],
        bullets: [
          "Use the Website for unlawful, fraudulent, deceptive, harassing, or abusive purposes.",
          "Attempt unauthorized access, scrape or harvest data, probe vulnerabilities, or interfere with Website operation.",
          "Submit false waitlist information, automated signups, or content you do not have the right to share.",
          "Upload malware, receipt images containing unnecessary sensitive personal information, or content that infringes third-party rights.",
          "Misrepresent your affiliation with Derhid or FareShare.",
          "Circumvent bot-protection, rate limits, or security controls such as CAPTCHA or Turnstile verification.",
        ],
      },
      {
        title: "7. Third-Party Services",
        body: [
          "The Website relies on third-party providers that may include Supabase (waitlist storage), Cloudflare Turnstile (bot protection), hosting and CDN providers, analytics tools if configured, and OCR/AI processors for optional demonstrations.",
          "Your use of third-party services may be subject to their own terms and privacy policies. We do not control third-party services and are not responsible for their acts, omissions, or outages.",
        ],
      },
      {
        title: "8. Intellectual Property",
        body: [
          "The Website, including text, design, logos, trademarks, mockups, graphics, and software, is owned by Derhid or its licensors and protected by applicable intellectual property laws.",
          "We grant you a limited, revocable, non-exclusive license to access and use the Website for personal, non-commercial informational purposes. You may not copy, modify, distribute, or commercially exploit Website content without our written consent.",
          "If you provide feedback about the Website or product, you grant us the right to use it without restriction or compensation.",
        ],
      },
      {
        title: "9. Disclaimers",
        body: [
          'THE WEBSITE AND ALL MARKETING MATERIALS ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITH ALL FAULTS.',
          "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, DERHID DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ACCURACY.",
          "WITHOUT LIMITING THE FOREGOING, WE DO NOT WARRANT THAT: (A) WEBSITE DEMOS OR PREVIEWS WILL BE ACCURATE OR COMPLETE; (B) PRICING OR LAUNCH INFORMATION WILL REMAIN UNCHANGED; (C) THE WEBSITE WILL BE UNINTERRUPTED OR ERROR-FREE; OR (D) WAITLIST SIGNUP WILL RESULT IN PRODUCT ACCESS.",
          "FareShare is not a bank, money services business, financial adviser, tax adviser, escrow agent, or insurance provider. Nothing on the Website is professional, tax, legal, or financial advice.",
        ],
      },
      {
        title: "10. Limitation of Liability",
        body: [
          "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, DERHID WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR GOODWILL, ARISING FROM OR RELATED TO THE WEBSITE OR THESE TERMS.",
          "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, DERHID'S TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS ARISING FROM OR RELATED TO THE WEBSITE OR THESE TERMS WILL NOT EXCEED ONE HUNDRED CANADIAN DOLLARS (CAD $100).",
          "Nothing in these Terms limits liability that cannot be limited under applicable law.",
        ],
      },
      {
        title: "11. Indemnification",
        body: [
          "You will defend, indemnify, and hold harmless Derhid and its affiliates, directors, officers, employees, and agents from claims arising out of your misuse of the Website, your violation of these Terms, or your infringement of third-party rights.",
        ],
      },
      {
        title: "12. Changes and Termination",
        body: [
          "We may modify, suspend, or discontinue any part of the Website at any time. We may update these Terms by posting a revised version with a new effective date. Continued use after changes constitutes acceptance, except where applicable law requires express consent.",
          "If you do not agree to updated Terms, stop using the Website.",
        ],
      },
      {
        title: "13. Governing Law",
        body: [
          "These Terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein, without regard to conflict-of-law principles.",
          "You agree that the courts located in Ontario, Canada have exclusive jurisdiction over disputes arising from these Terms or the Website, except where mandatory consumer protection laws grant you the right to bring proceedings elsewhere.",
        ],
      },
      {
        title: "14. Contact",
        body: [
          "Derhid Inc.",
          "570 Stonecliffe Rd Oakville ON L6L 4N9",
          "Website: https://fareshare.app",
          "Email: support@fareshare.app",
        ],
      },
    ],
  },
  "privacy-policy": {
    slug: "privacy-policy",
    title: "FareShare Website Privacy Policy",
    effectiveDate: SHOWCASE_LEGAL_LAST_UPDATED,
    policyVersion: SHOWCASE_LEGAL_VERSION,
    summary:
      "How Derhid Inc. handles personal information collected through the FareShare marketing website, waitlist, and optional demonstrations at https://fareshare.app.",
    scopeNote:
      "This Policy covers the FareShare showcase website only. The FareShare mobile app has a separate Privacy Policy governing account, receipt, household, and payment data.",
    sections: [
      {
        title: "1. Introduction",
        body: [
          'Derhid Inc. ("Derhid," "we," "us," or "our") operates the FareShare marketing website at https://fareshare.app (the "Website").',
          "This Privacy Policy explains how we collect, use, disclose, retain, and protect personal information when you visit the Website, join the waitlist, or use optional website features.",
          "We handle personal information in accordance with Canada's Personal Information Protection and Electronic Documents Act (PIPEDA) and, where applicable, substantially similar provincial privacy laws. Marketing emails comply with Canada's Anti-Spam Legislation (CASL).",
          "By using the Website, you acknowledge this Policy. If you do not agree, do not use the Website.",
        ],
      },
      {
        title: "2. Accountability and Contact",
        body: [
          "Derhid is accountable for personal information collected through the Website.",
          "Privacy Contact: Derhid Inc., 570 Stonecliffe Rd Oakville ON L6L 4N9, Email: support@fareshare.app, Website: https://fareshare.app.",
        ],
      },
      {
        title: "3. Information We Collect",
        body: ["Depending on how you use the Website, we may collect:"],
        bullets: [
          "Waitlist data: email address and signup timestamp.",
          "Security and abuse-prevention data: hashed IP address, truncated user-agent string, form timing metadata, honeypot signals, rate-limit identifiers, and Cloudflare Turnstile verification results when enabled.",
          "Optional demonstration data: receipt images processed transiently for OCR/AI display, plus structured extraction output shown in-session. Images are not stored as files after processing.",
          "Technical and usage data: pages viewed, referral source, device/browser type, session identifiers, crash or error logs, and cookie or local storage data as described below.",
          "Communications: support emails or other messages you send to us.",
        ],
      },
      {
        title: "4. Information We Do Not Collect on the Website",
        body: [
          "The Website is not designed to collect FareShare app account credentials, stored receipt image libraries, Social Insurance Numbers (SIN), government ID numbers, biometrics, precise GPS tracking, raw banking credentials, or payment card numbers.",
          "Waitlist signup does not create a FareShare app account. Unless you later download the app and register separately, we do not collect app profile, household, or in-app payment data through the Website.",
        ],
      },
      {
        title: "5. How We Use Information",
        body: ["We use Website personal information to:"],
        bullets: [
          "Operate the Website and respond to your requests.",
          "Manage waitlist signups and send launch or product updates where permitted by CASL and your preferences.",
          "Run optional scan demonstrations, display extracted results, and improve demonstration reliability.",
          "Detect fraud, spam, bots, and abuse; enforce our Terms; and protect the Website.",
          "Measure performance, diagnose errors, and improve Website content and usability.",
          "Comply with law and respond to lawful requests.",
        ],
      },
      {
        title: "6. When We Share Information",
        body: [
          "We do not sell your personal information. We do not use Website data to build third-party advertising profiles.",
        ],
        bullets: [
          "Service providers: Supabase (waitlist database), Cloudflare Turnstile (bot protection), hosting and CDN providers, email delivery services, and OCR/AI providers (such as Google Document AI and DeepSeek) for optional demonstrations.",
          "Business transfers: information may transfer in a merger, acquisition, or asset sale subject to this Policy or successor notice.",
          "Legal and safety: where we believe disclosure is necessary to comply with law, protect users, or enforce our agreements.",
        ],
      },
      {
        title: "7. Cross-Border Transfers",
        body: [
          "Personal information may be processed or stored in Canada, the United States, and other countries where we or our service providers operate.",
          "When information is transferred outside Canada, it may be subject to access under foreign laws. We use contractual and technical safeguards appropriate to the sensitivity of the information.",
          "By using the Website, you acknowledge that cross-border processing may be necessary for hosting, bot protection, email delivery, and optional OCR/AI demonstrations.",
        ],
      },
      {
        title: "8. Retention",
        body: ["We retain personal information only as long as reasonably necessary:"],
        bullets: [
          "Waitlist emails: until you unsubscribe, we remove your entry, or the waitlist is retired, plus a limited period for operational backups.",
          "Security logs and hashed identifiers: for limited periods based on abuse-prevention needs.",
          "Demonstration processing: receipt images are not retained as stored files; temporary processing copies are deleted on a short operational schedule.",
          "Support correspondence: as needed to resolve inquiries and meet legal obligations.",
        ],
      },
      {
        title: "9. Cookies and Local Storage",
        body: [
          "We use cookies, local storage, and similar technologies to maintain session state, remember preferences, measure usage, protect against abuse, and support security features such as CSRF and Turnstile tokens.",
          "You can manage cookies through browser settings. Disabling certain technologies may limit Website functionality.",
          "Where required by law, we obtain consent for non-essential cookies.",
        ],
      },
      {
        title: "10. Marketing and CASL",
        body: [
          "If we send commercial electronic messages about FareShare launch or product updates, we do so only where permitted by CASL, including with your express or implied consent as applicable.",
          "Each marketing email includes an unsubscribe mechanism. You may also contact support@fareshare.app to update preferences.",
          "Transactional messages related to your waitlist request or security are not marketing messages.",
        ],
      },
      {
        title: "11. Your Rights",
        body: [
          "Subject to applicable law, you may request access to, correction of, or deletion of personal information we hold about you, or withdraw consent where processing is based on consent.",
          "Contact support@fareshare.app from the email address associated with your waitlist entry. We may verify your identity before fulfilling a request.",
          "We respond within a reasonable period and as required by applicable law. Some information may be retained where necessary for legal compliance, security, or backup integrity.",
        ],
      },
      {
        title: "12. Safeguards",
        body: [
          "We implement administrative, technical, and physical safeguards appropriate to the sensitivity of Website data, including encrypted transport, access controls, rate limiting, hashed identifiers, and vendor review.",
          "No method of transmission or storage is completely secure. You are responsible for the security of devices and networks you use to access the Website.",
          "If we become aware of a breach creating a real risk of significant harm, we will notify affected individuals and regulators as required by applicable law.",
        ],
      },
      {
        title: "13. Children's Privacy",
        body: [
          "The Website is not directed to individuals under 18 years of age (or the age of majority in their province or territory, if higher). We do not knowingly collect personal information from children.",
          "If you believe a child has provided information through the Website, contact support@fareshare.app.",
        ],
      },
      {
        title: "14. Mobile App Privacy",
        body: [
          "If you download and use the FareShare mobile application, your app account data, receipts, households, subscriptions, and payments are governed by the in-app Privacy Policy, not this Website Policy.",
          "This Website Policy should be read together with our Website Terms of Service and marketing Disclaimers.",
        ],
      },
      {
        title: "15. Complaints",
        body: [
          "Privacy questions or complaints: support@fareshare.app.",
          "If unsatisfied with our response, you may contact the Office of the Privacy Commissioner of Canada at 30 Victoria Street, Gatineau, Quebec K1A 1H3, or https://www.priv.gc.ca.",
          "Residents of certain provinces may also contact their provincial privacy commissioner where applicable.",
        ],
      },
      {
        title: "16. Changes to This Policy",
        body: [
          "We may update this Policy from time to time. We will revise the effective date and provide additional notice where required by law or appropriate under the circumstances.",
          "Continued use of the Website after an update constitutes acknowledgment of the revised Policy, except where applicable law requires express consent.",
        ],
      },
      {
        title: "17. Contact",
        body: [
          "Derhid Inc.",
          "570 Stonecliffe Rd Oakville ON L6L 4N9",
          "Website: https://fareshare.app",
          "Privacy Email: support@fareshare.app",
        ],
      },
    ],
  },
};
