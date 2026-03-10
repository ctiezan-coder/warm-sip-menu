import { motion } from "framer-motion";
import { useState } from "react";
import { MessageCircle, ArrowLeft, ChevronRight } from "lucide-react";
import logo from "@/assets/neriya-logo.png";
import heroImg from "@/assets/hero-with-logo.jpg";
import catPetitDej from "@/assets/cat-petit-dejeuner.jpg";
import catDejeuner from "@/assets/cat-dejeuner.jpg";
import catDiner from "@/assets/cat-diner.jpg";
import catDessert from "@/assets/cat-dessert.jpg";
import catBoissons from "@/assets/cat-boissons.jpg";
import MenuSection from "@/components/MenuSection";
import MenuSoupeSection from "@/components/MenuSoupeSection";

const MenuPlatDuJourSection = MenuSoupeSection;

// ─── DATA ─────────────────────────────────────────────────
const cafeChaud = [
  { name: "Expresso", price: "500 Fr" },
  { name: "Double Expresso", price: "1 000 Fr" },
  { name: "Americano", price: "1 000 Fr" },
  { name: "Café Latté", price: "1 500 Fr" },
  { name: "Cappuccino", price: "1 500 Fr" },
  { name: "Moca", price: "2 000 Fr" },
];
const cafeGlace = [
  { name: "Americano", price: "2 000 Fr" },
  { name: "Café Latté", price: "2 500 Fr" },
  { name: "Caramel Expresso", price: "2 500 Fr" },
  { name: "Moca", price: "2 500 Fr" },
  { name: "Café Latté Caramel Spéculoos", price: "3 000 Fr" },
];
const theChaud = [
  { name: "Thé Lipton", price: "500 Fr" },
  { name: "Thé Infusion Neriya", price: "1 000 Fr" },
  { name: "Thé Infusion Gingembre Menthe", price: "1 500 Fr" },
];
const theFroid = [
  { name: "Thé Mojito Citron", price: "1 500 Fr", emoji: "🍋" },
  { name: "Thé Mojito Pêche", price: "1 500 Fr", emoji: "🍑" },
  { name: "Thé Mojito Fraise", price: "1 500 Fr", emoji: "🍓" },
  { name: "Thé Mojito Orange", price: "1 500 Fr", emoji: "🍊" },
  { name: "Thé Fruit de la Passion Coco", price: "2 000 Fr", emoji: "🥥" },
];
const chocolatChaud = [
  { name: "Chocolat Chaud Classique", price: "2 000 Fr" },
  { name: "Chocolat Chaud Chantilly", price: "2 500 Fr" },
  { name: "Crazy Chocolat – Guimauve & Chantilly", price: "3 500 Fr" },
];
const milkshakes = [
  { name: "Vanille", price: "2 000 Fr" },
  { name: "Menthe", price: "2 000 Fr" },
  { name: "Fraise", price: "2 500 Fr", emoji: "🍓" },
  { name: "Kinder Bueno", price: "2 500 Fr" },
  { name: "Spéculoos Caramel Beurre Salé", price: "2 500 Fr" },
  { name: "Chocolat Oreo", price: "2 500 Fr" },
  { name: "Coco Bounty", price: "2 500 Fr" },
];
const jusNaturel = [
  { name: "Bissap", price: "1 000 Fr" },
  { name: "Gingembre", price: "1 000 Fr" },
  { name: "Citron", price: "1 000 Fr" },
  { name: "Sucrerie", price: "1 000 Fr" },
  { name: "Eau Minérale", price: "1 000 Fr" },
  { name: "Passion (selon saison)", price: "1 500 / 2 000 Fr" },
  { name: "Cocktail de Fruits", price: "2 000 Fr" },
];
const painsPerdu = [
  { name: "Pain Perdu Nature", price: "2 500 Fr" },
  { name: "Pain Perdu Caramel (boule de glace)", price: "4 000 Fr" },
  { name: "Feuilleté de Pain Fourré", price: "6 000 Fr", description: "Crème pâtissière, boule de glace, fruits, spéculoos" },
];
const pancakes = [
  { name: "Pancakes Nature", price: "1 000 Fr" },
  { name: "Pancakes Miel ou Caramel", price: "1 500 Fr", emoji: "🍯" },
  { name: "Pancakes Nutella", price: "2 000 Fr" },
  { name: "Pancakes Caramel Fruit (saison)", price: "2 000 Fr" },
];
const croissantGauffre = [
  { name: "Croissant Gauffre Vanille Spéculoos", price: "2 500 Fr" },
  { name: "Croissant Gauffre Oreo", price: "2 500 Fr" },
  { name: "Croissant Gauffre Fruits Rouges", price: "3 000 Fr" },
  { name: "Croissant Vanille Pistache", price: "2 500 Fr" },
];
const crepes = [
  { name: "Crêpe Nature (miel facultatif)", price: "1 000 Fr" },
  { name: "Crêpe Nutella", price: "1 500 Fr" },
  { name: "Crêpe Fettuccine Nutella", price: "3 000 Fr", description: "Nutella, boule de glace, coulis chocolat" },
  { name: "Crêpe Fettuccine Oreo", price: "4 000 Fr", description: "Biscuits Oreo, boule de glace, coulis chocolat" },
  { name: "Crêpe Fettuccine Spéculoos", price: "4 000 Fr", description: "Biscuits spéculoos, boule de glace, coulis chocolat" },
  { name: "Crêpe Fettuccine Fruits Saisonniers", price: "5 500 Fr", description: "Fruits, granulats, glace, coulis 3 chocolats" },
  { name: "Crêpe Pralin", price: "6 000 Fr", description: "Crème pâtissière, fruits, biscottes, boule de glace" },
];
const degue = [
  { name: "Pain Fourré Lait Caillé", price: "1 500 Fr" },
  { name: "Pain Fourré Dêguê", price: "1 500 Fr" },
  { name: "Dêguê au Fruit de la Passion", price: "2 000 Fr" },
  { name: "Dêguê au Lait de Coco", price: "2 000 Fr" },
  { name: "Dêguê Café Cappuccino", price: "2 000 Fr" },
  { name: "Dêguê Caramel Granola", price: "2 000 Fr" },
];
const tchep = [
  { name: "Tchêp Poulet", price: "2 000 / 2 500 Fr" },
  { name: "Tchêp Poisson", price: "2 000 / 2 500 Fr" },
  { name: "Tchêp Viande de Bœuf", price: "2 500 / 3 000 Fr" },
  { name: "Tchêp Mouton", price: "3 500 / 4 000 Fr" },
  { name: "Tchêp Boulette de Viande", price: "2 500 / 3 000 Fr" },
];
const yassa = [
  { name: "Yassa Poulet Riz", price: "2 500 Fr", emoji: "🍚" },
  { name: "Yassa Poulet Fonio", price: "3 000 / 3 500 Fr" },
  { name: "Yassa Poisson Riz", price: "2 500 / 3 000 Fr", emoji: "🍚" },
  { name: "Yassa Poisson Fonio", price: "3 000 / 3 500 Fr" },
  { name: "Yassa Mouton Riz", price: "3 500 / 4 500 Fr", emoji: "🍚" },
  { name: "Yassa Mouton Fonio", price: "4 000 / 5 000 Fr" },
];
const mafe = [
  { name: "Pondeuse Fumée (riz / Fonio)", price: "3 000 / 3 500 Fr", emoji: "🍚" },
  { name: "½ Pondeuse Fumée (riz ou Fonio)", price: "4 500 / 6 000 Fr" },
  { name: "1 Pondeuse Entière (riz ou Fonio)", price: "9 000 / 11 000 Fr" },
  { name: "Poisson Fumé (riz ou Fonio)", price: "2 500 / 3 500 Fr", emoji: "🍚" },
  { name: "Viande de Bœuf Fumée (riz / Fonio)", price: "2 500 / 3 500 Fr" },
];
const sauceTomate = [
  { name: "Sauce Tomate Boulette de Viande Riz", price: "2 500 Fr", emoji: "🍚" },
  { name: "Sauce Feuille de Viande de Bœuf Riz", price: "2 500 Fr", emoji: "🍚" },
];
const sauceLegume = [
  { name: "Pondeuse Fumée (riz ou Fonio)", price: "3 000 / 3 500 Fr", emoji: "🍚" },
  { name: "½ Pondeuse Fumée (riz ou Fonio)", price: "4 500 / 6 000 Fr" },
  { name: "1 Pondeuse Entière (riz / Fonio)", price: "9 000 / 11 000 Fr" },
  { name: "Viande de Bœuf Fumée (riz / Fonio)", price: "2 500 / 3 500 Fr" },
];
const soupe = [
  { name: "½ Pondeuse (riz, attiéké)", price: "5 000 Fr" },
  { name: "1 Pondeuse Entière (riz, attiéké)", price: "9 000 Fr" },
  { name: "Soupe Poulet Chair ½ (attiéké, riz)", price: "3 500 Fr" },
  { name: "Soupe Poulet Chair 1 entier (attiéké, riz)", price: "6 500 Fr" },
  { name: "Soupe Poisson (riz, attiéké)", price: "3 000 / 4 000 / 5 000 Fr", description: "Prix selon le poisson du jour" },
];

