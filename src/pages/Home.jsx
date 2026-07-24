import { Link } from "react-router-dom";
import { categorias } from "../data/categorias.js";
import { produtos } from "../data/produtos.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Home() {
  const destaques = produtos.slice(0, 3);

  return (
    <div>
      {/* Banner */}
      <section className="bg-red-700 py-24 text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-yellow-300">
          O sabor do Japão perto de você
        </h2>
        <p className="mt-6 text-lg md:text-xl">
          Temakis • Hot Rolls • Uramakis • Combinados • Delivery
        </p>
        <Link
          to="/cardapio"
          className="inline-block mt-10 bg-yellow-400 text-black font-bold px-8 py-4 rounded-xl hover:bg-yellow-300 transition"
        >
          Ver Cardápio
        </Link>
      </section>

      {/* Categorias */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl md:text-4xl text-center text-yellow-400 font-bold mb-12">
          Nosso Cardápio
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categorias.map((categoria) => (
            <Link
              key={categoria.nome}
              to="/cardapio"
              className="bg-zinc-900 rounded-2xl p-6 text-center hover:bg-red-700 transition"
            >
              <div className="text-5xl">{categoria.emoji}</div>
              <h3 className="mt-4 text-lg font-semibold">{categoria.nome}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Destaques */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-3xl md:text-4xl text-center text-yellow-400 font-bold mb-10">
          Destaques
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {destaques.map((produto) => (
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </div>
      </section>
    </div>
  );
}
