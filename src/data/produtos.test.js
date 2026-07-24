import { describe, it, expect } from "vitest";
import { produtos, getProdutoById, getProdutosByCategoria } from "./produtos";
import { categorias } from "./categorias";

describe("produtos data", () => {
  it("every product has the required shape", () => {
    for (const p of produtos) {
      expect(typeof p.id).toBe("number");
      expect(typeof p.nome).toBe("string");
      expect(p.nome.length).toBeGreaterThan(0);
      expect(typeof p.preco).toBe("number");
      expect(p.preco).toBeGreaterThan(0);
    }
  });

  it("product ids are unique", () => {
    const ids = produtos.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every product category exists in the categorias list", () => {
    for (const p of produtos) {
      expect(categorias).toContain(p.categoria);
    }
  });
});

describe("getProdutoById", () => {
  it("finds an existing product (coercing string ids)", () => {
    expect(getProdutoById(1)?.nome).toBe("Temaki Salmão");
    expect(getProdutoById("1")?.id).toBe(1);
  });

  it("returns null for unknown ids", () => {
    expect(getProdutoById(9999)).toBeNull();
  });
});

describe("getProdutosByCategoria", () => {
  it("returns only products in the category", () => {
    const bebidas = getProdutosByCategoria("Bebidas");
    expect(bebidas.length).toBeGreaterThan(0);
    expect(bebidas.every((p) => p.categoria === "Bebidas")).toBe(true);
  });

  it("returns an empty array for an unknown category", () => {
    expect(getProdutosByCategoria("Inexistente")).toEqual([]);
  });
});
