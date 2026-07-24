import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const links = [
  { to: "/", label: "Início", end: true },
  { to: "/cardapio", label: "Cardápio" },
  { to: "/login", label: "Admin" },
];

export default function Navbar() {
  const { totalItems, openCart } = useCart();

  return (
    <header className="bg-black border-b border-yellow-500 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-5">
        <Link to="/" className="text-2xl md:text-3xl font-bold text-yellow-400">
          🍣 Esthan Sushi
        </Link>

        <nav className="flex items-center gap-4 md:gap-6">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `hover:text-yellow-400 transition ${
                  isActive ? "text-yellow-400" : "text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <button
            onClick={openCart}
            className="relative bg-yellow-400 text-black font-bold px-4 py-2 rounded-xl hover:bg-yellow-300 transition"
          >
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
