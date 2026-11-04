import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check, MapPin, Shirt } from "lucide-react";
import { formatPrice, getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductVisual } from "@/components/ProductVisual";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/produit/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({ meta: loaderData ? [
    { title: `${loaderData.product.name} — Cozy Manchot` },
    { name: "description", content: loaderData.product.description },
    { property: "og:title", content: `${loaderData.product.name} — Cozy Manchot` },
    { property: "og:description", content: loaderData.product.short },
  ] : [{ title: "Pièce introuvable — Cozy Manchot" }, { name: "robots", content: "noindex" }] }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="text-4xl">Cette pièce a trouvé preneur</h1>
      <Link to="/boutique" className="btn btn-primary mt-6">Retour à la boutique</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add, lines } = useCart();
  const [view, setView] = useState(0);
  const [size, setSize] = useState<string>(product.sizes[0] ?? "");
  const inCart = lines.some((l) => l.id === product.id && l.size === size);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <Link to="/boutique" className="text-sm font-semibold underline decoration-caramel underline-offset-4">← Boutique</Link>
      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-3xl shadow-warm"><ProductVisual product={product} variant={view} className="aspect-[5/6] w-full" /></div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((v) => (
              <button key={v} onClick={() => setView(v)} aria-label={`Vue ${v + 1}`} className={`overflow-hidden rounded-2xl border-4 ${view === v ? "border-caramel" : "border-transparent"}`}>
                <ProductVisual product={product} variant={v} className="aspect-square w-full" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className="rounded-full bg-glacier px-3 py-1 text-sm font-semibold">{product.badge}</span>
          <h1 className="mt-4 text-5xl">{product.name}</h1>
          <p className="mt-2 text-2xl font-semibold">{formatPrice(product.price)} CAD</p>
          <p className="mt-6 text-lg">{product.description}</p>
          <dl className="mt-6 space-y-3">
            <div className="flex gap-3"><Shirt className="h-5 w-5 text-caramel" /><dt className="font-semibold">État :</dt><dd>{product.condition}</dd></div>
            <div className="flex gap-3"><MapPin className="h-5 w-5 text-caramel" /><dt className="font-semibold">Origine :</dt><dd>{product.origin}</dd></div>
          </dl>
          <fieldset className="mt-8">
            <legend className="mb-3 font-semibold">Taille</legend>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button key={s} onClick={() => setSize(s)} aria-pressed={size === s} className={`chip ${size === s ? "border-navy bg-navy text-beige" : "hover:border-caramel"}`}>{s}</button>
              ))}
            </div>
          </fieldset>
          <button onClick={() => add(product.id, size)} disabled={inCart} className="btn btn-primary mt-8 w-full sm:w-auto">
            {inCart ? <><Check className="h-5 w-5" /> Dans ton panier</> : "Ajouter au panier"}
          </button>
          {inCart && <Link to="/panier" className="ml-0 mt-3 block font-semibold underline decoration-caramel underline-offset-4 sm:ml-4 sm:inline">Voir le panier →</Link>}
          <div className="mt-10 rounded-3xl bg-card p-6 shadow-soft">
            <h2 className="text-2xl">Pourquoi c'est cozy</h2>
            <ul className="mt-4 space-y-2">
              {["Lavé à fond et adouci, sans produits agressifs", "Coutures vérifiées et renforcées une à une", "Une pièce unique qui évite le dépotoir", "Emballé à la main, sans plastique"].map((t) => (
                <li key={t} className="flex gap-2"><Check className="h-5 w-5 shrink-0 text-caramel" />{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <h2 className="mt-20 text-3xl">Tu pourrais aussi aimer</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.filter((p) => p.id !== product.id).slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
