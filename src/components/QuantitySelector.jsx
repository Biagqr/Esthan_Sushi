export default function QuantitySelector({ value, onChange, min = 1 }) {
  const dec = () => onChange(Math.max(min - 1, value - 1));
  const inc = () => onChange(value + 1);

  return (
    <div className="inline-flex items-center rounded-lg border border-ink-700">
      <button
        type="button"
        onClick={dec}
        aria-label="Diminuir quantidade"
        className="px-3 py-1 text-lg text-zinc-300 hover:text-brand"
      >
        −
      </button>
      <span className="w-8 text-center text-sm font-semibold tabular-nums">{value}</span>
      <button
        type="button"
        onClick={inc}
        aria-label="Aumentar quantidade"
        className="px-3 py-1 text-lg text-zinc-300 hover:text-brand"
      >
        +
      </button>
    </div>
  );
}
