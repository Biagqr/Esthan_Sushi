export default function Login() {
  return (
    <div className="login">
      <h1>Login Administrativo</h1>
      <form>
        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Senha" />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
