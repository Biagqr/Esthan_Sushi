import { roundMoney } from "../utils/currency";
import { applyCoupon } from "./couponService";
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from "../utils/constants";

/**
 * Compute the delivery fee given a subtotal.
 */
export function calcDeliveryFee(subtotal) {
  const value = Number(subtotal);
  if (!Number.isFinite(value) || value <= 0) return 0;
  return value >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
}

/**
 * Build an order summary from cart items, an optional coupon and delivery flag.
 */
export function buildOrderSummary({ items = [], coupon = null, delivery = true } = {}) {
  const subtotal = roundMoney(
    items.reduce((sum, item) => sum + Number(item.preco) * Number(item.quantity), 0)
  );

  const discountedSubtotal = coupon ? applyCoupon(coupon, subtotal) : subtotal;
  const discount = roundMoney(subtotal - discountedSubtotal);
  const deliveryFee = delivery ? calcDeliveryFee(discountedSubtotal) : 0;
  const total = roundMoney(discountedSubtotal + deliveryFee);

  return {
    itemCount: items.reduce((sum, item) => sum + Number(item.quantity), 0),
    subtotal,
    discount,
    deliveryFee,
    total,
  };
}
