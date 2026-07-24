import { Link } from "react-router-dom";

export default function Home() {
  const categorias = [
    { nome: "Temakis", emoji: "🌯" },
    { nome: "Hot Rolls", emoji: "🔥" },
    { nome: "Uramakis", emoji: "🍣" },
    { nome: "Combinados", emoji: "🍱" },
    { nome: "Barcas", emoji: "🚤" },
    { nome: "Bebidas", emoji: "🥤" },
  ];

  return (
    <div className="home">
      <header className="home__header">
        <h1>🍣 Esthan Sushi</h1>
        <nav>
          <Link to="/">Início</Link>
          <Link to="/cardapio">Cardápio</Link>
          <Link to="/login">Admin</Link>
        </nav>
      </header>

      <section className="home__banner">
        <h2>O sabor do Japão perto de você</h2>
        <p>Temakis • Hot Rolls • Uramakis • Combinados • Delivery</p>
        <Link to="/cardapio">Ver Cardápio</Link>
      </section>

      <section className="home__categorias">
        <h2>Nosso Cardápio</h2>
        <div className="grid">
          {categorias.map((categoria) => (
            <div key={categoria.nome} className="categoria-card">
              <div className="emoji">{categoria.emoji}</div>
              <h3>{categoria.nome}</h3>
            </div>
          ))}
        </div>
      </section>

      <footer className="home__footer">
        <h2>Esthan Sushi</h2>
        <p>© 2026 Esthan Sushi - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
