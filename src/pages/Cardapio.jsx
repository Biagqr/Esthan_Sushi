import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { produtos } from "../data/produtos";
import { categorias } from "../data/categorias";
import ProductCard from "../components/ProductCard";

export default function Cardapio() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoriaAtiva = searchParams.get("categoria");
  const [busca, setBusca] = useState("");

  const selecionarCategoria = (categoria) => {
    const params = {};
    if (categoria) params.categoria = categoria;
    setSearchParams(params);
  };

  const lista = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return produtos.filter((p) => {
      const okCategoria = !categoriaAtiva || p.categoria === categoriaAtiva;
      const okBusca =
        !termo ||
        p.nome.toLowerCase().includes(termo) ||
        p.descricao.toLowerCase().includes(termo);
      return okCategoria && okBusca;
    });
  }, [categoriaAtiva, busca]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cardápio</h1>
          <p className="mt-1 text-zinc-400">
            {lista.length} {lista.length === 1 ? "item" : "itens"}
            {categoriaAtiva ? ` em ${categoriaAtiva}` : ""}
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
            🔍
          </span>
          <input
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar no cardápio..."
            aria-label="Buscar no cardápio"
            className="w-full rounded-xl border border-ink-700 bg-ink-900 py-2.5 pl-9 pr-3 text-sm focus:border-brand focus:outline-none"
          />
        </div>
      </header>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
        <button
          type="button"
          onClick={() => selecionarCategoria(null)}
          className={`chip ${!categoriaAtiva ? "chip-active" : ""}`}
        >
          Todos
        </button>
        {categorias.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => selecionarCategoria(c)}
            className={`chip ${categoriaAtiva === c ? "chip-active" : ""}`}
          >
            {c}
          </button>
        ))}
      </div>

      {lista.length === 0 ? (
        <div className="mt-16 text-center text-zinc-400">
          <div className="text-5xl">🍽️</div>
          <p className="mt-4">Nenhum produto encontrado.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {lista.map((produto) => (
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </div>
      )}
    </div>
  );
}
