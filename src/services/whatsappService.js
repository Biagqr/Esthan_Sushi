import { WHATSAPP_NUMBER } from "../utils/constants";
import { formatBRL } from "../utils/currency";

/**
 * Build the plain-text body of a WhatsApp order message.
 */
export function buildOrderMessage({ items = [], total = 0, customerName = "" } = {}) {
  const lines = [];
  if (customerName) lines.push(`Olá! Sou ${customerName}.`);
  lines.push("Gostaria de fazer o seguinte pedido:");
  items.forEach((item) => {
    lines.push(`- ${item.quantity}x ${item.nome} (${formatBRL(item.preco)})`);
  });
  lines.push(`Total: ${formatBRL(total)}`);
  return lines.join("\n");
}

/**
 * Build a click-to-chat wa.me link with a pre-filled, URL-encoded message.
 */
export function buildWhatsAppLink(message, number = WHATSAPP_NUMBER) {
  const digits = String(number).replace(/\D/g, "");
  const text = encodeURIComponent(String(message ?? ""));
  return `https://wa.me/${digits}?text=${text}`;
}
