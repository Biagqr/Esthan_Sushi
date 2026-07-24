import { Link } from "react-router-dom";
import { categorias } from "../data/categorias";
import { getDestaques } from "../data/produtos";
import ProductCard from "../components/ProductCard";

const emojiPorCategoria = {
  Barcas: "🚤",
  Combinados: "🍱",
  Temakis: "🌯",
  "Hot Rolls": "🔥",
  Uramakis: "🍣",
  Hossomakis: "🍥",
  Sashimis: "🐟",
  Porções: "🍤",
  Bebidas: "🥤",
  Sobremesas: "🍮",
};

export default function Home() {
  const destaques = getDestaques();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent-dark via-ink-950 to-ink-950">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28">
          <div>
            <span className="inline-block rounded-full bg-brand/20 px-4 py-1 text-sm font-semibold text-brand">
              Delivery de sushi
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
              O sabor do Japão <span className="text-brand">perto de você</span>
            </h1>
            <p className="mt-4 max-w-md text-lg text-zinc-300">
              Temakis, hot rolls, combinados e muito mais — fresquinhos e entregues
              rapidinho na sua casa.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/cardapio" className="btn-primary">
                Ver Cardápio
              </Link>
              <a href="#destaques" className="btn-ghost">
                Destaques
              </a>
            </div>
            <div className="mt-8 flex gap-6 text-sm text-zinc-400">
              <span>⭐ 4,9 (1.2k avaliações)</span>
              <span>🛵 40–60 min</span>
              <span>🚚 Frete grátis R$ 120+</span>
            </div>
          </div>
          <div className="relative hidden justify-center md:flex">
            <div className="flex h-72 w-72 items-center justify-center rounded-full bg-brand/10 text-[10rem]">
              🍣
            </div>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 className="text-center text-3xl font-bold">Categorias</h2>
        <p className="mt-2 text-center text-zinc-400">Escolha e monte seu pedido</p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categorias.map((nome) => (
            <Link
              key={nome}
              to={`/cardapio?categoria=${encodeURIComponent(nome)}`}
              className="card flex flex-col items-center gap-2 p-5 text-center transition hover:-translate-y-1 hover:ring-brand/40"
            >
              <span className="text-4xl">{emojiPorCategoria[nome] || "🍣"}</span>
              <span className="text-sm font-semibold">{nome}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Destaques */}
      <section id="destaques" className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-bold">Destaques</h2>
          <Link to="/cardapio" className="text-sm font-semibold text-brand hover:underline">
            Ver tudo →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destaques.map((produto) => (
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </div>
      </section>

      {/* Como funciona */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 className="text-center text-3xl font-bold">Como funciona</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            { icon: "📱", title: "Monte seu pedido", desc: "Escolha seus pratos favoritos no cardápio." },
            { icon: "💬", title: "Confirme no WhatsApp", desc: "Finalize e envie o pedido em 1 clique." },
            { icon: "🛵", title: "Receba em casa", desc: "Entrega rápida e sushi fresquinho." },
          ].map((step) => (
            <div key={step.title} className="card p-6 text-center">
              <div className="text-4xl">{step.icon}</div>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm text-zinc-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
