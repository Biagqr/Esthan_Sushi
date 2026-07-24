const NUMERO = import.meta.env.VITE_WHATSAPP_NUMERO || "5511999999999";

export default function WhatsAppButton() {
  const href = `https://wa.me/${NUMERO}?text=${encodeURIComponent(
    "Olá! Gostaria de fazer um pedido no Esthan Sushi."
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pedir pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-lg transition"
    >
      💬
    </a>
  );
}
