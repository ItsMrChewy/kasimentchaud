import { createFileRoute } from "@tanstack/react-router";
import { Shop } from "@/components/Shop";

export const Route = createFileRoute("/couvertures")({
  head: () => ({ meta: [
    { title: "Couvertures upcyclées — Cozy Manchot" },
    { name: "description", content: "Des couvertures de friperie lavées, bordées à neuf et prêtes à te réchauffer." },
    { property: "og:title", content: "Couvertures upcyclées — Cozy Manchot" },
    { property: "og:description", content: "Des couvertures uniques pour tes soirées de divan." },
  ] }),
  component: () => <Shop fixedCategory="couvertures" title="Couvertures" intro="Pour le divan, l'auto ou le bureau. Chacune a une histoire." />,
});
