import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
      <div className="text-6xl">🍥</div>
      <h1 className="mt-4 text-5xl font-extrabold text-brand">404</h1>
      <p className="mt-2 text-zinc-400">Página não encontrada.</p>
      <Link to="/" className="btn-primary mt-6">
        Voltar ao início
      </Link>
    </div>
  );
}
