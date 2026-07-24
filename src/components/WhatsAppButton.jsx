import { buildWhatsAppLink } from "../services/whatsappService";

export default function WhatsAppButton() {
  const href = buildWhatsAppLink("Olá! Gostaria de fazer um pedido no Esthan Sushi.");
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-3xl shadow-lg transition hover:scale-105 hover:bg-emerald-400"
    >
      <span role="img" aria-hidden="true">💬</span>
    </a>
  );
}
