import { describe, it, expect } from "vitest";
import { formatDate, formatDateTime } from "./formatDate";

describe("formatDate", () => {
  it("formats a Date object as dd/mm/yyyy", () => {
    expect(formatDate(new Date(2026, 0, 5))).toBe("05/01/2026");
  });

  it("formats an ISO string", () => {
    expect(formatDate("2026-12-25T00:00:00")).toBe("25/12/2026");
  });

  it("returns empty string for invalid input", () => {
    expect(formatDate("not-a-date")).toBe("");
    expect(formatDate(null)).toBe("");
    expect(formatDate({})).toBe("");
  });
});

describe("formatDateTime", () => {
  it("appends zero-padded time", () => {
    expect(formatDateTime(new Date(2026, 0, 5, 9, 7))).toBe("05/01/2026 09:07");
  });

  it("returns empty string for invalid input", () => {
    expect(formatDateTime("nope")).toBe("");
  });
});
