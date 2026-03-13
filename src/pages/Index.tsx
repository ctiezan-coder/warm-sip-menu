import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useDailySelections, DAILY_SECTION_KEYS } from "@/hooks/useDailySelections";
import { useMenuData, LiveSection, LiveCategory } from "@/hooks/useMenuData";
import { MessageCircle, ArrowLeft, ChevronRight, Sparkles, FileText, Facebook } from "lucide-react";
import PlatDuJourPopup from "@/components/PlatDuJourPopup";
import CartDrawer from "@/components/CartDrawer";
import CartFloatingButton from "@/components/CartFloatingButton";
import { CartProvider, useCart } from "@/contexts/CartContext";
import EventFormDialog from "@/components/EventFormDialog";
import ReservationFormDialog from "@/components/ReservationFormDialog";
import logo from "@/assets/neriya-logo.png";
import heroImg from "@/assets/hero-with-logo.jpg";
import catPetitDej from "@/assets/cat-petit-dejeuner.jpg";
import catDejeuner from "@/assets/cat-dejeuner.jpg";
import catDiner from "@/assets/cat-diner.jpg";
import catDessert from "@/assets/cat-dessert.jpg";
import catBoissons from "@/assets/cat-boissons.jpg";
import MenuSection from "@/components/MenuSection";

// ─── FOOD IMAGE IMPORTS (fallback map) ────────────────────
import imgCrepeSalee from "@/assets/food/crepe-salee.png";
import imgDejFermier from "@/assets/food/dej-fermier.png";
import imgCrepeSucree from "@/assets/food/crepe-sucree.png";
import imgPainPerdu from "@/assets/food/pain-perdu.png";
import imgPainPerduCaramel from "@/assets/food/pain-perdu-caramel.png";
import imgFeuilletePain from "@/assets/food/feuillete-pain.png";
import imgPancakesNature from "@/assets/food/pancakes-nature.png";
import imgPancakesCaramel from "@/assets/food/pancakes-caramel.png";
import imgPancakesNutella from "@/assets/food/pancakes-nutella.png";
import imgPancakesFruit from "@/assets/food/pancakes-fruit.png";
import imgCroissantSpeculoos from "@/assets/food/croissant-gauffre-speculoos.png";
import imgCroissantOreo from "@/assets/food/croissant-gauffre-oreo.png";
import imgCroissantFruits from "@/assets/food/croissant-gauffre-fruits.png";
import imgCroissantPistache from "@/assets/food/croissant-pistache.png";
import imgCrepeNature from "@/assets/food/crepe-nature.png";
import imgCrepeNutella from "@/assets/food/crepe-nutella.png";
import imgCrepeFettNutella from "@/assets/food/crepe-fettuccine-nutella.png";
import imgCrepeFettOreo from "@/assets/food/crepe-fettuccine-oreo.png";
import imgCrepeFettSpeculoos from "@/assets/food/crepe-fettuccine-speculoos.png";
import imgCrepeFettFruits from "@/assets/food/crepe-fettuccine-fruits.png";
import imgCrepePralin from "@/assets/food/crepe-pralin.png";
import imgDegue from "@/assets/food/degue.png";
import imgPainLaitCaille from "@/assets/food/pain-lait-caille.png";
import imgPouletRoti from "@/assets/food/poulet-roti.png";
import imgChawama from "@/assets/food/chawama.png";
import imgBurger from "@/assets/food/burger.png";
import imgSauceFeuille from "@/assets/food/sauce-feuille.png";
import imgSauceLegume from "@/assets/food/sauce-legume.png";
import imgSauceTomate from "@/assets/food/sauce-tomate.png";
import imgSpaghettiKiosque from "@/assets/food/spaghetti-kiosque.png";
import imgGrillPoisson from "@/assets/food/grill-poisson.png";
import imgTchepPoulet from "@/assets/food/tchep-poulet.png";
import imgTchepMouton from "@/assets/food/tchep-mouton.png";
import imgTchepPoisson from "@/assets/food/tchep-poisson.png";
import imgTchepBoeuf from "@/assets/food/tchep-boeuf.png";
import imgTchepBoulette from "@/assets/food/tchep-boulette.png";
import imgYassaPoulet from "@/assets/food/yassa-poulet.png";
import imgYassaPoisson from "@/assets/food/yassa-poisson.png";
import imgYassaMouton from "@/assets/food/yassa-mouton.png";
import imgMafePondeuse from "@/assets/food/mafe-pondeuse.png";
import imgMafePoisson from "@/assets/food/mafe-poisson.png";
import imgMafeBoeuf from "@/assets/food/mafe-boeuf.png";
import imgSoupePoulet from "@/assets/food/soupe-poulet.png";
import imgSoupePoisson from "@/assets/food/soupe-poisson.png";
import imgCafeSection from "@/assets/food/cafe-section.jpg";
import imgCafeExpresso from "@/assets/food/cafe-expresso.png";
import imgCafeLatte from "@/assets/food/cafe-latte.png";
import imgCappuccino from "@/assets/food/cappuccino.png";
import imgCafeMoca from "@/assets/food/cafe-moca.png";
import imgCafeGlace from "@/assets/food/cafe-glace.png";
import imgCafeCaramelSpeculoos from "@/assets/food/cafe-caramel-speculoos.png";
import imgTheChaud from "@/assets/food/the-chaud.png";
import imgTheGingembreMenthe from "@/assets/food/the-gingembre-menthe.png";
import imgTheMojito from "@/assets/food/the-mojito.png";
import imgChocolatChaud from "@/assets/food/chocolat-chaud.png";
import imgChocolatCrazy from "@/assets/food/chocolat-crazy.png";
import imgMilkshakeVanille from "@/assets/food/milkshake-vanille.png";
import imgMilkshakeMenthe from "@/assets/food/milkshake-menthe.png";
import imgMilkshakeSection from "@/assets/food/milkshake-section.png";
import imgMilkshakeFraise from "@/assets/food/milkshake-fraise.png";
import imgMilkshakeKinder from "@/assets/food/milkshake-kinder.png";
import imgMilkshakeSpeculoos from "@/assets/food/milkshake-speculoos.png";
import imgMilkshakeOreo from "@/assets/food/milkshake-oreo.png";
import imgMilkshakeCoco from "@/assets/food/milkshake-coco.png";
import imgJusBissap from "@/assets/food/jus-bissap.png";
import imgJusGingembre from "@/assets/food/jus-gingembre.png";
import imgJusCitron from "@/assets/food/jus-citron.png";
import imgJusPassion from "@/assets/food/jus-passion.png";
import imgJusSection from "@/assets/food/jus-section.png";
import imgJusCocktail from "@/assets/food/jus-cocktail.png";
import imgEauMinerale from "@/assets/food/eau-minerale.png";

