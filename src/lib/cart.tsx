import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getProduct, type Product } from "./products";

interface CartLine {
  id: string;
  size: string;
  qty: number;
}
interface CartContextValue {
  lines: (CartLine & { product: Product })[];
  count: number;
  total: number;
  add: (id: string, size: string) => void;
  remove: (id: string, size: string) => void;
  clear: () => void;
}
const CartContext = createContext<CartContextValue | null>(null);
const CART_STORAGE_KEY = "cozy-manchot-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [savedCartLines, setSavedCartLines] = useState<CartLine[]>([]);
  useEffect(() => {
    try {
      setSavedCartLines(JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]"));
    } catch {
      /* vide */
    }
  }, []);
  const save = (nextCartLines: CartLine[]) => {
    setSavedCartLines(nextCartLines);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nextCartLines));
  };

  const lines = savedCartLines.flatMap((line) => {
    const product = getProduct(line.id);
    return product ? [{ ...line, product }] : [];
  });
  const value: CartContextValue = {
    lines,
    count: lines.reduce((count, line) => count + line.qty, 0),
    total: lines.reduce((subtotal, line) => subtotal + line.qty * line.product.price, 0),
    add: (id, size) => {
      const found = savedCartLines.some((line) => line.id === id && line.size === size);
      // Pièces uniques : une seule par taille
      if (!found) save([...savedCartLines, { id, size, qty: 1 }]);
    },
    remove: (id, size) =>
      save(savedCartLines.filter((line) => !(line.id === id && line.size === size))),
    clear: () => save([]),
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart hors CartProvider");
  return cart;
}
