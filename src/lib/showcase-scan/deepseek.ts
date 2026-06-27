import "server-only";

import { ParsedReceipt, ProcessedItem } from "./types";
import {
  extractFirstJsonObject,
  inferCategory,
  isAdditionalCharge,
  isDiscount,
  isTaxOrTotal,
  normalizeName,
  roundCurrency,
} from "./helpers";

type DeepSeekPayload = {
  items: Array<{
    name: string;
    category: string;
    price_after_tax: number;
    tax_included: boolean;
    confidence: number;
    is_additional_charge: boolean;
  }>;
  duplicate: {
    is_duplicate: boolean;
    reason?: string;
  };
  used_fallback?: boolean;
  fallback_reason?: string;
};

type DeepSeekApiResponse = {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
};

function fallbackProcess(receipt: ParsedReceipt, reason = "rules_fallback"): DeepSeekPayload {
  return {
    items: receipt.items
      .filter((item) => !isTaxOrTotal(item.name))
      .map((item) => {
        const name = normalizeName(item.name);
        const price = roundCurrency(item.price);
        const additionalCharge = isAdditionalCharge(name);
        const discount = isDiscount(name, price);

        let category = "Misc";
        if (discount) {
          category = "Discounts";
        } else if (additionalCharge) {
          category = "Additional Charges";
        } else {
          category = inferCategory(name);
        }

        return {
          name,
          category,
          price_after_tax: price,
          tax_included: additionalCharge || discount,
          confidence: 0.62,
          is_additional_charge: additionalCharge,
        };
      }),
    duplicate: {
      is_duplicate: false,
    },
    used_fallback: true,
    fallback_reason: reason,
  };
}

export async function processWithDeepSeek(receipt: ParsedReceipt): Promise<DeepSeekPayload> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  const apiUrl = process.env.DEEPSEEK_API_URL || "https://api.deepseek.com/chat/completions";

  if (!apiKey) {
    return fallbackProcess(receipt, "missing_api_key");
  }

  const prompt = `You process receipt extraction results.
Return JSON only with this shape:
{
  "items": [{
    "name": "string",
    "category": "Groceries|Restaurants|Household|Transportation|Subscriptions|Misc|Additional Charges|Discounts",
    "price_after_tax": number,
    "tax_included": boolean,
    "confidence": number,
    "is_additional_charge": boolean
  }],
  "duplicate": {
    "is_duplicate": boolean,
    "reason": "string"
  }
}
Rules:
- Clean OCR text in names.
- Exclude receipt-level rollup lines completely (do not return them as items): total, subtotal, amount due, tax, HST, FHST, GST, PST, VAT, tax 13%.
- If price_after_tax < 0, categorize as "Discounts" (examples: "Promo", "Coupon", "BOGO Discount", "Loyalty Discount", "Price Adjustment", "Savings").
- Detect additional charges and categorize as "Additional Charges".
- Determine tax_included for each line item.
- Confidence should be 0 to 1.
Input receipt JSON:
${JSON.stringify(receipt)}`;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.DEEPSEEK_MODEL || "deepseek-chat",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("DeepSeek API error:", response.status, errorText);
    return fallbackProcess(receipt, `api_${response.status}`);
  }

  let json: unknown;
  try {
    json = await response.json();
  } catch (e) {
    console.error("Failed to parse DeepSeek response as JSON", e);
    return fallbackProcess(receipt, "invalid_response_json");
  }

  const content: string = (json as DeepSeekApiResponse)?.choices?.[0]?.message?.content || "";
  
  if (!content) {
    console.warn("No content in DeepSeek response");
    return fallbackProcess(receipt, "empty_response_content");
  }
  
  const jsonCandidate = extractFirstJsonObject(content);

  if (!jsonCandidate) {
    console.warn("Could not extract valid JSON from DeepSeek response:", content.slice(0, 200));
    return fallbackProcess(receipt, "missing_json_payload");
  }

  try {
    const parsed = JSON.parse(jsonCandidate) as DeepSeekPayload;
    return {
      items:
        parsed.items
          ?.map((item) => ({
            name: normalizeName(item.name),
            category: item.category || inferCategory(item.name),
            price_after_tax: roundCurrency(item.price_after_tax || 0),
            tax_included: Boolean(item.tax_included),
            confidence: Math.max(0, Math.min(1, item.confidence ?? 0.5)),
            is_additional_charge: Boolean(item.is_additional_charge),
          }))
          .filter((item) => !isTaxOrTotal(item.name)) ?? [],
      duplicate: {
        is_duplicate: Boolean(parsed.duplicate?.is_duplicate),
        reason: parsed.duplicate?.reason,
      },
      used_fallback: false,
    };
  } catch {
    return fallbackProcess(receipt, "invalid_model_json");
  }
}

export function finalizeProcessedItems(items: DeepSeekPayload["items"]): ProcessedItem[] {
  const TAX_RATE = 0.13;

  return items.map((item) => {
    const basePrice = roundCurrency(item.price_after_tax);
    const isDiscountItem = basePrice < 0 || item.category === "Discounts";
    const afterTax = roundCurrency(basePrice * (1 + TAX_RATE));
    const beforeTax = basePrice;

    return {
      name: item.name,
      category: isDiscountItem ? "Discounts" : item.is_additional_charge ? "Additional Charges" : item.category,
      price_after_tax: afterTax,
      price_before_tax: beforeTax,
      is_additional_charge: item.is_additional_charge,
      tax_included: true,
      confidence: item.confidence,
    };
  });
}