// ─── IMAGE FALLBACK MAPS ─────────────────────────────────
// Section name → fallback hero image
const sectionImageFallback: Record<string, string> = {
  "Déj Fermier 🍳": imgDejFermier,
  "Crêpe Salée 🧂": imgCrepeSalee,
  "Crêpe Sucrée 🍫": imgCrepeSucree,
  "Tchêp 🍛": imgTchepPoulet,
  "Yassa 🍗": imgYassaPoulet,
  "Mafé 🥜 — Sauce Arachide": imgMafePondeuse,
  "Sauce Légume 🥬": imgSauceLegume,
  "Sauce Tomate 🍅": imgSauceTomate,
  "Sauce Feuille 🍃": imgSauceFeuille,
  "Soupe 🍲": imgSoupePoulet,
  "Poulet Rôti 🍗": imgPouletRoti,
  "CHAWARMA 🌯": imgChawama,
  "Burger 🍔": imgBurger,
  "Spaghetti Kiosque 🍝": imgSpaghettiKiosque,
  "Grill 🐟": imgGrillPoisson,
  "Pancakes 🥞": imgPancakesFruit,
  "Pains Perdu 🍞": imgPainPerduCaramel,
  "Croissant Gauffre 🧇": imgCroissantFruits,
  "Crêpes Sucrées 🥞": imgCrepePralin,
  "Dêguê & Lait Caillé 🥛": imgDegue,
  "Cafés ☕": imgCafeSection,
  "Thés 🍵": imgTheGingembreMenthe,
  "Chocolats 🍫": imgChocolatCrazy,
  "Cafés Glacés ☕": imgCafeGlace,
  "Thés Froids 🍵": imgTheMojito,
  "Milkshakes 🥤": imgMilkshakeSection,
  "Jus & Boissons 🧃": imgJusSection,
};

