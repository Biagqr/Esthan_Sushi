import { createContext, useContext, useMemo, useReducer } from "react";
import {
  cartReducer,
  initialCartState,
  selectSubtotal,
  selectTotalItems,
} from "./cartReducer";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const value = useMemo(
    () => ({
      items: state.items,
      totalItems: selectTotalItems(state),
      subtotal: selectSubtotal(state),
      addItem: (product, quantity = 1) =>
        dispatch({ type: "ADD_ITEM", payload: { product, quantity } }),
      removeItem: (id) => dispatch({ type: "REMOVE_ITEM", payload: { id } }),
      setQuantity: (id, quantity) =>
        dispatch({ type: "SET_QUANTITY", payload: { id, quantity } }),
      clearCart: () => dispatch({ type: "CLEAR_CART" }),
    }),
    [state]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export default CartContext;
