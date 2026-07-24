import { describe, it, expect } from "vitest";
import {
  cartReducer,
  initialCartState,
  selectSubtotal,
  selectTotalItems,
} from "./cartReducer";

const salmao = { id: 1, nome: "Temaki Salmão", preco: 29.9 };
const coca = { id: 5, nome: "Coca-Cola", preco: 6.0 };

function add(state, product, quantity = 1) {
  return cartReducer(state, { type: "ADD_ITEM", payload: { product, quantity } });
}

describe("cartReducer ADD_ITEM", () => {
  it("adds a new item with default quantity 1", () => {
    const state = add(initialCartState, salmao);
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toMatchObject({ id: 1, quantity: 1 });
  });

  it("increments quantity when adding an existing item", () => {
    let state = add(initialCartState, salmao, 2);
    state = add(state, salmao, 3);
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(5);
  });

  it("ignores invalid products or non-positive quantities", () => {
    expect(add(initialCartState, null)).toBe(initialCartState);
    expect(add(initialCartState, { nome: "no id" })).toBe(initialCartState);
    expect(add(initialCartState, salmao, 0)).toBe(initialCartState);
  });
});

describe("cartReducer REMOVE_ITEM", () => {
  it("removes an item by id", () => {
    let state = add(add(initialCartState, salmao), coca);
    state = cartReducer(state, { type: "REMOVE_ITEM", payload: { id: 1 } });
    expect(state.items.map((i) => i.id)).toEqual([5]);
  });
});

describe("cartReducer SET_QUANTITY", () => {
  it("updates the quantity of an item", () => {
    let state = add(initialCartState, salmao);
    state = cartReducer(state, { type: "SET_QUANTITY", payload: { id: 1, quantity: 4 } });
    expect(state.items[0].quantity).toBe(4);
  });

  it("removes the item when quantity drops to zero or below", () => {
    let state = add(initialCartState, salmao);
    state = cartReducer(state, { type: "SET_QUANTITY", payload: { id: 1, quantity: 0 } });
    expect(state.items).toHaveLength(0);
  });
});

describe("cartReducer CLEAR_CART and unknown actions", () => {
  it("clears all items", () => {
    let state = add(add(initialCartState, salmao), coca);
    state = cartReducer(state, { type: "CLEAR_CART" });
    expect(state.items).toEqual([]);
  });

  it("returns current state for unknown actions", () => {
    const state = add(initialCartState, salmao);
    expect(cartReducer(state, { type: "NOPE" })).toBe(state);
  });
});

describe("cart selectors", () => {
  it("selectTotalItems sums quantities", () => {
    const state = add(add(initialCartState, salmao, 2), coca, 3);
    expect(selectTotalItems(state)).toBe(5);
  });

  it("selectSubtotal sums price * quantity, rounded", () => {
    const state = add(add(initialCartState, salmao, 2), coca, 1);
    expect(selectSubtotal(state)).toBe(65.8);
  });

  it("subtotal of empty cart is 0", () => {
    expect(selectSubtotal(initialCartState)).toBe(0);
  });
});
