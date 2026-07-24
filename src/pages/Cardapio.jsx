import { useMemo, useState } from "react";
import { categorias } from "../data/categorias.js";
import { produtos } from "../data/produtos.js";
import ProductCard from "../components/ProductCard.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";
import SearchBar from "../components/SearchBar.jsx";

export default function Cardapio() {
  const [categoria, setCategoria] = useState(null);
  const [busca, setBusca] = useState("");

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return produtos.filter((produto) => {
      const porCategoria = categoria ? produto.categoria === categoria : true;
      const porBusca = termo
        ? produto.nome.toLowerCase().includes(termo) ||
          produto.descricao.toLowerCase().includes(termo)
        : true;
      return porCategoria && porBusca;
    });
  }, [categoria, busca]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl text-center text-yellow-400 font-bold mb-8">
        Cardápio
      </h1>

      <div className="space-y-6 mb-10">
        <SearchBar value={busca} onChange={setBusca} />
        <CategoryFilter
          categorias={categorias}
          selecionada={categoria}
          onSelect={setCategoria}
        />
      </div>

      {filtrados.length === 0 ? (
        <p className="text-center text-gray-400 mt-16">
          Nenhum item encontrado.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((produto) => (
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </div>
      )}
    </div>
  );
}
