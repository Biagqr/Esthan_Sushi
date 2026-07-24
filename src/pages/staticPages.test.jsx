import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";
import { CartProvider } from "../context/CartContext";

function withRouter(ui, { cart = false } = {}) {
  const inner = cart ? <CartProvider>{ui}</CartProvider> : ui;
  return render(<MemoryRouter>{inner}</MemoryRouter>);
}

describe("static pages render", () => {
  it("Home shows the hero and categories", () => {
    withRouter(<Home />, { cart: true });
    expect(
      screen.getByRole("heading", { level: 1, name: /O sabor do Japão/ })
    ).toBeInTheDocument();
    expect(screen.getByText("Temakis")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Destaques" })
    ).toBeInTheDocument();
  });

  it("Login renders the form", () => {
    withRouter(<Login />);
    expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument();
  });

  it("Dashboard renders the admin heading and stats", () => {
    withRouter(<Dashboard />);
    expect(screen.getByText("Painel Administrativo")).toBeInTheDocument();
    expect(screen.getByText("Produtos")).toBeInTheDocument();
  });

  it("NotFound renders a 404", () => {
    withRouter(<NotFound />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });
});
