import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Cardapio from "./Cardapio";
import { CartProvider } from "../context/CartContext";

function renderCardapio() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <Cardapio />
      </CartProvider>
    </MemoryRouter>
  );
}

describe("<Cardapio />", () => {
  it("lists all products by default", () => {
    renderCardapio();
    expect(screen.getByText("Temaki Salmão")).toBeInTheDocument();
    expect(screen.getByText("Coca-Cola Lata")).toBeInTheDocument();
  });

  it("filters products when a category is selected", () => {
    renderCardapio();
    fireEvent.click(screen.getByRole("button", { name: "Bebidas" }));
    expect(screen.getByText("Coca-Cola Lata")).toBeInTheDocument();
    expect(screen.queryByText("Temaki Salmão")).not.toBeInTheDocument();
  });

  it("adds a product to the cart", () => {
    renderCardapio();
    expect(screen.getByText("Carrinho: 0")).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole("button", { name: "Adicionar" })[0]);
    expect(screen.getByText("Carrinho: 1")).toBeInTheDocument();
  });
});
