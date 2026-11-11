import { createFileRoute } from "@tanstack/react-router";
import { Shop } from "@/components/Shop";

export const Route = createFileRoute("/hoodies")({
  head: () => ({
    meta: [
      { title: "Hoodies upcyclés — Cozy Manchot" },
      {
        name: "description",
        content: "Des hoodies de friperie lavés, réparés et redesignés à Montréal.",
      },
      { property: "og:title", content: "Hoodies upcyclés — Cozy Manchot" },
      { property: "og:description", content: "Des hoodies uniques, quasiment chauds." },
    ],
  }),
  component: () => (
    <Shop
      fixedCategory="hoodies"
      title="Hoodies"
      intro="Sauvés en friperie, retravaillés à la main. Doux, uniques, prêts pour l'hiver."
    />
  ),
});
