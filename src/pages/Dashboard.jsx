import { produtos } from "../data/produtos";
import { categorias } from "../data/categorias";
import { formatBRL } from "../utils/currency";

export default function Dashboard() {
  const ticketMedio =
    produtos.reduce((sum, p) => sum + p.preco, 0) / (produtos.length || 1);

  const stats = [
    { label: "Produtos", value: produtos.length, icon: "🍣" },
    { label: "Categorias", value: categorias.length, icon: "🗂️" },
    { label: "Ticket médio", value: formatBRL(ticketMedio), icon: "💰" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold">Painel Administrativo</h1>
      <p className="mt-1 text-zinc-400">Bem-vindo à área administrativa da Esthan Sushi.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="card p-6">
            <div className="text-3xl">{s.icon}</div>
            <div className="mt-3 text-2xl font-bold text-brand">{s.value}</div>
            <div className="text-sm text-zinc-400">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