// ─── CATEGORIES ────────────────────────────────────────────
type CategoryKey = "petit-dejeuner" | "dejeuner" | "diner" | "dessert" | "boissons";

const categories: { key: CategoryKey; label: string; emoji: string; image: string; description: string }[] = [
  { key: "petit-dejeuner", label: "Petit Déjeuner", emoji: "☕", image: catPetitDej, description: "Cafés, thés, chocolats & viennoiseries" },
  { key: "dejeuner", label: "Déjeuner", emoji: "🍛", image: catDejeuner, description: "Tchêp, Yassa, Mafé, Sauces & Soupes" },
  { key: "diner", label: "Dîner", emoji: "🌙", image: catDiner, description: "Nos plats du soir" },
  { key: "dessert", label: "Desserts", emoji: "🍰", image: catDessert, description: "Pancakes, crêpes, gaufres & spécialités" },
  { key: "boissons", label: "Boissons", emoji: "🧃", image: catBoissons, description: "Jus naturels, milkshakes & boissons fraîches" },
];

// ─── CATEGORY CONTENT ─────────────────────────────────────
const CategoryContent = ({ category }: { category: CategoryKey }) => {
  switch (category) {
    case "petit-dejeuner":
      return (
        <div className="space-y-6">
          <MenuSection title="Pains Perdu 🍞" items={painsPerdu} delay={0.1} />
          <MenuSection title="Pancakes 🥞" items={pancakes} delay={0.15} />
          <MenuSection title="Croissant Gauffre 🧇" items={croissantGauffre} delay={0.2} />
          <div className="chalk-line my-4" />
          <MenuSection title="Crêpes Sucrées 🥞" items={crepes} delay={0.25} />
          <div className="chalk-line my-4" />
          <MenuSection title="Dêguê & Lait Caillé 🥛" items={degue} delay={0.3} />
        </div>
      );
    case "dejeuner":
      return (
        <div className="space-y-6">
          <MenuSection title="Tchêp 🍛" items={tchep} delay={0.1} />
          <MenuSection title="Yassa 🍗" items={yassa} delay={0.15} />
          <div className="chalk-line my-4" />
          <MenuPlatDuJourSection title="Mafé 🥜 — Sauce Arachide" items={mafe} delay={0.2} />
          <MenuPlatDuJourSection title="Sauce Tomate 🍅" items={sauceTomate} delay={0.25} />
          <MenuPlatDuJourSection title="Sauce Légume 🥬" items={sauceLegume} delay={0.3} />
          <div className="chalk-line my-4" />
          <MenuPlatDuJourSection title="Soupe 🍲" items={soupe} delay={0.35} />
        </div>
      );
    case "diner":
      return (
        <div className="space-y-6">
          <MenuSection title="Tchêp 🍛" items={tchep} delay={0.1} />
          <MenuSection title="Yassa 🍗" items={yassa} delay={0.15} />
          <div className="chalk-line my-4" />
          <MenuPlatDuJourSection title="Soupe 🍲" items={soupe} delay={0.2} />
        </div>
      );
    case "dessert":
      return (
        <div className="space-y-6">
          <MenuSection title="Pancakes 🥞" items={pancakes} delay={0.1} />
          <MenuSection title="Croissant Gauffre" items={croissantGauffre} delay={0.15} />
          <MenuSection title="Crêpes Sucrées 🥞" items={crepes} delay={0.2} />
          <MenuSection title="Spécialités" items={autresDesserts} delay={0.25} />
        </div>
      );
    case "boissons":
      return (
        <div className="space-y-6">
          <MenuSection title="Milkshakes 🥤" items={milkshakes} variant="cold" delay={0.1} />
          <MenuSection title="Jus & Boissons Fraîches 🧃" items={jusNaturel} delay={0.15} />
        </div>
      );
  }
};

