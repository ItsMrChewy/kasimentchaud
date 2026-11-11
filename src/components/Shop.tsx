import { useState } from "react";
import { products, type Category } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { Penguin } from "./Penguin";

type CategoryFilter = Category | "all";

const categories = [
  { value: "all", label: "Tout" },
  { value: "hoodies", label: "Hoodies" },
  { value: "couvertures", label: "Couvertures" },
] as const;

function FilterChips<Value extends string>({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: readonly { value: Value; label: string }[];
  selected: Value;
  onSelect: (value: Value) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-20 text-sm font-semibold">{label}</span>
      {options.map(({ value, label }) => (
        <button
          key={value}
          className={`chip ${selected === value ? "bg-navy text-beige border-navy" : "hover:border-caramel"}`}
          aria-pressed={selected === value}
          onClick={() => onSelect(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function filterOptions(values: string[]) {
  return [
    { value: "all", label: "Toutes" },
    ...Array.from(new Set(values), (value) => ({ value, label: value })),
  ];
}

export function Shop({
  title,
  intro,
  fixedCategory,
}: {
  title: string;
  intro: string;
  fixedCategory?: Category;
}) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [size, setSize] = useState("all");
  const [color, setColor] = useState("all");
  const [sort, setSort] = useState("default");

  const category = fixedCategory ?? selectedCategory;
  const catalog = category === "all" ? products : products.filter((p) => p.category === category);
  const visibleProducts = catalog.filter(
    (product) =>
      (size === "all" || product.sizes.includes(size)) &&
      (color === "all" || product.color === color),
  );
  if (sort === "asc") visibleProducts.sort((a, b) => a.price - b.price);
  if (sort === "desc") visibleProducts.sort((a, b) => b.price - a.price);

  function selectCategory(value: CategoryFilter) {
    setSelectedCategory(value);
    setSize("all");
    setColor("all");
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <h1 className="text-5xl">{title}</h1>
      <p className="mt-3 max-w-xl text-lg">{intro}</p>

      <div className="mt-10 space-y-4 rounded-3xl bg-card p-5 shadow-soft">
        {!fixedCategory && (
          <FilterChips
            label="Catégorie"
            options={categories}
            selected={category}
            onSelect={selectCategory}
          />
        )}
        <FilterChips
          label="Taille"
          options={filterOptions(catalog.flatMap((product) => product.sizes))}
          selected={size}
          onSelect={setSize}
        />
        <FilterChips
          label="Couleur"
          options={filterOptions(catalog.map((product) => product.color))}
          selected={color}
          onSelect={setColor}
        />
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="w-20 text-sm font-semibold">
            Trier
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="rounded-full border-2 bg-beige px-4 py-2"
          >
            <option value="default">Nos coups de cœur</option>
            <option value="asc">Prix croissant</option>
            <option value="desc">Prix décroissant</option>
          </select>
        </div>
      </div>

      {visibleProducts.length ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center">
          <Penguin className="mx-auto h-20 w-20" />
          <p className="mt-4 font-display text-2xl">Rien ici… pour l'instant!</p>
          <p>Essaie un autre filtre.</p>
        </div>
      )}
    </div>
  );
}
