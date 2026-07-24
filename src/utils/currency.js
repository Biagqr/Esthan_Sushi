/**
 * Currency helpers for Brazilian Real (BRL).
 */

/**
 * Format a numeric value as a BRL currency string (e.g. "R$ 29,90").
 * Non-finite values are treated as 0.
 */
export function formatBRL(value) {
  const number = Number(value);
  const safe = Number.isFinite(number) ? number : 0;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(safe);
}

/**
 * Parse a BRL-formatted string back into a number.
 * Accepts values like "R$ 1.234,56", "1234,56" or "29.90".
 * Returns 0 for unparseable input.
 */
export function parseBRL(input) {
  if (typeof input === "number") return Number.isFinite(input) ? input : 0;
  if (typeof input !== "string") return 0;

  let cleaned = input.replace(/[^\d.,-]/g, "").trim();
  if (!cleaned) return 0;

  const hasComma = cleaned.includes(",");
  if (hasComma) {
    // Brazilian format: "." is thousands separator, "," is decimal.
    cleaned = cleaned.replace(/\./g, "").replace(",", ".");
  }

  const value = Number(cleaned);
  return Number.isFinite(value) ? value : 0;
}

/**
 * Round a monetary value to 2 decimal places, avoiding float drift.
 */
export function roundMoney(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.round((number + Number.EPSILON) * 100) / 100;
}

/**
 * Apply a percentage discount (0-100) to a price.
 */
export function applyDiscount(price, percent) {
  const p = Number(price);
  const d = Number(percent);
  if (!Number.isFinite(p) || p < 0) return 0;
  if (!Number.isFinite(d) || d <= 0) return roundMoney(p);
  const clamped = Math.min(d, 100);
  return roundMoney(p * (1 - clamped / 100));
}
