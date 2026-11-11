import { useMemo, useState } from "react";
import { products, type Category } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { Penguin } from "./Penguin";

export function Shop({ title, intro, fixedCategory }: { title: string; intro: string; fixedCategory?: Category }) {
  const [cat, setCat] = useState<Category | "all">(fixedCategory ?? "all");
  const [size, setSize] = useState("all");
  const [color, setColor] = useState("all");
  const [sort, setSort] = useState("default");

  const base = products.filter((p) => cat === "all" || p.category === cat);
  const sizes = [...new Set(base.flatMap((p) => p.sizes))];
  const colors = [...new Set(base.map((p) => p.color))];
  const list = useMemo(() => {
    const l = base.filter((p) => (size === "all" || p.sizes.includes(size)) && (color === "all" || p.color === color));
    if (sort === "asc") l.sort((a, b) => a.price - b.price);
    if (sort === "desc") l.sort((a, b) => b.price - a.price);
    return l;
  }, [base, size, color, sort]);

  const chip = (active: boolean) => `chip ${active ? "bg-navy text-beige border-navy" : "hover:border-caramel"}`;

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <h1 className="text-5xl">{fixedCategory ? title : "La vitrine"}</h1>
      <p className="mt-3 max-w-xl text-lg">{fixedCategory ? intro : "Expositions de nos produits"}</p>

      <div className="mt-10 space-y-4 rounded-3xl bg-card p-5 shadow-soft">
        {!fixedCategory && (
          <div className="flex flex-wrap items-center gap-2"><span className="w-20 text-sm font-semibold">Catégorie</span>
            {(["all", "hoodies", "couvertures"] as const).map((c) => (
              <button key={c} className={chip(cat === c)} aria-pressed={cat === c} onClick={() => { setCat(c); setSize("all"); setColor("all"); }}>
                {c === "all" ? "Tout" : c === "hoodies" ? "Hoodies" : "Couvertures"}
              </button>
            ))}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2"><span className="w-20 text-sm font-semibold">Taille</span>
          {["all", ...sizes].map((s) => <button key={s} className={chip(size === s)} aria-pressed={size === s} onClick={() => setSize(s)}>{s === "all" ? "Toutes" : s}</button>)}
        </div>
        <div className="flex flex-wrap items-center gap-2"><span className="w-20 text-sm font-semibold">Couleur</span>
          {["all", ...colors].map((c) => <button key={c} className={chip(color === c)} aria-pressed={color === c} onClick={() => setColor(c)}>{c === "all" ? "Toutes" : c}</button>)}
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="w-20 text-sm font-semibold">Trier</label>
          <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border-2 bg-beige px-4 py-2">
            <option value="default">Nos coups de cœur</option>
            <option value="asc">Prix croissant</option>
            <option value="desc">Prix décroissant</option>
          </select>
        </div>
      </div>

      {list.length ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{list.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      ) : (
        <div className="mt-16 text-center"><Penguin className="mx-auto h-20 w-20" /><p className="mt-4 font-display text-2xl">Rien ici… pour l'instant!</p><p>Essaie un autre filtre.</p></div>
      )}
    </div>
  );
}
