import { useCart } from "../context/CartContext.jsx";
import { formatBRL } from "../utils/currency.js";

const NUMERO = import.meta.env.VITE_WHATSAPP_NUMERO || "5511999999999";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    total,
  } = useCart();

  function finalizarPedido() {
    if (items.length === 0) return;
    const linhas = items.map(
      (i) => `• ${i.quantidade}x ${i.nome} - ${formatBRL(i.preco * i.quantidade)}`
    );
    const mensagem = [
      "Olá! Gostaria de fazer este pedido no Esthan Sushi:",
      "",
      ...linhas,
      "",
      `Total: ${formatBRL(total)}`,
    ].join("\n");

    window.open(
      `https://wa.me/${NUMERO}?text=${encodeURIComponent(mensagem)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 border-l border-yellow-500 z-50 transform transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-zinc-800">
          <h2 className="text-xl font-bold text-yellow-400">Seu Carrinho</h2>
          <button
            onClick={closeCart}
            className="text-2xl text-gray-400 hover:text-white"
            aria-label="Fechar carrinho"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 && (
            <p className="text-gray-400 text-center mt-10">
              Seu carrinho está vazio.
            </p>
          )}

          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 bg-zinc-900 rounded-xl p-3"
            >
              <div className="flex-1">
                <p className="font-semibold">{item.nome}</p>
                <p className="text-yellow-400">{formatBRL(item.preco)}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantidade - 1)}
                  className="w-8 h-8 bg-zinc-800 rounded-lg hover:bg-zinc-700"
                  aria-label="Diminuir quantidade"
                >
                  −
                </button>
                <span className="w-6 text-center">{item.quantidade}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantidade + 1)}
                  className="w-8 h-8 bg-zinc-800 rounded-lg hover:bg-zinc-700"
                  aria-label="Aumentar quantidade"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-1 text-red-500 hover:text-red-400"
                  aria-label="Remover item"
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-5 border-t border-zinc-800 space-y-3">
          <div className="flex justify-between text-lg">
            <span>Total</span>
            <span className="text-yellow-400 font-bold">
              {formatBRL(total)}
            </span>
          </div>

          <button
            onClick={finalizarPedido}
            disabled={items.length === 0}
            className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-40 disabled:cursor-not-allowed py-3 rounded-xl font-semibold transition"
          >
            Finalizar pelo WhatsApp
          </button>

          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="w-full text-sm text-gray-400 hover:text-white"
            >
              Limpar carrinho
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
