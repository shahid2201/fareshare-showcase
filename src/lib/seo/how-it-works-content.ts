export const HOW_IT_WORKS_INTRO =
  "FareShare follows one clear path: scan a receipt, review what was extracted, assign each share to the right person, and settle up together.";

export const HOW_IT_WORKS_STEPS = [
  {
    id: "scan",
    title: "1. Scan the receipt",
    summary: "Capture every line in seconds.",
    body: "Use your camera to capture a receipt, or enter items manually when there is no paper trail. FareShare is designed to read merchants, dates, line items, and totals so you start from the real bill — not a blank split.",
    points: [
      "Camera capture for paper receipts",
      "Manual entry when you need it",
      "Built for groceries, restaurants, and everyday spends",
    ],
  },
  {
    id: "review",
    title: "2. Review extracted items",
    summary: "You stay in control before anything is shared.",
    body: "Smart extraction can miss or misread lines. FareShare surfaces items for review so you can fix names, prices, and categories before anyone else sees the bill. Accuracy remains your responsibility — that is intentional.",
    points: [
      "Edit item names and amounts",
      "Flag low-confidence reads",
      "Confirm totals before assigning",
    ],
  },
  {
    id: "assign",
    title: "3. Assign shares",
    summary: "Fair splits at the item level.",
    body: "Assign each line to the right person — full items, shared lines, or household cost sharing. Invite friends outside your home for one-off dinners and trips, or keep recurring household expenses in one shared place.",
    points: [
      "Per-item assignment",
      "Household and ad-hoc groups",
      "Clear history per receipt",
    ],
  },
  {
    id: "settle",
    title: "4. Settle up",
    summary: "Know what you owe — and what you are owed.",
    body: "Track balances, reminders, and payment status in one place. In-app payments are processed by licensed payment providers; FareShare records settlement status and does not act as a bank.",
    points: [
      "See owed and owing at a glance",
      "Payment confirmations and activity",
      "Records you can revisit later",
    ],
  },
] as const;
