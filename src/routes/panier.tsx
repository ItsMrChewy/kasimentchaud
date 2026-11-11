import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { ProductVisual } from "@/components/ProductVisual";
import { Penguin } from "@/components/Penguin";

export const Route = createFileRoute("/panier")({
  head: () => ({
    meta: [
      { title: "Ton panier — Cozy Manchot" },
      { name: "description", content: "Ton panier et ta commande Cozy Manchot." },
      { property: "og:title", content: "Ton panier — Cozy Manchot" },
      { property: "og:description", content: "Finalise ta commande de pièces upcyclées." },
    ],
  }),
  component: CartPage,
});

const SHIPPING_FREE_FROM = 75;
const SHIPPING = 9;

function CartPage() {
  const { lines, total, remove, clear } = useCart();
  const [done, setDone] = useState<string | null>(null);
  const shipping = total >= SHIPPING_FREE_FROM || total === 0 ? 0 : SHIPPING;
  const field = "w-full rounded-2xl border-2 bg-beige px-4 py-3";

  if (done)
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center" role="status">
        <Penguin className="bob mx-auto h-28 w-28" />
        <h1 className="mt-6 text-4xl">Merci, {done}!</h1>
        <p className="mt-3 text-lg">
          Ta commande est reçue. On l'emballe avec soin et on t'écrit dès qu'elle part. Quasiment
          chaud… bientôt chez toi.
        </p>
        <Link to="/boutique" className="btn btn-primary mt-8">
          Continuer à magasiner
        </Link>
      </div>
    );

  if (!lines.length)
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <Penguin className="mx-auto h-24 w-24" />
        <h1 className="mt-6 text-4xl">Ton panier a froid</h1>
        <p className="mt-3">Il est vide. Mets-y quelque chose de douillet.</p>
        <Link to="/boutique" className="btn btn-primary mt-8">
          Voir la boutique
        </Link>
      </div>
    );

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[1fr_420px]">
      <div>
        <h1 className="text-5xl">Ton panier</h1>
        <ul className="mt-8 space-y-4">
          {lines.map((l) => (
            <li
              key={l.id + l.size}
              className="flex items-center gap-4 rounded-3xl bg-card p-3 shadow-soft"
            >
              <ProductVisual product={l.product} className="h-24 w-20 shrink-0 rounded-2xl" />
              <div className="min-w-0 flex-1">
                <Link
                  to="/produit/$id"
                  params={{ id: l.id }}
                  className="font-display text-lg font-bold"
                >
                  {l.product.name}
                </Link>
                <p className="text-sm text-muted-foreground">Taille : {l.size} · Pièce unique</p>
              </div>
              <p className="font-semibold">{formatPrice(l.product.price)}</p>
              <button
                onClick={() => remove(l.id, l.size)}
                className="rounded-full p-2 hover:bg-muted"
                aria-label={`Retirer ${l.product.name}`}
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <aside className="h-fit rounded-3xl bg-card p-6 shadow-warm">
        <h2 className="text-2xl">Récapitulatif</h2>
        <dl className="mt-4 space-y-2">
          <div className="flex justify-between">
            <dt>Sous-total</dt>
            <dd>{formatPrice(total)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Livraison</dt>
            <dd>{shipping ? formatPrice(shipping) : "Gratuite"}</dd>
          </div>
          <div className="flex justify-between border-t-2 pt-2 text-lg font-bold">
            <dt>Total</dt>
            <dd>{formatPrice(total + shipping)}</dd>
          </div>
        </dl>
        {shipping > 0 && (
          <p className="mt-2 text-sm text-muted-foreground">
            Livraison gratuite dès {SHIPPING_FREE_FROM} $.
          </p>
        )}
        <form
          className="mt-6 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            const n = String(new FormData(e.currentTarget).get("name")).split(" ")[0] ?? "";
            clear();
            setDone(n);
          }}
        >
          <label className="block">
            <span className="text-sm font-semibold">Nom complet</span>
            <input name="name" required className={field} />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Courriel</span>
            <input name="email" type="email" required className={field} />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Adresse</span>
            <input name="address" required className={field} />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-sm font-semibold">Ville</span>
              <input name="city" required className={field} />
            </label>
            <label className="block">
              <span className="text-sm font-semibold">Code postal</span>
              <input name="zip" required className={field} />
            </label>
          </div>
          <button className="btn btn-primary w-full">Passer la commande</button>
        </form>
      </aside>
    </div>
  );
}
