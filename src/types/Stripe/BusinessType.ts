export const BusinessTypes = ["company", "government_entity", "individual", "non_profit"] as const;
export type BusinessType = typeof BusinessTypes[number];
