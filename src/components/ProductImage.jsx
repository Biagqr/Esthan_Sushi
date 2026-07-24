/**
 * Visual for a product. Uses a real image when available and falls back to an
 * emoji tile on a gradient (the demo ships without real photo assets).
 */
export default function ProductImage({ produto, className = "" }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-accent/30 via-ink-800 to-ink-900 ${className}`}
    >
      <span className="text-6xl drop-shadow-lg" role="img" aria-label={produto.nome}>
        {produto.emoji || "🍣"}
      </span>
    </div>
  );
}
