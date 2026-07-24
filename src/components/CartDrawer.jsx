import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatBRL } from "../utils/currency";
import { buildOrderSummary } from "../services/orderService";
import { validateCoupon } from "../services/couponService";
import { FREE_DELIVERY_THRESHOLD } from "../utils/constants";
import QuantitySelector from "./QuantitySelector";
import ProductImage from "./ProductImage";

export default function CartDrawer() {
  const navigate = useNavigate();
  const {
    items,
    isOpen,
    closeCart,
    setQuantity,
    removeItem,
    coupon,
    setCoupon,
    subtotal,
  } = useCart();

  const couponCheck = validateCoupon(coupon, subtotal);
  const summary = buildOrderSummary({
    items,
    coupon: couponCheck.valid ? coupon : null,
    delivery: true,
  });
  const missingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - summary.subtotal);

  const goToCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-ink-950 shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Carrinho de compras"
      >
        <div className="flex items-center justify-between border-b border-ink-800 p-4">
          <h2 className="text-lg font-bold">Seu pedido</h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Fechar carrinho"
            className="text-2xl text-zinc-400 hover:text-white"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="mt-16 text-center text-zinc-400">
              <div className="text-5xl">🛒</div>
              <p className="mt-4">Seu carrinho está vazio.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <ProductImage produto={item} className="h-16 w-16 shrink-0 rounded-lg" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold">{item.nome}</h3>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remover ${item.nome}`}
                        className="text-xs text-zinc-500 hover:text-accent"
                      >
                        remover
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <QuantitySelector
                        value={item.quantity}
                        min={0}
                        onChange={(q) => setQuantity(item.id, q)}
                      />
                      <span className="font-semibold text-brand">
                        {formatBRL(item.preco * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="space-y-3 border-t border-ink-800 p-4">
            <div>
              <label htmlFor="cupom" className="mb-1 block text-xs font-medium text-zinc-400">
                Cupom de desconto
              </label>
              <input
                id="cupom"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Ex.: BEMVINDO10"
                className="w-full rounded-lg border border-ink-700 bg-ink-900 px-3 py-2 text-sm uppercase placeholder:normal-case placeholder:text-zinc-500 focus:border-brand focus:outline-none"
              />
              {coupon && !couponCheck.valid && (
                <p className="mt-1 text-xs text-accent">
                  {couponCheck.reason === "not_found"
                    ? "Cupom inválido."
                    : couponCheck.reason === "min_not_met"
                      ? "Subtotal insuficiente para este cupom."
                      : "Informe um cupom válido."}
                </p>
              )}
              {couponCheck.valid && (
                <p className="mt-1 text-xs text-emerald-400">Cupom aplicado! 🎉</p>
              )}
            </div>

            <dl className="space-y-1 text-sm">
              <div className="flex justify-between text-zinc-300">
                <dt>Subtotal</dt>
                <dd>{formatBRL(summary.subtotal)}</dd>
              </div>
              {summary.discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <dt>Desconto</dt>
                  <dd>−{formatBRL(summary.discount)}</dd>
                </div>
              )}
              <div className="flex justify-between text-zinc-300">
                <dt>Entrega</dt>
                <dd>{summary.deliveryFee === 0 ? "Grátis" : formatBRL(summary.deliveryFee)}</dd>
              </div>
              {missingForFreeDelivery > 0 && (
                <p className="text-xs text-zinc-500">
                  Faltam {formatBRL(missingForFreeDelivery)} para frete grátis.
                </p>
              )}
              <div className="flex justify-between border-t border-ink-800 pt-2 text-base font-bold">
                <dt>Total</dt>
                <dd className="text-brand">{formatBRL(summary.total)}</dd>
              </div>
            </dl>

            <button type="button" onClick={goToCheckout} className="btn-primary w-full">
              Finalizar pedido
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
