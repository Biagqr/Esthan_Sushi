import { APP_NAME } from "../utils/constants";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-ink-800 bg-ink-900">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <h2 className="text-xl font-extrabold text-brand">🍣 {APP_NAME}</h2>
          <p className="mt-2 text-sm text-zinc-400">
            O sabor do Japão perto de você. Delivery de sushi fresquinho todos os dias.
          </p>
        </div>
        <div className="text-sm text-zinc-400">
          <h3 className="mb-2 font-semibold text-zinc-200">Atendimento</h3>
          <p>📍 Rua do Sushi, 123 — São Paulo/SP</p>
          <p>📞 (11) 99999-9999</p>
          <p>🕐 Ter a Dom, 18h às 23h</p>
        </div>
        <div className="text-sm text-zinc-400">
          <h3 className="mb-2 font-semibold text-zinc-200">Entrega</h3>
          <p>Frete grátis acima de R$ 120</p>
          <p>Tempo médio: 40–60 min</p>
          <p>Pagamento: Pix, cartão e dinheiro</p>
        </div>
      </div>
      <div className="border-t border-ink-800 py-4 text-center text-xs text-zinc-500">
        © 2026 {APP_NAME} — Todos os direitos reservados.
      </div>
    </footer>
  );
}
