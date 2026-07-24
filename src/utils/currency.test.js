import { describe, it, expect } from "vitest";
import { formatBRL, parseBRL, roundMoney, applyDiscount } from "./currency";

describe("formatBRL", () => {
  it("formats a number as BRL currency", () => {
    // non-breaking space is used by Intl between symbol and value
    expect(formatBRL(29.9).replace(/\u00a0/g, " ")).toBe("R$ 29,90");
  });

  it("formats zero", () => {
    expect(formatBRL(0).replace(/\u00a0/g, " ")).toBe("R$ 0,00");
  });

  it("treats non-finite / non-numeric input as zero", () => {
    expect(formatBRL(NaN).replace(/\u00a0/g, " ")).toBe("R$ 0,00");
    expect(formatBRL("abc").replace(/\u00a0/g, " ")).toBe("R$ 0,00");
    expect(formatBRL(Infinity).replace(/\u00a0/g, " ")).toBe("R$ 0,00");
  });
});

describe("parseBRL", () => {
  it("parses a fully formatted BRL string", () => {
    expect(parseBRL("R$ 1.234,56")).toBe(1234.56);
  });

  it("parses a comma-decimal string without thousands separator", () => {
    expect(parseBRL("29,90")).toBe(29.9);
  });

  it("parses a dot-decimal string", () => {
    expect(parseBRL("29.90")).toBe(29.9);
  });

  it("returns numbers unchanged", () => {
    expect(parseBRL(42)).toBe(42);
  });

  it("returns 0 for empty or invalid input", () => {
    expect(parseBRL("")).toBe(0);
    expect(parseBRL("abc")).toBe(0);
    expect(parseBRL(null)).toBe(0);
    expect(parseBRL(Infinity)).toBe(0);
  });
});

describe("roundMoney", () => {
  it("rounds to two decimals", () => {
    expect(roundMoney(1.005)).toBe(1.01);
    expect(roundMoney(2.675)).toBe(2.68);
  });

  it("returns 0 for non-finite input", () => {
    expect(roundMoney(NaN)).toBe(0);
  });
});

describe("applyDiscount", () => {
  it("applies a percentage discount", () => {
    expect(applyDiscount(100, 10)).toBe(90);
    expect(applyDiscount(29.9, 20)).toBe(23.92);
  });

  it("clamps discount to 100%", () => {
    expect(applyDiscount(50, 150)).toBe(0);
  });

  it("returns rounded price when discount is zero or negative", () => {
    expect(applyDiscount(19.999, 0)).toBe(20);
    expect(applyDiscount(50, -5)).toBe(50);
  });

  it("returns 0 for invalid price", () => {
    expect(applyDiscount(-10, 10)).toBe(0);
    expect(applyDiscount(NaN, 10)).toBe(0);
  });
});
