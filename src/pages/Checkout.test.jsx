import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useEffect, useRef } from "react";
import Checkout from "./Checkout";
import { CartProvider, useCart } from "../context/CartContext";
import { produtos } from "../data/produtos";

function Seed({ produto }) {
  const { addItem } = useCart();
  const done = useRef(false);
  useEffect(() => {
    if (produto && !done.current) {
      done.current = true;
      addItem(produto);
    }
  }, [produto, addItem]);
  return null;
}

function renderCheckout({ withItem = true } = {}) {
  return render(
    <MemoryRouter initialEntries={["/checkout"]}>
      <CartProvider>
        <Seed produto={withItem ? produtos[0] : null} />
        <Checkout />
      </CartProvider>
    </MemoryRouter>
  );
}

describe("<Checkout />", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("shows an empty state when the cart is empty", () => {
    renderCheckout({ withItem: false });
    expect(screen.getByText("Seu carrinho está vazio")).toBeInTheDocument();
  });

  it("blocks submission and shows errors when the form is invalid", () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    renderCheckout();
    fireEvent.click(screen.getByRole("button", { name: /Enviar pedido/ }));
    expect(screen.getByText("Informe seu nome.")).toBeInTheDocument();
    expect(open).not.toHaveBeenCalled();
  });

  it("opens WhatsApp with a valid order", () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    renderCheckout();

    fireEvent.change(screen.getByPlaceholderText("Seu nome completo"), {
      target: { value: "Ana" },
    });
    fireEvent.change(screen.getByPlaceholderText("(11) 99999-9999"), {
      target: { value: "(11) 98888-7777" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Rua, número/), {
      target: { value: "Rua A, 100" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Enviar pedido/ }));

    expect(open).toHaveBeenCalledTimes(1);
    expect(open.mock.calls[0][0]).toContain("https://wa.me/");
  });
});
