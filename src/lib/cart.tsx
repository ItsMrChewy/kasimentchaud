import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getProduct, type Product } from "./products";

export interface CartLine { id: string; size: string; qty: number }
interface CartCtx {
  lines: (CartLine & { product: Product })[];
  count: number;
  total: number;
  add: (id: string, size: string) => void;
  remove: (id: string, size: string) => void;
  setQty: (id: string, size: string, qty: number) => void;
  clear: () => void;
}
const Ctx = createContext<CartCtx | null>(null);
const KEY = "cozy-manchot-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<CartLine[]>([]);
  useEffect(() => {
    try { setRaw(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch { /* vide */ }
  }, []);
  const save = (next: CartLine[]) => { setRaw(next); localStorage.setItem(KEY, JSON.stringify(next)); };

  const lines = raw.flatMap((l) => { const product = getProduct(l.id); return product ? [{ ...l, product }] : []; });
  const value: CartCtx = {
    lines,
    count: lines.reduce((s, l) => s + l.qty, 0),
    total: lines.reduce((s, l) => s + l.qty * l.product.price, 0),
    add: (id, size) => {
      const found = raw.find((l) => l.id === id && l.size === size);
      // Pièces uniques : une seule par taille
      if (!found) save([...raw, { id, size, qty: 1 }]);
    },
    remove: (id, size) => save(raw.filter((l) => !(l.id === id && l.size === size))),
    setQty: (id, size, qty) => save(raw.map((l) => (l.id === id && l.size === size ? { ...l, qty: Math.max(1, qty) } : l))),
    clear: () => save([]),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart hors CartProvider");
  return c;
}