// Item name → fallback item image
const itemImageFallback: Record<string, string> = {
  Expresso: imgCafeExpresso,
  "Double Expresso": imgCafeExpresso,
  Americano: imgCafeExpresso,
  "Café Latté": imgCafeLatte,
  Cappuccino: imgCappuccino,
  Moca: imgCafeMoca,
  "Caramel Expresso": imgCafeGlace,
  "Café Latté Caramel Spéculoos": imgCafeCaramelSpeculoos,
  "Thé Lipton": imgTheChaud,
  "Thé Infusion Neriya": imgTheChaud,
  "Thé Infusion Gingembre Menthe": imgTheGingembreMenthe,
  "Thé Mojito Citron": imgTheMojito,
  "Thé Mojito Pêche": imgTheMojito,
  "Thé Mojito Fraise": imgTheMojito,
  "Thé Mojito Orange": imgTheMojito,
  "Thé Fruit de la Passion Coco": imgJusPassion,
  "Chocolat Chaud Classique": imgChocolatChaud,
  "Chocolat Chaud Chantilly": imgChocolatChaud,
  "Crazy Chocolat – Guimauve & Chantilly": imgChocolatCrazy,
  Vanille: imgMilkshakeVanille,
  Menthe: imgMilkshakeMenthe,
  Fraise: imgMilkshakeFraise,
  "Kinder Bueno": imgMilkshakeKinder,
  "Spéculoos Caramel Beurre Salé": imgMilkshakeSpeculoos,
  "Chocolat Oreo": imgMilkshakeOreo,
  "Coco Bounty": imgMilkshakeCoco,
  Bissap: imgJusBissap,
  Gingembre: imgJusGingembre,
  Citron: imgJusCitron,
  Sucrerie: imgJusGingembre,
  "Eau Minérale": imgEauMinerale,
  "Passion (selon saison)": imgJusPassion,
  "Cocktail de Fruits": imgJusCocktail,
  "Café + Omelette": imgDejFermier,
  "Café + Œuf au Plat": imgDejFermier,
  "Café + Œuf au Plat (Jambon, Fromage)": imgDejFermier,
  "Café + Omelette Farcie": imgDejFermier,
  "Crêpe Fromage": imgCrepeSalee,
  "Crêpe Jambon de Dinde": imgCrepeSalee,
  "Crêpe Viande Hachée": imgCrepeSalee,
  "Crêpe Blanc de Poulet": imgCrepeSalee,
  "Crêpe Nature (miel facultatif)": imgCrepeNature,
  "Crêpe Nutella": imgCrepeNutella,
  "Crêpe Fettuccine Nutella": imgCrepeFettNutella,
  "Crêpe Fettuccine Oreo": imgCrepeFettOreo,
  "Crêpe Fettuccine Spéculoos": imgCrepeFettSpeculoos,
  "Crêpe Fettuccine Fruits Saisonniers": imgCrepeFettFruits,
  "Crêpe Pralin": imgCrepePralin,
  "Tchêp Mouton": imgTchepMouton,
  "Tchêp Poulet": imgTchepPoulet,
  "Tchêp Poisson": imgTchepPoisson,
  "Tchêp Viande de Bœuf": imgTchepBoeuf,
  "Tchêp Boulette de Viande": imgTchepBoulette,
  "Yassa Poisson Riz": imgYassaPoisson,
  "Yassa Poisson Fonio": imgYassaPoisson,
  "Yassa Poulet Riz": imgYassaPoulet,
  "Yassa Poulet Fonio": imgYassaPoulet,
  "Yassa Mouton Riz": imgYassaMouton,
  "Yassa Mouton Fonio": imgYassaMouton,
  "Pondeuse Fumée (riz ou Fonio)": imgMafePondeuse,
  "1/2 Pondeuse Fumée (riz ou Fonio)": imgMafePondeuse,
  "1 Pondeuse Entière (riz ou Fonio)": imgMafePondeuse,
  "Poisson Fumé (riz ou Fonio)": imgMafePoisson,
  "1 Pondeuse (riz, Fonio)": imgSauceLegume,
  "Viande de Bœuf Fumée (riz / Fonio)": imgSauceLegume,
  "Boulette de Viande Riz": imgSauceTomate,
  "Viande de Bœuf Riz": imgSauceFeuille,
  "1/2 Pondeuse (riz, attiéké)": imgSoupePoulet,
  "1 Pondeuse Entière (riz, attiéké)": imgSoupePoulet,
  "Soupe Poulet Chair 1/2 (attiéké, riz)": imgSoupePoulet,
  "Soupe Poulet Chair 1 Entier (attiéké, riz)": imgSoupePoulet,
  "Soupe Poisson (riz, attiéké)": imgSoupePoisson,
  "1/4 Poulet Rôti": imgPouletRoti,
  "1/2 Poulet Rôti": imgPouletRoti,
  "1 Poulet Entier": imgPouletRoti,
  "CHAWARMA Poulet": imgChawama,
  "CHAWARMA Viande": imgChawama,
  "Cheese Burger": imgBurger,
  "Burger NERIYA": imgBurger,
  "Spaghetti Rognon": imgSpaghettiKiosque,
  "Spaghetti Viande de Bœuf": imgSpaghettiKiosque,
  "Spaghetti Poulet": imgSpaghettiKiosque,
  "Sole Braisé": imgGrillPoisson,
  "Thon Frit": imgGrillPoisson,
  "Sosso Frit": imgGrillPoisson,
  "Pancakes Nature": imgPancakesNature,
  "Pancakes Miel, Caramel ou Sirop de Rabe": imgPancakesCaramel,
  "Pancakes Nutella": imgPancakesNutella,
  "Pancakes Nutella Oreo": imgPancakesNutella,
  "Pancakes Saisonnier (fruit, coulis au choix, boule de glace, spéculoos)": imgPancakesFruit,
  "Pain Perdu Nature": imgPainPerdu,
  "Pain Perdu Caramel (boule de glace)": imgPainPerduCaramel,
  "Feuilleté de Pain Fourré": imgFeuilletePain,
  "Croissant Gauffre Vanille Spéculoos": imgCroissantSpeculoos,
  "Croissant Gauffre Oreo": imgCroissantOreo,
  "Croissant Gauffre Fruits Rouges": imgCroissantFruits,
  "Croissant Vanille Pistache": imgCroissantPistache,
  "Pain Fourré Lait Caillé": imgPainLaitCaille,
  "Pain Fourré Dêguê": imgPainLaitCaille,
  "Dêguê au Fruit de la Passion": imgDegue,
  "Dêguê au Lait de Coco": imgDegue,
  "Dêguê Café Cappuccino": imgDegue,
  "Dêguê Caramel Granola": imgDegue,
};

