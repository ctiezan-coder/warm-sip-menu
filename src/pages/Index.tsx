import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MessageCircle, ArrowLeft, ChevronRight, Sparkles } from "lucide-react";
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
  { key: "petit-dejeuner", label: "Petit Déjeuner", emoji: "🥞", image: catPetitDej, description: "Pains perdu, pancakes, crêpes & dêguê" },
  { key: "dejeuner", label: "Déjeuner", emoji: "🍛", image: catDejeuner, description: "Tchêp, Yassa, Mafé, Sauces & Soupes" },
  { key: "diner", label: "Dîner", emoji: "🌙", image: catDiner, description: "Nos plats du soir" },
  { key: "dessert", label: "Desserts", emoji: "🍰", image: catDessert, description: "Pancakes, crêpes, gaufres & spécialités" },
  { key: "boissons", label: "Boissons", emoji: "☕", image: catBoissons, description: "Cafés, thés, chocolats, milkshakes & jus" },
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
          <div className="chalk-line my-6" />
          <MenuSection title="Crêpes Sucrées 🥞" items={crepes} delay={0.25} />
          <div className="chalk-line my-6" />
          <MenuSection title="Dêguê & Lait Caillé 🥛" items={degue} delay={0.3} />
        </div>
      );
    case "dejeuner":
      return (
        <div className="space-y-6">
          <MenuSection title="Tchêp 🍛" items={tchep} delay={0.1} />
          <MenuSection title="Yassa 🍗" items={yassa} delay={0.15} />
          <div className="chalk-line my-6" />
          <MenuPlatDuJourSection title="Mafé 🥜 — Sauce Arachide" items={mafe} delay={0.2} />
          <MenuPlatDuJourSection title="Sauce Tomate 🍅" items={sauceTomate} delay={0.25} />
          <MenuPlatDuJourSection title="Sauce Légume 🥬" items={sauceLegume} delay={0.3} />
          <div className="chalk-line my-6" />
          <MenuPlatDuJourSection title="Soupe 🍲" items={soupe} delay={0.35} />
        </div>
      );
    case "diner":
      return (
        <div className="space-y-6">
          <MenuSection title="Tchêp 🍛" items={tchep} delay={0.1} />
          <MenuSection title="Yassa 🍗" items={yassa} delay={0.15} />
          <div className="chalk-line my-6" />
          <MenuPlatDuJourSection title="Soupe 🍲" items={soupe} delay={0.2} />
        </div>
      );
    case "dessert":
      return (
        <div className="space-y-6">
          <MenuSection title="Pains Perdu 🍞" items={painsPerdu} delay={0.1} />
          <MenuSection title="Pancakes 🥞" items={pancakes} delay={0.15} />
          <MenuSection title="Croissant Gauffre 🧇" items={croissantGauffre} delay={0.2} />
          <MenuSection title="Crêpes Sucrées 🥞" items={crepes} delay={0.25} />
          <MenuSection title="Dêguê & Lait Caillé 🥛" items={degue} delay={0.3} />
        </div>
      );
    case "boissons":
      return (
        <div className="space-y-6">
          <h3 className="font-display text-xl sm:text-2xl text-accent text-center uppercase tracking-widest">🔥 Chaud</h3>
          <MenuSection title="Cafés ☕" items={cafeChaud} variant="hot" delay={0.1} />
          <MenuSection title="Thés 🍵" items={theChaud} variant="hot" delay={0.15} />
          <MenuSection title="Chocolats 🍫" items={chocolatChaud} variant="hot" delay={0.2} />
          <div className="chalk-line my-6" />
          <h3 className="font-display text-xl sm:text-2xl text-primary text-center uppercase tracking-widest">❄️ Froid</h3>
          <MenuSection title="Cafés Glacés ☕" items={cafeGlace} variant="cold" delay={0.25} />
          <MenuSection title="Thés Froids 🍵" items={theFroid} variant="cold" delay={0.3} />
          <MenuSection title="Milkshakes 🥤" items={milkshakes} variant="cold" delay={0.35} />
          <MenuSection title="Jus & Boissons Fraîches 🧃" items={jusNaturel} delay={0.4} />
        </div>
      );
  }
};

// ─── DECORATIVE ORNAMENT ──────────────────────────────────
const GoldOrnament = () => (
  <div className="flex items-center justify-center gap-3 py-2">
    <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/40" />
    <Sparkles size={14} className="text-primary/50" />
    <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/40" />
  </div>
);

