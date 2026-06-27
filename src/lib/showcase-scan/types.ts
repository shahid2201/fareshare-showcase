export type ParsedDocItem = {
  name: string;
  price: number;
  quantity?: number;
};

export type ParsedReceipt = {
  merchant: string;
  date: string;
  taxes: number;
  total: number;
  items: ParsedDocItem[];
  raw: unknown;
};

export type ProcessedItem = {
  name: string;
  category: string;
  price_after_tax: number;
  price_before_tax: number;
  is_additional_charge: boolean;
  tax_included: boolean;
  confidence: number;
};

export type StoredScanItem = {
  item_id: string;
  name: string;
  category: string;
  price_before_tax: number;
  price_after_tax: number;
  is_additional_charge: boolean;
  confidence: number;
  tax_included: boolean;
  status_for_owner: string;
};
