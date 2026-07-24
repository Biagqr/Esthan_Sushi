import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !senha) {
      setErro("Preencha e-mail e senha.");
      return;
    }
    setErro("");
    // Autenticação real ainda não implementada; segue para o painel.
    navigate("/admin");
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
        <Link
          to="/"
          className="block text-center text-2xl font-bold text-yellow-400 mb-6"
        >
          🍣 Esthan Sushi
        </Link>
        <h1 className="text-xl font-semibold text-center mb-6">Área Admin</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400"
          />
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400"
          />

          {erro && <p className="text-red-500 text-sm">{erro}</p>}

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl hover:bg-yellow-300 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
