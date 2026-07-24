export default function Footer() {
  return (
    <footer className="bg-black border-t border-yellow-500 py-10 text-center">
      <h2 className="text-3xl font-bold text-yellow-400">Esthan Sushi</h2>
      <p className="mt-3">📍 Seu endereço</p>
      <p>📞 (11) 99999-9999</p>
      <p>Instagram: @esthansushi</p>
      <p className="mt-6 text-gray-400">
        © {new Date().getFullYear()} Esthan Sushi - Todos os direitos
        reservados.
      </p>
    </footer>
  );
}
