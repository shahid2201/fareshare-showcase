export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: "What is FareShare?",
    answer:
      "FareShare is a bill-splitting app that scans receipts, extracts line items, lets people assign shares, and tracks settlement. It is built for households, roommates, couples, friends, and shared expenses — so splitting bills feels like clarity, not math.",
  },
  {
    question: "How does FareShare split bills differently?",
    answer:
      "Instead of only splitting a total equally, FareShare focuses on itemized splits. You scan a receipt, review each line, assign items or shares to the right people, then settle what everyone owes.",
  },
  {
    question: "Can FareShare scan receipts with a camera?",
    answer:
      "Yes. The FareShare product is designed to capture receipts with a camera, extract line items, and let you review and correct anything before sharing. Scanning accuracy can vary — you remain responsible for reviewing extracted data. Live scanning will be in the mobile app at launch; this website is for marketing and waitlist signup.",
  },
  {
    question: "Is FareShare good for roommates and households?",
    answer:
      "Yes. Household sharing is a core use case: keep shared groceries, household runs, and recurring expenses organized so everyone sees the same receipt, assignments, and settlement status.",
  },
  {
    question: "Is FareShare a bank or payment company?",
    answer:
      "No. FareShare is not a bank, credit union, money services business, financial adviser, or payment card issuer. In-app payments are processed by licensed payment providers. FareShare records and facilitates payment-related status but does not guarantee that any user will receive funds.",
  },
  {
    question: "Is FareShare free? What does the waitlist mean?",
    answer:
      "Subscription pricing and plan details have not been published yet and may change before launch. Joining the waitlist does not create a FareShare account or purchase a plan. Waitlist members get launch updates and early access news; any launch perks will be communicated before release.",
  },
  {
    question: "How is FareShare different from Splitwise?",
    answer:
      "Splitwise is widely used for tracking shared balances. FareShare is built around receipt scanning and per-item assignment first — scan once, extract lines, assign shares, then settle — with household workflows as a primary focus. Feature sets will evolve through launch; join the waitlist for product updates.",
  },
  {
    question: "Does waitlist signup create an account?",
    answer:
      "No. Waitlist signup only adds your verified email for launch updates after you confirm your address. It does not create a FareShare account, start a subscription, or charge you.",
  },
  {
    question: "Where is FareShare available?",
    answer:
      "FareShare is preparing for launch. This website is the marketing and waitlist home. Platform availability, regions, and release timing will be shared with waitlist members as launch approaches.",
  },
  {
    question: "How do I contact FareShare?",
    answer:
      "Email support@fareshare.app for waitlist questions, feedback, or support. You can also review our Terms of Service, Privacy Policy, and Disclaimers on this website.",
  },
] as const;
