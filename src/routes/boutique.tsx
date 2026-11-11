import { createFileRoute } from "@tanstack/react-router";
import { Shop } from "@/components/Shop";

export const Route = createFileRoute("/boutique")({
  head: () => ({
    meta: [
      { title: "Boutique — Cozy Manchot" },
      {
        name: "description",
        content: "Tous nos hoodies et couvertures upcyclés, pièces uniques en $ CAD.",
      },
      { property: "og:title", content: "Boutique — Cozy Manchot" },
      { property: "og:description", content: "Hoodies et couvertures upcyclés, pièces uniques." },
    ],
  }),
  component: () => <Shop title="La vitrine" intro="Expositions de nos produits" />,
});
