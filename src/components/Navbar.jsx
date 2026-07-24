import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { APP_NAME } from "../utils/constants";

const links = [
  { to: "/", label: "Início" },
  { to: "/cardapio", label: "Cardápio" },
  { to: "/login", label: "Admin" },
];

export default function Navbar() {
  const { totalItems, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-ink-800 bg-ink-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 text-xl font-extrabold text-brand">
          <span className="text-2xl">🍣</span>
          {APP_NAME}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `text-sm font-medium transition hover:text-brand ${
                  isActive ? "text-brand" : "text-zinc-300"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={openCart}
          aria-label="Abrir carrinho"
          className="relative btn-ghost"
        >
          <span className="text-lg">🛒</span>
          <span className="hidden sm:inline">Carrinho</span>
          {totalItems > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-white">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
