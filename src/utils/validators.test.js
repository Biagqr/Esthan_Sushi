import { describe, it, expect } from "vitest";
import {
  isValidEmail,
  isValidPhone,
  isValidCPF,
  isRequired,
  isValidPassword,
} from "./validators";

describe("isValidEmail", () => {
  it("accepts valid emails", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
    expect(isValidEmail("  a.b@c.co  ")).toBe(true);
  });

  it("rejects invalid emails", () => {
    expect(isValidEmail("no-at.com")).toBe(false);
    expect(isValidEmail("a@b")).toBe(false);
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail(123)).toBe(false);
  });
});

describe("isValidPhone", () => {
  it("accepts 10 and 11 digit numbers with formatting", () => {
    expect(isValidPhone("(11) 99999-9999")).toBe(true);
    expect(isValidPhone("1133334444")).toBe(true);
  });

  it("rejects wrong length or non-strings", () => {
    expect(isValidPhone("123")).toBe(false);
    expect(isValidPhone("123456789012")).toBe(false);
    expect(isValidPhone(null)).toBe(false);
  });
});

describe("isValidCPF", () => {
  it("accepts a valid CPF (formatted and unformatted)", () => {
    expect(isValidCPF("529.982.247-25")).toBe(true);
    expect(isValidCPF("52998224725")).toBe(true);
  });

  it("rejects invalid check digits", () => {
    expect(isValidCPF("529.982.247-24")).toBe(false);
  });

  it("rejects repeated digits and wrong length", () => {
    expect(isValidCPF("11111111111")).toBe(false);
    expect(isValidCPF("123")).toBe(false);
    expect(isValidCPF(null)).toBe(false);
  });
});

describe("isRequired", () => {
  it("requires non-empty trimmed strings", () => {
    expect(isRequired("hello")).toBe(true);
    expect(isRequired("   ")).toBe(false);
    expect(isRequired("")).toBe(false);
    expect(isRequired(undefined)).toBe(false);
  });
});

describe("isValidPassword", () => {
  it("enforces minimum length", () => {
    expect(isValidPassword("secret")).toBe(true);
    expect(isValidPassword("12345")).toBe(false);
    expect(isValidPassword("abcdefgh", 8)).toBe(true);
    expect(isValidPassword(null)).toBe(false);
  });
});
