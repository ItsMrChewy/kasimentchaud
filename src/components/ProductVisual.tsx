import type { Product } from "@/lib/products";

// Visuel graphique abstrait (aucune photo) : motif tissé dans la couleur de la pièce.
const bg: Record<Product["swatch"], string> = {
  navy: "var(--navy)", caramel: "var(--caramel)", glacier: "var(--glacier)", beige: "var(--cream)",
};
const fg: Record<Product["swatch"], string> = {
  navy: "var(--beige)", caramel: "var(--beige)", glacier: "var(--navy)", beige: "var(--caramel)",
};

export function ProductVisual({ product, variant = 0, className = "" }: { product: Product; variant?: number; className?: string }) {
  const c = fg[product.swatch];
  const id = `p-${product.id}-${variant}`;
  const s = 24 + variant * 8;
  const pattern = {
    stripes: <rect width={s} height={s / 3} fill={c} opacity=".35" />,
    dots: <circle cx={s / 2} cy={s / 2} r={s / 7} fill={c} opacity=".4" />,
    waves: <path d={`M0 ${s / 2} Q${s / 4} ${s / 4} ${s / 2} ${s / 2} T${s} ${s / 2}`} stroke={c} strokeWidth="3" fill="none" opacity=".45" />,
    checks: <><rect width={s / 2} height={s / 2} fill={c} opacity=".25" /><rect x={s / 2} y={s / 2} width={s / 2} height={s / 2} fill={c} opacity=".25" /></>,
    zigzag: <path d={`M0 ${s * 0.7} L${s / 2} ${s * 0.3} L${s} ${s * 0.7}`} stroke={c} strokeWidth="3" fill="none" opacity=".45" />,
  }[product.pattern];
  return (
    <svg viewBox="0 0 300 360" className={className} role="img" aria-label={`Motif graphique de ${product.name}`} preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={id} width={s} height={s} patternUnits="userSpaceOnUse" patternTransform={`rotate(${variant * 15})`}>{pattern}</pattern>
      </defs>
      <rect width="300" height="360" fill={bg[product.swatch]} />
      <rect width="300" height="360" fill={`url(#${id})`} />
      <circle cx={variant % 2 ? 70 : 230} cy={variant % 2 ? 290 : 80} r="70" fill={c} opacity=".12" />
      <text x="150" y="200" textAnchor="middle" fontFamily="Fraunces, serif" fontWeight="800" fontSize="120" fill={c} opacity=".9">
        {product.name.split(" ").pop()?.[0]}
      </text>
    </svg>
  );
}
