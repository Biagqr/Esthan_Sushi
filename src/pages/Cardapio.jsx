import { useState } from "react";
import { produtos, getProdutosByCategoria } from "../data/produtos";
import { categorias } from "../data/categorias";
import { useCart } from "../context/CartContext";
import { formatBRL } from "../utils/currency";

export default function Cardapio() {
  const [categoriaAtiva, setCategoriaAtiva] = useState(null);
  const { addItem, totalItems } = useCart();

  const lista = categoriaAtiva
    ? getProdutosByCategoria(categoriaAtiva)
    : produtos;

  return (
    <div className="cardapio">
      <header>
        <h1>Cardápio</h1>
        <span className="cart-count">Carrinho: {totalItems}</span>
      </header>

      <div className="filtros">
        <button onClick={() => setCategoriaAtiva(null)}>Todos</button>
        {categorias.map((c) => (
          <button key={c} onClick={() => setCategoriaAtiva(c)}>
            {c}
          </button>
        ))}
      </div>

      <ul className="produtos">
        {lista.map((produto) => (
          <li key={produto.id} className="produto">
            <h3>{produto.nome}</h3>
            <p>{produto.descricao}</p>
            <strong>{formatBRL(produto.preco)}</strong>
            <button onClick={() => addItem(produto)}>Adicionar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
