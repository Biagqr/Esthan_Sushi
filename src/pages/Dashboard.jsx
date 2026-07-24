import { Link } from "react-router-dom";
import { produtos } from "../data/produtos.js";
import { categorias } from "../data/categorias.js";
import { formatBRL } from "../utils/currency.js";

export default function Dashboard() {
  const ticketMedio =
    produtos.reduce((acc, p) => acc + p.preco, 0) / produtos.length;

  const cards = [
    { label: "Produtos", valor: produtos.length },
    { label: "Categorias", valor: categorias.length },
    { label: "Ticket médio", valor: formatBRL(ticketMedio) },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="bg-black border-b border-yellow-500">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-5">
          <h1 className="text-2xl font-bold text-yellow-400">
            Painel Administrativo
          </h1>
          <Link to="/" className="text-sm hover:text-yellow-400">
            Sair
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-10">
        <section className="grid gap-6 sm:grid-cols-3">
          {cards.map((card) => (
            <div key={card.label} className="bg-zinc-900 rounded-2xl p-6">
              <p className="text-gray-400">{card.label}</p>
              <p className="text-3xl font-bold text-yellow-400 mt-2">
                {card.valor}
              </p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Produtos cadastrados</h2>
          <div className="overflow-x-auto bg-zinc-900 rounded-2xl">
            <table className="w-full text-left">
              <thead className="text-gray-400 border-b border-zinc-800">
                <tr>
                  <th className="p-4">Nome</th>
                  <th className="p-4">Categoria</th>
                  <th className="p-4 text-right">Preço</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto) => (
                  <tr
                    key={produto.id}
                    className="border-b border-zinc-800 last:border-0"
                  >
                    <td className="p-4">{produto.nome}</td>
                    <td className="p-4">{produto.categoria}</td>
                    <td className="p-4 text-right text-yellow-400">
                      {formatBRL(produto.preco)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
