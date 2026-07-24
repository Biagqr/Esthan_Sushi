import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Cardapio from "./Cardapio";
import { CartProvider, useCart } from "../context/CartContext";

function renderCardapio(initialEntries = ["/cardapio"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <CartProvider>
        <Cardapio />
        <CartProbe />
      </CartProvider>
    </MemoryRouter>
  );
}

function CartProbe() {
  const { totalItems } = useCart();
  return <div data-testid="cart-count">{totalItems}</div>;
}

describe("<Cardapio />", () => {
  it("lists all products by default", () => {
    renderCardapio();
    expect(screen.getByText("Temaki Salmão")).toBeInTheDocument();
    expect(screen.getByText("Coca-Cola Lata")).toBeInTheDocument();
  });

  it("filters products when a category chip is selected", () => {
    renderCardapio();
    fireEvent.click(screen.getByRole("button", { name: "Bebidas" }));
    expect(screen.getByText("Coca-Cola Lata")).toBeInTheDocument();
    expect(screen.queryByText("Temaki Salmão")).not.toBeInTheDocument();
  });

  it("honors the ?categoria query param", () => {
    renderCardapio(["/cardapio?categoria=Sashimis"]);
    expect(screen.getByText("Sashimi Salmão (10 fatias)")).toBeInTheDocument();
    expect(screen.queryByText("Coca-Cola Lata")).not.toBeInTheDocument();
  });

  it("filters by search term", () => {
    renderCardapio();
    fireEvent.change(screen.getByLabelText("Buscar no cardápio"), {
      target: { value: "gyoza" },
    });
    expect(screen.getByText("Porção de Gyoza")).toBeInTheDocument();
    expect(screen.queryByText("Temaki Salmão")).not.toBeInTheDocument();
  });

  it("shows an empty state when nothing matches", () => {
    renderCardapio();
    fireEvent.change(screen.getByLabelText("Buscar no cardápio"), {
      target: { value: "zzzzz" },
    });
    expect(screen.getByText("Nenhum produto encontrado.")).toBeInTheDocument();
  });

  it("adds a product to the cart", () => {
    renderCardapio();
    expect(screen.getByTestId("cart-count").textContent).toBe("0");
    fireEvent.click(screen.getAllByRole("button", { name: "Adicionar" })[0]);
    expect(screen.getByTestId("cart-count").textContent).toBe("1");
  });
});
