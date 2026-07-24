import { describe, it, expect } from "vitest";
import { slugify, truncate, groupBy, unique, clamp } from "./helpers";

describe("slugify", () => {
  it("removes accents and lowercases", () => {
    expect(slugify("Temaki Salmão")).toBe("temaki-salmao");
    expect(slugify("  Porções & Bebidas  ")).toBe("porcoes-bebidas");
  });

  it("returns empty string for non-strings", () => {
    expect(slugify(42)).toBe("");
  });
});

describe("truncate", () => {
  it("leaves short strings intact", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });

  it("truncates long strings with an ellipsis", () => {
    expect(truncate("hello world", 5)).toBe("hello…");
  });

  it("handles non-positive max and non-strings", () => {
    expect(truncate("hello", 0)).toBe("");
    expect(truncate(null)).toBe("");
  });
});

describe("groupBy", () => {
  it("groups objects by a key", () => {
    const items = [
      { id: 1, cat: "a" },
      { id: 2, cat: "b" },
      { id: 3, cat: "a" },
    ];
    expect(groupBy(items, "cat")).toEqual({
      a: [items[0], items[2]],
      b: [items[1]],
    });
  });

  it("ignores items missing the key", () => {
    expect(groupBy([{ id: 1 }], "cat")).toEqual({});
  });

  it("returns empty object for non-arrays", () => {
    expect(groupBy(null, "cat")).toEqual({});
  });
});

describe("unique", () => {
  it("removes duplicates", () => {
    expect(unique([1, 1, 2, 3, 3])).toEqual([1, 2, 3]);
  });

  it("returns empty array for non-arrays", () => {
    expect(unique("nope")).toEqual([]);
  });
});

describe("clamp", () => {
  it("clamps within bounds", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(99, 0, 10)).toBe(10);
  });

  it("returns min for non-finite values", () => {
    expect(clamp("abc", 1, 10)).toBe(1);
  });
});
