import { useCart } from "../context/CartContext.jsx";
import { formatBRL } from "../utils/currency.js";

export default function ProductCard({ produto }) {
  const { addItem, openCart } = useCart();

  function handleAdd() {
    addItem(produto);
    openCart();
  }

  return (
    <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg flex flex-col">
      <div className="h-44 bg-zinc-800 flex items-center justify-center overflow-hidden">
        <img
          src={produto.imagem}
          alt={produto.nome}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.parentElement.textContent = "🍣";
            e.currentTarget.parentElement.classList.add("text-6xl");
          }}
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold">{produto.nome}</h3>
        <p className="text-gray-300 mt-2 flex-1">{produto.descricao}</p>
        <p className="text-yellow-400 text-2xl mt-4">
          {formatBRL(produto.preco)}
        </p>

        <button
          onClick={handleAdd}
          className="w-full mt-4 bg-red-600 hover:bg-red-700 py-3 rounded-xl transition font-semibold"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}