// ─── MAIN COMPONENT ───────────────────────────────────────
const Index = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(null);

  const activeCat = categories.find((c) => c.key === activeCategory);

  return (
    <div className="min-h-screen chalkboard-bg">
      {/* ═══ CATEGORY DETAIL VIEW ═══ */}
      {activeCategory && activeCat ? (
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35 }}
        >
          {/* Header with image */}
          <div className="relative h-48 sm:h-64 overflow-hidden">
            <img
              src={activeCat.image}
              alt={activeCat.label}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-background" />
            <button
              onClick={() => setActiveCategory(null)}
              className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-background/70 backdrop-blur-sm text-foreground font-body text-sm px-3 py-2 rounded-full hover:bg-background/90 transition-colors"
            >
              <ArrowLeft size={18} />
              Retour
            </button>
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-wider drop-shadow-lg">
                {activeCat.emoji} {activeCat.label}
              </h1>
            </div>
          </div>

          {/* Content */}
          <main className="max-w-2xl mx-auto px-4 sm:px-6 pb-24 sm:pb-16 space-y-6 mt-6">
            <CategoryContent category={activeCategory} />
          </main>
        </motion.div>
      ) : (
        /* ═══ HOME / HERO VIEW ═══ */
        <>
          {/* Hero Section */}
          <div className="relative h-[45vh] sm:h-[50vh] overflow-hidden grain-overlay">
            <img
              src={heroImg}
              alt="Neriya — La bouchée gourmande"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background" />
          </div>

          {/* Category Cards */}
          <main className="max-w-3xl mx-auto px-4 sm:px-6 pb-24 sm:pb-16 -mt-6 sm:-mt-8 relative z-10">
            <div className="grid gap-4 sm:gap-5">
              {categories.map((cat, i) => (
                <motion.button
                  key={cat.key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  onClick={() => {
                    setActiveCategory(cat.key);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="group relative overflow-hidden rounded-xl h-28 sm:h-32 text-left transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {/* Background image */}
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/30 group-hover:from-black/65 transition-colors" />

                  {/* Content */}
                  <div className="relative h-full flex items-center justify-between px-5 sm:px-8">
                    <div>
                      <span className="text-3xl sm:text-4xl mr-3">{cat.emoji}</span>
                      <h2 className="inline font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider">
                        {cat.label}
                      </h2>
                      <p className="font-body text-sm text-white/70 mt-1">{cat.description}</p>
                    </div>
                    <ChevronRight size={28} className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                </motion.button>
              ))}
            </div>
          </main>

          {/* Footer */}
          <footer className="text-center py-8 border-t border-border space-y-2">
            <p className="font-body text-xs text-muted-foreground italic tracking-wide">
              Tous les prix sont en FCFA · Service compris
            </p>
            <p className="font-script text-primary text-lg">Neriya</p>
            <p className="font-body text-xs text-muted-foreground">
              © 2026 — La bouchée gourmande
            </p>
          </footer>
        </>
      )}

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/2250789288202?text=Bonjour%20Neriya%20!%20Je%20souhaite%20passer%20une%20commande%20🍽️"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-body font-semibold text-xs sm:text-sm px-4 py-2.5 sm:px-5 sm:py-3 rounded-full shadow-lg shadow-black/30 transition-all hover:scale-105 active:scale-95"
      >
        <MessageCircle size={22} fill="white" strokeWidth={0} />
        Commander
      </a>
    </div>
  );
};

export default Index;
