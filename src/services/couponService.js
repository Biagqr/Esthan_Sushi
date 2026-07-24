import { applyDiscount, roundMoney } from "../utils/currency";

/**
 * Available coupons. In a real app these would come from Firestore.
 */
export const COUPONS = {
  BEMVINDO10: { type: "percent", value: 10, minSubtotal: 0 },
  SUSHI20: { type: "percent", value: 20, minSubtotal: 80 },
  FRETEGRATIS: { type: "fixed", value: 8, minSubtotal: 50 },
};

/**
 * Validate a coupon code against a subtotal.
 * Returns { valid, reason, coupon }.
 */
export function validateCoupon(code, subtotal) {
  if (typeof code !== "string" || !code.trim()) {
    return { valid: false, reason: "empty", coupon: null };
  }
  const normalized = code.trim().toUpperCase();
  const coupon = COUPONS[normalized];
  if (!coupon) {
    return { valid: false, reason: "not_found", coupon: null };
  }
  if (Number(subtotal) < coupon.minSubtotal) {
    return { valid: false, reason: "min_not_met", coupon };
  }
  return { valid: true, reason: null, coupon };
}

/**
 * Apply a coupon to a subtotal, returning the discounted total.
 * Invalid coupons return the original subtotal unchanged.
 */
export function applyCoupon(code, subtotal) {
  const base = roundMoney(subtotal);
  const { valid, coupon } = validateCoupon(code, subtotal);
  if (!valid) return base;

  if (coupon.type === "percent") {
    return applyDiscount(base, coupon.value);
  }
  // fixed discount, never below zero
  return roundMoney(Math.max(0, base - coupon.value));
}
