import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, ShoppingBag, X, Instagram } from "lucide-react";
import { useCart } from "@/lib/cart";
import { Penguin } from "./Penguin";

const nav = [
  { to: "/boutique", label: "Boutique" },
  { to: "/hoodies", label: "Hoodies" },
  { to: "/couvertures", label: "Couvertures" },
  { to: "/histoire", label: "Notre histoire" },
  { to: "/contact", label: "Contact" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-2" aria-label="Cozy Manchot, accueil">
      <Penguin className="h-9 w-9 shrink-0" />
      <span className="truncate font-display text-lg font-extrabold tracking-wide sm:text-xl">COZY MANCHOT</span>
    </Link>
  );
}

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 lg:flex lg:justify-between">
        <Logo />
        <nav className="hidden gap-7 lg:flex" aria-label="Navigation principale">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="font-medium underline-offset-8 decoration-caramel decoration-2 hover:underline" activeProps={{ className: "underline" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/panier" className="relative rounded-full p-2.5 hover:bg-muted" aria-label={`Panier, ${count} article(s)`}>
            <ShoppingBag className="h-6 w-6" />
            {count > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-caramel px-1 text-xs font-bold text-navy">{count}</span>}
          </Link>
          <button className="rounded-full p-2.5 hover:bg-muted lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t px-5 py-4 lg:hidden" aria-label="Navigation mobile">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 font-medium hover:bg-muted">{n.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy text-beige">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-beige p-1"><Penguin className="h-8 w-8" /></span>
            <span className="font-display text-xl font-extrabold">COZY MANCHOT</span>
          </div>
          <p className="mt-3 font-display text-2xl text-caramel">Quasiment chaud.</p>
        </div>
        <ul className="grid grid-cols-2 gap-2">
          {nav.map((n) => <li key={n.to}><Link to={n.to} className="hover:text-caramel">{n.label}</Link></li>)}
          <li><Link to="/panier" className="hover:text-caramel">Panier</Link></li>
        </ul>
        <div className="space-y-3">
          <div className="flex gap-3">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="rounded-full border border-caramel px-4 py-2 hover:bg-caramel hover:text-navy"><Instagram className="inline h-4 w-4" /> Instagram</a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="rounded-full border border-caramel px-4 py-2 hover:bg-caramel hover:text-navy">TikTok</a>
          </div>
          <p>Fait avec ❤️ à Montréal</p>
          <p className="text-sm opacity-75">© {new Date().getFullYear()} Cozy Manchot</p>
        </div>
      </div>
    </footer>
  );
}
