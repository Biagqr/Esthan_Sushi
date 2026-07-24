import { describe, it, expect } from "vitest";
import { calcDeliveryFee, buildOrderSummary } from "./orderService";
import { DELIVERY_FEE } from "../utils/constants";

const items = [
  { id: 1, nome: "Temaki", preco: 29.9, quantity: 2 },
  { id: 5, nome: "Coca", preco: 6.0, quantity: 1 },
];

describe("calcDeliveryFee", () => {
  it("charges the standard fee below the free threshold", () => {
    expect(calcDeliveryFee(50)).toBe(DELIVERY_FEE);
  });

  it("is free at or above the threshold", () => {
    expect(calcDeliveryFee(120)).toBe(0);
    expect(calcDeliveryFee(200)).toBe(0);
  });

  it("is 0 for empty / invalid subtotals", () => {
    expect(calcDeliveryFee(0)).toBe(0);
    expect(calcDeliveryFee(NaN)).toBe(0);
  });
});

describe("buildOrderSummary", () => {
  it("computes subtotal, item count, delivery and total", () => {
    const summary = buildOrderSummary({ items, delivery: true });
    expect(summary.subtotal).toBe(65.8);
    expect(summary.itemCount).toBe(3);
    expect(summary.discount).toBe(0);
    expect(summary.deliveryFee).toBe(DELIVERY_FEE);
    expect(summary.total).toBe(65.8 + DELIVERY_FEE);
  });

  it("applies a coupon before computing the total", () => {
    const summary = buildOrderSummary({ items, coupon: "BEMVINDO10", delivery: false });
    expect(summary.subtotal).toBe(65.8);
    expect(summary.discount).toBe(6.58);
    expect(summary.deliveryFee).toBe(0);
    expect(summary.total).toBe(59.22);
  });

  it("excludes delivery when delivery is false", () => {
    const summary = buildOrderSummary({ items, delivery: false });
    expect(summary.deliveryFee).toBe(0);
    expect(summary.total).toBe(65.8);
  });

  it("handles an empty/absent cart", () => {
    const summary = buildOrderSummary();
    expect(summary).toMatchObject({
      subtotal: 0,
      itemCount: 0,
      discount: 0,
      deliveryFee: 0,
      total: 0,
    });
  });
});
