import { roundMoney } from "../utils/currency";

export const initialCartState = {
  items: [],
};

/**
 * Pure reducer for cart state. Kept separate from the React context so the
 * business logic can be unit-tested in isolation.
 */
export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity = 1 } = action.payload;
      if (!product || product.id == null || quantity <= 0) return state;

      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...product, quantity }],
      };
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    }

    case "SET_QUANTITY": {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }

    case "CLEAR_CART":
      return { ...state, items: [] };

    default:
      return state;
  }
}

export function selectTotalItems(state) {
  return state.items.reduce((sum, item) => sum + item.quantity, 0);
}

export function selectSubtotal(state) {
  const total = state.items.reduce(
    (sum, item) => sum + item.preco * item.quantity,
    0
  );
  return roundMoney(total);
}
