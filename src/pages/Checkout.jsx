import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatBRL } from "../utils/currency";
import { buildOrderSummary } from "../services/orderService";
import { validateCoupon } from "../services/couponService";
import { buildOrderMessage, buildWhatsAppLink } from "../services/whatsappService";
import { isRequired, isValidPhone } from "../utils/validators";

const PAGAMENTOS = ["Pix", "Cartão", "Dinheiro"];

export default function Checkout() {
  const { items, coupon, subtotal, clearCart } = useCart();
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    endereco: "",
    pagamento: "Pix",
    observacoes: "",
  });
  const [touched, setTouched] = useState(false);

  const couponCheck = validateCoupon(coupon, subtotal);
  const summary = buildOrderSummary({
    items,
    coupon: couponCheck.valid ? coupon : null,
    delivery: true,
  });

  const errors = {
    nome: isRequired(form.nome) ? null : "Informe seu nome.",
    telefone: isValidPhone(form.telefone) ? null : "Informe um telefone válido.",
    endereco: isRequired(form.endereco) ? null : "Informe o endereço de entrega.",
  };
  const isValid = !errors.nome && !errors.telefone && !errors.endereco;

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid || items.length === 0) return;

    const extras = [
      `Endereço: ${form.endereco}`,
      `Pagamento: ${form.pagamento}`,
      summary.deliveryFee === 0 ? "Entrega: Grátis" : `Entrega: ${formatBRL(summary.deliveryFee)}`,
      couponCheck.valid ? `Cupom: ${coupon.trim().toUpperCase()}` : null,
      form.observacoes ? `Obs.: ${form.observacoes}` : null,
    ].filter(Boolean);

    const message =
      buildOrderMessage({ items, total: summary.total, customerName: form.nome }) +
      "\n" +
      extras.join("\n");

    window.open(buildWhatsAppLink(message), "_blank", "noopener");
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <div className="text-5xl">🛒</div>
        <h1 className="mt-4 text-2xl font-bold">Seu carrinho está vazio</h1>
        <p className="mt-2 text-zinc-400">Adicione itens do cardápio para finalizar um pedido.</p>
        <Link to="/cardapio" className="btn-primary mt-6">
          Ir ao cardápio
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold">Finalizar pedido</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Field label="Nome" error={touched && errors.nome}>
            <input
              value={form.nome}
              onChange={update("nome")}
              className="input"
              placeholder="Seu nome completo"
            />
          </Field>
          <Field label="Telefone / WhatsApp" error={touched && errors.telefone}>
            <input
              value={form.telefone}
              onChange={update("telefone")}
              className="input"
              placeholder="(11) 99999-9999"
            />
          </Field>
          <Field label="Endereço de entrega" error={touched && errors.endereco}>
            <input
              value={form.endereco}
              onChange={update("endereco")}
              className="input"
              placeholder="Rua, número, bairro, complemento"
            />
          </Field>

          <div>
            <span className="mb-1 block text-sm font-medium text-zinc-300">Pagamento</span>
            <div className="flex gap-2">
              {PAGAMENTOS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setForm({ ...form, pagamento: p })}
                  className={`chip ${form.pagamento === p ? "chip-active" : ""}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <Field label="Observações (opcional)">
            <textarea
              value={form.observacoes}
              onChange={update("observacoes")}
              rows={3}
              className="input"
              placeholder="Ex.: sem cebolinha, troco para R$ 100..."
            />
          </Field>

          <button type="submit" className="btn-primary w-full">
            💬 Enviar pedido pelo WhatsApp
          </button>
        </form>

        <aside className="card h-fit p-5">
          <h2 className="text-lg font-bold">Resumo</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between gap-2 text-zinc-300">
                <span>
                  {item.quantity}× {item.nome}
                </span>
                <span>{formatBRL(item.preco * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-1 border-t border-ink-800 pt-4 text-sm">
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
            <div className="flex justify-between border-t border-ink-800 pt-2 text-base font-bold">
              <dt>Total</dt>
              <dd className="text-brand">{formatBRL(summary.total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-zinc-300">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-accent">{error}</span>}
    </label>
  );
}
