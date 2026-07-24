import { useCart } from "../context/CartContext";
import { formatBRL } from "../utils/currency";
import ProductImage from "./ProductImage";

export default function ProductCard({ produto }) {
  const { addItem, openCart } = useCart();

  const handleAdd = () => {
    addItem(produto);
    openCart();
  };

  return (
    <article className="card flex flex-col overflow-hidden transition hover:-translate-y-1 hover:ring-brand/40">
      <ProductImage produto={produto} className="h-40 w-full" />
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-semibold leading-tight">{produto.nome}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-zinc-400">{produto.descricao}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-brand">{formatBRL(produto.preco)}</span>
          <button type="button" onClick={handleAdd} className="btn-accent px-4 py-2 text-sm">
            Adicionar
          </button>
        </div>
      </div>
    </article>
  );
}
