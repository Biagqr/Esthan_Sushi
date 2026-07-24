import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "./CartContext";

const salmao = { id: 1, nome: "Temaki Salmão", preco: 29.9 };

function wrapper({ children }) {
  return <CartProvider>{children}</CartProvider>;
}

describe("useCart / CartProvider", () => {
  it("throws when used outside a provider", () => {
    expect(() => renderHook(() => useCart())).toThrow(
      /must be used within a CartProvider/
    );
  });

  it("exposes derived totals and mutations", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.totalItems).toBe(0);
    expect(result.current.subtotal).toBe(0);

    act(() => result.current.addItem(salmao, 2));
    expect(result.current.totalItems).toBe(2);
    expect(result.current.subtotal).toBe(59.8);

    act(() => result.current.setQuantity(1, 1));
    expect(result.current.totalItems).toBe(1);

    act(() => result.current.removeItem(1));
    expect(result.current.items).toHaveLength(0);

    act(() => {
      result.current.addItem(salmao);
      result.current.clearCart();
    });
    expect(result.current.items).toHaveLength(0);
  });
});
