export default function CategoryFilter({ categorias, selecionada, onSelect }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-2 rounded-full transition font-medium ${
          selecionada === null
            ? "bg-yellow-400 text-black"
            : "bg-zinc-900 text-white hover:bg-zinc-800"
        }`}
      >
        Todos
      </button>

      {categorias.map((categoria) => (
        <button
          key={categoria.nome}
          onClick={() => onSelect(categoria.nome)}
          className={`px-4 py-2 rounded-full transition font-medium ${
            selecionada === categoria.nome
              ? "bg-yellow-400 text-black"
              : "bg-zinc-900 text-white hover:bg-zinc-800"
          }`}
        >
          {categoria.emoji} {categoria.nome}
        </button>
      ))}
    </div>
  );
}
