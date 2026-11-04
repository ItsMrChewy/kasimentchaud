import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Recycle, Sparkles, MapPin, GraduationCap, Search, Droplets, Scissors, Heart } from "lucide-react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Penguin } from "@/components/Penguin";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cozy Manchot — Hoodies et couvertures upcyclés" },
      { name: "description", content: "Des hoodies et des couvertures recyclés, retravaillés avec amour au Québec. Quasiment chaud." },
      { property: "og:title", content: "Cozy Manchot — Quasiment chaud." },
      { property: "og:description", content: "Hoodies et couvertures upcyclés, pièces uniques faites au Québec." },
    ],
  }),
  component: Home,
});

const values = [
  { icon: Recycle, t: "Seconde vie", d: "Chaque pièce vient d'une friperie." },
  { icon: Sparkles, t: "Pièces uniques", d: "Jamais deux pareilles." },
  { icon: MapPin, t: "Fait au Québec", d: "Retravaillé à Montréal." },
  { icon: GraduationCap, t: "Conçu par des jeunes", d: "Une équipe d'étudiants." },
];
const steps = [
  { icon: Search, t: "On déniche en friperie" },
  { icon: Droplets, t: "On lave et on répare" },
  { icon: Scissors, t: "On redesign" },
  { icon: Heart, t: "Tu te câlines dedans" },
];
const stats = [ // valeurs fictives, modifiables
  { n: 1240, s: "vêtements sauvés de la poubelle" },
  { n: 860, s: "kg de textile détournés" },
  { n: 512, s: "câlins livrés au Québec" },
];
const reviews = [
  { q: "Mon hoodie est plus doux que mon chum. Désolée, chéri.", a: "Camille, Québec" },
  { q: "Emballage mignon, pièce parfaite, et je sauve la planète un peu. Gagnant.", a: "Olivier, Sherbrooke" },
  { q: "La Grande Doudou vit sur mon divan maintenant. Elle paie pas de loyer.", a: "Maude, Montréal" },
];

function Counter({ to }: { to: number }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return; io.disconnect();
      const start = performance.now();
      const tick = (t: number) => { const p = Math.min(1, (t - start) / 1600); setV(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    });
    io.observe(el); return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{v.toLocaleString("fr-CA")}</span>;
}

function Home() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <section className="knit">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
          <Reveal>
            <p className="mb-4 inline-block rounded-full bg-glacier px-4 py-1.5 text-sm font-semibold">Upcyclé au Québec</p>
            <h1 className="text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">Quasiment chaud.</h1>
            <p className="mt-6 max-w-md text-lg">Des hoodies et des couvertures recyclés, retravaillés avec amour, pour te garder au chaud sans réchauffer la planète.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/boutique" className="btn btn-primary">Voir la boutique</Link>
              <Link to="/histoire" className="btn btn-outline">Notre histoire</Link>
            </div>
          </Reveal>
          <Reveal delay={150} className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-[40%_60%_55%_45%/50%_45%_55%_50%] bg-glacier shadow-warm" />
            <div className="absolute inset-[18%] rounded-full bg-beige/70" />
            <div className="absolute right-6 top-8 rounded-3xl bg-caramel px-4 py-2 font-display font-bold">-12°C</div>
            <div className="absolute bottom-10 left-4 rounded-3xl bg-navy px-4 py-2 font-display font-bold text-beige">100% seconde vie</div>
            <Penguin className="bob absolute inset-[22%] h-auto w-[56%]" />
          </Reveal>
        </div>
      </section>

      <section className="bg-navy text-beige">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-10 md:grid-cols-4">
          {values.map((v) => (
            <div key={v.t} className="flex items-start gap-3">
              <v.icon className="h-7 w-7 shrink-0 text-caramel" aria-hidden />
              <div><p className="font-display font-bold">{v.t}</p><p className="text-sm opacity-80">{v.d}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl">Les vedettes du moment</h2>
          <Link to="/boutique" className="font-semibold underline decoration-caramel decoration-2 underline-offset-4">Tout voir →</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((p, i) => <Reveal key={p.id} delay={i * 80}><ProductCard product={p} /></Reveal>)}
        </div>
      </section>

      <section className="bg-glacier/50 knit">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-center text-4xl">Comment ça marche</h2>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.t} delay={i * 100}>
                <li className="h-full rounded-3xl bg-card p-6 shadow-soft">
                  <span className="font-display text-4xl text-caramel">0{i + 1}</span>
                  <s.icon className="mt-4 h-8 w-8" aria-hidden />
                  <p className="mt-3 font-display text-xl font-bold">{s.t}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-center text-4xl">Notre petit impact</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {stats.map((s) => (
            <div key={s.s} className="rounded-3xl border-2 border-caramel p-8 text-center">
              <p className="font-display text-6xl font-extrabold"><Counter to={s.n} /></p>
              <p className="mt-2">{s.s}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <h2 className="text-4xl">Ce qu'on dit de nous</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.a} delay={i * 100}>
              <figure className="h-full rounded-3xl bg-card p-7 shadow-soft">
                <blockquote className="font-display text-xl leading-snug">« {r.q} »</blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-muted-foreground">— {r.a}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-5 pb-20">
        <div className="mx-auto max-w-4xl rounded-3xl bg-glacier px-6 py-14 text-center shadow-soft">
          <Penguin className="mx-auto h-14 w-14" />
          <h2 className="mt-4 text-4xl">Reste au chaud avec nous</h2>
          <p className="mt-3">Nouvelles pièces, coulisses et petits câlins par courriel. Pas de spam, promis.</p>
          {sent ? (
            <p className="mt-6 font-semibold" role="status">Merci! Tu fais maintenant partie de la colonie. 🐧</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
              <label htmlFor="nl" className="sr-only">Courriel</label>
              <input id="nl" type="email" required placeholder="ton@courriel.com" className="min-w-0 flex-1 rounded-full border-2 border-navy/20 bg-beige px-5 py-3 placeholder:text-muted-foreground" />
              <button className="btn btn-primary">Je m'abonne</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
