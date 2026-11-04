import { createFileRoute, Link } from "@tanstack/react-router";
import { Penguin } from "@/components/Penguin";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/histoire")({
  head: () => ({ meta: [
    { title: "Notre histoire — Cozy Manchot" },
    { name: "description", content: "Des étudiants entrepreneurs québécois qui redonnent vie aux hoodies et couvertures de friperie." },
    { property: "og:title", content: "Notre histoire — Cozy Manchot" },
    { property: "og:description", content: "Réduire le gaspillage textile, un câlin à la fois." },
  ] }),
  component: Story,
});

const process = [
  ["La chasse", "On fait la tournée des friperies : Renaissance, Village des Valeurs, et toutes les petites perles de quartier."],
  ["Le grand bain", "Chaque pièce est lavée à fond, adoucie et inspectée sous toutes les coutures."],
  ["La réparation", "Trous, poignets usés, fermetures capricieuses : on répare tout ce qui peut l'être."],
  ["Le redesign", "Bandes, patchs, bordures neuves. On donne à chaque pièce une nouvelle personnalité."],
];

function Story() {
  return (
    <>
      <section className="knit">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center">
          <Penguin className="bob mx-auto h-20 w-20" />
          <h1 className="mt-6 text-5xl sm:text-6xl">Une colonie qui se tient au chaud</h1>
          <p className="mt-6 text-lg">Cozy Manchot, c'est une gang d'étudiants qui trouvaient ça triste de voir autant de beaux vêtements finir aux poubelles. Alors on a décidé d'en faire quelque chose.</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2">
        <Reveal className="rounded-3xl bg-navy p-8 text-beige shadow-warm">
          <h2 className="text-3xl">Notre mission</h2>
          <p className="mt-4 text-lg">Au Québec, des tonnes de textile sont jetées chaque année. On veut prouver qu'un vêtement usagé peut être plus beau, plus doux et plus aimé que du neuf.</p>
        </Reveal>
        <Reveal delay={100} className="rounded-3xl bg-glacier p-8 shadow-soft">
          <h2 className="text-3xl">Pourquoi un manchot?</h2>
          <p className="mt-4 text-lg">Parce que les manchots survivent au froid en se serrant les uns contre les autres. C'est un peu ça, notre idée de la chaleur : simple, partagée, honnête. Quasiment chaud.</p>
        </Reveal>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <h2 className="text-4xl">De la friperie à ton divan</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-2">
          {process.map(([t, d], i) => (
            <Reveal key={t} delay={i * 80}>
              <li className="flex h-full gap-5 rounded-3xl bg-card p-6 shadow-soft">
                <span className="font-display text-5xl text-caramel">{i + 1}</span>
                <div><h3 className="text-2xl">{t}</h3><p className="mt-2">{d}</p></div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="grid items-center gap-8 rounded-3xl border-2 border-caramel p-8 md:grid-cols-[auto_1fr]">
          <div className="flex justify-center -space-x-4">
            {["h-20 w-20", "h-24 w-24", "h-20 w-20"].map((c, i) => <span key={i} className="rounded-full bg-glacier p-2"><Penguin className={c} /></span>)}
          </div>
          <div>
            <h2 className="text-3xl">L'équipe</h2>
            <p className="mt-3 text-lg">On étudie le jour, on coud le soir, et on fait la tournée des friperies la fin de semaine. Chaque commande nous aide à continuer. Merci d'être là, sincèrement.</p>
            <Link to="/boutique" className="btn btn-primary mt-6">Découvrir nos pièces</Link>
          </div>
        </div>
      </section>
    </>
  );
}
