import { describe, it, expect } from "vitest";
import { buildOrderMessage, buildWhatsAppLink } from "./whatsappService";

const items = [
  { nome: "Temaki Salmão", preco: 29.9, quantity: 2 },
];

describe("buildOrderMessage", () => {
  it("includes the customer name, items and total", () => {
    const msg = buildOrderMessage({ items, total: 59.8, customerName: "Ana" });
    expect(msg).toContain("Sou Ana");
    expect(msg).toContain("2x Temaki Salmão");
    expect(msg).toContain("Total:");
  });

  it("omits the greeting when no name is given", () => {
    const msg = buildOrderMessage({ items, total: 59.8 });
    expect(msg.startsWith("Gostaria")).toBe(true);
  });
});

describe("buildWhatsAppLink", () => {
  it("builds a wa.me link with an encoded message", () => {
    const link = buildWhatsAppLink("olá mundo", "5511999999999");
    expect(link).toBe("https://wa.me/5511999999999?text=ol%C3%A1%20mundo");
  });

  it("strips non-digits from the phone number", () => {
    const link = buildWhatsAppLink("hi", "+55 (11) 99999-9999");
    expect(link).toBe("https://wa.me/5511999999999?text=hi");
  });

  it("handles a nullish message", () => {
    expect(buildWhatsAppLink(null, "5511999999999")).toBe(
      "https://wa.me/5511999999999?text="
    );
  });
});
