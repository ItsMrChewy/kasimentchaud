import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Instagram } from "lucide-react";
import { Penguin } from "@/components/Penguin";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact et FAQ — Cozy Manchot" },
      {
        name: "description",
        content:
          "Écris-nous et trouve les réponses sur la livraison, les retours, l'entretien et les tailles.",
      },
      { property: "og:title", content: "Contact et FAQ — Cozy Manchot" },
      { property: "og:description", content: "Une question? La colonie te répond." },
    ],
  }),
  component: Contact,
});

const faq = [
  [
    "Combien de temps prend la livraison?",
    "On expédie en 2 à 3 jours ouvrables partout au Québec et au Canada. Livraison gratuite dès 75 $.",
  ],
  [
    "Est-ce que je peux retourner une pièce?",
    "Oui! Tu as 30 jours pour nous la retourner, en bon état. On te rembourse dès réception.",
  ],
  [
    "Comment je lave mon hoodie ou ma couverture?",
    "À l'eau froide, cycle délicat, à l'envers. Séchage à plat de préférence. Elle va durer encore longtemps.",
  ],
  [
    "Comment choisir ma taille?",
    "Chaque fiche indique la taille de la pièce. Nos hoodies sont souvent amples : en cas de doute, écris-nous et on te donne les mesures exactes.",
  ],
  [
    "Comment vous choisissez les pièces?",
    "On cherche des tissus solides et doux, sans dommages majeurs, avec une couleur ou un détail qui nous fait sourire.",
  ],
];

function Contact() {
  const [sent, setSent] = useState(false);
  const field = "w-full rounded-2xl border-2 bg-beige px-4 py-3";
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 lg:grid-cols-2">
      <section>
        <h1 className="text-5xl">Écris-nous</h1>
        <p className="mt-3 text-lg">Une question, une idée, un câlin à partager? On répond vite.</p>
        {sent ? (
          <div className="mt-8 rounded-3xl bg-glacier p-8 text-center" role="status">
            <Penguin className="bob mx-auto h-16 w-16" />
            <p className="mt-4 font-display text-2xl">Message reçu!</p>
            <p>On te revient très bientôt.</p>
          </div>
        ) : (
          <form
            className="mt-8 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
          >
            <label className="block">
              <span className="text-sm font-semibold">Nom</span>
              <input required className={field} />
            </label>
            <label className="block">
              <span className="text-sm font-semibold">Courriel</span>
              <input type="email" required className={field} />
            </label>
            <label className="block">
              <span className="text-sm font-semibold">Message</span>
              <textarea required rows={5} className={field} />
            </label>
            <button className="btn btn-primary">Envoyer</button>
          </form>
        )}
        <div className="mt-8 flex gap-3">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            <Instagram className="h-4 w-4" /> Instagram
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="btn btn-outline">
            TikTok
          </a>
        </div>
      </section>
      <section>
        <h2 className="text-4xl">Questions fréquentes</h2>
        <div className="mt-8 space-y-3">
          {faq.map(([question, answer]) => (
            <details key={question} className="group rounded-3xl bg-card p-5 shadow-soft">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold">
                {question}
                <span className="text-2xl text-caramel transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3">{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
