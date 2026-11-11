// Contenu facile à modifier : ajoute, enlève ou change des produits ici.
export type Category = "hoodies" | "couvertures";
export type Pattern = "stripes" | "dots" | "waves" | "checks" | "zigzag";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  sizes: string[];
  color: string; // nom de couleur pour le filtre
  swatch: "navy" | "caramel" | "glacier" | "beige";
  pattern: Pattern;
  badge: "Pièce unique" | "Dernière pièce";
  short: string;
  description: string;
  condition: string;
  origin: string;
}

export const products: Product[] = [
  {
    id: "petit-banquise",
    name: "Le Petit Banquise",
    category: "hoodies",
    price: 55,
    sizes: ["S", "M"],
    color: "Bleu",
    swatch: "glacier",
    pattern: "waves",
    badge: "Pièce unique",
    short: "Doux comme une première neige.",
    description:
      "Un hoodie bleu glacier retravaillé avec des coudes renforcés et une poche kangourou toute neuve. Parfait pour les matins frisquets.",
    condition: "Excellent — à peine porté",
    origin: "Sauvé chez Renaissance, Rosemont",
  },
  {
    id: "calin-caramel",
    name: "Le Câlin Caramel",
    category: "hoodies",
    price: 62,
    sizes: ["M", "L"],
    color: "Brun",
    swatch: "caramel",
    pattern: "stripes",
    badge: "Pièce unique",
    short: "Chaud comme un chocolat chaud.",
    description:
      "Un hoodie caramel avec des bandes cousues main sur les manches. Le genre de pièce qu'on ne prête jamais.",
    condition: "Très bon — petite reprise visible",
    origin: "Sauvé au Village des Valeurs, Longueuil",
  },
  {
    id: "capitaine-marine",
    name: "Le Capitaine Marine",
    category: "hoodies",
    price: 68,
    sizes: ["L", "XL"],
    color: "Marine",
    swatch: "navy",
    pattern: "dots",
    badge: "Dernière pièce",
    short: "Pour les longues soirées d'hiver.",
    description:
      "Un marine profond, une capuche doublée de polar recyclé. Il a déjà vécu, et il est prêt pour la suite.",
    condition: "Excellent",
    origin: "Sauvé chez Renaissance, Plateau",
  },
  {
    id: "petit-flocon",
    name: "Le Petit Flocon",
    category: "hoodies",
    price: 45,
    sizes: ["XS", "S"],
    color: "Beige",
    swatch: "beige",
    pattern: "checks",
    badge: "Pièce unique",
    short: "Léger, mais pas trop.",
    description:
      "Un hoodie crème aux poignets refaits en tricot. Idéal pour superposer quand le thermomètre hésite.",
    condition: "Bon — tissu légèrement adouci",
    origin: "Sauvé au Village des Valeurs, Verdun",
  },
  {
    id: "toque-tempete",
    name: "Le Toque Tempête",
    category: "hoodies",
    price: 72,
    sizes: ["M", "L", "XL"],
    color: "Bleu",
    swatch: "glacier",
    pattern: "zigzag",
    badge: "Pièce unique",
    short: "Pour braver la poudrerie.",
    description:
      "Un patchwork de deux hoodies bleus réunis en un seul. Surdimensionné, épais, franchement réconfortant.",
    condition: "Excellent — redesign complet",
    origin: "Sauvé chez Renaissance, Ahuntsic",
  },
  {
    id: "grande-doudou",
    name: "La Grande Doudou",
    category: "couvertures",
    price: 85,
    sizes: ["Grand format"],
    color: "Brun",
    swatch: "caramel",
    pattern: "checks",
    badge: "Pièce unique",
    short: "Assez grande pour deux (ou un chat).",
    description:
      "Une couverture de laine bordée à neuf, assez grande pour tout le divan. Lavée, réparée, adorée.",
    condition: "Très bon",
    origin: "Sauvée au Village des Valeurs, Laval",
  },
  {
    id: "nuit-polaire",
    name: "La Nuit Polaire",
    category: "couvertures",
    price: 58,
    sizes: ["Format moyen"],
    color: "Marine",
    swatch: "navy",
    pattern: "waves",
    badge: "Dernière pièce",
    short: "Pour les films de dimanche.",
    description:
      "Une jetée marine en polar épais, bordée de caramel. Elle tient dans un sac et réchauffe tout de suite.",
    condition: "Excellent",
    origin: "Sauvée chez Renaissance, Saint-Laurent",
  },
  {
    id: "petite-guimauve",
    name: "La Petite Guimauve",
    category: "couvertures",
    price: 35,
    sizes: ["Petit format"],
    color: "Beige",
    swatch: "beige",
    pattern: "dots",
    badge: "Pièce unique",
    short: "Format genoux, câlin garanti.",
    description: "Une petite couverture crème pour le bureau ou l'auto. Toute douce, toute simple.",
    condition: "Bon",
    origin: "Sauvée au Village des Valeurs, Montréal-Nord",
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const formatPrice = (n: number) => `${n.toFixed(2).replace(".", ",")} $`;
