import { describe, it, expect } from "vitest";
import { validateCoupon, applyCoupon } from "./couponService";

describe("validateCoupon", () => {
  it("validates a known coupon that meets the minimum", () => {
    const res = validateCoupon("bemvindo10", 50);
    expect(res.valid).toBe(true);
    expect(res.coupon.value).toBe(10);
  });

  it("is case-insensitive and trims whitespace", () => {
    expect(validateCoupon("  sushi20  ", 100).valid).toBe(true);
  });

  it("rejects empty codes", () => {
    expect(validateCoupon("", 100)).toMatchObject({ valid: false, reason: "empty" });
  });

  it("rejects unknown codes", () => {
    expect(validateCoupon("XYZ", 100)).toMatchObject({
      valid: false,
      reason: "not_found",
    });
  });

  it("rejects when subtotal is below the minimum", () => {
    expect(validateCoupon("SUSHI20", 50)).toMatchObject({
      valid: false,
      reason: "min_not_met",
    });
  });
});

describe("applyCoupon", () => {
  it("applies a percentage discount", () => {
    expect(applyCoupon("BEMVINDO10", 100)).toBe(90);
  });

  it("applies a fixed discount without going below zero", () => {
    expect(applyCoupon("FRETEGRATIS", 50)).toBe(42);
  });

  it("returns the original subtotal for invalid coupons", () => {
    expect(applyCoupon("XYZ", 100)).toBe(100);
    expect(applyCoupon("SUSHI20", 50)).toBe(50);
  });
});
