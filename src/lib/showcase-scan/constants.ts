export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Groceries: ["milk", "bread", "eggs", "produce", "grocery", "market"],
  Restaurants: ["burger", "pizza", "meal", "restaurant", "cafe", "drink"],
  Household: ["detergent", "cleaner", "soap", "paper towel", "toilet"],
  Transportation: ["fuel", "gas", "uber", "taxi", "bus", "metro", "parking"],
  Subscriptions: ["subscription", "monthly", "netflix", "spotify", "prime"],
  Misc: [],
  "Additional Charges": [
    "service fee",
    "delivery fee",
    "convenience fee",
    "tip",
    "gratuity",
    "surcharge",
    "bottle deposit",
    "environmental fee",
    "other charges",
  ],
  Discounts: [
    "promo",
    "coupon",
    "discount",
    "savings",
    "loyalty",
    "bogo",
    "price adjustment",
    "refund",
    "credit",
    "deduction",
  ],
};

export const ADDITIONAL_CHARGE_TERMS = new Set(
  CATEGORY_KEYWORDS["Additional Charges"].map((entry) => entry.toLowerCase()),
);
