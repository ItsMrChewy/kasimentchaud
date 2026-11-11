import { Link } from "@tanstack/react-router";
import { formatPrice, type Product } from "@/lib/products";
import { ProductVisual } from "./ProductVisual";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to="/produit/$id" params={{ id: product.id }} className="group block rounded-3xl bg-card p-3 shadow-soft transition-shadow hover:shadow-warm">
      <div className="relative overflow-hidden rounded-2xl">
        <ProductVisual product={product} className="aspect-[5/6] w-full transition-transform duration-500 group-hover:scale-105" />
        <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${product.badge === "Dernière pièce" ? "bg-caramel text-navy" : "bg-beige text-navy"}`}>
          {product.badge}
        </span>
      </div>
      <div className="flex items-start justify-between gap-3 px-2 pb-2 pt-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.short}</p>
        </div>
        <p className="shrink-0 font-semibold">{"\n"}</p>
      </div>
    </Link>
  );
}