// ─── MAIN COMPONENT ───────────────────────────────────────
const Index = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(null);

  const activeCat = categories.find((c) => c.key === activeCategory);

  return (
    <div className="min-h-screen chalkboard-bg">
      <AnimatePresence mode="wait">
        {/* ═══ CATEGORY DETAIL VIEW ═══ */}
        {activeCategory && activeCat ? (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Header with image */}
            <div className="relative h-52 sm:h-72 overflow-hidden">
              <motion.img
                src={activeCat.image}
                alt={activeCat.label}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-background" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => setActiveCategory(null)}
                className="absolute top-4 left-4 z-10 flex items-center gap-2 glass-card text-foreground font-body text-sm px-4 py-2.5 rounded-full hover:bg-card/90 transition-all hover:scale-105 active:scale-95"
              >
                <ArrowLeft size={16} />
                Retour
              </motion.button>
              
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <span className="text-4xl sm:text-5xl block mb-2">{activeCat.emoji}</span>
                  <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-[0.15em] drop-shadow-lg">
                    {activeCat.label}
                  </h1>
                  <p className="font-body text-sm text-white/60 mt-2 tracking-wide">{activeCat.description}</p>
                </motion.div>
              </div>
            </div>

            {/* Content */}
            <main className="max-w-2xl mx-auto px-4 sm:px-6 pb-28 sm:pb-20 space-y-6 mt-4">
              <GoldOrnament />
              <CategoryContent category={activeCategory} />
              <GoldOrnament />
              
              {/* Bottom FCFA note */}
              <p className="font-body text-xs text-muted-foreground text-center italic tracking-wide pt-2">
                Tous les prix sont en FCFA · Service compris
              </p>
            </main>
          </motion.div>
        ) : (
          /* ═══ HOME / HERO VIEW ═══ */
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Hero Section */}
            <div className="relative h-[50vh] sm:h-[55vh] overflow-hidden grain-overlay">
              <motion.img
                src={heroImg}
                alt="Neriya — La bouchée gourmande"
                className="w-full h-full object-cover object-center"
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              
              {/* Tagline overlay */}
              <motion.div
                className="absolute bottom-8 sm:bottom-12 left-0 right-0 text-center"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <p className="font-script text-primary text-2xl sm:text-3xl drop-shadow-lg">La bouchée gourmande</p>
              </motion.div>
            </div>

            {/* Section title */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-2 relative z-10">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center gap-4 mb-6"
              >
                <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-primary/40" />
                <span className="font-display text-sm uppercase tracking-[0.3em] text-primary/70">Notre Carte</span>
                <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-primary/40" />
              </motion.div>
            </div>

            {/* Category Cards */}
            <main className="max-w-3xl mx-auto px-4 sm:px-6 pb-28 sm:pb-20 relative z-10">
              <div className="grid gap-4 sm:gap-5">
                {categories.map((cat, i) => (
                  <motion.button
                    key={cat.key}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: "easeOut" }}
                    onClick={() => {
                      setActiveCategory(cat.key);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group relative overflow-hidden rounded-xl h-28 sm:h-32 text-left gold-glow shimmer-hover transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {/* Background image */}
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25 group-hover:from-black/70 transition-all duration-500" />

                    {/* Content */}
                    <div className="relative h-full flex items-center justify-between px-5 sm:px-8">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl sm:text-4xl drop-shadow-md">{cat.emoji}</span>
                          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider drop-shadow-sm">
                            {cat.label}
                          </h2>
                        </div>
                        <p className="font-body text-xs sm:text-sm text-white/55 ml-12 sm:ml-[3.25rem] tracking-wide">{cat.description}</p>
                      </div>
                      <ChevronRight size={24} className="text-primary/60 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </main>

            {/* Footer */}
            <footer className="relative border-t border-primary/10 py-10 px-4">
              <div className="max-w-md mx-auto text-center space-y-3">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/30" />
                  <img src={logo} alt="Neriya" className="h-10 w-10 rounded-full object-cover opacity-70" />
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/30" />
                </div>
                <p className="font-script text-primary text-xl">Neriya</p>
                <p className="font-body text-xs text-muted-foreground italic tracking-wide">
                  Tous les prix sont en FCFA · Service compris
                </p>
                <p className="font-body text-[11px] text-muted-foreground/60">
                  © 2026 — La bouchée gourmande
                </p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/2250789288202?text=Bonjour%20Neriya%20!%20Je%20souhaite%20passer%20une%20commande%20🍽️"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe57] text-white font-body font-bold text-xs sm:text-sm px-5 py-3 sm:px-6 sm:py-3.5 rounded-full shadow-xl transition-all hover:scale-105 active:scale-95 whatsapp-pulse"
      >
        <MessageCircle size={20} fill="white" strokeWidth={0} />
        Commander
      </a>
    </div>
  );
};

export default Index;