// Category name → fallback category image
const categoryImageFallback: Record<string, string> = {
  "Petit Déjeuner": catPetitDej,
  Déjeuner: catDejeuner,
  Dîner: catDiner,
  Desserts: catDessert,
  Boissons: catBoissons,
};

// Daily-selection section key mapping (section name → daily key)
const sectionToDailyKey: Record<string, string> = {
  "Yassa 🍗": "yassa",
  "Mafé 🥜 — Sauce Arachide": "mafe",
  "Sauce Légume 🥬": "sauce-legume",
  "Sauce Tomate 🍅": "sauce-tomate",
  "Sauce Feuille 🍃": "sauce-feuille",
  "Soupe 🍲": "soupe",
};

// Sections that need the supplements sidebar
const categoriesWithSupplements = ["Déjeuner", "Dîner"];

// Suppléments & Accompagnements
const supplements = [
  { name: "Frites", price: "1 000 Fr", emoji: "🍟" },
  { name: "Alloco", price: "1 000 Fr", emoji: "🍌" },
  { name: "Attiéké", price: "1 000 Fr", emoji: "🥘" },
  { name: "Riz", price: "1 000 Fr", emoji: "🍚" },
];

const SupplementsGrid = () => {
  const { addItem } = useCart();
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-2xl p-5 border border-primary/20 bg-gradient-to-br from-card/80 via-card/60 to-primary/5 backdrop-blur-md shadow-[0_8px_32px_-8px_hsl(var(--primary)/0.2)]"
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/50" />
        <h3 className="font-display text-xs sm:text-sm font-bold text-primary uppercase tracking-[0.2em] text-center">
          ✨ Suppléments
        </h3>
        <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/50" />
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {supplements.map((s, i) => (
          <motion.button
            key={s.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            onClick={() => addItem(s.name, s.price)}
            className="group flex flex-col items-center gap-1.5 p-3 rounded-xl bg-secondary/20 border border-border/40 hover:bg-primary/10 hover:border-primary/40 hover:shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.25)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{s.emoji}</span>
            <span className="font-body font-bold text-xs text-foreground tracking-wide">{s.name}</span>
            <span className="font-display font-bold text-primary text-sm">{s.price}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

const MenuWithSupplements = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col lg:flex-row gap-6 items-start">
    <div className="flex-1 min-w-0 space-y-6">{children}</div>
    <div className="w-full lg:w-[240px] xl:w-[280px] shrink-0 lg:sticky lg:top-4 order-first lg:order-last">
      <SupplementsGrid />
    </div>
  </div>
);

// ─── DYNAMIC CATEGORY CONTENT ─────────────────────────────
const CategoryContent = ({
  category,
  dailySelections,
}: {
  category: LiveCategory;
  dailySelections: Record<string, string[]>;
}) => {
  const getSectionImage = (section: LiveSection): string => {
    return section.image_url || sectionImageFallback[section.name] || "";
  };

  const buildItems = (section: LiveSection) =>
    section.items.map((item) => ({
      ...item,
      image: item.image_url || itemImageFallback[item.name],
    }));

  const renderSections = () => {
    const elements: React.ReactNode[] = [];

    category.sections.forEach((section, i) => {
      const dailyKey = sectionToDailyKey[section.name];
      let items = buildItems(section);

      // If this section uses daily selections, filter
      if (dailyKey) {
        const selectedNames = dailySelections[dailyKey];
        if (!selectedNames || selectedNames.length === 0) return; // skip if none selected today
        items = items.filter((item) => selectedNames.includes(item.name));
        if (items.length === 0) return;
      }

      elements.push(
        <MenuSection
          key={section.id}
          title={section.name}
          items={items}
          delay={0.1 + i * 0.05}
          backgroundImage={getSectionImage(section)}
          imagePosition={i % 2 === 0 ? "right" : "left"}
        />,
      );
    });

    elements.push(
      <p key="bon-appetit" className="bon-appetit text-3xl sm:text-4xl text-center pt-3">
        Bon Appétit !
      </p>,
    );

    return elements;
  };

  const withSupplements = categoriesWithSupplements.includes(category.name);

  if (withSupplements) {
    return <MenuWithSupplements>{renderSections()}</MenuWithSupplements>;
  }

  return <div className="space-y-6">{renderSections()}</div>;
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
const whatsappMessage = `Bonjour Neriya ! 🍽️ Je souhaite passer une commande.

📋 Consultez notre menu complet ici :
👉 https://neriya.ci

Merci de me confirmer ma commande ! 😊`;

const whatsappUrl = `https://wa.me/2250789288202?text=${encodeURIComponent(whatsappMessage)}`;

const Index = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [showEvenements, setShowEvenements] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const { categories, loading } = useMenuData();
  const { selections: dailySelections } = useDailySelections();

  const activeCat = categories.find((c) => c.id === activeCategoryId);

  return (
    <CartProvider>
      <div className="min-h-screen chalkboard-bg">
        <AnimatePresence mode="wait">
          {showEvenements ? (
            <motion.div
              key="evenements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="min-h-screen flex flex-col"
            >
              <div className="relative h-60 sm:h-72 overflow-hidden grain-overlay">
                <motion.img
                  src={heroImg}
                  alt="Événements Neriya"
                  className="w-full h-full object-cover object-center"
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
                  onClick={() => setShowEvenements(false)}
                  className="absolute top-5 left-5 z-10 flex items-center gap-2 glass-card text-foreground font-body text-sm px-5 py-3 rounded-full hover:bg-card/90 transition-all hover:scale-105 active:scale-95"
                >
                  <ArrowLeft size={18} />
                  Retour
                </motion.button>

                <div className="absolute bottom-8 left-0 right-0 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <span className="text-5xl sm:text-6xl block mb-3">🎉</span>
                    <h1 className="font-display text-3xl sm:text-5xl font-bold text-white uppercase tracking-[0.15em] drop-shadow-lg">
                      Événements
                    </h1>
                    <p className="font-body text-sm sm:text-base text-white/60 mt-3 tracking-wide">
                      Mariages, baptêmes, anniversaires & plus
                    </p>
                  </motion.div>
                </div>
              </div>

              <main className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-12 w-full">
                <GoldOrnament />
                <div className="grid gap-5 mt-8">
                  {/* Commande Événementiels */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    onClick={() => setShowEventForm(true)}
                    className="group relative overflow-hidden rounded-2xl p-6 sm:p-8 text-center menu-section-card-v2 gold-glow shimmer-hover transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer w-full"
                  >
                    <span className="text-4xl sm:text-5xl block mb-3 group-hover:scale-110 transition-transform duration-300">🎊</span>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-primary uppercase tracking-[0.1em] mb-2">
                      Commande Événementiels
                    </h3>
                    <p className="font-body text-sm text-foreground/70">Buffets, cocktails & réceptions sur mesure</p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold text-sm px-5 py-2.5 rounded-full group-hover:bg-primary/90 transition-colors">
                      <FileText size={16} />
                      Remplir formulaire
                    </div>
                  </motion.button>

                  {/* Réservations Restauration */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    onClick={() => setShowReservationForm(true)}
                    className="group relative overflow-hidden rounded-2xl p-6 sm:p-8 text-center menu-section-card-v2 gold-glow shimmer-hover transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer w-full"
                  >
                    <span className="text-4xl sm:text-5xl block mb-3 group-hover:scale-110 transition-transform duration-300">🍽️</span>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-primary uppercase tracking-[0.1em] mb-2">
                      Réservations Restauration
                    </h3>
                    <p className="font-body text-sm text-foreground/70">Réservez votre table pour un moment spécial</p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-primary/20 text-primary font-body font-semibold text-sm px-5 py-2.5 rounded-full group-hover:bg-primary/30 transition-colors">
                      <FileText size={16} />
                      Remplir formulaire
                    </div>
                  </motion.button>

                  {/* Service Traiteur */}
                  <motion.a
                    href={`https://wa.me/2250789288202?text=${encodeURIComponent("Bonjour Neriya ! 👨‍🍳 Je suis intéressé(e) par votre service traiteur.\n\nMerci de me recontacter ! 😊")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="group relative overflow-hidden rounded-2xl p-6 sm:p-8 text-center menu-section-card-v2 gold-glow shimmer-hover transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <span className="text-4xl sm:text-5xl block mb-3 group-hover:scale-110 transition-transform duration-300">👨‍🍳</span>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-primary uppercase tracking-[0.1em] mb-2">
                      Service Traiteur
                    </h3>
                    <p className="font-body text-sm text-foreground/70">Notre équipe à votre service, où que vous soyez</p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-[#25D366] text-white font-body font-semibold text-sm px-5 py-2.5 rounded-full group-hover:bg-[#1ebe57] transition-colors">
                      <MessageCircle size={16} fill="white" strokeWidth={0} />
                      Contacter sur WhatsApp
                    </div>
                  </motion.a>
                </div>
                <GoldOrnament />
              </main>

              <EventFormDialog open={showEventForm} onClose={() => setShowEventForm(false)} />
            </motion.div>
          ) : activeCategoryId && activeCat ? (
            <motion.div
              key={activeCategoryId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="relative h-60 sm:h-80 overflow-hidden">
                <motion.img
                  src={activeCat.image_url || categoryImageFallback[activeCat.name] || catDejeuner}
                  alt={activeCat.name}
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
                  onClick={() => setActiveCategoryId(null)}
                  className="absolute top-5 left-5 z-10 flex items-center gap-2 glass-card text-foreground font-body text-sm px-5 py-3 rounded-full hover:bg-card/90 transition-all hover:scale-105 active:scale-95"
                >
                  <ArrowLeft size={18} />
                  Retour
                </motion.button>

                <div className="absolute bottom-8 left-0 right-0 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <span className="text-5xl sm:text-6xl block mb-3">{activeCat.emoji}</span>
                    <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-white uppercase tracking-[0.15em] drop-shadow-lg">
                      {activeCat.name}
                    </h1>
                    <p className="font-body text-sm sm:text-base text-white/60 mt-3 tracking-wide">
                      {activeCat.description}
                    </p>
                  </motion.div>
                </div>
              </div>

              <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-28 sm:pb-20 space-y-7 mt-6">
                <GoldOrnament />
                <CategoryContent category={activeCat} dailySelections={dailySelections} />
                <GoldOrnament />
                <p className="font-body text-xs text-muted-foreground text-center italic tracking-wide pt-2">
                  Tous les prix sont en FCFA · Service compris
                </p>
              </main>
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-[55vh] sm:h-[60vh] overflow-hidden grain-overlay">
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

                <motion.div
                  className="absolute bottom-10 sm:bottom-14 left-0 right-0 text-center"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <p className="font-script text-primary text-3xl sm:text-4xl drop-shadow-lg">La bouchée gourmande</p>
                </motion.div>
              </div>

              {/* ── Bannière défilante événements ── */}
              <div className="w-full overflow-hidden bg-gold/15 border-y border-gold/30 py-2.5">
                <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
                  {[...Array(3)].map((_, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-3 font-body text-sm sm:text-base text-gold-bright font-semibold tracking-wide"
                    >
                      <span>🎉</span>
                      Pour toutes vos réceptions, mariage, baby shower, baptême, anniversaire, cocktail, buffet — faites
                      confiance à Neriya – La Bouchée Gourmande.
                      <span className="text-accent">✦</span>
                      <span>📧</span>
                      Contact : info@neriya.ci
                      <span className="text-accent">✦</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* ── Section Présentation ── */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 mb-4"
              >
                <div className="menu-section-card-v2 text-center py-8 sm:py-10">
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-primary uppercase tracking-[0.15em] mb-4">
                    Bienvenue chez Neriya - La Bouchée Gourmande
                  </h2>
                  <p className="font-body text-primary font-semibold text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-5">
                    Votre passeport gustatif pour Yopougon !
                  </p>
                  <p className="font-body text-foreground/85 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-5">
                    Découvrez une cuisine aux saveurs du monde, qui vous transporte à travers les continents. Chez{" "}
                    <span className="font-semibold text-primary">Neriya_la bouchée gourmande</span> nous créons des
                    expériences culinaires uniques, conçues pour éveiller vos sens et vous faire voyager.
                  </p>
                  <p className="font-body text-foreground/70 text-sm leading-relaxed max-w-xl mx-auto mb-5">
                    Préparés avec des ingrédients frais et une passion authentique, nos plats sont une invitation à la
                    découverte, du petit-déjeuner au dîner. Profitez de notre ambiance chaleureuse ou faites-vous livrer
                    : chaque bouchée est non seulement une explosion de saveurs mais aussi un nouveau voyage.
                  </p>
                  <p className="font-body text-primary font-semibold text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-6">
                    Neriya _la bouchée gourmande, Le monde à portée de goûts.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <span className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 border border-primary/15">
                      <span>📍</span>
                      <span className="font-body text-xs sm:text-sm text-foreground/80">Yopougon, Abidjan</span>
                    </span>
                    <span className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 border border-primary/15">
                      <span>🏠</span>
                      <span className="font-body text-xs sm:text-sm text-foreground/80">Sur place</span>
                    </span>
                    <span className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 border border-primary/15">
                      <span>🛵</span>
                      <span className="font-body text-xs sm:text-sm text-foreground/80">Livraison</span>
                    </span>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      animate={{
                        boxShadow: [
                          "0 0 4px 2px hsl(var(--primary) / 0.3)",
                          "0 0 35px 12px hsl(var(--primary) / 0.7)",
                          "0 0 4px 2px hsl(var(--primary) / 0.3)",
                        ],
                        scale: [1, 1.06, 1],
                      }}
                      transition={{
                        boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                        scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                      }}
                      onClick={() => {
                        setShowEvenements(true);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 border-2 border-primary/60 cursor-pointer hover:border-primary transition-all duration-300 active:scale-95 bg-primary/15"
                    >
                      <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping pointer-events-none" />
                      <span className="absolute inset-[-3px] rounded-full bg-gradient-to-r from-primary/40 via-primary/10 to-primary/40 blur-md pointer-events-none" />
                      <span className="relative">🎉</span>
                      <span className="relative font-body text-xs sm:text-sm text-primary font-bold tracking-wide">Événements</span>
                    </motion.button>
                    <span className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 border border-primary/15">
                      <span>📧</span>
                      <span className="font-body text-xs sm:text-sm text-foreground/80">info@neriya.ci</span>
                    </span>
                  </div>
                </div>
              </motion.section>

              <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-center gap-4 mb-8"
                >
                  <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-primary/40" />
                  <span className="font-display text-base uppercase tracking-[0.3em] text-primary/80">Notre Carte</span>
                  <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-primary/40" />
                </motion.div>
              </div>

              <main className="max-w-3xl mx-auto px-4 sm:px-6 pb-28 sm:pb-20 relative z-10">
                <div className="grid gap-5 sm:gap-6">
                  {categories.map((cat, i) => (
                    <motion.button
                      key={cat.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: "easeOut" }}
                      onClick={() => {
                        setActiveCategoryId(cat.id);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="group relative overflow-hidden rounded-2xl h-36 sm:h-40 text-left gold-glow shimmer-hover transition-transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <img
                        src={cat.image_url || categoryImageFallback[cat.name] || catDejeuner}
                        alt={cat.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20 group-hover:from-black/70 transition-all duration-500" />

                      <div className="relative h-full flex items-center justify-between px-6 sm:px-10">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-3.5">
                            <span className="text-4xl sm:text-5xl drop-shadow-md">{cat.emoji}</span>
                            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-wider drop-shadow-sm">
                              {cat.name}
                            </h2>
                          </div>
                          <p className="font-body text-sm sm:text-base text-white/55 ml-14 sm:ml-[4rem] tracking-wide">
                            {cat.description}
                          </p>
                        </div>
                        <ChevronRight
                          size={28}
                          className="text-primary/60 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 shrink-0"
                        />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </main>

              <footer className="relative border-t border-primary/10 py-12 px-4">
                <div className="max-w-md mx-auto text-center space-y-4">
                  <div className="flex items-center justify-center gap-4 mb-5">
                    <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary/30" />
                    <img src={logo} alt="Neriya" className="h-12 w-12 rounded-full object-cover opacity-75" />
                    <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary/30" />
                  </div>
                  <p className="font-script text-primary text-2xl">Neriya La Bouchée Gourmande</p>
                  <p className="font-body text-sm text-muted-foreground italic tracking-wide">
                    Tous les prix sont en FCFA · Service compris
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-body font-semibold text-secondary-foreground">
                      📍 Yopougon, Abidjan
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-body font-semibold text-secondary-foreground">
                      🏠 Sur place
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-body font-semibold text-secondary-foreground">
                      🏍 Livraison
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-body font-semibold text-secondary-foreground">
                      🔓 Ouvert au public
                    </span>
                  </div>
                  {/* Social links */}
                  <div className="flex items-center justify-center gap-3 pt-3">
                    <a
                      href="https://www.facebook.com/profile.php?id=61575540825498"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary border border-border text-foreground/70 hover:text-[#1877F2] hover:border-[#1877F2]/40 transition-all hover:scale-110"
                      title="Facebook"
                    >
                      <Facebook size={20} />
                    </a>
                    <a
                      href="https://www.tiktok.com/@neriya_laboucheegourmande"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary border border-border text-foreground/70 hover:text-foreground hover:border-foreground/40 transition-all hover:scale-110"
                      title="TikTok"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.21 8.21 0 0 0 4.76 1.51v-3.45a4.85 4.85 0 0 1-1-.08z" />
                      </svg>
                    </a>
                  </div>
                  <p className="font-body text-xs text-muted-foreground/60">© 2026 — La bouchée gourmande</p>
                </div>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>

        <CartDrawer />
        <CartFloatingButton />

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 bg-[#25D366] hover:bg-[#1ebe57] text-white rounded-full shadow-xl transition-all hover:scale-110 active:scale-95 whatsapp-pulse"
          title="Commander sur WhatsApp"
        >
          <MessageCircle size={28} fill="white" strokeWidth={0} />
        </a>
      </div>
    </CartProvider>
  );
};

export default Index;
