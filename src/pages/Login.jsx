export default function Login() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <div className="card p-8">
        <h1 className="text-2xl font-bold">Login Administrativo</h1>
        <p className="mt-1 text-sm text-zinc-400">Acesso restrito à equipe.</p>
        <form className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-zinc-300">E-mail</span>
            <input type="email" className="input" placeholder="voce@esthansushi.com" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-zinc-300">Senha</span>
            <input type="password" className="input" placeholder="••••••••" />
          </label>
          <button type="submit" className="btn-primary w-full">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
