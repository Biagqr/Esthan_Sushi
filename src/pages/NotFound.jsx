import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <p className="text-6xl">🍣</p>
      <h1 className="text-3xl font-bold text-yellow-400 mt-4">
        404 — Página não encontrada
      </h1>
      <Link
        to="/"
        className="mt-8 bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl hover:bg-yellow-300 transition"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
