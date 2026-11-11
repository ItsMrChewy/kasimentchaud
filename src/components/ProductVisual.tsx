import type { Product } from "@/lib/products";

// Visuel graphique abstrait (aucune photo) : motif tissé dans la couleur de la pièce.
const backgroundColors: Record<Product["swatch"], string> = {
  navy: "var(--navy)",
  caramel: "var(--caramel)",
  glacier: "var(--glacier)",
  beige: "var(--cream)",
};
const patternColors: Record<Product["swatch"], string> = {
  navy: "var(--beige)",
  caramel: "var(--beige)",
  glacier: "var(--navy)",
  beige: "var(--caramel)",
};

export function ProductVisual({
  product,
  variant = 0,
  className = "",
}: {
  product: Product;
  variant?: number;
  className?: string;
}) {
  const patternColor = patternColors[product.swatch];
  const patternId = `p-${product.id}-${variant}`;
  const tileSize = 24 + variant * 8;
  const pattern = {
    stripes: <rect width={tileSize} height={tileSize / 3} fill={patternColor} opacity=".35" />,
    dots: (
      <circle
        cx={tileSize / 2}
        cy={tileSize / 2}
        r={tileSize / 7}
        fill={patternColor}
        opacity=".4"
      />
    ),
    waves: (
      <path
        d={`M0 ${tileSize / 2} Q${tileSize / 4} ${tileSize / 4} ${tileSize / 2} ${tileSize / 2} T${tileSize} ${tileSize / 2}`}
        stroke={patternColor}
        strokeWidth="3"
        fill="none"
        opacity=".45"
      />
    ),
    checks: (
      <>
        <rect width={tileSize / 2} height={tileSize / 2} fill={patternColor} opacity=".25" />
        <rect
          x={tileSize / 2}
          y={tileSize / 2}
          width={tileSize / 2}
          height={tileSize / 2}
          fill={patternColor}
          opacity=".25"
        />
      </>
    ),
    zigzag: (
      <path
        d={`M0 ${tileSize * 0.7} L${tileSize / 2} ${tileSize * 0.3} L${tileSize} ${tileSize * 0.7}`}
        stroke={patternColor}
        strokeWidth="3"
        fill="none"
        opacity=".45"
      />
    ),
  }[product.pattern];
  return (
    <svg
      viewBox="0 0 300 360"
      className={className}
      role="img"
      aria-label={`Motif graphique de ${product.name}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id={patternId}
          width={tileSize}
          height={tileSize}
          patternUnits="userSpaceOnUse"
          patternTransform={`rotate(${variant * 15})`}
        >
          {pattern}
        </pattern>
      </defs>
      <rect width="300" height="360" fill={backgroundColors[product.swatch]} />
      <rect width="300" height="360" fill={`url(#${patternId})`} />
      <circle
        cx={variant % 2 ? 70 : 230}
        cy={variant % 2 ? 290 : 80}
        r="70"
        fill={patternColor}
        opacity=".12"
      />
      <text
        x="150"
        y="200"
        textAnchor="middle"
        fontFamily="Fraunces, serif"
        fontWeight="800"
        fontSize="120"
        fill={patternColor}
        opacity=".9"
      >
        {product.name.split(" ").pop()?.[0]}
      </text>
    </svg>
  );
}
